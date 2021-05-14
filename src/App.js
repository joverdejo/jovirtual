import './App.css';
import { React, useState } from 'react';
import TonePad from './Components/TonePad.js'

function App() {

  return (
    
      <div className="App-body">
        <div id = "login-wrapper" className = "login-wrapper">
          <div className = "login-text">Input MIT ID (or any other meaningful string)</div>
        <form className="login" action = "/" method = "GET" ><input name = "id" type="text" autoComplete="off"/>	</form>
        </div>
        <div id="welcome" className="welcome" >
          <h1>welcome to jovirtual</h1>
          <p>press and hold anywhere to create</p>
          <p>(if on mobile, make sure ringer is on)</p>
          </div>
        <div id = "tonepad">
          <TonePad />
        </div>
      </div>
    
  );
}

export default App;
