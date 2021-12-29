import socketio from "socket.io-client";
import React from "react";

export const socket = socketio.connect("localhost:8000", {
    withCredentials: true,
    
    transportOptions: {
      polling: {
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      }
    }
});
export const SocketContext = React.createContext();