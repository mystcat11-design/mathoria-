# 🚀 PANDUAN DEPLOYMENT MATHORIA - LANGKAH DEMI LANGKAH

## 📋 INFORMASI PENTING

**Supabase Project ID:** `bbqpjitoimbusvuxyvce`
**Supabase URL:** `https://bbqpjitoimbusvuxyvce.supabase.co`

---

## ✅ METODE TERMUDAH: DEPLOY VIA VERCEL (RECOMMENDED)

### LANGKAH 1: PERSIAPAN AKUN

1. **Buka browser**, kunjungi: https://vercel.com
2. Klik **"Sign Up"**
3. Pilih **"Continue with GitHub"** (atau email jika belum punya GitHub)
4. Jika belum punya GitHub:
   - Buka tab baru: https://github.com
   - Klik **"Sign up"**
   - Ikuti instruksi pendaftaran
   - Kembali ke Vercel, login dengan GitHub

### LANGKAH 2: DOWNLOAD PROJECT INI

**Di Figma Make:**
1. Cari tombol **"Export"** atau **"Download"** atau **"⋯ More"**
2. Klik **"Download as ZIP"** atau **"Export Project"**
3. Simpan file ZIP ke komputer Anda (misal: `mathoria-project.zip`)
4. **Extract/Unzip** file tersebut ke folder (misal: `C:\mathoria-app` atau `~/mathoria-app`)

### LANGKAH 3: UPLOAD KE GITHUB

**Opsi A - Via GitHub Desktop (TERMUDAH):**

1. Download **GitHub Desktop**: https://desktop.github.com/download
2. Install dan login dengan akun GitHub Anda
3. Klik **"File"** → **"New Repository"**
4. Isi form:
   - **Name:** `mathoria-app`
   - **Description:** "Platform evaluasi numerasi digital untuk SMA"
   - **Local Path:** Klik **"Choose..."** → Pilih folder mathoria yang sudah di-extract
   - **Initialize with README:** JANGAN centang (sudah ada file)
5. Klik **"Create Repository"**
6. Klik **"Publish repository"** (tombol biru di atas)
7. **PENTING:** Centang ✅ **"Keep this code private"** jika mau private
8. Klik **"Publish repository"**
9. Tunggu sampai selesai upload (ada progress bar)

**Opsi B - Via Web Upload (jika GitHub Desktop tidak bisa):**

1. Buka https://github.com
2. Klik tombol **"+"** (pojok kanan atas) → **"New repository"**
3. Isi:
   - **Repository name:** `mathoria-app`
   - **Private** atau **Public** (pilih sesuai keinginan)
4. Klik **"Create repository"**
5. Di halaman baru, klik **"uploading an existing file"**
6. **Drag & drop** semua file dari folder mathoria yang sudah di-extract
7. Scroll ke bawah, klik **"Commit changes"**

### LANGKAH 4: DEPLOY KE VERCEL

1. Kembali ke **https://vercel.com** (pastikan sudah login)
2. Klik **"Add New..."** → **"Project"**
3. Anda akan lihat list repository GitHub Anda
4. Cari **"mathoria-app"**, klik **"Import"**
5. Di halaman "Configure Project":
   - **Framework Preset:** Auto-detect (akan detect Vite)
   - **Root Directory:** `./ ` (default, jangan diubah)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)

6. **PENTING - Environment Variables:**
   Klik **"Environment Variables"**, lalu tambahkan **3 variable** ini:

   **Variable 1:**
   - **Key:** `VITE_SUPABASE_URL`
   - **Value:** `https://bbqpjitoimbusvuxyvce.supabase.co`

   **Variable 2:**
   - **Key:** `VITE_SUPABASE_ANON_KEY`
   - **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXBqaXRvaW1idXN2dXh5dmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjYzMjcsImV4cCI6MjA5MjEwMjMyN30.Fq_TtQtK0lMCRnaxyXnpyFX3gVmOAhHMm2491ydNxWk`

   **Variable 3:**
   - **Key:** `VITE_SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** *[Anda perlu dapatkan dari Supabase Dashboard]*

   **Cara dapat Service Role Key:**
   1. Buka tab baru: https://supabase.com/dashboard
   2. Login dengan akun Supabase Anda
   3. Pilih project **"bbqpjitoimbusvuxyvce"** (atau nama project Mathoria)
   4. Klik **"Settings"** (ikon ⚙️ di sidebar kiri)
   5. Klik **"API"**
   6. Scroll ke bawah, cari **"service_role"** key
   7. Klik **"Reveal"** → Copy key tersebut
   8. Paste ke Vercel Environment Variable ke-3

7. Setelah 3 environment variables ditambahkan, klik **"Deploy"** 🚀

8. **TUNGGU 2-5 MENIT** - Vercel akan:
   - Install dependencies
   - Build project
   - Deploy ke server

9. **SELESAI!** 🎉 
   - URL akan muncul: `https://mathoria-app.vercel.app`
   - Klik URL untuk buka aplikasi
   - Atau klik **"Visit"**

---

## 🔧 DEPLOY SUPABASE EDGE FUNCTIONS

Karena Mathoria pakai Supabase backend, Anda perlu deploy function-nya juga:

### LANGKAH 1: INSTALL SUPABASE CLI

**Windows:**
1. Download dari: https://github.com/supabase/cli/releases/latest
2. Cari file `supabase_windows_amd64.zip`
3. Extract, copy file `supabase.exe` ke folder `C:\Program Files\Supabase\`
4. Tambahkan ke PATH:
   - Tekan `Win + R`, ketik `sysdm.cpl`, Enter
   - Tab **"Advanced"** → **"Environment Variables"**
   - Di **"System Variables"**, cari **"Path"**, klik **"Edit"**
   - Klik **"New"**, tambahkan `C:\Program Files\Supabase\`
   - Klik **"OK"** semua

**Mac:**
```bash
brew install supabase/tap/supabase
```

**Linux:**
```bash
curl -sL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz
sudo mv supabase /usr/local/bin/
```

### LANGKAH 2: LOGIN & DEPLOY

1. **Buka Terminal / Command Prompt / PowerShell**

2. **Login ke Supabase:**
   ```bash
   supabase login
   ```
   - Browser akan terbuka
   - Login dengan akun Supabase Anda
   - Kembali ke terminal

3. **Navigasi ke folder project:**
   ```bash
   cd C:\mathoria-app
   # Atau di Mac/Linux:
   # cd ~/mathoria-app
   ```

4. **Link ke Supabase project:**
   ```bash
   supabase link --project-ref bbqpjitoimbusvuxyvce
   ```
   - Jika diminta password database, cek email Supabase Anda

5. **Deploy functions:**
   ```bash
   supabase functions deploy make-server-773c0d79
   ```

6. **Set secrets untuk functions:**
   ```bash
   supabase secrets set SUPABASE_URL=https://bbqpjitoimbusvuxyvce.supabase.co
   ```
   
   ```bash
   supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXBqaXRvaW1idXN2dXh5dmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjYzMjcsImV4cCI6MjA5MjEwMjMyN30.Fq_TtQtK0lMCRnaxyXnpyFX3gVmOAhHMm2491ydNxWk
   ```
   
   ```bash
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=[paste-service-role-key-anda-disini]
   ```

7. **Verifikasi deployment:**
   ```bash
   supabase functions list
   ```
   - Harus muncul `make-server-773c0d79`

---

## 🌐 SETUP CORS DI SUPABASE

1. Buka **Supabase Dashboard**: https://supabase.com/dashboard/project/bbqpjitoimbusvuxyvce
2. Klik **"Settings"** → **"API"**
3. Scroll ke **"CORS Configuration"**
4. Tambahkan URL Vercel Anda:
   ```
   https://mathoria-app.vercel.app
   ```
5. Klik **"Save"**

---

## ✅ TESTING SETELAH DEPLOYMENT

Buka aplikasi di: `https://mathoria-app.vercel.app`

**Test checklist:**
- [ ] Halaman login muncul dengan baik
- [ ] Bisa register akun baru
- [ ] Bisa login dengan akun yang sudah dibuat
- [ ] Dashboard muncul (namecard, level, badges)
- [ ] Bisa mulai quiz Level 1
- [ ] Pilih jawaban → skor bertambah
- [ ] Leaderboard menampilkan data
- [ ] Login sebagai guru (`Saya Guru` / password guru)
- [ ] Teacher Dashboard muncul (purple theme)
- [ ] Bisa lihat bank soal
- [ ] Level 6 essay system bekerja

---

## 🐛 TROUBLESHOOTING

### ERROR: "Build failed"
**Solusi:**
- Cek di Vercel Dashboard → Project → Deployments → Klik deployment yang failed
- Lihat error logs
- Biasanya karena environment variables belum diset

### ERROR: "Failed to fetch" atau "Network error"
**Solusi:**
- Pastikan CORS sudah diset di Supabase
- Pastikan Supabase functions sudah deployed
- Cek browser console (F12) untuk lihat error detail

### ERROR: "Unauthorized" atau "Invalid API key"
**Solusi:**
- Cek environment variables di Vercel sudah benar
- Pastikan `VITE_SUPABASE_ANON_KEY` sama dengan yang di Supabase
- Redeploy: Vercel Dashboard → Project → Deployments → tombol "..." → "Redeploy"

### ERROR: Function "make-server-773c0d79" not found
**Solusi:**
```bash
# Deploy ulang function
supabase functions deploy make-server-773c0d79

# Atau deploy semua functions
supabase functions deploy
```

---

## 📞 BANTUAN LEBIH LANJUT

Jika ada error yang tidak ada di troubleshooting:
1. Screenshot error message
2. Buka browser console (tekan F12)
3. Copy error yang muncul di tab "Console"
4. Tanyakan ke saya dengan detail error tersebut

---

## 🎉 SELAMAT!

Mathoria sekarang sudah LIVE di internet! 🚀

**Share URL Anda:**
- Ke siswa SMA untuk testing
- Ke guru untuk feedback
- Ke teman/portfolio

**URL Production:** `https://mathoria-app.vercel.app`

---

**Dibuat dengan ❤️ menggunakan:**
- React + TypeScript
- Vite
- Tailwind CSS v4
- Supabase (Database + Auth + Functions)
- Item Response Theory (IRT) 2PL Model
- PISA Framework 6 Levels
