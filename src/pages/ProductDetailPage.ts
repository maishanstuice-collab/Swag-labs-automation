import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ProductDetailPage extends BasePage {
  private readonly productNameLabel = '.inventory_details_name';
  private readonly productDescLabel = '.inventory_details_desc';
  private readonly productPriceLabel = '.inventory_details_price';
  private readonly addToCartBtn = 'button:has-text("Add to cart")';
  private readonly removeBtn = 'button:has-text("Remove")';
  private readonly backToProductsBtn = '[data-test="back-to-products"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Retrieves the product name displayed on the details page.
   */
  async getProductName(): Promise<string> {
    const label = this.page.locator(this.productNameLabel);
    await expect(label).toBeVisible();
    return (await label.textContent())?.trim() || '';
  }

  /**
   * Retrieves the product description displayed on the details page.
   */
  async getProductDescription(): Promise<string> {
    const label = this.page.locator(this.productDescLabel);
    await expect(label).toBeVisible();
    return (await label.textContent())?.trim() || '';
  }

  /**
   * Retrieves the product price (as a number) displayed on the details page.
   */
  async getProductPrice(): Promise<number> {
    const label = this.page.locator(this.productPriceLabel);
    await expect(label).toBeVisible();
    const text = (await label.textContent())?.trim() || '$0';
    return parseFloat(text.replace('$', '').trim());
  }

  /**
   * Clicks the "Add to cart" button.
   */
  async addProductToCart(): Promise<void> {
    const btn = this.page.locator(this.addToCartBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Clicks the "Remove" button.
   */
  async removeProductFromCart(): Promise<void> {
    const btn = this.page.locator(this.removeBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Clicks the "Back to products" button to return to the catalog.
   */
  async clickBackToProducts(): Promise<void> {
    const btn = this.page.locator(this.backToProductsBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }
}
