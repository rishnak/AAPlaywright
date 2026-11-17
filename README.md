# Playwright Page Object Model Framework

A comprehensive test automation framework built with Playwright and TypeScript, implementing the Page Object Model (POM) design pattern.

## 📁 Project Structure

```
AAPlaywright/
├── src/
│   ├── pages/              # Base page classes
│   │   └── BasePage.ts     # Base page with common methods
│   ├── page-objects/       # Page object classes
│   │   ├── LoginPage.ts    # Login page object
│   │   └── HomePage.ts     # Home page object
│   ├── data/               # Test data
│   │   ├── users.json      # User test data (JSON)
│   │   └── testData.ts     # Centralized test data (TypeScript)
│   └── utilities/          # Helper utilities
│       ├── dateUtils.ts    # Date manipulation functions
│       ├── stringUtils.ts  # String utilities
│       ├── testHelpers.ts  # Test helper functions
│       └── logger.ts       # Logging utility
├── tests/                  # Test specifications
│   ├── login.spec.ts       # Login tests
│   └── home.spec.ts        # Home page tests
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies
├── .env.example           # Environment variables example
└── .gitignore            # Git ignore file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AAPlaywright
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration.

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

## 📊 Reports

### View HTML report
```bash
npx playwright show-report
```

Reports are generated in the `playwright-report` directory after test execution.

## 🏗️ Framework Architecture

### Page Object Model (POM)

This framework implements the Page Object Model design pattern:

- **BasePage**: Contains common methods used across all pages
- **Page Objects**: Each page has its own class with locators and methods
- **Tests**: Test files use page objects to interact with the application

### Key Components

#### 1. Base Page (`src/pages/BasePage.ts`)
Provides reusable methods:
- `navigate()` - Navigate to URL
- `click()` - Click element
- `fill()` - Fill input field
- `getText()` - Get text content
- `waitForElement()` - Wait for element
- And many more...

#### 2. Page Objects (`src/page-objects/`)
Each page object:
- Extends BasePage
- Defines page-specific locators
- Implements page-specific actions
- Encapsulates page behavior

#### 3. Test Data (`src/data/`)
Centralized test data management:
- JSON files for structured data
- TypeScript files for typed data
- Reusable across tests

#### 4. Utilities (`src/utilities/`)
Helper functions:
- Date utilities
- String utilities
- Test helpers
- Logger

## 📝 Writing Tests

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/page-objects/LoginPage';
import { testUsers } from '../src/data/testData';

test.describe('Feature Tests', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });
  
  test('should perform action', async ({ page }) => {
    await loginPage.login(
      testUsers.validUser.username,
      testUsers.validUser.password
    );
    
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
  });
});
```

## 🎯 Best Practices

### 1. Page Objects
- Keep page objects focused on a single page
- Use meaningful method names
- Return promises for async operations
- Don't include assertions in page objects

### 2. Tests
- One assertion per test (when possible)
- Use descriptive test names
- Keep tests independent
- Use beforeEach/afterEach hooks appropriately

### 3. Locators
- Prefer user-facing attributes (text, label, role)
- Use data-testid for dynamic content
- Avoid XPath when possible
- Keep locators maintainable

### 4. Data Management
- Externalize test data
- Use environment variables for configuration
- Keep sensitive data secure

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)

Key configurations:
- **Test directory**: `./tests`
- **Timeout**: 30 seconds per test
- **Retries**: 2 on CI, 0 locally
- **Browsers**: Chromium, Firefox, WebKit
- **Reports**: HTML, JSON, JUnit

### TypeScript Config (`tsconfig.json`)

Path mappings for clean imports:
```typescript
"@pages/*": ["src/pages/*"]
"@page-objects/*": ["src/page-objects/*"]
"@utilities/*": ["src/utilities/*"]
"@data/*": ["src/data/*"]
```

## 🐛 Debugging

### Screenshots
Screenshots are automatically captured on test failure.

### Traces
Enable trace on first retry in `playwright.config.ts`:
```typescript
use: {
  trace: 'on-first-retry',
}
```

### View traces
```bash
npx playwright show-trace trace.zip
```

## 🔐 Environment Variables

Supported environment variables:
- `BASE_URL` - Application base URL
- `TEST_USERNAME` - Test user username
- `TEST_PASSWORD` - Test user password
- `HEADLESS` - Run in headless mode
- `SLOW_MO` - Slow down operations

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📄 License

MIT License

## 👥 Authors

Senior Test Engineer

---

**Happy Testing! 🎭**