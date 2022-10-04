import React, { Suspense, lazy } from 'react';

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
import Stopwatch from './components/Stopwatch';
const CreLobby = lazy(() => import('./components/creLobby'));


function App() {


  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            <Route path="/" component={CreLobby}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
