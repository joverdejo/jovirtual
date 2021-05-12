const db = {};
const express = require('express');
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://jovirtual.herokuapp.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

