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