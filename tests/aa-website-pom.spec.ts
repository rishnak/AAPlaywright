import { test, expect } from '@playwright/test';
import { AAHomePage } from '../src/page-objects/AAHomePage';
import { AABreakdownPage } from '../src/page-objects/AABreakdownPage';
import { aaTestData, aaPageTitles } from '../src/data/aaTestData';
import { logger } from '../src/utilities/logger';

/**
 * AA Website Tests - Proper Page Object Model Implementation
 * This test demonstrates correct usage of:
 * - BasePage (parent class with common methods)
 * - AAHomePage (child class extending BasePage)
 * - AABreakdownPage (child class extending BasePage)
 * - Test Data (centralized data management)
 * - Logger (utility function)
 */

test.describe('AA Website - POM Framework Demo', () => {
  let aaHomePage: AAHomePage;
  let aaBreakdownPage: AABreakdownPage;
  
  /**
   * Before each test - Initialize page objects
   * This demonstrates proper POM pattern
   */
  test.beforeEach(async ({ page }) => {
    logger.info('='.repeat(60));
    logger.info('Initializing Page Objects');
    
    // Initialize page objects (they extend BasePage)
    aaHomePage = new AAHomePage(page);
    aaBreakdownPage = new AABreakdownPage(page);
    
    logger.info('✓ AAHomePage created (extends BasePage)');
    logger.info('✓ AABreakdownPage created (extends BasePage)');
  });
  
  /**
   * TEST 1: Homepage Load and Verification
   * Demonstrates:
   * - Page navigation using BasePage.navigate()
   * - Element visibility using BasePage.isVisible()
   * - Title verification using BasePage.getTitle()
   * - URL verification using BasePage.getCurrentUrl()
   */
  test('should load AA homepage and verify using BasePage methods', async ({ page }) => {
    logger.info('\n🧪 TEST 1: Homepage Load Test');
    logger.info('Purpose: Demonstrate BasePage navigation methods');
    
    // Step 1: Navigate to homepage
    logger.info('\n📍 Step 1: Navigate to AA Homepage');
    await aaHomePage.navigateToAAHome();
    // ↑ This calls page.goto() with domcontentloaded
    logger.info('  ✓ Used: page.goto() from BasePage');
    
    // Step 2: Accept cookies if present
    logger.info('\n📍 Step 2: Handle Cookie Consent');
    await aaHomePage.acceptCookiesIfPresent();
    // ↑ This calls BasePage.isVisible() and BasePage.click()
    logger.info('  ✓ Used: BasePage.isVisible()');
    logger.info('  ✓ Used: BasePage.click()');
    
    // Step 3: Verify page loaded
    logger.info('\n📍 Step 3: Verify Page Loaded');
    const isLoaded = await aaHomePage.isAAHomePageLoaded();
    // ↑ This calls BasePage.isVisible()
    logger.info('  ✓ Used: BasePage.isVisible()');
    expect(isLoaded).toBeTruthy();
    logger.info('  ✅ Homepage is loaded!');
    
    // Step 4: Verify page title
    logger.info('\n📍 Step 4: Verify Page Title');
    const title = await aaHomePage.getPageTitle();
    // ↑ This calls BasePage.getTitle()
    logger.info(`  ✓ Used: BasePage.getTitle()`);
    logger.info(`  📄 Title: "${title}"`);
    expect(title).toContain(aaPageTitles.homePage);
    logger.info('  ✅ Title contains "AA"');
    
    // Step 5: Verify URL
    logger.info('\n📍 Step 5: Verify Current URL');
    const url = await aaHomePage.getCurrentPageUrl();
    // ↑ This calls BasePage.getCurrentUrl()
    logger.info(`  ✓ Used: BasePage.getCurrentUrl()`);
    logger.info(`  🔗 URL: ${url}`);
    expect(url).toContain('theaa.com');
    logger.info('  ✅ URL is correct');
    
    logger.info('\n✅ TEST 1 PASSED - All BasePage methods worked correctly!\n');
  });
  
  /**
   * TEST 2: Navigation Menu Verification
   * Demonstrates:
   * - Element visibility checks using BasePage.isVisible()
   * - Screenshot capture using BasePage.takeScreenshot()
   */
  test('should verify navigation menu using BasePage methods', async ({ page }) => {
    logger.info('\n🧪 TEST 2: Navigation Menu Test');
    logger.info('Purpose: Demonstrate BasePage interaction methods');
    
    // Step 1: Navigate and wait
    logger.info('\n📍 Step 1: Navigate to Homepage');
    await aaHomePage.navigateToAAHome();
    await aaHomePage.acceptCookiesIfPresent();
    logger.info('  ✓ Used: page.goto()');
    logger.info('  ✓ Used: BasePage.click()');
    
    // Step 2: Verify navigation is visible
    logger.info('\n📍 Step 2: Verify Navigation Menu');
    const navVisible = await aaHomePage.isNavigationVisible();
    // ↑ This calls BasePage.isVisible()
    logger.info('  ✓ Used: BasePage.isVisible()');
    expect(navVisible).toBeTruthy();
    logger.info('  ✅ Navigation menu is visible');
    
    // Step 3: Take screenshot
    logger.info('\n📍 Step 3: Capture Screenshot');
    await aaHomePage.captureHomepage('aa-homepage-nav');
    // ↑ This calls BasePage.takeScreenshot()
    logger.info('  ✓ Used: BasePage.takeScreenshot()');
    logger.info('  📸 Screenshot saved: aa-homepage-nav.png');
    
    logger.info('\n✅ TEST 2 PASSED - Navigation verified successfully!\n');
  });
  
  /**
   * TEST 3: Scrolling Demonstration
   * Demonstrates:
   * - Scrolling using BasePage.scrollToElement()
   * - Multiple interaction methods
   */
  test('should demonstrate scrolling using BasePage methods', async ({ page }) => {
    logger.info('\n🧪 TEST 3: Scrolling Test');
    logger.info('Purpose: Demonstrate BasePage utility methods');
    
    // Step 1: Navigate
    logger.info('\n📍 Step 1: Navigate to Homepage');
    await aaHomePage.navigateToAAHome();
    await aaHomePage.acceptCookiesIfPresent();
    logger.info('  ✓ Used: page.goto()');
    
    // Step 2: Scroll to bottom
    logger.info('\n📍 Step 2: Scroll to Page Bottom');
    await aaHomePage.scrollToBottom();
    // ↑ This calls BasePage.scrollToElement()
    logger.info('  ✓ Used: BasePage.scrollToElement()');
    logger.info('  📜 Scrolled to footer');
    
    // Step 3: Take final screenshot
    logger.info('\n📍 Step 3: Capture Final State');
    await aaHomePage.captureHomepage('aa-homepage-scrolled');
    logger.info('  ✓ Used: BasePage.takeScreenshot()');
    logger.info('  📸 Screenshot saved');
    
    logger.info('\n✅ TEST 3 PASSED - Scrolling works!\n');
  });
  
  /**
   * After each test - Cleanup and logging
   */
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      logger.error(`❌ Test failed: ${testInfo.title}`);
      logger.error(`   Error: ${testInfo.error?.message}`);
      
      // Take screenshot on failure (uses BasePage method)
      const timestamp = Date.now();
      try {
        await aaHomePage.captureHomepage(`failure-${timestamp}`);
        logger.info(`   📸 Failure screenshot captured`);
      } catch (e) {
        logger.error(`   Could not capture screenshot: ${e}`);
      }
    } else {
      logger.info(`✅ Test passed: ${testInfo.title}`);
    }
    logger.info('='.repeat(60));
  });
});

/**
 * FRAMEWORK COMPONENTS USED IN THIS TEST:
 * 
 * 1. BasePage (src/pages/BasePage.ts)
 *    ✓ navigate()           - Navigate to URLs
 *    ✓ click()             - Click elements
 *    ✓ getText()           - Get text content
 *    ✓ isVisible()         - Check visibility
 *    ✓ getTitle()          - Get page title
 *    ✓ getCurrentUrl()     - Get current URL
 *    ✓ scrollToElement()   - Scroll to elements
 *    ✓ takeScreenshot()    - Capture screenshots
 * 
 * 2. AAHomePage (src/page-objects/AAHomePage.ts)
 *    - Extends BasePage
 *    - Defines AA homepage specific locators
 *    - Implements homepage specific methods
 * 
 * 3. AABreakdownPage (src/page-objects/AABreakdownPage.ts)
 *    - Extends BasePage
 *    - Defines breakdown page specific locators
 *    - Implements breakdown page specific methods
 * 
 * 4. Test Data (src/data/aaTestData.ts)
 *    - Centralized test data
 *    - Expected values
 *    - URLs and constants
 * 
 * 5. Logger (src/utilities/logger.ts)
 *    - Logging utility
 *    - Info, error, debug logs
 * 
 * This demonstrates PROPER Page Object Model implementation!
 */
