var fs = require('fs');
var path = process.argv[2];
var ext = process.argv[3];

if (path && ext) {

	fs.readdir(path, function(err, files) {
		if (files.length > 0) {
			for (var file in files) {
				if (files[file].indexOf('.' + ext) > 0) {
					console.log(files[file]);
				}
			}	
		} else {
			console.log('Directory is empty.');
		}
	});

} else {
	throw new Error('Not enough arguments passed');
}