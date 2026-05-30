const { test, expect } = require('@playwright/test');
const { generateUsername, generatePassword, generateEmail, generateDay, generateMonth, 
    generateYear, generateCompanyName, generateCity, generateAddress,
    generateState, generatePhone_number, generateZipcode ,generateLastName} = require('../utils');

test('Home page', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await page.getByText('Signup / Login').click();
    const signupForm = page.locator('form').filter({ hasText: 'Signup' });

    await signupForm.getByPlaceholder('Name').fill(generateUsername());
    await signupForm.getByPlaceholder('Email Address').fill(generateEmail());
    await signupForm.getByRole('button', { name: 'Signup' }).click();
    // await page.getByPlaceholder('Name').fill(generateUsername());
    // await page.getByPlaceholder('Email Address').fill(generateEmail());
    // await page.getByRole('button', { name: 'Signup' }).click();

    await page.getByLabel('Mrs.').check();
    await page.getByRole('textbox', { name: 'Password *' }).fill(generatePassword());

    await page.locator('#days').selectOption(generateDay().toString());
    await page.locator('#months').selectOption(generateMonth().toString());
    await page.locator('#years').selectOption(generateYear().toString());

    await page.getByLabel('Sign up for our newsletter!').check();
    await page.getByLabel('Receive special offers from our partners!').check();

    await page.getByRole('textbox', { name: 'First name *' }).fill(generateUsername());
    await page.getByRole('textbox', { name: 'Last name *' }).fill(generateLastName());

    await page.locator('[name="company"]').fill(generateCompanyName());
    await page.locator('#address1').fill(generateAddress());

    await page.getByRole('combobox', { name: 'Country *' }).selectOption('Canada');
    await page.getByRole('textbox', { name: 'State *' }).fill(generateState());
    await page.getByRole('textbox', { name: 'City *' }).fill(generateCity());

    await page.locator('input[name="zipcode"]').fill(generateZipcode());
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(generatePhone_number());

    await page.getByText('Create Account').click();
    await page.getByRole('link', { name: 'Continue' }).click();

    await page.locator("//a[@href='/products']").click();

    const products = page.locator('div.single-products');
    const count = await products.count();

    const randomIndex = Math.floor(Math.random() * count);
    // await products.nth(randomIndex).click();
    //hovering over the product to reveal add to cart button
    await products.nth(randomIndex).hover();
    await products.nth(randomIndex).locator('a').filter({ hasText: 'Add to cart' }).first().click();
    await page.getByRole('link', { name: 'View Cart' }).click();

    // networkidle can hang on some pages; wait for DOM ready instead
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
});