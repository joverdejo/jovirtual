
import '../Styles/TonepadStyle.css'

import { React, useRef } from 'react';
import * as Tone from 'tone';

function TonePad() {
  const pad = useRef(null);
  const loopBeat = useRef(null);
  const clientX = useRef(null);
  const clientY = useRef(null);
  const s1 = useRef(new Tone.Sampler({
    volume: -10,
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
  }).toDestination())


  const song = (time) => {
    var beat = parseInt(time) % 4;
    console.log(beat)
    if (clientX.current == null){
      clientX.current = 440
    }
    if (clientY.current == null){
      clientY.current = 440
    }
    s1.current.triggerAttackRelease((clientX.current+clientY.current)%500, 0.9);
  };


  //---------Handle TOUCH START
  const handleTouchStart = (e) => {
    if (e.touches != null){
      clientY.current = Math.abs(e.touches[0].clientY);
      clientX.current = Math.abs(e.touches[0].clientX);
      }
      else{
      clientY.current = Math.abs(e.clientY);
      clientX.current = Math.abs(e.clientX);
      }
      if (clientX.current == null){
        clientX.current = 440
      }
      if (clientY.current == null){
        clientY.current = 440
      }
    // pointer.current.style.visibility = "visible"
    // pointer.current.style.transform = `translate(${clientX}px, ${clientY }px)`

    pad.current.style.boxShadow = "inset 0 0 30px #000000"

    if (loopBeat.current == null) {
      loopBeat.current = new Tone.Loop(song,  '8n');
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
  const zigzag = (v,high) => {
    return Math.abs(high- Math.abs((high-v%(2*high))))
  };


  //---------Handle TOUCH MOVE
  const handleTouchMove = (e) => {
    if (e.touches != null){
    clientY.current = Math.abs(e.touches[0].clientY);
    clientX.current = Math.abs(e.touches[0].clientX);
    }
    else{
    clientY.current = parseInt(Math.abs(e.clientY));
    clientX.current = parseInt(Math.abs(e.clientX));
    }
    if (clientX.current == null){
      clientX.current = 440
    }
    if (clientY.current == null){
      clientY.current = 440
    }
    //mod each 3 digits of id here
    
    var a = zigzag(clientX.current,255)
    var b = zigzag(clientY.current,255)
    // var c = zigzag((clientX.current+clientY.current),255)
    document.body.style.backgroundColor =  "rgb(" + a  + ", "+ b +", " + "100" + ")";
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
