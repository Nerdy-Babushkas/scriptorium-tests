// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

// Import custom fixture
const { test: authTest } = require('../fixtures/auth.fixture');

const TEST_EMAIL    = 'pranjal@trashmail.ws';
const TEST_PASSWORD = 'Pranjal@03';

test.describe('Login', () => {

  test('should log in successfully and redirect to /room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.waitForRedirect();
    await expect(page).toHaveURL(/.*\/room/);
  });

  test('should show error with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_EMAIL, 'WrongPassword@99');
    await expect(loginPage.errorMessage).toBeVisible();
  });

});

// This test uses the fixture — notice it asks for 'authenticatedPage' not 'page'
// Playwright injects it already logged in
authTest.describe('Auth Fixture', () => {

  authTest('fixture should land on /room ready to go', async ({ authenticatedPage }) => {
    await expect(authenticatedPage).toHaveURL(/.*\/room/);
  });

});