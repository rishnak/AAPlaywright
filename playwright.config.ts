import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Playwright Configuration for Page Object Model Framework
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run for
  timeout: 30 * 1000,
  
  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  // Global test settings
  use: {
    // Base URL for navigation - loaded from .env file
    baseURL: process.env.BASE_URL || 'https://www.theaa.com',
    
    // Browser context options
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Action timeout
    actionTimeout: 10 * 1000,
    
    // Navigation timeout
    navigationTimeout: 15 * 1000,
    
    // ⭐ HEADED MODE - Set to false to see browser
    headless: false,  // false = headed (browser visible), true = headless
    
    // Optional: Slow down execution to watch actions
    // launchOptions: {
    //   slowMo: 1000,  // Wait 1 second between actions
    // },
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
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  
  // Web Server configuration (optional)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
