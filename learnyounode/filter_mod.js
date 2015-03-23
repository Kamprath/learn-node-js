var fs = require('fs');

module.exports = function(dirName, ext, cb) {

	fs.readdir(dirName, function(err, files) {
		if (err) return cb(err, files);
		
		var filteredFiles = [];

		for (var file in files) {
			if (files[file].indexOf('.' + ext) > 0) {
				filteredFiles.push(files[file]);
			}
		}

		cb(null, filteredFiles);
	});
	
};