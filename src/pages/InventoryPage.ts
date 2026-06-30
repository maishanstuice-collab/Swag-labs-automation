import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  private readonly sortDropdown = '[data-test="product-sort-container"]';
  private readonly cartLink = '.shopping_cart_link';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly inventoryItem = '.inventory_item';
  private readonly itemNameClass = '.inventory_item_name';
  private readonly itemPriceClass = '.inventory_item_price';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Locates the inventory container of a specific product by name.
   */
  private getProductContainer(productName: string) {
    return this.page.locator(this.inventoryItem, { hasText: productName });
  }

  /**
   * Adds a product to the cart by clicking its "Add to cart" button.
   */
  async addProductToCart(productName: string): Promise<void> {
    const container = this.getProductContainer(productName);
    const addBtn = container.locator('button:has-text("Add to cart")');
    await expect(addBtn).toBeVisible();
    await addBtn.click();
  }

  /**
   * Removes a product from the cart from the inventory page.
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const container = this.getProductContainer(productName);
    const removeBtn = container.locator('button:has-text("Remove")');
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();
  }

  /**
   * Scrolls the page until the target product container is in view.
   */
  async scrollToProduct(productName: string): Promise<void> {
    const container = this.getProductContainer(productName);
    await container.scrollIntoViewIfNeeded();
  }

  /**
   * Clicks the name link of a product to navigate to its details page (PDP).
   */
  async clickProductLink(productName: string): Promise<void> {
    const container = this.getProductContainer(productName);
    const link = container.locator(this.itemNameClass);
    await expect(link).toBeVisible();
    await link.click();
  }

  /**
   * Retrieves the current cart badge item count. Returns 0 if badge is not visible.
   */
  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator(this.cartBadge);
    const isVisible = await badge.isVisible();
    if (!isVisible) {
      return 0;
    }
    const text = await badge.textContent();
    return text ? parseInt(text.trim(), 10) : 0;
  }

  /**
   * Navigates to the shopping cart page.
   */
  async goToCart(): Promise<void> {
    const cart = this.page.locator(this.cartLink);
    await expect(cart).toBeVisible();
    await cart.click();
  }

  /**
   * Sorts the product catalog by the chosen option value.
   * Options: 'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    const dropdown = this.page.locator(this.sortDropdown);
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption(option);
  }

  /**
   * Returns a list of all product names visible on the inventory page.
   */
  async getProductNames(): Promise<string[]> {
    const names = this.page.locator(this.itemNameClass);
    await expect(names.first()).toBeVisible();
    return await names.allTextContents();
  }

  /**
   * Returns a list of all product prices (as numbers) visible on the inventory page.
   */
  async getProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator(this.itemPriceClass);
    await expect(priceLocators.first()).toBeVisible();
    const contents = await priceLocators.allTextContents();
    return contents.map(val => parseFloat(val.replace('$', '').trim()));
  }
}
