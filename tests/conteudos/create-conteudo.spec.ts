import { test, expect } from '@playwright/test';
import { ConteudoPage } from '../../pages/ConteudoPage';

test('Happy Path: Create a new content with valid data', async ({ page }) => {
    const conteudoPage = new ConteudoPage(page);
    const nomeConteudo = 'Conteudo Teste ' + Date.now();

    await conteudoPage.goto();
    await conteudoPage.createConteudo(nomeConteudo);
    await conteudoPage.submit();

    await expect(page.getByText('Conteúdo salvo com sucesso')).toBeVisible();
});

test('Sad Path: Create a content without filling in one of the required fields', async ({ page }) => {
    const conteudoPage = new ConteudoPage(page);

    await conteudoPage.goto();
    await conteudoPage.createConteudo('');
    await conteudoPage.submit();

    await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
});

test('Edge Path: Create a new content with a character limit', async ({ page }) => {
    const conteudoPage = new ConteudoPage(page);

    await conteudoPage.goto();
    await conteudoPage.createConteudo('A'.repeat(126));
    await conteudoPage.submit(); 
    
    await expect(page.getByText('O campo nome do conteúdo não pode ser superior a 125 caracteres.')).toBeVisible();
});