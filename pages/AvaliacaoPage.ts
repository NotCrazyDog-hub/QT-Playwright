import { Page } from '@playwright/test'

export class AvaliacaoPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/dashboard');
        await this.page.getByRole('link', { name: 'Avaliações' }).click();
        await this.page.waitForURL(/avaliacoes/);
    }

    async submit() {
        await this.page.getByRole('button', {name: 'Salvar avaliação'}).click();
    }

    // TESTE
    async searchAvaliacao(query: string) {
        await this.page.getByPlaceholder('Pesquisar avaliações...').fill(query);
        await this.page.getByRole('button', { name: 'Aplicar' }).click();
    }

    async createAvaliacao(avaliacaoDescription: string, professorName: string, disciplinaName: string) {
        await this.page.getByRole('button', {name: 'Criar Avaliação'}).click();
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(avaliacaoDescription);
        await this.page.getByRole('combobox', { name: 'Turmas' }).click();
        await this.page.getByRole('option').first().click();
        await this.page.getByRole('button', { name: 'Professor' }).click();
        await this.page.getByRole('option', { name: professorName }).click();
        await this.page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
        await this.page.getByRole('option', { name: disciplinaName }).click();
        await this.page.getByRole('spinbutton', { name: 'Quantidade de questões para' }).fill('10');
    }

    // TESTE
    async editAvaliacao(query: string, newDescription: string) {
        await this.searchAvaliacao(query);
        await this.page.locator('h3').filter({ hasText: query }).waitFor({ state: 'visible' });
        const card = this.page.locator('h3').filter({ hasText: query }).locator('xpath=ancestor::*[@data-slot="card-content"]');
        await card.getByRole('button', { name: 'Mais Ações' }).click();
        await this.page.getByRole('menuitem', { name: 'Editar' }).click();
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(newDescription);
        await this.page.getByRole('button', { name: 'Salvar Alterações' }).click();
    }
}