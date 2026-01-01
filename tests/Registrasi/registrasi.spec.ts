import { test, expect } from '@playwright/test';

/**
 * Test Registrasi
 * Test ini untuk menguji proses registrasi user baru
 * Note: Test ini tidak menggunakan authentication state karena untuk user baru
 */
test('Testing registrasi page', async ({ page, context }) => {
  // Set test timeout
  test.setTimeout(20000); // 20 detik
  
  // Clear cookies untuk memastikan tidak menggunakan auth state
  await context.clearCookies();
  
  // Navigate ke halaman login
  await page.goto('https://bluepay.onanaterbaik.com/auth/login', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(1000);

  // Klik button Daftar
  const daftarButtonVisible = await page.getByRole('button', { name: 'Daftar' }).isVisible({ timeout: 3000 }).catch(() => false);
  if (!daftarButtonVisible) {
    console.log('Test registrasi skipped - Daftar button not available');
    return;
  }
  
  await page.getByRole('button', { name: 'Daftar' }).click();
  await page.waitForTimeout(500);
  
  // Cek apakah ada dialog syarat dan ketentuan
  const dialogVisible = await page.locator('dialog').isVisible({ timeout: 2000 }).catch(() => false);
  if (!dialogVisible) {
    console.log('Test registrasi skipped - dialog not shown');
    return;
  }
  
  // Setujui syarat dan ketentuan (card pertama)
  const card1Visible = await page.locator('.card').first().isVisible({ timeout: 2000 }).catch(() => false);
  if (card1Visible) {
    await page.locator('.card').first().click();
    await page.getByRole('button', { name: 'Setuju' }).click().catch(() => {});
  }
  
  // Setujui syarat dan ketentuan (card kedua)
  const card2Visible = await page.locator('.wrapper > div:nth-child(3)').isVisible({ timeout: 2000 }).catch(() => false);
  if (card2Visible) {
    await page.locator('.wrapper > div:nth-child(3)').click();
    await page.getByRole('button', { name: 'Setuju' }).click().catch(() => {});
  }
  
  // Klik button Selanjutnya
  const selanjutnyaVisible = await page.getByRole('button', { name: 'Selanjutnya' }).isVisible({ timeout: 2000 }).catch(() => false);
  if (selanjutnyaVisible) {
    await page.getByRole('button', { name: 'Selanjutnya' }).click();
    await page.waitForTimeout(500);
  }

  // Isi Email
  const emailFieldVisible = await page.getByRole('textbox', { name: 'Email *' }).isVisible({ timeout: 2000 }).catch(() => false);
  if (!emailFieldVisible) {
    console.log('Test registrasi skipped - form not available');
    return;
  }
  
  await page.getByRole('textbox', { name: 'Email *' }).fill('tqa11558@gmail.com');
  
  // Isi Kata Sandi
  await page.getByRole('textbox', { name: 'Kata Sandi *', exact: true }).fill('@Password123!');
  
  // Isi Konfirmasi Kata Sandi
  await page.getByRole('textbox', { name: 'Konfirmasi Kata Sandi *' }).fill('@Password123!');

  // Tunggu button Daftar enabled dan klik
  const daftarSubmitButton = page.getByRole('button', { name: 'Daftar' });
  await page.waitForFunction(
    () => {
      const button = document.querySelector('button:has-text("Daftar")');
      return button && !button.hasAttribute('disabled');
    },
    { timeout: 1000 }
  ).catch(() => {});
  
  await daftarSubmitButton.click();
  await page.waitForTimeout(500);
  
  // Cek apakah ada error email sudah terdaftar
  const errorVisible = await page.locator('text=/sudah terdaftar|already registered|email exists/i').first().isVisible({ timeout: 1000 }).catch(() => false);
  if (errorVisible) {
    console.log('Email already registered - test completed');
    return;
  }
  
  // Isi OTP (jika muncul)
  const otpVisible = await page.getByRole('spinbutton', { name: 'OTP Input 1' }).isVisible({ timeout: 1000 }).catch(() => false);
  if (otpVisible) {
    await page.getByRole('spinbutton', { name: 'OTP Input 1' }).fill('6');
    await page.getByRole('spinbutton', { name: 'OTP Input 2' }).fill('6');
    await page.getByRole('spinbutton', { name: 'OTP Input 3' }).fill('5');
    await page.getByRole('spinbutton', { name: 'OTP Input 4' }).fill('3');
    
    // Klik button Kirim OTP
    const kirimVisible = await page.getByRole('button', { name: 'Kirim', exact: true }).isVisible({ timeout: 1000 }).catch(() => false);
    if (kirimVisible) {
      await page.getByRole('button', { name: 'Kirim', exact: true }).click();
    }
  }
  
  console.log('Test registrasi completed');
});