import LoginPage from './LoginPage.cy';
import DashboardPage from './DashboardPage.cy';

// describe('Dashboard Page Test with POM - OrangeHRM', () => {
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('Dashboard Test - OrangeHRM', () => {
  beforeEach(() => {
    loginPage.visit();
    loginPage.login('Admin', 'admin123');
  });

  it('TSD0014-Bisa masuk ke dashboard setelah login', () => {
    dashboardPage.verifyDashboardIsVisible();
  });

  it('TSD0015-Bisa masuk ke menu Admin', () => {
    dashboardPage.clickAdminMenu();
    cy.url().should('include', '/admin/viewSystemUsers');
  });

  it('TSD0016-Bisa masuk ke menu PIM', () => {
    dashboardPage.clickPIMMenu();
    cy.url().should('include', '/pim/viewEmployeeList');
  });

  it('TSD0017-Bisa masuk ke menu Leave', () => {
    dashboardPage.clickLeaveMenu();
    cy.url().should('include', '/leave/viewLeaveList');
  });

  it('TSD0018-Bisa masuk ke menu Time', () => {
    dashboardPage.clickTimeMenu();
    cy.url().should('include', '/time/viewEmployeeTimesheet');
  });

  it('TSD0019-Bisa masuk ke menu Recruitment', () => {
    dashboardPage.clickRecruitmentMenu();
    cy.url().should('include', '/recruitment/viewCandidates');
  });

  it('TSD0020-Bisa masuk ke menu My Info', () => {
    dashboardPage.clickMyInfoMenu();
    cy.url().should('include', '/viewPersonalDetails/empNumber');
  });

  it('TSD0021-Bisa masuk ke menu Performance', () => {
    dashboardPage.clickPerformanceMenu();
    cy.url().should('include', '/performance/searchEvaluatePerformanceReview');
  });

  it('TSD0022-Bisa masuk ke menu Dashboard', () => {
    dashboardPage.clickDashboardMenu();
    cy.url().should('include', '/dashboard/index');
  });

  it('TSD0023-Bisa masuk ke menu Directory', () => {
    dashboardPage.clickDirectoryMenu();
    cy.url().should('include', '/directory/viewDirectory');
  });

  it('TSD0024-Bisa masuk ke menu Maintenance', () => {
    dashboardPage.clickMaintenanceMenu();
    cy.url().should('include', '/maintenance/purgeEmployee');
  });

  it('TSD0025-Bisa masuk ke menu Claim', () => {
    dashboardPage.clickClaimMenu();
    cy.url().should('include', '/claim/viewAssignClaim');
  });

  it('TSD0026-Bisa masuk ke menu Buzz', () => {
    dashboardPage.clickBuzzMenu();
    cy.url().should('include', '/buzz/viewBuzz');
  });
});
