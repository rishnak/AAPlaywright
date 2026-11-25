import { test, expect } from '@playwright/test';
import { AAHomePage } from '../src/page-objects/AAHomePage';
import { AACarsPage } from '@page-objects/AACarsPage';
test.describe('AA Cars flow - E2E Test', () => {
     let aaHomePage: AAHomePage;
     let aaCarsPage: AACarsPage;

     test.beforeEach(async ({ page }) => {
        aaHomePage = new AAHomePage(page);
        aaCarsPage = new AACarsPage(page);
        
      });

      test('@regression Navigate through aa cars flow', async ({ page }) => {
            await aaHomePage.navigateToAAHome();

            await aaHomePage.acceptCookiesIfPresent();
           
            const isHomeLoaded = await aaHomePage.isAAHomePageLoaded();
            expect(isHomeLoaded).toBeTruthy();   
            
            await aaHomePage.navigateToAACarsPage();
            await aaCarsPage.verifyAACarsPageHeader();
      })
})