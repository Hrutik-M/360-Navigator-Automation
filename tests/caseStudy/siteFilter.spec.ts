import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { DashboardPage } from '../../Pages/DashboardPage';
import { CaseStudyAnalysisPage } from '../../Pages/CaseStudyAnalysisPage';
import dotenv from 'dotenv';
import loginData from '../../test-data/loginData.json';
import caseStudyAnalysisData from '../../test-data/caseStudyAnalysisData.json';

dotenv.config();

test.describe('Case Study Analysis - Site Filter', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let caseStudyAnalysisPage: CaseStudyAnalysisPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    caseStudyAnalysisPage = new CaseStudyAnalysisPage(page);

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
    await caseStudyAnalysisPage.navigateToCaseStudyAnalysis();
  });

  test('TC-006: Verify Site dropdown shows available sites', async () => {
    await caseStudyAnalysisPage.verifySiteOptions(caseStudyAnalysisData.sites);
  });

  test('TC-007: Verify selecting a different site updates the data', async () => {
    const initialTableText = await caseStudyAnalysisPage.getTableText();

    await caseStudyAnalysisPage.selectSite(caseStudyAnalysisData.sites[1]);
    await caseStudyAnalysisPage.applyFilter();
    await caseStudyAnalysisPage.verifySiteSelected(caseStudyAnalysisData.sites[1]);

    const filteredTableText = await caseStudyAnalysisPage.getTableText();
    expect(filteredTableText).not.toBe(initialTableText);
  });

  test('TC-008: Verify Apply Filter button is present and clickable', async () => {
    await caseStudyAnalysisPage.verifyApplyFilterEnabled();
  });

  test('TC-009: Verify clicking Apply Filter refreshes the table', async () => {
    await caseStudyAnalysisPage.selectSite(caseStudyAnalysisData.sites[0]);
    await caseStudyAnalysisPage.applyFilter();

    await caseStudyAnalysisPage.verifyTableVisible();
    expect(await caseStudyAnalysisPage.getTableText()).toBeTruthy();
  });

  test('TC-010: Verify selected site is retained after page refresh', async ({ page }) => {
    await caseStudyAnalysisPage.selectSite(caseStudyAnalysisData.sites[0]);
    await caseStudyAnalysisPage.applyFilter();
    await page.reload();
    await caseStudyAnalysisPage.verifySiteSelected(caseStudyAnalysisData.sites[0]);
  });
});
