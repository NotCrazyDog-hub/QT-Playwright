import { Page } from '@playwright/test'
import * as OTPAuth from 'otpauth';

export class TwoFactorCodePage {
    constructor(private page: Page) {}

    async fillCode(secret: string) {
        const otp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromBase32(secret),
            digits: 6,
            period: 30,
            algorithm: 'SHA1',
        }).generate();

        await this.page.getByPlaceholder('000000').fill(otp);
    }
    async submit() {
        await this.page.getByRole('button', { name: 'Verificar Código' }).click();
        await this.page.waitForURL(/dashboard/);
    }
}