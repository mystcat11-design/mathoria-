import { Student } from '../App';
import { Trophy, Target, Award, TrendingUp, Lock, CheckCircle2, Play, ChevronDown, ChevronUp, Lightbulb, ArrowRight, X, Info } from 'lucide-react';
import { useState } from 'react';
import { XPBar } from './XPBar';
import { PerformanceChart } from './PerformanceChart';
import { BADGE_INFO, BADGE_ORDER } from '../utils/badgeInfo';

interface DashboardProps {
  student: Student;
  onStartQuiz: (level: number) => void;
}

const levelInfo = [
  { 
    level: 1, 
    name: 'Level 1', 
    description: 'Mengingat & menghitung langsung',
    color: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-300',
    icon: '🎯'
  },
  { 
    level: 2, 
    name: 'Level 2', 
    description: 'Prosedural & representasi sederhana',
    color: 'from-blue-500 to-cyan-600',
    borderColor: 'border-blue-300',
    icon: '📘'
  },
  { 
    level: 3, 
    name: 'Level 3', 
    description: 'Interpretasi & koneksi data',
    color: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-300',
    icon: '📊'
  },
  { 
    level: 4, 
    name: 'Level 4', 
    description: 'Pemodelan matematis',
    color: 'from-orange-500 to-red-600',
    borderColor: 'border-orange-300',
    icon: '🧮'
  },
  { 
    level: 5, 
    name: 'Level 5', 
    description: 'Evaluasi & penalaran',
    color: 'from-red-500 to-rose-600',
    borderColor: 'border-red-300',
    icon: '🎓'
  },
  { 
    level: 6, 
    name: 'Level 6', 
    description: 'Justifikasi & refleksi abstrak',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-300',
    icon: '👑'
  }
];

export function Dashboard({ student, onStartQuiz }: DashboardProps) {
  const averageScore = student.testsCompleted > 0 
    ? Math.round(student.totalScore / student.testsCompleted) 
    : 0;

  // Determine which levels are unlocked
  const completedLevels = student.completedLevels || [];
  
  const isLevelUnlocked = (level: number): boolean => {
    if (level === 1) return true; // Level 1 is always unlocked
    return completedLevels.includes(level - 1);
  };

  const isLevelCompleted = (level: number): boolean => {
    return completedLevels.includes(level);
  };

  const [showBadgeGuide, setShowBadgeGuide] = useState(false);
  const [showMyBadges, setShowMyBadges] = useState(false);
  const [showLevelSelection, setShowLevelSelection] = useState(true);
  const [showAbilityModal, setShowAbilityModal] = useState(false);

  // Get ability level info
  const getAbilityLevel = (theta: number) => {
    if (theta < -1) return {
      name: '🌱 Pemula',
      range: 'θ < -1.0',
      description: 'Anda sedang membangun fondasi matematika dasar. Terus berlatih untuk meningkatkan pemahaman konsep.',
      characteristics: [
        'Memahami konsep matematika dasar',
        'Masih perlu banyak latihan untuk meningkatkan kecepatan',
        'Fokus pada penguasaan materi Level 1-2',
      ],
      recommendations: [
        'Perbanyak latihan soal-soal dasar',
        'Pelajari ulang konsep yang belum dipahami',
        'Mulai dari Level 1 dan selesaikan secara berurutan',
      ],
      color: 'from-green-500 to-emerald-600'
    };
    if (theta < 0) return {
      name: '📚 Berkembang',
      range: '-1.0 ≤ θ < 0.0',
      description: 'Kemampuan Anda terus berkembang! Anda sudah memahami konsep dasar dan siap untuk tantangan lebih tinggi.',
      characteristics: [
        'Menguasai sebagian besar materi dasar',
        'Mampu menyelesaikan soal dengan prosedur standar',
        'Siap untuk soal Level 3',
      ],
      recommendations: [
        'Tingkatkan ke soal-soal Level 3',
        'Latih variasi soal dari berbagai topik',
        'Fokus pada pemahaman konsep, bukan hanya menghafal',
      ],
      color: 'from-blue-500 to-cyan-600'
    };
    if (theta < 1) return {
      name: '⭐ Kompeten',
      range: '0.0 ≤ θ < 1.0',
      description: 'Anda kompeten dalam matematika! Mampu menyelesaikan berbagai jenis soal dengan baik.',
      characteristics: [
        'Menguasai berbagai teknik penyelesaian soal',
        'Mampu menginterpretasi dan menganalisis data',
        'Siap menghadapi soal Level 4-5',
      ],
      recommendations: [
        'Tantang diri dengan soal Level 4-5',
        'Eksplorasi berbagai metode penyelesaian',
        'Kembangkan kemampuan penalaran matematis',
      ],
      color: 'from-yellow-500 to-amber-600'
    };
    if (theta < 2) return {
      name: '🏆 Mahir',
      range: '1.0 ≤ θ < 2.0',
      description: 'Anda mahir dalam matematika! Kemampuan analisis dan pemecahan masalah Anda sangat baik.',
      characteristics: [
        'Excellent dalam pemodelan matematis',
        'Mampu melakukan evaluasi dan penalaran kompleks',
        'Menguasai soal hingga Level 5',
      ],
      recommendations: [
        'Selesaikan Level 6 untuk mencapai level Expert',
        'Latih soal-soal kompleks dengan multiple solutions',
        'Kembangkan kemampuan refleksi dan justifikasi',
      ],
      color: 'from-orange-500 to-red-600'
    };
    return {
      name: '👑 Expert',
      range: 'θ ≥ 2.0',
      description: 'Selamat! Anda adalah seorang Expert dalam matematika dengan kemampuan luar biasa!',
      characteristics: [
        'Master dalam semua aspek matematika yang diujikan',
        'Mampu melakukan justifikasi dan refleksi abstrak',
        'Menguasai semua level termasuk Level 6',
      ],
      recommendations: [
        'Pertahankan kemampuan dengan latihan rutin',
        'Bantu teman-teman yang kesulitan belajar',
        'Eksplorasi soal-soal olimpiade matematika',
      ],
      color: 'from-purple-500 to-indigo-600'
    };
  };

  const currentAbilityLevel = getAbilityLevel(student.averageAbility);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Section with Gradient Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 shadow-xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-lg">
              <span className="text-3xl">🎓</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Halo, {student.name}! 👋
              </h1>
              <p className="text-white/90 text-lg">
                Siap untuk tantangan matematika hari ini?
              </p>
            </div>
          </div>
          
          {/* Quick Stats Inline */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <p className="text-white/80 text-xs font-medium">Level Selesai</p>
              <p className="text-white text-xl font-bold">{completedLevels.length}/6</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <p className="text-white/80 text-xs font-medium">Kemampuan θ</p>
              <p className="text-white text-xl font-bold">{(student.averageAbility || 0).toFixed(2)}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <p className="text-white/80 text-xs font-medium">Badge Terkumpul</p>
              <p className="text-white text-xl font-bold">{student.badges.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid with Gradient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80 font-medium">Total Skor</p>
                <p className="text-3xl font-bold text-white">{student.totalScore}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80 font-medium">Tes Selesai</p>
                <p className="text-3xl font-bold text-white">{student.testsCompleted}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80 font-medium">Rata-rata Skor</p>
                <p className="text-3xl font-bold text-white">{averageScore}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80 font-medium">Badges</p>
                <p className="text-3xl font-bold text-white">{student.badges.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <XPBar xp={student.xp || 0} level={student.level || 1} />

      {/* Performance Chart */}
      {student.testsCompleted > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Performa & Statistik
          </h3>
          <PerformanceChart student={student} />
        </div>
      )}

      {/* Level Selection - Enhanced with Gradient */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <button
          onClick={() => setShowLevelSelection(!showLevelSelection)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Pilih Level Tes</h3>
            <span className="text-sm text-gray-500">
              ({completedLevels.length}/6 level selesai)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-600 font-medium">
              {showLevelSelection ? 'Sembunyikan' : 'Mulai Tes'}
            </span>
            {showLevelSelection ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </div>
        </button>

        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showLevelSelection ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 mb-4">
              Selesaikan level sebelumnya untuk membuka level berikutnya
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelInfo.map((info) => {
                const unlocked = isLevelUnlocked(info.level);
                const completed = isLevelCompleted(info.level);

                return (
                  <button
                    key={info.level}
                    onClick={() => unlocked && onStartQuiz(info.level)}
                    disabled={!unlocked}
                    className={`relative p-6 rounded-xl shadow-md transition-all duration-300 text-left ${
                      !unlocked 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : completed
                        ? 'bg-white border-2 border-green-400 hover:shadow-lg'
                        : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg'
                    }`}
                  >
                    {/* Lock/Completed Badge */}
                    <div className="absolute top-4 right-4">
                      {!unlocked ? (
                        <Lock className="w-6 h-6 text-gray-400" />
                      ) : completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Play className="w-6 h-6 text-blue-500" />
                      )}
                    </div>

                    {/* Level Icon */}
                    <div className="text-4xl mb-3">{info.icon}</div>

                    {/* Level Info */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                      !unlocked 
                        ? 'bg-gray-200 text-gray-600'
                        : `bg-gradient-to-r ${info.color} text-white`
                    }`}>
                      {info.name}
                    </div>

                    <h4 className="font-bold text-gray-900 mb-1">{info.description}</h4>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {!unlocked 
                        ? `🔒 Selesaikan Level ${info.level - 1} terlebih dahulu`
                        : completed 
                        ? '✅ Selesai - Ulangi untuk skor lebih baik'
                        : '▶️ Mulai tes level ini'
                      }
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Info Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Progress Anda</h3>
              <p className="text-blue-100 text-sm">Terus tingkatkan kemampuanmu!</p>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <span className="text-xs text-blue-100">Level Selesai</span>
              </div>
              <p className="text-3xl font-bold">{completedLevels.length}<span className="text-xl text-blue-200">/6</span></p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <span className="text-xs text-blue-100">Kemampuan</span>
              </div>
              <button 
                onClick={() => setShowAbilityModal(true)}
                className="w-full text-left group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-100"></span>
                  </div>
                  <Info className="w-4 h-4 text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-2xl font-bold">
                  {student.averageAbility < -1 ? '🌱 Pemula' :
                   student.averageAbility < 0 ? '📚 Berkembang' :
                   student.averageAbility < 1 ? '⭐ Kompeten' :
                   student.averageAbility < 2 ? '🏆 Mahir' : '👑 Expert'}
                </p>
                <p className="text-xs text-blue-200 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Klik untuk detail →
                </p>
              </button>
            </div>
          </div>
          
          {/* Progress Level */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 mb-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-semibold">Progress Level</span>
              </div>
              <span className="text-2xl font-bold">{Math.round((completedLevels.length / 6) * 100)}%</span>
            </div>
            <div className="relative bg-white/20 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-amber-300 h-full rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${(completedLevels.length / 6) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-blue-100">
              <span>Level 1</span>
              <span>Level 6</span>
            </div>
          </div>
        </div>

        {/* My Badges Section - Minimalist Collapsible */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowMyBadges(!showMyBadges)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-gray-900">Badge Saya</h3>
              <span className="text-sm text-gray-500">
                ({student.badges.length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-600 font-medium">
                {showMyBadges ? 'Sembunyikan' : 'Lihat Badge'}
              </span>
              {showMyBadges ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600" />
              )}
            </div>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showMyBadges ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-6">
              {student.badges.length > 0 ? (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {student.badges.map(badge => (
                    <div 
                      key={badge}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg ${BADGE_INFO[badge]?.color || 'bg-gray-100'}`}
                    >
                      <span className="text-2xl flex-shrink-0">{BADGE_INFO[badge]?.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm">{badge}</p>
                        <p className="text-xs opacity-75">{BADGE_INFO[badge]?.description}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-600" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Belum ada badge</p>
                  <p className="text-xs mt-1">Selesaikan tes untuk mendapatkan badge!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Badge Guide Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowBadgeGuide(!showBadgeGuide)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h3 className="font-bold text-gray-900">Panduan Badge</h3>
            <span className="text-sm text-gray-500">
              ({student.badges.length}/{Object.keys(BADGE_INFO).length})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-600 font-medium">
              {showBadgeGuide ? 'Sembunyikan' : 'Lihat Panduan'}
            </span>
            {showBadgeGuide ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </div>
        </button>
        
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showBadgeGuide ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 mb-4">
              Kumpulkan badge dengan menyelesaikan berbagai tantangan berikut:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2">
              {(() => {
                // Define badge difficulty order (easiest to hardest)
                const badgeOrder = BADGE_ORDER;
                
                // Sort badges by difficulty order
                const sortedBadges = Object.entries(BADGE_INFO).sort((a, b) => {
                  const indexA = badgeOrder.indexOf(a[0]);
                  const indexB = badgeOrder.indexOf(b[0]);
                  return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
                });
                
                return sortedBadges.map(([name, info]) => (
                  <div 
                    key={name} 
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      student.badges.includes(name) 
                        ? `${info.color} opacity-100` 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{info.icon}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{name}</p>
                      <p className="text-xs opacity-75">{info.description}</p>
                    </div>
                    {student.badges.includes(name) && (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-600" />
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* IRT Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Tentang Sistem Evaluasi</h3>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">📚 Materi yang Diujikan:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Eksponen</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Logaritma</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">SPLDV</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">SPLTV</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">SPtLDV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">📊 Item Response Theory (IRT)</h4>
            <p className="text-blue-700">
              Sistem adaptif yang menyesuaikan tingkat kesulitan soal dengan kemampuan siswa secara real-time
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">🎯 Framework PISA</h4>
            <p className="text-purple-700">
              Evaluasi berbasis standar internasional dengan 6 level kemampuan literasi matematika
            </p>
          </div>
        </div>
      </div>

      {/* Topic Progress */}
      {student.correctAnswersByTopic && Object.values(student.correctAnswersByTopic).some(v => v > 0) && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Progress per Topik</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(student.correctAnswersByTopic).map(([topic, correct]) => {
              const total = student.topicAnswerCounts?.[topic as keyof typeof student.topicAnswerCounts] || 0;
              const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
              
              return (
                <div key={topic} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{topic}</h4>
                    <span className="text-sm font-mono text-gray-600">{correct}/{total}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    Akurasi: {percentage}% • {correct} soal benar
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Saran Peningkatan Section */}
      {student.testsCompleted > 0 && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm p-6 border-2 border-emerald-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Saran Peningkatan</h3>
              <p className="text-sm text-emerald-700">Rekomendasi untuk mengembangkan kemampuan Anda</p>
            </div>
          </div>

          <div className="space-y-3">
            {(() => {
              const suggestions: { icon: string; title: string; description: string; priority: 'high' | 'medium' | 'low' }[] = [];

              // 1. Level progression suggestions
              if (completedLevels.length === 0) {
                suggestions.push({
                  icon: '🎯',
                  title: 'Mulai dari Level 1',
                  description: 'Selesaikan Level 1 untuk membuka level berikutnya dan membangun fondasi yang kuat.',
                  priority: 'high'
                });
              } else if (completedLevels.length < 6) {
                const nextLevel = completedLevels.length + 1;
                suggestions.push({
                  icon: '🚀',
                  title: `Lanjutkan ke Level ${nextLevel}`,
                  description: `Tantang diri Anda dengan ${levelInfo[nextLevel - 1].description.toLowerCase()} untuk meningkatkan kemampuan.`,
                  priority: 'high'
                });
              } else {
                suggestions.push({
                  icon: '🏆',
                  title: 'Pertahankan Pencapaian',
                  description: 'Sempurna! Ulangi level-level sulit untuk mempertajam kemampuan dan meningkatkan skor.',
                  priority: 'medium'
                });
              }

              // 2. Score improvement suggestions
              if (averageScore < 70) {
                suggestions.push({
                  icon: '📚',
                  title: 'Fokus pada Pemahaman Konsep',
                  description: 'Pelajari ulang materi dasar dan latih soal-soal level 1-2 untuk memperkuat fondasi.',
                  priority: 'high'
                });
              } else if (averageScore < 85) {
                suggestions.push({
                  icon: '💪',
                  title: 'Tingkatkan Konsistensi',
                  description: 'Anda sudah baik! Latih lebih banyak soal untuk meningkatkan konsistensi dan akurasi.',
                  priority: 'medium'
                });
              } else {
                suggestions.push({
                  icon: '🌟',
                  title: 'Tantang Diri dengan Level Tinggi',
                  description: 'Skor Anda excellent! Coba Level 5-6 untuk mengasah kemampuan penalaran dan refleksi.',
                  priority: 'medium'
                });
              }

              // 3. Weak topic suggestions
              if (student.correctAnswersByTopic) {
                const weakTopics: string[] = [];
                Object.entries(student.correctAnswersByTopic).forEach(([topic, correct]) => {
                  const total = student.topicAnswerCounts?.[topic as keyof typeof student.topicAnswerCounts] || 0;
                  const percentage = total > 0 ? (correct / total) * 100 : 0;
                  if (percentage < 70 && total >= 3) {
                    weakTopics.push(topic);
                  }
                });

                if (weakTopics.length > 0) {
                  suggestions.push({
                    icon: '',
                    title: `Perkuat Topik: ${weakTopics.slice(0, 2).join(' & ')}`,
                    description: 'Fokuskan latihan pada topik-topik ini untuk meningkatkan penguasaan secara menyeluruh.',
                    priority: 'high'
                  });
                }
              }

              // 4. Ability level suggestions
              if (student.averageAbility < -1) {
                suggestions.push({
                  icon: '🌱',
                  title: 'Bangun Fondasi dengan Latihan Rutin',
                  description: 'Luangkan waktu 15-20 menit setiap hari untuk latihan soal-soal dasar.',
                  priority: 'high'
                });
              } else if (student.averageAbility < 0) {
                suggestions.push({
                  icon: '📈',
                  title: 'Tingkatkan dengan Variasi Soal',
                  description: 'Coba berbagai tipe soal dari topik yang berbeda untuk memperluas pemahaman.',
                  priority: 'medium'
                });
              } else if (student.averageAbility >= 2) {
                suggestions.push({
                  icon: '👑',
                  title: 'Kembangkan Kemampuan Expert',
                  description: 'Eksplorasi soal-soal kompleks dan coba selesaikan dengan berbagai metode penyelesaian.',
                  priority: 'low'
                });
              }

              // 5. Badge suggestions
              const missingEasyBadges = ['First Step', 'Getting Started', 'Math Beginner'].filter(
                badge => !student.badges.includes(badge)
              );
              
              if (missingEasyBadges.length > 0 && student.testsCompleted < 3) {
                suggestions.push({
                  icon: '🎖️',
                  title: 'Kumpulkan Badge Pemula',
                  description: `Raih badge ${missingEasyBadges[0]} dengan menyelesaikan lebih banyak soal.`,
                  priority: 'low'
                });
              }

              // 6. Practice consistency suggestion
              if (student.testsCompleted < 5) {
                suggestions.push({
                  icon: '🔥',
                  title: 'Bangun Kebiasaan Latihan',
                  description: 'Targetkan minimal 5 tes untuk mendapatkan badge "Dedicated" dan meningkatkan kemampuan.',
                  priority: 'medium'
                });
              }

              // Sort by priority
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

              // Show top 4 suggestions
              return suggestions.slice(0, 4).map((suggestion, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    suggestion.priority === 'high' 
                      ? 'bg-white border-emerald-300' 
                      : suggestion.priority === 'medium'
                      ? 'bg-white border-blue-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center text-2xl">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900">{suggestion.title}</h4>
                      {suggestion.priority === 'high' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Prioritas
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                </div>
              ));
            })()}
          </div>

          <div className="mt-6 p-4 bg-white/60 rounded-lg border border-emerald-200">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Tips:</strong> Konsistensi adalah kunci! Latihan rutin 15-20 menit setiap hari lebih efektif daripada belajar marathon.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Ability Level Modal */}
      {showAbilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAbilityModal(false)}>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header with Gradient */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${currentAbilityLevel.color} p-6 text-white`} >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{currentAbilityLevel.name}</h2>
                      <p className="text-sm text-white/80">Level Kemampuan Matematika Anda</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAbilityModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-white/20 rounded-full font-mono font-semibold">
                    {currentAbilityLevel.range}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full font-mono font-semibold">
                    θ = {student.averageAbility.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  Deskripsi
                </h3>
                <p className="text-blue-800">{currentAbilityLevel.description}</p>
              </div>

              {/* Characteristics */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  Karakteristik Kemampuan Anda
                </h3>
                <ul className="space-y-2">
                  {currentAbilityLevel.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Visualization */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  Posisi Anda pada Skala Kemampuan IRT
                </h3>
                <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="relative mb-6">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${currentAbilityLevel.color} h-full rounded-full transition-all duration-500 shadow-lg`}
                        style={{ width: `${Math.min(100, Math.max(0, (student.averageAbility + 3) / 6 * 100))}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                      <span className="font-mono">-3.0</span>
                      <span className="font-mono">-1.0</span>
                      <span className="font-mono">0.0</span>
                      <span className="font-mono">+1.0</span>
                      <span className="font-mono">+2.0</span>
                      <span className="font-mono">+3.0</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 bg-white rounded-lg">
                      <p className="text-gray-500 mb-1">Level Anda</p>
                      <p className="font-bold text-gray-900">{currentAbilityLevel.name}</p>
                    </div>
                    <div className="p-2 bg-white rounded-lg">
                      <p className="text-gray-500 mb-1">Nilai θ</p>
                      <p className="font-bold text-gray-900 font-mono">{student.averageAbility.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowAbilityModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}