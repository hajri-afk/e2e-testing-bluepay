import { test, expect } from '@playwright/test';

/**
 * Test Terima Bayar
 * Login sudah dilakukan sekali di global-setup.ts
 * Tidak perlu login dan OTP lagi - langsung menggunakan authentication state
 */
test('Testing terima bayar page', async ({ page }) => {
  // Langsung navigate ke halaman terima bayar
  await page.goto('https://bluepay.onanaterbaik.com/terima-bayar', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Verifikasi URL sudah benar
  const url = page.url();
  if (!url.includes('terima-bayar')) {
    throw new Error(`Expected to be on terima-bayar page, but URL is: ${url}`);
  }
  
  console.log('Terima Bayar page loaded successfully');
  console.log('Current URL:', url);
  
  // Pilih toko jika ada (optional)
  const tokoComboVisible = await page.getByRole('combobox', { name: '* Toko' }).isVisible({ timeout: 3000 }).catch(() => false);
  if (tokoComboVisible) {
    await page.getByRole('combobox', { name: '* Toko' }).click();
    await page.waitForTimeout(300);
    
    const tokoApprovedVisible = await page.getByText('Toko Approved').isVisible({ timeout: 2000 }).catch(() => false);
    if (tokoApprovedVisible) {
      await page.getByText('Toko Approved').click();
      await page.waitForTimeout(1000);
      console.log('Toko selected');
      
      // Cek download QR button (optional)
      const unduhQRVisible = await page.getByRole('button', { name: 'download Unduh QR' }).isVisible({ timeout: 2000 }).catch(() => false);
      if (unduhQRVisible) {
        console.log('QR code ready for download');
      }
      
      // Coba tab QRIS Dinamis (optional)
      const qrisDinamisVisible = await page.getByRole('tab', { name: 'QRIS Dinamis' }).isVisible({ timeout: 2000 }).catch(() => false);
      if (qrisDinamisVisible) {
        await page.getByRole('tab', { name: 'QRIS Dinamis' }).click();
        await page.waitForTimeout(500);
        console.log('QRIS Dinamis tab clicked');
        
        // Pilih toko lagi (optional)
        await page.getByRole('combobox', { name: '* Toko' }).click().catch(() => {});
        await page.getByText('Toko Approved').click().catch(() => {});
        await page.getByRole('button', { name: 'Rp 100.000' }).click().catch(() => {});
        await page.getByRole('button', { name: 'Buat QR' }).click().catch(() => {});
        await page.waitForTimeout(500);
        console.log('Dynamic QR created');
      }
    }
  } else {
    console.log('Toko combobox not available');
  }
});