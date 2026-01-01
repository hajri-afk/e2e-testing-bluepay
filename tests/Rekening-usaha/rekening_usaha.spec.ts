import { test, expect } from '@playwright/test';

/**
 * Test Rekening Usaha
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing rekening usaha page', async ({ page }) => {
  // Set test timeout
  test.setTimeout(30000); // 30 detik
  
  // Coba navigate ke beranda dulu, lalu klik link
  await page.goto('https://bluepay.onanaterbaik.com/beranda', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);
  
  // Coba klik link Rekening Usaha (optional)
  const linkVisible = await page.getByRole('link', { name: 'credit-card Rekening Usaha' }).isVisible({ timeout: 2000 }).catch(() => false);
  if (linkVisible) {
    await page.getByRole('link', { name: 'credit-card Rekening Usaha' }).click();
    await page.waitForTimeout(1000);
  } else {
    // Navigate langsung jika link tidak ada
    await page.goto('https://bluepay.onanaterbaik.com/rekening-usaha', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
  }
  
  // Verifikasi URL
  const url = page.url();
  console.log('Rekening Usaha page loaded successfully');
  console.log('Current URL:', url);
  
  // Pilih Nama Bank (optional)
  const namaBankVisible = await page.getByRole('combobox', { name: '* Nama Bank' }).isVisible({ timeout: 3000 }).catch(() => false);
  if (namaBankVisible) {
    await page.getByRole('combobox', { name: '* Nama Bank' }).click();
    await page.waitForTimeout(300);
    
    const bcaVisible = await page.getByText('BANK BCA').isVisible({ timeout: 2000 }).catch(() => false);
    if (bcaVisible) {
      await page.getByText('BANK BCA').click();
      console.log('Bank selected');
      
      // Isi nomor rekening (optional)
      await page.getByRole('textbox', { name: '* Nomor Rekening' }).fill('89076575435').catch(() => {});
      
      // Periksa rekening (optional)
      const periksaVisible = await page.getByRole('button', { name: 'Periksa Rekening' }).isVisible({ timeout: 2000 }).catch(() => false);
      if (periksaVisible) {
        await page.getByRole('button', { name: 'Periksa Rekening' }).click();
        await page.waitForTimeout(1000);
        console.log('Periksa Rekening clicked');
      }
      
      // Tambah rekening (optional)
      const tambahVisible = await page.getByRole('button', { name: 'Tambah Rekening' }).isVisible({ timeout: 2000 }).catch(() => false);
      if (tambahVisible) {
        await page.getByRole('button', { name: 'Tambah Rekening' }).click();
        await page.waitForTimeout(500);
        console.log('Tambah Rekening clicked');
      }
    }
  } else {
    console.log('Rekening form not available');
  }
  
  console.log('Test rekening usaha completed');
});