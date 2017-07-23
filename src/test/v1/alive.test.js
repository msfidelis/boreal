'use strict';

describe('V1 IS ALIVE', () => {

    it('Test if v1 is alive', (done) => {

        let options = {
            method: 'GET',
            url: '/v1/alive'
        };

        server.inject(options, (response) => {
            expect(response).to.have.property('result');
            done();
        });
    });

});