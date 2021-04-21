// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 5000;


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });


// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`);
// });

// const express = require('express');
// const bodyParser = require('body-parser')
// const path = require('path');
// const app = express();
// app.use(express.static(path.join(__dirname, '/')));

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

// app.listen(process.env.PORT || 8080);

const db = {};
const express = require('express');
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/coords', respond)

function respond(req, res){
  var x = req.body["x"]
  var y = req.body["y"]
  var id = req.body["userId"]
  db[id] = {x:x,y:y}
  res.status(200).send(db)
}

app.listen(8080)