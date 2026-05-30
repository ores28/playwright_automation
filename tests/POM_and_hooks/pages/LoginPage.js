class LoginPage {
    constructor(page) {
        this.page = page;
        this.goToSignupLogin = page.locator("a[href='/login']");
        this.loginEmailInput = page.locator('[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('[data-qa="login-password"]');
        this.loginSubmitBtn = page.locator('[data-qa="login-button"]');
        this.loggedout = page.getByText('Logout')
        this.loggedInUser = page.locator('a').filter({ hasText: 'Logged in as ' });
        this.errorMessage = page.getByText('Your email or password is incorrect!')
    }
    async clickLogin() {
        await this.goToSignupLogin.waitFor({ state: 'visible' });
        await this.goToSignupLogin.click();
    }

    async fillAccountDetails(email, password) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        // await this.loginSubmitBtn.click();
    }

    async submitLogin() {
        await this.loginSubmitBtn.click();
    }
}
module.exports = { LoginPage };