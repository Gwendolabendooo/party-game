import socketio from "socket.io-client";
import React from "react";

export const socket = socketio.connect("172.107.172.6:8000");
export const SocketContext = React.createContext();