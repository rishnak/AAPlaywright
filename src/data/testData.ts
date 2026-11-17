/**
 * Test Data Module
 * Centralized location for test data management
 */

export interface User {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SearchData {
  validSearchTerms: string[];
  invalidSearchTerms: string[];
}

/**
 * User test data
 */
export const testUsers: Record<string, User> = {
  validUser: {
    username: 'testuser@example.com',
    password: 'Test@1234',
    firstName: 'Test',
    lastName: 'User'
  },
  adminUser: {
    username: 'admin@example.com',
    password: 'Admin@1234',
    firstName: 'Admin',
    lastName: 'User'
  },
  invalidUser: {
    username: 'invalid@example.com',
    password: 'Invalid@123'
  }
};

/**
 * Search test data
 */
export const searchTestData: SearchData = {
  validSearchTerms: [
    'product',
    'service',
    'documentation'
  ],
  invalidSearchTerms: [
    'xyzabc123',
    '!@#$%^&*',
    ''
  ]
};

/**
 * Error messages
 */
export const errorMessages = {
  invalidLogin: 'Invalid username or password',
  emptyUsername: 'Username is required',
  emptyPassword: 'Password is required',
  sessionExpired: 'Your session has expired'
};

/**
 * URLs
 */
export const urls = {
  login: '/login',
  home: '/',
  settings: '/settings',
  profile: '/profile',
  dashboard: '/dashboard'
};