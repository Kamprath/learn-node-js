var net = require('net');
var clients = [];
var port = 9000;

/**
 * Handle client connection
 * @param client
 */
function connect(client) {
    // add client to client array
    client.id = clients.length+1;
    clients.push(client);

    // send client a greeting message
    client.write('Welcome to the server, client ' + client.id + '!\n');
    console.log('Client ' + client.id + ' connected.');
    broadcast('Client ' + client.id + ' connected');

    // initialize event handlers
    client.on('data', function(data) {
        // broadcast message to all clients
        say(data.toString(), client);
    });

    client.on('end', function() {
        // remove client from array
        clients.splice(clients.indexOf(client), 1);
        client.destroy();

        // notify server and clients of disconnect
        var msg = 'Client ' + client.id + ' disconnected';
        broadcast(msg);
        console.log(msg);
    });

    client.on('error', function(error) {
        console.log(error);
    })
}

/**
 * Broadcast a chat message to all clients
 * @param msg
 * @param client
 */
function say(msg, client) {
    broadcast('Client ' + client.id + ': ' + msg);
}

/**
 * Broadcast a message to all clients
 * @param msg
 */
function broadcast(msg) {
    for (var i in clients) {
        if (clients[i].writable) {
            clients[i].write(msg.replace(/[\n\r]/g, '') + '\n');
        }
    }
}

var server = net.createServer(connect);
server.listen(port);

console.log('Listening on port {port}...'.replace('{port}', port));