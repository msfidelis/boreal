'use strict'

/**
 * Read Database
 */
const read = require('./libs/connections/read')
    /**
     * Master Database
     */
const master = require('./libs/connections/write')
    /**
     * Cache Client
     */
const cache = require('./libs/cache/cache-client')
    /**
     * Boom
     */
const boom = require('boom')


module.exports = [

    /**
     * FLUSH TABLES
     */
    {
        method: 'GET',
        path: '/v1/_FLUSHTABLES',
        handler: (req, res) => {

            let query = "FLUSH TABLES"
            var execution = {}

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    exection.error = err
                    res(execution).code(500)

                })

        }
    },
    /**
     * RESET QUERY CACHE FROM MEMORY
     */
    {
        method: 'GET',
        path: '/v1/_RESETQUERYCACHE',
        handler: (req, res) => {

            let query = "RESET QUERY CACHE"
            var execution = {}

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    exection.error = err
                    res(execution).code(500)

                })

        }
    },
    /**
     * FLUSH QUERY CACHE FROM MEMORY
     */
    {
        method: 'GET',
        path: '/v1/_FLUSHQUERYCACHE',
        handler: (req, res) => {

            let query = "FLUSH QUERY CACHE";
            var execution = {};

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    exection.error = err
                    res(execution).code(500)

                })

        }
    },
    /**
     * SHOW PROCESSLIST
     */
    {
        method: 'GET',
        path: '/v1/_PROCESSLIST',
        handler: (req, res) => {

            let query = "SHOW PROCESSLIST"
            var execution = {}

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    execution.error = err
                    res(execution).code(500)

                })

        }
    },
    /**
     * SHOW CREATE TABLE
     */
    {
        method: 'GET',
        path: '/v1/_SHOWCREATE/{table}',
        handler: (req, res) => {

            let query = "SHOW CREATE TABLE " + req.params.table
            var execution = {}

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    execution.error = err
                    res(execution).code(500)

                })

        }
    },
    /**
     * DESCRIBE TABLE
     */
    {
        method: 'GET',
        path: '/v1/_DESCRIBE/{table}',
        handler: (req, res) => {

            let query = "DESCRIBE " + req.params.table

            var execution = {}

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    exection.error = err
                    res(execution).code(500)

                })
        }
    },

    /**
     * SHOW TABLES
     */
    {
        method: 'GET',
        path: '/v1/_SHOWTABLES',
        handler: (req, res) => {

            let query = "SHOW TABLES	"

            var execution = {}

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    exection.error = err
                    res(execution).code(500)

                })
        }
    },
    /**
     * ANALYZE AND REBUILD INDEXES
     */
    {
        method: 'GET',
        path: '/v1/_ANALYZE/{table}',
        handler: (req, res) => {

            let query = "ANALYZE TABLE	" + req.params.table

            var execution = {}

            read.raw(query)
                .on('query-response', (response, obj, builder) => {

                    execution.info = {
                        query_uuid: obj.__knexQueryUid,
                        sql: obj.sql,
                        affectedRows: obj.response[0].affectedRows
                    }

                })
                .then((result) => {

                    execution.data = result
                    res(execution).code(200)

                })
                .catch((err) => {

                    exection.error = err
                    res(execution).code(500)

                })
        }
    },

    {
        method: 'PUT',
        path: '/v1/mock',
        handler: (req, res) => {

            res(req.payload.name);

        }
    }
]