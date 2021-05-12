
import '../Styles/TonepadStyle.css'
import { React, useRef } from 'react';
import * as Tone from 'tone';
import {v4 as uuidv4} from 'uuid';


function TonePad() {
  const pad = useRef(null);
  const loopBeat = useRef(null);
  const clientX = useRef(null);
  const clientY = useRef(null);
  const clientXNorm = useRef(null);
  const clientYNorm = useRef(null);
  const clientYBucket = useRef(null);
  const deltaY = useRef(null);
  let id = uuidv4();
  var beat = useRef(0);
  var pitches = useRef("ABC");
  const melody = useRef([]);
  const pitchDictM = {"0":[60],"1":[62],"2":[64],"3":[65],"4":[67],"5":[69],"6":[71],"7":[72],
                      "8":[74],"9":[75],"A":[77],"B":[79],"C":[81],"D":[82],"E":[84],"F":[85]}
  const pitchDictC = {"0":[53],"1":[54],"2":[55],"3":[56],"4":[57],"5":[58],"6":[59],"7":[60],
                      "8":[61],"9":[62],"A":[63],"B":[64],"C":[65],"D":[66],"E":[67],"F":[68]}

  // const distortion = new Tone.Distortion();
  const filter = new Tone.Filter(1500, "lowpass");
  const verb = new Tone.Reverb({decay:10, wet:0.3});
  const delay = new Tone.FeedbackDelay("8n", 0.7);
  const s1 = useRef(new Tone.Sampler({
    volume: -10,
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
  }).chain(filter,verb,delay, Tone.Master));

  const s2 =  useRef(new Tone.Sampler({
    volume: -10,
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination());

  function processSounds(data,uid){
    for (var other_uid in data){
      // console.log(other_uid);
      if (other_uid == uid ) continue;
      s1.current.triggerAttackRelease((data[other_uid]["x"] + data[other_uid]["y"]) % 500, 0.9);
    }
  }

  function makeMelody(){
    //assuming that n is a string, each element is between 0-9
    melody.current = []  
    getMelody();
      console.log("making melody")
      for (var i in pitches.current){
        melody.current.push(Tone.Frequency(pitchDictC[pitches.current[i]],"midi").toFrequency())
      }
  }

  function getMelody(){
    fetch('https://jovirtual-server.herokuapp.com/jovirtual/card')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        if (data) {
          pitches.current = data
          console.log(data);
        }
      }).catch(err => console.error(err));
  }
  
  function sendData(){
    fetch('https://jovirtual-server.herokuapp.com/jovirtual/coords', {
      method: 'POST',
      body: JSON.stringify({
        x: clientX.current,
        y: clientY.current,
        userId: id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then(function (data) {
      processSounds(data,id);
      console.log(data);
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
    });
  }

  const song = (time) => {
    if (beat.current == 0){
      makeMelody();
    }
    beat.current = (beat.current + 1) % 8
    clientYNorm.current = 1-clientY.current/window.innerHeight
    clientXNorm.current = clientX.current/window.innerWidth
    var prev = clientYBucket.current
    clientYBucket.current = Math.abs((clientYBucket.current + deltaY.current)/150) * 0.9 > 1 ? 
    1 : Math.abs((clientYBucket.current + deltaY.current)/150) * 0.9;
    sendData();
    clientYBucket.current = 0.95*prev + clientYBucket.current*(1-0.95);
    //s1.current.set({volume:clientYBucket.current})
    delay.set({wet:(delay.wet.value+clientYBucket.current)/2})
    filter.set({frequency: (clientYNorm.current**2)*15000+400});
    var rhythm = (parseInt(clientXNorm.current*256)).toString(2);
    while (rhythm.length < 8) rhythm = "0"+rhythm
    console.log(rhythm);
    if (rhythm[beat.current] === "1"){ 
      s1.current.triggerAttackRelease(melody.current[beat.current], 0.9);
    }

  };


  //---------Handle TOUCH START
  const handleTouchStart = (e) => {
    if (e.touches != null) {
      clientY.current = Math.abs(e.touches[0].clientY);
      clientX.current = Math.abs(e.touches[0].clientX);
    }
    else {
      clientY.current = Math.abs(e.clientY);
      clientX.current = Math.abs(e.clientX);
    }
    if (clientX.current == null) {
      clientX.current = 440
    }
    if (clientY.current == null) {
      clientY.current = 440
    }
    // pointer.current.style.visibility = "visible"
    // pointer.current.style.transform = `translate(${clientX}px, ${clientY }px)`

    pad.current.style.boxShadow = "inset 0 0 30px #000000"

    if (loopBeat.current == null) {
      loopBeat.current = new Tone.Loop(song, '16n');
    }
    loopBeat.current.start(0)
    // osc.connect(filterLow);
    // osc.start();
    // osc.frequency.value = clientY;
    // filterLow.frequency.value = clientX + 300;

    Tone.Transport.bpm.value = 120
    Tone.start()
    Tone.Transport.start()

  };

  //helper
  const zigzag = (v, high) => {
    return Math.abs(high - Math.abs((high - v % (2 * high))))
  };


  //---------Handle TOUCH MOVE
  const handleTouchMove = (e) => {
    
    if (e.touches != null) {
      deltaY.current = Math.abs(e.touches[0].clientY)-clientY.current 
      clientY.current = Math.abs(e.touches[0].clientY);
      clientX.current = Math.abs(e.touches[0].clientX);
    }
    else {
      deltaY.current = Math.abs(e.clientY)-clientY.current 
      clientY.current = parseInt(Math.abs(e.clientY));
      clientX.current = parseInt(Math.abs(e.clientX));
    }
    //mod each 3 digits of id here
    
    var a = zigzag(clientX.current, 255)
    var b = zigzag(clientY.current, 255)
    // var c = zigzag((clientX.current+clientY.current),255)
    document.body.style.backgroundColor = `rgb(${a}, ${b}, 100)`;
  };

  //---------Handle TOUCH END
  const handleTouchEnd = () => {
    pad.current.style.boxShadow = "inset 0 0 20px #000000"
    if (loopBeat.current == null) {
    }
    else {
      loopBeat.current.stop()
    }

    Tone.Transport.stop()
  };



  return (
    <div >
      <div id="pad" ref={pad}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart} onMouseMove={handleTouchMove} onMouseUp={handleTouchEnd} className="app">
      </div>
    </div>
  );
}

export default TonePad;
