import { test, expect } from '@playwright/test';

/**
 * Test Mutasi
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing mutasi page', async ({ page }) => {
  // Langsung navigate ke halaman mutasi
  await page.goto('https://bluepay.onanaterbaik.com/mutasi', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Verifikasi URL sudah benar
  const url = page.url();
  if (!url.includes('mutasi')) {
    throw new Error(`Expected to be on mutasi page, but URL is: ${url}`);
  }
  
  console.log('Mutasi page loaded successfully');
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
        await page.getByRole('button', { name: 'Apply' }).click().catch(() => {});
        await page.waitForTimeout(500);
        console.log('Date filter applied');
      }
    }
  } else {
    console.log('Filter button not available');
  }
});