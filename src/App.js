import './App.css';
import React from 'react'

import TonePad from './Components/TonePad.js'

function App() {

  const handleTouchStart = () => {
    console.log("hey")
    document.getElementById('welcome').remove();
  };

  return (
    
    <div className="App-body">
      <div id="welcome" className="welcome" onTouchStart={handleTouchStart} onMouseDown={handleTouchStart} >
        <h1>welcome to jovirtual</h1>
        <p>press and hold anywhere to create</p>
        <b>(if on mobile, make sure ringer is on)</b>
        </div>
        <TonePad />
    </div>
  );
}

export default App;
