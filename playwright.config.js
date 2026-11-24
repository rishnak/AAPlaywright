const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  // Test directory
  testDir: './tests',

  // Maximum time allowed for each test
  // Increased from Playwright default 30 seconds to 60 seconds
  timeout: 60 * 1000,

  // Run tests in parallel
  fullyParallel: true,

  // Prevent test.only from accidentally being committed in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in Jenkins/CI
  retries: process.env.CI ? 2 : 0,

  // Control workers
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
    [
      'junit',
      {
        outputFile: 'test-results/junit.xml',
      },
    ],
  ],

  // Assertion timeout
  expect: {
    timeout: 10 * 1000,
  },

  use: {
    // Base URL
    baseURL: process.env.BASE_URL || 'https://www.theaa.com',

    // Maximum time for actions such as click(), fill(), check()
    actionTimeout: 15 * 1000,

    // Maximum time for navigation such as page.goto()
    navigationTimeout: 30 * 1000,

    // Collect useful evidence in Jenkins
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});