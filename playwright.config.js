// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Where our test files live
  testDir: './tests',

  // Run tests sequentially for now — easier to follow while learning
  fullyParallel: false,

  // Retry a failed test once before marking it as failed
  retries: 1,

  // How many parallel workers — 1 keeps output clean while learning
  workers: 1,

  // HTML report — run `npx playwright show-report` to view
  reporter: 'html',

  timeout: 60000,

  use: {
    // All page.goto('/login') calls resolve from here
    // Change this to the Vercel URL to test production anytime
    baseURL: 'http://localhost:3000',

    // Records a trace on first retry — helps debug failures
    // View with: npx playwright show-trace trace.zip
    trace: 'on-first-retry',

    // Opens the browser visually so you can watch tests run
    // Change to true while learning, false for CI
    headless: false,

    // Slow down each action by 500ms so you can follow along
    // Remove or set to 0 when you want full speed
    slowMo: 500,

    // Take a screenshot when a test fails
    screenshot: 'only-on-failure',

    // Record a video so you can replay exactly what happened
    video: 'retain-on-failure',
  },

  projects: [
    // We start with Chromium only — faster feedback while learning
    // We can add Firefox and WebKit later
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Automatically start your frontend before tests run
  // Make sure your frontend's start script is 'node local.js' or similar
  webServer: {
    command: 'node local.js',
    url: 'http://localhost:3000',
    cwd: '../scriptorium-frontend', // path to your frontend folder
    reuseExistingServer: true,       // if you already have it running, don't start again
    timeout: 15000,
  },
});