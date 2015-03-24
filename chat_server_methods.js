module.exports = {
    /**
     * Handle client connection
     * @param client
     */
    connect: function(client) {
        // add client to client array
        client.id = this.clients.length+1;
        this.clients.push(client);

        // send client a greeting message
        this.broadcast('Client ' + client.id + ' connected from ' + client.remoteAddress + ':' + client.remotePort);
        client.write('\nWelcome to the server, client ' + client.id + '! Type \'/help\' for a list of commands.\n');

        // initialize event handlers
        client.on('data', (function(data) {
            // broadcast message to all this.clients
            if (!this.parseCommand(data, client)) {
                this.say(data.toString(), client);
            }
        }).bind(this));

        client.on('end', (function() { this.dcClient(client); }).bind(this));

        client.on('error', function(error) {
            console.log(error);
        })
    },

    /**
     * Disconnect a socket
     * @param client
     */
    dcClient: function(client) {
        client.end();
        client.destroy();
        this.clients.splice(this.clients.indexOf(client), 1);
        this.broadcast('Client ' + client.id + ' disconnected');
    },

    /**
     * Broadcast a message to all clients
     * @param msg
     */
    say: function(msg, client) {
        this.broadcast('Client ' + client.id + ': ' + msg);
    },

    /**
     * Broadcast a chat message to all clients
     * @param msg
     * @param client
     */
    broadcast: function(msg) {
        msg = msg.replace(/[\n\r]/g, '');
        console.log(msg);
        for (var i in this.clients) {
            if (this.clients[i].writable) {
                this.clients[i].write(msg + '\n');
            }
        }
    },

    /**
     * Parse any command sent from socket
     * @param data
     * @param client
     * @returns {boolean}
     */
    parseCommand: function(data, client) {
        var msg = data.toString().replace(/[\n\r]/g, '');
        var isCommand = (msg.indexOf('/') === 0);
        var commandFound = false;

        if (isCommand) {
            for (var i in this.commands) {
                if (msg.substr(1) === i) {
                    (this.commands[i].bind(this))(data, client);
                    commandFound = true;
                    break;
                }
            }

            if (!commandFound) client.write('\'' + msg + '\' is not a recognized command\n');
        }

        return isCommand;
    },

    /**
     * Display list of connected clients
     */
    listClients: function(client) {
        client.write('Connected clients:\n');
        for (var i in this.clients) {
            client.write('\t' + 'Client ' +
            this.clients[i].id + ' (' +
            this.clients[i].remoteAddress + ':' +
            this.clients[i].remotePort + ')\n');
        }
    }
};