import { Page } from '@playwright/test'

export class TurmaPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/dashboard');
        await this.page.getByRole('button', { name: 'Turmas' }).click();
        await this.page.getByRole('link', { name: 'Turmas' }).click();
        await this.page.waitForURL(/turmas/);
    }

    async searchTurma(turmaName: string) {
        await this.page.getByPlaceholder('Pesquisar turma...').fill(turmaName);
        await this.page.waitForTimeout(500);
    }

    async submit() {
        await this.page.getByRole('button', {name: 'Salvar'}).click();
    }

    // CRIAR UMA NOVA TURMA
    async createTurma(courseName: string, year: string, series: string, shift: string, description: string) {
        await this.page.getByRole('button', {name: 'Adicionar nova turma'}).click();

        await this.page.getByRole('button', { name: 'Curso' }).click();
        await this.page.getByRole('option', { name: courseName }).click();
        
        await this.page.getByRole('textbox', { name: /Ano/ }).fill(year);

        await this.page.getByRole('combobox', { name: /Série/ }).click();
        await this.page.getByLabel(series).getByText(series).click();

        await this.page.getByRole('combobox', { name: /Turno/ }).click();
        await this.page.getByLabel(shift).getByText(shift).click();

        await this.page.getByRole('textbox', { name: /Descrição/ }).fill(description);
    }

    // EDITAR UMA TURMA
    async editTurma(query: string,oldYear: string, newYear: string) {
        await this.searchTurma(query);

        await this.page.getByRole('row').filter({ hasText: query }).waitFor();
        const row = this.page.getByRole('row').filter({ hasText: query });

        await row.getByRole('button', { name: 'Opções' }).click();
        await this.page.getByRole('menuitem', { name: 'Editar' }).click();

        const field = this.page.getByRole('textbox', { name: /Ano/ });
        await field.clear();
        await field.fill(newYear);
    }
}