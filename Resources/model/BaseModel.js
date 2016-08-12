var HttpService = require('lib/HttpService');
var Util = require('lib/Util');

/**
 * 
 * @param {String} path, Php file path, will alwayas have .php
 */
var BaseModel = function(path) {
	this.path = path;
	this.httpService = new HttpService();
};

/**
 * 
 * Inserts into database
 * 
 * @param {Object} data
 * @param {Function} callback
 */
BaseModel.prototype.POST = function(data, callback) {
	this.httpService.httpRequest('POST', this.httpService.url + this.path, data, callback);
};

/**
 * 
 * Selects or gets from database
 * 
 * @param {Object|String} data, can be an object or querystring
 * @param {Function} callback
 */

BaseModel.prototype.GET = function(data, callback) {
	data = data || {};
	var querystring;
	if (Util._.isObject(data)) {
		querystring = '?';
		// foreach loop
		for (var property in data) {
			querystring += '&' + property + '=' + data[property];
		}
	} else {
		querystring = (data.indexOf('?') === -1 ? '?' : '') + data;
	}
	
	var url = this.httpService.url + this.path + querystring;
	this.httpService.httpRequest('GET', url, null, callback);
};

/**
 * 
 * Updates database
 * 
 * @param {Object|String} data, can be an object or a querystring
 * @param {Function} callback
 */
BaseModel.prototype.PUT = function(data, callback) {
	this.httpService.httpReuest('PUT', this.httpService.url + this.path, data, callback);
};

module.exports = BaseModel;
