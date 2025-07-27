class ForgotPasswordPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  clickForgotPasswordLink() {
  cy.get('.orangehrm-login-forgot-header')
    .should('be.visible')
    .click();
  }

  enterUsername(username, validate = false) {
    const input = cy.get('input[placeholder="Username"]').clear();
    if (username) {
      input.type(username);
      if (validate) {
        input.should('have.value', username);
      }
    }
  }

  clickResetButton() {
    cy.get('button[type="submit"]').should('be.visible').click();
  }

  clickCancelButton() {
  cy.get('.orangehrm-forgot-password-button--cancel').should('be.visible').click();
}

  resetPassword(username) {
    this.enterUsername(username);
    this.clickResetButton();
  }

  getResetPasswordPageTitle() {
    return cy.contains('Reset Password');
  }

  getSuccessMessage() {
    return cy.contains('Reset Password link sent successfully'); // hanya jika memang muncul
  }

  getRequiredFieldError() {
    return cy.get('.oxd-input-field-error-message');
  }
}

export default ForgotPasswordPage;
