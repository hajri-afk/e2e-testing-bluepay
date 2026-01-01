import { Page } from '@playwright/test';

/**
 * Helper function untuk melakukan login
 * Digunakan jika diperlukan login manual di test tertentu
 * 
 * @param page - Playwright page object
 * @param email - Email untuk login (default: bp-approved@yopmail.com)
 * @param password - Password untuk login (default: Password123!)
 * @param otp - OTP code (default: 9448)
 */
export async function login(
  page: Page,
  email: string = 'bp-approved@yopmail.com',
  password: string = 'Password123!',
  otp: string = '9448'
) {
  await page.goto('https://bluepay.onanaterbaik.com/auth/login');
  
  // Fill email
  await page.getByRole('textbox', { name: '* Email' }).click();
  await page.getByRole('textbox', { name: '* Email' }).fill(email);
  
  // Fill password
  await page.getByRole('textbox', { name: '* Password' }).click();
  await page.getByRole('textbox', { name: '* Password' }).fill(password);
  
  // Click login button
  await page.getByRole('button', { name: 'Masuk' }).click();
  
  // Wait for OTP input and fill it
  await page.getByRole('spinbutton', { name: 'OTP Input 1' }).click();
  await page.getByRole('spinbutton', { name: 'OTP Input 1' }).fill(otp);
  await page.getByRole('button', { name: 'Kirim' }).click();
  
  // Wait for OTP verification success message
  await page.waitForSelector('div:has-text("OTP berhasil diverifikasi.")', { timeout: 10000 });
  
  // Wait a bit to ensure session is fully established
  await page.waitForTimeout(2000);
}

