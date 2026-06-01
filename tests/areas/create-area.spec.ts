import { test, expect } from '@playwright/test';
import { AreaPage } from '../../pages/AreaPage';

test('Happy Path: Create a new area', async ({ page }) => {
    const areaPage = new AreaPage(page);
    await areaPage.goto();
    await areaPage.createArea('Área 51 brasileira ' + Date.now());
    await areaPage.submit();
    await expect(page.getByText('Área salva com sucesso')).toBeVisible();
});

test('Sad Path: Create a new area with link', async ({ page }) => {
    const areaPage = new AreaPage(page);
    await areaPage.goto();
    await areaPage.createArea('<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link suspeito</a>');
    await areaPage.submit();
    await expect(page.getByRole('link', { name: 'Link suspeito' })).not.toBeVisible();
});

test('Edge Path: Create a new area with a character limit', async ({ page }) => {
    const areaPage = new AreaPage(page);
    await areaPage.goto();
    await areaPage.createArea('A'.repeat(126));
    await areaPage.submit();
    await expect(page.getByText('O campo nome da área não pode ser superior a 125 caracteres.')).toBeVisible();
});