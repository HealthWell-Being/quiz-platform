import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { createSocket } from "./socket";

const API_URL = "https://quiz-platform-2637.onrender.com";
const QUESTION_SECONDS = 12;

function getRoute() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("teacher")) return "teacher";
  if (path.includes("student")) return "student";
  return "landing";
}

function medal(place) {
  if (place === 1) return "🥇";
  if (place === 2) return "🥈";
  if (place === 3) return "🥉";
  return `${place}.`;
}

function getMyScore(leaderboard, name) {
  const me = leaderboard.find((p) => p.name === name);
  return me?.score ?? 0;
}

function getPlacementInfo(leaderboard, name) {
  const index = leaderboard.findIndex((p) => p.name === name);

  if (index === -1) return null;

  const me = leaderboard[index];
  const previous = leaderboard[index - 1];

  if (index === 0) {
    return {
      rank: 1,
      score: me.score,
      previousName: null,
      pointsBehind: 0,
      isTied: false
    };
  }

  const pointsBehind = Math.max(0, previous.score - me.score);

  return {
    rank: index + 1,
    score: me.score,
    previousName: previous.name,
    pointsBehind,
    isTied: pointsBehind === 0
  };
}

function isResultsPhase(status) {
  return ["results", "reveal", "ranking"].includes(status);
}

function answerColorClass(index) {
  return `answerColor-${index % 4}`;
}

export default function App() {
  const route = useMemo(() => getRoute(), []);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const accessKey = params.get("key") || "";
  const presetCode = params.get("session") || params.get("code") || "";
  const presetQuiz = params.get("quiz") || "";

  const role = route === "teacher" ? "teacher" : route === "student" ? "student" : null;
  const socket = useMemo(() => (role ? createSocket(role, accessKey) : null), [role, accessKey]);

  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState(presetQuiz || "");
  const [sessionCode, setSessionCode] = useState(presetCode || "");
  const [studentLink, setStudentLink] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [state, setState] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);

  useEffect(() => {
    fetch(`${API_URL}/api/quizzes`)
      .then((r) => r.json())
      .then((data) => {
        setQuizzes(data);
        if (!quizId && data[0]?.id) setQuizId(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const onConnectError = (err) => {
      if (err?.message === "ACCESS_DENIED") {
        setMessage("Invalid teacher key. Open the teacher link.");
      } else {
        setMessage("Could not connect to the server.");
      }
    };

    const onSessionState = (payload) => setState(payload.state);
    const onResults = (payload) => setState(payload.state);
    const onQuestion = (payload) => {
      setState(payload.state);
      setMessage("");
      setSelectedAnswer(null);
    };
    const onFinished = (payload) =>
      setState((prev) =>
        prev ? { ...prev, status: "finished", leaderboard: payload.leaderboard } : prev
      );
    const onSync = (payload) => setState(payload.state);
    const onEnded = (payload) => {
      setMessage(payload.message);
      setState(null);
    };

    socket.on("connect_error", onConnectError);
    socket.on("session:state", onSessionState);
    socket.on("game:question", onQuestion);
    socket.on("game:results", onResults);
    socket.on("game:reveal", onResults);
    socket.on("game:ranking", onResults);
    socket.on("game:finished", onFinished);
    socket.on("game:sync", onSync);
    socket.on("session:ended", onEnded);

    socket.connect();

    return () => {
      socket.off("connect_error", onConnectError);
      socket.off("session:state", onSessionState);
      socket.off("game:question", onQuestion);
      socket.off("game:results", onResults);
      socket.off("game:reveal", onResults);
      socket.off("game:ranking", onResults);
      socket.off("game:finished", onFinished);
      socket.off("game:sync", onSync);
      socket.off("session:ended", onEnded);
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (!state?.questionEndsAt || state.status !== "question") return;

    const tick = () => {
      setTimeLeft(Math.max(0, Math.ceil((state.questionEndsAt - Date.now()) / 1000)));
    };

    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [state?.questionEndsAt, state?.status]);

  const createSession = () => {
    if (!quizId) return;

    socket.emit("teacher:create-session", { quizId }, (res) => {
      if (!res?.ok) {
        setMessage(res?.message || "Could not create the session.");
        return;
      }

      setSessionCode(res.code);
      setStudentLink(`${window.location.origin}${res.studentLink}`);
      setState(res.state);
      setMessage("Session created successfully.");
    });
  };

  const startSession = () => {
    socket.emit("teacher:start-session", { code: sessionCode }, (res) => {
      if (!res?.ok) setMessage(res?.message || "Could not start the session.");
    });
  };

  const nextQuestion = () => {
    socket.emit("teacher:next-question", { code: sessionCode }, (res) => {
      if (!res?.ok) setMessage(res?.message || "Could not continue.");
    });
  };

  const endSession = () => {
    socket.emit("teacher:end-session", { code: sessionCode }, (res) => {
      if (!res?.ok) setMessage(res?.message || "Could not end the session.");
    });
  };

  const joinSession = () => {
    socket.emit(
      "student:join",
      {
        code: sessionCode,
        name: playerName,
        quizId,
        joinKey: accessKey
      },
      (res) => {
        if (!res?.ok) {
          setMessage(res?.message || "Could not join the session.");
          return;
        }

        setState(res.state);
        setMessage("");
      }
    );
  };

  const answer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    socket.emit("student:answer", { code: sessionCode, answerIndex: index }, (res) => {
      if (!res?.ok) {
        setMessage(res?.message || "Could not save your answer.");
        return;
      }
    });
  };

  if (route === "landing") {
    return (
      <div className="page landingPage">
        <div className="container">
          <div className="card hero landingHero">
            <div className="eyebrow">Quiz platform</div>
            <h1>Live quizzes, brighter sessions</h1>
            <p>Open the teacher link or the student link to join a session.</p>
          </div>
        </div>
      </div>
    );
  }

  if (route === "teacher") {
    return (
      <div className="page teacherPage">
        <div className="container">
          <div className="topbar">
            <div className="status">Teacher</div>
          </div>

          {message ? <div className="card notice">{message}</div> : null}

          <div className="grid">
            <div className="card teacherCard">
              <h2>Create session</h2>

              <label>Quiz</label>
              <select value={quizId} onChange={(e) => setQuizId(e.target.value)}>
                {quizzes.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.title} ({q.questionCount} questions)
                  </option>
                ))}
              </select>

              <div className="row">
                <button className="btn" onClick={createSession}>
                  Create session
                </button>
                <button className="btn btn-secondary" onClick={startSession} disabled={!sessionCode}>
                  Start quiz
                </button>
                <button className="btn btn-danger" onClick={endSession} disabled={!sessionCode}>
                  End session
                </button>
              </div>

              {sessionCode ? (
                <div className="stack">
                  <div className="codeBox">
                    <strong>Session code:</strong> {sessionCode}
                  </div>

                  <div className="codeBox qrCard">
                    <strong>Student QR code</strong>
                    <div className="qrWrap">
                      {studentLink ? <QRCodeSVG value={studentLink} size={180} /> : null}
                    </div>
                    <p className="muted">
                      Students scan this QR code on their phones to join this exact session.
                    </p>
                  </div>
                </div>
              ) : null}

              <p className="muted">
                Every session gets its own QR code, so different classes never mix.
              </p>
            </div>

            <div className="card teacherCard">
              <h2>Status</h2>
              {!state ? (
                <p className="muted">No active session yet.</p>
              ) : (
                <>
                  <p>
                    <strong>Quiz:</strong> {state.quizTitle}
                  </p>
                  <p>
                    <strong>Status:</strong> {state.status}
                  </p>
                  <p>
                    <strong>Players:</strong> {state.players}
                  </p>

                  {state.currentQuestion ? (
                    <div className="codeBox">
                      <strong>Current question</strong>
                      <p className="questionText">{state.currentQuestion.text}</p>
                    </div>
                  ) : null}

                  <div className="board">
                    <div className="boardTitle">Leaderboard</div>
                    {state.leaderboard.slice(0, 10).map((p) => (
                      <div className="boardRow" key={`${p.name}-${p.place}`}>
                        <strong>{medal(p.place)}</strong>
                        <span>{p.name}</span>
                        <span>{p.score} pts</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {state && isResultsPhase(state.status) ? (
          <TeacherResultsModal state={state} onNext={nextQuestion} />
        ) : null}
      </div>
    );
  }

  const joined = Boolean(state);
  const showResultsPhase = Boolean(state && isResultsPhase(state.status));

  return (
    <div className="page studentPage">
      <div className="container studentContainer">
        {message ? <div className="card notice">{message}</div> : null}

        {!joined ? (
          <div className="grid single">
            <div className="card studentCard">
              <div className="topbar">
                <div className="status">Student</div>
              </div>

              <h2>Join as a student</h2>

              <label>Session code</label>
              <input
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
              />

              <label>Quiz</label>
              <select value={quizId} onChange={(e) => setQuizId(e.target.value)}>
                {quizzes.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.title}
                  </option>
                ))}
              </select>

              <label>Your name</label>
              <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Irina"
              />

              <div className="row">
                <button className="btn" onClick={joinSession}>
                  Join
                </button>
              </div>

              <p className="muted">
                If you open the student QR code from the teacher, the session key is already included.
              </p>
            </div>
          </div>
        ) : showResultsPhase ? (
          <div className="resultsHost">
            <div className="card playHero compactHero">
              <div className="eyebrow">Round results</div>
              <h1>Waiting for the teacher to continue</h1>
              <p>
                Your personal result is shown on top. The next question will appear when the teacher clicks
                “Next question”.
              </p>
            </div>
          </div>
        ) : state.status === "lobby" ? (
          <LobbyScreen state={state} sessionCode={sessionCode} playerName={playerName} />
        ) : state.status === "question" ? (
          <QuestionScreen
            state={state}
            timeLeft={timeLeft}
            playerName={playerName}
            selectedAnswer={selectedAnswer}
            answer={answer}
            myScore={getMyScore(state.leaderboard, playerName)}
          />
        ) : state.status === "finished" ? (
          <FinalScreen state={state} playerName={playerName} />
        ) : (
          <div className="playStage">
            <div className="playHero compactHero">
              <div className="eyebrow">Session</div>
              <h1>{state.quizTitle}</h1>
              <p>Waiting for the session to start.</p>
            </div>
          </div>
        )}
      </div>

      {state && showResultsPhase ? (
        <StudentResultsModal state={state} playerName={playerName} />
      ) : null}
    </div>
  );
}

function LobbyScreen({ state, sessionCode, playerName }) {
  return (
    <div className="playStage">
      <div className="playHeader">
        <div className="progress">Session {sessionCode}</div>
        <div className="status">Student</div>
      </div>

      <div className="playHero">
        <div className="eyebrow">Welcome</div>
        <h1>{state.quizTitle}</h1>
        <p>
          Hi, {playerName}. Wait for the teacher to press “Start quiz”.
        </p>
      </div>
    </div>
  );
}

function QuestionScreen({ state, timeLeft, playerName, selectedAnswer, answer, myScore }) {
  const q = state.currentQuestion;

  return (
    <div className="playStage">
      <div className="playHeader">
        <div className="progress">
          Question {state.currentQuestionIndex + 1} / {state.totalQuestions}
        </div>
        <div className="scorePill">Points: {myScore}</div>
      </div>

      <div className="playHero questionHero">
        <div className="eyebrow">Hi, {playerName}</div>
        <h1>{q.text}</h1>
        <div className="timerPill">⏱ {timeLeft}s</div>
      </div>

      <div className="answersGrid">
        {q.options.map((opt, idx) => (
          <button
            key={opt}
            className={`answerBtn ${answerColorClass(idx)} ${selectedAnswer === idx ? "selected" : ""}`}
            onClick={() => answer(idx)}
            disabled={selectedAnswer !== null}
          >
            <span className="answerIndex">{idx + 1}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FinalScreen({ state, playerName }) {
  const myScore = getMyScore(state.leaderboard, playerName);

  return (
    <div className="playStage">
      <div className="playHero compactHero">
        <div className="eyebrow">Final podium</div>
        <h1>Great game</h1>
        <p>Your final score: {myScore}</p>
      </div>

      <div className="podiumList">
        {state.leaderboard.slice(0, 3).map((p) => (
          <div className="rankingRow finalRow" key={`${p.name}-${p.place}`}>
            <div className="rankLeft">
              <strong>{medal(p.place)}</strong>
              <span>{p.name}</span>
            </div>
            <div className="rankRight">{p.score} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherResultsModal({ state, onNext }) {
  const currentQuestion = state.currentQuestion || { options: [], correctIndex: 0, text: "" };
  const fallbackStats = (currentQuestion.options || []).map((label, index) => ({
    index,
    label,
    count: 0,
    isCorrect: index === currentQuestion.correctIndex,
    percentage: 0
  }));

  const stats = state.answerStats?.items?.length ? state.answerStats.items : fallbackStats;
  const totalResponses = state.answerStats?.totalResponses ?? 0;
  const maxCount = Math.max(1, ...stats.map((item) => item.count));
  const correctText =
    currentQuestion.options?.[currentQuestion.correctIndex] ?? "—";

  return (
    <div className="resultsOverlay">
      <div className="resultsPanel">
        <div className="resultsTopline">
          <div>
            <div className="eyebrow">Teacher results</div>
            <h2>Question {state.currentQuestionIndex + 1}</h2>
            <p className="muted">
              Answered {totalResponses} of {state.players} players.
            </p>
          </div>

          <div className="resultsBadge">Correct answer highlighted in green</div>
        </div>

        <div className="resultsGrid">
          <section className="resultsCard">
            <h3>Answer histogram</h3>
            <p className="resultsCorrect">Correct answer: {correctText}</p>

            <div className="histogram">
              {stats.map((item) => {
                const height = totalResponses
                  ? Math.max(18, (item.count / maxCount) * 240)
                  : 18;

                return (
                  <div className="histogramCol" key={item.index}>
                    <div className="histogramTop">
                      <strong>{item.count}</strong>
                      <span>{item.percentage}%</span>
                    </div>
                    <div
                      className={`histogramBar ${item.isCorrect ? "correct" : "wrong"}`}
                      style={{ height: `${height}px` }}
                    />
                    <div className="histogramLabel">{item.label}</div>
                  </div>
                );
              })}
            </div>

            <button className="btn btn-next" onClick={onNext}>
              Next question
            </button>
          </section>

          <section className="resultsCard resultsRankingCard">
            <h3>Live ranking</h3>
            <div className="resultsLeaderboard">
              {state.leaderboard.slice(0, 10).map((p) => (
                <div className="resultsRow" key={`${p.name}-${p.place}`}>
                  <div className="resultsPlace">{medal(p.place)}</div>
                  <span>{p.name}</span>
                  <b>{p.score} pts</b>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StudentResultsModal({ state, playerName }) {
  const info = getPlacementInfo(state.leaderboard, playerName);

  if (!info) return null;

  const title = info.rank === 1 ? "You're in 1st place" : `You're in #${info.rank}`;
  const subtitle =
    info.rank === 1
      ? "You're leading the room."
      : info.isTied
        ? `You're tied with ${info.previousName}.`
        : `You're ${info.pointsBehind} points behind ${info.previousName}.`;

  return (
    <div className="resultsOverlay">
      <div className="resultsPanel studentResultsPanel">
        <div className="studentResultCard">
          <div className="eyebrow">Your result</div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="studentPoints">Total score: {info.score}</div>
        </div>
      </div>
    </div>
  );
}
