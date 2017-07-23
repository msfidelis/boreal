'use strict';

describe('SIMPLE CRUD TEST', () => {

    before((done) => {
        db.schema.createTableIfNotExists('usersToTest', (table) => {
            table.increments('id');
            table.string('name');
            table.integer('age');
        }).then(() => {
            done();
        }).catch((err) => {
            console.log(err);
        })
    });

    after((done) => {
        db.schema.dropTableIfExists('usersToTest')
            .then(() => {
                done();
            })
    });

    it('[C]reate', (done) => {

        let options = {
            method: 'POST',
            url: '/v1/usersToTest',
            payload: { data: { name: 'Matheus Fidelis', age: 21 } }
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(201);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('info');
            expect(response.result).to.have.property('created_id');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info).to.have.property('sql');
            expect(response.result.info).to.have.property('bindings');
            expect(response.result.info).to.have.property('affectedRows');
            done();
        });
    });

    it('[R]ead', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/usersToTest?_where:id=1',
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('info');
            expect(response.result).to.have.property('data');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info).to.have.property('sql');
            expect(response.result.info).to.have.property('bindings');
            expect(response.result.info).to.have.property('affectedRows');

            expect(response.result.info.sql).to.equal('select * from `usersToTest`');
            expect(response.result.data[0].id).to.equal(1);
            expect(response.result.data[0].age).to.equal(21);
            expect(response.result.data[0].name).to.equal('Matheus Fidelis');

            done();
        });
    });

    it('[U]pdate', (done) => {

        let options = {
            method: 'PUT',
            url: '/v1/usersToTest',
            payload: { data: { name: 'Matheus Fidelis UPDATED', age: 22 }, where: "id = 1" }
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(200);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('info');
            expect(response.result).to.have.property('data');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info).to.have.property('sql');
            expect(response.result.info).to.have.property('bindings');
            expect(response.result.info).to.have.property('affectedRows');

            expect(response.result.info.sql).to.equal('update `usersToTest` set `age` = ?, `name` = ? where id = 1');


            //Test Updated Values
            let optionsSelect = {
                method: 'GET',
                url: '/v1/usersToTest?_where:id=1'
            };

            server.inject(optionsSelect, (response) => {
                expect(response.statusCode).to.equal(200);
                expect(response).to.have.property('result');
                expect(response.result).to.have.property('info');
                expect(response.result).to.have.property('data');
                expect(response.result.info).to.have.property('query_uuid');
                expect(response.result.info).to.have.property('sql');
                expect(response.result.info).to.have.property('bindings');
                expect(response.result.info).to.have.property('affectedRows');

                expect(response.result.info.sql).to.equal('select * from `usersToTest`');
                expect(response.result.data[0].id).to.equal(1);
                expect(response.result.data[0].age).to.equal(22);
                expect(response.result.data[0].name).to.equal('Matheus Fidelis UPDATED');

                done();
            });


        });
    });

    it('[D]elete', (done) => {

        let options = {
            method: 'DELETE',
            url: '/v1/usersToTest',
            payload: {
                where: "id = 1"
            }
        };

        server.inject(options, (response) => {

            expect(response.statusCode).to.equal(204);
            expect(response).to.have.property('result');

            done();
        });
    });



    it('Bulk Insert', (done) => {

        let options = {
            method: 'POST',
            url: '/v1/usersToTest',
            payload: {
                data: [
                    { name: 'Matheus Fidelis', age: 21 },
                    { name: 'Barack Obama', age: 55 },
                    { name: 'Elon Musk', age: 46 }
                ]
            }
        };

        server.inject(options, (response) => {
            expect(response.statusCode).to.equal(201);
            expect(response).to.have.property('result');
            expect(response.result).to.have.property('info');
            expect(response.result).to.have.property('created_id');
            expect(response.result.info).to.have.property('query_uuid');
            expect(response.result.info).to.have.property('sql');
            expect(response.result.info).to.have.property('bindings');
            expect(response.result.info).to.have.property('affectedRows');


            //Test Bulk Inserted Values
            let optionsSelect = {
                method: 'GET',
                url: '/v1/usersToTest'
            };

            server.inject(optionsSelect, (response) => {
                expect(response.statusCode).to.equal(200);
                expect(response).to.have.property('result');
                expect(response.result).to.have.property('info');
                expect(response.result).to.have.property('data');
                expect(response.result.info).to.have.property('query_uuid');
                expect(response.result.info).to.have.property('sql');
                expect(response.result.info).to.have.property('bindings');
                expect(response.result.info).to.have.property('affectedRows');

                expect(response.result.info.sql).to.equal('select * from `usersToTest`');
                expect(response.result.data.length).to.equal(3);

                done();
            });

        });

    });

});