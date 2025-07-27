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

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  getErrorMessage() {
    return cy.get('.oxd-alert-content-text').should('contain','Invalid credentials'); // selector pesan error
  }
}

export default LoginPage;
