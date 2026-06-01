import { Page } from '@playwright/test'

export class ConteudoPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://app.avaliei.com.br/dashboard');
        await this.page.getByRole('button', { name: 'Disciplinas' }).click();
        await this.page.getByRole('link', { name: 'Conteúdos' }).click();
        await this.page.waitForURL(/conteudos/);
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Salvar' }).click();
    }

    // CRIAR UM NOVO CONTEÚDO
    async createConteudo(conteudoName: string) {
        await this.page.getByRole('button', { name: 'Adicionar conteúdo' }).click();
        await this.page.getByRole('textbox', { name: 'Nome do Conteúdo:' }).fill(conteudoName);
        // Interações a serem adicionadas
    }
}