// pages/LoginPage.js

class LoginPage {
  constructor(page) {
    // 'page' is Playwright's browser page object
    // We store it so all methods in this class can use it
    this.page = page;

    // These are LOCATORS — they find elements on the page
    // We define them here once, so if the HTML ever changes,
    // we fix it in ONE place, not across every test
    this.emailInput    = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton  = page.locator('#submitBtn');
    this.errorMessage  = page.locator('#loginMessage');
  }

  // Navigate to the login page
  async goto() {
    await this.page.goto('/login');
  }

  // Fill and submit the login form
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  // Wait until we've been redirected to /room after login
  async waitForRedirect() {
    await this.page.waitForURL('**/room');
  }
}

// Export so test files can import it
module.exports = { LoginPage };