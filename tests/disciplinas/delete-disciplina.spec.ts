import { test, expect } from '@playwright/test';
import { DisciplinaPage } from '../../pages/DisciplinaPage';

const AREA_PADRAO = 'Matemática e suas tecnologias';

test('Happy Path: Delete an existing discipline', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeDisciplina = 'Disciplina Delete ' + Date.now();

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeDisciplina, AREA_PADRAO);
    await disciplinaPage.submit();
    await page.waitForSelector('text=Disciplina salva com sucesso');

    await disciplinaPage.deleteDiscipline(nomeDisciplina);

    await expect(page.getByText('Disciplina excluída com sucesso')).toBeVisible({ timeout: 10000 });
});

test('Sad Path: Cancel the deletion of a discipline', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeDisciplina = 'Disciplina Delete Triste ' + Date.now();

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeDisciplina, AREA_PADRAO);
    await disciplinaPage.submit();
    await page.waitForSelector('text=Disciplina salva com sucesso');

    await disciplinaPage.searchDiscipline(nomeDisciplina);
    await page.getByRole('row').filter({ hasText: nomeDisciplina }).waitFor();
    await page.getByRole('row').filter({ hasText: nomeDisciplina }).locator('button', { hasText: 'Excluir' }).click();
    await page.getByRole('button', { name: 'Cancelar' }).click();

    await expect(page.getByRole('row').filter({ hasText: nomeDisciplina })).toBeVisible();
});

test('Edge Path: Delete a discipline and check it no longer appears in search', async ({ page }) => {
    const disciplinaPage = new DisciplinaPage(page);
    const nomeDisciplina = 'Disciplina Delete Borda ' + Date.now();

    await disciplinaPage.goto();
    await disciplinaPage.createDiscipline(nomeDisciplina, AREA_PADRAO);
    await disciplinaPage.submit();
    await page.waitForSelector('text=Disciplina salva com sucesso');

    await disciplinaPage.deleteDiscipline(nomeDisciplina);
    await page.waitForSelector('text=Disciplina excluída com sucesso');

    await disciplinaPage.searchDiscipline(nomeDisciplina);
    await expect(page.getByRole('row').filter({ hasText: nomeDisciplina })).not.toBeVisible();
});