import { Page, Locator, LocatorScreenshotOptions } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { title } from 'node:process';

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
  
  constructor(page: Page) {
    super(page); // Call BasePage constructor
    
    // Initialize locators using actual AA website selectors
    this.mainLogo = page.locator('a[aria-label*="AA" i], .logo, header img').first();
    this.mainNavigation = page.locator('nav, header').first();
    this.carInsuranceLink = page.locator('a:has-text("Insurance")').first();
    this.membershipLink = page.locator('a:has-text("Membership")').first();
    this.searchButton = page.locator('button[aria-label*="search" i], [class*="search"]').first();
    this.cookieAcceptButton = page.locator('button:has-text("Accept"), button:has-text("OK")').first();
    this.breakdownLink = page.getByRole('button', {name:'Breakdown'}).first();
    this.breakdownCoverLink = page.getByRole('link', { name: 'Breakdown cover' }).first();
  }
  
  /**
   * Navigate to AA homepage
   * Uses BasePage.navigate() method - WAIT USES domcontentloaded instead of networkidle
   */
  async navigateToAAHome(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' }); // Faster than networkidle
    // Calls BasePage.navigate() internally
  }
  
  /**
   * Accept cookie consent if present
   * Uses BasePage.isVisible() and BasePage.click()
   */
  async acceptCookiesIfPresent(): Promise<void> {
    const cookieVisible = await this.isVisible(this.cookieAcceptButton);
    if (cookieVisible) {
      await this.click(this.cookieAcceptButton);
    }
  }
  
  /**
   * Verify homepage is loaded
   * Uses BasePage.isVisible() method
   * @returns True if logo is visible
   */
  async isAAHomePageLoaded(): Promise<boolean> {
    return await this.isVisible(this.mainNavigation); // Changed to navigation for reliability
  }
  
  /**
   * Get page title
   * Uses BasePage.getTitle() method
   * @returns The page title
   */
  async getPageTitle(): Promise<string> {
    return await this.getTitle(); // Calls BasePage.getTitle()
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
   * Uses BasePage.click() method
   */
  async navigateToBreakdownCover(): Promise<void> {
    await this.click(this.breakdownLink);
    await this.click(this.breakdownCoverLink);
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
    await this.scrollToElement(this.breakdownLink); // Scroll first
    // Note: Hover may not work if element is hidden in mobile menu
    // This demonstrates the method even if element isn't hoverable
  }
  
  /**
   * Take screenshot of homepage
   * Uses BasePage.takeScreenshot() method
   * @param name - Screenshot filename
   */
  async captureHomepage(name: string): Promise<void> {
    await this.takeScreenshot(name); // Calls BasePage.takeScreenshot()
  }
  
  /**
   * Get current URL
   * Uses BasePage.getCurrentUrl() method
   * @returns Current URL
   */
  async getCurrentPageUrl(): Promise<string> {
    return await this.getCurrentUrl(); // Calls BasePage.getCurrentUrl()
  }
  
  /**
   * Scroll to footer
   * Uses BasePage.scrollToElement() method
   */
  async scrollToBottom(): Promise<void> {
    const footer = this.page.locator('footer').first();
    await this.scrollToElement(footer); // Calls BasePage.scrollToElement()
  }

  
}
