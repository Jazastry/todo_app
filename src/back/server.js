// express initialization
let express = require('express'),
    path = require('path'),
    paths = require(path.resolve(process.cwd(), './config/paths.js'));

var app = express();
var serverPort = 8888;

// serve public files
app.use(express.static(path.resolve(process.cwd(), paths.build)));


var server = app.listen(serverPort, function() {
    console.log('listening on port ', serverPort);
});
