# 🎬 VIDEO TUTORIAL SCRIPT - Deploy Mathoria

Script ini bisa Anda ikuti step-by-step sambil screen record untuk membuat video tutorial.

---

## 🎥 INTRO (30 detik)

**[Screen: Figma Make dengan Mathoria]**

"Halo! Di video ini saya akan tunjukkan cara deploy Mathoria, platform evaluasi numerasi digital, ke internet secara GRATIS menggunakan Vercel dan Supabase."

"Kita akan deploy dalam 3 langkah utama:"
1. Upload ke GitHub
2. Deploy ke Vercel
3. Deploy Supabase Functions

"Mari kita mulai!"

---

## 📥 PART 1: DOWNLOAD PROJECT (2 menit)

**[Screen: Figma Make]**

"Langkah pertama, download project dari Figma Make."

1. "Klik tombol Export atau Download di sini..."
2. "Pilih Download as ZIP..."
3. "Simpan ke komputer Anda..."

**[Screen: File Explorer]**

4. "Setelah download selesai, kita extract file ZIP ini..."
5. "Klik kanan → Extract All → Extract..."
6. "Oke, project sudah ter-extract. Kita bisa lihat ada folder components, utils, dan file App.tsx."

---

## 🔐 PART 2: DAPATKAN SUPABASE CREDENTIALS (3 menit)

**[Screen: Browser → Supabase Dashboard]**

"Sebelum deploy, kita perlu dapatkan dulu credentials dari Supabase."

1. "Buka browser, kunjungi supabase.com/dashboard..."
2. "Login dengan akun Supabase Anda..."
3. "Pilih project Mathoria kita di sini..."
4. "Klik Settings di sidebar kiri..."
5. "Lalu klik API..."

**[Screen: Supabase API Settings]**

6. "Scroll ke bawah, di sini kita lihat ada Project URL dan API Keys..."
7. "Project URL sudah ada di code, jadi tidak perlu copy..."
8. "Anon key juga sudah ada..."
9. "Yang kita butuhkan adalah Service Role Key ini..."
10. "Klik Reveal..."
11. "Copy key ini... Simpan di Notepad dulu untuk nanti kita pakai..."

---

## 📤 PART 3: UPLOAD KE GITHUB (5 menit)

**[Screen: Browser → github.com]**

"Sekarang kita upload project ke GitHub."

"Kalau Anda belum punya akun GitHub, klik Sign Up di sini dan buat akun dulu."

"Kalau sudah punya, langsung login saja..."

**[Screen: GitHub Desktop Download Page]**

"Untuk upload, kita akan pakai GitHub Desktop karena paling mudah."

1. "Download GitHub Desktop dari desktop.github.com..."
2. "Install aplikasinya..."

**[Screen: GitHub Desktop]**

3. "Buka GitHub Desktop..."
4. "Login dengan akun GitHub Anda... Continue..."

**[Screen: GitHub Desktop - New Repository]**

5. "Klik File → New Repository..."
6. "Name: mathoria-app..."
7. "Description: Platform evaluasi numerasi digital..."
8. "Local Path: Klik Choose... Pilih folder mathoria yang tadi kita extract..."
9. "JANGAN centang Initialize with README karena sudah ada file..."
10. "Klik Create Repository..."

**[Screen: GitHub Desktop - Publish]**

11. "Oke, repository sudah dibuat. Sekarang kita publish ke GitHub..."
12. "Klik tombol Publish repository di sini..."
13. "Kalau mau private, centang Keep this code private..."
14. "Klik Publish repository..."
15. "Tunggu upload selesai... Selesai! Project sudah di GitHub."

---

## 🚀 PART 4: DEPLOY KE VERCEL (7 menit)

**[Screen: Browser → vercel.com]**

"Sekarang kita deploy ke Vercel."

"Kalau belum punya akun, klik Sign Up..."

1. "Klik Continue with GitHub..."
2. "Authorize Vercel untuk akses GitHub Anda..."

**[Screen: Vercel Dashboard]**

3. "Oke, kita sudah di Vercel Dashboard..."
4. "Klik Add New... → Project..."

**[Screen: Vercel - Import Repository]**

5. "Di sini Vercel akan tampilkan semua repository GitHub kita..."
6. "Cari mathoria-app... Klik Import..."

**[Screen: Vercel - Configure Project]**

7. "Di halaman Configure Project ini..."
8. "Framework Preset: Auto-detect, sudah detect Vite... Bagus..."
9. "Root Directory: ./ (default)..."
10. "Build Command: npm run build (default)..."
11. "Output Directory: dist (default)..."

**[Screen: Vercel - Environment Variables]**

"Sekarang yang PENTING, kita tambahkan Environment Variables."

12. "Expand Environment Variables di sini..."
13. "Klik tombol Add..."

**Variable 1:**
14. "Key: VITE_SUPABASE_URL..."
15. "Value: https://bbqpjitoimbusvuxyvce.supabase.co..."
16. "Paste..."

**Variable 2:**
17. "Klik Add lagi..."
18. "Key: VITE_SUPABASE_ANON_KEY..."
19. "Value: Ini agak panjang, saya akan paste dari file..."
20. "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... sampai akhir..."

**Variable 3:**
21. "Klik Add lagi untuk yang ketiga..."
22. "Key: VITE_SUPABASE_SERVICE_ROLE_KEY..."
23. "Value: Ini Service Role Key yang tadi kita copy dari Supabase..."
24. "Paste dari Notepad tadi..."

25. "Oke, 3 Environment Variables sudah ditambahkan..."

**[Screen: Vercel - Deploy Button]**

26. "Sekarang kita siap deploy! Klik tombol Deploy..."
27. "Vercel akan mulai build project kita..."
28. "Kita tunggu sekitar 2-3 menit..."

**[Screen: Vercel - Build Logs]**

29. "Di sini kita bisa lihat build logs..."
30. "Installing dependencies... Building... Uploading..."

**[Screen: Vercel - Success]**

31. "Congratulations! Deployment successful!"
32. "Di sini ada URL production kita: mathoria-app.vercel.app..."
33. "Klik Visit untuk buka aplikasi..."

**[Screen: Mathoria Login Page]**

34. "Boom! Mathoria sudah live di internet!"
35. "Kita lihat login page sudah muncul dengan baik..."

"Tapi tunggu dulu, kita belum selesai. Kita masih perlu deploy Supabase Functions agar fitur backend berfungsi."

---

## ⚙️ PART 5: DEPLOY SUPABASE FUNCTIONS (10 menit)

**[Screen: Supabase CLI Download Page]**

"Untuk deploy functions, kita perlu install Supabase CLI dulu."

**Windows Users:**
1. "Buka github.com/supabase/cli/releases/latest..."
2. "Download file supabase_windows_amd64.zip..."
3. "Extract file zip ini..."
4. "Copy file supabase.exe ke folder C:\Program Files\Supabase\..."
5. "Lalu kita tambahkan ke PATH..." *(show System Environment Variables)*
6. "Klik OK semua..."

**Mac Users:**
1. "Buka Terminal..."
2. "Ketik: brew install supabase/tap/supabase..."
3. "Enter... Tunggu install selesai..."

**[Screen: Terminal / Command Prompt]**

"Sekarang kita cek apakah Supabase CLI sudah ter-install."

7. "Buka Command Prompt atau Terminal..."
8. "Ketik: supabase --version..."
9. "Enter..."
10. "Kalau muncul versi number, berarti sudah berhasil install."

**[Screen: Terminal - supabase login]**

11. "Sekarang kita login ke Supabase..."
12. "Ketik: supabase login..."
13. "Enter..."

**[Screen: Browser - Supabase Authorization]**

14. "Browser akan terbuka otomatis..."
15. "Klik Authorize untuk authorize Supabase CLI..."
16. "Oke, authorization successful..."

**[Screen: Terminal - navigate to project]**

17. "Kembali ke terminal..."
18. "Kita navigate ke folder project mathoria..."
19. "Ketik: cd C:\mathoria-app..." *(adjust path sesuai OS)*
20. "Enter..."

**[Screen: Terminal - supabase link]**

21. "Sekarang kita link project kita dengan Supabase..."
22. "Ketik: supabase link --project-ref bbqpjitoimbusvuxyvce..."
23. "Enter..."
24. "Kalau diminta password, masukkan database password Anda..."
25. "Finished linking project!"

**[Screen: Terminal - deploy function]**

26. "Sekarang kita deploy function-nya..."
27. "Ketik: supabase functions deploy make-server-773c0d79..."
28. "Enter..."
29. "Tunggu deployment selesai..."
30. "Deployed function make-server-773c0d79... Success!"

**[Screen: Terminal - set secrets]**

31. "Terakhir, kita set secrets untuk function..."
32. "Ada 3 secrets yang perlu kita set..."

**Secret 1:**
33. "Ketik: supabase secrets set SUPABASE_URL=https://bbqpjitoimbusvuxyvce.supabase.co..."
34. "Enter... Success..."

**Secret 2:**
35. "Ketik: supabase secrets set SUPABASE_ANON_KEY=..." *(paste anon key)*
36. "Enter... Success..."

**Secret 3:**
37. "Ketik: supabase secrets set SUPABASE_SERVICE_ROLE_KEY=..." *(paste service role key)*
38. "Enter... Success..."

**[Screen: Terminal - verify]**

39. "Kita verifikasi function sudah deployed..."
40. "Ketik: supabase functions list..."
41. "Enter..."
42. "Di sini kita lihat make-server-773c0d79 sudah muncul... Perfect!"

---

## 🌐 PART 6: SETUP CORS (2 menit)

**[Screen: Browser → Supabase Dashboard]**

"Langkah terakhir, kita setup CORS di Supabase."

1. "Buka Supabase Dashboard..."
2. "Settings → API..."
3. "Scroll ke CORS Configuration..."
4. "Di Additional Allowed Origins, tambahkan URL Vercel kita..."
5. "https://mathoria-app.vercel.app..." *(paste URL production)*
6. "Klik Save..."
7. "Done!"

---

## ✅ PART 7: TESTING (5 menit)

**[Screen: Browser → Production URL]**

"Sekarang kita test aplikasi yang sudah di-deploy."

1. "Buka URL production kita: mathoria-app.vercel.app..."

**Test Student Flow:**

2. "Halaman login muncul dengan baik..."
3. "Kita coba register akun baru..."
4. "Username: testuser, Password: test123..."
5. "Klik Daftar..."
6. "Redirect ke dashboard... Bagus!"
7. "Di sini kita lihat namecard, level, badges..."
8. "Kita coba mulai quiz Level 1..."
9. "Soal muncul... Pilih jawaban... Submit..."
10. "Skor bertambah! XP bar naik!"
11. "Cek leaderboard... Data muncul dengan baik..."

**Test Guru Flow:**

12. "Sekarang kita test guru dashboard..."
13. "Logout dari student account..."
14. "Login sebagai guru: Username 'Saya Guru'..."
15. "Dashboard guru muncul dengan purple theme... Perfect!"
16. "Klik tab Bank Soal..."
17. "Kita coba tambah soal Level 6..."
18. "Klik Tambah Soal... Pilih Level 6..."
19. "Form berubah jadi Essay Mode... Bagus!"
20. "Field Teks Essay, Jawaban yang Diinginkan, Panduan Rubrik semua muncul..."

21. "Semua fitur berfungsi dengan baik!"

---

## 🎉 OUTRO (1 menit)

**[Screen: Production URL di browser]**

"Dan selesai! Mathoria sekarang sudah LIVE di internet!"

"Recap singkat yang kita lakukan:"
1. ✅ Download project dari Figma Make
2. ✅ Upload ke GitHub via GitHub Desktop
3. ✅ Deploy ke Vercel dengan 3 environment variables
4. ✅ Deploy Supabase Functions via CLI
5. ✅ Setup CORS di Supabase
6. ✅ Testing semua fitur

"Production URL kita: https://mathoria-app.vercel.app"

"Sekarang Anda bisa share URL ini ke siswa, guru, atau portfolio Anda!"

"Kalau ada pertanyaan atau error, cek file DEPLOYMENT_GUIDE.md atau TROUBLESHOOTING section di video description."

"Terima kasih sudah menonton! Jangan lupa like dan subscribe!"

"Sampai jumpa di video berikutnya! 👋"

---

## 📝 VIDEO DESCRIPTION TEMPLATE

```
🎓 CARA DEPLOY MATHORIA - Platform Evaluasi Numerasi Digital ke Internet GRATIS!

Di video ini saya tunjukkan step-by-step cara deploy Mathoria menggunakan:
✅ Vercel (Frontend Hosting)
✅ Supabase (Backend + Database)
✅ GitHub (Version Control)

⏱️ TIMESTAMPS:
0:00 - Intro
0:30 - Download Project
2:30 - Dapatkan Supabase Credentials
5:30 - Upload ke GitHub
10:30 - Deploy ke Vercel
17:30 - Deploy Supabase Functions
27:30 - Setup CORS
29:30 - Testing
34:30 - Outro

📚 RESOURCES:
- GitHub: https://github.com
- Vercel: https://vercel.com
- Supabase: https://supabase.com
- GitHub Desktop: https://desktop.github.com
- Supabase CLI: https://github.com/supabase/cli

📁 FILES:
- DEPLOYMENT_GUIDE.md (Panduan lengkap)
- DEPLOYMENT_CHECKLIST.md (Checklist)
- QUICK_START.md (Panduan cepat)

🆘 TROUBLESHOOTING:
- Build Failed: Cek environment variables
- CORS Error: Tambahkan domain ke Supabase
- Function Not Found: Redeploy functions

💬 QUESTIONS?
Tulis di komentar! Saya akan bantu troubleshoot.

🔔 SUBSCRIBE untuk tutorial coding lainnya!

#Mathoria #Vercel #Supabase #WebDevelopment #Deployment #Tutorial
```

---

**Video Duration Estimate:** 35 menit
**Difficulty:** Beginner-Friendly
**Prerequisites:** Basic computer literacy
**Cost:** 100% FREE
