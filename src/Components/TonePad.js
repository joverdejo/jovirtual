
import '../Styles/TonepadStyle.css'
import { React, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import {getPitches,getOtherSounds,sendData} from './client.js'
import fx from 'fireworks';
import * as samplers from './samplers';
var seedrandom = require('seedrandom');

function TonePad() {
  var otherSamplers = {}
  const pad = useRef(null);
  const loopBeat = useRef(null);
  const clientX = useRef(null);
  const clientY = useRef(null);
  const clientXNorm = useRef(null);
  const clientYNorm = useRef(null);
  const clientYBucket = useRef(null);
  const deltaY = useRef(null);
  let id = useRef(123456789);
  var beat = useRef(0);
  var pitches = useRef({"card":"ACFABAC"});
  var mouseDown = useRef(false);
  const melody = useRef([100,200,100,150,300,250]);
  const pitchDictM = {"0":[60],"1":[62],"2":[64],"3":[65],"4":[67],"5":[69],"6":[71],"7":[72],
                      "8":[74],"9":[75],"A":[77],"B":[79],"C":[81],"D":[82],"E":[84],"F":[85]}
  const pitchDictC = {"0":[53],"1":[54],"2":[55],"3":[56],"4":[57],"5":[58],"6":[59],"7":[60],
                      "8":[61],"9":[62],"A":[63],"B":[64],"C":[65],"D":[66],"E":[67],"F":[68]}

  //temporary values if ID not set
  var filter = samplers.filter1;
  var verb = samplers.verb1;
  var delay = samplers.delay1;
  var sampler =  useRef(samplers.s1);
  
  
  var [c1,c2,c3] = [0,0,0]
  //runs at start
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    document.body.style.backgroundColor = `rgb(100, 100, 100)`;
    if (urlParams.get('id')){
      id.current = urlParams.get('id')
      if (document.getElementById('login-wrapper')){
          document.getElementById('login-wrapper').remove();
        }
        [filter,verb,delay,sampler.current] = selectSampler(id.current)
    }
      seedrandom(id.current.toString(), { global: true });
      c1 = "#" + Math.floor(Math.random()*16777215).toString(16);
      c2 = "#" + Math.floor(Math.random()*16777215).toString(16);
      c3 = "#" + Math.floor(Math.random()*16777215).toString(16);
  }, []) 

  function selectSampler(mitID){
    seedrandom(mitID.toString(), { global: true });
    var choose = Math.round(Math.abs((Math.random() * (samplers.samplersList.length-1))))
    //resets things back to normal for user
    seedrandom(id.current.toString(), { global: true });
    return samplers.samplersList[choose]
  }

  function generateOtherSounds(data,uid){
    for (var other_uid in data){
      if (other_uid === uid || !data[other_uid]["mouseDown"]) continue;
      if (!(other_uid in otherSamplers)){
      var [otherFilter,otherVerb,otherDelay,otherSampler] = selectSampler(other_uid);
      otherSamplers[other_uid] = {}
      otherSamplers[other_uid]["filter"] = otherFilter
      otherSamplers[other_uid]["verb"] = otherVerb
      otherSamplers[other_uid]["delay"] = otherDelay
      otherSamplers[other_uid]["sampler"] = otherSampler
      seedrandom(other_uid.toString(), { global: true });
      otherSamplers[other_uid]["c1"] = "#" + Math.floor(Math.random()*16777215).toString(16);
      otherSamplers[other_uid]["c2"] = "#" + Math.floor(Math.random()*16777215).toString(16);
      otherSamplers[other_uid]["c3"] = "#" + Math.floor(Math.random()*16777215).toString(16);
      }
      otherSamplers[other_uid]["delay"].set({wet: data[other_uid]["d"]});
      otherSamplers[other_uid]["filter"].set({frequency: data[other_uid]["f"]});
      otherSamplers[other_uid]["sampler"].triggerAttackRelease(melody.current[beat.current%melody.current.length], 0.9);
      fx({
        x: data[other_uid]["x"]*window.innerWidth,
        y: data[other_uid]["y"]*window.innerHeight,
        colors: [otherSamplers[other_uid]["c1"],otherSamplers[other_uid]["c2"],otherSamplers[other_uid]["c3"]]
      })
    }
    
  }

  function makeMelody(){
    //assuming that n is a string, each element is between 0-9  
    pitches.current["card"] = getPitches()["card"];
    var newPitches = pitches.current["card"]
    if (newPitches === undefined){
      newPitches = "12345"
    }
    if (newPitches.length > 0) {
      melody.current = []
    };
    for (var i in newPitches.split("")){
      melody.current.push(Tone.Frequency(pitchDictC[newPitches[i]],"midi").toFrequency())
    }
  }
  
  function createSound(){
    clientYNorm.current = 1-clientY.current/window.innerHeight
    clientXNorm.current = clientX.current/window.innerWidth
    var prev = clientYBucket.current
    clientYBucket.current = Math.abs((clientYBucket.current + deltaY.current)/150) * 0.9 > 1 ? 
    1 : Math.abs((clientYBucket.current + deltaY.current)/150) * 0.9;
    clientYBucket.current = 0.95*prev + clientYBucket.current*(1-0.95);
    delay.set({wet:(delay.wet.value+clientYBucket.current)/2})
    filter.set({frequency: (clientYNorm.current**2)*15000+400});
    return [((delay.wet.value+clientYBucket.current)/2), ((clientYNorm.current**2)*15000+400)]
  }

  const song = (time) => {
    if (beat.current === 0){
      makeMelody();
    }
    beat.current = (beat.current + 1) % 8
    var [d,f] = createSound();
    var rhythm = (parseInt(clientXNorm.current*256)).toString(2);
    while (rhythm.length < 8) rhythm = "0"+rhythm
    var flag = mouseDown.current
    if (rhythm[beat.current] === "0") mouseDown.current = false 
    sendData(clientX.current/window.innerWidth, clientY.current/window.innerHeight, id.current, mouseDown.current, d, f);
    mouseDown.current = flag
    if (rhythm[beat.current] === "1" && mouseDown.current){ 
      sampler.current.triggerAttackRelease(melody.current[beat.current%melody.current.length], 0.9);
      fx({
        x: clientX.current,
        y: clientY.current,
        colors: [c1,c2,c3]
      })
    }
    var d = getOtherSounds();
    generateOtherSounds(d,id.current);

  };


  //---------Handle TOUCH START
  const handleTouchStart = (e) => {
    mouseDown.current = true
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
    var a = (1-clientY.current/window.innerHeight)*255
    var b = (clientX.current/window.innerWidth)*255
    //changes welcome message color if not hardcoded in app.css
    // var c = (Math.min(a+90,255) == 255) ? a-90 : a+90 
    // var d = (Math.min(b+90,255) == 255) ? b-90 : b+90 
    // var f = (Math.min(a+90,255) == 255) ? 10 : 190
    // document.getElementById('welcome').style.color = `rgb(${c}, ${d}, ${f})`;;
    seedrandom(id.current.toString(), { global: true });
    document.body.style.backgroundColor = `rgb(${a}, ${b}, ${Math.random()*200})`;
  };

  //---------Handle TOUCH END
  const handleTouchEnd = () => {
    mouseDown.current = false
    var [d,f] = createSound();
    sendData(clientX.current/window.innerWidth, clientY.current/window.innerHeight, id.current, mouseDown.current, d,f);
    pad.current.style.boxShadow = "inset 0 0 20px #000000"
  };



  return (
    <div>
      <div id="pad" ref={pad}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart} onMouseMove={handleTouchMove} onMouseUp={handleTouchEnd} className="app">
      </div>
    </div>
  );
}

export default TonePad;
