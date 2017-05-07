
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

server.connection({
    port: 1337,
    routes: {
        json: {
            space: 4
        }
    }
});

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
    let fields = querystring._fields ? querystring._fields.split(":") : "*"
    let where = querystring._where ? querystring._where : ""
    
    read
      .from(req.params.table)
    	.select(fields)
      .whereRaw(where)
      .then((result) => { 
        res(result)
      }).catch((err) => {
        console.log(err)
        res(err).code(404)
      });
  }
});

/**
 * Insert REST Route
 */
server.route({
  method: 'POST',
  path: '/v1/{table}',
  handler : function (req, res) {

    master(req.params.table)
      .insert(req.payload)
      .then((result) => {
        res(result).code(201)
      }).catch((err) => {
        console.log(err)
        res(err)
      })

  }
});

/**
 * Update REST Route
 */
server.route({
  method: 'PUT',
  path: '/v1/{table}',
  handler : function (req, res) {

    let where = req.payload.where ? req.payload.where : ""

    let query = master(req.params.table)
      .update(req.payload.data)
      .whereRaw(where)
      .toString()

    res({"query":query});
  }
});

/**
 * Delete REST Route
 */
server.route({
  method: 'DELETE',
  path: '/v1/{table}',
  handler : function (req, res) {

    let where = req.payload.where ? req.payload.where : ""

    let query = master(req.params.table)
      .whereRaw(where)
      .del()
      .toString()

    res({"query":query});
  }
});

/**
 * Raw Query REST Route
 */
server.route({
  method: 'POST',
  path: '/v1/_QUERY',
  handler : function (req, res) {
    
    /**
     * Verify if Query is Select 
     */
    let conn = (req.payload.query.toLowerCase().includes("select") ? read : master);

    let query = conn.raw(req.payload.query).toString()

    res({"query":query})

    /**
     * Execute Query
     */
    // conn.raw(req.payload.query)
    // .then((err, response) => {
    //   res(response)
    // }).catch((err) => {
    //   console.log(err)
    //   res(err)
    // })

  }
});


server.start((err) => {
  if (err) {
    throw err;
  }
});


console.log('Boreal Server Running At: ', server.info.uri)
