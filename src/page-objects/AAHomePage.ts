import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * AA Home Page Object
 * Encapsulates all elements and actions for the AA homepage
 * Extends BasePage to inherit common methods
 */
export class AAHomePage extends BasePage {
  // Locators - private readonly for encapsulation
  private readonly mainLogo: Locator;
  private readonly mainNavigation: Locator;
  private readonly carInsuranceLink: Locator;
  private readonly membershipLink: Locator;
  private readonly searchButton: Locator;
  private readonly cookieAcceptButton: Locator;
  private readonly breakdownLink: Locator;
  private readonly breakdownCoverLink: Locator;
  private readonly newAndUsedCarsLink: Locator;
  private readonly aaCarsLink: Locator;

  
  constructor(page: Page) {
    super(page); // Call BasePage constructor
    
    // Initialize locators using actual AA website selectors
    this.mainLogo = page.locator('a[aria-label*="AA" i], .logo, header img').first();
    this.mainNavigation = page.locator('nav, header').first();
    this.carInsuranceLink = page.locator('a:has-text("Insurance")').first();
    this.membershipLink = page.locator('a:has-text("Membership")').first();
    this.searchButton = page.locator('button[aria-label*="search" i], [class*="search"]').first();
    this.cookieAcceptButton = page.locator('button:has-text("Accept"), button:has-text("OK")').first();
    
    // ✅ FIXED: More specific selector to avoid strict mode violation
    this.breakdownLink = page.locator('button.responsiveMenu').filter({ hasText: 'Breakdown' });
    this.breakdownCoverLink = page.getByRole('link', { name: 'Breakdown cover' }).first();
    this.newAndUsedCarsLink = page.locator('button.responsiveMenu').filter({ hasText: 'New and used cars' });
    this.aaCarsLink = page.getByRole('link', { name: 'AA Cars' }).first();
  }
  
  /**
   * Navigate to AA homepage
   * ✅ Uses baseURL from playwright.config.js
   */
  async navigateToAAHome(): Promise<void> {
    await this.page.goto('/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
  }
  
  /**
   * Accept cookie consent if present
   * ✅ ENHANCED: Added explicit wait with timeout
   */
  async acceptCookiesIfPresent(): Promise<void> {
    try {
      await this.cookieAcceptButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.click(this.cookieAcceptButton);
      // Wait for cookie banner to disappear
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log('No cookie banner found or already accepted');
    }
  }
  
  /**
   * Verify homepage is loaded
   * Uses BasePage.isVisible() method
   * @returns True if logo is visible
   */
  async isAAHomePageLoaded(): Promise<boolean> {
    return await this.isVisible(this.mainNavigation);
  }
  
  /**
   * Get page title
   * Uses BasePage.getTitle() method
   * @returns The page title
   */
  async getPageTitle(): Promise<string> {
    return await this.getTitle();
  }
  
  /**
   * Verify navigation menu is visible
   * Uses BasePage.isVisible() method
   * @returns True if navigation is visible
   */
  async isNavigationVisible(): Promise<boolean> {
    return await this.isVisible(this.mainNavigation);
  }
  
  /**
   * Click on Breakdown Cover link
   * ✅ ENHANCED: Added wait for dropdown to appear
   */
  async navigateToBreakdownCover(): Promise<void> {
    // Click dropdown button
    await this.click(this.breakdownLink);
    
    // Wait for dropdown menu to expand and link to be visible
    await this.breakdownCoverLink.waitFor({ state: 'visible', timeout: 10000 });
    
    // Click the link
    await this.click(this.breakdownCoverLink);
  }

  /**
   * Navigate to AA Cars page
   * ✅ ENHANCED: Added wait for dropdown to appear
   */
  async navigateToAACarsPage(): Promise<void> {
    // Click dropdown button
    await this.click(this.newAndUsedCarsLink);
    
    // Wait for dropdown menu to expand and link to be visible
    await this.aaCarsLink.waitFor({ state: 'visible', timeout: 10000 });
    
    // Click the link
    await this.click(this.aaCarsLink);
  }

  /**
   * Click on Car Insurance link
   * Uses BasePage.click() method
   */
  async clickCarInsurance(): Promise<void> {
    await this.click(this.carInsuranceLink);
  }
  
  /**
   * Click on Membership link
   * Uses BasePage.click() method
   */
  async clickMembership(): Promise<void> {
    await this.click(this.membershipLink);
  }
  
  /**
   * Scroll to view breakdown link
   * Uses BasePage.scrollToElement() then hover
   */
  async hoverOverBreakdownCover(): Promise<void> {
    await this.scrollToElement(this.breakdownLink);
  }
  
  /**
   * Take screenshot of homepage
   * Uses BasePage.takeScreenshot() method
   * @param name - Screenshot filename
   */
  async captureHomepage(name: string): Promise<void> {
    await this.takeScreenshot(name);
  }
  
  /**
   * Get current URL
   * Uses BasePage.getCurrentUrl() method
   * @returns Current URL
   */
  async getCurrentPageUrl(): Promise<string> {
    return await this.getCurrentUrl();
  }
  
  /**
   * Scroll to footer
   * Uses BasePage.scrollToElement() method
   */
  async scrollToBottom(): Promise<void> {
    const footer = this.page.locator('footer').first();
    await this.scrollToElement(footer);
  }
}
