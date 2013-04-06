/**
 * Setup stuff for the tests
 */

var common = exports;
var skynode = require('../');


common.createClient = function(){
	var config = {};
	config.host = process.env.SKYDB_HOST || 'localhost:8585';
	return skynode.createClient(config);
}