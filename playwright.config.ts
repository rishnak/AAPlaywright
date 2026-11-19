import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Get environment-specific base URL
 * Supports QA, UAT, and STAGING environments
 */
function getBaseURL(): string {
  const environment = process.env.ENVIRONMENT;
  
  // Environment-specific URLs
  const environmentURLs: { [key: string]: string } = {
    'QA': process.env.QA_BASE_URL || 'https://qa.theaa.com',  // PLACEHOLDER: Replace with actual QA URL
    'UAT': process.env.UAT_BASE_URL || 'https://uat.theaa.com',  // PLACEHOLDER: Replace with actual UAT URL
    'STAGING': process.env.STAGING_BASE_URL || 'https://staging.theaa.com',  // PLACEHOLDER: Replace with actual STAGING URL
  };
  
  // Return environment-specific URL or fall back to BASE_URL or default
  if (environment && environmentURLs[environment]) {
    console.log(`Using ${environment} environment URL: ${environmentURLs[environment]}`);
    return environmentURLs[environment];
  }
  
  // Fallback to BASE_URL or default production URL
  const defaultURL = process.env.BASE_URL || 'https://www.theaa.com';
  console.log(`Using default URL: ${defaultURL}`);
  return defaultURL;
}

/**
 * Playwright Configuration for Page Object Model Framework
 * All values can be configured via .env file
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run for (from .env or default 30s)
  timeout: Number(process.env.DEFAULT_TIMEOUT) || 30 * 1000,
  
  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  // Retries - from .env or CI check
  retries: process.env.CI ? 2 : Number(process.env.RETRIES) || 0,
  
  // Workers - from .env or CI check
  workers: process.env.CI ? 1 : Number(process.env.WORKERS) || undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  // Global test settings
  use: {
    // Base URL for navigation - environment-specific
    baseURL: getBaseURL(),
    
    // Browser context options
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Action timeout - from .env or default 10s
    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 10 * 1000,
    
    // Navigation timeout - from .env or default 15s
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 15 * 1000,
    
    // Headless mode - from .env or default false
    headless: process.env.HEADLESS === 'true',
    
    // Optional: Slow down execution to watch actions
    launchOptions: {
      slowMo: Number(process.env.SLOW_MO) || 0,
    },
  },
  
  // Browser projects configuration
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports (optional - uncomment if needed)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 13'] },
    // },
  ],
  
  // Web Server configuration (optional)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
