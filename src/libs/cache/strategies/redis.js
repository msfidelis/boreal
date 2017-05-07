'use strict'

redis = require('redis')

/**
 * Redis Factory
 * @param {*} server 
 * @param {*} port 
 */
var connect = function(server, port) {
    return redis.createClient(port, server,  {no_ready_check: true});
}

module.exports = function() {
    return connection
}