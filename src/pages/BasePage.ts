import { Page, expect } from '@playwright/test';

/**
 * BasePage is the superclass of all page objects.
 * It contains common actions and assertions that span across all pages.
 */
export class BasePage {
  protected page: Page;

  // Common locators
  private readonly burgerMenuButton = '#react-burger-menu-btn';
  private readonly closeMenuButton = '#react-burger-cross-btn';
  private readonly allItemsLink = '#inventory_sidebar_link';
  private readonly aboutLink = '#about_sidebar_link';
  private readonly logoutLink = '#logout_sidebar_link';
  private readonly resetStateLink = '#reset_sidebar_link';
  private readonly pageHeaderTitle = '.title';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specific URL path.
   */
  async navigateToPath(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Verifies the browser tab title matches the expected string.
   */
  async verifyPageTitle(expectedTitle: string = 'Swag Labs'): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Retrieves the header title text of the current page section.
   */
  async getHeaderTitle(): Promise<string> {
    const header = this.page.locator(this.pageHeaderTitle);
    await expect(header).toBeVisible();
    return (await header.textContent())?.trim() || '';
  }

  /**
   * Opens the sidebar menu.
   */
  async openSidebar(): Promise<void> {
    const btn = this.page.locator(this.burgerMenuButton);
    await expect(btn).toBeVisible();
    await btn.click();
    // Wait for sidebar content to be visible/transitioned
    await expect(this.page.locator(this.allItemsLink)).toBeVisible();
  }

  /**
   * Clves the sidebar menu.
   */
  async closeSidebar(): Promise<void> {
    const btn = this.page.locator(this.closeMenuButton);
    await expect(btn).toBeVisible();
    await btn.click();
    // Wait for the side menu to hide (closed state)
    await expect(this.page.locator(this.allItemsLink)).toBeHidden();
  }

  /**
   * Clicks a specific sidebar menu link by type.
   */
  async clickSidebarItem(itemName: 'All Items' | 'About' | 'Logout' | 'Reset App State'): Promise<void> {
    let locatorStr = '';
    switch (itemName) {
      case 'All Items':
        locatorStr = this.allItemsLink;
        break;
      case 'About':
        locatorStr = this.aboutLink;
        break;
      case 'Logout':
        locatorStr = this.logoutLink;
        break;
      case 'Reset App State':
        locatorStr = this.resetStateLink;
        break;
    }
    const item = this.page.locator(locatorStr);
    await expect(item).toBeVisible();
    await item.click();
  }
}
