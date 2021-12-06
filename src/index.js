import App from "./App";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";

import {SocketContext, socket} from './components/socket';

socket.on('connection', (connected) => {
    console.log(connected);
    socket.emit('connection', "client");
});

//here we create an object to store the current state of the application
ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <App />
  </SocketContext.Provider>,
  document.getElementById("root")
);
