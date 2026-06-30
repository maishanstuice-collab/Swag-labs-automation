# Swag Labs Automation with Playwright

This repository contains an end-to-end automation suite for the Sauce Demo (Swag Labs) web application using **Playwright + TypeScript** and the **Page Object Model (POM)** pattern.

The automation is configured for **headed browser execution** and is designed to run through the Playwright CLI. It can also be integrated into external CLI workflows such as **Antigravity CLI** by invoking the Playwright test command from the repository root.

## Project Overview

- Application under test: `https://www.saucedemo.com`
- Automation framework: `@playwright/test`
- Language: TypeScript
- Design pattern: Page Object Model (POM)
- Browser mode: Headed (`headless: false`)
- Default browser: Chromium
- Timeout settings: 60 seconds for actions and navigation

## Repository Structure

- `playwright.config.ts` - Playwright configuration for test execution
- `src/pages/` - Page object classes for each screen in the Sauce Demo flow
- `src/tests/saucedemo.spec.ts` - Main test suite with login, navigation, PDP, cart, and checkout scenarios
- `test_plan.md` - Detailed test plan for the automation suite
- `final_report.md` - Summary of the executed test results and coverage
- `test_cases_report.md` - Test case matrix and execution status

## Key Test Coverage

The suite validates:
- Login workflow and error handling
- Inventory page and product catalog actions
- Product detail page navigation
- Cart management and removal flows
- Checkout step one and step two form behavior
- Order completion and return-to-home navigation
- Sidebar menu actions: All Items, About, Reset App State, Logout
- Page titles and header text across all pages

## Prerequisites

- Node.js 18+ or compatible
- npm
- Git

## Setup

From the repository root:

```bash
npm install
npx playwright install
```

## Run Tests

Execute the full Playwright test suite:

```bash
npm test
```

Or run Playwright directly:

```bash
npx playwright test
```

If you use Antigravity CLI, point it to the repository root and configure it to execute:

```bash
npx playwright test
```

## View Test Report

After tests complete, open the generated HTML report:

```bash
npx playwright show-report playwright-report
```

## Notes

- The automation is intentionally configured for visible browser execution so test steps can be observed live.
- `playwright.config.ts` sets a single Chromium project and uses a 60-second timeout to handle slow page rendering.

## Contact

If you want to update or extend the suite, review the page object files under `src/pages/` and the main test specification at `src/tests/saucedemo.spec.ts`.
