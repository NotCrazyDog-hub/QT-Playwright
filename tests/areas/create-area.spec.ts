import { test, expect } from '@playwright/test';
import { AreaPage } from '../../pages/AreaPage';

test('Happy Path: Create a new area', async ({ page }) => {
    const areaPage = new AreaPage(page);

    await areaPage.goto();
    await areaPage.createArea('Área 51 brasileira ' + Date.now());
    await areaPage.submit();
});

test('Sad Path: Create a new area with link', async ({ page }) => {
    const areaPage = new AreaPage(page);

    await areaPage.goto();
    await areaPage.createArea('<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link suspeito</a>');
    await areaPage.submit();

    await expect(page.getByRole('link', { name: 'Link suspeito' })).not.toBeVisible();
});