// cypress/pageObjects/DashboardPage.js

class DashboardPage {
  // Verifikasi halaman dashboard terbuka
  verifyDashboardIsVisible() {
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  }

  // Klik menu Admin
  clickAdminMenu() {
    cy.get('a[href="/web/index.php/admin/viewAdminModule"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu PIM
  clickPIMMenu() {
    cy.get('a[href="/web/index.php/pim/viewPimModule"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Leave
  clickLeaveMenu() {
    cy.get('a[href="/web/index.php/leave/viewLeaveModule"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Time
  clickTimeMenu() {
    cy.get('a[href="/web/index.php/time/viewTimeModule"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Recruitment
  clickRecruitmentMenu() {
    cy.get('a[href="/web/index.php/recruitment/viewRecruitmentModule"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu My Info
  clickMyInfoMenu() {
    cy.get('a[href="/web/index.php/pim/viewMyDetails"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Performance
  clickPerformanceMenu() {
    cy.get('a[href="/web/index.php/performance/viewPerformanceModule"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Dashboard
  clickDashboardMenu() {
    cy.get('a[href="/web/index.php/dashboard/index"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Directory
  clickDirectoryMenu() {
    cy.get('a[href="/web/index.php/directory/viewDirectory"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Maintenance
  clickMaintenanceMenu() {
    cy.get('a[href="/web/index.php/maintenance/viewMaintenanceModule"]')
      .should('be.visible')
      .click({ force: true });
  }

  // Klik menu Claim
  clickClaimMenu() {
  cy.get('a[href="/web/index.php/claim/viewClaimModule"]')
    .should('be.visible')
    .click({ force: true });
  }

  // Klik menu Buzz
   clickBuzzMenu() {
    cy.get('a[href="/web/index.php/buzz/viewBuzz"]')
      .should('be.visible')
      .click({ force: true });
  }
}

export default DashboardPage;
