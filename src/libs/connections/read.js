'use strict';

let knexfile = require('./knexfile');
let knex = require('knex')(knexfile['read']);

/**
 * Conexão com o Banco de Dados
 * @type {[type]}
 */
module.exports = knex;