module.exports = {

	handle: function(request, response) {
		var self = module.exports;

		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end(self.getMessage(request.url));
	},

	getMessage: function(url) {
		switch (url) {
			case '/test':
				return 'test page';
				break;

			default:
				return 'default page';
		}
	},

	logToConsole: function(req, cltSocket, head) {
		console.log('------------------------------------------------');
		console.log('Request at ' + req.headers.host + ':');
		console.log("\t" + 'Request method: ' + req.method);
		console.log("\t" + 'Reqested URL: ' + req.url);
	}

}