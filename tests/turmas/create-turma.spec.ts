import { test, expect } from '@playwright/test';
import { TurmaPage } from '../../pages/TurmaPage';

test('Happy Path: Create a new turma', async ({ page }) => {
    const turmaPage = new TurmaPage(page);
    await turmaPage.goto();
    await turmaPage.createTurma('Fisioterapia', '2024', '1ª Série / 1º Semestre', 'Vespertino', 'turma encapetada');
    await turmaPage.submit();
    await expect(page.getByText('Turma salva com sucesso')).toBeVisible();
});

test('Sad Path: Create a turma without filling in one of the required fields', async ({ page }) => {
    const turmaPage = new TurmaPage(page);
    await turmaPage.goto();
    await turmaPage.createTurma('', '2024', '1ª Série / 1º Semestre', 'Vespertino', '');
    await turmaPage.submit();
    await expect(page.getByText('Este campo é obrigatório')).toBeVisible();
});

test('Edge Path: Create a new turma with an invalid year', async ({ page }) => {
    const turmaPage = new TurmaPage(page);
    await turmaPage.goto();
    await turmaPage.createTurma('Fisioterapia', '2028', '1ª Série / 1º Semestre', 'Vespertino', '');
    await turmaPage.submit(); 
    await expect(page.getByText('O ano não pode ser superior a 2027.')).toBeVisible();
});