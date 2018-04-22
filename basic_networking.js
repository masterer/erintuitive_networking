const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
require('es6');
//const SetInterval = require('set-interval');

var domtoimage = require('dom-to-image');
var bodyParser = require('body-parser');

/////////////Tell Socket.io to accept connections
//var allClients = [];
var players = {};
var afk = {};
//var totalPositions = [['420px', '0px'], ['73px', '0px'], ['143px', '30px'], ['85px', '200px'], ['200px', '200px'], ['345px', '7px'], ['0px', '230px'], ['195px', '90px'], ['305px', '210px'], ['259px,', '10px']];
var numPlayers = 0;
io.on('connection', function(socket){
  //A new user has connected!
  socket.on("msg", function(value, name, id){
    io.emit("msgReturn", value, name);
    afk[`${id}`] = 0;
  });
  socket.on("afk", function(id){
    afk[`${id}`] += 1;
    io.emit("afkReturn", id, afk);
  });
  socket.on("removePlayer", function(id){
    io.emit("removePlayerReturn", id);
    delete players[id];
    numPlayers--
  });
  socket.on("updateId", function(id, x, y){
    afk[`${id}`] = 0;
    if(players[`${id}`] != null && players[`${id}`] != undefined){
      players[`${id}`][2] = x;
      players[`${id}`][3] = y;
      io.emit("playerUpdate", id, x, y);
    }
  });
  socket.on("id", function(id, char, charLeft, name, x, y){
    numPlayers++
    /*for(player in players){
      var myPlayer = players[player];
      if(myPlayer[0] == char){
        io.emit("removePlayerReturn", player);
        delete players[player];
      }
    }*/
    if(numPlayers <= 25){
      players[`${id}`] = [char, charLeft, x, y, name, numPlayers];
    }
    else {
      socket.emit("roomFull");
    }
    afk[`${id}`] = 0; 
    io.emit("players", players, numPlayers);
  });
  socket.on("blinkInterval", function(id){
    io.emit("blinkResponse", id);
  });
});

///////////////Start the server and post redirect
app.post('/', (req, res) => {
  res.redirect('/');
});
app.get('/', (req, res) => {
	res.sendFile('/human2.html', { root: __dirname });
});
app.get('/clothes', (req, res) => {
	res.sendFile('/humanClothes.html', { root: __dirname });
});
//just use a different route
app.get("/world", function(req, res, next){
	res.sendFile('/world.html', { root: __dirname });
});
app.get("/thanks", (req, res) => {
  res.sendFile('/thankyou.html', { root: __dirname});
});
app.get("/drawing", (req, res) => {
  res.sendFile('/static/DrawingBoard/drawing.html', { root: __dirname});
});

app.use(express.static((__dirname + '/static')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.post("/clothes", function(req, res){
	res.sendFile("/"+req.body.clothing, { root: __dirname });
});
app.post("/world", function(req, res){
	res.sendFile("/"+req.body.world, { root: __dirname });
});

//app listen to port
var port = process.env.PORT || 8085;
http.listen(port, function(){
  console.log('listening');
});