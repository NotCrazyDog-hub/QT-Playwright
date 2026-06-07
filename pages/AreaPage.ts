import { Page } from '@playwright/test'

export class AreaPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/dashboard');
        await this.page.getByRole('button', { name: 'Disciplinas' }).click();
        await this.page.getByRole('link', { name: 'Áreas' }).click();
        await this.page.waitForURL(/areas/);
    }

    async searchArea(areaName: string) {
        await this.page.getByPlaceholder('Pesquisar área...').fill(areaName);
        await this.page.waitForTimeout(500);
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    async createArea(areaName: string) {
        await this.page.getByRole('button', { name: 'Adicionar área' }).click();
        await this.page.getByRole('textbox', { name: 'Nome da Área:' }).fill(areaName);
    }

    async editArea(oldName: string, newName: string) {
        await this.searchArea(oldName);
        await this.page.getByRole('row').filter({ hasText: oldName }).waitFor();
        const row = this.page.getByRole('row').filter({ hasText: oldName });
        await row.getByRole('button', { name: 'Editar' }).click();
        const field = this.page.getByRole('textbox', { name: 'Nome da Área:' });
        await field.clear();
        await field.fill(newName);
    }
}