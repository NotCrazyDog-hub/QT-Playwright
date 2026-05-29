import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TwoFactorCodePage } from '../pages/TwoFactorCodePage';

setup('Authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const twoFactorCodePage = new TwoFactorCodePage(page);

  await loginPage.goto();
  await loginPage.fillCredentials(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await loginPage.submit();

  await twoFactorCodePage.fillCode(process.env.SECRET_2FA!);
  await twoFactorCodePage.submit();

  await page.context().storageState({ path: '.auth/session.json' });
});
