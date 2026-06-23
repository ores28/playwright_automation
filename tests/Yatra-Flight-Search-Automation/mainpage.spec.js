const { test, expect } = require("@playwright/test");
test.setTimeout(240000);
test("Testing home page", async ({ page }) => { 
  let apiData;

  // capture API response
  page.on('response', async (response) => {
    if (response.url().includes('air-search') && response.status() === 200) {
      try {
        apiData = await response.json();
      } catch (e) {}
    }
  });

  await page.goto("https://flight.yatra.com/air-search-ui/int2/trigger?ADT=4&CHD=0&INF=0&arrivalDate=31/05/2026&class=Economy&destination=KTM&destinationCountry=NP&flight_depart_date=27/05/2026&hb=0&noOfSegments=2&origin=YYC&originCountry=CA&type=R&unique=315792495815&version=1.1&viewName=normal", {
    waitUntil: "domcontentloaded"
  });
  await page.goto("https://www.yatra.com/");
  
  await page.getByText("Departure From", { exact: true }).click();
  await page.getByLabel("Departure From", { exact: true }).fill("Cal");
  
  const suggestions = page.locator("ul:visible div");
  await suggestions.first().waitFor({ state: "visible" });
  
  const count = await suggestions.count();
  
  for (let i = 0; i < count; i++) {
    const text = await suggestions.nth(i).innerText();
  
    if (text.includes("Calgary")) {
      await suggestions.nth(i).click();
      break;
    }
  }
  // await page.waitForTimeout(5000);
  await page.getByText("Going To", { exact: true }).click();
  
  const goingToInput = page.getByRole("textbox", { name: "Going To" });
  await goingToInput.fill("Kath");
  
  const dropdown = page.locator("ul:visible").first();
  await dropdown.waitFor({ state: "visible" });
  await dropdown.getByText("Kathmandu", { exact: true }).click();
  await page.getByText('Departure Date', { exact: true }).click();
  await page.getByRole('option', { name: 'Choose Saturday, June 27th, 2026' }).click();
  await page.getByText('Return Date', { exact: true }).click();
  await page.getByRole('option', { name: 'Choose Sunday, June 28th, 2026' }).click();
  // await page.waitForTimeout(5000);
  await page.getByText('Travellers & Class', { exact: true }).click();
  await page.locator('li').filter({ hasText: '4' }).first().click();
  // await page.getByRole('button', { name: 'Done' }).click();
  await page.locator('button:visible').filter({ hasText: 'Done' }).first().click();
  // await page.getByRole('button', { name: 'Search' }).filter({ hasText: 'Search' });
  await page.getByText('Search', { exact: true }).click();
  const flights = page.locator("div.js-flightItem");
  await expect(flights.first()).toBeVisible({ timeout: 60000 });

  const prices = new Set();
  let previousPriceCount = 0;
  let stableScrolls = 0;
  let iterations = 0;
  const maxIterations = 40; // safety cap to avoid indefinite scrolling

  while (stableScrolls < 5 && iterations < maxIterations) {
    iterations++;
    const visiblePrices = await page.locator('div.js-flightItem p[id^="fare-"]').allInnerTexts();

    for (const fareText of visiblePrices) {
      const price = Number(fareText.replace(/[^\d]/g, ""));

      if (price > 0) {
        prices.add(price);
      }
    }

    console.log("Prices collected so far:", prices.size);

    if (prices.size === previousPriceCount) {
      stableScrolls++;
    } else {
      stableScrolls = 0;
      previousPriceCount = prices.size;
    }

    await page.mouse.wheel(0, 2500);
     await page.waitForTimeout(500);
  }

  if (iterations >= maxIterations) {
    console.warn(`Reached max scroll iterations (${maxIterations}) before stabilizing prices.`);
  }

  const allPrices = [...prices];
  
  console.log("Total unique flight prices found:", allPrices.length);

  if (allPrices.length > 0) {
    console.log("Cheapest:", Math.min(...allPrices));
    console.log("Most Expensive:", Math.max(...allPrices));
  } else {
    console.log("No flight prices found");
  }
});

