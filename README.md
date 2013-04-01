# Skynode

A low level client for the [Sky](http://skydb.io/) database. Operates using the HTTP protocol.

Currently very alpha and lacking tests and docs

## Installation

`npm install skynode`

## Usage

Instantiate a client. Only supported option is host which is non-optional.

```javascript
var skynode = require('skynode');

var opts = {host:localhost:8585}

var client = skynode.createClient(opts);
```

Currently all methods expect a callback as their last argument and that callback will be passed 2 args, `err` and `response`. e.g

```javascript
var callback = function(err, response) {
    if(err) {
        console.error(err);
    } else {
        console.log(response);
    }
}
```
---------

### Tables API


__List tables__

```javascript
client.listTables(function(err, res){
    console.log(res);
    //[
    //{name: 'users-table'}
    //{name: 'anotherTable'}
    //]
})
```

__Get a table__

```javascript
client.getTable('users-table', function(err, res){
    console.log(res);
    //{name: 'users-table'}
})
```
__Get a table's stats__

```javascript
client.getTableStats('users-table', function(err, res){
    console.log(res);
    //{count: 2}
})
```
__Create a table__

```javascript
client.createTable('users-table', function(err, res){
    console.log(res);
    //{name: 'users-table'}
})
```

__Delete a table__

```javascript
client.deleteTable('users-table', function(err, res){
    console.log(res);
    //`null`
})
```
---------

### Properties API

__List properties for a table__

```javascript
client.listProperties('users-table', function(err, res){
    console.log(res);
    //[
    //{"id":1,"name":"uname","transient":false,"dataType":"string"}
    //{"id":2,"name":"type","transient":false,"dataType":"string"}
    //]
})
```

__Create a property__

```javascript
var property = {
    name: "check",
    transient: false,
    dataType: "string"
}
client.addProperty(property, 'users-table', function(err, res){
    console.log(res);
    //{"id":2,"name":"check","transient":false,"dataType":"string"}
})
```

__Get a property__

```javascript
```
__Rename a property__

```javascript
```
__Delete a property__

```javascript
```
---------

### Events API


__List events for an object__

```javascript
```

__Delete all events for an object__

```javascript
```

__Get an event__

```javascript
```

__Replace an event__

```javascript
```

__Merge an event__

```javascript
```

__Delete an event__

```javascript
```
---------

### Query API

```javascript
```
---------

### Misc APIs

__Ping__

```javascript
client.ping(function(err, res){
    console.log(res.message); //Should return 'ok'
})
```