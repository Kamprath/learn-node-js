module.exports = {
	respond: function(request, response) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end(module.exports.getMessage(request.url));
	},

	getMessage: function(url) {
		switch (url) {
			case '/test':
				return 'test page';
				break;

			default:
				return 'default page';
		}
	}
}