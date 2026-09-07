
import { test } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage';
import { DashboardPage } from '../Pages/DashboardPage';
import { CaseStudyPage } from '../Pages/CaseStudyPage';
import loginData from '../test-data/loginData.json';      
import caseStudyData from '../test-data/caseStudyData.json';


test('Verify user can add a new Case Study successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const caseStudyPage = new CaseStudyPage(page);

  // Login
  await loginPage.openLoginPage();

  const password = process.env.PASSWORD;

  if (!password) {
    throw new Error('PASSWORD environment variable is not set');
  }

  await loginPage.login(
    loginData.accessCode,
    loginData.username,
    password
  );

  // Verify Dashboard
  await dashboardPage.verifyDashboardLoaded();

  // Add Case Study
  await caseStudyPage.addCaseStudy(
    caseStudyData.workOrderId,
    caseStudyData.estimatedMinutes,
    caseStudyData.description,
    caseStudyData.jobName,
    caseStudyData.quantity,
  );
});


test('Verify user can add multiple Case Studies successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const caseStudyPage = new CaseStudyPage(page);

  await loginPage.openLoginPage();

  const password = process.env.PASSWORD;

  if (!password) {
    throw new Error('PASSWORD environment variable is not set');
  }

  await loginPage.login(
    loginData.accessCode,
    loginData.username,
    password
  );

  for (const caseStudy of caseStudyData.multipleCaseStudies) {
    await caseStudyPage.addCaseStudy(
      caseStudy.workOrderId,
      caseStudy.estimatedMinutes,
      caseStudy.description,
      caseStudy.jobName,
      caseStudy.quantity
    );
  }
});


test('Verify duplicate work order ID cannot be created', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const caseStudyPage = new CaseStudyPage(page);

  await loginPage.openLoginPage();

  const password = process.env.PASSWORD;

  if (!password) {
    throw new Error('PASSWORD environment variable is not set');
  }

  await loginPage.login(
    loginData.accessCode,
    loginData.username,
    password
  );

  await caseStudyPage.navigateToScheduledEvents();
  await caseStudyPage.clickAddCaseStudy();
  await caseStudyPage.enterWorkOrderId(caseStudyData.workOrderId);
  await caseStudyPage.enterEstimatedMinutes(caseStudyData.estimatedMinutes);
  await caseStudyPage.enterDescription(caseStudyData.description);
  await caseStudyPage.selectJob(
    caseStudyData.jobName,
    caseStudyData.quantity
  );
  await caseStudyPage.clickSave();

  await caseStudyPage.verifyDuplicateCaseStudy();
});

