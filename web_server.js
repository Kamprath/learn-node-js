var express = require('express');
var server = express.createServer();
var port = 8000;

function handleRequest(req, res) {
    res.send('Welcome to Node Twitter!');
}

server.get('/', handleRequest);

server.listen(port);
console.log('Listening on port {port}...'.replace('{port}', port));