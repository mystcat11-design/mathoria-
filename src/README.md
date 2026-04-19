# 🎓 MATHORIA - Platform Evaluasi Numerasi Digital

Platform tes adaptif berbasis **Item Response Theory (IRT)** dengan algoritma **2-Parameter Logistic Model (2PL)** untuk siswa SMA.

## ✨ Fitur Utama

### 📊 Sistem Tes Adaptif (IRT 2PL)
- Soal menyesuaikan dengan kemampuan siswa (θ - theta)
- Algoritma 2PL: `P(θ) = 1 / (1 + e^(-a(θ - b)))`
- Real-time ability tracking

### 📚 Materi & Level
**5 Topik Matematika:**
- Eksponen
- Logaritma
- SPLDV (Sistem Persamaan Linear Dua Variabel)
- SPLTV (Sistem Persamaan Linear Tiga Variabel)
- SPtLDV (Sistem Pertidaksamaan Linear Dua Variabel)

**6 Level Kesulitan (PISA Framework):**
1. **Level 1:** Mengingat & menghitung langsung
2. **Level 2:** Prosedural & representasi sederhana
3. **Level 3:** Interpretasi & koneksi data
4. **Level 4:** Pemodelan matematis
5. **Level 5:** Evaluasi & penalaran
6. **Level 6:** Justifikasi & refleksi abstrak (Essay)

### 🎮 Gamifikasi
- **Leaderboard Real-time** dengan ranking kompetitif
- **30 Badges Achievement** (dari mudah hingga tersulit)
- **Progress Visual** dengan XP bar & level unlock
- **Namecard System** dengan foto profil terintegrasi
- **Badge Eksklusif** untuk siswa yang menyelesaikan semua level

### 📝 Level 6 Essay System
**Untuk Siswa:**
- Soal essay kontekstual multi-materi
- Textarea minimum 100 kata
- Submit untuk review guru

**Untuk Guru:**
- Rubrik penilaian 5 kriteria:
  - 🎯 Identifikasi & Pemodelan (25%)
  - 🔗 Integrasi Antar-Materi (30%)
  - 📐 Akurasi Perhitungan (15%)
  - ⚖️ Evaluasi & Justifikasi (20%)
  - 💡 Kreativitas Solusi (10%)
- Feedback probing berbasis Socratic questioning
- 4 jenis kesalahan: Isolasi, Prediksi, Batasan, Justifikasi

### 👨‍🏫 Dashboard Guru
**Username khusus:** `Saya Guru`
- **Purple theme** eksklusif
- **Analytics & Monitoring:**
  - Student performance tracking
  - Bank soal editor (Level 1-6)
  - Essay review panel
  - Student progress overview
- **Question Bank Editor:**
  - Adaptive form (MC untuk Level 1-5, Essay untuk Level 6)
  - Panduan rubrik penilaian
  - Export/Import JSON
  - Filter by level & topic

### ☁️ Backend Integration (Supabase)
- **Real-time sync** across devices
- **Auto-save** student progress
- **Cloud storage** untuk foto profil
- **Supabase Auth** untuk login/signup
- **Edge Functions** untuk server-side logic
- **PostgreSQL database** dengan KV store

## 🚀 Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (Auth + Database + Functions + Storage)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Toast:** Sonner
- **Algorithm:** IRT 2PL Model

## 📁 Struktur Project

```
mathoria-app/
├── components/
│   ├── Dashboard.tsx              # Main student dashboard
│   ├── QuizInterface.tsx          # Level 1-5 multiple choice
│   ├── EssayQuizInterface.tsx     # Level 6 essay system
│   ├── TeacherDashboard.tsx       # Guru dashboard (purple)
│   ├── EssayReviewPanel.tsx       # Guru review panel
│   ├── QuestionBankEditor.tsx     # Bank soal editor (adaptive)
│   ├── Leaderboard.tsx            # Competitive leaderboard
│   ├── Profile.tsx                # Student profile
│   ├── XPBar.tsx                  # XP progress bar
│   ├── AchievementNotification.tsx
│   └── ...
├── utils/
│   ├── irtEngine.ts               # IRT 2PL algorithm + question bank
│   ├── badgeChecker.ts            # Badge achievement logic
│   ├── badgeInfo.ts               # 30 badge definitions
│   ├── supabaseClient.ts          # Supabase API client
│   └── supabase/info.tsx          # Supabase credentials
├── supabase/functions/
│   └── server/
│       ├── index.tsx              # Hono web server
│       └── kv_store.tsx           # KV operations
├── App.tsx                        # Main app entry
└── styles/globals.css             # Tailwind v4 config

```

## 🔧 Environment Variables

```env
VITE_SUPABASE_URL=https://bbqpjitoimbusvuxyvce.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

## 📦 Installation (Local Development)

```bash
# Clone repository
git clone https://github.com/yourusername/mathoria-app.git
cd mathoria-app

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🌐 Deployment

**Lihat panduan lengkap di:** `DEPLOYMENT_GUIDE.md`

**Quick Deploy:**
1. Push ke GitHub
2. Connect ke Vercel/Netlify
3. Set environment variables
4. Deploy Supabase functions
5. Done! 🚀

## 📖 Dokumentasi

### IRT 2PL Model
```typescript
// Probability of correct response
P(θ) = 1 / (1 + e^(-a(θ - b)))

// Where:
// θ (theta) = Student ability
// a = Discrimination parameter (0.6 - 2.5)
// b = Difficulty parameter (-2.0 to 3.0)
```

### Question Bank Structure
```typescript
interface Question {
  id: string;
  question: string;              // For Level 1-5
  options: { id: string; text: string }[];  // Empty for Level 6
  correctAnswer: string;         // Empty for Level 6
  difficulty: number;            // -2.0 to 3.0
  discrimination: number;        // 0.6 to 2.5
  topic: string;
  pisaLevel: number;             // 1-6
  pisaLevelName: string;
  explanation: string;
  hints?: string[];
  // Level 6 Essay fields
  text?: string;                 // Essay question text
  expectedAnswer?: string;       // Grading guideline
  rubricGuidelines?: {
    identifikasi: string;
    integrasi: string;
    akurasi: string;
    evaluasi: string;
    kreativitas: string;
  };
}
```

## 🎯 User Roles

### Student Account
- Register dengan username & password
- Upload foto profil
- Pilih level (unlock progressively)
- Dapatkan badges
- Compete di leaderboard

### Teacher Account
**Username:** `Saya Guru`
**Password:** [set by admin]

**Akses:**
- View student performance
- Review Level 6 essays
- Edit bank soal
- Monitor analytics

## 🏆 Badge System (30 Total)

**Kategori:**
- 🎯 Speed Badges (3): Fast Learner, Speed Demon, Lightning
- 🔥 Streak Badges (3): Consistent, Dedicated, Unstoppable
- 📚 Level Completion (6): Novice → Grand Master
- 💯 Accuracy Badges (3): Sharp Shooter, Perfectionist, Flawless
- 🌟 Topic Mastery (5): Eksponen, Logaritma, SPLDV, SPLTV, SPtLDV Expert
- ⚡ Combo Badges (3): Chain Reaction, Combo King, Combo God
- 🎓 Special Badges (7): Essay Master, Perfect Run, Math Wizard, dll

## 📊 Analytics Features

- **Student theta (θ) tracking**
- **Performance by topic**
- **Level completion rates**
- **Time spent per question**
- **Accuracy trends**
- **Badge achievement timeline**

## 🔐 Security

- Supabase Row Level Security (RLS)
- Environment variables untuk credentials
- Service Role Key tidak exposed ke frontend
- CORS configuration untuk production domain

## 🐛 Known Issues & Solutions

**Issue:** Build error di deployment
**Solution:** Check environment variables di platform

**Issue:** CORS error
**Solution:** Add domain ke Supabase CORS settings

**Issue:** Function not found
**Solution:** Redeploy Supabase functions

## 📝 License

MIT License - Feel free to use for educational purposes

## 👥 Credits

**Developer:** [Your Name]
**Framework:** PISA Mathematics Assessment
**Algorithm:** IRT 2PL Model (Birnbaum, 1968)
**Backend:** Supabase
**UI Library:** Tailwind CSS v4

## 📞 Support

- 📧 Email: support@mathoria.com
- 📱 GitHub Issues: [github.com/yourusername/mathoria-app/issues]
- 📚 Documentation: [DEPLOYMENT_GUIDE.md]

---

**Made with ❤️ for Indonesian High School Students**

**Platform Version:** 1.0.0
**Last Updated:** April 2026
