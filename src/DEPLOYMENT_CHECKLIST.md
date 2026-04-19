# ✅ CHECKLIST DEPLOYMENT MATHORIA

Print halaman ini dan centang setiap langkah yang sudah selesai!

---

## 📋 PERSIAPAN AKUN (5-10 menit)

- [ ] **Buat akun GitHub** (https://github.com/signup)
  - Username: ___________________
  - Email: _____________________

- [ ] **Buat akun Vercel** (https://vercel.com/signup)
  - Login dengan GitHub ✓

- [ ] **Konfirmasi Supabase account aktif**
  - Email login: _____________________
  - Project ID: `bbqpjitoimbusvuxyvce` ✓

---

## 📥 DOWNLOAD & EXTRACT (2-3 menit)

- [ ] **Download project dari Figma Make**
  - Klik tombol Export/Download
  - Simpan file: `mathoria-project.zip`

- [ ] **Extract ZIP file**
  - Lokasi folder: ___________________
  - Pastikan ada file `App.tsx`, folder `components/`, dll

---

## 🔐 DAPATKAN SUPABASE CREDENTIALS (5 menit)

- [ ] **Login ke Supabase Dashboard** (https://supabase.com/dashboard)

- [ ] **Pilih project** `bbqpjitoimbusvuxyvce`

- [ ] **Dapatkan Service Role Key:**
  - Settings → API → Service Role Key → Reveal
  - Copy & simpan di tempat aman:
    ```
    SUPABASE_SERVICE_ROLE_KEY=
    _________________________________________
    _________________________________________
    ```

- [ ] **Verifikasi URL & Anon Key** (sudah ada di code):
  ```
  ✓ URL: https://bbqpjitoimbusvuxyvce.supabase.co
  ✓ Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

---

## 📤 UPLOAD KE GITHUB (10 menit)

### Opsi A: GitHub Desktop (Recommended)

- [ ] **Download GitHub Desktop** (https://desktop.github.com)
- [ ] **Install & login** dengan akun GitHub
- [ ] **Create New Repository:**
  - Name: `mathoria-app`
  - Local Path: [pilih folder yang sudah di-extract]
- [ ] **Publish Repository:**
  - [ ] Centang "Keep this code private" (jika mau private)
  - [ ] Klik "Publish repository"
- [ ] **Tunggu upload selesai** (ada progress bar)

### Opsi B: Web Upload

- [ ] **Buka GitHub** → New Repository
- [ ] **Name:** `mathoria-app`
- [ ] **Create repository**
- [ ] **Upload files** (drag & drop semua file)
- [ ] **Commit changes**

---

## 🚀 DEPLOY KE VERCEL (15 menit)

- [ ] **Login Vercel** (https://vercel.com)

- [ ] **Add New Project** → Import dari GitHub

- [ ] **Pilih repository** `mathoria-app` → Import

- [ ] **Configure Project:**
  - [ ] Framework: Vite (auto-detect)
  - [ ] Root Directory: `./`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`

- [ ] **Add Environment Variables** (klik tombol):

  **Variable 1:**
  - [ ] Key: `VITE_SUPABASE_URL`
  - [ ] Value: `https://bbqpjitoimbusvuxyvce.supabase.co`

  **Variable 2:**
  - [ ] Key: `VITE_SUPABASE_ANON_KEY`
  - [ ] Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXBqaXRvaW1idXN2dXh5dmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjYzMjcsImV4cCI6MjA5MjEwMjMyN30.Fq_TtQtK0lMCRnaxyXnpyFX3gVmOAhHMm2491ydNxWk`

  **Variable 3:**
  - [ ] Key: `VITE_SUPABASE_SERVICE_ROLE_KEY`
  - [ ] Value: [paste Service Role Key yang tadi disimpan]

- [ ] **Klik Deploy** 🚀

- [ ] **Tunggu 2-5 menit** (ada progress bar build)

- [ ] **Copy Production URL:**
  ```
  https://_____________________.vercel.app
  ```

---

## ⚙️ DEPLOY SUPABASE FUNCTIONS (20 menit)

### Install Supabase CLI

**Windows:**
- [ ] Download: https://github.com/supabase/cli/releases/latest
- [ ] File: `supabase_windows_amd64.zip`
- [ ] Extract → Copy `supabase.exe` ke `C:\Program Files\Supabase\`
- [ ] Tambahkan ke PATH (lihat panduan di DEPLOYMENT_GUIDE.md)
- [ ] Test: buka Command Prompt, ketik `supabase --version`

**Mac:**
- [ ] Jalankan di Terminal: `brew install supabase/tap/supabase`
- [ ] Test: `supabase --version`

**Linux:**
- [ ] Download & install (lihat DEPLOYMENT_GUIDE.md)
- [ ] Test: `supabase --version`

### Deploy Functions

- [ ] **Buka Terminal / Command Prompt**

- [ ] **Login:**
  ```bash
  supabase login
  ```
  - [ ] Browser terbuka → Login dengan Supabase account
  - [ ] Kembali ke terminal

- [ ] **Navigasi ke folder project:**
  ```bash
  cd [path-ke-folder-mathoria]
  ```

- [ ] **Link ke project:**
  ```bash
  supabase link --project-ref bbqpjitoimbusvuxyvce
  ```
  - [ ] Masukkan database password jika diminta

- [ ] **Deploy function:**
  ```bash
  supabase functions deploy make-server-773c0d79
  ```
  - [ ] Tunggu sampai muncul "Deployed successfully"

- [ ] **Set secrets:**
  ```bash
  supabase secrets set SUPABASE_URL=https://bbqpjitoimbusvuxyvce.supabase.co
  ```
  ```bash
  supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXBqaXRvaW1idXN2dXh5dmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjYzMjcsImV4cCI6MjA5MjEwMjMyN30.Fq_TtQtK0lMCRnaxyXnpyFX3gVmOAhHMm2491ydNxWk
  ```
  ```bash
  supabase secrets set SUPABASE_SERVICE_ROLE_KEY=[paste-service-role-key]
  ```

- [ ] **Verifikasi:**
  ```bash
  supabase functions list
  ```
  - [ ] Harus muncul `make-server-773c0d79`

---

## 🌐 SETUP CORS (3 menit)

- [ ] **Buka Supabase Dashboard**

- [ ] **Settings → API → CORS Configuration**

- [ ] **Tambahkan domain Vercel:**
  ```
  https://[your-app].vercel.app
  ```

- [ ] **Klik Save**

---

## ✅ TESTING (10 menit)

- [ ] **Buka aplikasi:** `https://[your-app].vercel.app`

- [ ] **Test Student Flow:**
  - [ ] Halaman login muncul
  - [ ] Bisa register akun baru
  - [ ] Bisa login
  - [ ] Dashboard muncul (namecard, level, badges)
  - [ ] Bisa mulai quiz Level 1
  - [ ] Pilih jawaban → skor bertambah
  - [ ] Leaderboard menampilkan data

- [ ] **Test Guru Flow:**
  - [ ] Logout dari student account
  - [ ] Login sebagai `Saya Guru`
  - [ ] Teacher Dashboard muncul (purple theme)
  - [ ] Tab "Bank Soal" berfungsi
  - [ ] Bisa tambah soal Level 1-5 (multiple choice)
  - [ ] Bisa tambah soal Level 6 (essay mode)

- [ ] **Test Level 6 Essay:**
  - [ ] Login sebagai student
  - [ ] Unlock hingga Level 6
  - [ ] Mulai Level 6 → Essay interface muncul
  - [ ] Tulis jawaban → Submit
  - [ ] Login sebagai guru → Tab "Review Esai"
  - [ ] Essay muncul di pending list
  - [ ] Buka essay → Panduan rubrik & jawaban yang diinginkan muncul

---

## 🎉 SELESAI!

- [ ] **Save Production URL:**
  ```
  🌐 https://_____________________.vercel.app
  ```

- [ ] **Share ke:**
  - [ ] Siswa untuk testing
  - [ ] Guru untuk feedback
  - [ ] Social media / Portfolio

- [ ] **Monitor analytics:**
  - Vercel Dashboard → Analytics
  - Supabase Dashboard → Logs

---

## 🆘 TROUBLESHOOTING

### Build Failed di Vercel
- [ ] Cek environment variables sudah diisi 3 items
- [ ] Redeploy: Vercel → Deployments → "..." → Redeploy

### CORS Error
- [ ] Verifikasi domain sudah ditambahkan di Supabase CORS
- [ ] Format: `https://app-name.vercel.app` (tanpa trailing slash)

### Function Not Found
- [ ] Deploy ulang function:
  ```bash
  supabase functions deploy make-server-773c0d79
  ```

### Unauthorized / Invalid API Key
- [ ] Cek environment variables di Vercel
- [ ] Pastikan ANON_KEY & SERVICE_ROLE_KEY benar
- [ ] Redeploy

---

## 📞 BANTUAN

Jika ada masalah:
1. Screenshot error
2. Buka browser Console (F12)
3. Copy error message
4. Tanyakan dengan detail error tersebut

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Production URL:** https://_____________________.vercel.app

**Status:** 
- [ ] ✅ Successfully Deployed
- [ ] ⚠️ Deployed with issues (note: ________________)
- [ ] ❌ Failed (troubleshooting needed)

---

**🎊 CONGRATULATIONS!** 
Mathoria sudah LIVE di internet! 🚀
