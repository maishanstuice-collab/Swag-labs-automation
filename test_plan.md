# Test Plan: Sauce Demo (Swag Labs) E2E Automation (Fully Decomposed)

This document outlines the fully granular, decomposed test automation plan for **Sauce Demo** (`https://www.saucedemo.com/`) using **Playwright + TypeScript** following the **Page Object Model (POM)** design pattern.

---

## 1. Scope of Testing

We will automate the following core user flows on Sauce Demo:
1. **Authentication Flow & Form Validation** (Including locked out users, empty forms, error message dismissals, and field types).
2. **Page Title and Header Verification** (Browser tab title and section headers on every single page).
3. **Navigation & Side Menu Functionality** (Expand, collapse, reset state, logout, and page routing).
4. **Product Catalog & Product Detail Page (PDP)** (Detail verification, PDP adding/removing, sorting).
5. **Add-to-Cart Dynamics & Scrolling** (Scrolling to add items, continuing shopping additions, catalog removal).
6. **Cart Page Actions & Bulk Operations** (Removing individual items from bulk items, cart counts, navigation).
7. **Checkout Step One Actions & Form Validation** (Specific error fields check, cancellation behavior).
8. **Checkout Step Two Details & Math Calculations** (Subtotal summation, 8% tax calculation, total check, cancellation).
9. **Checkout Complete Details** (Exact text assertions, cart clearance, back home button).

---

## 2. Page Object Model (POM) Architecture

The framework will consist of the following page objects under `src/pages/`:

### Page Class Specs:
* **`BasePage`**: Base class containing shared page interactions, page title verification, header title retrieval, and sidebar controls.
* **`LoginPage`**: 
  - *Selectors*: `[data-test="username"]`, `[data-test="password"]`, `[data-test="login-button"]`, `[data-test="error"]`, `[data-test="error-button"]`
  - *Actions*: `navigate()`, `login(username, password)`, `getErrorMessage()`, `closeErrorMessage()`, `getInputType(fieldName)`
* **`InventoryPage`**:
  - *Selectors*: `[data-test="product-sort-container"]`, `[data-test^="add-to-cart-"]`, `[data-test^="remove-"]`, `.shopping_cart_badge`, `.shopping_cart_link`, `.bm-burger-button`, `.bm-cross-button`, `.title`, `.inventory_item_name`
  - *Actions*: `addProductToCart(productName)`, `removeProductFromCart(productName)`, `getCartBadgeCount()`, `sortProducts(option)`, `goToCart()`, `openSidebar()`, `closeSidebar()`, `clickSidebarItem(itemName)`, `scrollToProduct(productName)`, `clickProductLink(productName)`
* **`ProductDetailPage`**:
  - *Selectors*: `.inventory_details_name`, `.inventory_details_desc`, `.inventory_details_price`, `[data-test^="add-to-cart-"]`, `[data-test^="remove-"]`, `[data-test="back-to-products"]`
  - *Actions*: `getProductName()`, `getProductDescription()`, `getProductPrice()`, `addProductToCart()`, `removeProductFromCart()`, `clickBackToProducts()`
* **`CartPage`**:
  - *Selectors*: `.cart_item`, `[data-test="checkout"]`, `[data-test="continue-shopping"]`, `[data-test^="remove-"]`, `.title`
  - *Actions*: `removeItem(productName)`, `clickCheckout()`, `clickContinueShopping()`, `hasItem(productName)`, `getCartItemsCount()`
* **`CheckoutStepOnePage`**:
  - *Selectors*: `[data-test="firstName"]`, `[data-test="lastName"]`, `[data-test="postalCode"]`, `[data-test="continue"]`, `[data-test="cancel"]`, `[data-test="error"]`
  - *Actions*: `fillInformation(firstName, lastName, postalCode)`, `clickContinue()`, `clickCancel()`, `getErrorMessage()`
* **`CheckoutStepTwoPage`**:
  - *Selectors*: `.summary_subtotal_label`, `.summary_tax_label`, `.summary_total_label`, `[data-test="finish"]`, `[data-test="cancel"]`, `.cart_item`, `.summary_value_label`
  - *Actions*: `getSubtotalValue()`, `getTaxValue()`, `getTotalValue()`, `getPaymentInfo()`, `getShippingInfo()`, `clickFinish()`, `clickCancel()`
* **`CheckoutCompletePage`**:
  - *Selectors*: `[data-test="complete-header"]`, `[data-test="complete-text"]`, `[data-test="back-to-products"]`, `.pony_express`
  - *Actions*: `getCompleteHeaderText()`, `getCompleteText()`, `clickBackHome()`, `isSuccessImageVisible()`

---

## 3. Comprehensive Test Cases List (Decomposed)

### 3.1. Authentication (Login) Tests
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-LOGIN-01** | Successful Login | Log in with valid credentials (`standard_user`, `secret_sauce`). | Redirected to `/inventory.html`. Catalog is displayed. |
| **TC-LOGIN-02** | Invalid Username | Log in with invalid username and valid password. | Error shows: `"Epic sadface: Username and password do not match any user in this service"` |
| **TC-LOGIN-03** | Invalid Password | Log in with valid username and invalid password. | Error shows: `"Epic sadface: Username and password do not match any user in this service"` |
| **TC-LOGIN-04** | Empty Username | Log in with empty username and valid password. | Error shows: `"Epic sadface: Username is required"` |
| **TC-LOGIN-05** | Empty Password | Log in with valid username and empty password. | Error shows: `"Epic sadface: Password is required"` |
| **TC-LOGIN-06** | Empty Form | Log in with empty username and empty password. | Error shows: `"Epic sadface: Username is required"` |
| **TC-LOGIN-07** | Locked Out User | Log in with locked out user credentials. | Error shows: `"Epic sadface: Sorry, this user has been locked out."` |
| **TC-LOGIN-08** | Input Field Types | Validate input field types. | Username field is `type="text"`, Password field is `type="password"`. |
| **TC-LOGIN-09** | Dismiss Error Message | Click the "x" close button on the error message. | Error message element disappears from the page. |

### 3.2. Page Title & Headers Validation
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-TITLE-01** | Login Page Title | Check browser tab title on Login page. | Tab title is `"Swag Labs"`. |
| **TC-TITLE-02** | Inventory Page Title | Check browser tab title on Inventory page. | Tab title is `"Swag Labs"`. |
| **TC-TITLE-03** | Cart Page Title | Check browser tab title on Cart page. | Tab title is `"Swag Labs"`. |
| **TC-TITLE-04** | Checkout One Title | Check browser tab title on Checkout Step One page. | Tab title is `"Swag Labs"`. |
| **TC-TITLE-05** | Checkout Two Title | Check browser tab title on Checkout Step Two page. | Tab title is `"Swag Labs"`. |
| **TC-TITLE-06** | Checkout Complete Title | Check browser tab title on Checkout Complete page. | Tab title is `"Swag Labs"`. |
| **TC-HEADER-01** | Inventory Header | Check page section header on Inventory page. | Header matches exactly `"Products"`. |
| **TC-HEADER-02** | Cart Header | Check page section header on Cart page. | Header matches exactly `"Your Cart"`. |
| **TC-HEADER-03** | Checkout One Header | Check page section header on Checkout Step One. | Header matches exactly `"Checkout: Your Information"`. |
| **TC-HEADER-04** | Checkout Two Header | Check page section header on Checkout Step Two. | Header matches exactly `"Checkout: Overview"`. |
| **TC-HEADER-05** | Checkout Complete Header| Check page section header on Checkout Complete. | Header matches exactly `"Checkout: Complete!"`. |

### 3.3. Side Menu Navigation & State
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-NAV-01** | Side Menu Open | Open the side menu via burger button. | Side menu links become visible and active. |
| **TC-NAV-02** | Side Menu Close | Close the open side menu via the close button. | Side menu collapses and is hidden. |
| **TC-NAV-03** | Navigate - All Items | Open menu, click "All Items". | Redirects to `/inventory.html` (or remains there). |
| **TC-NAV-04** | Navigate - About | Open menu, click "About". | Navigates to Saucelabs landing page (`https://saucelabs.com/`). |
| **TC-NAV-05** | Navigate - Logout | Open menu, click "Logout". | Redirects to Login page, user session is cleared. |
| **TC-NAV-06** | Reset App State | Add item, open menu, click "Reset App State". | Cart badge is cleared immediately. |

### 3.4. Product Catalog Sorting & Product Detail Page (PDP)
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-CAT-01** | Sort A to Z | Select Name (A-Z) sorting option. | Items are sorted alphabetically by name. |
| **TC-CAT-02** | Sort Z to A | Select Name (Z-A) sorting option. | Items are sorted reverse-alphabetically by name. |
| **TC-CAT-03** | Sort Price Low to High | Select Price (low to high) sorting option. | Items are sorted in ascending price order. |
| **TC-CAT-04** | Sort Price High to Low | Select Price (high to low) sorting option. | Items are sorted in descending price order. |
| **TC-PDP-01** | Navigate to PDP | Click product name on Inventory Page. | Navigates to `/inventory-item.html` details page. |
| **TC-PDP-02** | Verify PDP Details | Verify PDP product details. | Details (Name, Price, Desc) match the values from the catalog. |
| **TC-PDP-03** | Add Item on PDP | Click "Add to cart" on PDP. | Cart badge updates to `1`, button changes to "Remove". |
| **TC-PDP-04** | Remove Item on PDP | Click "Remove" on PDP. | Cart badge updates to empty, button changes to "Add to cart". |
| **TC-PDP-05** | Back to Products from PDP | Click "Back to products" button on PDP. | Returns user back to the `/inventory.html` catalog. |

### 3.5. Add-to-Cart Dynamics & Scrolling
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-CART-01** | Scroll and Add Bottom Item| Scroll down, locate the bottom item, click "Add to cart". | Page successfully scrolls, bottom item is added, cart badge = `1`. |
| **TC-CART-02** | Add, Continue Shopping, Add | Add an item, go to cart, click "Continue Shopping", add a different item, go to cart. | Both items exist in cart, badge count updates to `2`. |
| **TC-CART-03** | Remove from Inventory Page | Add item on inventory page, click "Remove" on inventory page. | Cart badge updates to empty. |

### 3.6. Cart Page Actions & Bulk Operations
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-CART-04** | Cart Item Details | Navigate to cart and verify item details. | Shows correct product name, price, description, and quantity `1`. |
| **TC-CART-05** | Continue Shopping Button | Click "Continue Shopping" button on cart page. | Returns user back to the `/inventory.html` catalog. |
| **TC-CART-06** | Remove Item from Cart Page | Click "Remove" button next to item on `/cart.html`. | Item is removed from cart, badge clears. |
| **TC-CART-07** | Bulk Cart Management | Add all 6 items, go to cart, remove one specific item. | Badge updates to `5`. 5 remaining items are still in cart. |
| **TC-CART-08** | Checkout Button | Click "Checkout" button on cart page. | Redirects user to `/checkout-step-one.html`. |

### 3.7. Checkout Step One Validation & Cancelation
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-CH1-01** | Empty Fields Click | Click "Continue" without entering any values. | Error displays: `"Error: First Name is required"`. |
| **TC-CH1-02** | Missing Last Name | Fill First Name, leave Last Name and Zip blank, click "Continue". | Error displays: `"Error: Last Name is required"`. |
| **TC-CH1-03** | Missing Postal Code | Fill First Name and Last Name, leave Zip blank, click "Continue". | Error displays: `"Error: Postal Code is required"`. |
| **TC-CH1-04** | Cancel Step One | Click "Cancel" button on Step One page. | Navigates back to `/cart.html` with cart items preserved. |
| **TC-CH1-05** | Complete Step One Form | Fill valid First Name, Last Name, Postal Code, click "Continue". | Navigates to `/checkout-step-two.html`. |

### 3.8. Checkout Step Two Logic & Calculations
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-CH2-01** | Verify Step Two Items | Check items in Step Two list. | Match items added to cart in name, quantity, and price. |
| **TC-CH2-02** | Payment & Shipping Info | Check Payment and Shipping display. | Contains Payment Info (e.g. "SauceCard #31337") and Shipping Info. |
| **TC-CH2-03** | Subtotal Calculation | Verify subtotal price math. | Displayed Item total equals the exact sum of individual item prices. |
| **TC-CH2-04** | Tax Calculation | Verify tax price math (8.00% rate). | Displayed tax matches `Item Subtotal * 0.08` rounded to two decimals. |
| **TC-CH2-05** | Total Calculation | Verify total price math. | Displayed Total equals Item total + Tax. |
| **TC-CH2-06** | Cancel Step Two | Click "Cancel" button on Step Two page. | Navigates back to `/inventory.html` with cart items preserved. |
| **TC-CH2-07** | Finish Step Two | Click "Finish" button on Step Two page. | Navigates to `/checkout-complete.html`. |

### 3.9. Checkout Complete Page Validation
| Test ID | Test Case Name | Description | Expected Results |
|---|---|---|---|
| **TC-COMP-01** | Verify Completion Header | Check primary header string. | Matches exactly `"Thank you for your order!"`. |
| **TC-COMP-02** | Verify Completion Description| Check description body string. | Matches exactly `"Your order has been dispatched, and will arrive just as fast as the pony can get there!"`. |
| **TC-COMP-03** | Verify Delivery Image | Verify Pony Express delivery image. | Image is loaded and visible. |
| **TC-COMP-04** | Back Home Navigation | Click "Back Home" button. | Navigates back to `/inventory.html`. |
| **TC-COMP-05** | Cart Resets on Complete | Check cart state after completing purchase. | Cart is cleared and badge count is empty/not visible. |

---

## 4. Technical Configuration

* **Framework**: Playwright (latest) + TypeScript
* **Execution Mode**: **Headed** (`headless: false`)
* **Timeouts**: Explicit and default timeout set to **60 seconds** (`60000` ms)
* **Directory Structure**:
  ```text
  ├── package.json
  ├── playwright.config.ts
  ├── tsconfig.json
  └── src/
      ├── pages/
      │   ├── BasePage.ts
      │   ├── LoginPage.ts
      │   ├── InventoryPage.ts
      │   ├── ProductDetailPage.ts
      │   ├── CartPage.ts
      │   ├── CheckoutStepOnePage.ts
      │   ├── CheckoutStepTwoPage.ts
      │   └── CheckoutCompletePage.ts
      └── tests/
          └── saucedemo.spec.ts
  ```

---
> [!IMPORTANT]
> **Workspace Requirements Alignment:**
> * All tests will run with `headless: false` in the Playwright config.
> * Every wait and page timeout is set to `60,000ms` as specified by the workspace constraints.
