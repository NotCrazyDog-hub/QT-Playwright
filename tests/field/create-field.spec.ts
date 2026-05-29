import { test } from '@playwright/test';
import { FieldPage } from '../../pages/FieldPage';

test('Happy Path: Create a new field', async ({ page }) => {
    const fieldPage = new FieldPage(page);

    await fieldPage.goto();
    await fieldPage.createField('Área 51 brasileira');
    await fieldPage.submit();
});