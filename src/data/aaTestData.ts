/**
 * AA Website Test Data
 * Centralized test data for AA website tests
 */

export interface AAWebsiteData {
  baseUrl: string;
  expectedTitle: string;
  searchTerms: string[];
}

/**
 * AA Website URLs and navigation data
 */
export const aaUrls = {
  home: '/',
  breakdown: '/breakdown-cover',
  insurance: '/insurance',
  membership: '/join-the-aa'
};

/**
 * Expected page titles
 */
export const aaPageTitles = {
  homePage: 'AA',  // Should contain 'AA'
  breakdownPage: 'breakdown-cover'
};

/**
 * Test data for AA website
 */
export const aaTestData: AAWebsiteData = {
  baseUrl: 'https://www.theaa.com',
  expectedTitle: 'AA',
  searchTerms: ['breakdown cover', 'car insurance', 'route planner']
};

/**
 * Expected content on pages
 */
export const aaExpectedContent = {
  homePage: {
    hasNavigation: true,
    hasLogo: true,
    hasBreakdownLink: true
  },
  breakdownPage: {
    hasGetQuoteButton: true,
    hasPhoneNumber: true
  }
};
