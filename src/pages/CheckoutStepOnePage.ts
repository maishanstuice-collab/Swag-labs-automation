import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CheckoutStepOnePage extends BasePage {
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueBtn = '[data-test="continue"]';
  private readonly cancelBtn = '[data-test="cancel"]';
  private readonly errorLabel = '[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Fills the checkout information fields.
   * Clears fields first if empty values are supplied.
   */
  async fillInformation(firstName?: string, lastName?: string, postalCode?: string): Promise<void> {
    const fName = this.page.locator(this.firstNameInput);
    const lName = this.page.locator(this.lastNameInput);
    const zip = this.page.locator(this.postalCodeInput);

    await expect(fName).toBeVisible();
    await expect(lName).toBeVisible();
    await expect(zip).toBeVisible();

    if (firstName !== undefined) {
      await fName.fill(firstName);
    } else {
      await fName.clear();
    }

    if (lastName !== undefined) {
      await lName.fill(lastName);
    } else {
      await lName.clear();
    }

    if (postalCode !== undefined) {
      await zip.fill(postalCode);
    } else {
      await zip.clear();
    }
  }

  /**
   * Clicks the "Continue" button to move to Step Two.
   */
  async clickContinue(): Promise<void> {
    const btn = this.page.locator(this.continueBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Clicks the "Cancel" button to return to the Cart page.
   */
  async clickCancel(): Promise<void> {
    const btn = this.page.locator(this.cancelBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Retrieves the form validation error message.
   */
  async getErrorMessage(): Promise<string> {
    const label = this.page.locator(this.errorLabel);
    await expect(label).toBeVisible();
    return (await label.textContent())?.trim() || '';
  }
}
