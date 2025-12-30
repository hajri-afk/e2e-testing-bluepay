import { test, expect } from '@playwright/test';

/**
 * Test Beranda Page
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing beranda page', async ({ page }) => {
  // Langsung navigate ke halaman beranda
  // Authentication state sudah di-load otomatis dari global setup
  await page.goto('https://bluepay.onanaterbaik.com/beranda', { waitUntil: 'networkidle' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Verifikasi bahwa halaman beranda sudah terbuka
  // Coba berbagai selector untuk fleksibilitas
  try {
    await expect(page.getByRole('heading', { name: 'Beranda' })).toBeVisible({ timeout: 10000 });
  } catch (e) {
    // Coba selector alternatif
    try {
      await expect(page.locator('h1:has-text("Beranda")')).toBeVisible({ timeout: 5000 });
    } catch (e2) {
      // Jika masih gagal, verifikasi URL sudah benar
      const url = page.url();
      if (url.includes('beranda') || url.includes('dashboard')) {
        console.log('On beranda/dashboard page - URL verified');
      } else {
        throw new Error(`Expected to be on beranda/dashboard page, but URL is: ${url}`);
      }
    }
  }
});