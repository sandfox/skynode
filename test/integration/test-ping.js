var common = require('../common');
var client = common.createClient();
var assert = require('assert');

var pingErr, pingRes;

client.ping(function(err, res){
	pingErr = err;
	pingRes = res;
});

process.on('exit', function(){
	assert.equal(pingErr, null);
	assert.equal(pingRes.message, 'ok');
});