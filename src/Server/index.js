var db = {};
var card = "12345";
const express = require('express');
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.get('/', cleanMessage)
app.post('/jovirtual/coords', postCoords)
app.post('/jovirtual/card', postCard)
app.get('/jovirtual/coords', getCoords)
app.get('/jovirtual/card', getCard)
app.get('/jovirtual/clean', cleanDB)
var port = process.env.PORT || 8080;

function cleanMessage(req, res){
  res.status(200).send("Go to /jovirtual/clean to clean db")
  return "Done!"
}

function postCoords(req, res){
  var x = req.body["x"]
  var y = req.body["y"]
  var d = req.body["d"]
  var f = req.body["f"]
  var id = req.body["userId"]
  var mouseDown = req.body["mouseDown"]
  db[id] = {x:x,y:y,mouseDown:mouseDown,d:d,f:f}
  res.status(200).send(db)
  return "Done!"
}
function getCoords(req, res){
  res.status(200).send(db)
  return "Done!"
}

function getCard(req,res){
  res.status(200).send(card)
  return "Done!"
}

function cleanDB(req,res){
  db = {}
  res.status(200).send("db is cleaned")
  return "Done!"  
}

function postCard(req, res){
  card = req.body["cardId"]
  card = card.replace(/[^0-9a-f]/gi, '').toUpperCase()
  res.status(200).send("melody changed to: " + card)
  return "Done!"
}


app.listen(port, "0.0.0.0")

