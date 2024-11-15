// @ts-check
import { test } from "@playwright/test";
import { App } from "../pages/App";
import configData from "../data/config-data.json";

test("TC01 : Verify console errors on all pages", async ({ page }) => {
  const fashionhubApp = new App(page);

  // Check for console errors on each page.
  await fashionhubApp.getHomePage().verifyConsoleErrors();
  await fashionhubApp.getAccountPage().verifyConsoleErrors();
  await fashionhubApp.getProductsPage().verifyConsoleErrors();
  await fashionhubApp.getCartPage().verifyConsoleErrors();
  await fashionhubApp.getAboutPage().verifyConsoleErrors();
});

test("TC02 : Verify status code on all pages", async ({ page }) => {
  const fashionhubApp = new App(page);

  // Check the status code of each page.
  await fashionhubApp.getHomePage().verifyStatusCode();
  await fashionhubApp.getAccountPage().verifyStatusCode();
  await fashionhubApp.getProductsPage().verifyStatusCode();
  await fashionhubApp.getCartPage().verifyStatusCode();
  await fashionhubApp.getAboutPage().verifyStatusCode();
});

test("TC03 : Verify user login", async ({ page }) => {
  const fashionhubApp = new App(page);

  // Fetch the user credentials from config data.
  const username = configData.username;
  const password = configData.password;

  // Visit the Account page, login and check if it was successful.
  await fashionhubApp.getAccountPage().visit();
  await fashionhubApp.getAccountPage().login(username, password);
  await fashionhubApp.getAccountPage().verifyLogin();
});
