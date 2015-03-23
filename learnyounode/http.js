// require the http module
var http = require('http');

// set some variables
var host = 'localhost';
var port = 8124;

// create a server instance and pass an anonymous function to handle requests
http.createServer(function (req, res) {
    console.log('* Request received');

    // set response headers
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // finalize response
    res.end('Hello World\n');
}).listen(port, host);

console.log('Server running at http://{host}:{port}/'.replace('{host}', host).replace('{port}', port));