# Skill: Automated E2E Testing Workflow

## Purpose
To execute a fully automated, interactive, and visible End-to-End (E2E) testing lifecycle for a given web application URL, enforcing human-in-the-loop validation before executing tests.

---

## Technical Constraints & Environment
* **Explicit Wait Timeout:** Exactly `60 seconds` across all generated test scripts to prevent premature timeouts during slow element rendering.
* **Execution Mode:** Headed browser execution (`headless: false`). The user must be able to visually see the browser interactions during runtime.

---

## Workflow Phases

### Phase 1: Deep Codebase & UI Exploration
1. Accept a target web application URL from the user.
2. Crawl and thoroughly explore the Frontend (FE) and Backend (BE) code structures mapping to that URL.
3. Read and analyze all critical client-side files, including but not limited to:
   * HTML structures
   * CSS stylesheets
   * JavaScript/TypeScript logic

### Phase 2: Test Plan Generation
1. Based on the analysis from Phase 1, generate a comprehensive **Test Plan** tailored specifically to the provided URL.
2. Format this plan into a readable report file.
3. Present the report clearly to the user.

### Phase 3: Interactive Modification Loop
1. Pause execution and await user feedback on the generated Test Plan report.
2. If the user requests any modifications or updates, rewrite the test plan accordingly.
3. **Strict Gatekeep:** Do **NOT** proceed to test generation or execution until the user explicitly provides a confirmation command (e.g., "proceed", "looks good", or "next phase").

### Phase 4: Test Script Generation & Asset Delivery
1. Once approved, generate the actual E2E test scripts.
2. Save these executable scripts into a dedicated, accessible file in the workspace.
3. Provide the user with the exact script files so they know exactly what the CLI is running.

### Phase 5: Visual Test Execution
1. Launch the browser in **headed mode** so the user can visually track what the CLI is doing in real-time.
2. Run the generated test suite utilizing the strict `60-second` explicit wait rule.

### Phase 6: Final Reporting
1. Compile the test run results into a structured final report.
2. The report must clearly display:
   * Total test cases run
   * Number of passed tests
   * Number of failed tests (including error logs/reasons for failure)