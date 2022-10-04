import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';

import {SocketContext, socket} from './components/socket';

import React, { Suspense, lazy } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cgu from './views/cgu';
const CreLobby = lazy(() => import('./components/creLobby'));

socket.on('connection', (connected) => {
    console.log(connected);
    socket.emit('connection', "client");
});

//here we create an object to store the current state of the application
ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><CreLobby/></Suspense>} />
        <Route path="/CGU" element={<Cgu/>} />
        <Route path="/Confidential" element={<Cgu/>} />
      </Routes>
    </BrowserRouter>
  </SocketContext.Provider>,
  document.getElementById("root")
);

serviceWorker.register(); 