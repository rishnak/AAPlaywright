/**
 * Test Helper Functions
 * Provides reusable test utilities and custom assertions
 */

import { Page, expect } from '@playwright/test';

/**
 * Wait for specified milliseconds
 * @param ms - Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function until condition is met
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param delay - Delay between retries in ms
 * @returns Result of the function
 */
export async function retryUntilSuccess<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await wait(delay);
      }
    }
  }
  
  throw lastError || new Error('Retry failed');
}

/**
 * Take screenshot with timestamp
 * @param page - Playwright page object
 * @param name - Screenshot name
 */
export async function takeTimestampedScreenshot(page: Page, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `screenshots/${name}_${timestamp}.png`,
    fullPage: true
  });
}

/**
 * Get random number within range
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random element from array
 * @param array - Input array
 * @returns Random element
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Load JSON data from file
 * @param filePath - Path to JSON file
 * @returns Parsed JSON data
 */
export async function loadJsonData(filePath: string): Promise<any> {
  const fs = require('fs').promises;
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Custom assertion: Verify URL contains text
 * @param page - Playwright page object
 * @param expectedText - Expected text in URL
 */
export async function assertUrlContains(page: Page, expectedText: string): Promise<void> {
  const currentUrl = page.url();
  expect(currentUrl).toContain(expectedText);
}

/**
 * Custom assertion: Verify page title
 * @param page - Playwright page object
 * @param expectedTitle - Expected page title
 */
export async function assertPageTitle(page: Page, expectedTitle: string): Promise<void> {
  await expect(page).toHaveTitle(expectedTitle);
}

/**
 * Check if element exists in DOM (without waiting)
 * @param page - Playwright page object
 * @param selector - Element selector
 * @returns True if element exists
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  const element = await page.$(selector);
  return element !== null;
}