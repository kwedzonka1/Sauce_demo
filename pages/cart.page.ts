import { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}
  checkoutButton = this.page.locator('[data-test= "checkout"]');
  userFirstNameFild = this.page.locator('[data-test= "firstName"]');
  userLastNameFild = this.page.locator('[data-test= "lastName"]');
  postalCodeFild = this.page.locator('[data-test= "postalCode"]');
  continueButton = this.page.locator('[data-test= "continue"]');
  finishButton = this.page.locator('[data-test= "finish"]');
  backHomeButton = this.page.locator('[data-test= "back-to-products"]');
  removeBackpackButton = this.page.locator(
    '[data-test= "remove-sauce-labs-backpack"]'
  );
  successBuyingMessage = this.page.locator(
    "//div[contains(@id, 'checkout_complete_container')]"
  );
  cartCounter = this.page.locator(
    "//span[contains(@class, 'shopping_cart_badge')]"
  );
}
