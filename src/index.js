
'use strict'

/**
 * Hapi JS
 */
let Hapi = require('hapi');

/**
* Server Configuration
* @type {Hapi}
*/
let server = new Hapi.Server();

/**
 * Read Database
 */
let read = null

/**
 * Master Database
 */
let master = null

server.connection({ port : 1337});

/**
 * Alive
 */
server.route({
  method: 'GET',
  path: '/v1/alive',
  handler : function (req, res) {
    res({'alive' : 'true'});
  }
});

/**
 * Select REST Route
 */
server.route({
  method: 'GET',
  path: '/v1/{table}',
  handler : function (req, res) {
    res({'table' : encodeURIComponent(req.params.table)});
  }
});

/**
 * Insert REST Route
 */
server.route({
  method: 'POST',
  path: '/v1/{table}',
  handler : function (req, res) {
    res({'operation' : 'insert'});
  }
});

/**
 * Update REST Route
 */
server.route({
  method: 'PUT',
  path: '/v1/{table}',
  handler : function (req, res) {
    res({'operation' : 'update'});
  }
});

/**
 * Delete REST Route
 */
server.route({
  method: 'DELETE',
  path: '/v1/{table}',
  handler : function (req, res) {
    res({'operation' : 'delete'});
  }
});

/**
 * Raw Query REST ROute
 */
server.route({
  method: 'POST',
  path: '/v1/_QUERY',
  handler : function (req, res) {
    res({'operation' : 'query'});
  }
});


server.start((err) => {
  if (err) {
    throw err;
  }
});


console.log('Boreal Server Running At: ', server.info.uri)
