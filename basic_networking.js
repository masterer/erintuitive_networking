var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');

/////////////Tell Socket.io to accept connections
io.on('connection', function(socket){
  //A new user has connected!
  console.log("Hello user!")//This will output on the server side

  //If the server gets a 'new-click' message, tell everyone who's connected!
  socket.on('new-click', function(msg){
    io.emit('new-click', msg);
  });
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
	var file = req.params[0];
	res.sendFile(__dirname + "/" + file);
	//return res.writeHead(200, {'Content-Type': 'text/plain'});
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
