import { test } from '@playwright/test';
import { AreaPage } from '../../pages/AreaPage';

test('Happy Path: Create a new area', async ({ page }) => {
    const areaPage = new AreaPage(page);

    await areaPage.goto();
    await areaPage.createArea('Área 51 brasileira');
    await areaPage.submit();
});