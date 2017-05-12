
/**
 * Read Database
 */
let read = require('./libs/connections/read');

/**
 * Master Database
 */
let master = require('./libs/connections/write');

/**
 * V1 Routes
 */
module.exports = [

  /**
   * V1 Alive Method
   */  
  {
    method: 'GET',
    path: '/v1/alive',
    handler: function (req, res) {
        res({
            'alive': 'true'
        });
    }
  },

  /**
   * SELECT Method v1
   * Create a Query Builder using URL Params
   */
  {
    method: 'GET',
    path: '/v1/{table}',
    handler: function (req, res) {

        let querystring = req.query ? req.query : false
        let fields = querystring._fields ? querystring._fields.split(":") : "*"
        let where = querystring._where ? querystring._where : ""

        read
        .from(req.params.table)
        .select(fields)
        .whereRaw(where)
        .then((result) => {

            statuscode = (result.length > 0) ? 200 : 404
            res(result).code(statuscode)

        }).catch((err) => {

            console.log(err)
            res(err).code(404)
            
        });
    }
  },

  /**
   * INSERT Method v1
   * Create a Query Builder using a POST params in Body Request
   */
  {
    method: 'POST',
    path: '/v1/{table}',
    handler: function (req, res) {

    var execution = {}

    master(req.params.table)
      .insert(req.payload.data)
      .on('query-response', (response, obj, builder) => {

        // Query infos 
        execution.info = {
            query_uuid: obj.__knexQueryUid,
            sql : obj.sql,
            bindings : obj.bindings,
            affectedRows : obj.response[0].affectedRows           
        }

      })
      .then((result) => {
        
        execution.data = result
        res(execution).code(201)

      }).catch((err) => {

        console.log(err)
        res(err).code(500)

      })
    }
  },

  /**
   * UPDATE Method v1
   * Query Builder create using PUT/PATCH params in Body Request
   */
  {
    method: 'PUT',
    path: '/v1/{table}',
    handler: function (req, res) {

        let where = req.payload.where ? req.payload.where : ""

        master(req.params.table)
        .update(req.payload.data)
        .whereRaw(where)
        .then((result) => {

            res(result).code(200)

        }).catch((err) => {

            res(err).code(500)

        })
    }
  },

  /**
   * DELETE Method v1
   * Query Builder created using DELETE Params in Body Requests
   */
  {
    method: 'DELETE',
    path: '/v1/{table}',
    handler: function (req, res) {

        let where = req.payload.where ? req.payload.where : ""

        master(req.params.table)
        .whereRaw(where)
        .del()
        .then((result) => {

            res(result).code(204)

        })
        .catch((err) => {

          res(err).code(500)

        })
    }
  },

  /**
   * RAW Query Method
   * Query Raw sended in Body Requests using POST Method
   */
  {
    method: 'POST',
    path: '/v1/_QUERY',
    handler: function (req, res) {

        let conn = (req.payload.query.toLowerCase().includes("select") ? read : master);

        conn.raw(req.payload.query)
        .then((result) => {

            res(result).code(200)

        }).catch((err) => {

            res(err).code(500)
            
        })

    }
  }

]