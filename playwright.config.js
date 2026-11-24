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

  // Reporters - Enhanced for detailed Jenkins reporting
  reporter: [
    // Console output during test execution
    ['list'],
    
    // Detailed HTML report with screenshots, videos, and step-by-step execution
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never', // Don't open browser in CI
        // Show detailed test information
        attachmentsBaseURL: undefined,
      },
    ],
    
    // JUnit XML for Jenkins test result tracking
    [
      'junit',
      {
        outputFile: 'test-results/junit.xml',
        embedAnnotationsAsProperties: true,
        embedAttachmentsAsProperty: 'attachments',
      },
    ],
    
    // JSON report for programmatic access
    [
      'json',
      {
        outputFile: 'test-results/results.json',
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

    // Enhanced evidence collection for detailed reports
    // Trace includes step-by-step actions, network activity, console logs
    trace: 'retain-on-failure', // Changed from 'on-first-retry' to capture all failures
    
    // Screenshot on every failure
    screenshot: 'only-on-failure',
    
    // Video recording for failed tests
    video: 'retain-on-failure',
    
    // Enable headless mode in CI
    headless: process.env.CI ? true : false,
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
