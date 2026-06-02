import { Page } from '@playwright/test'

export class TurmaPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/dashboard');
        await this.page.getByRole('button', { name: 'Turmas' }).click();
        await this.page.getByRole('link', { name: 'Turmas' }).click();
        await this.page.waitForURL(/turmas/);
    }

    async submit() {
        await this.page.getByRole('button', {name: 'Salvar'}).click();
    }

    async createTurma(courseName: string, year: string, series: string, shift: string) {
        await this.page.getByRole('button', {name: 'Adicionar nova turma'}).click();

        await this.page.getByRole('button', { name: 'Curso' }).click();
        await this.page.getByRole('option', { name: courseName }).click();
        
        await this.page.getByRole('textbox', { name: /Ano/ }).fill(year);

        await this.page.getByRole('combobox', { name: /Série/ }).click();
        await this.page.getByLabel(series).getByText(series).click();

        await this.page.getByRole('combobox', { name: /Turno/ }).click();
        await this.page.getByLabel(shift).getByText(shift).click();
    }
}