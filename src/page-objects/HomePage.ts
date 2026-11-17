import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * Home Page Object
 * Encapsulates all elements and actions for the home page
 */
export class HomePage extends BasePage {
  // Locators
  private readonly welcomeMessage: Locator;
  private readonly userProfileIcon: Locator;
  private readonly logoutButton: Locator;
  private readonly searchBox: Locator;
  private readonly navigationMenu: Locator;
  private readonly settingsLink: Locator;
  
  constructor(page: Page) {
    super(page);
    // Initialize locators
    this.welcomeMessage = page.locator('.welcome-message');
    this.userProfileIcon = page.locator('.user-profile-icon');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.searchBox = page.locator('input[placeholder="Search..."]');
    this.navigationMenu = page.locator('.nav-menu');
    this.settingsLink = page.locator('a[href="/settings"]');
  }
  
  /**
   * Navigate to home page
   */
  async navigateToHome(): Promise<void> {
    await this.navigate('/');
  }
  
  /**
   * Get welcome message text
   * @returns The welcome message displayed
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }
  
  /**
   * Perform logout action
   */
  async logout(): Promise<void> {
    await this.click(this.userProfileIcon);
    await this.waitForElement(this.logoutButton);
    await this.click(this.logoutButton);
  }
  
  /**
   * Perform search operation
   * @param searchTerm - The term to search for
   */
  async search(searchTerm: string): Promise<void> {
    await this.fill(this.searchBox, searchTerm);
    await this.pressKey('Enter');
  }
  
  /**
   * Navigate to settings
   */
  async navigateToSettings(): Promise<void> {
    await this.click(this.settingsLink);
  }
  
  /**
   * Verify home page is loaded
   * @returns True if welcome message is visible
   */
  async isHomePageLoaded(): Promise<boolean> {
    return await this.isVisible(this.welcomeMessage);
  }
  
  /**
   * Get navigation menu items
   * @returns Array of menu item texts
   */
  async getNavigationMenuItems(): Promise<string[]> {
    const menuItems = await this.navigationMenu.locator('li').allTextContents();
    return menuItems;
  }
}