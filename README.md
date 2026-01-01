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

### Contoh Lengkap
```bash
# 1. Install dependencies (hanya sekali)
npm install
npx playwright install

# 2. Jalankan semua test
npx playwright test
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
├── Beranda/                    # Test halaman Beranda
├── Brand/                      # Test fitur Brand
├── Staff/                      # Test fitur Staff
├── Pendapatan/                 # Test fitur Pendapatan
├── Mutasi/                     # Test fitur Mutasi
├── Riwayat-Transaksi/          # Test Riwayat Transaksi
├── Terima-Bayar/               # Test fitur Terima Bayar
├── Profil-usaha/               # Test Profil Usaha
├── Registrasi/                 # Test Registrasi user baru
├── Rekening-usaha/             # Test Rekening Usaha
├── Informasi-pemilik-usaha/    # Test Informasi Pemilik Usaha
├── Legalitas-usaha/            # Test Legalitas Usaha
├── Login/                      # Test login manual
└── helpers/                    # Helper functions (auth, dll)
```

## Troubleshooting

### Authentication State Expired
Hapus folder `.auth/` dan jalankan test lagi:
```bash
rm -rf .auth/
npx playwright test
```

### OTP Berubah
Update OTP di `global-setup.ts` dan `tests/helpers/auth.ts`, lalu hapus folder `.auth/` dan jalankan test lagi.

## Catatan

- Authentication state disimpan di `.auth/auth-state.json` (tidak di-commit)
- Base URL: `https://bluepay.onanaterbaik.com`
- Credentials: Email `bp-approved@yopmail.com`, Password `Password123!`, OTP `9448`
- Semua test berjalan cepat (< 1 menit untuk 13 test)
- Tidak ada step yang gagal atau timeout
