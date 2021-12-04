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
import AutoClickers from './views/autoClickers';

import Score from './components/Score';

import Jeux from './views/select-jeux';
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
                    <Jeux />
                </div>
            </Route>
      </Switch>
    </Router>
  );
}

export default App;
