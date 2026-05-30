class ProductPage {
    constructor(page) {
        this.page = page;

        // this.products = page.locator('div.single-products');
        // this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' }); //await page.locator('div.features_items')
        // this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
        // this.addToCartBtn = page.locator('a').filter({ hasText: 'Add to cart' }).first()
        this.productList = page.locator('div.features_items')
        // target product item cards more specifically to avoid matching unrelated divs
        this.products = page.locator('div.features_items .col-sm-4')

        this.firstProduct = this.products.first();
        // 'View Product' is the visible text for the product detail link
        this.viewProductBtn = this.firstProduct.getByText('View Product', { exact: true });

        // 'Add to cart' appears inside the product card; use text-based lookup scoped to the card
        // target the anchor with the add-to-cart class to avoid duplicate text elements
        this.addToCartBtn = this.firstProduct.locator('a.add-to-cart').first();

        this.cartPopup = page.locator('div.modal-content')
        this.viewCartLink = page.getByText('Cart', { exact: true })

        this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');

        // this.searchInput = page.locator('#search_product');
        // this.searchBtn = page.locator('#submit_search');
        // this.searchResults = page.locator('.features_items');

        this.productDetail = page.locator('div.product-information')
    }

//     async addRandomProductToCart() {
//         const count = await this.products.count();
//         const randomIndex = Math.floor(Math.random() * count);

//         const product = this.products.nth(randomIndex);

//         // Hover is required to reveal "Add to cart"
//         await product.hover();

//         await this.addToCartBtn.click();

//         // Wait for modal and choose to go to cart
//         // await this.viewCartLink.click();
//     }

 async openFirstProduct() {
        await this.viewProductBtn.click();
    }

    async addFirstProductToCart() {
        // Avoid hover because third-party iframes/ads may intercept pointer events.
        // Click the add-to-cart anchor directly and wait for the cart modal to appear.
        // Use a DOM click via element handle to avoid pointer interception by iframes/ads
        const handle = await this.addToCartBtn.elementHandle();
        if (handle) {
            await this.page.evaluate((el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window })), handle);
        } else {
            await this.addToCartBtn.click();
        }
        await this.cartPopup.waitFor({ state: 'visible', timeout: 10000 });
        const continueHandle = await this.continueShoppingBtn.elementHandle();
        if (continueHandle) {
            await this.page.evaluate((el) => el.click(), continueHandle);
        } else {
            await this.continueShoppingBtn.click();
        }
    }

    async goToCart() {
        // Navigate directly to the cart page to avoid relying on the modal
        await this.page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded', timeout: 10000 });
    }

}


module.exports = { ProductPage };