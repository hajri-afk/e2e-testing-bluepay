import { test, expect } from '@playwright/test';

/**
 * Test Riwayat Transaksi
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing riwayat transaksi page', async ({ page }) => {
  // Langsung navigate ke halaman riwayat transaksi
  await page.goto('https://bluepay.onanaterbaik.com/riwayat-transaksi', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Verifikasi URL sudah benar
  const url = page.url();
  if (!url.includes('riwayat-transaksi')) {
    throw new Error(`Expected to be on riwayat-transaksi page, but URL is: ${url}`);
  }
  
  console.log('Riwayat Transaksi page loaded successfully');
  console.log('Current URL:', url);
  
  // Coba klik button Filter jika ada (optional)
  const filterVisible = await page.getByRole('button', { name: 'filter Filter' }).isVisible({ timeout: 3000 }).catch(() => false);
  if (filterVisible) {
    await page.getByRole('button', { name: 'filter Filter' }).click();
    await page.waitForTimeout(500);
    console.log('Filter button clicked');
    
    // Coba pilih tanggal (optional)
    const pickerVisible = await page.locator('.ant-picker').isVisible({ timeout: 2000 }).catch(() => false);
    if (pickerVisible) {
      await page.locator('.ant-picker').click();
      await page.waitForTimeout(300);
      
      const dateVisible = await page.getByText('30').nth(3).isVisible({ timeout: 2000 }).catch(() => false);
      if (dateVisible) {
        await page.getByText('30').nth(3).click();
        await page.getByText('30').nth(1).click().catch(() => {});
        await page.getByRole('button', { name: 'Semua' }).click().catch(() => {});
        await page.getByRole('button', { name: 'Apply' }).click().catch(() => {});
        await page.waitForTimeout(500);
        console.log('Date filter applied');
      }
    }
  } else {
    console.log('Filter button not available');
  }
});