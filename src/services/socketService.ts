import type { Socket } from "socket.io-client";

import { io } from "socket.io-client";

const URL: string = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";
export const socket: Socket = io(URL, { transports: ["websocket"], path: "/websocket" });