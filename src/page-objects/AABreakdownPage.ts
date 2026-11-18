import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { aaUrls, aaFormData} from '../../src/data/aaTestData';

/**
 * AA Breakdown Cover Page Object
 * Encapsulates elements and actions for the breakdown cover page
 * Demonstrates proper POM pattern with BasePage inheritance
 */
export class AABreakdownPage extends BasePage {
  // Locators - private readonly
  private readonly pageHeading: Locator;
  private readonly getQuoteButton: Locator;
  private readonly chooseYourCoverHeading:Locator;
  private readonly postcodeTextfield: Locator;
  private readonly dayTextField: Locator;
  private readonly monthTextField: Locator;
  private readonly yearTextField: Locator;
  private readonly submitButton:Locator;



  constructor(page: Page) {
    super(page); // Call BasePage constructor
    
    // Initialize locators
    this.pageHeading = page.locator('h1').first();
    this.getQuoteButton = page.getByRole('link',{name:'Get a breakdown quote'}).first();
    this.chooseYourCoverHeading = page.getByRole('heading', {name: 'Choose your cover', level: 1});
    this.postcodeTextfield = page.locator('#postCode');
    this.monthTextField = page.locator('#month');
    this.dayTextField = page.locator('#day');
    this.yearTextField = page.locator('#year');
    this.submitButton = page.getByRole('button', {name:' Submit details '}).first();



  }
  
  /**
   * Verify breakdown page is loaded
   * Uses BasePage.isVisible()
   */
  async isBreakdownPageLoaded(): Promise<boolean> {
    return await this.isVisible(this.pageHeading);
  }
  
  /**
   * Get page heading text
   * Uses BasePage.getText()
   */
  async getHeading(): Promise<string> {
    return await this.getText(this.pageHeading);
  }
  
  /**
   * Click get quote button
   * Uses BasePage.click()
   */
  async clickGetQuote(): Promise<void> {
    await this.click(this.getQuoteButton);
  }
  
  /**
   * Wait for page to load completely
   * Uses BasePage.waitForPageLoad()
   */
  async waitForBreakdownPageLoad(): Promise<void> {
    await this.waitForPageLoad();
  }
  
  /**
   * Verify URL contains 'breakdown'
   * Uses BasePage.getCurrentUrl()
   */
  async isOnBreakdownPage(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.toLowerCase().includes('breakdown');
  }

  async isOnSalesCoverPage(): Promise<void>{
    expect(this.chooseYourCoverHeading.isVisible()).toBeTruthy();
  }

  async enterPostcode(){
    this.fill(this.postcodeTextfield,aaFormData.postcode);
  }

  async enterDOB(){
    this.fill(this.dayTextField,aaFormData.day);
    this.fill(this.monthTextField,aaFormData.month);
    this.fill(this.yearTextField,aaFormData.year);
  }

  async clickOnSubmitButton(): Promise<void>{
    this.click(this.submitButton);
  }
}
