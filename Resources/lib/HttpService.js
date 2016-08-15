var Util = require('lib/Util');

// default timeout

var TIMEOUT = 10000;

var RestService = function(url) {
	// retrieve url from tiapp.xml
	this.url = url || Ti.App.Properties.getString('url');
	// hlds the last http client
	this.lastHTTPClient = null;
};

/**
 * 
 * @param {String} method, POST, GET, PUT, DELETE
 * @param {String} url
 * @param {Object} sendData
 * @param {Function} callback
 * @param {UserModel} authentication
 */
RestService.prototype.httpRequest = function(method, url, sendData, callback, authentication) {
	var online = Ti.Network.getOnline();
	if (!online) {
		alert('This feature requires an internet connection and no active connection is found');
		return false;
	}
	
	if (!Util._.isFunction(callback)) {
		throw "Callback provided to HTTP request is not a function";
	}
	
	var client = Ti.Network.createHTTPClient({
		// needed to prevent "A connection failure occurred"
		enableKeepAlive : true,
		// function called when the response data is returned successfully
		onload : function(e) {
			if (this.handled) {
				Ti.API.debug('Service repsonse has already been handled');
				return;
			}
			
			this.handled = true;
			
			var response = null;
			try {
				if (this.responseText) {
					response = JSON.parse(this.responseText);
				}
			} catch (ex) {
				console.log(ex);
			}
			
			callback(response);
		},
		onerror : function(e) {
			if (this.handled) {
				Ti.API.debug('Service response has already been handled');
				return;
			}
			
			Ti.API.debug('error obj:'+JSON.stringify(e));
			
			// status codes
			if (this.statusText) {
				alert(this.statusText);
			}
		}
	});
	
	client.setTimeout(TIMEOUT);
	client.setRequestHeader('Connection', 'close');
	this.lastHTTPClient = client;
	
	if (authentication !== null && authentication !== undefined) {
		var authstr = 'Basic ' + Ti.Utils.base64encode(authentication.email + ":" + authentication.password_hash);
		authstr = authstr.replace(/(\r\n|\n|\r)/gm,"");
		client.setRequestHeader('Authentication', authstr);
	}
	
	// open the request
	client.open(method, url);
	
	client.setRequestHeader('accept', 'application/json');
	client.send(sendData);
};

/**
 * returns the last http client
 */
RestService.prototype.getLastHTTPClient = function() {
	return this.lastHTTPClient;
};

module.exports = RestService;
