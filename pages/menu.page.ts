import { Page } from "@playwright/test";

export class MenuPage {
  constructor(private page: Page) {}

  menuButton = this.page.getByRole("button", { name: "Open Menu" });
  logoutLink = this.page.getByRole("link", { name: "Logout" });
}
