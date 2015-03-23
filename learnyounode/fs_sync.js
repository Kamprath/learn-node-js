var fs = require('fs');
var filename = process.argv[2];

if (filename) {
	try {
		var contents = fs.readFileSync(filename).toString();
		contents = contents.split('\n');
		console.log(contents.length - 1);
	} catch (e) {
		console.log('Error: ' + e.message);
	}
} else {
	console.log('Please provide a filepath.');
}