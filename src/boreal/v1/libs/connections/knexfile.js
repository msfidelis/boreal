/**
 * MASTER CREDENTIALS
 */
const MASTER_HOST = process.env.MYSQL_MASTER_SERVER ? process.env.MYSQL_MASTER_SERVER : 'mysql'
const MASTER_PORT = process.env.MYSQL_MASTER_PORT ? process.env.MYSQL_MASTER_PORT : 3306
const MASTER_SCHEMA = process.env.MYSQL_MASTER_SCHEMA
const MASTER_USER = process.env.MYSQL_MASTER_USER ? process.env.MYSQL_MASTER_USER : 'root'
const MASTER_PASS = process.env.MYSQL_MASTER_PASS ? process.env.MYSQL_MASTER_PASS : 'root'

/**
 * READ CREDENTIALS
 */
const READ_HOST = process.env.MYSQL_READ_SERVER ? process.env.MYSQL_READ_SERVER : MASTER_HOST
const READ_PORT = process.env.MYSQL_READ_PORT ? process.env.MYSQL_READ_PORT : MASTER_PORT
const READ_SCHEMA = process.env.MYSQL_READ_SCHEMA ? process.env.MYSQL_READ_SCHEMA : MASTER_SCHEMA
const READ_USER = process.env.MYSQL_READ_USER ? process.env.MYSQL_READ_USER : MASTER_USER
const READ_PASS = process.env.MYSQL_READ_PASS ? process.env.MYSQL_READ_PASS : MASTER_PASS

/**
 * Ambientes disponíveis no Knex
 * @type {Object}
 */
module.exports = {

    master: {
        client: 'mysql',
        connection: {
            host: MASTER_HOST,
            port: MASTER_PORT,
            database: MASTER_SCHEMA,
            user: MASTER_USER,
            password: MASTER_PASS
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'boreal_migrations'
        }
    },

    read: {
        client: 'mysql',
        connection: {
            host: READ_HOST,
            port: READ_PORT,
            database: READ_SCHEMA,
            user: READ_USER,
            password: READ_PASS
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'boreal_migrations'
        }
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: "./mydb.sqlite"
        },
        migrations: {
            tableName: 'boreal_migrations'
        }
    }

};