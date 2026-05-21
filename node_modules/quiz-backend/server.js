require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { randomBytes } = require("crypto");
const { quizzes } = require("./quizzes");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const TEACHER_ACCESS_KEY = process.env.TEACHER_ACCESS_KEY || "profesor-2026";

const QUESTION_MS = 10000;
const REVEAL_MS = 5000;
const RANKING_MS = 5000;

const sessions = new Map();

function makeCode() {
  return randomBytes(3).toString("hex").toUpperCase();
}

function makeSessionKey() {
  return randomBytes(8).toString("hex").toUpperCase();
}

function getQuiz(quizId) {
  return quizzes.find((q) => q.id === quizId);
}

function leaderboard(session) {
  return [...session.students.values()]
    .map((s) => ({ name: s.name, score: s.score }))
    .sort((a, b) => (b.score - a.score) || a.name.localeCompare(b.name))
    .map((s, i) => ({ ...s, place: i + 1 }));
}

function publicState(session) {
  const currentQuestion =
    session.currentQuestionIndex >= 0 &&
    session.currentQuestionIndex < session.quiz.questions.length
      ? session.quiz.questions[session.currentQuestionIndex]
      : null;

  return {
    code: session.code,
    quizId: session.quizId,
    quizTitle: session.quiz.title,
    status: session.status,
    currentQuestionIndex: session.currentQuestionIndex,
    totalQuestions: session.quiz.questions.length,
    questionEndsAt: session.questionEndsAt,
    revealEndsAt: session.revealEndsAt,
    rankingEndsAt: session.rankingEndsAt,
    players: session.students.size,
    leaderboard: leaderboard(session),
    currentQuestion: currentQuestion
      ? {
          text: currentQuestion.text,
          options: currentQuestion.options,
          correctIndex:
            session.status === "reveal" ||
            session.status === "ranking" ||
            session.status === "finished"
              ? currentQuestion.correctIndex
              : undefined
        }
      : null
  };
}

function emitState(session) {
  io.to(session.code).emit("session:state", { state: publicState(session) });
}

function clearSessionTimer(session) {
  if (session.timer) {
    clearTimeout(session.timer);
    session.timer = null;
  }
}

function finishSession(session) {
  clearSessionTimer(session);
  session.status = "finished";
  session.revealEndsAt = null;
  session.rankingEndsAt = null;

  emitState(session);
  io.to(session.code).emit("game:finished", {
    state: publicState(session),
    leaderboard: leaderboard(session)
  });
}

function enterRanking(session) {
  clearSessionTimer(session);

  session.status = "ranking";
  session.rankingEndsAt = Date.now() + RANKING_MS;
  session.revealEndsAt = null;

  emitState(session);
  io.to(session.code).emit("game:ranking", {
    state: publicState(session),
    leaderboard: leaderboard(session)
  });

  session.timer = setTimeout(() => {
    if (session.currentQuestionIndex >= session.quiz.questions.length - 1) {
      finishSession(session);
    } else {
      startNextQuestion(session);
    }
  }, RANKING_MS);
}

function enterReveal(session) {
  clearSessionTimer(session);

  session.status = "reveal";
  session.revealEndsAt = Date.now() + REVEAL_MS;

  emitState(session);
  io.to(session.code).emit("game:reveal", {
    state: publicState(session)
  });

  session.timer = setTimeout(() => {
    enterRanking(session);
  }, REVEAL_MS);
}

function startNextQuestion(session) {
  clearSessionTimer(session);

  session.currentQuestionIndex += 1;
  session.currentAnswers = new Map();

  if (session.currentQuestionIndex >= session.quiz.questions.length) {
    finishSession(session);
    return;
  }

  session.status = "question";
  session.questionEndsAt = Date.now() + QUESTION_MS;
  session.revealEndsAt = null;
  session.rankingEndsAt = null;

  emitState(session);
  io.to(session.code).emit("game:question", {
    state: publicState(session)
  });

  session.timer = setTimeout(() => {
    enterReveal(session);
  }, QUESTION_MS);
}

function createSession(quizId, teacherSocketId) {
  const quiz = getQuiz(quizId);
  if (!quiz) return null;

  let code = makeCode();
  while (sessions.has(code)) code = makeCode();

  const session = {
    code,
    quizId,
    quiz,
    status: "lobby",
    currentQuestionIndex: -1,
    questionEndsAt: null,
    revealEndsAt: null,
    rankingEndsAt: null,
    teacherSocketId,
    studentKey: makeSessionKey(),
    timer: null,
    students: new Map(),
    currentAnswers: new Map(),
    createdAt: Date.now()
  };

  sessions.set(code, session);
  return session;
}

function scoreAnswer(session, socketId, answerIndex) {
  const student = session.students.get(socketId);
  const question = session.quiz.questions[session.currentQuestionIndex];

  if (!student || !question) {
    return { ok: false, message: "No estás en una sesión activa." };
  }

  if (session.status !== "question") {
    return { ok: false, message: "Ya no puedes responder esta pregunta." };
  }

  if (session.currentAnswers.has(socketId)) {
    return { ok: false, message: "Ya respondiste esta pregunta." };
  }

  if (Date.now() > session.questionEndsAt) {
    return { ok: false, message: "Se acabó el tiempo." };
  }

  const correct = answerIndex === question.correctIndex;
  const remaining = Math.max(0, session.questionEndsAt - Date.now());
  const remainingRatio = remaining / QUESTION_MS;

  const basePoints = 500;
  const speedBonus = correct ? Math.round(500 * remainingRatio) : 0;
  const points = correct ? basePoints + speedBonus : 0;

  student.score += points;

  session.currentAnswers.set(socketId, {
    answerIndex,
    correct,
    points,
    answeredAt: Date.now()
  });

  return {
    ok: true,
    correct,
    points,
    score: student.score
  };
}

app.get("/api/quizzes", (req, res) => {
  res.json(
    quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      questionCount: q.questions.length
    }))
  );
});

app.get("/api/session/:code", (req, res) => {
  const code = String(req.params.code || "").toUpperCase();
  const session = sessions.get(code);

  if (!session) {
    return res.status(404).json({ error: "Sesión no encontrada" });
  }

  res.json({ state: publicState(session) });
});

io.use((socket, next) => {
  const auth = socket.handshake.auth || {};
  const role = auth.role;
  const key = auth.key;

  if (role !== "teacher" && role !== "student") {
    return next(new Error("ROLE_INVALID"));
  }

  if (role === "teacher" && key !== TEACHER_ACCESS_KEY) {
    return next(new Error("ACCESS_DENIED"));
  }

  socket.data.role = role;
  socket.data.authKey = key;
  next();
});

io.on("connection", (socket) => {
  socket.on("teacher:create-session", ({ quizId }, ack) => {
    if (socket.data.role !== "teacher") {
      return ack?.({ ok: false, message: "Solo el profesor puede crear sesiones." });
    }

    const session = createSession(quizId, socket.id);

    if (!session) {
      return ack?.({ ok: false, message: "Quiz no encontrado." });
    }

    socket.join(session.code);

    ack?.({
      ok: true,
      code: session.code,
      studentKey: session.studentKey,
      state: publicState(session),
      studentLink: `/student?session=${session.code}&key=${session.studentKey}&quiz=${session.quizId}`
    });

    emitState(session);
  });

  socket.on("teacher:start-session", ({ code }, ack) => {
    if (socket.data.role !== "teacher") {
      return ack?.({ ok: false, message: "Solo el profesor puede iniciar la sesión." });
    }

    const session = sessions.get(String(code || "").toUpperCase());

    if (!session) {
      return ack?.({ ok: false, message: "Sesión no encontrada." });
    }

    if (session.teacherSocketId !== socket.id) {
      return ack?.({ ok: false, message: "Solo el profesor que creó la sesión puede iniciarla." });
    }

    if (session.status !== "lobby") {
      return ack?.({ ok: false, message: "La sesión ya ha empezado." });
    }

    startNextQuestion(session);
    ack?.({ ok: true });
  });

  socket.on("teacher:end-session", ({ code }, ack) => {
    if (socket.data.role !== "teacher") {
      return ack?.({ ok: false, message: "Solo el profesor puede cerrar la sesión." });
    }

    const session = sessions.get(String(code || "").toUpperCase());

    if (!session) {
      return ack?.({ ok: false, message: "Sesión no encontrada." });
    }

    if (session.teacherSocketId !== socket.id) {
      return ack?.({ ok: false, message: "Solo el profesor que creó la sesión puede cerrarla." });
    }

    clearSessionTimer(session);
    io.to(session.code).emit("session:ended", {
      message: "The teacher ended the session."
    });
    sessions.delete(session.code);

    ack?.({ ok: true });
  });

  socket.on("student:join", ({ code, name, quizId, joinKey }, ack) => {
    if (socket.data.role !== "student") {
      return ack?.({ ok: false, message: "Solo un alumno puede entrar como alumno." });
    }

    const session = sessions.get(String(code || "").toUpperCase());

    if (!session) {
      return ack?.({ ok: false, message: "Código de sesión incorrecto." });
    }

    if (joinKey !== session.studentKey) {
      return ack?.({ ok: false, message: "Ese enlace de alumno no es válido para esta sesión." });
    }

    if (quizId && quizId !== session.quizId) {
      return ack?.({ ok: false, message: "Ese quiz no coincide con la sesión." });
    }

    const cleanName = String(name || "").trim().slice(0, 24);
    if (!cleanName) {
      return ack?.({ ok: false, message: "Escribe tu nombre." });
    }

    socket.join(session.code);
    session.students.set(socket.id, { name: cleanName, score: 0 });

    ack?.({
      ok: true,
      state: publicState(session)
    });

    emitState(session);

    if (
      session.status === "question" ||
      session.status === "reveal" ||
      session.status === "ranking" ||
      session.status === "finished"
    ) {
      socket.emit("game:sync", {
        state: publicState(session)
      });
    }
  });

  socket.on("student:answer", ({ code, answerIndex }, ack) => {
    if (socket.data.role !== "student") {
      return ack?.({ ok: false, message: "Solo un alumno puede responder." });
    }

    const session = sessions.get(String(code || "").toUpperCase());

    if (!session) {
      return ack?.({ ok: false, message: "Sesión no encontrada." });
    }

    const result = scoreAnswer(session, socket.id, Number(answerIndex));
    ack?.(result);
    emitState(session);
  });

  socket.on("disconnect", () => {
    for (const [code, session] of sessions.entries()) {
      if (session.teacherSocketId === socket.id) {
        clearSessionTimer(session);
        sessions.delete(code);
        io.to(code).emit("session:ended", {
          message: "El profesor cerró la sesión."
        });
        continue;
      }

      if (session.students.delete(socket.id)) {
        emitState(session);
      }
    }
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});