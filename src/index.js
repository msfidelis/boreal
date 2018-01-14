'use strict';

const Hapi = require('hapi');
const Router = require('hapi-router');

/**
 * Server Configuration
 * @type {Hapi}
 */
let server = new Hapi.Server();

server.connection({
    port: process.env.SERVER_PORT || 1337,
    routes: {
        json: {
            space: 2
        }
    }
});

/**
 * Plugin Register - Hapi-Router
 */
server.register({
    register: Router,
    options: {
        routes: 'boreal/v*/*.js'
    }
}, err => {
    if (err) throw err;
});

/**
 * Start Server
 */
server.start(err => {
    if (err) throw err;
    console.log('Boreal Server Running At: ', server.info.uri);
});

module.exports = server;