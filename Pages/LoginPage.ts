import { Page, Locator, expect } from '@playwright/test';
import { Base } from './Base';

export class LoginPage extends Base {

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;


  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async login() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.usernameInput.fill(process.env.USER_NAME!);
    await this.passwordInput.fill(process.env.PASSWORD!);
    await this.loginButton.click();
  }

  async invalidLogin() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.usernameInput.fill(process.env.INVALID_USER!);
    await this.passwordInput.fill(process.env.INVALID_PASSWORD!);
    await this.loginButton.click();
  }

  async verifyLoginPageLoaded() {
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}
