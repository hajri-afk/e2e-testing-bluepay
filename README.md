# PlayBLP E2E Testing

Proyek End-to-End testing untuk aplikasi BluePay menggunakan Playwright.

## Fitur Utama

- Login dilakukan sekali di global setup
- Semua test otomatis menggunakan authentication state
- Tidak perlu login berulang di setiap test

## Instalasi

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

**Catatan:** Pastikan Node.js sudah terinstall (versi 16 atau lebih tinggi).

## Cara Menjalankan Test

### Menjalankan Semua Test
```bash
npx playwright test
```

### Menjalankan Test Spesifik
```bash
# Test Beranda
npx playwright test tests/Beranda

# Test Brand
npx playwright test tests/Brand

# Test Staff
npx playwright test tests/Staff

# Test Pendapatan
npx playwright test tests/Pendapatan

# Test Mutasi
npx playwright test tests/Mutasi

# Test Riwayat Transaksi
npx playwright test tests/Riwayat-Transaksi

# Test Terima Bayar
npx playwright test tests/Terima-Bayar
```

### Mode Lainnya
```bash
# UI Mode (interaktif - recommended untuk debugging)
npx playwright test --ui

# Browser terlihat (melihat browser saat test berjalan)
npx playwright test --headed

# Debug mode (pause di setiap step)
npx playwright test --debug

# Melihat HTML report setelah test selesai
npx playwright show-report
```

### Contoh Lengkap
```bash
# 1. Install dependencies (hanya sekali)
npm install
npx playwright install

# 2. Jalankan semua test
npx playwright test

# 3. Atau jalankan test spesifik dengan browser terlihat
npx playwright test tests/Beranda --headed

# 4. Atau gunakan UI mode untuk debugging
npx playwright test --ui
```

## Cara Kerja

1. **Global Setup** (`global-setup.ts`):
   - Login sekali dengan email, password, dan OTP
   - Menyimpan authentication state ke `.auth/auth-state.json`

2. **Semua Test**:
   - Otomatis menggunakan stored authentication state
   - Tidak perlu login lagi
   - Langsung navigate ke halaman yang diinginkan

## Struktur Folder

```
tests/
├── Beranda/          # Test halaman Beranda
├── Brand/            # Test fitur Brand
├── Staff/            # Test fitur Staff
├── Pendapatan/       # Test fitur Pendapatan
├── Mutasi/           # Test fitur Mutasi
├── Riwayat Transaksi/# Test Riwayat Transaksi
├── Terima Bayar/     # Test fitur Terima Bayar
└── Login/            # Test login manual (optional)
```

## Troubleshooting

### Authentication State Expired
Hapus folder `.auth/` dan jalankan test lagi:
```bash
rm -rf .auth/
npx playwright test
```

### OTP Berubah
Update OTP di `global-setup.ts` (baris 52), lalu hapus folder `.auth/` dan jalankan test lagi.

### Test Timeout
Gunakan debug mode untuk melihat masalah:
```bash
npx playwright test --debug
```

## Catatan

- Authentication state disimpan di `.auth/auth-state.json` (tidak di-commit)
- Base URL: `https://bluepay.onanaterbaik.com`
- Credentials: Email `bp-approved@yopmail.com`, Password `Password123!`, OTP `7408`
