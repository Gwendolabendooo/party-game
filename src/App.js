import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Paires from './views/paires';
import Score from './components/Score';

function App() {
  return (
    <div className="mini-games">
        <Paires />
        <Score />
    </div>
  );
}

export default App;
