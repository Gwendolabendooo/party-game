import socketio from "socket.io-client";
import React from "react";

export const socket = socketio.connect("micro-games.fr:8000", {
    withCredentials: false,
    
    transportOptions: {
      polling: {
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      }
    }
});
export const SocketContext = React.createContext();