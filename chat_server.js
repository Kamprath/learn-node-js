var ChatServer = {
    net: null,
    commands: null,
    server: null,
    clients: [],
    port: 9000,

    /**
     * Import app methods and merge with app object
     */
    mergeMethods: function() {
        var methods = require('./chat_server_methods');
        for (var i in methods) { this[i] = methods[i]; }
    },

    /**
     * Initialize chat server
     */
    init: function() {
        this.mergeMethods();

        this.net = require('net');
        this.commands = require('./chat_commands');
        this.server = this.net.createServer();

        this.server.on('connection', this.connect.bind(this));
        this.server.listen(this.port);

        console.log('Listening on port {port}...'.replace('{port}', this.port));
    }
};

ChatServer.init();