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
 * Connection Params
 */
server.connection({
  port: 1337,
  routes: {
    json: {
      space: 4
    }
  }
});

/**
 * Plugin Register - Hapi-Router
 */
server.register({
  register: require('hapi-router'),
  options: {
    routes: 'boreal/v*/*.js' 
  }
}, function (err) {
  if (err) throw err;
});

/**
 * Start Server
 */
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Boreal Server Running At: ', server.info.uri)

});