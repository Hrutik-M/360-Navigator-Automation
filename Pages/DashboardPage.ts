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
    await expect(this.welcomeHeading).toBeVisible();
  }
}

export { DashboardPage };