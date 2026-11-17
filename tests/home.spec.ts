import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/page-objects/LoginPage';
import { HomePage } from '../src/page-objects/HomePage';
import { testUsers, searchTestData } from '../src/data/testData';
import { logger } from '../src/utilities/logger';

/**
 * Home Page Test Suite
 * Tests for home page functionality using Page Object Model
 */
test.describe('Home Page Tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    
    // Login before each test
    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.validUser.username, testUsers.validUser.password);
    
    // Wait for home page to load
    await homePage.isHomePageLoaded();
    logger.info('User logged in and home page loaded');
  });
  
  test('should display welcome message on home page', async ({ page }) => {
    // Test: Verify welcome message
    logger.info('Test: Verify welcome message');
    
    const welcomeMessage = await homePage.getWelcomeMessage();
    expect(welcomeMessage).toBeTruthy();
    expect(welcomeMessage).toContain('Welcome');
    
    logger.info('Welcome message test passed successfully');
  });
  
  test('should perform search operation', async ({ page }) => {
    // Test: Search functionality
    logger.info('Test: Search functionality');
    
    const searchTerm = searchTestData.validSearchTerms[0];
    await homePage.search(searchTerm);
    
    // Verify search results page is loaded
    expect(page.url()).toContain('search');
    
    logger.info('Search test passed successfully');
  });
  
  test('should navigate to settings page', async ({ page }) => {
    // Test: Settings navigation
    logger.info('Test: Navigate to settings');
    
    await homePage.navigateToSettings();
    
    // Verify settings page URL
    expect(page.url()).toContain('settings');
    
    logger.info('Settings navigation test passed successfully');
  });
  
  test('should display navigation menu items', async ({ page }) => {
    // Test: Navigation menu
    logger.info('Test: Verify navigation menu');
    
    const menuItems = await homePage.getNavigationMenuItems();
    expect(menuItems.length).toBeGreaterThan(0);
    
    logger.info(`Found ${menuItems.length} menu items`);
    logger.info('Navigation menu test passed successfully');
  });
  
  test('should logout successfully', async ({ page }) => {
    // Test: Logout functionality
    logger.info('Test: Logout functionality');
    
    await homePage.logout();
    
    // Verify redirected to login page
    const isLoginPageLoaded = await loginPage.isLoginPageLoaded();
    expect(isLoginPageLoaded).toBeTruthy();
    
    logger.info('Logout test passed successfully');
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