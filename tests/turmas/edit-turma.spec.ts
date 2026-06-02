import { test, expect } from '@playwright/test';
import { TurmaPage } from '../../pages/TurmaPage';

test('Happy Path: Edit an existing turma', async ({ page }) => {
    const turmaPage = new TurmaPage(page);
    const description = 'Turma abençoada por Deus ' + Date.now();
    const originalYear = '2022';
    const editedYear = '2027'

    await turmaPage.goto();

    await turmaPage.createTurma('Fisioterapia', originalYear, '9ª Série / 9º Semestre', 'Vespertino', description);
    await turmaPage.submit();
    await expect(page.getByText('Turma salva com sucesso')).toBeVisible();

    await turmaPage.editTurma(description, originalYear, editedYear);
    await turmaPage.submit();
    await expect(page.getByText('Turma salva com sucesso')).toBeVisible();
});

test('Sad Path: Edit a turma without filling in one of the required fields', async ({ page }) => {
    const turmaPage = new TurmaPage(page);
    const description = 'Turma abençoada por Deus ' + Date.now();
    const originalYear = '2022';

    await turmaPage.goto();

    await turmaPage.createTurma('Fisioterapia', originalYear, '9ª Série / 9º Semestre', 'Vespertino', description);
    await turmaPage.submit();
    await expect(page.getByText('Turma salva com sucesso')).toBeVisible();

    await turmaPage.editTurma(description, originalYear, '');
    await turmaPage.submit();
    await expect(page.getByText('Ano é obrigatório')).toBeVisible();
});

test('Edge Path: Edit a turma with an invalid year', async ({ page }) => {
    const turmaPage = new TurmaPage(page);
    const description = 'Turma encapetada ' + Date.now();
    const originalYear = '2022';
    const invalidYear = '2028';

    await turmaPage.goto();

    await turmaPage.createTurma('Fisioterapia', originalYear, '9ª Série / 9º Semestre', 'Vespertino', description);
    await turmaPage.submit();
    await expect(page.getByText('Turma salva com sucesso')).toBeVisible();

    await turmaPage.editTurma(description, originalYear, invalidYear);
    await turmaPage.submit();
    await expect(page.getByText('O ano não pode ser superior a 2027.')).toBeVisible();
});