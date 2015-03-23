var filterModule = require('./filter_mod');
var args = process.argv;

filterModule(args[2], args[3], function(err, files) {
	if (err) throw new Error('There was an error.');

	for (var file in files) {
		console.log(files[file]);
	}
});	