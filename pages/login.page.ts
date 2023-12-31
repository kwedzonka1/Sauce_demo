import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.locator('[data-test="username"]');
  passwordInput = this.page.locator('[data-test="password"]');
  loginButton = this.page.locator('[data-test="login-button"]');
  acceptedUsernameHeader = this.page.getByRole("heading", {
    name: "Accepted usernames are:",
  });

  async login(userId: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
