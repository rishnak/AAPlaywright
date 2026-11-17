/**
 * Test Fixtures
 * Provides reusable test fixtures for page objects and common setup
 */

import { test as base } from '@playwright/test';
import { LoginPage } from '../src/page-objects/LoginPage';
import { HomePage } from '../src/page-objects/HomePage';
import { logger } from '../src/utilities/logger';

/**
 * Extend base test with custom fixtures
 */
type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

/**
 * Custom test with page object fixtures
 */
export const test = base.extend<Fixtures>({
  /**
   * Login page fixture
   */
  loginPage: async ({ page }, use) => {
    logger.info('Initializing LoginPage fixture');
    const loginPage = new LoginPage(page);
    await use(loginPage);
    logger.info('LoginPage fixture cleanup');
  },
  
  /**
   * Home page fixture
   */
  homePage: async ({ page }, use) => {
    logger.info('Initializing HomePage fixture');
    const homePage = new HomePage(page);
    await use(homePage);
    logger.info('HomePage fixture cleanup');
  },
});

export { expect } from '@playwright/test';