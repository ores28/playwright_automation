// const { test, expect } = require('@playwright/test');
// const path = require('path');
// const { generateFiles } = require('./utilsdynamic');

// test('Dynamic Upload File', async ({ page }) => {
//     await page.goto('https://testautomationpractice.blogspot.com');   
//     const element = page.locator('#singleFileInput');
//     await element.scrollIntoViewIfNeeded();
//     const fileToUpload = generateFiles();
//     await element.setInputFiles(
//         path.join(__dirname, fileToUpload)
//     );
//     //Clears the input, Uploads a new file, Repeats multiple times


// });

const { test, expect } = require('@playwright/test');
const path = require('path');
const { generateFiles } = require('./utilsdynamic');

test('Dynamic Upload File', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com');   

    const element = page.locator('#singleFileInput');
    await element.scrollIntoViewIfNeeded();

    // Loop for multiple uploads
    for (let i = 0; i < 5; i++) {   // change 5 → any number you want
        console.log(`Upload iteration: ${i + 1}`);

        // Generate unique file
        const file = generateFiles();

        // Upload file
        await element.setInputFiles(path.join(__dirname, file));

        // Wait to simulate user observation
        await page.waitForTimeout(1000);

        // Clear input properly
        await element.evaluate(el => el.value = '');

        // Small wait for DOM reset
        await page.waitForTimeout(500);
    }
});



