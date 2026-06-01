import { test, expect } from '@playwright/test';
import { AreaPage } from '../../pages/AreaPage';

test('Happy Path: Edit the name of an existing area', async ({ page }) => {
    const areaPage = new AreaPage(page);
    const originalName = 'Área Edit ' + Date.now();
    const editedName = 'Área Editada ' + Date.now();

    await areaPage.goto();
    await areaPage.createArea(originalName);
    await areaPage.submit();
    await expect(page.getByText('Área salva com sucesso')).toBeVisible();

    await areaPage.editArea(originalName, editedName);
    await areaPage.submit();

    await expect(page.getByText('Área salva com sucesso')).toBeVisible();
});

test('Sad Path: Edit an area to have an empty name.', async ({ page }) => {
    const areaPage = new AreaPage(page);
    const originalName = 'Área Link ' + Date.now();
    const editedName = '       ';

    await areaPage.goto();
    await areaPage.createArea(originalName);
    await areaPage.submit();
    await expect(page.getByText('Área salva com sucesso')).toBeVisible();

    await areaPage.editArea(originalName, editedName);
    await areaPage.submit();

    await expect(page.getByText('Este campo não pode conter apenas espaços em branco')).toBeVisible();
});