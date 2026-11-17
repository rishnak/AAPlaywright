import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * Login Page Object
 * Encapsulates all elements and actions for the login page
 */
export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly forgotPasswordLink: Locator;
  
  constructor(page: Page) {
    super(page);
    // Initialize locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
    this.rememberMeCheckbox = page.locator('#remember-me');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot Password")');
  }
  
  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.navigate('/login');
  }
  
  /**
   * Perform login action
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
  
  /**
   * Login with remember me option
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async loginWithRememberMe(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.check(this.rememberMeCheckbox);
    await this.click(this.loginButton);
  }
  
  /**
   * Get error message text
   * @returns The error message displayed
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
  
  /**
   * Check if error message is displayed
   * @returns True if error message is visible
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
  
  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }
  
  /**
   * Verify login page is loaded
   * @returns True if login button is visible
   */
  async isLoginPageLoaded(): Promise<boolean> {
    return await this.isVisible(this.loginButton);
  }
}