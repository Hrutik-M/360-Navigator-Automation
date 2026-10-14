import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import dotenv from 'dotenv';
import { DashboardPage } from '../../Pages/DashboardPage';
import loginData from '../../test-data/loginData.json';

type AuthenticatedFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthenticatedFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const password = process.env.PASSWORD;
    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(loginData.accessCode, loginData.username, password);
    await dashboardPage.verifyDashboardLoaded();
    await use(page);
  },
});

export { expect };