describe('OrangeHRM UI-API Tests with Positive & Negative Scenarios', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com';

  beforeEach(() => {
    // Login terlebih dahulu sebelum setiap test
    cy.visit(`${baseUrl}/web/index.php/auth/login`);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  // POSITIVE TESTS
  it('GET - Intercept Claim Module API', () => {
    cy.intercept('GET', '**/api/v2/claim/*').as('getClaim');
    cy.get('a[href="/web/index.php/claim/viewClaimModule"]').click();
    cy.wait('@getClaim').its('response.statusCode').should('eq', 200);
  });

  it('GET - Intercept PIM Page API', () => {
    cy.intercept('GET', '**/api/v2/pim/employees*').as('getPIM');
    cy.get('a[href="/web/index.php/pim/viewPimModule"]').click();
    cy.wait('@getPIM').its('response.statusCode').should('eq', 200);
  });

  // NEGATIVE TEST EXAMPLE (Simulasi user tidak ditemukan)

  it('NEGATIVE - API with wrong path should return 404', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/web/index.php/api/v2/claim/invalid-path`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('NEGATIVE - Access API without login (should return 404)', () => {
    cy.clearCookies(); // Logout secara paksa
    cy.request({
      method: 'GET',
      url: `${baseUrl}/web/index.php/api/v2/claim/view-claim-requests`,
      failOnStatusCode: false
    }).then((response) => {
      expect([401, 403, 404]).to.include(response.status); // Lebih fleksibel
    });
  });

});
