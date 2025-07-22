describe('Scenario Login', async function () {
    beforeEach(() => {
        cy.visit ('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('TSD0001-LoginValid', () => {
        cy.get('input[name="username"]').clear()
        cy.get('input[name="username"]').type('Admin').should('have.value','Admin')
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('admin123').should('have.value','admin123')

        //intercept
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/images/orangehrm-logo.png?v=1721393199309').as('loginReq1')
        cy.get('.orangehrm-login-button').should('be.visible')
        cy.get('.orangehrm-login-button').click()

        //tunggu req
        cy.wait('@loginReq1').its('response.statusCode').should('eq',200);

        cy.url().should('include', '/dashboard/index')
    }) 
    it('TSD0002-LoginUsernameSalah', () => {
        cy.get('input[name="username"]').clear()
        cy.get('input[name="username"]').type('Fariz').should('have.value','Fariz')
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('admin123').should('have.value','admin123')

        //intercept
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('loginReq2')
        cy.get('.orangehrm-login-button').should('be.visible')
        cy.get('.orangehrm-login-button').click()

        //tunggu req
        cy.wait('@loginReq2').its('response.statusCode').should('eq',200);

        cy.get('.oxd-alert-content-text').should('contain','Invalid credentials')
    })
    it('TSD0003-LoginPasswordSalah', () => {
        cy.get('input[name="username"]').clear()
        cy.get('input[name="username"]').type('Admin').should('have.value','Admin')
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('fariz123').should('have.value','fariz123')
        
        //intercept
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('loginReq2')
        cy.get('.orangehrm-login-button').should('be.visible')
        cy.get('.orangehrm-login-button').click()

        //tunggu req
        cy.wait('@loginReq2').its('response.statusCode').should('eq',200);

        cy.get('.oxd-alert-content-text').should('contain','Invalid credentials')
    })
    it('TSD0004-LoginUsernamePasswordSalah', () => {
        cy.get('input[name="username"]').clear()
        cy.get('input[name="username"]').type('Fariz').should('have.value','Fariz')
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('fariz123').should('have.value','fariz123')

        //intercept
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('loginReq2')
        cy.get('.orangehrm-login-button').should('be.visible')
        cy.get('.orangehrm-login-button').click()

        //tunggu req
        cy.wait('@loginReq2').its('response.statusCode').should('eq',200);

        cy.get('.oxd-alert-content-text').should('contain','Invalid credentials')
    })  
    it('TSD0005-LoginUsernameBlank', () => {
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('input[name="password"]').type('admin123').should('have.value','admin123')
        cy.get('.orangehrm-login-button').should('be.visible')
        cy.get('.orangehrm-login-button').click()
        cy.get('.oxd-text--span').should('contain','Required')
    })  
    it('TSD0006-LoginPasswordBlank', () => {
        cy.get('input[name="username"]').clear()
        cy.get('input[name="username"]').type('Admin').should('have.value','Admin')
        cy.get('input[name="password"]').clear()
        cy.get('.orangehrm-login-button').should('be.visible')
        cy.get('.orangehrm-login-button').click()
        cy.get('.oxd-text--span').should('contain','Required')
    })  
    it('TSD0007-LoginUsernamePasswordBlank', () => {
        cy.get('input[name="username"]').clear()
        cy.get('input[name="password"]').clear()
        cy.get('.orangehrm-login-button').should('be.visible')
        cy.get('.orangehrm-login-button').click()
        cy.contains('Required').should('be.visible')
    })      
})