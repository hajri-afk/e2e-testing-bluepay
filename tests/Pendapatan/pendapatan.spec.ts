import { test, expect } from '@playwright/test';

/**
 * Test Pendapatan
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing pendapatan page', async ({ page }) => {
  // Langsung navigate ke halaman pendapatan
  await page.goto('https://bluepay.onanaterbaik.com/pendapatan', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Verifikasi URL sudah benar
  const url = page.url();
  if (!url.includes('pendapatan')) {
    throw new Error(`Expected to be on pendapatan page, but URL is: ${url}`);
  }
  
  console.log('Pendapatan page loaded successfully');
  console.log('Current URL:', url);
  
  // Coba klik button Perbarui Data jika ada (optional)
  const perbaruiVisible = await page.getByRole('button', { name: 'sync Perbarui Data' }).isVisible({ timeout: 3000 }).catch(() => false);
  if (perbaruiVisible) {
    await page.getByRole('button', { name: 'sync Perbarui Data' }).click();
    await page.waitForTimeout(1000);
    console.log('Perbarui Data button clicked');
    
    // Cek pendapatan detail (optional)
    const detailVisible = await page.locator('div').filter({ hasText: 'PendapatanPemindahan dana' }).nth(4).isVisible({ timeout: 2000 }).catch(() => false);
    if (detailVisible) {
      console.log('Pendapatan detail displayed');
    }
  } else {
    console.log('Perbarui Data button not available');
  }
});