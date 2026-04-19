import { Student } from '../App';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { PlayerProfileModal } from './PlayerProfileModal';

interface LeaderboardProps {
  students: Student[];
  currentStudentId: string;
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
  'Perfect Solver': { icon: '💯', color: 'bg-pink-100 text-pink-700 border-pink-300', description: 'Selesaikan 1 level tanpa kesalahan' },
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

export function Leaderboard({ students, currentStudentId }: LeaderboardProps) {
  const sortedStudents = [...students].sort((a, b) => b.totalScore - a.totalScore);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <Award className="w-5 h-5 text-gray-400" />;
  };

  const getRankBgColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300';
    return 'bg-white border-gray-200';
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
        </div>
        <p className="text-gray-600">
          Kompetisi skor tertinggi antar siswa
        </p>
      </div>

      {/* Top 3 Podium */}
      {sortedStudents.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Second Place */}
          <div className="pt-8">
            <div 
              onClick={() => setSelectedStudent(sortedStudents[1])}
              className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl p-6 text-center border-2 border-gray-300 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="flex justify-center mb-3">
                <Medal className="w-12 h-12 text-gray-400" />
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                {sortedStudents[1].profilePhoto ? (
                  <img 
                    src={sortedStudents[1].profilePhoto} 
                    alt={sortedStudents[1].name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-600">
                    {sortedStudents[1].name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{sortedStudents[1].name}</h3>
              <p className="text-2xl font-bold text-gray-600">{sortedStudents[1].totalScore}</p>
              <p className="text-xs text-gray-500 mt-1">{sortedStudents[1].testsCompleted} tes</p>
              {/* Badge Icons */}
              {sortedStudents[1].badges.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {sortedStudents[1].badges.slice(0, 5).map(badge => (
                    <span
                      key={badge}
                      className="text-lg"
                      title={`${badge}: ${BADGE_INFO[badge]?.description || ''}`}
                    >
                      {BADGE_INFO[badge]?.icon || '🏅'}
                    </span>
                  ))}
                  {sortedStudents[1].badges.length > 5 && (
                    <span className="text-xs text-gray-500" title={`${sortedStudents[1].badges.length - 5} badge lainnya`}>
                      +{sortedStudents[1].badges.length - 5}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* First Place */}
          <div>
            <div 
              onClick={() => setSelectedStudent(sortedStudents[0])}
              className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 text-center border-2 border-yellow-300 shadow-lg cursor-pointer hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="flex justify-center mb-3">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                {sortedStudents[0].profilePhoto ? (
                  <img 
                    src={sortedStudents[0].profilePhoto} 
                    alt={sortedStudents[0].name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {sortedStudents[0].name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-lg">{sortedStudents[0].name}</h3>
              <p className="text-3xl font-bold text-amber-600">{sortedStudents[0].totalScore}</p>
              <p className="text-xs text-gray-600 mt-1">{sortedStudents[0].testsCompleted} tes</p>
              {/* Badge Icons */}
              {sortedStudents[0].badges.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {sortedStudents[0].badges.slice(0, 5).map(badge => (
                    <span
                      key={badge}
                      className="text-xl"
                      title={`${badge}: ${BADGE_INFO[badge]?.description || ''}`}
                    >
                      {BADGE_INFO[badge]?.icon || '🏅'}
                    </span>
                  ))}
                  {sortedStudents[0].badges.length > 5 && (
                    <span className="text-xs text-amber-600 font-semibold" title={`${sortedStudents[0].badges.length - 5} badge lainnya`}>
                      +{sortedStudents[0].badges.length - 5}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Third Place */}
          <div className="pt-8">
            <div 
              onClick={() => setSelectedStudent(sortedStudents[2])}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center border-2 border-amber-300 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="flex justify-center mb-3">
                <Medal className="w-12 h-12 text-amber-600" />
              </div>
              <div className="w-16 h-16 bg-amber-200 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                {sortedStudents[2].profilePhoto ? (
                  <img 
                    src={sortedStudents[2].profilePhoto} 
                    alt={sortedStudents[2].name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-amber-700">
                    {sortedStudents[2].name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{sortedStudents[2].name}</h3>
              <p className="text-2xl font-bold text-amber-600">{sortedStudents[2].totalScore}</p>
              <p className="text-xs text-gray-500 mt-1">{sortedStudents[2].testsCompleted} tes</p>
              {/* Badge Icons */}
              {sortedStudents[2].badges.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {sortedStudents[2].badges.slice(0, 5).map(badge => (
                    <span
                      key={badge}
                      className="text-lg"
                      title={`${badge}: ${BADGE_INFO[badge]?.description || ''}`}
                    >
                      {BADGE_INFO[badge]?.icon || '🏅'}
                    </span>
                  ))}
                  {sortedStudents[2].badges.length > 5 && (
                    <span className="text-xs text-gray-500" title={`${sortedStudents[2].badges.length - 5} badge lainnya`}>
                      +{sortedStudents[2].badges.length - 5}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Ranking Lengkap</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sortedStudents.map((student, index) => {
            const rank = index + 1;
            const isCurrentStudent = student.id === currentStudentId;
            const avgScore = student.testsCompleted > 0 
              ? Math.round(student.totalScore / student.testsCompleted)
              : 0;

            return (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`relative border-2 transition-all cursor-pointer hover:shadow-lg overflow-hidden ${
                  isCurrentStudent ? 'ring-2 ring-blue-500' : ''
                } ${rank <= 3 ? 'border-opacity-50' : 'border-gray-200'}`}
              >
                {/* Cover Photo as Background */}
                <div className="absolute inset-0 z-0">
                  {student.coverPhoto ? (
                    <>
                      <img 
                        src={student.coverPhoto} 
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
                    </>
                  ) : (
                    <div className={`w-full h-full ${
                      rank === 1 ? 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600' :
                      rank === 2 ? 'bg-gradient-to-r from-gray-500 via-slate-400 to-gray-500' :
                      rank === 3 ? 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600' :
                      'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600'
                    }`} />
                  )}
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 flex justify-center">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                        {rank <= 3 ? (
                          <span className="text-2xl">
                            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                          </span>
                        ) : (
                          <span className="text-lg font-bold text-gray-700">#{rank}</span>
                        )}
                      </div>
                    </div>

                    {/* Avatar */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-4 shadow-lg flex-shrink-0 ${
                      rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-300' :
                      rank === 2 ? 'bg-gray-300 border-gray-200' :
                      rank === 3 ? 'bg-amber-300 border-amber-200' :
                      'bg-blue-100 border-white'
                    }`}>
                      {student.profilePhoto ? (
                        <img 
                          src={student.profilePhoto} 
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className={`font-bold text-xl ${
                          rank === 1 ? 'text-white' :
                          rank === 2 ? 'text-gray-600' :
                          rank === 3 ? 'text-amber-700' :
                          'text-blue-600'
                        }`}>
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-lg truncate drop-shadow-lg">
                          {student.name}
                        </h4>
                        {isCurrentStudent && (
                          <span className="px-2 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs rounded-full whitespace-nowrap font-semibold shadow-lg">
                            Anda
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-white/90 flex-wrap drop-shadow">
                        <span className="whitespace-nowrap font-medium">{student.testsCompleted} tes</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 whitespace-nowrap font-medium">
                          <TrendingUp className="w-3 h-3" />
                          θ: {student.averageAbility.toFixed(2)}
                        </span>
                        {student.badges.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 whitespace-nowrap font-medium">
                              <Award className="w-3 h-3" />
                              {student.badges.length} badge
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-3xl font-bold text-white drop-shadow-lg">
                        {student.totalScore}
                      </p>
                      <p className="text-xs text-white/80 font-medium">
                        avg: {avgScore}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  {student.badges.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 ml-28">
                      {student.badges.map(badge => (
                        <span
                          key={badge}
                          className="text-2xl transition-transform hover:scale-125 cursor-help drop-shadow-lg"
                          title={`${badge}: ${BADGE_INFO[badge]?.description || ''}`}
                        >
                          {BADGE_INFO[badge]?.icon || '🏅'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {sortedStudents.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Belum ada data leaderboard</p>
              <p className="text-sm mt-1">Selesaikan tes untuk masuk leaderboard!</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Total Peserta</p>
          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Total Tes Diselesaikan</p>
          <p className="text-2xl font-bold text-gray-900">
            {students.reduce((sum, s) => sum + s.testsCompleted, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Skor Tertinggi</p>
          <p className="text-2xl font-bold text-gray-900">
            {students.length > 0 ? Math.max(...students.map(s => s.totalScore)) : 0}
          </p>
        </div>
      </div>

      {/* Player Profile Modal */}
      {selectedStudent && (
        <PlayerProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}