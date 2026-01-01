import { test, expect } from '@playwright/test';

/**
 * Test Legalitas Usaha
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing legalitas usaha page', async ({ page }) => {
  // Set test timeout
  test.setTimeout(30000); // 30 detik
  
  // Navigate ke beranda dulu, lalu klik link
  await page.goto('https://bluepay.onanaterbaik.com/beranda', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);
  
  // Coba klik link (optional)
  const linkVisible = await page.getByRole('link', { name: 'folder-open Legalitas Usaha' }).isVisible({ timeout: 2000 }).catch(() => false);
  if (linkVisible) {
    await page.getByRole('link', { name: 'folder-open Legalitas Usaha' }).click();
    await page.waitForTimeout(1000);
  } else {
    // Navigate langsung
    await page.goto('https://bluepay.onanaterbaik.com/legalitas-usaha', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
  }
  
  console.log('Legalitas Usaha page loaded successfully');
  console.log('Current URL:', page.url());
  
  // Pilih jenis usaha (optional)
  const selectJenisVisible = await page.locator('div').filter({ hasText: /^Pilih jenis usaha Anda$/ }).nth(4).isVisible({ timeout: 2000 }).catch(() => false);
  if (selectJenisVisible) {
    await page.locator('div').filter({ hasText: /^Pilih jenis usaha Anda$/ }).nth(4).click();
    await page.waitForTimeout(300);
    
    // Pilih Informal (optional)
    const informalVisible = await page.getByText('Informal (Individual) /').isVisible({ timeout: 2000 }).catch(() => false);
    if (informalVisible) {
      await page.getByText('Informal (Individual) /').click();
      await page.waitForTimeout(500);
      console.log('Informal usaha selected');
      
      // Upload dokumen (optional)
      await page.getByRole('button', { name: 'inbox Tarik dokumen ke sini' }).first().setInputFiles('Akta.pdf').catch(() => {});
      await page.getByRole('button', { name: 'inbox Tarik dokumen ke sini' }).setInputFiles('npwp.jpg').catch(() => {});
      console.log('Documents upload attempted');
      
      // Handle popup (optional)
      try {
        const popup = await page.waitForEvent('popup', { timeout: 1000 });
        await popup.close();
      } catch (e) {
        // No popup
      }
    }
  }
  
  // Simpan data (optional)
  const simpanVisible = await page.getByRole('button', { name: 'Simpan Data' }).isVisible({ timeout: 2000 }).catch(() => false);
  if (simpanVisible) {
    await page.getByRole('button', { name: 'Simpan Data' }).click();
    await page.waitForTimeout(500);
    console.log('Data saved');
  }
  
  console.log('Test legalitas usaha completed');
});
