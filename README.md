# Skynode

A low level client for the [Sky](http://skydb.io/) database. Operates using the HTTP protocol.

Currently very alpha and lacking tests and docs

## Installation

`npm install skynode`

## Usage

```js
var skynode = require('skynode');

var client = skynode.createClient({host:localhost:8585});

client.ping(function(err, response){
    if(err) {
        console.error(err)
    }
    console.log(response);
})

```

