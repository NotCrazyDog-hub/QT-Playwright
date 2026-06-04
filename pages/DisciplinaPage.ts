import { Page } from '@playwright/test';

export class DisciplinaPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/disciplinas');
    }

    async openCreateForm() {
        await this.page.getByRole('button', { name: 'Adicionar disciplina' }).click();
    }

    async searchDiscipline(nome: string) {
        await this.page.getByPlaceholder('Pesquisar disciplina...').fill(nome);
        await this.page.waitForTimeout(500); // aguarda o debounce da pesquisa
}

    async createDiscipline(nome: string, area: string) {
        await this.page.getByRole('button', { name: 'Adicionar disciplina' }).click();
        await this.page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill(nome);
        await this.page.getByRole('button', { name: 'Selecione a área da disciplina' }).click();
        await this.page.getByRole('option', { name: area }).click();
    }

    async editDiscipline(nomeAtual: string, nomeNovo: string) {
        await this.searchDiscipline(nomeAtual);
        await this.page.getByRole('row').filter({ hasText: nomeAtual }).waitFor();
        const linha = this.page.getByRole('row').filter({ hasText: nomeAtual });
        await linha.locator('button', { hasText: 'Editar' }).click();
        const campo = this.page.getByRole('textbox', { name: 'Nome da disciplina: *' });
        await campo.clear();
        await campo.fill(nomeNovo);
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }
}