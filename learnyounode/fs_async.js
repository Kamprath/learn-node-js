var fs = require('fs');
var filename = process.argv[2];

if (filename) {
	fs.readFile(filename, function(err, data) {
		var lines = data.toString().split('\n');
		console.log(lines.length - 1);
	});
} else {
	throw new Error('No filename argument provided.');
}