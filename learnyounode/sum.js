var args = process.argv;
args.splice(0, 2);

if (args.length > 1) {
	var sum = 0;
	for (i = 0; i < args.length; i++) {
		sum += parseInt(args[i]);
	}
	console.log(sum);
} else {
	console.log('Provide two or more numeric arguments to calculate a sum.');
}