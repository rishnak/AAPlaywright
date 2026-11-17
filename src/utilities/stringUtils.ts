/**
 * String Utility Functions
 * Provides reusable string manipulation functions
 */

/**
 * Generate random string
 * @param length - Length of the string
 * @param includeNumbers - Include numbers in the string
 * @returns Random string
 */
export function generateRandomString(length: number, includeNumbers: boolean = true): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const characters = includeNumbers ? letters + numbers : letters;
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generate random email
 * @param domain - Email domain (default: 'test.com')
 * @returns Random email address
 */
export function generateRandomEmail(domain: string = 'test.com'): string {
  const username = generateRandomString(10, true).toLowerCase();
  return `${username}@${domain}`;
}

/**
 * Capitalize first letter of string
 * @param str - Input string
 * @returns Capitalized string
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Remove special characters from string
 * @param str - Input string
 * @returns Cleaned string
 */
export function removeSpecialCharacters(str: string): string {
  return str.replace(/[^a-zA-Z0-9 ]/g, '');
}

/**
 * Truncate string to specified length
 * @param str - Input string
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 */
export function truncateString(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Check if string is valid email
 * @param email - Email string to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate unique identifier
 * @returns Unique string ID
 */
export function generateUniqueId(): string {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}