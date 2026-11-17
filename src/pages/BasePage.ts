import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Class
 * Contains common methods and functionality that all page objects will inherit
 * Implements reusable actions to follow DRY principle
 */
export class BasePage {
  protected page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
  
  /**
   * Click on an element
   * @param locator - The element locator
   */
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }
  
  /**
   * Fill input field with text
   * @param locator - The input field locator
   * @param text - The text to fill
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }
  
  /**
   * Type text into an input field with delay
   * @param locator - The input field locator
   * @param text - The text to type
   * @param delay - Delay between keystrokes in milliseconds
   */
  async type(locator: Locator, text: string, delay: number = 100): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.type(text, { delay });
  }
  
  /**
   * Get text content from an element
   * @param locator - The element locator
   * @returns The text content
   */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
  }
  
  /**
   * Wait for an element to be visible
   * @param locator - The element locator
   * @param timeout - Custom timeout in milliseconds
   */
  async waitForElement(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
  
  /**
   * Wait for an element to be hidden
   * @param locator - The element locator
   * @param timeout - Custom timeout in milliseconds
   */
  async waitForElementHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }
  
  /**
   * Check if an element is visible
   * @param locator - The element locator
   * @returns True if visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
  
  /**
   * Select option from dropdown
   * @param locator - The dropdown locator
   * @param value - The value to select
   */
  async selectDropdown(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }
  
  /**
   * Check a checkbox or radio button
   * @param locator - The checkbox/radio locator
   */
  async check(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.check();
  }
  
  /**
   * Uncheck a checkbox
   * @param locator - The checkbox locator
   */
  async uncheck(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.uncheck();
  }
  
  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
  
  /**
   * Take a screenshot
   * @param name - Screenshot name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
  
  /**
   * Get current page title
   * @returns The page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
  
  /**
   * Get current URL
   * @returns The current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
  
  /**
   * Scroll to an element
   * @param locator - The element locator
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }
  
  /**
   * Press keyboard key
   * @param key - The key to press
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }
  
  /**
   * Hover over an element
   * @param locator - The element locator
   */
  async hover(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
  }
}