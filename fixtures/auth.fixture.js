// fixtures/auth.fixture.js
const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const TEST_EMAIL    = 'pranjal@trashmail.ws';
const TEST_PASSWORD = 'Pranjal@03';

// We extend Playwright's built-in 'test' with a new fixture called 'authenticatedPage'
// Any test that requests 'authenticatedPage' gets a browser page that's already logged in
const test = base.extend({

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // 1. Log in
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.waitForRedirect();

    // 2. Confirm we're actually logged in before handing the page to the test
    await expect(page).toHaveURL(/.*\/room/);

    // 3. Hand the logged-in page to whatever test asked for it
    // Everything before 'use' is SETUP, everything after is TEARDOWN
    await use(page);

    // 4. Teardown — nothing needed, Playwright closes the browser
  },

});

// Export our custom test and expect
// Test files import from here instead of from @playwright/test
module.exports = { test, expect };