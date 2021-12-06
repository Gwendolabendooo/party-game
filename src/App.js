import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


import Paires from './views/paires';
import Echange from './Lobby/echange';
import AutoClickers from './views/autoClickers';

import Score from './components/Score';

import Jeux from './views/select-jeux';
import Lobby from './components/Lobby';
import CreLobby from './components/creLobby';
import Stopwatch from './components/Stopwatch';


function App() {


  return (
    <Router>
        <Switch>
            <Route path="/paires">
                <div className="mini-games">
                    <Paires />
                    <Score />
                </div>
            </Route>
            <Route path="/auto-click">
                <div className="mini-games">
                    <AutoClickers />
                    <Stopwatch />
                    <Score />
                </div>
            </Route>
            <Route path="/">
                <div className="mini-games">
                    <CreLobby  test={"test"}/>
                </div>
            </Route>
            <Route path="/ghjg">
                <div className="mini-games">
                    <Echange />
                    <Jeux/>
                </div>
            </Route>
      </Switch>
    </Router>
  );
}

export default App;
