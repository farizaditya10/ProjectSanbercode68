import LoginPage from "./LoginPage.cy";
// import ForgotPasswordPage from '../../support/pageObjects/forgotPasswordPage';
// import DashboardPage from '../../support/pageObjects/dashboardPage';

const loginPage = new LoginPage();
// const forgotPasswordPage = new ForgotPasswordPage();
// const dashboardPage = new DashboardPage();

describe('Login Test Orange HRM', () => {
  const loginPage = new LoginPage();

beforeEach(() => {
    loginPage.visit();
    })

  it('TSD0001-LoginValid', () => {
    loginPage.login('Admin', 'admin123');
    cy.url().should('include', '/dashboard/index');
  });
  it('TSD0002-LoginUsernameSalah', () => {
    loginPage.login('Fariz', 'admin123');
    cy.get('.oxd-alert-content-text').should('contain','Invalid credentials');
  });
  it('TSD0003-LoginPasswordSalah', () => {
    loginPage.login('Admin', 'fariz123');
    cy.get('.oxd-alert-content-text').should('contain','Invalid credentials');
  });
  it('TSD0004-LoginUsernamePasswordSalah', () => {
    loginPage.login('Fariz', 'fariz123');
    cy.get('.oxd-alert-content-text').should('contain','Invalid credentials');
  });
  it('TSD0005-LoginUsernameBlank', () => {
    loginPage.login('', 'admin123');
    cy.get('.oxd-text--span').should('contain','Required');
  });
  it('TSD0006-LoginPasswordBlank', () => {
    loginPage.login('Admin', '');
    cy.get('.oxd-text--span').should('contain','Required');
  });
  it('TSD0007-LoginUsernamePasswordBlank', () => {
    loginPage.login('', '');
    cy.contains('Required').should('be.visible');
  });
});