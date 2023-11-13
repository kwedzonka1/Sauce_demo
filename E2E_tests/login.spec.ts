import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Login tests", () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  let userPassword;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    userPassword = "secret_sauce";
  });

  test("successful login with correct credentials", async ({ page }) => {
    //Arrange
    const userName = "standard_user";
    const expectedHeaderText = "Products";
    //Act
    await loginPage.login(userName, userPassword);
    //Assert
    await expect(pulpitPage.pulpitHeaderTitle).toHaveText(expectedHeaderText);
  });

  test("successful logout", async ({ page }) => {
    //Arrange
    const userName = "standard_user";
    await loginPage.login(userName, userPassword);
    //Act
    await pulpitPage.logout();
    //Assert
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("unsuccessful login with locked out user name", async ({ page }) => {
    //Arrange
    const userName = "locked_out_user";
    const expectedErrorMessage =
      "Epic sadface: Sorry, this user has been locked out.";
    //Act
    await loginPage.login(userName, userPassword);
    //Assert
    await expect(loginPage.errorMessage).toHaveText(expectedErrorMessage);
  });
});
