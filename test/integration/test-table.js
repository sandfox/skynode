/**
 * This test requires a working skydb server to aim this at
 * The order of running commands matters
 */

var assert = require('assert');
var async = require('async');
var common = require('../common');

var client = common.createClient();

var testCreateTable = function(cb) {

	client.createTable('thetesttable', function(err, response){
		assert(response.name, 'thetesttable');
		cb()
	})
}

var testTableStats = function(cb) {
	client.getTableStats('thetesttable', function(err, response){
		assert(response.count, 0);
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
	testCreateTable,
	testTableStats,
	testListTable,
	testDeleteTable
	], function(err, res){
		//console.log("done tests");
	})