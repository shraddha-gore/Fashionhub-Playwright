import { expect } from "@playwright/test";

export class AboutPage {
  /**
   * Constructor for class.
   * Initializes the page object to interact with the web page.
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to About page and waits for the DOM content to load.
   * Returns a Promise that resolves to the Response object of the navigation.
   */
  async visit() {
    let response = await this.page.goto("about.html");
    await this.page.waitForLoadState("domcontentloaded");
    return response;
  }

  /**
   * Verifies that no errors are logged in the console when page is visited.
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
