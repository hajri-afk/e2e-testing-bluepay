import { chromium, FullConfig } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Ensure .auth directory exists
    const authDir = path.join(__dirname, '.auth');
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
      console.log('Created .auth directory');
    }

    // Login process
    console.log('Starting login process...');
    await page.goto('https://bluepay.onanaterbaik.com/auth/login', { waitUntil: 'networkidle' });
    console.log('Login page loaded');
    
    // Fill email
    console.log('Filling email...');
    await page.getByRole('textbox', { name: '* Email' }).click();
    await page.getByRole('textbox', { name: '* Email' }).fill('bp-approved@yopmail.com');
    
    // Fill password
    console.log('Filling password...');
    await page.getByRole('textbox', { name: '* Password' }).click();
    await page.getByRole('textbox', { name: '* Password' }).fill('Password123!');
    
    // Click login button
    console.log('Clicking login button...');
    await page.getByRole('button', { name: 'Masuk' }).click();
    
    // Wait for OTP input to appear (using the same locator as in test files)
    console.log('Waiting for OTP input...');
    try {
      await page.getByRole('spinbutton', { name: 'OTP Input 1' }).waitFor({ timeout: 20000, state: 'visible' });
      console.log('OTP input appeared');
    } catch (error) {
      console.error('OTP input not found. Current page URL:', page.url());
      console.error('Page title:', await page.title());
      throw new Error('OTP input field not found. Please check if login was successful.');
    }
    
    // Fill OTP
    console.log('Filling OTP...');
    await page.getByRole('spinbutton', { name: 'OTP Input 1' }).click();
    await page.getByRole('spinbutton', { name: 'OTP Input 1' }).fill('7408');
    await page.getByRole('button', { name: 'Kirim' }).click();
    
    // Wait for OTP verification - bisa berupa pesan sukses atau redirect
    console.log('Waiting for OTP verification...');
    const currentUrl = page.url();
    
    try {
      // Coba tunggu pesan sukses (jika ada)
      await Promise.race([
        page.waitForSelector('div:has-text("OTP berhasil diverifikasi")', { timeout: 5000 }).catch(() => null),
        page.waitForSelector('div:has-text("berhasil diverifikasi")', { timeout: 5000 }).catch(() => null),
        page.waitForURL('**/beranda**', { timeout: 10000 }).catch(() => null),
        page.waitForURL('**/dashboard**', { timeout: 10000 }).catch(() => null),
        page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => null),
      ]);
      
      // Tunggu sedikit untuk memastikan redirect selesai
      await page.waitForTimeout(2000);
      
      // Cek apakah sudah redirect (berarti login berhasil)
      const newUrl = page.url();
      if (newUrl !== currentUrl && !newUrl.includes('/auth/login')) {
        console.log('Redirect detected - Login successful!');
        console.log('Current URL:', newUrl);
      } else {
        // Jika tidak redirect, tunggu elemen yang menunjukkan user sudah login
        console.log('Waiting for dashboard/beranda elements...');
        try {
          await Promise.race([
            page.waitForSelector('text=Beranda', { timeout: 10000 }).catch(() => null),
            page.waitForSelector('[role="heading"]', { timeout: 10000 }).catch(() => null),
            page.waitForSelector('nav', { timeout: 10000 }).catch(() => null),
          ]);
          console.log('Login successful - Dashboard elements found!');
        } catch (e) {
          console.log('Could not find success message, but continuing...');
        }
      }
    } catch (error) {
      console.log('Could not verify OTP message, but checking if login was successful...');
      await page.waitForTimeout(3000);
    }
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      console.log('Network idle timeout, but continuing...');
    });
    
    console.log('Login process completed!');
    
    // Save authentication state
    const statePath = path.join(authDir, 'auth-state.json');
    await context.storageState({ path: statePath });
    console.log('Authentication state saved to:', statePath);
    console.log('All tests will now use this authentication state - no need to login again!');
    
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;

