var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var domtoimage = require('dom-to-image');
var bodyParser = require('body-parser');

/////////////Tell Socket.io to accept connections
//var allClients = [];
io.on('connection', function(socket){
  //A new user has connected!
  //allClients.push(socket);
  var players = [];
  var playersBody = [];
  socket.on("id", function(id){
	  players.push(id);
  });
  socket.on("idBody", function(body){
	  playersBody.push(body);
  });
  socket.emit("players", players);
  socket.emit("playersBody", playersBody);
  socket.on('firstPlace', function(elem, inner, id, left, top, facingRight){
	  io.emit('firstPlaceAvatar', elem, inner, id, left, top, facingRight);
  });  
  /*socket.on('disconnect', function(){
	  var i = allClients.indexOf(socket);
	  allClients.splice(i, 1);
  });*/
});




///////////////Start the server and such
app.get('/', (req, res) => {
	res.sendFile('/human2.html', { root: __dirname });
});
app.get('/clothed', (req, res) => {
	res.sendFile('/humanClothes.html', { root: __dirname });
});
//just use a different route
app.get("/world", function(req, res, next){
	res.sendFile('/world.html', { root: __dirname });
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
var port = process.env.PORT || 8081;
//If you're running locally, you can now open localhost:8080 in a web browser and see it running!
http.listen(port, function(){
  console.log('listening on *:8081');
});
