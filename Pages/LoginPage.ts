
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

class LoginPage extends BasePage {
  // Login Page Locators
  private accessCodeInput: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  // Already Logged In Popup
  private alreadyLoggedInPopup: Locator;
  private yesContinueButton: Locator;

  // Select Site
  private selectSiteButton: Locator;

  // Error Message
  private errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Login Page Locators
    this.accessCodeInput = page.getByRole('textbox', {
      name: 'Access Code'
    });

    this.usernameInput = page.getByRole('textbox', {
      name: 'Username'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.loginButton = page.getByRole('button', {
      name: 'Login'
    });

    // Already Logged In Popup
    this.alreadyLoggedInPopup = page.getByRole('dialog', {
      name: 'Already logged in!'
    });

    this.yesContinueButton = page.getByRole('button', {
      name: /Yes, continue/i
    });

    // Select Site
    this.selectSiteButton = page.getByRole('button', {
      name: /Go to Site/i
    });

    // Error Message
    this.errorMessage = page.locator('#swal2-html-container');
  }

  async openLoginPage(): Promise<void> {
    await this.navigate('/#/login');
  }

  async verifyLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login\/#\/login$/);
    await expect(this.page).toHaveTitle(/360 Performance Navigator/i);
  }

  async enterAccessCode(accessCode: string): Promise<void> {
    await this.fill(this.accessCodeInput, accessCode);
  }

  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  async handlePostLoginFlow(): Promise<void> {
    // try {
    //   await this.alreadyLoggedInPopup.waitFor({
    //     state: 'visible',
    //     timeout: 7000
    //   });

    //   await this.click(this.yesContinueButton);

    //   await this.alreadyLoggedInPopup.waitFor({
    //     state: 'hidden'
    //   });

    // } catch (error) {
    //   // No existing-session popup → continue with normal login
    // }

    //Select Site will be required later
    await this.click(this.selectSiteButton);
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.textContent() || '';
  }

  async verifyErrorMessageContains(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedText);
  }

  async login(
    accessCode: string,
    username: string,
    password: string
  ): Promise<void> {
    await this.enterAccessCode(accessCode);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();

    await this.handlePostLoginFlow();
  }
}

export { LoginPage };

