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

    async createAvaliacao(avaliacaoDescription: string, professorName: string, disciplinaName: string) {
        await this.page.getByRole('button', {name: 'Criar Avaliação'}).click();
        await this.page.getByRole('textbox', { name: 'Descrição da avaliação: *' }).fill(avaliacaoDescription);
        await this.page.getByText('Selecionar turmas').first().click();
        await this.page.getByRole('button', { name: 'Professor' }).click();
        await this.page.getByRole('option', { name: professorName }).click();
        await this.page.getByRole('combobox', { name: 'Selecionar disciplina para' }).click();
        await this.page.getByRole('option', { name: disciplinaName }).click();
        await this.page.getByRole('spinbutton', { name: 'Quantidade de questões para' }).fill('10');
    }
}