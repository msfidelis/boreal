'use strict'

var memjs = require('memjs');

/**
 * Memcached Factory
 * @param {*} server 
 * @param {*} port 
 */
var connection =  (server, port) => {
    return memjs.Client.create(server + ":" + port)
}

/**
 * Export Memcache Instance
 */
module.exports = () => {
    return connection
}