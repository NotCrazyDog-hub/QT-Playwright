import { test, expect } from '@playwright/test';
import { DisciplinaPage } from '../../pages/DisciplinaPage';

const AREA_PADRAO = 'Matemática e suas tecnologias';

test('Happy Path: Create a new discipline', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeDisciplina = 'Disciplina Teste ' + Date.now();

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeDisciplina, AREA_PADRAO);
    await disciplinaPage.submit();

    await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible();
});

test('Sad Path: Do not create a discipline without filling in the required fields.', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);

    await disciplinaPage.goto();
    await disciplinaPage.openCreateForm();
    await disciplinaPage.submit();

    await expect(page.locator('#subject-nome-error')).toBeVisible();
});

test('Edge Path: Do not create a discipline with a name exceeding the character limit.', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeGigante = 'A'.repeat(126);

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeGigante, AREA_PADRAO);
    await disciplinaPage.submit();

    await expect(page.getByText('O campo nome da disciplina não pode ser superior a 125 caracteres.')).toBeVisible();
});