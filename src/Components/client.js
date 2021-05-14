var coords;
var sounds;
var pitches = "";
export function sendData(x,y,id,mouse,d,f){
    //switch to http://localhost:8080/jovirtual/coords when debugging
    fetch('https://jovirtual-server.herokuapp.com/jovirtual/coords', {
      method: 'POST',
      body: JSON.stringify({
        x: x,
        y: y,
        userId: id,
        mouseDown: mouse,
        d:d,
        f:f
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
      coords = data
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
    });
    return coords
  }

  export function getOtherSounds(){
    fetch('https://jovirtual-server.herokuapp.com/jovirtual/coords')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(data => {
        if (data) {
          sounds = data
          return data
        }
      }).catch(err => console.error(err));
      return sounds
  }
  
  export function getPitches(){  
    fetch('https://jovirtual-server.herokuapp.com/jovirtual/card')
      .then(response => {
        if (response.ok) {
            return response.json();
        }}).then(data => {
        if (data) {
            pitches = data;
            return data;
        }
      }).catch(err => console.error(err));
      return pitches
  }
  