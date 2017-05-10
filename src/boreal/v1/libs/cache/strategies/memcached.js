'use strict'

var memjs = require('memjs');

/**
 * Memcached Factory
 * @param {*} server 
 * @param {*} port 
 */
var connection = function (server, port) {
    return memjs.Client.create(server + ":" + port)
}

module.exports = function() {
    return connection
}