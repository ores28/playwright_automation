const { test, expect } = require('@playwright/test');
const path = require('path');

test.skip('Upload File', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com');   
    const element = page.locator('#singleFileInput');
    await element.scrollIntoViewIfNeeded();
    await element.setInputFiles(
        path.join(__dirname, 'EPP.pdf')
    );
    await page.locator('#multipleFilesInput').setInputFiles([
        path.join(__dirname, 'EPP.pdf'),
        path.join(__dirname, 'Leave Management System.pdf')
    ]);
    // await page.getByRole('button', { name: 'Point Me' }).hover();
    await page.waitForTimeout(5000);
}); 
test('Assignment2', async ({ page }) => {
    await page.goto('https://www.yatra.com/');
    // const element= await page.getByRole('img', { name: 'Join Yatra Prime Banner' });
    await page.getByRole('img', { name: 'Join Yatra Prime Banner' }).hover();
    // await page.locator('img[alt="Join Yatra Prime Banner"]').click({ button: 'right' });   
    await page.waitForTimeout(5000);
});