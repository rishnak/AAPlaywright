import { test, expect } from '@playwright/test';
import { AAHomePage } from '../src/page-objects/AAHomePage';
import { AABreakdownPage } from '../src/page-objects/AABreakdownPage';
import { AASalesOptionPage } from '../src/page-objects/AASalesOptionPage';
import {AAAddOnsPage} from '../src/page-objects/AAAddOnsPage'
import { aaUrls, aaFormData} from '../src/data/aaTestData';
import { AAYourDetailsPage } from '@page-objects/AAYourDetailsPage';


/**
 * AA Breakdown Flow E2E Test
 * Tests complete user journey from homepage to breakdown cover page
 * 
 * Tags: @regression
 */
test.describe('AA Breakdown Flow - E2E Test', () => {
  let aaHomePage: AAHomePage;
  let aaBreakdownPage: AABreakdownPage;
  let aaSalesOptionPage:AASalesOptionPage;
  let aaAddOnsPage:AAAddOnsPage;
  let aaYourDetailsPage: AAYourDetailsPage;

  test.beforeEach(async ({ page }) => {
    aaHomePage = new AAHomePage(page);
    aaBreakdownPage = new AABreakdownPage(page);
    aaSalesOptionPage= new AASalesOptionPage(page);
    aaAddOnsPage =new AAAddOnsPage(page);
    aaYourDetailsPage = new AAYourDetailsPage(page);
  });

  /**
   * Full E2E test for breakdown cover purchase flow
   * Tags: @regression
   */
  test('@regression Navigate through breakdown cover flow', async ({ page }) => {
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

    // Step 7: Click on Get a quote button
    await aaBreakdownPage.clickGetQuote();
    await aaBreakdownPage.waitForBreakdownPageLoad();
    await page.waitForTimeout(5000);
    await aaBreakdownPage.isOnSalesCoverPage();
     // Wait for form to be ready

    // Step 8: Enter the postcode and other details
    await aaBreakdownPage.enterPostcode();  
    await aaBreakdownPage.enterDOB();       
    
    // Step 9: Submit the form
    await aaBreakdownPage.clickOnSubmitButton();
    await page.waitForTimeout(5000);

    //Step 10: Select policy and vehicle Type
    await aaBreakdownPage.selectThePolicyType('Vehicle');
    await aaBreakdownPage.selectTheVehicleType('CUV');    
    await aaBreakdownPage.clickOnContinueButton();

    //Step 11: Add option
    await aaSalesOptionPage.addOptionalExtras(['At Home','Onward Travel']);
    await aaSalesOptionPage.clickOnContinueButton();

    //Step 12: Add Addons
    await aaAddOnsPage.addAddOns(['PGC','Tyre Cover']);
    await aaAddOnsPage.clickOnContinueButton();

    //Step 13: Fill the personal details
    await aaYourDetailsPage.selectStartPolicy();
    await aaYourDetailsPage.fillPersonalDetails();
    await aaYourDetailsPage.fillContactDetails();
    await aaYourDetailsPage.clickOnContinueButton();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      // Take screenshot on failure
      const timestamp = Date.now();
      await aaHomePage.captureHomepage(`breakdown-failure-${timestamp}`);
    }
  });
});
