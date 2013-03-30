/**
 * This test requires a working skydb server to aim this at
 * The order of running commands matters
 */

var assert = require('assert');
var async = require('async');
var skynode = require('../sky');

var opts = {
	host: 'localhost:8585'
}
var client = skynode.createClient(opts);


var testPing = function(cb) {
	client.ping(function(err, response){
		assert(response.message, 'ok', "Could not ping server")
		cb();
	})
}

var testCreateTable = function(cb) {

	client.createTable('thetesttable', function(err, response){
		assert(response.name, 'thetesttable', "could not create table 'thetesttable'");
		cb()
	})
}


var testListTable = function(cb) {

	var found = false;

	client.listTables(function(err, response){
		for(i in response) {
			if(response[i].name == 'thetesttable') {
				found = true;
			}
		}

		assert.ok(found, "table 'thetesttable' was not found");
		cb();
	})
}

var testDeleteTable = function(cb) {

	client.deleteTable('thetesttable', function(err, response){
		cb();
	})
}

async.series([
	testPing,
	testCreateTable,
	testListTable,
	testDeleteTable
	], function(err, res){
		console.log("done tests");
	})