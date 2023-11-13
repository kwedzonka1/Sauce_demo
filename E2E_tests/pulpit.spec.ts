import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";
import { CartPage } from "../pages/cart.page";

test.describe("Pulpit tests", () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  let cartPage: CartPage;
  let userPassword;
  let userName;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    cartPage = new CartPage(page);

    userPassword = "secret_sauce";
    userName = "standard_user";

    await page.goto("/");
    await loginPage.login(userName, userPassword);
  });

  test("successful buying products", async ({ page }) => {
    //Arrange
    const userFirstName = "Dagmara";
    const userLastName = "Nowak";
    const postalCode = "1234";
    const expectedMessage = "Thank you for your order!";
    const expectedHeaderText = "Products";
    await pulpitPage.backpackAddButton.click();
    await pulpitPage.tshirtAddButton.click();
    await pulpitPage.redTshirtAddButton.click();
    await pulpitPage.shopingCart.click();
    //Act
    await cartPage.checkoutButton.click();
    await cartPage.userFirstNameFild.fill(userFirstName);
    await cartPage.userLastNameFild.fill(userLastName);
    await cartPage.postalCodeFild.fill(postalCode);
    await cartPage.continueButton.click();
    await cartPage.finishButton.click();
    //Assert
    await expect(cartPage.successBuyingMessage).toContainText(expectedMessage);
    await cartPage.backHomeButton.click();
    await expect(pulpitPage.pulpitHeaderTitle).toHaveText(expectedHeaderText);
  });

  test("successful adding products to cart", async ({ page }) => {
    //Arrange
    const expectedCounterAfterAdded = "2";
    //Act
    await pulpitPage.backpackAddButton.click();
    await pulpitPage.tshirtAddButton.click();
    await pulpitPage.shopingCart.click();
    //Assert
    await expect(cartPage.cartCounter).toHaveText(expectedCounterAfterAdded);
  });

  test.afterEach(async ({ page }) => {
    await pulpitPage.logout();
  });
});
