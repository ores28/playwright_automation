const { test, expect } = require('@playwright/test');

const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { SignupPage } = require('../pages/SignupPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

const data = require('../utils');
const fs = require('fs');

let home, login, signup, product, cart;
let user;

test.beforeEach(async ({ page }) => {

    home = new HomePage(page);
    signup = new SignupPage(page);
    product = new ProductPage(page);
    cart = new CartPage(page);
    login = new LoginPage(page);

    // Dynamic user for every test
    user = {
        firstName: data.generateUsername(),
        lastName: data.generateLastName(),
        email: data.generateEmail(),
        password: data.generatePassword(),
        day: data.generateDay().toString(),
        month: data.generateMonth().toString(),
        year: data.generateYear().toString(),
        company: data.generateCompanyName(),
        address: data.generateAddress(),
        city: data.generateCity(),
        state: data.generateState(),
        country: data.generateCountry(),
        zipcode: data.generateZipcode(),
        mobile: data.generatePhone_number()
    };

    await home.goto();
});
test.afterEach(async ({ page }, testInfo) => {

    if (testInfo.status !== testInfo.expectedStatus) {
        try {
            const dir = 'screenshots';
            fs.mkdirSync(dir, { recursive: true });
            // sanitize title for a safe filename on all platforms
            const safeTitle = testInfo.title.replace(/[<>:"/\\|?*]+/g, '_');
            const filePath = `${dir}/${safeTitle}.png`;
            if (!page.isClosed && !page.isClosed()) {
                await page.screenshot({ path: filePath, fullPage: true });
                console.log('Saved failure screenshot:', filePath);
            } else {
                console.warn('Page is closed; skipping screenshot for', testInfo.title);
            }
        } catch (err) {
            console.error('Failed to capture screenshot in afterEach:', err);
        }
    }

    // logout safety
    try {
        if (await page.getByRole('link', { name: 'Logout' }).isVisible({ timeout: 2000 })) {
            await page.getByRole('link', { name: 'Logout' }).click();
        }
    } catch {} // Ignoring errors during logout
});
test.describe('Authentication Module', () => { //.configure({mode: 'serial'})

    test('Signup with all necessary data', async () => {
        await home.goToSignupLogin();
        await signup.signup(user.firstName, user.email);
        // await signup.fillAccountDetails(user);
        // await signup.submitSignup();
        await signup.fillAccountDetails(user);

        await expect(signup.successMessage).toBeVisible();
    });

    test('Signup with existing email', async () => {
        await home.goToSignupLogin();
        // First time
        await signup.signup(user.firstName, user.email);
        await signup.fillAccountDetails(user);
        await signup.submitSignup();
        await login.loggedout.click();
        // Second attempt
        await home.goToSignupLogin();
        await signup.signup(user.firstName, user.email);

        await expect(signup.emailExistsError).toBeVisible();
    });

    test('Login with valid credentials', async () => {
        // create user first
        await home.goToSignupLogin();
        await signup.signup(user.firstName, user.email);
        await signup.fillAccountDetails(user);
        await signup.submitSignup();
        await login.loggedout.click();

        await home.goToSignupLogin();
        await login.fillAccountDetails(user.email, user.password);
        await login.submitLogin();

        await expect(login.loggedInUser).toBeVisible();
    });

    test('Login with invalid credentials', async () => {
        await home.goToSignupLogin();

        await login.fillAccountDetails('fake@mail.com', 'wrongpass');
        await login.submitLogin();

        await expect(login.errorMessage).toBeVisible();
    });

});

test.describe('Product Module', () => {

    test('View all products', async () => {
        await home.goToProducts();
        await expect(product.productList).toBeVisible();
    });
    
    test('View product details', async () => {
        await home.goToProducts();
        await product.openFirstProduct();

        await expect(product.productDetail).toBeVisible();
    });

    test('Add product to cart', async () => {
        await home.goToProducts();
        await product.addFirstProductToCart();

        // verify by navigating to the cart page instead of relying on the modal
        await product.goToCart();
        await expect(cart.cartItems).toBeVisible();
    });

});

test.describe('Cart Module', () => {

    test('Add product and verify in cart', async () => {
        await home.goToProducts();
        await product.addFirstProductToCart();
        await product.goToCart();

        await expect(cart.cartItems).toBeVisible();
    });

    test('Remove product from cart', async () => {
        await home.goToProducts();
        await product.addFirstProductToCart();
        await product.goToCart();

        await cart.removeItem();

        await expect(cart.emptyCartMessage).toBeVisible();
    });

    test('Proceed to checkout', async () => {
        await home.goToProducts();
        await product.addFirstProductToCart();
        await product.goToCart();

        await cart.proceedToCheckout();

        await expect(cart.checkoutPage).toBeVisible();
    });

});