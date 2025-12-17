import { io } from "socket.io-client";

const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  autoConnect: false,
  timeout: 20000,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  forceNew: true,
});

export default socket;
