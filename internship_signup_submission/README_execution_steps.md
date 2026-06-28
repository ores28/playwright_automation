# Signup Automation Submission

## Purpose
This folder is a clean workspace for the fully automated signup flow required for the internship task.


## How to run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the Playwright test:
   ```bash
   npx playwright test internship_signup_submission/signup_automation_script.spec.js
   ```
3. Generate the HTML report if needed:
   ```bash
   npx playwright show-report
   ```

## Environment
- Language: JavaScript
- Framework: Playwright Test
- Current project dependency: `@playwright/test` from the root `package.json`
- Browser project in `playwright.config.js`: Microsoft Edge


