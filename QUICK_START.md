# Quick Start Guide

Get up and running with the Playwright POM Framework in minutes!

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install

# 3. Run tests
npm test
```

## 📋 Common Commands

### Running Tests

```bash
# Run all tests
npm test

# Run with UI mode (recommended for development)
npm run test:ui

# Run in headed mode (see the browser)
npm run test:headed

# Run specific test file
npm run test:login
npm run test:home

# Run in debug mode
npm run test:debug

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Viewing Reports

```bash
# View HTML report
npm run test:report
```

## 🏗️ Creating New Tests

### 1. Create a Page Object

```typescript
// src/page-objects/ProductPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class ProductPage extends BasePage {
  private readonly productTitle: Locator;
  private readonly addToCartButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('.product-title');
    this.addToCartButton = page.locator('#add-to-cart');
  }
  
  async addToCart(): Promise<void> {
    await this.click(this.addToCartButton);
  }
}
```

### 2. Create Test Data

```typescript
// src/data/testData.ts
export const productData = {
  validProduct: {
    name: 'Test Product',
    price: '$29.99'
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
  let productPage: ProductPage;
  
  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.navigate('/products');
  });
  
  test('should add product to cart', async () => {
    await productPage.addToCart();
    // Add assertions
  });
});
```

## 🎯 Framework Structure

```
src/
├── pages/           → Base page classes
├── page-objects/    → Page-specific classes
├── data/           → Test data files
└── utilities/      → Helper functions

tests/              → Test specifications
```

## 💡 Best Practices

### ✅ Do's
- Use page objects for all page interactions
- Keep tests independent and isolated
- Use meaningful test and method names
- Externalize test data
- Use fixtures for common setup

### ❌ Don'ts
- Don't put assertions in page objects
- Avoid hardcoded waits (use waitFor methods)
- Don't duplicate code (use utilities)
- Avoid complex logic in tests

## 🔍 Debugging Tips

### Use UI Mode (Best for Debugging)
```bash
npm run test:ui
```

### Use Debug Mode
```bash
npm run test:debug
```

### Take Screenshots
```typescript
await page.screenshot({ path: 'debug.png' });
```

### Use Console Logs
```typescript
import { logger } from '../src/utilities/logger';
logger.info('Debug message');
```

## 🌍 Environment Variables

Create a `.env` file:

```env
BASE_URL=https://your-app.com
TEST_USERNAME=your-username
TEST_PASSWORD=your-password
```

## 📊 Reports

After running tests, view reports:

- **HTML Report**: `npx playwright show-report`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/junit.xml`

## 🆘 Troubleshooting

### Tests are failing
1. Check browser installation: `npx playwright install`
2. Clear cache: `npx playwright install --force`
3. Update dependencies: `npm update`

### Slow test execution
1. Reduce timeout values in config
2. Use parallel execution
3. Run specific tests only

### Element not found
1. Check selectors in page objects
2. Add proper waits
3. Use Playwright Inspector: `npm run test:debug`

## 📚 Additional Resources

- [Full README](README.md)
- [Playwright Docs](https://playwright.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

---

**Happy Testing! 🎭**