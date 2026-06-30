import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CheckoutCompletePage extends BasePage {
  private readonly completeHeader = '[data-test="complete-header"]';
  private readonly completeText = '[data-test="complete-text"]';
  private readonly ponyExpressImage = '.pony_express';
  private readonly backHomeBtn = '[data-test="back-to-products"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves the purchase completion header text.
   */
  async getCompleteHeaderText(): Promise<string> {
    const loc = this.page.locator(this.completeHeader);
    await expect(loc).toBeVisible();
    return (await loc.textContent())?.trim() || '';
  }

  /**
   * Retrieves the purchase completion description text.
   */
  async getCompleteText(): Promise<string> {
    const loc = this.page.locator(this.completeText);
    await expect(loc).toBeVisible();
    return (await loc.textContent())?.trim() || '';
  }

  /**
   * Verifies if the success Pony Express image is visible.
   */
  async isSuccessImageVisible(): Promise<boolean> {
    const img = this.page.locator(this.ponyExpressImage);
    return await img.isVisible();
  }

  /**
   * Clicks the "Back Home" button to return to the catalog page.
   */
  async clickBackHome(): Promise<void> {
    const btn = this.page.locator(this.backHomeBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }
}
