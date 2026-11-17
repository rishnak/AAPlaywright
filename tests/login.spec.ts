import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/page-objects/LoginPage';
import { HomePage } from '../src/page-objects/HomePage';
import { testUsers, errorMessages } from '../src/data/testData';
import { logger } from '../src/utilities/logger';

/**
 * Login Test Suite
 * Tests for login functionality using Page Object Model
 */
test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    
    // Navigate to login page
    await loginPage.navigateToLogin();
    logger.info('Navigated to login page');
  });
  
  test('should login successfully with valid credentials', async ({ page }) => {
    // Test: Valid user login
    logger.info('Test: Login with valid credentials');
    
    await loginPage.login(testUsers.validUser.username, testUsers.validUser.password);
    
    // Verify home page is loaded
    const isHomePageLoaded = await homePage.isHomePageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
    
    // Verify welcome message
    const welcomeMessage = await homePage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Welcome');
    
    logger.info('Login test passed successfully');
  });
  
  test('should show error message with invalid credentials', async ({ page }) => {
    // Test: Invalid user login
    logger.info('Test: Login with invalid credentials');
    
    await loginPage.login(testUsers.invalidUser.username, testUsers.invalidUser.password);
    
    // Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    // Verify error message text
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(errorMessages.invalidLogin);
    
    logger.info('Invalid login test passed successfully');
  });
  
  test('should login with remember me option', async ({ page }) => {
    // Test: Login with remember me
    logger.info('Test: Login with remember me option');
    
    await loginPage.loginWithRememberMe(
      testUsers.validUser.username,
      testUsers.validUser.password
    );
    
    // Verify home page is loaded
    const isHomePageLoaded = await homePage.isHomePageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
    
    logger.info('Remember me login test passed successfully');
  });
  
  test('should navigate to forgot password page', async ({ page }) => {
    // Test: Forgot password navigation
    logger.info('Test: Forgot password link');
    
    await loginPage.clickForgotPassword();
    
    // Verify URL contains 'forgot-password'
    expect(page.url()).toContain('forgot-password');
    
    logger.info('Forgot password navigation test passed successfully');
  });
  
  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `screenshots/failure-${testInfo.title}-${Date.now()}.png`,
        fullPage: true
      });
      logger.error(`Test failed: ${testInfo.title}`);
    }
  });
});