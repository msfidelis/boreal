'use strict';

describe('Utils MySQL - Management Database', () => {

    before((done) => {
        db.schema.createTableIfNotExists('usersToTest', (table) => {
            table.increments('id');
            table.string('name');
            table.integer('age');
        }).then(() => {
            done();
        }).catch((err) => {
            console.log(err);
        });
    });

    after((done) => {
        db.schema.dropTableIfExists('usersToTest')
            .then(() => {
                done();
            });
    });

    it('/v1/_FLUSHTABLES', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_FLUSHTABLES'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            expect(response.result).to.have.property('info');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info.sql).to.equal("FLUSH TABLES");
            done();
        });
    });

    it('/v1/_RESETQUERYCACHE', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_RESETQUERYCACHE'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            expect(response.result).to.have.property('info');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info.sql).to.equal("RESET QUERY CACHE");
            done();
        });
    });

    it('/v1/_FLUSHQUERYCACHE', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_FLUSHQUERYCACHE'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            expect(response.result).to.have.property('info');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info.sql).to.equal("FLUSH QUERY CACHE");
            done();
        });
    });

    it('/v1/_PROCESSLIST', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_PROCESSLIST'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            expect(response.result).to.have.property('info');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info.sql).to.equal("SHOW PROCESSLIST");
            expect(response.result.data[0].lenght).to.not.equal(0);
            done();
        });
    });

    it('/v1/_SHOWCREATE', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_SHOWCREATE/usersToTest'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            expect(response.result).to.have.property('info');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info.sql).to.equal("SHOW CREATE TABLE usersToTest");
            done();
        });
    });

    it('/v1/_DESCRIBE', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_DESCRIBE/usersToTest'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            expect(response.result).to.have.property('info');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info.sql).to.equal("DESCRIBE usersToTest");
            done();
        });
    });

    it('/v1/_SHOWTABLES', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_SHOWTABLES'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            done();
        });
    });

    it('/v1/_ANALYZE', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/_ANALYZE/usersToTest'
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('data');
            expect(response.result).to.have.property('info');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info.sql).to.equal("ANALYZE TABLE usersToTest");
            done();
        });
    });

});