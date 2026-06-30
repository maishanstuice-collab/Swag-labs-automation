import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';

test.describe('Sauce Demo (Swag Labs) E2E POM Test Suite', () => {

  // 1. Authentication (Login) Tests
  test.describe('Authentication Flow', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.navigate();
    });

    test('TC-LOGIN-01: Successful Login', async ({ page }) => {
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(page).toHaveURL(/\/inventory.html/);
    });

    test('TC-LOGIN-02: Invalid Username', async () => {
      await loginPage.login('invalid_user', 'secret_sauce');
      const error = await loginPage.getErrorMessage();
      expect(error).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-LOGIN-03: Invalid Password', async () => {
      await loginPage.login('standard_user', 'wrong_password');
      const error = await loginPage.getErrorMessage();
      expect(error).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-LOGIN-04: Empty Username', async () => {
      await loginPage.login('', 'secret_sauce');
      const error = await loginPage.getErrorMessage();
      expect(error).toBe('Epic sadface: Username is required');
    });

    test('TC-LOGIN-05: Empty Password', async () => {
      await loginPage.login('standard_user', '');
      const error = await loginPage.getErrorMessage();
      expect(error).toBe('Epic sadface: Password is required');
    });

    test('TC-LOGIN-06: Empty Form', async () => {
      await loginPage.login('', '');
      const error = await loginPage.getErrorMessage();
      expect(error).toBe('Epic sadface: Username is required');
    });

    test('TC-LOGIN-07: Locked Out User', async () => {
      await loginPage.login('locked_out_user', 'secret_sauce');
      const error = await loginPage.getErrorMessage();
      expect(error).toBe('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC-LOGIN-08: Input Field Types', async () => {
      const userType = await loginPage.getInputType('username');
      const passType = await loginPage.getInputType('password');
      expect(userType).toBe('text');
      expect(passType).toBe('password');
    });

    test('TC-LOGIN-09: Dismiss Error Message', async () => {
      await loginPage.login('invalid_user', 'invalid_pass');
      expect(await loginPage.isErrorVisible()).toBe(true);
      await loginPage.closeErrorMessage();
      expect(await loginPage.isErrorVisible()).toBe(false);
    });
  });

  // 2. Page Title & Headers Validation
  test.describe('Page Title & Headers', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let stepOnePage: CheckoutStepOnePage;
    let stepTwoPage: CheckoutStepTwoPage;
    let completePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      stepOnePage = new CheckoutStepOnePage(page);
      stepTwoPage = new CheckoutStepTwoPage(page);
      completePage = new CheckoutCompletePage(page);
      
      await loginPage.navigate();
    });

    test('TC-TITLE-01 to 06: Browser Tab Titles across all screens', async ({ page }) => {
      // Login Page Title
      await loginPage.verifyPageTitle('Swag Labs');

      // Login to reach Inventory
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.verifyPageTitle('Swag Labs');

      // Add an item and go to Cart
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.goToCart();
      await cartPage.verifyPageTitle('Swag Labs');

      // Go to Checkout Step One
      await cartPage.clickCheckout();
      await stepOnePage.verifyPageTitle('Swag Labs');

      // Fill info and go to Checkout Step Two
      await stepOnePage.fillInformation('John', 'Doe', '12345');
      await stepOnePage.clickContinue();
      await stepTwoPage.verifyPageTitle('Swag Labs');

      // Finish order and go to Complete
      await stepTwoPage.clickFinish();
      await completePage.verifyPageTitle('Swag Labs');
    });

    test('TC-HEADER-01 to 05: Section Headers Verification', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
      expect(await inventoryPage.getHeaderTitle()).toBe('Products');

      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.goToCart();
      expect(await cartPage.getHeaderTitle()).toBe('Your Cart');

      await cartPage.clickCheckout();
      expect(await stepOnePage.getHeaderTitle()).toBe('Checkout: Your Information');

      await stepOnePage.fillInformation('John', 'Doe', '12345');
      await stepOnePage.clickContinue();
      expect(await stepTwoPage.getHeaderTitle()).toBe('Checkout: Overview');

      await stepTwoPage.clickFinish();
      expect(await completePage.getHeaderTitle()).toBe('Checkout: Complete!');
    });
  });

  // 3. Side Menu Navigation & State
  test.describe('Side Menu Navigation & State', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test('TC-NAV-01 & TC-NAV-02: Side Menu Open & All Items Navigation', async () => {
      await inventoryPage.openSidebar();
      await inventoryPage.clickSidebarItem('All Items');
      await inventoryPage.closeSidebar();
    });

    test('TC-NAV-03: Navigate - About', async ({ page }) => {
      await inventoryPage.openSidebar();
      await inventoryPage.clickSidebarItem('About');
      await expect(page).toHaveURL(/saucelabs\.com/);
    });

    test('TC-NAV-04 & TC-NAV-06: Reset App State clears cart badge', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      expect(await inventoryPage.getCartBadgeCount()).toBe(1);

      await inventoryPage.openSidebar();
      await inventoryPage.clickSidebarItem('Reset App State');
      // Badge should be cleared
      expect(await inventoryPage.getCartBadgeCount()).toBe(0);
      await inventoryPage.closeSidebar();
    });

    test('TC-NAV-05: Logout clears session', async ({ page }) => {
      await inventoryPage.openSidebar();
      await inventoryPage.clickSidebarItem('Logout');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  // 4. Product Catalog Sorting & PDP Tests
  test.describe('Product Catalog Sorting & PDP', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let pdp: ProductDetailPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      pdp = new ProductDetailPage(page);
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test('TC-CAT-01: Sort Name A to Z', async () => {
      await inventoryPage.sortProducts('az');
      const names = await inventoryPage.getProductNames();
      const sortedNames = [...names].sort();
      expect(names).toEqual(sortedNames);
    });

    test('TC-CAT-02: Sort Name Z to A', async () => {
      await inventoryPage.sortProducts('za');
      const names = await inventoryPage.getProductNames();
      const sortedNames = [...names].sort().reverse();
      expect(names).toEqual(sortedNames);
    });

    test('TC-CAT-03: Sort Price Low to High', async () => {
      await inventoryPage.sortProducts('lohi');
      const prices = await inventoryPage.getProductPrices();
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });

    test('TC-CAT-04: Sort Price High to Low', async () => {
      await inventoryPage.sortProducts('hilo');
      const prices = await inventoryPage.getProductPrices();
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    });

    test('TC-PDP-01 & TC-PDP-02: PDP Detail Verification', async ({ page }) => {
      const catalogNames = await inventoryPage.getProductNames();
      const catalogPrices = await inventoryPage.getProductPrices();

      const targetName = catalogNames[0];
      const targetPrice = catalogPrices[0];

      await inventoryPage.clickProductLink(targetName);
      await expect(page).toHaveURL(/\/inventory-item\.html/);

      expect(await pdp.getProductName()).toBe(targetName);
      expect(await pdp.getProductPrice()).toBe(targetPrice);
      expect(await pdp.getProductDescription()).not.toBe('');
    });

    test('TC-PDP-03 & TC-PDP-04: Add and Remove on PDP updates badge', async () => {
      await inventoryPage.clickProductLink('Sauce Labs Backpack');
      expect(await inventoryPage.getCartBadgeCount()).toBe(0);

      await pdp.addProductToCart();
      expect(await inventoryPage.getCartBadgeCount()).toBe(1);

      await pdp.removeProductFromCart();
      expect(await inventoryPage.getCartBadgeCount()).toBe(0);
    });

    test('TC-PDP-05: Back to Products from PDP', async ({ page }) => {
      await inventoryPage.clickProductLink('Sauce Labs Backpack');
      await pdp.clickBackToProducts();
      await expect(page).toHaveURL(/\/inventory\.html/);
    });
  });

  // 5. Add-to-Cart Dynamics & Scrolling Tests
  test.describe('Add-to-Cart Dynamics & Scrolling', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test('TC-CART-01: Scroll and Add Bottom Item', async () => {
      const bottomProduct = 'Test.allTheThings() T-Shirt (Red)';
      await inventoryPage.scrollToProduct(bottomProduct);
      await inventoryPage.addProductToCart(bottomProduct);
      expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    });

    test('TC-CART-02: Add, Continue Shopping, Add', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.goToCart();

      expect(await cartPage.hasItem('Sauce Labs Backpack')).toBe(true);
      await cartPage.clickContinueShopping();

      await inventoryPage.addProductToCart('Sauce Labs Bike Light');
      await inventoryPage.goToCart();

      expect(await cartPage.hasItem('Sauce Labs Backpack')).toBe(true);
      expect(await cartPage.hasItem('Sauce Labs Bike Light')).toBe(true);
      expect(await cartPage.getCartItemsCount()).toBe(2);
    });

    test('TC-CART-03: Remove from Inventory Page', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      expect(await inventoryPage.getCartBadgeCount()).toBe(1);

      await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
      expect(await inventoryPage.getCartBadgeCount()).toBe(0);
    });
  });

  // 6. Cart Page Actions & Bulk Operations
  test.describe('Cart Page Actions & Bulk Operations', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
    });

    test('TC-CART-04: Cart Item Details Verification', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.goToCart();

      const details = await cartPage.getItemDetails('Sauce Labs Backpack');
      expect(details.name).toBe('Sauce Labs Backpack');
      expect(details.price).toBe(29.99);
      expect(details.desc).not.toBe('');
    });

    test('TC-CART-05: Continue Shopping Button navigation', async ({ page }) => {
      await inventoryPage.goToCart();
      await cartPage.clickContinueShopping();
      await expect(page).toHaveURL(/\/inventory\.html/);
    });

    test('TC-CART-06: Remove Item from Cart Page', async () => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.goToCart();
      expect(await cartPage.getCartItemsCount()).toBe(1);

      await cartPage.removeItem('Sauce Labs Backpack');
      expect(await cartPage.getCartItemsCount()).toBe(0);
    });

    test('TC-CART-07: Bulk Cart Management (Selective removal from 6 items)', async () => {
      const items = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
      ];

      for (const item of items) {
        await inventoryPage.addProductToCart(item);
      }
      expect(await inventoryPage.getCartBadgeCount()).toBe(6);

      await inventoryPage.goToCart();
      expect(await cartPage.getCartItemsCount()).toBe(6);

      // Remove 1 item
      await cartPage.removeItem('Sauce Labs Backpack');
      expect(await cartPage.getCartItemsCount()).toBe(5);

      // Verify other items are still there
      expect(await cartPage.hasItem('Sauce Labs Backpack')).toBe(false);
      expect(await cartPage.hasItem('Sauce Labs Onesie')).toBe(true);
      expect(await cartPage.hasItem('Sauce Labs Fleece Jacket')).toBe(true);
    });

    test('TC-CART-08: Checkout Button navigation', async ({ page }) => {
      await inventoryPage.goToCart();
      await cartPage.clickCheckout();
      await expect(page).toHaveURL(/\/checkout-step-one\.html/);
    });
  });

  // 7. Checkout Step One Validation & Cancelation
  test.describe('Checkout Step One Validation & Cancelation', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let stepOnePage: CheckoutStepOnePage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      stepOnePage = new CheckoutStepOnePage(page);

      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.goToCart();
      await cartPage.clickCheckout();
    });

    test('TC-CH1-01: Empty Fields Click error message', async () => {
      await stepOnePage.clickContinue();
      const err = await stepOnePage.getErrorMessage();
      expect(err).toBe('Error: First Name is required');
    });

    test('TC-CH1-02: Missing Last Name error message', async () => {
      await stepOnePage.fillInformation('John', '', '');
      await stepOnePage.clickContinue();
      const err = await stepOnePage.getErrorMessage();
      expect(err).toBe('Error: Last Name is required');
    });

    test('TC-CH1-03: Missing Postal Code error message', async () => {
      await stepOnePage.fillInformation('John', 'Doe', '');
      await stepOnePage.clickContinue();
      const err = await stepOnePage.getErrorMessage();
      expect(err).toBe('Error: Postal Code is required');
    });

    test('TC-CH1-04: Cancel Step One returns to cart and preserves items', async ({ page }) => {
      await stepOnePage.clickCancel();
      await expect(page).toHaveURL(/\/cart\.html/);
      expect(await cartPage.getCartItemsCount()).toBe(1);
    });

    test('TC-CH1-05: Complete Step One Form successfully', async ({ page }) => {
      await stepOnePage.fillInformation('John', 'Doe', '12345');
      await stepOnePage.clickContinue();
      await expect(page).toHaveURL(/\/checkout-step-two\.html/);
    });
  });

  // 8. Checkout Step Two Logic & Calculations
  test.describe('Checkout Step Two Logic & Calculations', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let stepOnePage: CheckoutStepOnePage;
    let stepTwoPage: CheckoutStepTwoPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      stepOnePage = new CheckoutStepOnePage(page);
      stepTwoPage = new CheckoutStepTwoPage(page);

      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      
      // Add two items
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.addProductToCart('Sauce Labs Bike Light');
      
      await inventoryPage.goToCart();
      await cartPage.clickCheckout();
      await stepOnePage.fillInformation('John', 'Doe', '12345');
      await stepOnePage.clickContinue();
    });

    test('TC-CH2-01: Verify Step Two Items details', async () => {
      expect(await stepTwoPage.getItemsCount()).toBe(2);
    });

    test('TC-CH2-02: Payment & Shipping Info displays correctly', async () => {
      const paymentInfo = await stepTwoPage.getPaymentInfo();
      const shippingInfo = await stepTwoPage.getShippingInfo();
      
      expect(paymentInfo).toBe('SauceCard #31337');
      expect(shippingInfo).toBe('Free Pony Express Delivery!');
    });

    test('TC-CH2-03: Subtotal Calculation matches sum of prices', async () => {
      const prices = await stepTwoPage.getItemPrices();
      const sum = prices.reduce((acc, curr) => acc + curr, 0); // 29.99 + 9.99 = 39.98
      
      const displayedSubtotal = await stepTwoPage.getSubtotalValue();
      expect(displayedSubtotal).toBeCloseTo(sum, 2);
    });

    test('TC-CH2-04: Tax Calculation matches 8% of subtotal', async () => {
      const subtotal = await stepTwoPage.getSubtotalValue();
      const expectedTax = parseFloat((subtotal * 0.08).toFixed(2)); // 39.98 * 0.08 = 3.1984 -> 3.20

      const displayedTax = await stepTwoPage.getTaxValue();
      expect(displayedTax).toBeCloseTo(expectedTax, 2);
    });

    test('TC-CH2-05: Total Calculation equals subtotal + tax', async () => {
      const subtotal = await stepTwoPage.getSubtotalValue();
      const tax = await stepTwoPage.getTaxValue();
      const expectedTotal = subtotal + tax; // 39.98 + 3.20 = 43.18

      const displayedTotal = await stepTwoPage.getTotalValue();
      expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
    });

    test('TC-CH2-06: Cancel Step Two returns to inventory and preserves cart items', async ({ page }) => {
      await stepTwoPage.clickCancel();
      await expect(page).toHaveURL(/\/inventory\.html/);
      // Cart badge should still show 2 items
      expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    });

    test('TC-CH2-07: Finish Step Two navigates to completion screen', async ({ page }) => {
      await stepTwoPage.clickFinish();
      await expect(page).toHaveURL(/\/checkout-complete\.html/);
    });
  });

  // 9. Checkout Complete Page Validation
  test.describe('Checkout Complete Page Validation', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let stepOnePage: CheckoutStepOnePage;
    let stepTwoPage: CheckoutStepTwoPage;
    let completePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);
      stepOnePage = new CheckoutStepOnePage(page);
      stepTwoPage = new CheckoutStepTwoPage(page);
      completePage = new CheckoutCompletePage(page);

      await loginPage.navigate();
      await loginPage.login('standard_user', 'secret_sauce');
      
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.goToCart();
      await cartPage.clickCheckout();
      await stepOnePage.fillInformation('John', 'Doe', '12345');
      await stepOnePage.clickContinue();
      await stepTwoPage.clickFinish();
    });

    test('TC-COMP-01: Verify Completion Header string', async () => {
      const header = await completePage.getCompleteHeaderText();
      expect(header).toBe('Thank you for your order!');
    });

    test('TC-COMP-02: Verify Completion Description string', async () => {
      const text = await completePage.getCompleteText();
      expect(text).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    test('TC-COMP-03: Verify Delivery Success Image visibility', async () => {
      expect(await completePage.isSuccessImageVisible()).toBe(true);
    });

    test('TC-COMP-04 & TC-COMP-05: Back Home Navigation clears cart badge', async ({ page }) => {
      await completePage.clickBackHome();
      await expect(page).toHaveURL(/\/inventory\.html/);
      // Cart should be empty after check out is finished and we navigate home
      expect(await inventoryPage.getCartBadgeCount()).toBe(0);
    });
  });
});
