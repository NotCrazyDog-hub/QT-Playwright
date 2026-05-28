import { Page } from '@playwright/test'

export class LoginPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/login');
    }
    async fillCredentials(email: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Senha' }).fill(password);
    }
    async submit() {
        await this.page.getByRole('button', { name: 'Entrar' }).click();
        await this.page.waitForURL(/2fa-codigo/);
    }
}