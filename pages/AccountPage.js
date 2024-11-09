import { expect } from "@playwright/test";

export class AccountPage {
  /**
   * Constructor for class.
   * Initializes the page object to interact with the web page.
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to Account page and waits for the DOM content to load.
   * Returns a Promise that resolves to the Response object of the navigation.
   */
  async visit() {
    let response = await this.page.goto("login.html");
    await this.page.waitForLoadState("domcontentloaded");
    return response;
  }

  /**
   * Logs in a user by filling in the username and password, then submitting the form.
   * Arguments - username, password
   */
  async login(username, password) {
    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("input[type='submit']").click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Verifies that no errors are logged in the console when page is visited.
   */
  async verifyLogin() {
    expect(this.page.locator("logout-button")).toBeVisible();
  }

  /**
   * Verifies page response's HTTP status code is valid (200 or 3xx).
   */
  async verifyConsoleErrors() {
    let errorsLogged = false;
    this.page.on("console", async (msg) => {
      if (msg.type() === "error") {
        errorsLogged = true;
      }
    });
    await this.visit();

    expect(errorsLogged).toBeFalsy();
  }

  /**
   * Verifies page response's HTTP status code is valid (200 or 3xx).
   */
  async verifyStatusCode() {
    const status = (await this.visit()).status();
    const isResponseValid =
      status === 200 || (status >= 300 && status <= 308) ? true : false;

    expect(isResponseValid).toBeTruthy();
  }
}
