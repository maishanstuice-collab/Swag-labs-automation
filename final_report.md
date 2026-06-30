# Test Run Execution Report: Sauce Demo Automation

This report summarizes the results of the automated E2E test execution for **Sauce Demo (Swag Labs)** using **Playwright + TypeScript + Page Object Model (POM)**.

---

## 1. Executive Summary

- **Execution Date/Time**: 2026-06-29
- **Environment**: Sauce Demo (`https://www.saucedemo.com/`)
- **Browsers Run**: Chromium (Headed mode)
- **Timeouts**: 60,000ms
- **Total Test Cases Executed**: 46
- **Pass Rate**: 100%

| Status | Count |
| :--- | :--- |
| **Passed** | 46 |
| **Failed** | 0 |
| **Skipped** | 0 |

---

## 2. Page Object Model (POM) Architecture

The automation framework is organized with the following modular directory structure:
```text
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── src/
    ├── pages/
    │   ├── BasePage.ts             # Shared navigation, headers, side menu locator, title validations
    │   ├── LoginPage.ts            # Form filling, input types, error dismissals
    │   ├── InventoryPage.ts        # Adding, removing, price/name parsing, catalog sorting, scrolling
    │   ├── ProductDetailPage.ts    # PDP validation, add/remove from PDP, back button
    │   ├── CartPage.ts             # Item counts, dynamic item details, remove button, checkout navigation
    │   ├── CheckoutStepOnePage.ts  # Form validation, error messages, step navigation, cancelation
    │   ├── CheckoutStepTwoPage.ts  # Price summing logic, tax verification (8%), total check, finish order
    │   └── CheckoutCompletePage.ts # Success texts checking, image check, cart reset assertions
    └── tests/
        └── saucedemo.spec.ts       # Spec file running 46 granular assertions sequentially
```

---

## 3. Detailed Test Execution Results

All executed tests passed successfully:

### 3.1. Authentication (Login)
- **`TC-LOGIN-01`**: Successful Login with standard user credentials. (**PASS**)
- **`TC-LOGIN-02`**: Error display when invalid username is provided. (**PASS**)
- **`TC-LOGIN-03`**: Error display when invalid password is provided. (**PASS**)
- **`TC-LOGIN-04`**: Error message checking when username is empty. (**PASS**)
- **`TC-LOGIN-05`**: Error message checking when password is empty. (**PASS**)
- **`TC-LOGIN-06`**: Error message checking when username & password are empty. (**PASS**)
- **`TC-LOGIN-07`**: Sorry, locked out user error validation. (**PASS**)
- **`TC-LOGIN-08`**: Input tag field types check (`type="text"` & `type="password"`). (**PASS**)
- **`TC-LOGIN-09`**: Close error message banner functionality (elements hidden upon close). (**PASS**)

### 3.2. Titles & Section Headers
- **`TC-TITLE-01` to `TC-TITLE-06`**: Validated that the browser tab title remains `"Swag Labs"` on Login, Inventory, Cart, Checkout 1, Checkout 2, and Checkout Complete. (**PASS**)
- **`TC-HEADER-01`**: Inventory section title is exactly `"Products"`. (**PASS**)
- **`TC-HEADER-02`**: Cart section title is exactly `"Your Cart"`. (**PASS**)
- **`TC-HEADER-03`**: Checkout step one section title is exactly `"Checkout: Your Information"`. (**PASS**)
- **`TC-HEADER-04`**: Checkout step two section title is exactly `"Checkout: Overview"`. (**PASS**)
- **`TC-HEADER-05`**: Checkout complete section title is exactly `"Checkout: Complete!"`. (**PASS**)

### 3.3. Side Menu Navigation & State
- **`TC-NAV-01`**: Side Menu opening animation and items clickability. (**PASS**)
- **`TC-NAV-02`**: Side Menu close button functional check. (**PASS**)
- **`TC-NAV-03`**: Navigation link "All Items" redirects to inventory. (**PASS**)
- **`TC-NAV-04`**: Navigation link "About" redirects to saucelabs.com. (**PASS**)
- **`TC-NAV-05`**: Navigation link "Logout" clears session and goes back to login page. (**PASS**)
- **`TC-NAV-06`**: Navigation link "Reset App State" correctly clears the active shopping cart badge. (**PASS**)

### 3.4. Sorting & Product Detail Page (PDP)
- **`TC-CAT-01`**: Sorting by Name (A-Z) lists items in correct alphabetical order. (**PASS**)
- **`TC-CAT-02`**: Sorting by Name (Z-A) lists items in correct reverse-alphabetical order. (**PASS**)
- **`TC-CAT-03`**: Sorting by Price (low to high) lists items in ascending price order. (**PASS**)
- **`TC-CAT-04`**: Sorting by Price (high to low) lists items in descending price order. (**PASS**)
- **`TC-PDP-01` & `TC-PDP-02`**: Clicking product name routes to details page; PDP details match catalog details. (**PASS**)
- **`TC-PDP-03` & `TC-PDP-04`**: Adding/removing items from the PDP updates the cart badge. (**PASS**)
- **`TC-PDP-05`**: Clicking "Back to products" on PDP redirects back to catalog. (**PASS**)

### 3.5. Cart Lifecycle & Scrolling
- **`TC-CART-01`**: Scrolling down inventory page to locate and add bottom item (`Test.allTheThings() T-Shirt (Red)`) works. (**PASS**)
- **`TC-CART-02`**: Adding item, visiting cart, returning back via "Continue Shopping", adding new item, and checking cart updates dynamically. (**PASS**)
- **`TC-CART-03`**: Clicking "Remove" directly from the inventory page clears badge counts. (**PASS**)
- **`TC-CART-04`**: Detailed check on Cart Page (`/cart.html`) that item matches correct name, description, and price. (**PASS**)
- **`TC-CART-05`**: "Continue Shopping" button on cart page redirects to catalog. (**PASS**)
- **`TC-CART-06`**: Removing item directly from the cart page updates items list and removes badge. (**PASS**)
- **`TC-CART-07`**: Bulk items removal (adds all 6 items, removes one specific item, and verifies that the remaining 5 items are still visible). (**PASS**)
- **`TC-CART-08`**: Click "Checkout" button routes to Step One. (**PASS**)

### 3.6. Checkout Form & Math Validations
- **`TC-CH1-01`**: First name missing form error matches `"Error: First Name is required"`. (**PASS**)
- **`TC-CH1-02`**: Last name missing form error matches `"Error: Last Name is required"`. (**PASS**)
- **`TC-CH1-03`**: Zip code missing form error matches `"Error: Postal Code is required"`. (**PASS**)
- **`TC-CH1-04`**: Cancel button on checkout step one redirects to `/cart.html` preserving items. (**PASS**)
- **`TC-CH1-05`**: Happy path filling moves successfully to step two. (**PASS**)
- **`TC-CH2-01`**: Items shown on Checkout step two overview match items added to cart. (**PASS**)
- **`TC-CH2-02`**: Payment info ("SauceCard #31337") and shipping info labels exist. (**PASS**)
- **`TC-CH2-03`**: Subtotal matches the mathematical sum of individual item prices. (**PASS**)
- **`TC-CH2-04`**: Tax matches the 8% math check of the subtotal (rounded to 2 decimal places). (**PASS**)
- **`TC-CH2-05`**: Displayed Total equals Item subtotal + Tax. (**PASS**)
- **`TC-CH2-06`**: Click "Cancel" on step two redirects to catalog preserving cart state. (**PASS**)
- **`TC-CH2-07`**: Click "Finish" on step two routes to completion page. (**PASS**)

### 3.7. Purchase Completion
- **`TC-COMP-01`**: Completion header matches exactly `"Thank you for your order!"`. (**PASS**)
- **`TC-COMP-02`**: Completion subheader matches exactly `"Your order has been dispatched, and will arrive just as fast as the pony can get there!"`. (**PASS**)
- **`TC-COMP-03`**: Delivery Pony success logo image is visible. (**PASS**)
- **`TC-COMP-04` & `TC-COMP-05`**: Clicking "Back Home" redirects to catalog and clears/resets the shopping cart badge count to empty. (**PASS**)

---
> [!TIP]
> **Playwright HTML Report:**
> You can view the local HTML report generated by Playwright at `playwright-report/index.html`.
