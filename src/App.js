import './App.css';
import React from 'react'

import TonePad from './Components/TonePad.js'

function App() {

  return (
    
    <div className="App-body">
      <div id="welcome" className="welcome">
        <h1>welcome to jovirtual</h1>
        <p>press and hold anywhere to create</p>
        <p>(if on mobile, make sure ringer is on)</p>
        </div>
        <TonePad />
    </div>
  );
}

export default App;
