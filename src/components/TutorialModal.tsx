import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Target, Trophy, TrendingUp, Star, Lock, Unlock } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

export function TutorialModal({ onClose }: TutorialModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Selamat Datang di Mathoria! 🎉",
      icon: <BookOpen className="w-16 h-16 text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Mathoria</strong> adalah aplikasi latihan matematika pintar yang bisa menyesuaikan tingkat kesulitan soal sesuai kemampuan kamu. Semakin kamu jawab dengan benar, semakin menantang soalnya!
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Bagaimana cara kerjanya?</strong> Aplikasi ini menggunakan sistem cerdas (Item Response Theory) yang bisa mengukur kemampuan matematika kamu lebih tepat. Sistem ini akan menyesuaikan soal berdasarkan jawaban kamu - jika kamu menjawab benar, soal akan lebih sulit, jika salah akan lebih mudah.
            </p>
          </div>
          <p className="text-gray-700">
            Nilai kemampuan kamu akan dihitung otomatis dan ditampilkan dalam bentuk skor θ (theta). Semakin tinggi skor θ, semakin tinggi kemampuan matematika kamu!
          </p>
        </div>
      )
    },
    {
      title: "Sistem Level & Materi 📚",
      icon: <Target className="w-16 h-16 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Mathoria memiliki <strong>6 level kesulitan</strong> berdasarkan framework PISA dengan sistem unlock progression:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
              <Unlock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800">Level 1 - Latihan Prasyarat</p>
                <p className="text-sm text-gray-600">Otomatis terbuka. Berisi soal operasi bilangan dasar dan bentuk aljabar dasar.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <Lock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Level 2-6</p>
                <p className="text-sm text-gray-600">Terbuka secara berurutan setelah menyelesaikan level sebelumnya.</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
            <p className="font-semibold text-indigo-800 mb-2">Materi yang Diuji:</p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Eksponen</li>
              <li>Logaritma</li>
              <li>Sistem Persamaan Linear Dua Variabel (SPLDV)</li>
              <li>Sistem Persamaan Linear Tiga Variabel (SPLTV)</li>
              <li>Sistem Pertidaksamaan Linear Dua Variabel (SPtLDV)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Sistem Gamifikasi 🎮",
      icon: <Trophy className="w-16 h-16 text-yellow-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Mathoria dilengkapi dengan sistem gamifikasi untuk membuat belajar lebih menyenangkan:
          </p>
          
          <div className="space-y-3">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <p className="font-semibold text-yellow-800">Badges Achievement</p>
              </div>
              <p className="text-sm text-gray-700">
                Dapatkan <strong>30+ badge</strong> dengan menyelesaikan berbagai pencapaian, mulai dari yang mudah hingga eksklusif yang hanya bisa didapat setelah menyelesaikan semua 6 level.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-blue-800">Leaderboard Kompetitif</p>
              </div>
              <p className="text-sm text-gray-700">
                Bersaing dengan siswa lain dan lihat posisi Anda di <strong>leaderboard real-time</strong>. Raih peringkat teratas untuk mendapatkan badge eksklusif!
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-purple-600" />
                <p className="font-semibold text-purple-800">Tracking Kemampuan (θ)</p>
              </div>
              <p className="text-sm text-gray-700">
                Nilai theta (θ) Anda akan dihitung secara otomatis menggunakan algoritma IRT 2PL untuk mengukur kemampuan matematika Anda secara akurat.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Cara Menggunakan Mathoria 🚀",
      icon: <Star className="w-16 h-16 text-green-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 font-semibold">Ikuti langkah-langkah berikut untuk memulai:</p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-800">Mulai dari Level 1</p>
                <p className="text-sm text-gray-600">
                  Selesaikan Level 1 - Latihan Prasyarat untuk membuka level berikutnya.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-800">Kerjakan Soal dengan Cermat</p>
                <p className="text-sm text-gray-600">
                  Jawab setiap soal dengan hati-hati. Sistem IRT akan menyesuaikan tingkat kesulitan berdasarkan jawaban Anda.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-800">Unlock Level Secara Berurutan</p>
                <p className="text-sm text-gray-600">
                  Selesaikan setiap level untuk membuka level berikutnya (Level 2 → 3 → 4 → 5 → 6).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <p className="font-semibold text-gray-800">Kumpulkan Badge & Lihat Progress</p>
                <p className="text-sm text-gray-600">
                  Lihat badge Anda di halaman Dashboard dan Profil. Cek posisi Anda di Leaderboard!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                5
              </div>
              <div>
                <p className="font-semibold text-gray-800">Raih Semua Badge Eksklusif</p>
                <p className="text-sm text-gray-600">
                  Selesaikan semua 6 level untuk membuka badge eksklusif seperti "Genius", "Grand Mathematician", dan lainnya!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-6">
            <p className="text-sm text-gray-700">
              <strong>💡 Tips:</strong> Level 1 adalah level latihan prasyarat yang tidak mempengaruhi scoring atau leaderboard. Gunakan untuk membiasakan diri dengan sistem sebelum masuk ke level evaluasi sesungguhnya!
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Tutup tutorial"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              {currentSlideData.icon}
            </div>
            <h2 className="text-2xl font-bold">{currentSlideData.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentSlideData.content}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6">
          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentSlide === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Sebelumnya
            </button>

            <span className="text-sm text-gray-600">
              {currentSlide + 1} / {slides.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentSlide === slides.length - 1 ? 'Mulai Belajar' : 'Lanjut'}
              {currentSlide < slides.length - 1 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}