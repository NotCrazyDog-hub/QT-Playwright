import { Page } from '@playwright/test';

export class DisciplinaPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/disciplinas');
    }

    async openCreateForm() {
        await this.page.getByRole('button', { name: 'Adicionar disciplina' }).click();
    }

    async createDiscipline(nome: string, area: string) {
        await this.page.getByRole('button', { name: 'Adicionar disciplina' }).click();
        await this.page.getByRole('textbox', { name: 'Nome da disciplina: *' }).fill(nome);
        await this.page.getByRole('button', { name: 'Selecione a área da disciplina' }).click();
        await this.page.getByRole('option', { name: area }).click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

//   // Abre edição pelo índice (0 = primeira disciplina da lista)
//     async abrirEdicao(indice: number) {
//         await this.page.getByRole('button', { name: 'Editar' }).nth(indice).click();
//     }

//   // Clica em excluir na listagem
//     async clicarExcluir(indice: number) {
//         await this.page.getByRole('button', { name: 'Excluir' }).nth(indice).click();
//     }

//   // Confirma a exclusão no modal
//     async confirmarExclusao() {
//         await this.page.getByRole('button', { name: 'Excluir' }).click();
//     }
}