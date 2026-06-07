import { test, expect } from '@playwright/test';
import { AvaliacaoPage } from '../../pages/AvaliacaoPage';

test('Happy Path: Edit an existing avaliação', async ({ page }) => {
    const avaliacaoPage = new AvaliacaoPage(page);
    const description = 'Prova mega fácil ' + Date.now();
    const editedDescription = 'Prova muito difícil ' + Date.now();

    await avaliacaoPage.goto();

    await avaliacaoPage.createAvaliacao(description, 'E2e Super Teacher 28', 'Literatura');
    await avaliacaoPage.submit();
    await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();

    await avaliacaoPage.goto();
    await avaliacaoPage.editAvaliacao(description, editedDescription);
    await expect(page.getByText('Avaliação atualizada com sucesso!')).toBeVisible();
});

test('Sad Path: Try to edit an avaliação with empty description', async ({ page }) => {
    const avaliacaoPage = new AvaliacaoPage(page);
    const description = 'Prova mega fácil ' + Date.now();

    await avaliacaoPage.goto();

    await avaliacaoPage.createAvaliacao(description, 'E2e Super Teacher 28', 'Literatura');
    await avaliacaoPage.submit();
    await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();

    await avaliacaoPage.goto();
    await avaliacaoPage.editAvaliacao(description, '');
    await expect(page.getByText('A descrição é obrigatória')).toBeVisible();
});

test('Edge Path: Try to edit an avaliação with a very long description', async ({ page }) => {
    const avaliacaoPage = new AvaliacaoPage(page);
    const description = 'Prova mega fácil ' + Date.now();
    const longDescription = 'A'.repeat(256);
    
    await avaliacaoPage.goto();

    await avaliacaoPage.createAvaliacao(description, 'E2e Super Teacher 28', 'Literatura');
    await avaliacaoPage.submit();
    await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();

    await avaliacaoPage.goto();
    await avaliacaoPage.editAvaliacao(description, longDescription);
    await expect(page.getByText('A descrição deve ter no máximo 255 caracteres')).toBeVisible();
});