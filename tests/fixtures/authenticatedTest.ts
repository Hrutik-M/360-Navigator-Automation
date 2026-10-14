import { readFileSync } from 'node:fs'; // Read the saved login files.
import { join } from 'node:path'; // Build their file paths safely.
import { test as base, expect, Page } from '@playwright/test'; // Add a custom page fixture to Playwright.
import { DashboardPage } from '../../Pages/DashboardPage'; // Check that the dashboard is ready.

const authDirectory = join(process.cwd(), 'playwright', '.auth'); // Find the folder made by the login setup.
const dashboardUrlFile = join(authDirectory, 'dashboard-url.txt'); // Find the saved dashboard address.
const sessionStorageFile = join(authDirectory, 'session-storage.json'); // Find the saved session data.

type SavedSessionStorage = {
  origin: string; // Website that the saved session belongs to.
  entries: [string, string][]; // Saved session names and values.
};

type AuthenticatedFixtures = {
  authenticatedPage: Page; // Page provided to each case-study test.
};

export const test = base.extend<AuthenticatedFixtures>({ // Add our logged-in page to Playwright tests.
  authenticatedPage: async ({ page }, use) => { // Prepare the page before each test.
    // Load the saved dashboard address and session data.
    const dashboardUrl = readFileSync(dashboardUrlFile, 'utf8').trim(); // Get the dashboard address.
    const savedSessionStorage = JSON.parse(
      readFileSync(sessionStorageFile, 'utf8') // Read the saved session data.
    ) as SavedSessionStorage; // Load session data saved after login.

    // Put the saved session data in place before opening the dashboard.
    await page.addInitScript(({ origin, entries }) => { // Restore session data as the page opens.
      if (window.location.origin !== origin) { // Only use it on the matching website.
        return; // Skip session data on any other site.
      }

      for (const [key, value] of entries) { // Go through each saved session value.
        window.sessionStorage.setItem(key, value); // Put that value back into the browser.
      }
    }, savedSessionStorage); // Give the saved data to the page script.

    await page.goto(dashboardUrl); // Open the dashboard with the saved login.
    
    // Confirm the page finished opening before the test uses it.
    await new DashboardPage(page).verifyDashboardLoaded(); // Make sure the dashboard appeared.
    await use(page); // Give the ready page to the test.
  },
});

export { expect }; // Allow tests to import expect from this fixture.