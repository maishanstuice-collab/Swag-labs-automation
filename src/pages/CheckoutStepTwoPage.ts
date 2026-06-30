import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CheckoutStepTwoPage extends BasePage {
  private readonly subtotalLabel = '.summary_subtotal_label';
  private readonly taxLabel = '.summary_tax_label';
  private readonly totalLabel = '.summary_total_label';
  private readonly summaryValue = '.summary_value_label';
  private readonly finishBtn = '[data-test="finish"]';
  private readonly cancelBtn = '[data-test="cancel"]';
  private readonly cartItem = '.cart_item';
  private readonly itemPriceClass = '.inventory_item_price';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves the numeric subtotal value displayed.
   */
  async getSubtotalValue(): Promise<number> {
    const loc = this.page.locator(this.subtotalLabel);
    await expect(loc).toBeVisible();
    const text = await loc.textContent();
    // Format: "Item total: $29.99" -> 29.99
    return text ? parseFloat(text.replace(/Item total:\s*\$/i, '').trim()) : 0;
  }

  /**
   * Retrieves the numeric tax value displayed.
   */
  async getTaxValue(): Promise<number> {
    const loc = this.page.locator(this.taxLabel);
    await expect(loc).toBeVisible();
    const text = await loc.textContent();
    // Format: "Tax: $2.40" -> 2.40
    return text ? parseFloat(text.replace(/Tax:\s*\$/i, '').trim()) : 0;
  }

  /**
   * Retrieves the numeric final total value displayed.
   */
  async getTotalValue(): Promise<number> {
    const loc = this.page.locator(this.totalLabel);
    await expect(loc).toBeVisible();
    const text = await loc.textContent();
    // Format: "Total: $32.39" -> 32.39
    return text ? parseFloat(text.replace(/Total:\s*\$/i, '').trim()) : 0;
  }

  /**
   * Retrieves the payment info text.
   */
  async getPaymentInfo(): Promise<string> {
    const locators = this.page.locator(this.summaryValue);
    await expect(locators.first()).toBeVisible();
    const contents = await locators.allTextContents();
    return contents[0] ? contents[0].trim() : '';
  }

  /**
   * Retrieves the shipping info text.
   */
  async getShippingInfo(): Promise<string> {
    const locators = this.page.locator(this.summaryValue);
    await expect(locators.first()).toBeVisible();
    const contents = await locators.allTextContents();
    return contents[1] ? contents[1].trim() : '';
  }

  /**
   * Clicks the "Finish" button to finalize the order.
   */
  async clickFinish(): Promise<void> {
    const btn = this.page.locator(this.finishBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Clicks the "Cancel" button to return to the catalog page.
   */
  async clickCancel(): Promise<void> {
    const btn = this.page.locator(this.cancelBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Retrieves the count of items listed on Step Two.
   */
  async getItemsCount(): Promise<number> {
    return await this.page.locator(this.cartItem).count();
  }

  /**
   * Retrieves the prices of the items listed in Step Two.
   */
  async getItemPrices(): Promise<number[]> {
    const prices = this.page.locator(this.cartItem).locator(this.itemPriceClass);
    const contents = await prices.allTextContents();
    return contents.map(val => parseFloat(val.replace('$', '').trim()));
  }
}
