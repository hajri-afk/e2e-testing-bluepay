import { test, expect } from '@playwright/test';

/**
 * Test Beranda Page
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing beranda page', async ({ page }) => {
  // Langsung navigate ke halaman beranda
  // Authentication state sudah di-load otomatis dari global setup
  await page.goto('https://bluepay.onanaterbaik.com/beranda', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Verifikasi URL sudah benar
  const url = page.url();
  if (!url.includes('beranda') && !url.includes('dashboard')) {
    throw new Error(`Expected to be on beranda/dashboard page, but URL is: ${url}`);
  }
  
  console.log('Beranda page loaded successfully');
  console.log('Current URL:', url);
  
  // Verifikasi halaman sudah load dengan cek elemen umum (opsional, tidak akan fail test)
  const hasNavigation = await page.locator('nav').isVisible({ timeout: 3000 }).catch(() => false);
  const hasHeading = await page.locator('h1, h2, h3').first().isVisible({ timeout: 3000 }).catch(() => false);
  
  if (hasNavigation) {
    console.log('Navigation element found');
  }
  if (hasHeading) {
    console.log('Heading element found');
  }
});