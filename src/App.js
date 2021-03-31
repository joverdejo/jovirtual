import React from "react";
import * as Tone from "tone";
//samples from https://github.com/Tonejs/audio

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      id: '',
  
      beat: 1,
  
      octave: 1,
  
      sampler1: new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
          A2: "A2.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/casio/",
      }).toDestination(),
  
      sampler2: new Tone.Sampler({
        urls: {
          C1: "bass.mp3",
          C2: "chords.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/loop/",
      }).toDestination(),
  
      sampler3: new Tone.Sampler({
        urls: {
          C1: "hihat.mp3",
          D1: "kick.mp3",
          E1: "snare.mp3",
          F1: "tom1.mp3",
          G1: "tom2.mp3",
          A1: "tom3.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/drum-samples/Stark/",
      }).toDestination(),
  
      sampler4: new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
          A2: "A2.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      }).toDestination(),
  
      clockExists: false,
    
      delay: new Tone.FeedbackDelay("8n", 0.5).toDestination(),

      delayVal: 0.5,
      
      subdivisionVal: "8n",

      dv: "",

      sv: ""
  
    };
    this.submitDelayTime = this.submitDelayTime.bind(this);
    this.submitDelaySubdivision = this.submitDelaySubdivision.bind(this);
    this.changeDelayTime = this.changeDelayTime.bind(this);
    this.changeDelaySubdivision = this.changeDelaySubdivision.bind(this);
  }
  
  componentDidMount() {
    if (!this.state.clockExists) {
      const clock = new Tone.Clock(time => {
        this.setState({ beat: parseInt(time) % 4 + 1 });
        console.log(this.state.beat);
      }, 1);
      clock.start();
      this.setState({ clockExists: true })
    }
    console.log("Mounted!")
  };

 
  changeDelayTime(event) {
    this.setState({dv: event.target.value});
  }

  changeDelaySubdivision(event) {
    this.setState({sv: event.target.value});
  }


  submitDelayTime(event) {
    var num = this.state.dv;
    if (num >= 1 || num < 0) alert("please use numbers betweeen 0 and 1");
    else this.setState({delay: new Tone.FeedbackDelay(this.state.subdivisionVal, num).toDestination(),delayVal:num});
    event.preventDefault();
  }

  submitDelaySubdivision(event) {
    var num = this.state.sv + "n";
    if (num < 0) alert("please use positive numbers");
    else this.setState({delay: new Tone.FeedbackDelay(num, this.state.delayVal).toDestination(),subdivisionVal:num});
    event.preventDefault();
  }

  addNote(n, s) {
    if (n === 1) this.state.sampler1.triggerAttackRelease([s], 0.5).connect(this.state.delay);
    if (n === 2) this.state.sampler2.triggerAttackRelease([s], 0.5).connect(this.state.delay);
    if (n === 3) this.state.sampler3.triggerAttackRelease([s], 0.5);
    if (n === 4) this.state.sampler4.triggerAttackRelease([s], 0.5).connect(this.state.delay);
  };

  makePiano(sampleNum) {
    return (
      <div className="note-wrapper">
        <button className="note" onClick={() => this.addNote(sampleNum, "C" + String(this.state.octave))}>
          C
        </button>
        <button className="note" onClick={() => this.addNote(sampleNum, "D" + String(this.state.octave))}>
          D
        </button>
        <button className="note" onClick={() => this.addNote(sampleNum, "E" + String(this.state.octave))}>
          E
        </button>
        <button className="note" onClick={() => this.addNote(sampleNum, "F" + String(this.state.octave))}>
          F
        </button>
        <button className="note" onClick={() => this.addNote(sampleNum, "G" + String(this.state.octave))}>
          G
        </button>
        <button className="note" onClick={() => this.addNote(sampleNum, "A" + String(this.state.octave))}>
          A
        </button>
        <button className="note" onClick={() => this.addNote(sampleNum, "B" + String(this.state.octave))}>
          B
        </button>
        <button className="note" onClick={() => this.addNote(sampleNum, "C" + String(this.state.octave + 1))}>
          C
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.makePiano(1)}
        {this.makePiano(4)}
        {this.makePiano(2)}
        {this.makePiano(3)}
        <form onSubmit={this.submitDelayTime}>
          <label>
          Delay Time:
          <input type="text" value={this.state.dv} onChange={this.changeDelayTime}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>

        <form onSubmit={this.submitDelaySubdivision}>
          <label>
          Delay Subdivision: 
          <input type="text" value={this.state.sv} onChange={this.changeDelaySubdivision}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}