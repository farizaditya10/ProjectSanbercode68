describe('Reqres.in API Tests with Positive & Negative Scenarios', () => {
const baseUrl = 'https://reqres.in/api';
const apiKey = 'reqres-free-v1';

// POSITIVE TESTS

    it('GET - List Users (page 2)', () => {
        cy.request(`${baseUrl}/users?page=2`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.be.an('array');
        });
    });

    it('GET - Single user', () => {
        cy.request(`${baseUrl}/users/2`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property('id', 2);
        });
    });

    it('POST - Create User', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: {
                name: 'morpheus',
                job: 'leader'
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', 'morpheus');
        });
    });

    it('PUT - Update User', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/users/2`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: {
                name: 'neo',
                job: 'chosen one'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('job', 'chosen one');
        });
    });

    it('DELETE - Remove User', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/users/2`,
            headers: {
                'x-api-key': apiKey
            }
        }).then((response) => {
            expect(response.status).to.eq(204);
            expect(response.body).to.be.empty;
        });
    });

//NEGATIVE TESTS

    it('GET - User Not Found (id = 23)', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/23`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('POST - Create User Without API Key (Unauthorized)', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: 'unauthorized',
                job: 'guest'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.error).to.include('Missing API key');
        });
    });

    it('POST - Register Without Password (Bad Request)', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/register`,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: {
                email: 'eve.holt@reqres.in'
                // password is missing
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('error');
        });
    });

});