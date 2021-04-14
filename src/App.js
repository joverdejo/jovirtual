// import React from "react";
// import * as Tone from "tone";
// import './App.css'; // Tell webpack that Button.js uses these styles
// import { EQ3, Time } from "tone";


// //samples from https://github.com/Tonejs/audio

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//       x: 0, 
      
//       y: 0,

//       id: '',

//       beat: 1,

//       octave: 1,

//       sampler1: new Tone.Sampler({
//         volume: -10,
//         urls: {
//           A1: "A1.mp3",
//           A2: "A2.mp3",
//         },
//         baseUrl: "https://tonejs.github.io/audio/casio/",
//       }).toMaster(),

//       sampler2: new Tone.Sampler({
//         volume: -25,
//         urls: {
//           C1: "bass.mp3",
//           C2: "chords.mp3",
//         },
//         baseUrl: "https://tonejs.github.io/audio/loop/",
//       }).toMaster(),

//       sampler3: new Tone.Sampler({
//         volume: -25,
//         urls: {
//           C1: "hihat.mp3",
//           D1: "kick.mp3",
//           E1: "snare.mp3",
//           F1: "tom1.mp3",
//           G1: "tom2.mp3",
//           A1: "tom3.mp3",
//         },
//         baseUrl: "https://tonejs.github.io/audio/drum-samples/Stark/",
//       }).toMaster(),

//       sampler4: new Tone.Sampler({
//         volume: -25,
//         urls: {
//           A1: "A1.mp3",
//           A2: "A2.mp3",
//         },
//         baseUrl: "https://tonejs.github.io/audio/salamander/",
//       }).toMaster(),


//       delay: new Tone.FeedbackDelay({octaves: 9, pitchDecay: 0.8}),

//       eq1: new Tone.EQ3(-100, -10, -10),

//       // seq1: new Tone.Sequence((time, note) => {
//       //   this.state.sampler1.connect(this.state.eq1).triggerAttackRelease(note, 0.5, time);
//       // }, ["C4",  "D4", "G4", ["A4", "G4"]]).start(0)

//     };
//   }


//   componentDidMount() {
//     var s1 = new Tone.Sampler({
//       volume: -10,
//       urls: {
//         A1: "A1.mp3",
//         A2: "A2.mp3",
//       },
//       baseUrl: "https://tonejs.github.io/audio/casio/",
//     }).toMaster()

//     var loopBeat = new Tone.Loop(this.song,'16n');
//     Tone.Transport.bpm.value = 120
//     Tone.start()
//     loopBeat.start(0)
//     console.log("Mounted!")
//     Tone.Transport.start()
//   };

//   song(sampler1,time){
//     console.log("her");
//     var n = parseInt(time) % 4;
//     console.log(n,time);
//     // .triggerAttackRelease(['C4'], 0.5)
//     console.log(s1);
//     // sampler1.triggerAttackRelease(['C4'], 0.5);
//     // if (n === 0) 
//     // if (n === 1) sampler2.triggerAttackRelease(['C4'], 0.5).connect(this.state.delay);
//     // if (n === 2) sampler3.triggerAttackRelease(['C4'], 0.5);
//     // if (n === 3) sampler4.triggerAttackRelease(['C4'], 0.5).connect(this.state.delay);
//   }


//   zigzag(v,high){
//     return Math.abs(high- Math.abs((high-v%(2*high))))
//   }

//   changeDelayTime() {
//     var oct = (this.zigzag(this.state.x,5))
//     var dec = (this.zigzag(this.state.y,10))*-1
//     // this.state.sampler1.disconnect();
//     // this.state.sampler1.connect(this.state.delay);
//     // this.state.sampler1.
//     // this.state.seq1.set({callback: (time, note) => {
//     //   this.state.sampler1.connect(this.state.delay).triggerAttackRelease(note, 0.5, time);
//     // }})
//     // this.state.seq1.stop()
//     // this.state.seq1.playbackRate = dec
//   }

//   _onMouseMove(e) {
//     this.setState({ x: e.screenX, y: e.screenY });
//     this.changeDelayTime();
//   }


//   addNote(n, s) {
//     if (n === 1) this.state.sampler1.triggerAttackRelease([s], 0.5).connect(this.state.delay);
//     if (n === 2) this.state.sampler2.triggerAttackRelease([s], 0.5).connect(this.state.delay);
//     if (n === 3) this.state.sampler3.triggerAttackRelease([s], 0.5);
//     if (n === 4) this.state.sampler4.triggerAttackRelease([s], 0.5).connect(this.state.delay);
//   };

//   makePiano(sampleNum) {
//     return (
//       <div className="note-wrapper">
//         <button className="note" onClick={() => this.addNote(sampleNum, "C" + String(this.state.octave))}>
//           C
//         </button>
//         <button className="note" onClick={() => this.addNote(sampleNum, "D" + String(this.state.octave))}>
//           D
//         </button>
//         <button className="note" onClick={() => this.addNote(sampleNum, "E" + String(this.state.octave))}>
//           E
//         </button>
//         <button className="note" onClick={() => this.addNote(sampleNum, "F" + String(this.state.octave))}>
//           F
//         </button>
//         <button className="note" onClick={() => this.addNote(sampleNum, "G" + String(this.state.octave))}>
//           G
//         </button>
//         <button className="note" onClick={() => this.addNote(sampleNum, "A" + String(this.state.octave))}>
//           A
//         </button>
//         <button className="note" onClick={() => this.addNote(sampleNum, "B" + String(this.state.octave))}>
//           B
//         </button>
//         <button className="note" onClick={() => this.addNote(sampleNum, "C" + String(this.state.octave + 1))}>
//           C
//         </button>
//       </div>
//     )
//   }



  // componentDidUpdate(){
  //   //mod each 3 digits of id here
  //   var a = this.zigzag(this.state.x,255)
  //   var b = this.zigzag(this.state.y,255)
  //   document.body.style.backgroundColor = "rgb("+ a  +", "+b +", +100)"
  // }
  
//     render() {
//     return (
//       <div className="app" onMouseMove={this._onMouseMove.bind(this)}>    
//         {this.makePiano(1)}
//         {this.makePiano(4)}
//         {this.makePiano(2)}
//         {this.makePiano(3)}
//         {this.makePiano(1)}
//       </div>
//     );
//   }
// }


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
