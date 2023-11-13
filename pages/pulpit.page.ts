import { Page } from "@playwright/test";

export class PulpitPage {
  constructor(private page: Page) {}
  menuButton = this.page.locator(
    "//button[contains(@id, 'react-burger-menu-btn')]"
  );
  logoutLink = this.page.locator(
    "//nav/a[contains(@id, 'logout_sidebar_link')]"
  );
  pulpitHeaderTitle = this.page.locator("//span[contains(@class, 'title')]");

  backpackAddButton = this.page.locator(
    '[data-test= "add-to-cart-sauce-labs-backpack"]'
  );
  tshirtAddButton = this.page.locator(
    '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
  );
  redTshirtAddButton = this.page.locator(
    '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'
  );

  shopingCart = this.page.locator(
    "//div[contains(@id, 'shopping_cart_container')]"
  );

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
