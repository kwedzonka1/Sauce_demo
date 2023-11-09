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
}
