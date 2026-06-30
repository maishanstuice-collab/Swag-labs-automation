# Test Cases & Execution Report: Sauce Demo POM Framework

This file details all the test cases written and executed for the Sauce Demo (Swag Labs) application, including their execution status (Pass/Fail).

---

## 1. Executive Summary

- **Total Test Cases Executed**: 46
- **Passed**: 46
- **Failed**: 0
- **Pass Rate**: 100%

---

## 2. Test Cases Execution Details

### 2.1. Authentication (Login) Tests
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-LOGIN-01** | Successful Login | Log in with valid credentials (`standard_user`, `secret_sauce`). | Redirected to `/inventory.html`. Catalog is displayed. | **PASSED** |
| **TC-LOGIN-02** | Invalid Username | Log in with invalid username and valid password. | Error shows: `"Epic sadface: Username and password do not match any user in this service"` | **PASSED** |
| **TC-LOGIN-03** | Invalid Password | Log in with valid username and invalid password. | Error shows: `"Epic sadface: Username and password do not match any user in this service"` | **PASSED** |
| **TC-LOGIN-04** | Empty Username | Log in with empty username and valid password. | Error shows: `"Epic sadface: Username is required"` | **PASSED** |
| **TC-LOGIN-05** | Empty Password | Log in with valid username and empty password. | Error shows: `"Epic sadface: Password is required"` | **PASSED** |
| **TC-LOGIN-06** | Empty Form | Log in with empty username and empty password. | Error shows: `"Epic sadface: Username is required"` | **PASSED** |
| **TC-LOGIN-07** | Locked Out User | Log in with locked out user credentials. | Error shows: `"Epic sadface: Sorry, this user has been locked out."` | **PASSED** |
| **TC-LOGIN-08** | Input Field Types | Validate input field types. | Username field is `type="text"`, Password field is `type="password"`. | **PASSED** |
| **TC-LOGIN-09** | Dismiss Error Message | Click the "x" close button on the error message. | Error message element disappears from the page. | **PASSED** |

### 2.2. Page Title & Headers Validation
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-TITLE-01** | Login Page Title | Check browser tab title on Login page. | Tab title is `"Swag Labs"`. | **PASSED** |
| **TC-TITLE-02** | Inventory Page Title | Check browser tab title on Inventory page. | Tab title is `"Swag Labs"`. | **PASSED** |
| **TC-TITLE-03** | Cart Page Title | Check browser tab title on Cart page. | Tab title is `"Swag Labs"`. | **PASSED** |
| **TC-TITLE-04** | Checkout One Title | Check browser tab title on Checkout Step One page. | Tab title is `"Swag Labs"`. | **PASSED** |
| **TC-TITLE-05** | Checkout Two Title | Check browser tab title on Checkout Step Two page. | Tab title is `"Swag Labs"`. | **PASSED** |
| **TC-TITLE-06** | Checkout Complete Title | Check browser tab title on Checkout Complete page. | Tab title is `"Swag Labs"`. | **PASSED** |
| **TC-HEADER-01** | Inventory Header | Check page section header on Inventory page. | Header matches exactly `"Products"`. | **PASSED** |
| **TC-HEADER-02** | Cart Header | Check page section header on Cart page. | Header matches exactly `"Your Cart"`. | **PASSED** |
| **TC-HEADER-03** | Checkout One Header | Check page section header on Checkout Step One. | Header matches exactly `"Checkout: Your Information"`. | **PASSED** |
| **TC-HEADER-04** | Checkout Two Header | Check page section header on Checkout Step Two. | Header matches exactly `"Checkout: Overview"`. | **PASSED** |
| **TC-HEADER-05** | Checkout Complete Header| Check page section header on Checkout Complete. | Header matches exactly `"Checkout: Complete!"`. | **PASSED** |

### 2.3. Side Menu Navigation & State
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-NAV-01** | Side Menu Open | Open the side menu via burger button. | Side menu links become visible and active. | **PASSED** |
| **TC-NAV-02** | Side Menu Close | Close the open side menu via the close button. | Side menu collapses and is hidden. | **PASSED** |
| **TC-NAV-03** | Navigate - All Items | Open menu, click "All Items". | Redirects to `/inventory.html` (or remains there). | **PASSED** |
| **TC-NAV-04** | Navigate - About | Open menu, click "About". | Navigates to Saucelabs landing page (`https://saucelabs.com/`). | **PASSED** |
| **TC-NAV-05** | Navigate - Logout | Open menu, click "Logout". | Redirects to Login page, user session is cleared. | **PASSED** |
| **TC-NAV-06** | Reset App State | Add item, open menu, click "Reset App State". | Cart badge is cleared immediately. | **PASSED** |

### 2.4. Product Catalog Sorting & Product Detail Page (PDP)
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-CAT-01** | Sort A to Z | Select Name (A-Z) sorting option. | Items are sorted alphabetically by name. | **PASSED** |
| **TC-CAT-02** | Sort Z to A | Select Name (Z-A) sorting option. | Items are sorted reverse-alphabetically by name. | **PASSED** |
| **TC-CAT-03** | Sort Price Low to High | Select Price (low to high) sorting option. | Items are sorted in ascending price order. | **PASSED** |
| **TC-CAT-04** | Sort Price High to Low | Select Price (high to low) sorting option. | Items are sorted in descending price order. | **PASSED** |
| **TC-PDP-01** | Navigate to PDP | Click product name on Inventory Page. | Navigates to `/inventory-item.html` details page. | **PASSED** |
| **TC-PDP-02** | Verify PDP Details | Verify PDP product details. | Details (Name, Price, Desc) match the values from the catalog. | **PASSED** |
| **TC-PDP-03** | Add Item on PDP | Click "Add to cart" on PDP. | Cart badge updates to `1`, button changes to "Remove". | **PASSED** |
| **TC-PDP-04** | Remove Item on PDP | Click "Remove" on PDP. | Cart badge updates to empty, button changes to "Add to cart". | **PASSED** |
| **TC-PDP-05** | Back to Products from PDP | Click "Back to products" button on PDP. | Returns user back to the `/inventory.html` catalog. | **PASSED** |

### 2.5. Add-to-Cart Dynamics & Scrolling
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-CART-01** | Scroll and Add Bottom Item| Scroll down, locate the bottom item, click "Add to cart". | Page successfully scrolls, bottom item is added, cart badge = `1`. | **PASSED** |
| **TC-CART-02** | Add, Continue Shopping, Add | Add an item, go to cart, click "Continue Shopping", add a different item, go to cart. | Both items exist in cart, badge count updates to `2`. | **PASSED** |
| **TC-CART-03** | Remove from Inventory Page | Add item on inventory page, click "Remove" on inventory page. | Cart badge updates to empty. | **PASSED** |

### 2.6. Cart Page Actions & Bulk Operations
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-CART-04** | Cart Item Details | Navigate to cart and verify item details. | Shows correct product name, price, description, and quantity `1`. | **PASSED** |
| **TC-CART-05** | Continue Shopping Button | Click "Continue Shopping" button on cart page. | Returns user back to the `/inventory.html` catalog. | **PASSED** |
| **TC-CART-06** | Remove Item from Cart Page | Click "Remove" button next to item on `/cart.html`. | Item is removed from cart, badge clears. | **PASSED** |
| **TC-CART-07** | Bulk Cart Management | Add all 6 items, go to cart, remove one specific item. | Badge updates to `5`. 5 remaining items are still in cart. | **PASSED** |
| **TC-CART-08** | Checkout Button | Click "Checkout" button on cart page. | Redirects user to `/checkout-step-one.html`. | **PASSED** |

### 2.7. Checkout Step One Validation & Cancelation
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-CH1-01** | Empty Fields Click | Click "Continue" without entering any values. | Error displays: `"Error: First Name is required"`. | **PASSED** |
| **TC-CH1-02** | Missing Last Name | Fill First Name, leave Last Name and Zip blank, click "Continue". | Error displays: `"Error: Last Name is required"`. | **PASSED** |
| **TC-CH1-03** | Missing Postal Code | Fill First Name and Last Name, leave Zip blank, click "Continue". | Error displays: `"Error: Postal Code is required"`. | **PASSED** |
| **TC-CH1-04** | Cancel Step One | Click "Cancel" button on Step One page. | Navigates back to `/cart.html` with cart items preserved. | **PASSED** |
| **TC-CH1-05** | Complete Step One Form | Fill valid First Name, Last Name, Postal Code, click "Continue". | Navigates to `/checkout-step-two.html`. | **PASSED** |

### 2.8. Checkout Step Two Logic & Calculations
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-CH2-01** | Verify Step Two Items | Check items in Step Two list. | Match items added to cart in name, quantity, and price. | **PASSED** |
| **TC-CH2-02** | Payment & Shipping Info | Check Payment and Shipping display. | Contains Payment Info (e.g. "SauceCard #31337") and Shipping Info. | **PASSED** |
| **TC-CH2-03** | Subtotal Calculation | Verify subtotal price math. | Displayed Item total equals the exact sum of individual item prices. | **PASSED** |
| **TC-CH2-04** | Tax Calculation | Verify tax price math (8.00% rate). | Displayed tax matches `Item Subtotal * 0.08` rounded to two decimals. | **PASSED** |
| **TC-CH2-05** | Total Calculation | Verify total price math. | Displayed Total equals Item total + Tax. | **PASSED** |
| **TC-CH2-06** | Cancel Step Two | Click "Cancel" button on Step Two page. | Navigates back to `/inventory.html` with cart items preserved. | **PASSED** |
| **TC-CH2-07** | Finish Step Two | Click "Finish" button on Step Two page. | Navigates to `/checkout-complete.html`. | **PASSED** |

### 2.9. Checkout Complete Page Validation
| Test ID | Test Case Name | Description | Expected Results | Status |
|---|---|---|---|---|
| **TC-COMP-01** | Verify Completion Header | Check primary header string. | Matches exactly `"Thank you for your order!"`. | **PASSED** |
| **TC-COMP-02** | Verify Completion Description| Check description body string. | Matches exactly `"Your order has been dispatched, and will arrive just as fast as the pony can get there!"`. | **PASSED** |
| **TC-COMP-03** | Verify Delivery Image | Verify Pony Express delivery image. | Image is loaded and visible. | **PASSED** |
| **TC-COMP-04** | Back Home Navigation | Click "Back Home" button. | Navigates back to `/inventory.html`. | **PASSED** |
| **TC-COMP-05** | Cart Resets on Complete | Check cart state after completing purchase. | Cart is cleared and badge count is empty/not visible. | **PASSED** |
