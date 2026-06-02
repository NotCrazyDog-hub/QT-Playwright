import { test, expect } from '@playwright/test';
import { TurmaPage } from '../../pages/TurmaPage';

test('Happy Path: Create a new turma', async ({ page }) => {
    const turmaPage = new TurmaPage(page);
    await turmaPage.goto();
    await turmaPage.createTurma('Fisioterapia', '2024', '1ª Série / 1º Semestre', 'Vespertino');
    await turmaPage.submit();
    await expect(page.getByText('Turma salva com sucesso')).toBeVisible();
});