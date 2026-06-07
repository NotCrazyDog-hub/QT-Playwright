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

    async searchConteudo(nome: string) {
        await this.page.getByPlaceholder('Pesquisar conteúdo...').fill(nome);
        await this.page.waitForTimeout(500); 
    }

    async createConteudo(conteudoName: string) {
        await this.page.getByRole('button', { name: 'Adicionar conteúdo' }).click();
        await this.page.getByRole('textbox', { name: 'Nome do Conteúdo:' }).fill(conteudoName);
        await this.page.getByRole('button', { name: 'Disciplina' }).click();
        await this.page.getByRole('option', { name: 'Biologia' }).click();
        
    }

    async editConteudo(nomeAtual: string, nomeNovo: string) {
        await this.searchConteudo(nomeAtual);
        await this.page.getByRole('row').filter({ hasText: nomeAtual }).waitFor();
        const linha = this.page.getByRole('row').filter({ hasText: nomeAtual });
        await linha.locator('button', { hasText: 'Editar' }).click();
        const campo = this.page.getByRole('textbox', { name: 'Nome do conteúdo: *' });
        await campo.clear();
        await campo.fill(nomeNovo);
    }
}