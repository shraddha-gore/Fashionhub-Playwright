# Overview

This project is a test automation framework developed using [Playwright](https://playwright.dev/) and JavaScript to test the Fashionhub demo application. The framework includes:

- **Three UI validation tests** that verify critical functionalities within the Fashionhub demo app.
- **One API test** that retrieves pull request (PR) details of a specified GitHub repository and exports the data to a CSV file.

The framework is designed with the **Page Object Model (POM)** to enhance scalability and maintainability. It is highly configurable, with parameterized options that allow tests to be executed across multiple environments. Additionally, it supports cross-browser testing to ensure broader test coverage and compatibility.

Traces, screenshots, and videos are captured by default for all tests due to the framework's small scale. For reporting, the framework leverages Playwright's default **HTML reporter** for clear and comprehensive test results.

# Dependencies

To run this project, ensure the following dependencies are installed:

- **Node.js**: Required to run JavaScript code and manage packages.
- **Playwright**: Core library for browser automation and testing.
- **Octokit**: Used for interacting with the GitHub API.

# Steps to Run the Project

Follow these steps to set up and execute the tests:

1. **Install [Node.js](https://nodejs.org/en/download/package-manager)** on your machine if it is not already installed.
2. **Clone the repository**:

```
git clone https://github.com/shraddha-gore/Fashionhub-Playwright.git
```

3. **Navigate to the project directory** using your terminal:

```
cd Fashionhub-Playwright
```

4. **Install the required dependencies**:

```
npm install
```

5. **Create a GitHub token to access public repositories.** Pass this token to `github_token` in the `config-data.json` file. Refer to [GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) for more info. on creating tokens.
6. **Run the Playwright tests.** This command executes all tests across all configured projects and browsers:

```
npx playwright test
```

7. **Execute tests for a specific project.** Available projects: `local-chromium`, `local-firefox`, `local-webkit`, `staging-chromium`, `staging-firefox`, `staging-webkit`, `prod-chromium`, `prod-firefox`, `prod-webkit`.

```
npx playwright test --project prod-chromium --project prod-firefox --project prod-webkit
```

8. **View Playwright reports.**

```
npx playwright show-report
```

9. **(Optional)** Modify the options in `config-options.json` and `playwright.config.js` to tailor the settings for different environments and applications.

# Test Results

1. The test that checks for console errors fails on all pages, specifically on the About page, due to an intentional error included for testing purposes. The rest of the tests pass.
   ![playwright-report](https://github.com/user-attachments/assets/5667d89c-ec07-453b-b196-6d091293bdb1)
2. The pull request details from the repository are captured and stored in a CSV file, which can be found in the output directory.
   ![generated-CSV](https://github.com/user-attachments/assets/729efdad-690b-49ca-a8e9-4c8597351f6e)
