import { test, expect } from '@playwright/test';
import { ConteudoPage } from '../../pages/ConteudoPage';

test('Happy Path: Edit the name of an existing content', async ({ page }) => {
    const conteudoPage = new ConteudoPage(page);
    const nomeOriginal = 'Conteúdo Edit ' + Date.now();
    const nomeEditado = 'Conteúdo Editada ' + Date.now();

    await conteudoPage.goto();
    await conteudoPage.createConteudo(nomeOriginal);
    await conteudoPage.submit();
    await page.waitForSelector('text=Conteúdo salvo com sucesso');

    await conteudoPage.editConteudo(nomeOriginal, nomeEditado);
    await conteudoPage.submit();

    await expect(page.getByText('Conteúdo salvo')).toBeVisible({ timeout: 10000 });
});

test('Sad Path: Do not save an edition with an empty name.', async ({ page }) => {
    const conteudoPage = new ConteudoPage(page);
    const nomeOriginal = 'Conteúdo Edit Triste ' + Date.now();

    await conteudoPage.goto();
    await conteudoPage.createConteudo(nomeOriginal);
    await conteudoPage.submit();
    await page.waitForSelector('text=Conteúdo salvo com sucesso');

    await conteudoPage.editConteudo(nomeOriginal, '');
    await conteudoPage.submit();

    await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
});

test('Edge Path: Do not save an edit with a name exceeding the character limit.', async ({ page }) => {
    const conteudoPage = new ConteudoPage(page);
    const nomeOriginal = 'Disciplina Edit Borda ' + Date.now();
    const nomeGigante = 'A'.repeat(126);

    await conteudoPage.goto();
    await conteudoPage.createConteudo(nomeOriginal);
    await conteudoPage.submit();
    await page.waitForSelector('text=Conteúdo salvo com sucesso');

    await conteudoPage.editConteudo(nomeOriginal, nomeGigante);
    await conteudoPage.submit();

    await expect(page.getByText('O campo nome do conteúdo não pode ser superior a 125 caracteres.')).toBeVisible();
});