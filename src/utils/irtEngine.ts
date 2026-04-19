export interface Question {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  difficulty: number;
  discrimination: number;
  topic: string;
  pisaLevel: number;
  pisaLevelName: string;
  explanation: string;
  hints?: string[];
  // For Level 6 Essay questions
  text?: string; // Full essay question text
  expectedAnswer?: string; // Jawaban yang diinginkan / Grading guidelines
  rubricGuidelines?: {
    identifikasi: string;
    integrasi: string;
    akurasi: string;
    evaluasi: string;
    kreativitas: string;
  };
}

// Compact question bank - 18 essential questions covering all topics & levels
export const questionBank: Question[] = [
  // LEVEL 1 - Basic (2 questions)
  {
    id: 'l1_1',
    question: '2³ × 2² = ...',
    options: [
      { id: 'A', text: '2⁵' },
      { id: 'B', text: '2⁶' },
      { id: 'C', text: '4⁵' },
      { id: 'D', text: '4⁶' }
    ],
    correctAnswer: 'A',
    difficulty: -2.0,
    discrimination: 1.0,
    topic: 'Eksponen',
    pisaLevel: 1,
    pisaLevelName: 'Mengingat & menghitung langsung',
    explanation: 'Sifat eksponen: aⁿ × aᵐ = aⁿ⁺ᵐ, jadi 2³ × 2² = 2³⁺² = 2⁵',
    hints: ['Ingat sifat perkalian eksponen dengan basis sama', 'Jumlahkan pangkatnya: 3 + 2 = 5']
  },
  {
    id: 'l1_2',
    question: 'log 100 = ...',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '10' },
      { id: 'D', text: '100' }
    ],
    correctAnswer: 'B',
    difficulty: -2.0,
    discrimination: 1.0,
    topic: 'Logaritma',
    pisaLevel: 1,
    pisaLevelName: 'Mengingat & menghitung langsung',
    explanation: 'log 100 = log 10² = 2',
    hints: ['100 = 10²', 'log aⁿ = n × log a']
  },

  // LEVEL 2 - Procedural (3 questions)
  {
    id: 'l2_1',
    question: '(2³)² = ...',
    options: [
      { id: 'A', text: '2⁵' },
      { id: 'B', text: '2⁶' },
      { id: 'C', text: '4⁶' },
      { id: 'D', text: '8²' }
    ],
    correctAnswer: 'B',
    difficulty: -1.0,
    discrimination: 1.2,
    topic: 'Eksponen',
    pisaLevel: 2,
    pisaLevelName: 'Prosedural & representasi sederhana',
    explanation: 'Sifat eksponen: (aⁿ)ᵐ = aⁿˣᵐ, jadi (2³)² = 2³ˣ² = 2⁶',
    hints: ['Gunakan sifat pangkat dari pangkat', 'Kalikan eksponennya: 3 × 2 = 6']
  },
  {
    id: 'l2_2',
    question: 'Jika x + y = 10 dan x - y = 4, maka x = ...',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '7' },
      { id: 'C', text: '8' },
      { id: 'D', text: '14' }
    ],
    correctAnswer: 'B',
    difficulty: -1.0,
    discrimination: 1.2,
    topic: 'SPLDV',
    pisaLevel: 2,
    pisaLevelName: 'Prosedural & representasi sederhana',
    explanation: 'Eliminasi: (x+y)+(x-y) = 10+4 → 2x = 14 → x = 7',
    hints: ['Jumlahkan kedua persamaan', 'y akan tereliminasi']
  },
  {
    id: 'l2_3',
    question: 'log₂ 8 + log₂ 4 = ...',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '5' },
      { id: 'C', text: '7' },
      { id: 'D', text: '32' }
    ],
    correctAnswer: 'B',
    difficulty: -1.0,
    discrimination: 1.2,
    topic: 'Logaritma',
    pisaLevel: 2,
    pisaLevelName: 'Prosedural & representasi sederhana',
    explanation: 'log₂ 8 = 3, log₂ 4 = 2, jadi 3 + 2 = 5',
    hints: ['Hitung masing-masing: 2³ = 8, 2² = 4', 'Jumlahkan hasilnya']
  },

  // LEVEL 3 - Interpretation (3 questions)
  {
    id: 'l3_1',
    question: 'Jika 2ˣ = 8 dan 2ʸ = 4, maka x + y = ...',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '5' },
      { id: 'C', text: '7' },
      { id: 'D', text: '12' }
    ],
    correctAnswer: 'B',
    difficulty: 0.0,
    discrimination: 1.3,
    topic: 'Eksponen',
    pisaLevel: 3,
    pisaLevelName: 'Interpretasi & koneksi data',
    explanation: '2ˣ = 8 = 2³ → x = 3; 2ʸ = 4 = 2² → y = 2; x + y = 5',
    hints: ['Ubah 8 dan 4 ke bentuk pangkat 2', 'Samakan basis untuk mendapat eksponen']
  },
  {
    id: 'l3_2',
    question: 'Sistem x + 2y = 8 dan 2x + y = 10 memiliki solusi x = ...',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '3' },
      { id: 'C', text: '4' },
      { id: 'D', text: '5' }
    ],
    correctAnswer: 'C',
    difficulty: 0.0,
    discrimination: 1.3,
    topic: 'SPLDV',
    pisaLevel: 3,
    pisaLevelName: 'Interpretasi & koneksi data',
    explanation: 'Eliminasi atau substitusi: x = 4, y = 2',
    hints: ['Kalikan persamaan pertama dengan 2', 'Kurangkan untuk eliminasi y']
  },
  {
    id: 'l3_3',
    question: 'Jika x + y + z = 6, x = 2y, dan y = z, maka z = ...',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '1.5' },
      { id: 'C', text: '2' },
      { id: 'D', text: '3' }
    ],
    correctAnswer: 'B',
    difficulty: 0.0,
    discrimination: 1.3,
    topic: 'SPLTV',
    pisaLevel: 3,
    pisaLevelName: 'Interpretasi & koneksi data',
    explanation: 'x = 2y, y = z → x = 2z. Substitusi: 2z + z + z = 6 → 4z = 6 → z = 1.5',
    hints: ['Nyatakan semua variabel dalam z', 'Substitusi ke persamaan pertama']
  },

  // LEVEL 4 - Mathematical modeling (3 questions)
  {
    id: 'l4_1',
    question: 'Jika 3ˣ⁺¹ = 27ˣ⁻¹, maka x = ...',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' }
    ],
    correctAnswer: 'B',
    difficulty: 1.0,
    discrimination: 1.4,
    topic: 'Eksponen',
    pisaLevel: 4,
    pisaLevelName: 'Pemodelan matematis',
    explanation: '3ˣ⁺¹ = (3³)ˣ⁻¹ = 3³⁽ˣ⁻¹⁾ → x+1 = 3x-3 → x = 2',
    hints: ['Ubah 27 menjadi 3³', 'Samakan basis, lalu samakan eksponen']
  },
  {
    id: 'l4_2',
    question: 'Jika log x + log y = 2 dan log x - log y = 0, maka xy = ...',
    options: [
      { id: 'A', text: '10' },
      { id: 'B', text: '100' },
      { id: 'C', text: '1000' },
      { id: 'D', text: '10000' }
    ],
    correctAnswer: 'B',
    difficulty: 1.0,
    discrimination: 1.4,
    topic: 'Logaritma',
    pisaLevel: 4,
    pisaLevelName: 'Pemodelan matematis',
    explanation: 'log x - log y = 0 → x = y. log x + log y = 2 → log x² = 2 → x² = 100 → xy = 100',
    hints: ['Dari persamaan kedua: x = y', 'Substitusi ke persamaan pertama']
  },
  {
    id: 'l4_3',
    question: 'Sistem x + y ≤ 10 dan x ≥ 2y memiliki titik (6, y). Nilai y maksimal = ...',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '3' },
      { id: 'C', text: '4' },
      { id: 'D', text: '5' }
    ],
    correctAnswer: 'B',
    difficulty: 1.0,
    discrimination: 1.4,
    topic: 'SPtLDV',
    pisaLevel: 4,
    pisaLevelName: 'Pemodelan matematis',
    explanation: 'x = 6: 6 + y ≤ 10 → y ≤ 4; 6 ≥ 2y → y ≤ 3. Maksimal y = 3',
    hints: ['Substitusi x = 6 ke kedua pertidaksamaan', 'Ambil nilai y terkecil dari kedua batasan']
  },

  // LEVEL 5 - Evaluation (3 questions)
  {
    id: 'l5_1',
    question: 'Jika 2ˣ + 2⁻ˣ = 5, maka 4ˣ + 4⁻ˣ = ...',
    options: [
      { id: 'A', text: '21' },
      { id: 'B', text: '23' },
      { id: 'C', text: '25' },
      { id: 'D', text: '27' }
    ],
    correctAnswer: 'B',
    difficulty: 2.0,
    discrimination: 1.5,
    topic: 'Eksponen',
    pisaLevel: 5,
    pisaLevelName: 'Evaluasi & penalaran',
    explanation: '(2ˣ + 2⁻ˣ)² = 4ˣ + 2 + 4⁻ˣ = 25 → 4ˣ + 4⁻ˣ = 23',
    hints: ['Kuadratkan kedua ruas: (2ˣ + 2⁻ˣ)²', 'Ingat (a+b)² = a² + 2ab + b²']
  },
  {
    id: 'l5_2',
    question: 'Jika ˣlog 3 = a dan ˣlog 5 = b, maka ˣlog 45 = ...',
    options: [
      { id: 'A', text: 'a + b' },
      { id: 'B', text: '2a + b' },
      { id: 'C', text: 'a + 2b' },
      { id: 'D', text: '2a + 2b' }
    ],
    correctAnswer: 'B',
    difficulty: 2.0,
    discrimination: 1.5,
    topic: 'Logaritma',
    pisaLevel: 5,
    pisaLevelName: 'Evaluasi & penalaran',
    explanation: '45 = 9 × 5 = 3² × 5 → log 45 = log 3² + log 5 = 2a + b',
    hints: ['Faktorkan 45 menjadi 9 × 5', 'Gunakan sifat log ab = log a + log b']
  },
  {
    id: 'l5_3',
    question: 'Optimisasi: x + y + z ≤ 12, x,y,z ≥ 0. Nilai maksimum 2x + y adalah...',
    options: [
      { id: 'A', text: '12' },
      { id: 'B', text: '18' },
      { id: 'C', text: '24' },
      { id: 'D', text: '36' }
    ],
    correctAnswer: 'C',
    difficulty: 2.0,
    discrimination: 1.5,
    topic: 'SPtLDV',
    pisaLevel: 5,
    pisaLevelName: 'Evaluasi & penalaran',
    explanation: 'Maksimum saat x = 12, y = 0, z = 0 → 2(12) + 0 = 24',
    hints: ['Untuk maksimum 2x + y, prioritaskan x', 'Set y = z = 0, x maksimum = 12']
  },

  // LEVEL 6 - Abstract reasoning (3 Essay Questions)
  {
    id: 'l6_essay_1',
    question: '',
    text: `🏢 KASUS PERUSAHAAN KONSTRUKSI

Sebuah perusahaan konstruksi sedang membangun bendungan di area rawan banjir. Data menunjukkan:

📊 DATA TEKNIS:
• Debit air meningkat secara eksponensial: D(t) = 50 × 2^(t/3) liter/jam (t = jam sejak hujan)
• Dinding bendungan terdiri dari 3 material dengan komposisi SPLTV:
  - Material A (x ton) harga Rp2 juta/ton, kekuatan 100 unit
  - Material B (y ton) harga Rp3 juta/ton, kekuatan 150 unit  
  - Material C (z ton) harga Rp4 juta/ton, kekuatan 200 unit
• Persamaan komposisi:
  x + y + z = 60 ton (total material)
  100x + 150y + 200z ≥ 8000 unit (kekuatan minimum)
  2x + 3y + 4z ≤ 180 juta (anggaran maksimal)

🎯 PERTANYAAN ANALISIS:
1. Hitung debit air pada jam ke-6 dan ke-12. Berapa kali lipat peningkatannya?
2. Tentukan komposisi material (x, y, z) yang memenuhi SEMUA batasan
3. Jika debit air mencapai 3200 liter/jam, pada jam ke berapa? (gunakan logaritma)
4. Evaluasi: Apakah dinding dengan komposisi pilihanmu dapat bertahan hingga jam ke-12?
5. Berikan rekomendasi strategi alternatif jika anggaran dipotong 20%

Jawab dengan LENGKAP: tunjukkan perhitungan, alasan pemilihan strategi, dan prediksi risiko.`,
    options: [],
    correctAnswer: '',
    difficulty: 3.0,
    discrimination: 1.6,
    topic: 'Multi-Materi',
    pisaLevel: 6,
    pisaLevelName: 'Justifikasi & refleksi abstrak',
    explanation: '',
    expectedAnswer: `JAWABAN YANG DIINGINKAN:

1. PERHITUNGAN EKSPONEN:
   - Jam ke-6: D(6) = 50 × 2^(6/3) = 50 × 2^2 = 200 liter/jam
   - Jam ke-12: D(12) = 50 × 2^(12/3) = 50 × 2^4 = 800 liter/jam
   - Peningkatan: 800/200 = 4 kali lipat

2. PENYELESAIAN SPLTV + SPtLDV:
   Contoh solusi valid: x=20, y=20, z=20
   - Total: 20+20+20 = 60 ✓
   - Kekuatan: 100(20)+150(20)+200(20) = 9000 ≥ 8000 ✓
   - Biaya: 2(20)+3(20)+4(20) = 180 juta ≤ 180 ✓

3. PERHITUNGAN LOGARITMA:
   3200 = 50 × 2^(t/3)
   64 = 2^(t/3)
   2^6 = 2^(t/3)
   t/3 = 6
   t = 18 jam

4. EVALUASI INTEGRASI:
   - Debit jam ke-12 = 800 liter/jam
   - Kekuatan dinding = 9000 unit
   - Rasio keamanan = 9000/800 = 11.25 (AMAN, di atas minimum)

5. KREATIVITAS SOLUSI:
   - Jika anggaran dipotong 20% → maksimal Rp144 juta
   - Strategi: Gunakan lebih banyak material A (murah) dengan meningkatkan ketebalan
   - Alternatif: Sistem pompa untuk mengurangi debit (model linear vs eksponensial)`,
    rubricGuidelines: {
      identifikasi: 'Siswa mengidentifikasi 3 materi: Eksponen (debit), Logaritma (waktu kritis), dan SPLTV+SPtLDV (komposisi material)',
      integrasi: 'Siswa menghubungkan hasil debit eksponensial dengan kebutuhan kekuatan dari SPLTV, serta menggunakan logaritma untuk prediksi waktu',
      akurasi: 'Perhitungan eksponen (200, 800), logaritma (t=18), dan penyelesaian SPLTV benar dengan substitusi/eliminasi',
      evaluasi: 'Siswa membandingkan kekuatan dinding vs debit air pada berbagai waktu, memberikan justifikasi "AMAN" atau "BERBAHAYA"',
      kreativitas: 'Siswa memberikan solusi alternatif seperti pompa, material komposit, atau redesign dengan anggaran terbatas'
    }
  },
  {
    id: 'l6_essay_2',
    question: '',
    text: `🎬 KASUS PLATFORM STREAMING vs BIOSKOP

Seorang produser film ingin memilih strategi distribusi dengan data:

📊 DATA BISNIS:
BIOSKOP:
• Penonton awal = 5000 orang
• Pertumbuhan eksponensial: P(t) = 5000 × 1.5^t (t = minggu)
• Revenue per tiket = Rp50.000
• Biaya operasional SPLDV:
  - Sewa gedung (x) + Promosi (y) = Rp200 juta
  - 3x + y = Rp400 juta

STREAMING:
• Subscriber awal = 20.000 orang  
• Pertumbuhan linear: S(t) = 20000 + 3000t
• Revenue per user = Rp35.000/bulan
• Biaya platform tetap = Rp150 juta

🎯 PERTANYAAN ANALISIS:
1. Hitung total penonton bioskop dan streaming pada minggu ke-4
2. Kapan penonton bioskop menyamai streaming? (gunakan logaritma atau grafik)
3. Hitung biaya Sewa gedung (x) dan Promosi (y) dengan SPLDV
4. Tentukan strategi mana yang lebih menguntungkan untuk 12 minggu pertama
5. Jika budget promosi dipotong 50%, strategi apa yang Anda rekomendasikan?

Jawab dengan ANALISIS KOMPARATIF lengkap.`,
    options: [],
    correctAnswer: '',
    difficulty: 3.0,
    discrimination: 1.6,
    topic: 'Multi-Materi',
    pisaLevel: 6,
    pisaLevelName: 'Justifikasi & refleksi abstrak',
    explanation: '',
    expectedAnswer: `JAWABAN YANG DIINGINKAN:

1. PERHITUNGAN EKSPONEN vs LINEAR:
   - Bioskop minggu-4: P(4) = 5000 × 1.5^4 = 5000 × 5.0625 = 25.312 orang
   - Streaming minggu-4: S(4) = 20000 + 3000(4) = 32.000 orang

2. TITIK KESEIMBANGAN (LOGARITMA):
   5000 × 1.5^t = 20000 + 3000t
   (Perlu trial-error atau grafik karena mix eksponensial-linear)
   Estimasi: sekitar minggu ke-6 sampai ke-7

3. PENYELESAIAN SPLDV:
   x + y = 200
   3x + y = 400
   Eliminasi: 2x = 200 → x = 100 juta (sewa), y = 100 juta (promosi)

4. EVALUASI KOMPARATIF 12 MINGGU:
   Bioskop:
   - Penonton minggu-12: 5000 × 1.5^12 ≈ 645.000 orang
   - Revenue: 645.000 × 50.000 = Rp32 Miliar
   - Biaya: 100+100 = Rp200 juta
   - Profit: Rp31.8 Miliar
   
   Streaming:
   - Subscriber minggu-12: 20.000 + 3000(12) = 56.000 orang
   - Revenue: 56.000 × 35.000 × 3 bulan = Rp5.88 Miliar
   - Biaya: Rp150 juta
   - Profit: Rp5.73 Miliar
   
   KESIMPULAN: Bioskop jauh lebih menguntungkan (eksponensial > linear jangka panjang)

5. KREATIVITAS SOLUSI:
   - Potong promosi 50% → y = 50 juta, x tetap 100 juta (150 total)
   - Strategi hybrid: 4 minggu bioskop (momentum eksponensial) → pindah ke streaming
   - Fokus word-of-mouth untuk kompensasi promosi berkurang`,
    rubricGuidelines: {
      identifikasi: 'Siswa mengenali pertumbuhan eksponensial vs linear, SPLDV untuk biaya, dan perlu logaritma untuk titik potong',
      integrasi: 'Siswa membandingkan hasil perhitungan eksponen dan linear untuk evaluasi strategi, menghubungkan biaya SPLDV dengan profitabilitas',
      akurasi: 'Perhitungan P(4), S(4), SPLDV (x=100, y=100), dan estimasi profit 12 minggu akurat',
      evaluasi: 'Siswa memberikan justifikasi jelas: "Bioskop lebih baik karena pertumbuhan eksponensial mengalahkan linear pada jangka panjang"',
      kreativitas: 'Siswa menawarkan strategi hybrid, timing switch, atau optimasi marketing dengan budget terbatas'
    }
  },
  {
    id: 'l6_essay_3',
    question: '',
    text: `⚙️ KASUS PABRIK PRODUKSI MESIN

Sebuah pabrik mengalami kebocoran tangki yang meningkat eksponensial sambil memproduksi mesin dengan target tertentu.

📊 DATA OPERASIONAL:
KEBOCORAN:
• Volume kebocoran: V(t) = 10 × 2^(t/4) liter/jam (t = jam sejak deteksi)
• Kapasitas tangki cadangan = 500 liter

PRODUKSI MESIN (3 tipe dengan SPLTV):
• Tipe A (x unit): 2 jam produksi, profit Rp5 juta
• Tipe B (y unit): 3 jam produksi, profit Rp7 juta
• Tipe C (z unit): 4 jam produksi, profit Rp10 juta

BATASAN (SPtLDV):
• Total waktu tersedia: 2x + 3y + 4z ≤ 40 jam
• Target minimum: x + y + z ≥ 12 unit
• Budget bahan baku: 3x + 5y + 8z ≤ 100 juta

PILIHAN STRATEGI:
A. Tambah mesin produksi (menambah kapasitas linear)
B. Perbaiki kebocoran dulu (stop produksi 8 jam)

🎯 PERTANYAAN ANALISIS:
1. Hitung volume kebocoran pada jam ke-8, ke-16, dan ke-24
2. Kapan tangki cadangan (500L) akan penuh? (gunakan logaritma)
3. Tentukan kombinasi (x,y,z) yang memaksimalkan profit dengan batasan SPtLDV
4. Evaluasi: Strategi A atau B lebih baik? Berikan perhitungan profit vs risiko
5. Jika kebocoran bisa dikurangi menjadi linear V(t)=10+5t, apakah strategi berubah?

Jawab dengan ANALISIS RISIKO DAN OPTIMASI.`,
    options: [],
    correctAnswer: '',
    difficulty: 3.0,
    discrimination: 1.6,
    topic: 'Multi-Materi',
    pisaLevel: 6,
    pisaLevelName: 'Justifikasi & refleksi abstrak',
    explanation: '',
    expectedAnswer: `JAWABAN YANG DIINGINKAN:

1. PERHITUNGAN EKSPONEN:
   - Jam-8: V(8) = 10 × 2^(8/4) = 10 × 4 = 40 liter
   - Jam-16: V(16) = 10 × 2^(16/4) = 10 × 16 = 160 liter  
   - Jam-24: V(24) = 10 × 2^(24/4) = 10 × 64 = 640 liter

2. PERHITUNGAN LOGARITMA (Tangki Penuh):
   500 = 10 × 2^(t/4)
   50 = 2^(t/4)
   log₂(50) = t/4
   t/4 ≈ 5.64
   t ≈ 22.6 jam → Tangki penuh di jam ke-23

3. OPTIMASI SPtLDV (Linear Programming):
   Contoh solusi: x=0, y=0, z=10 (fokus profit tinggi)
   - Waktu: 4(10) = 40 ✓
   - Target: 10 ≥ 12 ✗ (tidak memenuhi)
   
   Solusi lebih baik: x=2, y=4, z=6
   - Waktu: 2(2)+3(4)+4(6) = 4+12+24 = 40 ✓
   - Target: 2+4+6 = 12 ✓
   - Budget: 3(2)+5(4)+8(6) = 6+20+48 = 74 ≤ 100 ✓
   - Profit: 5(2)+7(4)+10(6) = 10+28+60 = Rp98 juta

4. EVALUASI STRATEGI:
   Strategi A (Tambah mesin):
   - Produksi tetap jalan, profit Rp98 juta
   - Risiko: Tangki penuh jam-23, kebocoran terus meningkat eksponensial
   
   Strategi B (Perbaiki dulu):
   - Stop 8 jam, kehilangan ≈Rp20 juta produksi
   - Keuntungan: Masalah selesai, aman jangka panjang
   
   REKOMENDASI: Strategi B lebih baik karena kerugian Rp20 juta < risiko banjir total

5. KREATIVITAS (Skenario Linear):
   V(t) = 10 + 5t
   - Jam-24: V(24) = 10 + 5(24) = 130 liter (jauh lebih aman!)
   - Tangki 500L penuh: 500 = 10 + 5t → t = 98 jam
   - STRATEGI BERUBAH: Pilih A (produksi dulu), karena punya waktu 98 jam`,
    rubricGuidelines: {
      identifikasi: 'Siswa mengenali eksponen (kebocoran), logaritma (waktu kritis), SPLTV (kombinasi mesin), dan SPtLDV (batasan)',
      integrasi: 'Siswa menghubungkan waktu tangki penuh (logaritma) dengan waktu produksi (SPtLDV) untuk evaluasi strategi',
      akurasi: 'Perhitungan V(8)=40, V(16)=160, V(24)=640, t≈23 jam (logaritma), dan solusi SPLTV yang memenuhi semua constraint',
      evaluasi: 'Siswa membandingkan profit vs risiko, memberikan justifikasi "perbaiki dulu lebih aman meskipun rugi jangka pendek"',
      kreativitas: 'Siswa menganalisis skenario linear, menunjukkan pemahaman: eksponensial = bahaya cepat, linear = lebih prediktable'
    }
  }
];

// IRT 2PL Model
export function calculateProbability(ability: number, difficulty: number, discrimination: number): number {
  const exponent = discrimination * (ability - difficulty);
  return 1 / (1 + Math.exp(-exponent));
}

export function selectNextQuestion(
  ability: number,
  answeredQuestionIds: string[],
  targetLevel?: number
): Question {
  let availableQuestions = questionBank.filter(q => !answeredQuestionIds.includes(q.id));
  
  if (targetLevel) {
    availableQuestions = availableQuestions.filter(q => q.pisaLevel === targetLevel);
  }
  
  if (availableQuestions.length === 0) {
    availableQuestions = questionBank.filter(q => 
      targetLevel ? q.pisaLevel === targetLevel : true
    );
  }
  
  let bestQuestion = availableQuestions[0];
  let bestScore = Math.abs(bestQuestion.difficulty - ability);
  
  for (const question of availableQuestions) {
    const score = Math.abs(question.difficulty - ability);
    if (score < bestScore) {
      bestScore = score;
      bestQuestion = question;
    }
  }
  
  return bestQuestion;
}

export function updateAbility(
  currentAbility: number,
  wasCorrect: boolean,
  difficulty: number,
  discrimination: number
): number {
  const probability = calculateProbability(currentAbility, difficulty, discrimination);
  const adjustment = discrimination * (wasCorrect ? (1 - probability) : -probability) * 0.5;
  return currentAbility + adjustment;
}

export function calculateFinalScore(ability: number): number {
  const normalizedAbility = (ability + 3) / 6;
  const score = Math.round(normalizedAbility * 100);
  return Math.max(0, Math.min(100, score));
}