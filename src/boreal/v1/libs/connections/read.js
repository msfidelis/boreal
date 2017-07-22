'use strict';

let knexfile = require('./knexfile');

if (process.env.ENVIRONMENT == 'test') {
    var mode = 'test';
} else {
    var mode = 'read';
}

let knex = require('knex')(knexfile[mode]);

/**
 * Conexão com o Banco de Dados
 * @type {[type]}
 */
module.exports = knex;