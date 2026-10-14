import { mkdirSync, writeFileSync } from 'node:fs'; // Create the auth folder and save text files.
import { dirname, join } from 'node:path'; // Build file paths safely.
import { test as setup } from '@playwright/test'; // Create the one-time login test.
import { DashboardPage } from '../../Pages/DashboardPage'; // Check that the dashboard opened.
import { LoginPage } from '../../Pages/LoginPage'; // Reuse the existing login steps.
import loginData from '../../test-data/loginData.json'; // Load the access code and username.

const authFile = join(process.cwd(), 'playwright', '.auth', 'user.json'); // Save cookies and local storage.
const dashboardUrlFile = join(process.cwd(), 'playwright', '.auth', 'dashboard-url.txt'); // Save the dashboard address.
const sessionStorageFile = join(process.cwd(), 'playwright', '.auth', 'session-storage.json'); // Save session-only login data.

setup('authenticate once for the test run', async ({ page }) => { // Sign in before the browser tests run.
  const password = process.env.PASSWORD; // Read the password from the environment.
  if (!password) { // Check that the password was provided.
    throw new Error('PASSWORD environment variable is not set'); // Stop if the password is missing.
  }

  const loginPage = new LoginPage(page); // Prepare the login page helper.
  const dashboardPage = new DashboardPage(page); // Prepare the dashboard check.

  await loginPage.openLoginPage(); // Open the login screen.
  await loginPage.login(loginData.accessCode, loginData.username, password); // Sign in once.
  await dashboardPage.verifyDashboardLoaded(); // Check that sign-in reached the dashboard.

  // Save the login details so test cases can reuse this sign-in.
  mkdirSync(dirname(authFile), { recursive: true }); // Create the auth folder if needed.
  await page.context().storageState({ path: authFile }); // Save cookies and local storage for reuse.

  // Save session data and the dashboard address for the test pages.
  const sessionStorage = await page.evaluate(() => ({ // Read session data from the signed-in page.
    origin: window.location.origin, // Remember which site owns this session.
    entries: Object.entries(window.sessionStorage), // Copy saved session values.
  })); // Finish collecting the session data.
  writeFileSync(dashboardUrlFile, page.url(), 'utf8'); // Save the dashboard address for tests.
  writeFileSync(sessionStorageFile, JSON.stringify(sessionStorage), 'utf8'); // Save session data as JSON.
});