#!/usr/bin/env node

// Do the default grunt build
function gruntDefault()
{
	var spawn = require('child_process').spawn,
	grunt = spawn('grunt', [], { cwd: '../../' });

	grunt.stdout.on('data', function (data) {
		process.stdout.write(data);
	});

	grunt.stderr.on('data', function (data) {
		process.stdout.write(data);
	});
}

// Check if we should ask for user input
(function(){

	var fs = require('fs'),
		prompt = require('prompt'),
		_ = require('underscore-contrib'),
		fileCheck = '.buildFile',
		buildfile = '../../build.json';

	if (!fs.existsSync(fileCheck))
	{
		gruntDefault();
		return;
	}
	// Get the file path and remove the file
	fs.unlinkSync(fileCheck);

	prompt.start();
	prompt.get([{
			name : 'name',
			description: 'The human-readable name of the library',
			required: true
		}, {
			name: 'description',
			description: 'A description of the library',
			required: true
		}, {
			name : 'version',
			description: 'The starting version of the library',
			default: '0.0.1',
			pattern: /^\d+\.\d+(\.\d+)?$/,
			message: "Version must be in the format #.#.#",
			required: true
		}, {
			name : 'output',
			description: 'The output file name (e.g., my-library)',
			default: '',
			required: true
		}, {
			name : 'url',
			description: 'The URL homepage for this library',
			required: false
		}
	], function(err, result){
		if (!err)
		{
			// Get the build file as an object
			var build = fs.readFileSync(buildfile);
			build = JSON.parse(build);

			fs.writeFile(
				buildfile, 
				JSON.stringify(
					_.extend(build, result), null, "\t"
				), 
				gruntDefault
			);
			return;
		}
		// Build the library
		gruntDefault();
	});
}());