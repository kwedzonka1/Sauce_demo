import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { MenuPage } from "../pages/menu.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Login tests", () => {
  let loginPage: LoginPage;
  let menuPage: MenuPage;
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
    menuPage = new MenuPage(page);
    pulpitPage = new PulpitPage(page);
  });

  test("successfull login with correct credentials and successfull logout", async ({
    page,
  }) => {
    //Arrange
    const userName = "standard_user";
    const userPassword = "secret_sauce";
    const expectedHeaderText = "Products";
    const expextedAcceptedUsernameHeaderTitle = "Accepted usernames are:";
    //Act
    await loginPage.login(userName, userPassword);
    //Assert
    await expect(pulpitPage.pulpitHeaderTitle).toHaveText(expectedHeaderText);
    //Act
    await menuPage.menuButton.click();
    await menuPage.logoutLink.click();
    //Assert
    await expect(loginPage.acceptedUsernameHeader).toHaveText(
      expextedAcceptedUsernameHeaderTitle
    );
  });

  test("unsuccessfull login with locked out user name", async ({ page }) => {
    //Arrange
    const userName = "locked_out_user";
    const userPassword = "secret_sauce";
    const expectedErrorMessage =
      "Epic sadface: Sorry, this user has been locked out.";
    //Act
    await loginPage.login(userName, userPassword);
    //Assert
    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText(expectedErrorMessage);
  });
});
