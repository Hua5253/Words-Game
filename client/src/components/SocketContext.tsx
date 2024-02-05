// SocketContext.tsx

import React from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

// Create the socket object outside of the context to ensure a single instance
export const socket: Socket = io("http://localhost:3000");

// Create a context with the socket object
export const SocketContext = React.createContext(socket);
