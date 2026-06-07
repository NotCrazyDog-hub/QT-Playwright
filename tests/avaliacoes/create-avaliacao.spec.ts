import { test, expect } from '@playwright/test';
import { AvaliacaoPage } from '../../pages/AvaliacaoPage';

test('Happy Path: Create a new avaliação', async ({ page }) => {
    const avaliacaoPage = new AvaliacaoPage(page);
    
    await avaliacaoPage.goto();
    await avaliacaoPage.createAvaliacao('Farei todos os alunos pagarem pelos seus pecados', 'E2e Super Teacher 37', 'Filosofia');
    await avaliacaoPage.submit();
    await expect(page.getByText('Avaliação cadastrada com sucesso!')).toBeVisible();
});

test('Sad Path: Create a new avaliação without filling required fields', async ({ page }) => {
    const avaliacaoPage = new AvaliacaoPage(page);
    
    await avaliacaoPage.goto();
    await avaliacaoPage.createAvaliacao('', 'E2e Super Teacher 37', 'Filosofia');
    await avaliacaoPage.submit();
    await expect(page.getByText('Por favor, corrija os erros no formulário.')).toBeVisible();
});

test('Edge Path: Create a new avaliação with maximum length text', async ({ page }) => {
    const avaliacaoPage = new AvaliacaoPage(page);
    
    await avaliacaoPage.goto();
    await avaliacaoPage.createAvaliacao('Vou criar uma avaliação repleta de desafios. Esta prova refletirá cada dúvida, erro e noite de estudo. Nela, a nota máxima será uma lenda distante, enquanto questões implacáveis desafiarão os alunos numa batalha contra o tempo e o conhecimento. cruelmente.', 'E2e Super Teacher 37', 'Filosofia');
    await avaliacaoPage.submit();
    await expect(page.getByText('A descrição deve ter no máximo 255 caracteres')).toBeVisible();
});