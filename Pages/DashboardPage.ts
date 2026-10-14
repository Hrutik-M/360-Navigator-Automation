import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

class DashboardPage extends BasePage {
  private welcomeHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.welcomeHeading = page.getByRole('heading', {
      name: /Welcome,/i
    });
  }

  async verifyDashboardLoaded(): Promise<void> {
    // Give the dashboard extra time to appear on a slow load.
    await expect(this.welcomeHeading).toBeVisible({ timeout: 15000 }); // Wait up to 15 seconds for the dashboard to appear.
  }
}

export { DashboardPage };