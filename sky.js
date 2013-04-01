/**
 * Low level client for SkyDB
 */

var request = require('request');


exports.createClient = function(opts) {
	if (opts.host == undefined) {
		throw new Error("host most be defined");
	}

	return new Client(opts);
}

Client = function(config){
	this.host = config.host;
}

Client.prototype._request = function(requestOptions, callback){

	if (typeof callback !== 'function') {
		callback = function() {};
	 }

	 var options = {
	 	url: 'http://' + this.host + requestOptions.path,
	 	method: requestOptions.method,
	 	json: requestOptions.body || true,
	 }

	 request(options, function(err, res, body){
	 	if(err) {
	 		return callback(new Error("No response from server" + (err.code ? ': ' + err.code : '.')))
	 	}

	 	if(res.statusCode === 404) {
	 		return callback(new Error('Not found.'));
	 	}

	 	if(res.statusCode === 500) {
	 		return callback(new Error('Server Error'))
	 	}

	 	return callback(null, body);
	 });

}

Client.prototype._get = function(path, callback){
	var options = {
		method: 'GET',
		path: path
	}

	return this._request(options, callback);
}

Client.prototype._put = function(path, body, callback) {

	if (typeof body === 'function') {
		format = callback;
		callback = body;
		body = null;
	}

	var options = {
		method: 'PUT',
		path: path,
		body: body || {}
	}

	return this._request(options, callback);
};

Client.prototype._patch = function(first_argument) {

	if (typeof body === 'function') {
		format = callback;
		callback = body;
		body = null;
	}

	var options = {
		method: 'PATCH',
		path: path,
		body: body || {}
	}

	return this._request(options, callback);
};

Client.prototype._post = function(path, body, callback) {

	if (typeof body === 'function') {
		format = callback;
		callback = body;
		body = null;
	}

	var options = {
		method: 'POST',
		path: path,
		body: body || {}
	}

	return this._request(options, callback);
};

Client.prototype._delete = function(path, body, callback) {

	if (typeof body === 'function') {
		format = callback;
		callback = body;
		body = null;
	}

	var options = {
		method: 'DELETE',
		path: path,
		body: body || {}
	}

	return this._request(options, callback);
};

Client.prototype.ping = function(callback) {

	this._get('/ping', callback)
}


//	## Tables
Client.prototype.listTables = function(callback) {
	this._get('/tables', callback)
}

Client.prototype.getTable = function(table, callback) {
	this._get('/tables/' + table, callback);
};

Client.prototype.getTableStats = function(table, callback) {
	this._get('/tables/' + table + '/stats', callback);
};

Client.prototype.createTable = function(table, callback) {
	this._post('/tables', {name:table}, callback);
};

Client.prototype.deleteTable = function(table, callback) {
	this._delete('/tables/' + table, callback);
};

//	## Properties
Client.prototype.listProperties = function(table, callback) {
	this._get('/tables/' + table + '/properties', callback)
};

Client.prototype.addProperty = function(propertyObj, table, callback) {
	this._post('/tables/' + table + '/properties', propertyObj, callback)
};

Client.prototype.getProperty = function(property, table, callback) {
	this._get('/tables/' + table + '/properties/' + property, callback)
};

Client.prototype.renameProperty = function(name, newName, table, callback) {
	this._patch('/tables/' + table + '/properties/' + name, {name:newName}, callback)
};

Client.prototype.deleteProperty = function(property, callback) {
	this._delete('/tables/' + table + '/properties/' + name, callback)
};


//	## Events
Client.prototype.listEvents = function(object, table, callback) {
	this._get('/tables/' + table + '/objects/' + object + '/events', callback)
};

Client.prototype.deleteEvents = function(object, table, callback) {
	this._delete('/tables/' + table + '/objects/' + object + '/events', callback)
};

Client.prototype.getEvent = function(timestamp, object, table, callback) {
	this._get('/tables/' + table + '/objects/' + object + '/events/' + timestamp, callback)
};

Client.prototype.replaceEvent = function(eventObj, timestamp, object, table, callback) {
	this._put('/tables/' + table + '/objects/' + object + '/events/' + timestamp, {data: eventObj}, callback)
};

Client.prototype.mergeEvent = function(eventObj, timestamp, object, table, callback) {
	this._put('/tables/' + table + '/objects/' + object + '/events/' + timestamp, {data: eventObj}, callback)
};

Client.prototype.deleteEvent = function(timestamp, object, table, callback) {
	this._delete('/tables/' + table + '/objects/' + object + '/events/' + timestamp, callback)
};


//	## Query
Client.prototype.query = function(queryObj, table, callback) {
	this_post('/tables/' + table + '/query', queryObj, callback)
};


