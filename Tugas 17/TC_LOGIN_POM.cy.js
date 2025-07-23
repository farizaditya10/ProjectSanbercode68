class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username, validate = false) {
    const input = cy.get('input[name="username"]').clear();
    if (username) {
      input.type(username);
      if (validate) {
        input.should('have.value', Admin);
      }
    }
  }

  enterPassword(password, validate = false) {
    const input = cy.get('input[name="password"]').clear();
    if (password) {
      input.type(password);
      if (validate) {
        input.should('have.value', password);
      }
    }
  }

  clickLogin() {
    cy.get('.orangehrm-login-button').should('be.visible')
    cy.get('.orangehrm-login-button').click()
  }

  loginAs(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }
  getErrorMessage() {
    return cy.get('.oxd-alert-content-text').should('contain','Invalid credentials'); // selector pesan error
  }
}

describe('Login Test POM', () => {
  const loginPage = new LoginPage();

beforeEach(() => {
    loginPage.visit();
    })

  it('TSD0001-LoginValid', () => {
    loginPage.loginAs('Admin', 'admin123');
    cy.url().should('include', '/dashboard/index');
  });
  it('TSD0002-LoginUsernameSalah', () => {
    loginPage.loginAs('Fariz', 'admin123');
    cy.get('.oxd-alert-content-text').should('contain','Invalid credentials');
  });
  it('TSD0003-LoginPasswordSalah', () => {
    loginPage.loginAs('Admin', 'fariz123');
    cy.get('.oxd-alert-content-text').should('contain','Invalid credentials');
  });
  it('TSD0004-LoginUsernamePasswordSalah', () => {
    loginPage.loginAs('Fariz', 'fariz123');
    cy.get('.oxd-alert-content-text').should('contain','Invalid credentials');
  });
  it('TSD0005-LoginUsernameBlank', () => {
    loginPage.loginAs('', 'admin123');
    cy.get('.oxd-text--span').should('contain','Required');
  });
  it('TSD0006-LoginPasswordBlank', () => {
    loginPage.loginAs('Admin', '');
    cy.get('.oxd-text--span').should('contain','Required');
  });
  it('TSD0007-LoginUsernamePasswordBlank', () => {
    loginPage.loginAs('', '');
    cy.contains('Required').should('be.visible');
  });
});