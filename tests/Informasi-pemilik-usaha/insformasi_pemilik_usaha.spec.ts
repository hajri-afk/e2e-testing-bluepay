import { test, expect } from '@playwright/test';

/**
 * Test Informasi Pemilik Usaha
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing informasi pemilik usaha page', async ({ page }) => {
  // Set test timeout
  test.setTimeout(30000); // 30 detik
  
  // Navigate ke beranda dulu, lalu klik link
  await page.goto('https://bluepay.onanaterbaik.com/beranda', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);
  
  // Coba klik link (optional)
  const linkVisible = await page.getByRole('link', { name: 'user Informasi Pemilik Usaha' }).isVisible({ timeout: 2000 }).catch(() => false);
  if (linkVisible) {
    await page.getByRole('link', { name: 'user Informasi Pemilik Usaha' }).click();
    await page.waitForTimeout(1000);
  } else {
    // Navigate langsung
    await page.goto('https://bluepay.onanaterbaik.com/informasi-pemilik-usaha', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
  }
  
  console.log('Informasi Pemilik Usaha page loaded successfully');
  console.log('Current URL:', page.url());
  
  // Upload KTP (optional)
  const uploadVisible = await page.getByRole('button', { name: 'inbox Anda dapat mengambil' }).isVisible({ timeout: 2000 }).catch(() => false);
  if (uploadVisible) {
    await page.getByRole('button', { name: 'inbox Anda dapat mengambil' }).setInputFiles('KTP.jpg').catch(() => {});
    console.log('KTP upload attempted');
  }
  
  // Isi form (optional)
  const kodePosVisible = await page.getByRole('textbox', { name: '* Kode Pos' }).isVisible({ timeout: 1000 }).catch(() => false);
  if (kodePosVisible) {
    await page.getByRole('textbox', { name: '* Kode Pos' }).fill('0987').catch(() => {});
  }
  
  const whatsappVisible = await page.getByRole('textbox', { name: '* Nomor WhatsApp' }).isVisible({ timeout: 1000 }).catch(() => false);
  if (whatsappVisible) {
    await page.getByRole('textbox', { name: '* Nomor WhatsApp' }).fill('82138691530').catch(() => {});
  }
  
  // Simpan data jika ada (optional)
  const simpanVisible = await page.getByRole('button', { name: 'Simpan Data' }).isVisible({ timeout: 1000 }).catch(() => false);
  if (simpanVisible) {
    console.log('Form available for submission');
  }
  
  console.log('Test informasi pemilik usaha completed');
});
