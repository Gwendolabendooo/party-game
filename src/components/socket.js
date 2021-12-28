import socketio from "socket.io-client";
import React from "react";

export const socket = socketio.connect("http://micro-games.fr:8000");
export const SocketContext = React.createContext();