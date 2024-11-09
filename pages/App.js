import { AboutPage } from "./AboutPage";
import { CartPage } from "./CartPage";
import { HomePage } from "./HomePage";
import { AccountPage } from "./AccountPage";
import { ProductsPage } from "./ProductsPage";

export class App {
  /**
   * Constructor for class.
   * Initializes the page object to interact with the web page.
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Returns a new instance of the HomePage class.
   */
  getHomePage() {
    return new HomePage(this.page);
  }

  /**
   * Returns a new instance of the AccountPage class.
   */
  getAccountPage() {
    return new AccountPage(this.page);
  }

  /**
   * Returns a new instance of the ProductsPage class.
   */
  getProductsPage() {
    return new ProductsPage(this.page);
  }

  /**
   * Returns a new instance of the CartPage class.
   */
  getCartPage() {
    return new CartPage(this.page);
  }

  /**
   * Returns a new instance of the AboutPage class.
   */
  getAboutPage() {
    return new AboutPage(this.page);
  }
}
