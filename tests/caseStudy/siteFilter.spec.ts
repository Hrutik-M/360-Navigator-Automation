import { test, expect } from '../fixtures/authenticatedTest';
import { CaseStudyAnalysisPage } from '../../Pages/CaseStudyAnalysisPage';
import caseStudyAnalysisData from '../../test-data/caseStudyAnalysisData.json';

test.describe('Case Study Analysis - Site Filter', () => {
  let caseStudyAnalysisPage: CaseStudyAnalysisPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    caseStudyAnalysisPage = new CaseStudyAnalysisPage(authenticatedPage);
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
    await caseStudyAnalysisPage.selectSiteAndApplyFilter(caseStudyAnalysisData.sites[1]);

    await caseStudyAnalysisPage.verifyTableVisible();
    expect(await caseStudyAnalysisPage.getTableText()).toBeTruthy();
  });
  
});
