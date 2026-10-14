import { test, expect } from '../fixtures/authenticatedTest';
import { CaseStudyAnalysisPage } from '../../Pages/CaseStudyAnalysisPage';
import caseStudyAnalysisData from '../../test-data/caseStudyAnalysisData.json';

test.describe('Case Study Analysis - Navigation & Page Load', () => {
  let caseStudyAnalysisPage: CaseStudyAnalysisPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    caseStudyAnalysisPage = new CaseStudyAnalysisPage(authenticatedPage);
  });

  test('TC-001: Verify Case Study Analysis page loads correctly', async () => {
    await caseStudyAnalysisPage.navigateToCaseStudyAnalysis();
     await caseStudyAnalysisPage.verifyPageLoaded();
     await caseStudyAnalysisPage.verifyPageUrl(caseStudyAnalysisData.caseStudyAnalysisPage.expectedUrl);
  });

  test('TC-002: Verify page title displays correctly', async () => {
    await caseStudyAnalysisPage.navigateToCaseStudyAnalysis();
    await caseStudyAnalysisPage.verifyPageTitle(caseStudyAnalysisData.caseStudyAnalysisPage.pageTitle);
    await caseStudyAnalysisPage.verifyBrowserTitle(caseStudyAnalysisData.caseStudyAnalysisPage.browserTitle);
  });

  test('TC-003: Verify Work Management menu item is highlighted', async () => {
    await caseStudyAnalysisPage.navigateToCaseStudyAnalysis();
    const isHighlighted = await caseStudyAnalysisPage.verifyMenuItemHighlighted(caseStudyAnalysisData.navigationPath.level1);
    expect(isHighlighted).toBeTruthy();
  });

  test('TC-004: Verify sidebar menu items are visible and clickable', async () => {
    await caseStudyAnalysisPage.navigateToCaseStudyAnalysis();
    for (const menuItem of caseStudyAnalysisData.sidebarMenuItems) {
      const isVisible = await caseStudyAnalysisPage.verifyMenuItemExists(menuItem);
      const isClickable = await caseStudyAnalysisPage.verifyMenuItemClickable(menuItem);
      expect(isVisible).toBeTruthy();
      expect(isClickable).toBeTruthy();
    }
  });

  test('TC-005: Verify page loads within acceptable time', async () => {
    await caseStudyAnalysisPage.navigateToCaseStudyAnalysis();
    const loadTime = await caseStudyAnalysisPage.getPageLoadTime();
    expect(loadTime).toBeLessThan(caseStudyAnalysisData.caseStudyAnalysisPage.maxLoadTime);
  });
});


