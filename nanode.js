var http = require('http');
var https = require('https');
var url = require('url');
var demoApi = require('./demoApi.js');

const PORT = 8080;

//Utilities
var utils = {
	Reflection: {
		getMethods: function(obj){
			var methods = [];
			for(var method in obj){
				if (typeof obj[method] == 'function') {
					methods.push(method);
				}
			}
			return methods;
		}
	}
}

var apiMethods = utils.Reflection.getMethods(demoApi);

http.createServer(function(request, response) {
	var urlParts = url.parse(request.url, true);
	var query = urlParts.query;
	var pathname = urlParts.pathname.substring(1);

	if (apiMethods.indexOf(pathname) >= 0) {
		var apiResponse = JSON.stringify(demoApi[pathname](query));

		response.setHeader('content-type', 'application/json');
	    response.end(apiResponse);
	} else {
		response.statusCode = 404;
		response.end();
	}
}).listen(PORT);



