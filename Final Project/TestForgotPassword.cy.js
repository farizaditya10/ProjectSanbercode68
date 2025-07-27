import ForgotPasswordPage from "./ForgotPassword.cy";

const forgotPage = new ForgotPasswordPage();

describe('Forgot Password Flow - Full Coverage', () => {
  beforeEach(() => {
    forgotPage.visit();
    forgotPage.clickForgotPasswordLink();
  });

  it('TSD0008-Membuka Halaman Reset Password', () => {
    forgotPage.getResetPasswordPageTitle().should('be.visible');
  });

  it('TSD0009-Reset menggunakan username valid', () => {
    forgotPage.enterUsername('Admin');
    forgotPage.clickResetButton();

    // Contoh validasi jika sistem menampilkan alert/info setelah reset, bisa menggunakan link atau hasil dari resetnya
    // cy.url().should('include', '/sendPasswordReset');
    cy.get('.oxd-text.oxd-text--h6.orangehrm-forgot-password-title')
      .should('exist')
      .and('contain', 'Reset Password link sent successfully');
  });

  it('TSD0010-Username dikosongkan', () => {
    forgotPage.enterUsername('');
    forgotPage.clickResetButton();
    forgotPage.getRequiredFieldError().should('contain', 'Required');
  });

  it('TSD0011-Username diisi spasi', () => {
    forgotPage.enterUsername('     ');
    forgotPage.clickResetButton();
    forgotPage.getRequiredFieldError().should('contain', 'Required');
  });

  it('TSD0012-Username hanya diisi anggka', () => {
    forgotPage.enterUsername('123456');
    forgotPage.clickResetButton();

    // Misal sistem tetap validasi, bisa cek apakah muncul error global
    // biasanya username tidak ada yang hanya angka tapi di sini tidak ada validasi harus kombinasi atau minaimal maksimal karakter
    // jadi tidak ada pengujian lanjutan untuk panjang karakter juga, sama seperti di menu login
    cy.get('.oxd-text.oxd-text--h6.orangehrm-forgot-password-title')
      .should('exist')
      .and('contain', 'Reset Password link sent successfully'); // sesuaikan jika beda
  });

  it('TSD0013-Jika klik tombol cancel', () => {
  forgotPage.enterUsername('Admin');
  // Klik tombol Cancel
  // Disini hasilnya sama mau sebelum entry username atau langsung klik cancel
  forgotPage.clickCancelButton();
  
  // Verifikasi kembali ke halaman login
  cy.url().should('include', '/auth/login');
  cy.get('.orangehrm-login-button').should('be.visible'); // Login button terlihat
});
});