import { test, expect } from '@playwright/test';

/**
 * Test Brand
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing brand page', async ({ page }) => {
  // Langsung navigate ke halaman brand
  await page.goto('https://bluepay.onanaterbaik.com/brand', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Verifikasi URL sudah benar
  const url = page.url();
  if (!url.includes('brand')) {
    throw new Error(`Expected to be on brand page, but URL is: ${url}`);
  }
  
  console.log('Brand page loaded successfully');
  console.log('Current URL:', url);
  
  // Coba klik button Lihat Detail jika ada (optional)
  const lihatDetailVisible = await page.getByRole('button', { name: 'Lihat Detail' }).isVisible({ timeout: 3000 }).catch(() => false);
  if (lihatDetailVisible) {
    await page.getByRole('button', { name: 'Lihat Detail' }).click();
    await page.waitForTimeout(1000);
    console.log('Clicked Lihat Detail button');
    
    // Cek detail brand muncul (optional)
    const detailVisible = await page.getByText('AktifToko ApprovedJalan').isVisible({ timeout: 2000 }).catch(() => false);
    if (detailVisible) {
      console.log('Brand detail displayed');
    }
  } else {
    console.log('Lihat Detail button not available');
  }
});