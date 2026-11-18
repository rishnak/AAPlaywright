import { test, expect } from '@playwright/test';
import { AAHomePage } from '../src/page-objects/AAHomePage';
import { AABreakdownPage } from '../src/page-objects/AABreakdownPage';
import { aaUrls } from '../src/data/aaTestData';

/**
 * AA Breakdown Flow E2E Test
 * Tests complete user journey from homepage to breakdown cover page
 */
test.describe('AA Breakdown Flow - E2E Test', () => {
  let aaHomePage: AAHomePage;
  let aaBreakdownPage: AABreakdownPage;

  test.beforeEach(async ({ page }) => {
    aaHomePage = new AAHomePage(page);
    aaBreakdownPage = new AABreakdownPage(page);
  });

  test('should navigate through breakdown cover flow', async ({ page }) => {
    // Step 1: Navigate to AA homepage
    await aaHomePage.navigateToAAHome();

    // Step 2: Accept cookies if present
    await aaHomePage.acceptCookiesIfPresent();

    // Step 3: Verify homepage loaded
    const isHomeLoaded = await aaHomePage.isAAHomePageLoaded();
    expect(isHomeLoaded).toBeTruthy();

    // Step 4: Navigate to Breakdown Cover page
    await aaHomePage.navigateToBreakdownCover();

    // Step 5: Wait for navigation to complete
    await aaBreakdownPage.waitForBreakdownPageLoad();

    // Step 6: Verify URL contains breakdown path
    const currenturl = await aaHomePage.getCurrentPageUrl();
    expect(currenturl).toContain(aaUrls.breakdown);

    //Step 7: Click on Get a quote button
    await aaBreakdownPage.clickGetQuote();
    await aaBreakdownPage.isOnSalesCoverPage();



  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      // Take screenshot on failure
      const timestamp = Date.now();
      await aaHomePage.captureHomepage(`breakdown-failure-${timestamp}`);
    }
  });
});
