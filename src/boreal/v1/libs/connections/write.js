'use strict';

const knexfile = require('./knexfile');
const knex = require('knex')(knexfile['master']);

/**
 * Conexão com o Banco de Dados
 * @type {[type]}
 */
module.exports = knex;