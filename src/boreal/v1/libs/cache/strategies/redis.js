'use strict'

const redis = require('redis')

/**
 * Redis Factory
 * @param {*} server 
 * @param {*} port 
 */
var connect = (server, port) => {
    return redis.createClient(port, server,  {no_ready_check: true});
}

/**
 * Export Redis Instance
 */
module.exports = () => {
    return connection
}