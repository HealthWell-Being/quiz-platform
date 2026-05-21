import { io } from "socket.io-client";

const SOCKET_URL = "https://quiz-platform-2637.onrender.com";

export function createSocket(role, key) {
  return io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
    auth: {
      role,
      key
    }
  });
}