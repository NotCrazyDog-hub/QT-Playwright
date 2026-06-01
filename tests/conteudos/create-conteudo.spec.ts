import { test, expect } from '@playwright/test';
import { ConteudoPage } from '../../pages/ConteudoPage';

test('Happy Path: Create a new content with valid data', async ({ page }) => {
    const conteudoPage = new ConteudoPage(page);

    await conteudoPage.goto();
});