import { test } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage';
import { DashboardPage } from '../Pages/DashboardPage';
import dotenv from 'dotenv';
import loginData from '../test-data/loginData.json';

dotenv.config();

test('Login page should have the correct URL and title', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.verifyLoginPage();
});

test('Valid Login - User should login successfully with correct credentials', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Open login page
  await loginPage.openLoginPage();

  // Perform login
  const password = process.env.PASSWORD;

  if (!password) {
    throw new Error('PASSWORD environment variable is not set');
  }

  await loginPage.login(
    loginData.accessCode,
    loginData.username,
    password
  );

  // Verify successful login
  await dashboardPage.verifyDashboardLoaded();
});