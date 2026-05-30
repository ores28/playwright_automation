const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SignupPage } = require('../pages/SignupPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { LoginPage } = require('../pages/LoginPage');

const {
    generateUsername, generatePassword, generateEmail,
    generateDay, generateMonth, generateYear,
    generateCompanyName, generateCity, generateState,
    generatePhone_number, generateLastName, generateAddress,generateZipcode
} = require('../utils');

test('Home page', async ({ page }) => {

    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const products = new ProductPage(page);
    const cart = new CartPage(page);
    const login = new LoginPage(page);
    await home.goto();
    await home.goToSignupLogin();

    const userData = {
        name: generateUsername(),
        email: generateEmail(),
        password: generatePassword(),
        day: generateDay().toString(),
        month: generateMonth().toString(),
        year: generateYear().toString(),
        firstName: generateUsername(),
        lastName: generateLastName(),
        company: generateCompanyName(),
        address: generateAddress(),
        state: generateState(),
        city: generateCity(),
        zipcode: generateZipcode(),
        mobile: generatePhone_number()
    };

    await signup.signup(userData.name, userData.email);
    await signup.fillAccountDetails(userData);
    await signup.submitSignup();
    // ensure we are logged out before attempting to navigate to the login page
    await login.loggedout.click();

    await login.clickLogin();
    await login.fillAccountDetails(userData.email, userData.password);
    await login.submitLogin();

    await home.goToProducts();
    await products.addFirstProductToCart();
    await products.goToCart();

    // await page.waitForLoadState('networkidle');
});
