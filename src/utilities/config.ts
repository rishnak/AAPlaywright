/**
 * Configuration Utility
 * Manages environment configuration and provides typed access to environment variables
 */

import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Configuration interface
 */
interface Config {
  baseUrl: string;
  testUsername: string;
  testPassword: string;
  adminUsername: string;
  adminPassword: string;
  headless: boolean;
  slowMo: number;
  defaultTimeout: number;
  navigationTimeout: number;
  screenshotOnFailure: boolean;
  videoOnFailure: boolean;
  workers: number;
  retries: number;
}

/**
 * Get configuration from environment variables
 */
export const config: Config = {
  baseUrl: process.env.BASE_URL || 'https://example.com',
  testUsername: process.env.TEST_USERNAME || 'testuser@example.com',
  testPassword: process.env.TEST_PASSWORD || 'Test@1234',
  adminUsername: process.env.ADMIN_USERNAME || 'admin@example.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@1234',
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '15000', 10),
  screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE !== 'false',
  videoOnFailure: process.env.VIDEO_ON_FAILURE !== 'false',
  workers: parseInt(process.env.WORKERS || '4', 10),
  retries: parseInt(process.env.RETRIES || '2', 10)
};

/**
 * Get environment name
 */
export function getEnvironment(): string {
  return process.env.NODE_ENV || 'development';
}

/**
 * Check if running in CI environment
 */
export function isCI(): boolean {
  return !!process.env.CI;
}

/**
 * Get configuration value safely
 */
export function getConfigValue(key: keyof Config): any {
  return config[key];
}

/**
 * Export individual config values for convenience
 */
export const {
  baseUrl,
  testUsername,
  testPassword,
  adminUsername,
  adminPassword,
  headless,
  slowMo,
  defaultTimeout,
  navigationTimeout,
  screenshotOnFailure,
  videoOnFailure,
  workers,
  retries
} = config;