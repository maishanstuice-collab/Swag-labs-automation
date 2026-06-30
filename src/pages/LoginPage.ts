import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly closeErrorButton = '[data-test="error-button"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the login page.
   */
  async navigate(): Promise<void> {
    await this.navigateToPath('/');
  }

  /**
   * Attempts to log in with the provided credentials.
   */
  async login(username?: string, password?: string): Promise<void> {
    const userField = this.page.locator(this.usernameInput);
    const passField = this.page.locator(this.passwordInput);
    const loginBtn = this.page.locator(this.loginButton);

    await expect(userField).toBeVisible();
    await expect(passField).toBeVisible();
    await expect(loginBtn).toBeVisible();

    if (username !== undefined) {
      await userField.fill(username);
    } else {
      await userField.clear();
    }

    if (password !== undefined) {
      await passField.fill(password);
    } else {
      await passField.clear();
    }

    await loginBtn.click();
  }

  /**
   * Returns the error message text displayed on login failure.
   */
  async getErrorMessage(): Promise<string> {
    const errorLoc = this.page.locator(this.errorMessage);
    await expect(errorLoc).toBeVisible();
    return (await errorLoc.textContent())?.trim() || '';
  }

  /**
   * Checks if the error message is visible.
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.page.locator(this.errorMessage).isVisible();
  }

  /**
   * Closes the error message banner.
   */
  async closeErrorMessage(): Promise<void> {
    const closeBtn = this.page.locator(this.closeErrorButton);
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
  }

  /**
   * Retrieves the HTML input type of the specified field.
   */
  async getInputType(field: 'username' | 'password'): Promise<string> {
    const selector = field === 'username' ? this.usernameInput : this.passwordInput;
    const input = this.page.locator(selector);
    await expect(input).toBeAttached();
    return (await input.getAttribute('type')) || '';
  }
}
