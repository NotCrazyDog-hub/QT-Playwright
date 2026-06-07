import { test, expect } from '@playwright/test';
import { AvaliacaoPage } from '../../pages/AvaliacaoPage';

test('Happy Path: Create a new avaliação', async ({ page }) => {
    const avaliacaoPage = new AvaliacaoPage(page);
    
    await avaliacaoPage.goto();
    await avaliacaoPage.createAvaliacao('Farei todos os alunos pagarem pelos seus pecados', 'E2e Super Teacher 28', 'Fisioterapia');
    await avaliacaoPage.submit();
    await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();
});