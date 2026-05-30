class CartPage {
    constructor(page) {
        this.page = page;

        this.cartItems = page.locator('.cart_product');
        this.checkoutBtn = page.getByText('Proceed To Checkout');
        this.removeBtn = page.locator('a.cart_quantity_delete');
        this.totalPrice = page.locator('p.cart_total_price');
        this.emptyCartMessage = page.getByText('Cart is empty!', { exact: true });
        this.checkoutPage = page.getByText('Checkout', { exact: true });
    }

    async removeItem() {
        await this.removeBtn.first().click();
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click();
    }
}
module.exports = { CartPage };