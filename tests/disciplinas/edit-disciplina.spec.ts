import { test, expect } from '@playwright/test';
import { DisciplinaPage } from '../../pages/DisciplinaPage';

const AREA_PADRAO = 'Matemática e suas tecnologias';

test('Happy Path: Edit the name of an existing discipline', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeOriginal = 'Disciplina Edit ' + Date.now();
    const nomeEditado = 'Disciplina Editada ' + Date.now();

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeOriginal, AREA_PADRAO);
    await disciplinaPage.submit();
    await page.waitForSelector('text=Disciplina salva com sucesso');

    await disciplinaPage.editDiscipline(nomeOriginal, nomeEditado);
    await disciplinaPage.submit();

    await expect(page.getByText('Disciplina salva com sucesso')).toBeVisible({ timeout: 10000 });
});

test('Sad Path: Do not save an edition with an empty name.', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeOriginal = 'Disciplina Edit Triste ' + Date.now();

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeOriginal, AREA_PADRAO);
    await disciplinaPage.submit();
    await page.waitForSelector('text=Disciplina salva com sucesso');

    await disciplinaPage.editDiscipline(nomeOriginal, '');
    await disciplinaPage.submit();

    await expect(page.locator('#subject-nome-error')).toBeVisible();
});

test('Edge Path: Do not save an edit with a name exceeding the character limit.', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeOriginal = 'Disciplina Edit Borda ' + Date.now();
    const nomeGigante = 'A'.repeat(126);

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeOriginal, AREA_PADRAO);
    await disciplinaPage.submit();
    await page.waitForSelector('text=Disciplina salva com sucesso');

    await disciplinaPage.editDiscipline(nomeOriginal, nomeGigante);
    await disciplinaPage.submit();

    await expect(page.getByText('O campo nome da disciplina não pode ser superior a 125 caracteres.')).toBeVisible();
});