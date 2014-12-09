module.exports = {
	options: {
		keepalive: true,
		port: 8080,
		hostname: 'localhost',
		base: '.',
		index: 'index.html'
	},
	examples : {
		options: {
			open: 'http://localhost:8080/<%= examplesPath %>/',
		}
	},
	test : {
		options: {
			open: 'http://localhost:8080/<%= testPath %>/',
		}
	}
};