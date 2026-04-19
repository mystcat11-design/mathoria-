import { X, Trophy, Award, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Student } from '../App';

interface PlayerProfileModalProps {
  student: Student;
  onClose: () => void;
}

const BADGE_INFO: Record<string, { icon: string; color: string; description: string }> = {
  // Basic Achievements
  'Genius': { icon: '🧠', color: 'bg-purple-100 text-purple-700 border-purple-300', description: 'Skor ≥ 90' },
  'Excellent': { icon: '⭐', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Skor ≥ 80' },
  'Dedicated': { icon: '🎯', color: 'bg-blue-100 text-blue-700 border-blue-300', description: '5 tes selesai' },
  'Master': { icon: '👑', color: 'bg-amber-100 text-amber-700 border-amber-300', description: '10 tes selesai' },
  
  // New Achievements - Beginner
  'Math Beginner': { icon: '🌟', color: 'bg-lime-100 text-lime-700 border-lime-300', description: '3 soal pertama benar' },
  'Getting Started': { icon: '✨', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: 'Selesaikan satu set soal' },
  'Rising Star': { icon: '🌠', color: 'bg-gradient-to-r from-yellow-100 to-pink-100 text-yellow-700 border-yellow-400', description: 'Top 5 Leaderboard' },
  
  // New Achievements - Progress & Milestones
  'First Step': { icon: '🚀', color: 'bg-green-100 text-green-700 border-green-300', description: 'Menyelesaikan soal pertama' },
  'Level Explorer': { icon: '🗺️', color: 'bg-teal-100 text-teal-700 border-teal-300', description: 'Mencoba semua level soal' },
  'Perfect Solver': { icon: '💯', color: 'bg-pink-100 text-pink-700 border-pink-300', description: 'Selesaikan 1 level tanpa kesalahan (Level 3+)' },
  'Challenge Conqueror': { icon: '🏅', color: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-400', description: 'Selesaikan level tersulit sempurna' },
  
  // New Achievements - Streak & Speed
  'Streak Master': { icon: '🔥', color: 'bg-red-100 text-red-700 border-red-300', description: '5 soal berturut benar (Level 3+)' },
  'Lightning Calculator': { icon: '⚡', color: 'bg-yellow-100 text-yellow-700 border-yellow-400', description: '5 soal berturut benar cepat (Level 3+)' },
  
  // New Achievements - Challenge
  'Challenge Seeker': { icon: '🎯', color: 'bg-indigo-100 text-indigo-700 border-indigo-300', description: 'Coba soal tingkat tinggi' },
  'Problem Crusher': { icon: '💪', color: 'bg-orange-100 text-orange-700 border-orange-300', description: 'Selesaikan beberapa soal sulit' },
  'Master Challenger': { icon: '🏆', color: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-400', description: 'Selesaikan semua soal tingkat tinggi' },
  
  // Special Achievements
  'Math Adventurer': { icon: '🧭', color: 'bg-teal-100 text-teal-700 border-teal-300', description: 'Variatif: 3 soal dari 4+ topik' },
  'Puzzle Breaker': { icon: '🧩', color: 'bg-red-100 text-red-700 border-red-300', description: '10 soal sulit (Level 5-6)' },
  'Number Champion': { icon: '🏆', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Skor sempurna: 100' },
  'Grand Mathematician': { icon: '👨‍🔬', color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-400', description: 'Selesaikan semua 6 level' },
  
  // Eksponen Badges
  'Exponent Explorer': { icon: '🔢', color: 'bg-green-100 text-green-700 border-green-300', description: '5 soal Eksponen benar' },
  'Exponent Strategist': { icon: '📐', color: 'bg-emerald-100 text-emerald-700 border-emerald-300', description: '10 soal Eksponen benar' },
  'Exponent Virtuoso': { icon: '💎', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: 'Semua soal Eksponen benar' },
  
  // System Badges (SPLDV + SPLTV)
  'System Solver': { icon: '🔧', color: 'bg-blue-100 text-blue-700 border-blue-300', description: '5 soal Persamaan benar' },
  'System Analyst': { icon: '🔬', color: 'bg-indigo-100 text-indigo-700 border-indigo-300', description: '10 soal Persamaan benar' },
  'System Architect': { icon: '🏗️', color: 'bg-violet-100 text-violet-700 border-violet-300', description: 'Semua soal Persamaan benar' },
  
  // Inequality Badges (SPtLDV)
  'Inequality Seeker': { icon: '🔍', color: 'bg-orange-100 text-orange-700 border-orange-300', description: '5 soal Pertidaksamaan benar' },
  'Inequality Specialist': { icon: '⚖️', color: 'bg-amber-100 text-amber-700 border-amber-300', description: '10 soal Pertidaksamaan benar' },
  'Inequality Master': { icon: '⚡', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Semua soal Pertidaksamaan benar' },
  
  // Logarithm Badge
  'Logarithm Specialist': { icon: '📊', color: 'bg-pink-100 text-pink-700 border-pink-300', description: 'Semua soal Logaritma benar' }
};

export function PlayerProfileModal({ student, onClose }: PlayerProfileModalProps) {
  const topicNames: Record<string, string> = {
    Eksponen: 'Eksponen',
    Logaritma: 'Logaritma',
    SPLDV: 'SPLDV',
    SPLTV: 'SPLTV',
    SPtLDV: 'SPtLDV'
  };

  const accuracy = student.totalQuestionsAnswered 
    ? Math.round((student.totalCorrectAnswers! / student.totalQuestionsAnswered!) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Photo & Profile Section */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl overflow-hidden">
            {student.coverPhoto ? (
              <img 
                src={student.coverPhoto} 
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600" />
            )}
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg z-10"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Profile Photo & Name - Overlapping cover */}
          <div className="px-6 pb-4">
            <div className="flex items-end gap-4 -mt-16 relative">
              {/* Profile Photo */}
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {student.profilePhoto ? (
                  <img 
                    src={student.profilePhoto} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Name and Bio */}
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                {student.bio && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{student.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-medium">Total Skor</span>
              </div>
              <p className="text-2xl font-bold text-amber-700">{student.totalScore}</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-medium">Tes Selesai</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{student.testsCompleted}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Akurasi</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">{accuracy}%</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">Kemampuan</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{student.averageAbility.toFixed(2)}</p>
            </div>
          </div>

          {/* Level Progress */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Level yang Diselesaikan
            </h3>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map(level => (
                <div
                  key={level}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                    student.completedLevels.includes(level)
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>

          {/* Topic Statistics */}
          {student.correctAnswersByTopic && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Statistik Per Topik
              </h3>
              <div className="space-y-2">
                {Object.entries(student.correctAnswersByTopic).map(([topic, correct]) => {
                  const total = student.topicAnswerCounts?.[topic as keyof typeof student.topicAnswerCounts] || 0;
                  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
                  
                  return (
                    <div key={topic} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{topicNames[topic]}</span>
                        <span className="text-sm text-gray-600">{correct}/{total} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Badges */}
          {student.badges.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Badge yang Dimiliki ({student.badges.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {student.badges.map(badgeName => {
                  const badge = BADGE_INFO[badgeName];
                  if (!badge) return null;
                  
                  return (
                    <div
                      key={badgeName}
                      className={`bg-gradient-to-br ${badge.color} border-2 rounded-xl p-3 text-center hover:scale-105 transition-transform`}
                    >
                      <div className="text-3xl mb-1">{badge.icon}</div>
                      <p className="text-xs font-semibold text-gray-900 leading-tight">
                        {badgeName}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Stats */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Statistik Tambahan</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Skor Tertinggi</p>
                <p className="font-bold text-gray-900">{student.highestScore || 0}</p>
              </div>
              <div>
                <p className="text-gray-600">Streak Terbaik</p>
                <p className="font-bold text-gray-900">{student.bestStreak || 0}</p>
              </div>
              <div>
                <p className="text-gray-600">Soal Sulit Benar</p>
                <p className="font-bold text-gray-900">{student.hardQuestionCorrect || 0}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Jawaban Benar</p>
                <p className="font-bold text-gray-900">{student.totalCorrectAnswers || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}