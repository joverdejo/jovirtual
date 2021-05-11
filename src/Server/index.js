const db = {};
const express = require('express');
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/jovirtual/coords', respond)
var port = process.env.PORT || 8080;

function respond(req, res){
  var x = req.body["x"]
  var y = req.body["y"]
  var id = req.body["userId"]
  db[id] = {x:x,y:y}
  res.status(200).send(db)
}

app.listen(port, "0.0.0.0")

