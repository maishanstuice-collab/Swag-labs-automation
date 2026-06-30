import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  private readonly cartItem = '.cart_item';
  private readonly itemNameClass = '.inventory_item_name';
  private readonly itemDescClass = '.inventory_item_desc';
  private readonly itemPriceClass = '.inventory_item_price';
  private readonly checkoutBtn = '[data-test="checkout"]';
  private readonly continueShoppingBtn = '[data-test="continue-shopping"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Locates the cart item container of a specific product by name.
   */
  private getCartItemContainer(productName: string) {
    return this.page.locator(this.cartItem, { hasText: productName });
  }

  /**
   * Removes a specific item from the cart.
   */
  async removeItem(productName: string): Promise<void> {
    const container = this.getCartItemContainer(productName);
    const removeBtn = container.locator('button:has-text("Remove")');
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();
  }

  /**
   * Returns the count of unique items currently listed in the cart.
   */
  async getCartItemsCount(): Promise<number> {
    return await this.page.locator(this.cartItem).count();
  }

  /**
   * Checks if a product with the specified name is listed in the cart.
   */
  async hasItem(productName: string): Promise<boolean> {
    const container = this.getCartItemContainer(productName);
    return await container.isVisible();
  }

  /**
   * Clicks the "Continue Shopping" button to return to the catalog.
   */
  async clickContinueShopping(): Promise<void> {
    const btn = this.page.locator(this.continueShoppingBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Clicks the "Checkout" button to start the checkout process.
   */
  async clickCheckout(): Promise<void> {
    const btn = this.page.locator(this.checkoutBtn);
    await expect(btn).toBeVisible();
    await btn.click();
  }

  /**
   * Returns the name, description, and price of a cart item.
   */
  async getItemDetails(productName: string): Promise<{ name: string; desc: string; price: number }> {
    const container = this.getCartItemContainer(productName);
    const nameLoc = container.locator(this.itemNameClass);
    const descLoc = container.locator(this.itemDescClass);
    const priceLoc = container.locator(this.itemPriceClass);

    await expect(nameLoc).toBeVisible();
    await expect(descLoc).toBeVisible();
    await expect(priceLoc).toBeVisible();

    const name = (await nameLoc.textContent())?.trim() || '';
    const desc = (await descLoc.textContent())?.trim() || '';
    const priceText = (await priceLoc.textContent())?.trim() || '$0';
    const price = parseFloat(priceText.replace('$', '').trim());

    return { name, desc, price };
  }
}
