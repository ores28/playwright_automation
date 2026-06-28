const { test, expect } = require('@playwright/test');
const MailosaurClient = require('mailosaur');
const { generateUsername, generateLastName, generateEmail, generatePhoneNumber, generatePassword, 
    generateAgencyName, generateRole, generateAgencyEmail, generateWebsite, generateAddress
 } = require('./utils');
require('dotenv').config();

test('complete signup flow', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://authorized-partner.vercel.app/');
    await page.waitForLoadState('networkidle'); 

    //Set up your Account
    await page.getByRole('link', { name: 'Get Started' }).click();
    await page.getByRole('checkbox').check();
    await page.getByText('Continue').click();
    await page.getByLabel('First Name').fill(generateUsername());
    await page.getByLabel('Last Name').fill(generateLastName());

    const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
    const serverId = 'wd2pmw4y';
    const testEmail = `user${Date.now()}@${serverId}.mailosaur.net`;
    await page.getByLabel('Email Address').fill(testEmail);

    await page.getByRole('textbox', { name: 'Phone Number' }).fill(generatePhoneNumber());
    await page.waitForTimeout(2000); 
    const password = generatePassword();
    await page.locator('input[name="password"]').fill(password);
    await page.locator('[name="confirmPassword"]').fill(password);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(5000);

    //Verification of Email through Mailosaur
    const signupEmail = await mailosaur.messages.get(
        serverId,
        {
            sentTo: testEmail,
            subject: 'Signup Confirm OTP'
        },
        {
            timeout: 60000
        }
    );
    expect(signupEmail.html.codes.length).toBeGreaterThan(0);
    const otp = signupEmail.html.codes[0].value;
    console.log('OTP received:', otp);
    const otpInput = page.locator('input').first();
    await otpInput.waitFor({ state: 'visible', timeout: 10000 });
    await otpInput.fill(otp);
    await page.getByRole('button', { name: 'Verify Code' }).click();
    
    //Agency Details
    await page.getByLabel('Name').fill(generateAgencyName());
    await page.getByLabel('Role in Agency').fill(generateRole());
    await page.getByLabel('Email Address').fill(generateAgencyEmail());
    await page.getByLabel('Website').fill(generateWebsite());
    await page.getByLabel('Address', { exact: true }).fill(generateAddress());

    await page.getByText('Select Your Region of Operation', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Search...' }).fill('Nepal');
    await page.getByText('Nepal', { exact: true }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(10000);

});
