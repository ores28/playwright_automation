class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginBtn = page.getByText('Signup / Login');
        this.productsBtn = page.locator("//a[@href='/products']");
    }

    async goto() {
    await this.page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
}
    async goToSignupLogin() {
        await this.signupLoginBtn.click();
    }
    async goToProducts() {
        await this.productsBtn.click();
    }
}

module.exports = { HomePage };