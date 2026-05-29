import { Page } from '@playwright/test'

export class AreaPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/dashboard');
        await this.page.getByRole('button', { name: 'Disciplinas' }).click();
        await this.page.getByRole('link', { name: 'Áreas' }).click();
        await this.page.waitForURL(/areas/);
    }
    // CRIAR UMA NOVA ÁREA
    async createArea(areaName: string) {
        await this.page.getByRole('button', { name: 'Adicionar área' }).click();
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(areaName);
    }
    async submit() {
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }
}