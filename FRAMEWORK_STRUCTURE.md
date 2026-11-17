# Playwright Page Object Model Framework Structure

This document provides a comprehensive explanation of each folder and file in the framework, their purpose, and how they work together.

---

## 📂 Root Directory

### Configuration Files

#### `playwright.config.ts`
**Purpose**: Main configuration file for Playwright test runner.

**Contains**:
- **Test Directory**: Specifies where test files are located (`./tests`)
- **Timeout Settings**: Default timeout for tests (30 seconds)
- **Execution Settings**: Parallel execution, retries, workers configuration
- **Browser Projects**: Configuration for Chromium, Firefox, WebKit, and mobile viewports
- **Reporters**: HTML, JSON, JUnit report configurations
- **Global Settings**: Screenshots, videos, traces on failure
- **Base URL**: Application URL from environment variables

**When to Modify**:
- Add new browser configurations
- Change timeout values
- Add new reporters
- Configure different test directories
- Set up web server for local development

---

#### `tsconfig.json`
**Purpose**: TypeScript compiler configuration.

**Contains**:
- **Compiler Options**: Target ES version, module system, strictness
- **Type Definitions**: Node.js and Playwright types
- **Path Mappings**: Aliases for clean imports
  ```typescript
  "@pages/*": ["src/pages/*"]
  "@page-objects/*": ["src/page-objects/*"]
  "@utilities/*": ["src/utilities/*"]
  "@data/*": ["src/data/*"]
  ```
- **Include/Exclude**: Which files to compile

**Benefits**:
- Type safety across the framework
- Clean import statements
- Better IDE intellisense
- Compile-time error detection

---

#### `package.json`
**Purpose**: Project metadata and dependency management.

**Contains**:
- **Project Information**: Name, version, description, author
- **Dependencies**: Playwright, TypeScript, Node types, dotenv
- **NPM Scripts**: Pre-configured commands for running tests
  - `npm test` - Run all tests
  - `npm run test:headed` - Run with visible browser
  - `npm run test:chromium/firefox/webkit` - Browser-specific tests
  - `npm run test:debug` - Debug mode
  - `npm run test:ui` - Interactive UI mode
  - `npm run test:report` - View HTML reports

**Key Scripts Explained**:
```json
"test": "playwright test"                    // Run all tests headless
"test:headed": "playwright test --headed"    // See browser while running
"test:debug": "playwright test --debug"      // Step-by-step debugging
"test:ui": "playwright test --ui"           // Interactive test UI
```

---

#### `.env.example`
**Purpose**: Template for environment variables.

**Contains**:
- **Application URLs**: BASE_URL for different environments
- **Test Credentials**: Username and password for test users
- **Browser Settings**: Headless mode, slow motion
- **Timeouts**: Default and navigation timeouts
- **Test Settings**: Screenshot/video on failure, workers, retries

**Usage**:
1. Copy to `.env`: `cp .env.example .env`
2. Update with actual values
3. Never commit `.env` to version control

---

#### `.gitignore`
**Purpose**: Specifies files and folders to exclude from version control.

**Excludes**:
- `node_modules/` - Dependencies
- `test-results/` - Test execution results
- `playwright-report/` - HTML reports
- `screenshots/` - Test screenshots
- `.env` - Environment variables (sensitive data)
- `dist/` - Compiled TypeScript output
- IDE-specific files

---

## 📁 `src/` Directory

Main source code directory containing all framework components.

---

### 📁 `src/pages/`

**Purpose**: Contains base page classes with common functionality.

#### `BasePage.ts`
**Purpose**: Parent class that all page objects inherit from.

**Contains**:
- **Navigation Methods**: `navigate()`, `getCurrentUrl()`, `getTitle()`
- **Interaction Methods**: `click()`, `fill()`, `type()`, `hover()`
- **Wait Methods**: `waitForElement()`, `waitForElementHidden()`, `waitForPageLoad()`
- **Validation Methods**: `isVisible()`, `getText()`
- **Utility Methods**: `takeScreenshot()`, `scrollToElement()`, `pressKey()`
- **Form Methods**: `selectDropdown()`, `check()`, `uncheck()`

**Key Features**:
- ✅ Encapsulates common Playwright operations
- ✅ Provides consistent error handling
- ✅ Implements explicit waits for stability
- ✅ Reduces code duplication (DRY principle)
- ✅ Easy to extend with new common methods

**Example Methods**:
```typescript
// Wait for element and click
async click(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  await locator.click();
}

// Fill input with automatic clearing
async fill(locator: Locator, text: string): Promise<void> {
  await locator.waitFor({ state: 'visible' });
  await locator.clear();
  await locator.fill(text);
}
```

**When to Modify**:
- Add new common methods used across multiple pages
- Update wait strategies
- Add custom error handling
- Implement framework-wide behaviors

---

### 📁 `src/page-objects/`

**Purpose**: Contains page-specific classes implementing the Page Object Model pattern.

**What is Page Object Model (POM)?**
- Design pattern that creates an object repository for web elements
- Each page of the application has a corresponding page class
- Separates test logic from page-specific code
- Improves maintainability and reduces code duplication

---

#### `LoginPage.ts`
**Purpose**: Encapsulates login page elements and actions.

**Structure**:
```typescript
export class LoginPage extends BasePage {
  // 1. Locators (private)
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  
  // 2. Constructor - Initialize locators
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }
  
  // 3. Page Actions (public)
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
  
  // 4. Validation Methods
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
```

**Contains**:
- **Locators**: All element selectors for the login page
- **Actions**: `login()`, `loginWithRememberMe()`, `clickForgotPassword()`
- **Validations**: `isLoginPageLoaded()`, `getErrorMessage()`, `isErrorMessageDisplayed()`

**Best Practices**:
- ✅ Locators are private (encapsulation)
- ✅ Methods are public (actions and validations)
- ✅ No assertions in page objects
- ✅ Methods return values or promises
- ✅ Descriptive method names

---

#### `HomePage.ts`
**Purpose**: Encapsulates home page elements and actions.

**Contains**:
- **Locators**: Welcome message, profile icon, logout button, search box, navigation menu
- **Actions**: `logout()`, `search()`, `navigateToSettings()`
- **Validations**: `getWelcomeMessage()`, `isHomePageLoaded()`, `getNavigationMenuItems()`

**Usage in Tests**:
```typescript
const homePage = new HomePage(page);
await homePage.navigateToHome();
await homePage.search('product');
const message = await homePage.getWelcomeMessage();
```

---

### 📁 `src/data/`

**Purpose**: Centralized test data management for data-driven testing.

---

#### `users.json`
**Purpose**: Store test user data in JSON format.

**Structure**:
```json
{
  "validUser": {
    "username": "testuser@example.com",
    "password": "Test@1234",
    "firstName": "Test",
    "lastName": "User"
  },
  "adminUser": { },
  "invalidUser": { }
}
```

**Benefits**:
- ✅ Easy to read and edit
- ✅ Can be loaded dynamically
- ✅ Supports multiple data sets
- ✅ No code changes needed to update data

**Usage**:
```typescript
import * as users from '../data/users.json';
const user = users.validUser;
```

---

#### `testData.ts`
**Purpose**: Type-safe test data with TypeScript interfaces.

**Contains**:
- **Interfaces**: `User`, `SearchData` for type safety
- **Test Users**: Valid, admin, and invalid user objects
- **Search Data**: Valid and invalid search terms
- **Error Messages**: Expected error messages
- **URLs**: Application routes

**Benefits**:
- ✅ Type safety with IntelliSense
- ✅ Compile-time validation
- ✅ Autocomplete in IDE
- ✅ Easier refactoring

**Usage**:
```typescript
import { testUsers, errorMessages } from '../data/testData';
await loginPage.login(testUsers.validUser.username, testUsers.validUser.password);
expect(error).toBe(errorMessages.invalidLogin);
```

**When to Use JSON vs TypeScript**:
- **JSON**: External data, configuration, non-technical users can edit
- **TypeScript**: Complex data structures, need type safety, shared interfaces

---

### 📁 `src/utilities/`

**Purpose**: Reusable helper functions and utilities for the framework.

---

#### `dateUtils.ts`
**Purpose**: Date manipulation and formatting functions.

**Functions**:
- `getCurrentDate(format)` - Get current date in specified format
- `getCurrentTimestamp()` - Get Unix timestamp
- `addDays(date, days)` - Add/subtract days from a date
- `formatDate(date, format)` - Format date to string
- `getDaysDifference(date1, date2)` - Calculate difference between dates

**Use Cases**:
- Setting date ranges in forms
- Generating dynamic test data
- Validating date fields
- Creating timestamps for files/logs

**Example**:
```typescript
import { getCurrentDate, addDays } from '../utilities/dateUtils';
const today = getCurrentDate('DD-MM-YYYY');
const futureDate = addDays(new Date(), 30);
```

---

#### `stringUtils.ts`
**Purpose**: String manipulation and generation utilities.

**Functions**:
- `generateRandomString(length, includeNumbers)` - Random string generation
- `generateRandomEmail(domain)` - Random email addresses
- `capitalizeFirstLetter(str)` - Capitalize strings
- `removeSpecialCharacters(str)` - Clean strings
- `truncateString(str, maxLength)` - Truncate with ellipsis
- `isValidEmail(email)` - Email validation
- `generateUniqueId()` - Unique identifiers

**Use Cases**:
- Creating unique test data
- Generating random usernames/emails
- Data validation
- Cleaning input data

**Example**:
```typescript
import { generateRandomEmail, generateUniqueId } from '../utilities/stringUtils';
const email = generateRandomEmail('test.com'); // random123@test.com
const orderId = generateUniqueId(); // id_1234567890_abc123def
```

---

#### `testHelpers.ts`
**Purpose**: Test-specific helper functions and custom assertions.

**Functions**:
- `wait(ms)` - Simple delay
- `retryUntilSuccess(fn, maxRetries, delay)` - Retry logic for flaky operations
- `takeTimestampedScreenshot(page, name)` - Screenshots with timestamps
- `getRandomNumber(min, max)` - Random number generation
- `getRandomElement(array)` - Pick random array element
- `loadJsonData(filePath)` - Load JSON files
- `assertUrlContains(page, text)` - Custom URL assertion
- `assertPageTitle(page, title)` - Custom title assertion
- `elementExists(page, selector)` - Check element existence

**Use Cases**:
- Handling flaky tests with retry logic
- Debugging with screenshots
- Data-driven testing with JSON
- Custom assertions for better readability

**Example**:
```typescript
import { retryUntilSuccess, assertUrlContains } from '../utilities/testHelpers';

// Retry API call up to 3 times
await retryUntilSuccess(async () => {
  await page.waitForSelector('.loaded');
}, 3, 1000);

// Custom assertion
await assertUrlContains(page, '/dashboard');
```

---

#### `logger.ts`
**Purpose**: Centralized logging utility for test execution.

**Features**:
- **Singleton Pattern**: Single logger instance across framework
- **Log Levels**: INFO, DEBUG, WARN, ERROR
- **Timestamps**: Automatic ISO timestamp for each log
- **Formatted Output**: Consistent log format
- **Error Stack Traces**: Full error details on failures

**Methods**:
- `logger.info(message)` - Informational messages
- `logger.debug(message)` - Debug information
- `logger.warn(message)` - Warning messages
- `logger.error(message, error)` - Error messages with stack traces
- `logger.setConsoleLogging(enabled)` - Enable/disable logging

**Use Cases**:
- Tracking test execution flow
- Debugging failures
- Performance monitoring
- Audit trails

**Example**:
```typescript
import { logger } from '../utilities/logger';

test('example', async () => {
  logger.info('Starting test execution');
  await loginPage.login(username, password);
  logger.debug('Login successful');
  logger.error('Test failed', error);
});
```

**Output Format**:
```
[2026-11-17T12:30:45.123Z] [INFO] Starting test execution
[2026-11-17T12:30:46.456Z] [DEBUG] Login successful
[2026-11-17T12:30:47.789Z] [ERROR] Test failed
```

---

#### `config.ts`
**Purpose**: Environment configuration management with type safety.

**Features**:
- **Environment Variables**: Loads from `.env` file using dotenv
- **Type Safety**: TypeScript interface for all config values
- **Default Values**: Fallback values if env vars not set
- **Typed Access**: Autocomplete for configuration keys

**Configuration Values**:
- `baseUrl` - Application URL
- `testUsername`, `testPassword` - Test credentials
- `adminUsername`, `adminPassword` - Admin credentials
- `headless` - Browser visibility
- `slowMo` - Slow down operations
- `defaultTimeout`, `navigationTimeout` - Timeout settings
- `screenshotOnFailure`, `videoOnFailure` - Artifact settings
- `workers`, `retries` - Execution settings

**Helper Functions**:
- `getEnvironment()` - Get current environment (dev/staging/prod)
- `isCI()` - Check if running in CI/CD
- `getConfigValue(key)` - Get specific config value

**Usage**:
```typescript
import { config, baseUrl, isCI } from '../utilities/config';

await page.goto(baseUrl);
const retries = isCI() ? 2 : 0;
```

---

## 📁 `tests/` Directory

**Purpose**: Contains all test specifications and test fixtures.

---

### `login.spec.ts`
**Purpose**: Test suite for login functionality.

**Test Cases**:
1. ✅ Login with valid credentials
2. ✅ Show error message with invalid credentials
3. ✅ Login with remember me option
4. ✅ Navigate to forgot password page

**Structure**:
```typescript
test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  
  // Setup before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });
  
  // Individual test cases
  test('should login successfully', async ({ page }) => {
    await loginPage.login(username, password);
    expect(await homePage.isHomePageLoaded()).toBeTruthy();
  });
  
  // Cleanup after each test
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `failure-${testInfo.title}.png` });
    }
  });
});
```

**Key Features**:
- Uses page objects (LoginPage, HomePage)
- Uses test data (testUsers, errorMessages)
- Implements logging
- Screenshots on failure
- Clear test descriptions

---

### `home.spec.ts`
**Purpose**: Test suite for home page functionality.

**Test Cases**:
1. ✅ Display welcome message
2. ✅ Perform search operation
3. ✅ Navigate to settings page
4. ✅ Display navigation menu items
5. ✅ Logout successfully

**Features**:
- Login in `beforeEach` for authenticated tests
- Uses multiple page objects
- Validates navigation and UI elements
- Tests user workflows

---

### `fixtures.ts`
**Purpose**: Custom Playwright fixtures for cleaner test code.

**What are Fixtures?**
- Reusable test setup and teardown
- Dependency injection for tests
- Automatic cleanup after tests
- Type-safe test context

**Custom Fixtures**:
```typescript
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);  // Provide to test
    // Automatic cleanup after test
  },
  
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
```

**Usage in Tests**:
```typescript
import { test, expect } from './fixtures';

test('example', async ({ loginPage, homePage }) => {
  // Page objects are automatically available
  await loginPage.navigateToLogin();
  await homePage.navigateToHome();
});
```

**Benefits**:
- ✅ No need to initialize page objects in each test
- ✅ Cleaner test code
- ✅ Automatic setup and teardown
- ✅ Type safety
- ✅ Easy to extend with new fixtures

---

## 📁 Generated Folders (Auto-created)

These folders are created automatically during test execution:

### `node_modules/`
- Contains all npm dependencies
- Excluded from version control
- Generated by `npm install`

### `test-results/`
- Contains test execution results
- JSON and JUnit XML reports
- Traces for failed tests
- Generated after test runs

### `playwright-report/`
- HTML test reports
- Screenshots and videos
- Test execution timeline
- View with `npx playwright show-report`

### `screenshots/`
- Manual screenshots from tests
- Failure screenshots
- Debug screenshots
- Organized by test name and timestamp

---

## 🔄 How Everything Works Together

### Test Execution Flow:

```
1. Test File (login.spec.ts)
   ↓
2. Import Page Objects (LoginPage, HomePage)
   ↓
3. Page Objects extend BasePage
   ↓
4. Use Test Data (testUsers, testData)
   ↓
5. Use Utilities (logger, testHelpers)
   ↓
6. Execute Test Actions
   ↓
7. Assertions & Validations
   ↓
8. Generate Reports
```

### Example Test Flow:

```typescript
// 1. Import dependencies
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/page-objects/LoginPage';  // Page Object
import { testUsers } from '../src/data/testData';           // Test Data
import { logger } from '../src/utilities/logger';           // Utility

// 2. Test suite
test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  
  // 3. Setup
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);  // Uses BasePage methods
    await loginPage.navigateToLogin();
    logger.info('Navigated to login page');
  });
  
  // 4. Test case
  test('should login successfully', async ({ page }) => {
    // Uses page object method
    await loginPage.login(
      testUsers.validUser.username,  // Uses test data
      testUsers.validUser.password
    );
    
    // Assertion
    expect(await homePage.isHomePageLoaded()).toBeTruthy();
    
    logger.info('Login successful');
  });
});
```

---

## 🎯 Best Practices Summary

### For Each Folder:

**src/pages/**
- ✅ Keep only base classes
- ✅ Add methods used across ALL pages
- ✅ Don't add page-specific logic

**src/page-objects/**
- ✅ One class per page
- ✅ Private locators, public methods
- ✅ No assertions in page objects
- ✅ Return values, not assertions

**src/data/**
- ✅ Separate concerns (users, products, etc.)
- ✅ Use TypeScript for complex data
- ✅ Use JSON for simple data
- ✅ Never hardcode in tests

**src/utilities/**
- ✅ Small, focused functions
- ✅ Reusable across tests
- ✅ Well documented
- ✅ Unit testable

**tests/**
- ✅ One feature per file
- ✅ Descriptive test names
- ✅ Independent tests
- ✅ Use beforeEach/afterEach appropriately

---

## 🚀 Getting Started Guide

### 1. Add a New Page Object

```typescript
// src/page-objects/ProductPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class ProductPage extends BasePage {
  private readonly productTitle: Locator;
  
  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('.product-title');
  }
  
  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }
}
```

### 2. Add Test Data

```typescript
// src/data/testData.ts
export const productData = {
  validProduct: {
    name: 'Test Product',
    price: 29.99
  }
};
```

### 3. Write Tests

```typescript
// tests/product.spec.ts
import { test, expect } from '@playwright/test';
import { ProductPage } from '../src/page-objects/ProductPage';
import { productData } from '../src/data/testData';

test.describe('Product Tests', () => {
  test('should display product title', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate('/products/1');
    
    const title = await productPage.getProductTitle();
    expect(title).toBe(productData.validProduct.name);
  });
});
```

---

## 📚 Additional Resources

- **Main Documentation**: [README.md](README.md)
- **Quick Start**: [QUICK_START.md](QUICK_START.md)
- **Playwright Docs**: https://playwright.dev
- **TypeScript Docs**: https://www.typescriptlang.org

---

**Happy Testing! 🎭**