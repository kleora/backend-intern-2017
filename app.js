// main dependencies
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.server = http.createServer(app);

// config file
var config = require('./config');

// allow origin and use url-encoded body for POST
app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'HEAD,GET,POST,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept, X-HTTP-Method-Override');

	// intercept OPTIONS method
	if (req.method == 'OPTIONS') {
	  res.sendStatus(200);
	} else {
	  next();
	}
});

//app.use(bodyParser.urlencoded({ extended: false }));

// support URL-encoded bodies
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


// load api routes
const api_router = require("./api");
app.use("/api", api_router);

// Connect db
//const connection = mongoose.connect("mongodb://localhost:27017/intern-2017").connection;
const connection = mongoose.connect(config.mongoURI[app.settings.env]).connection;

// Call startServer once finished connecting to mongodb
connection
	.on("error", console.error)
	.on("disconnected", function() { console.log("db disconnected"); })
	.once("open", startServer);
	
// start server on port 3000
function startServer(){
	app.server.listen(3000);
	console.log("Database connected: " + config.mongoURI[app.settings.env]);
	console.log("Server started on port 3000");
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

function gracefulExit() {
  mongoose.connection.close(function () {
    console.log('mongoose disconnected through app termination');
    process.exit(0);
  });
}

// for testing
module.exports = app;