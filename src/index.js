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
  handler: function (req, res) {
    res({
      'alive': 'true'
    });
  }
});

/**
 * Select REST Route
 */
server.route({

  method: 'GET',
  path: '/v1/{table}',
  handler: function (req, res) {

    let querystring = req.query ? req.query : false
    let fields = querystring._fields ? querystring._fields.split(":") : "*"
    let where = querystring._where ? querystring._where : ""

    read
      .from(req.params.table)
      .select(fields)
      .whereRaw(where)
      .then((result) => {

        statuscode = (result.length > 0) ? 200 : 404

        res(result).code(statuscode)
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
  handler: function (req, res) {

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
  handler: function (req, res) {

    let where = req.payload.where ? req.payload.where : ""

    master(req.params.table)
      .update(req.payload.data)
      .whereRaw(where)
      .then((result) => {
        res(result).code(200)
      }).catch((err) => {
        res(err).code(500)
      })
  }
});

/**
 * Delete REST Route
 */
server.route({
  method: 'DELETE',
  path: '/v1/{table}',
  handler: function (req, res) {

    let where = req.payload.where ? req.payload.where : ""

    master(req.params.table)
      .whereRaw(where)
      .del()
      .then((result) => {
        res(result).code(204)
      })
      // .catch((err) => {
      //   res(err).code(500)
      // })
  }
});

/**
 * Raw Query REST Route
 */
server.route({
  method: 'POST',
  path: '/v1/_QUERY',
  handler: function (req, res) {

    let conn = (req.payload.query.toLowerCase().includes("select") ? read : master);

    conn.raw(req.payload.query)
      .then((result) => {
        res(result).code(200)
      }).catch((err) => {
        res(err).code(500)
      })

  }
});

/**
 * Start Server
 */
server.start((err) => {
  if (err) {
    throw err;
  }
});


console.log('Boreal Server Running At: ', server.info.uri)