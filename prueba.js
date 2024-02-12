
/// Creating a simple HTTP Server in Nodejs
var http = require('http');
var url = require('url');

function a(request, response) {
	console.log("REQUEST: " + request.url );
	var url_info = url.parse( request.url, true ); //all the request info is here
	var pathname = url_info.pathname; //the address
	var params = url_info.query; //the parameters
	response.end("OK!"); //send a response
}

var server = http.createServer( a );

server.listen(1337, function() {
	console.log("Server ready!" );
});




// Creating a WebSocket server in NodeJS
var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({ // create the server
    httpServer: server //if we already have our HTTPServer in server variable...
});

function b(request) {
    var connection = request.accept(null, request.origin);
    console.log("NEW WEBSOCKET USER!!!");
    connection.sendUTF("welcome!");
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
		console.log( "NEW MSG: " + message.utf8Data ); // process WebSocket message
        }
    });

    connection.on('close', function() {
	  //connection is this
	  console.log("USER IS GONE");// close user connection
    });
}

wsServer.on('request', b);




// Express JS
var express = require('express');
var app = express();

//to handle static files, redirect to public folder
app.use(express.static('public'));

//to handle request of type GET to path '/'
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//use all instead of get to accept any request type
app.all('/news', function (req, res) {
	res.send('Hello Worldddddddd!');
});

//to send manually a file (you can use the public folder)
app.get('/news', function (req, res) {
 res.sendFile( 'data/news.json', { root: __dirname });
});

//to launch
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//example of a GET request with url parameters: /info?name=javi
app.all('/info', function (req, res) {
  var url_info = url.parse(req.url, true);
  res.send( JSON.stringify(url_info.query) ); //shows {"name":"javi"}
});



/*
// Express request

//to parse form data inside the request body we need this library
var bodyParser = require('body-parser')
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({extended: true}) ); //unicode

//example of a GET request with url parameters: /info?name=javi
app.all('/info', function (req, res) {
  var url_info = url.parse(req.url, true);
  res.send( JSON.stringify(url_info.query) ); //shows {"name":"javi"}
});

//to get url parameters from inside the path: /news/javi
app.all('/news/:user', function (req, res) {
 res.send( getNewsOfUser( req.params.user ) ); //user is javi
});

//example of a POST request with parameters inside the body from Form
app.all('/test', function (req, res) {
 res.send( JSON.stringify(req.body) );
});


// Express upload files
//add support to upload files
var fileUpload = require('express-fileupload');
app.use( fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.all('/upload', function (req, res) {
  var url_info = url.parse(req.url, true);
  var file = req.files.file;
  console.log("saving file: " + file.name );
  //save file with a given name
  fs.writeFileSync("public/" + file.name, file.data );
  res.send( { status: "ok" } ); 
});



// Express + websockets
var express = require('express');
var http = require('http');
var WebSocketServer = require('websocket').server;

const app = express();

//initialize a simple http server
const server = http.createServer( app );

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ httpServer: server });

server.listen( 9004, function() {
        console.log("Server ready!" );
});
*/

// app.get --> GET Request:

/*Purpose: Used to request data from a specified resource.
Data Transmission: Data is appended to the URL as query parameters. It is visible in the URL, and there are limitations on the amount of data that can be sent.
Caching: GET requests can be cached, and they remain in the browser history.
Idempotent: Multiple identical GET requests will produce the same result; they are considered "idempotent."*/

// app.post request:
/*POST Request:

Purpose: Used to submit data to be processed to a specified resource.
Data Transmission: Data is sent in the body of the request. It is not visible in the URL, and there are no specific limitations on the amount of data that can be sent.
Caching: POST requests are not cached, and they do not remain in the browser history.
Idempotent: In general, POST requests are not considered idempotent. They may have side effects, and multiple identical POST requests may not produce the same result. */