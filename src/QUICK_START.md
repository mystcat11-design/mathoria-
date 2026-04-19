# ⚡ QUICK START - Deploy Mathoria dalam 30 Menit

Panduan super cepat untuk deploy Mathoria ke internet.

---

## 🎯 YANG ANDA BUTUHKAN

1. ✅ **Akun GitHub** (gratis) → https://github.com/signup
2. ✅ **Akun Vercel** (gratis) → https://vercel.com/signup
3. ✅ **Akun Supabase** (sudah ada) → https://supabase.com
4. ✅ **Project Mathoria** (download dari Figma Make)

---

## 🚀 3 LANGKAH UTAMA

### **STEP 1: UPLOAD KE GITHUB** (5 menit)

**Via GitHub Desktop (TERMUDAH):**
1. Download: https://desktop.github.com
2. Install → Login dengan GitHub
3. File → New Repository → Name: `mathoria-app`
4. Local Path: Pilih folder Mathoria yang sudah di-extract
5. "Publish repository" → Done! ✅

### **STEP 2: DEPLOY KE VERCEL** (10 menit)

1. Login Vercel: https://vercel.com (pilih "Continue with GitHub")
2. Add New Project → Import `mathoria-app`
3. **PENTING - Add 3 Environment Variables:**
   - `VITE_SUPABASE_URL` = `https://bbqpjitoimbusvuxyvce.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXBqaXRvaW1idXN2dXh5dmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjYzMjcsImV4cCI6MjA5MjEwMjMyN30.Fq_TtQtK0lMCRnaxyXnpyFX3gVmOAhHMm2491ydNxWk`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY` = *[Dapatkan dari Supabase Dashboard → Settings → API]*
4. Klik "Deploy" → Tunggu 3 menit
5. **DONE!** URL muncul: `https://mathoria-app.vercel.app` 🎉

### **STEP 3: DEPLOY SUPABASE FUNCTIONS** (15 menit)

**Install Supabase CLI:**
- **Windows:** Download dari https://github.com/supabase/cli/releases/latest
- **Mac:** `brew install supabase/tap/supabase`
- **Linux:** Lihat DEPLOYMENT_GUIDE.md

**Deploy:**
```bash
# Login
supabase login

# Navigate to project folder
cd path/to/mathoria-app

# Link project
supabase link --project-ref bbqpjitoimbusvuxyvce

# Deploy function
supabase functions deploy make-server-773c0d79

# Set secrets (3 commands)
supabase secrets set SUPABASE_URL=https://bbqpjitoimbusvuxyvce.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXBqaXRvaW1idXN2dXh5dmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MjYzMjcsImV4cCI6MjA5MjEwMjMyN30.Fq_TtQtK0lMCRnaxyXnpyFX3gVmOAhHMm2491ydNxWk
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=[paste-your-service-role-key]
```

---

## 🌐 SETUP CORS (2 menit)

1. Buka Supabase Dashboard
2. Settings → API → CORS Configuration
3. Tambahkan: `https://your-app.vercel.app`
4. Save

---

## ✅ TEST

Buka: `https://your-app.vercel.app`

- [ ] Login page muncul
- [ ] Register akun baru
- [ ] Dashboard muncul
- [ ] Quiz berfungsi
- [ ] Leaderboard muncul

---

## 🆘 TROUBLESHOOTING

**Build Failed?** 
→ Cek 3 environment variables sudah diisi di Vercel

**CORS Error?** 
→ Tambahkan domain ke Supabase CORS settings

**Function Not Found?** 
→ Deploy ulang: `supabase functions deploy make-server-773c0d79`

---

## 📚 DOKUMENTASI LENGKAP

- **Deployment Guide:** `DEPLOYMENT_GUIDE.md`
- **Deployment Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **README:** `README.md`

---

## 🎉 SELESAI!

**Production URL:** `https://mathoria-app.vercel.app`

**Share ke:**
- Siswa untuk testing
- Guru untuk feedback
- Portfolio Anda

---

**Total Time:** ~30 menit
**Cost:** FREE (Vercel + Supabase free tier)
**Status:** Production-ready! 🚀
