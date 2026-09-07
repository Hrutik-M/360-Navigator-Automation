import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { DashboardPage } from '../../Pages/DashboardPage';
import { CaseStudyAnalysisPage } from '../../Pages/CaseStudyAnalysisPage';
import dotenv from 'dotenv';
import loginData from '../../test-data/loginData.json';
import caseStudyAnalysisData from '../../test-data/caseStudyAnalysisData.json';

dotenv.config();

test.describe('Case Study Analysis - Navigation & Page Load', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let caseStudyAnalysisPage: CaseStudyAnalysisPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    caseStudyAnalysisPage = new CaseStudyAnalysisPage(page);

    // Login before each test
    const password = process.env.PASSWORD;
    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    await loginPage.login(
      loginData.accessCode,
      loginData.username,
      password
    );
    await dashboardPage.verifyDashboardLoaded();
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


