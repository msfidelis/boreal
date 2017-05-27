'use strict';

const memcached = require('./strategies/memcached')
const redis = require('./strategies/redis')

const cache = null

/**
 * Memcached Client
 */
if (process.env.MEMCACHED_SERVER) {
    cache = memcached(MEMCACHED_SERVER, MEMCACHED_PORT)
}

/**
 * Redis Client
 */
if (process.env.REDIS_SERVER) {
    cache = redis(REDIS_SERVER, SERVER_PORT)
}

/**
 * Exports Cache API
 */
module.exports = () => {
    return cache
}