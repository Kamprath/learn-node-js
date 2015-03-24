module.exports = {
    exit: function(data, client) {
        this.dcClient(client);
    },
    help: function(data, client) {
        client.write('Commands:\n');
        for (var i in this.commands) {
            client.write('\t' + i + '\n');
        }
    },
    list: function(data, client) {
        this.listClients(client);
    }
};