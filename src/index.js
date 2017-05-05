
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
let read = require('./libs/connections/read');

/**
 * Master Database
 */
let master = require('./libs/connections/write');

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
    let querystring = req.query ? req.query : false

    /**
     * Fields
     */
    let fields = querystring._fields ? querystring._fields.split(":") : "*"

    if (querystring._where) {
      let where;

      var statements = querystring._where.split(":")
    }

    res({'table' : querystring, 'fields':fields, 'where':statements});
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
    
    /**
     * Verify if Query is Select 
     */
    let conn = (req.payload.query.toLowerCase().includes("select") ? read : master);

    /**
     * Execute Query
     */
    conn.raw(req.payload.query)
    .then((err, response) => {
      res(response)
    }).catch((err) => {
      console.log(err)
      res(err)
    })

  }
});


server.start((err) => {
  if (err) {
    throw err;
  }
});


console.log('Boreal Server Running At: ', server.info.uri)
