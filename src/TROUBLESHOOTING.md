# 🔧 TROUBLESHOOTING GUIDE - Mathoria Deployment

Panduan lengkap untuk mengatasi masalah deployment.

---

## 🚨 ERROR UMUM & SOLUSI

### **1. BUILD FAILED DI VERCEL**

**Error Message:**
```
Error: Build failed
Command "npm run build" exited with 1
```

**Kemungkinan Penyebab:**
- Environment variables belum diset
- Node version tidak compatible
- Dependencies error

**✅ SOLUSI:**

**A. Cek Environment Variables:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Pastikan ada 3 variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`
3. Pastikan TIDAK ada typo di nama variable
4. Pastikan value tidak ada spasi di awal/akhir

**B. Redeploy:**
1. Vercel Dashboard → Deployments
2. Klik tombol "..." pada deployment terakhir
3. Klik "Redeploy"
4. Tunggu build ulang

**C. Cek Build Logs:**
1. Vercel Dashboard → Deployments → Klik deployment yang failed
2. Baca error logs detail
3. Screenshot error → tanyakan ke saya

---

### **2. ENVIRONMENT VARIABLES NOT WORKING**

**Error Message:**
```
Cannot read environment variable 'VITE_SUPABASE_URL'
undefined
```

**Kemungkinan Penyebab:**
- Variable name salah (harus diawali `VITE_`)
- Belum redeploy setelah tambah env vars

**✅ SOLUSI:**

**A. Verifikasi Nama Variable:**
```
✅ BENAR:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SUPABASE_SERVICE_ROLE_KEY

❌ SALAH:
SUPABASE_URL (missing VITE_ prefix)
VITE_SUPABASE-URL (pakai dash)
vite_supabase_url (lowercase)
```

**B. Redeploy Wajib:**
- Environment variables hanya apply ke deployment BARU
- Setelah tambah/edit env vars, HARUS redeploy
- Vercel → Deployments → Redeploy

**C. Local Development:**
- Buat file `.env` di root folder
- Copy dari `.env.example`
- Restart dev server: `npm run dev`

---

### **3. CORS ERROR**

**Error Message di Browser Console:**
```
Access to fetch at 'https://bbqpjitoimbusvuxyvce.supabase.co/...' 
from origin 'https://mathoria-app.vercel.app' has been blocked by CORS policy
```

**Kemungkinan Penyebab:**
- Domain production belum ditambahkan ke Supabase CORS settings
- Typo di URL domain

**✅ SOLUSI:**

**A. Tambahkan Domain ke Supabase:**
1. Buka Supabase Dashboard
2. Pilih project Mathoria
3. Settings → API
4. Scroll ke "CORS Configuration"
5. Di "Additional Allowed Origins", tambahkan:
   ```
   https://mathoria-app.vercel.app
   ```
   **PENTING:**
   - Harus `https://` (bukan `http://`)
   - TIDAK ada trailing slash di akhir
   - Copy paste langsung dari browser untuk avoid typo

6. Klik "Save"
7. Tunggu 1-2 menit untuk propagasi

**B. Verifikasi URL:**
```
✅ BENAR:
https://mathoria-app.vercel.app

❌ SALAH:
http://mathoria-app.vercel.app (http bukan https)
https://mathoria-app.vercel.app/ (ada slash di akhir)
mathoria-app.vercel.app (missing protocol)
```

**C. Test:**
1. Refresh browser (Ctrl+F5 untuk hard refresh)
2. Coba login lagi
3. Cek browser console (F12) untuk error baru

---

### **4. SUPABASE FUNCTION NOT FOUND**

**Error Message:**
```
Failed to fetch
Function 'make-server-773c0d79' not found
404 Not Found
```

**Kemungkinan Penyebab:**
- Function belum deployed
- Function name salah
- Supabase CLI belum di-link

**✅ SOLUSI:**

**A. Verifikasi Function Deployed:**
```bash
# Di terminal/command prompt
supabase functions list
```

**Output yang BENAR:**
```
Functions:
  - make-server-773c0d79 (deployed)
```

**Jika tidak muncul, deploy ulang:**
```bash
# Pastikan di folder project
cd path/to/mathoria-app

# Deploy function
supabase functions deploy make-server-773c0d79
```

**B. Verifikasi Link Project:**
```bash
# Cek project yang ter-link
supabase projects list

# Jika belum linked, link ulang
supabase link --project-ref bbqpjitoimbusvuxyvce
```

**C. Cek Secrets:**
```bash
# List secrets (tidak akan show value, hanya key names)
supabase secrets list

# Harus ada 3 secrets:
# - SUPABASE_URL
# - SUPABASE_ANON_KEY  
# - SUPABASE_SERVICE_ROLE_KEY

# Jika ada yang missing, set ulang
supabase secrets set SUPABASE_URL=https://bbqpjitoimbusvuxyvce.supabase.co
supabase secrets set SUPABASE_ANON_KEY=[paste-anon-key]
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=[paste-service-role-key]
```

---

### **5. UNAUTHORIZED / INVALID API KEY**

**Error Message:**
```
Error: Invalid API key
401 Unauthorized
```

**Kemungkinan Penyebab:**
- API key salah/expired
- Service Role Key ter-expose di frontend (security issue)

**✅ SOLUSI:**

**A. Verifikasi Keys di Vercel:**
1. Vercel → Settings → Environment Variables
2. Cek `VITE_SUPABASE_ANON_KEY`:
   ```
   Harus dimulai dengan: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Cek `VITE_SUPABASE_SERVICE_ROLE_KEY`:
   - Dapatkan fresh key dari Supabase Dashboard
   - Settings → API → Service Role Key → Reveal
   - Copy → Paste ke Vercel env vars

**B. Regenerate Keys (jika keys compromised):**
1. Supabase Dashboard → Settings → API
2. Klik "Reset" pada Anon Key atau Service Role Key
3. Copy new keys
4. Update di Vercel environment variables
5. Redeploy

**C. Security Check:**
- **JANGAN** hardcode Service Role Key di frontend code
- **HANYA** pakai Anon Key di frontend
- Service Role Key hanya untuk server-side (Supabase Functions)

---

### **6. DATABASE CONNECTION ERROR**

**Error Message:**
```
Error connecting to database
Connection timeout
```

**Kemungkinan Penyebab:**
- Database password salah
- Database paused (free tier inactivity)

**✅ SOLUSI:**

**A. Cek Database Status:**
1. Supabase Dashboard → Home
2. Lihat status database
3. Jika "Paused", klik "Resume"

**B. Reset Database Password:**
1. Supabase Dashboard → Settings → Database
2. Klik "Reset database password"
3. Copy new password
4. Update di Supabase CLI:
   ```bash
   supabase link --project-ref bbqpjitoimbusvuxyvce
   # Enter new password when prompted
   ```

---

### **7. GITHUB DESKTOP - REPOSITORY NOT FOUND**

**Error Message:**
```
Repository not found
404: Not Found
```

**Kemungkinan Penyebab:**
- GitHub account belum logged in
- Repository belum published

**✅ SOLUSI:**

**A. Verifikasi Login:**
1. GitHub Desktop → File → Options → Accounts
2. Pastikan GitHub account ter-connect
3. Jika belum, klik "Sign in"

**B. Publish Repository:**
1. GitHub Desktop → tombol "Publish repository" (jika ada)
2. Pastikan tidak private (atau grant Vercel access ke private repos)

**C. Alternatif - Upload via Web:**
1. Buka github.com
2. New Repository
3. Upload files via web interface

---

### **8. SUPABASE CLI NOT RECOGNIZED**

**Error Message:**
```
'supabase' is not recognized as an internal or external command
```

**Kemungkinan Penyebab:**
- Supabase CLI belum ter-install
- PATH belum diset (Windows)

**✅ SOLUSI:**

**Windows:**
```
1. Download: github.com/supabase/cli/releases/latest
2. Extract supabase.exe ke C:\Program Files\Supabase\
3. Add to PATH:
   - Win+R → sysdm.cpl → Advanced → Environment Variables
   - System Variables → Path → Edit → New
   - Tambahkan: C:\Program Files\Supabase\
   - OK semua
4. RESTART Terminal/Command Prompt
5. Test: supabase --version
```

**Mac:**
```bash
# Install via Homebrew
brew install supabase/tap/supabase

# Test
supabase --version
```

**Linux:**
```bash
# Download & install
curl -sL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz
sudo mv supabase /usr/local/bin/

# Test
supabase --version
```

---

### **9. IMAGES NOT LOADING**

**Error Message:**
```
Failed to load image
404 Not Found
```

**Kemungkinan Penyebab:**
- Foto profil belum uploaded ke Supabase Storage
- Storage bucket belum dibuat
- CORS storage settings

**✅ SOLUSI:**

**A. Verifikasi Storage Bucket:**
1. Supabase Dashboard → Storage
2. Pastikan ada bucket `make-773c0d79-profile-pictures`
3. Jika belum ada, server akan auto-create saat ada upload

**B. Upload Foto:**
- Login sebagai student
- Klik edit profile
- Upload foto
- Cek di Supabase Storage apakah ter-upload

**C. Storage CORS:**
1. Supabase Dashboard → Storage → Policies
2. Pastikan ada policy untuk public read (jika foto public)

---

### **10. QUIZ NOT UPDATING SCORE**

**Error Message:**
```
Score not updating
Progress not saved
```

**Kemungkinan Penyebab:**
- localStorage full
- Supabase sync error
- Backend function error

**✅ SOLUSI:**

**A. Clear Browser Cache:**
```
Chrome/Edge: Ctrl+Shift+Delete
- Clear cookies and cached images
- Time range: All time
```

**B. Check Browser Console:**
```
F12 → Console tab
Lihat error merah
Screenshot → tanyakan ke saya
```

**C. Verifikasi Backend:**
1. Supabase Dashboard → Logs
2. Cek function logs untuk error
3. Redeploy function jika perlu:
   ```bash
   supabase functions deploy make-server-773c0d79
   ```

---

## 🔍 DEBUGGING TIPS

### **Browser Console (F12):**
```
Console tab → Lihat error messages
Network tab → Lihat failed requests
Application tab → Lihat localStorage
```

### **Vercel Logs:**
```
Vercel Dashboard → Project → Deployments → [Latest] → Function Logs
```

### **Supabase Logs:**
```
Supabase Dashboard → Logs → Filter by:
- API requests
- Function executions
- Database queries
```

---

## 📞 MASIH STUCK?

Jika masalah belum resolved:

1. **Screenshot:**
   - Error message lengkap
   - Browser console (F12 → Console tab)
   - URL yang error

2. **Copy Error:**
   ```
   Buka browser console (F12)
   Copy paste error message lengkap
   ```

3. **Tanya ke Saya:**
   - "Di step mana error terjadi?"
   - "Apa error message-nya?"
   - "Sudah coba solusi apa saja?"

4. **Include Info:**
   - OS: Windows/Mac/Linux?
   - Browser: Chrome/Firefox/Edge?
   - Step ke berapa: Deploy Vercel? Supabase Functions?

---

## ✅ PREVENTION CHECKLIST

Untuk avoid errors, pastikan:

- [ ] Semua environment variables diisi dengan benar
- [ ] Nama variable diawali `VITE_`
- [ ] Service Role Key dari Supabase ter-update
- [ ] CORS sudah diset di Supabase
- [ ] Supabase Functions sudah deployed
- [ ] Supabase Secrets sudah diset (3 items)
- [ ] Domain production sudah ditambahkan ke CORS
- [ ] Redeploy Vercel setelah tambah env vars
- [ ] Browser cache cleared saat testing

---

**Semoga troubleshooting guide ini membantu! 🚀**

Jika ada error lain yang belum tercakup, tanyakan ke saya dengan detail lengkap! 😊
