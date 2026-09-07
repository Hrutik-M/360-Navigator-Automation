
import { Page, Locator } from '@playwright/test';

class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async waitForVisible(
        locator: Locator,
        timeout: number = 20000
    ): Promise<void> {
        await locator.waitFor({
            state: 'visible',
            timeout
        });
    }
    // Get page title
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Reload page
  async reload(): Promise<void> {
    await this.page.reload();
  }

  // Go back
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  // Go forward
  async goForward(): Promise<void> {
    await this.page.goForward();
  }
}

export { BasePage };

