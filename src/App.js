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
import Transition from './components/transition';
import CreLobby from './components/creLobby';
import Stopwatch from './components/Stopwatch';


function App() {


  return (
    <Router>
        <Switch>
            <Route path="/">
                <div className="mini-games">
                    <CreLobby  test={"test"}/>
                </div>
            </Route>
      </Switch>
    </Router>
  );
}

export default App;
