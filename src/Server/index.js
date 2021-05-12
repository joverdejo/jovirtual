var db = {};
var card = "";
const express = require('express');
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.post('/jovirtual/coords', coords)
app.post('/jovirtual/card', postCard)
app.get('/jovirtual/card', getCard)
app.get('/jovirtual/clean', cleanDB)
var port = process.env.PORT || 8080;

function coords(req, res){
  var x = req.body["x"]
  var y = req.body["y"]
  var id = req.body["userId"]
  db[id] = {x:x,y:y}
  res.status(200).send(db)
}

function getCard(req,res){
  res.send(card)
}

function cleanDB(req,res){
  db = {}
  res.send("db is cleaned")
}

function postCard(req, res){
  card = req.body["cardId"]
  card = card.replace(/[^0-9a-f]/gi, '').toUpperCase()
  res.status(200).send("melody changed to: " + card)
}


app.listen(port, "0.0.0.0")

