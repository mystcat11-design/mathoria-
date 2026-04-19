import { TrendingUp, Award, Target } from 'lucide-react';
import type { Student } from '../App';

interface PerformanceChartProps {
  student: Student;
}

export function PerformanceChart({ student }: PerformanceChartProps) {
  // Early return if student has no data yet
  if (!student || student.testsCompleted === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <TrendingUp className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">
          Belum ada data performa. Selesaikan tes pertama untuk melihat grafik!
        </p>
      </div>
    );
  }

  // Calculate stats
  const totalCorrect = student.totalCorrectAnswers || 0;
  const totalAnswered = student.totalQuestionsAnswered || 0;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const avgScore = student.testsCompleted > 0 ? Math.round(student.totalScore / student.testsCompleted) : 0;

  // Calculate topic accuracies
  const topics = ['Eksponen', 'Logaritma', 'SPLDV', 'SPLTV', 'SPtLDV'] as const;
  const topicStats = topics.map(topic => {
    const correct = student.correctAnswersByTopic?.[topic] || 0;
    const total = student.topicAnswerCounts?.[topic] || 0;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { topic, accuracy, correct, total };
  });

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Akurasi Total</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{accuracy}%</p>
          <p className="text-xs text-blue-600 mt-1">{totalCorrect}/{totalAnswered} benar</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">Rata-rata Skor</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{avgScore}</p>
          <p className="text-xs text-purple-600 mt-1">dari 100</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-700">Tes Selesai</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{student.testsCompleted}</p>
          <p className="text-xs text-green-600 mt-1">{student.badges.length} badges</p>
        </div>
      </div>

      {/* Topic Accuracy Bars */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          Akurasi per Topik
        </h4>
        <div className="space-y-3">
          {topicStats.map(({ topic, accuracy, correct, total }) => (
            <div key={topic}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{correct}/{total}</span>
                  <span className="text-sm font-semibold text-blue-600">{accuracy}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score History */}
      {student.scoreHistory && student.scoreHistory.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            Riwayat Skor (10 Tes Terakhir)
          </h4>
          <div className="flex items-end justify-between gap-1 h-32">
            {student.scoreHistory.slice(-10).map((entry, idx) => {
              const score = entry?.score || 0;
              const height = `${score}%`;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '100px' }}>
                    <div 
                      className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-300 hover:from-purple-600 hover:to-pink-600 cursor-pointer group relative"
                      style={{ height }}
                      title={`Skor: ${score}`}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {score}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">T{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Ability Theta Info */}
      {student.averageAbility !== undefined && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-amber-900 mb-1">Kemampuan IRT (θ)</h4>
              <p className="text-xs text-amber-700">Item Response Theory ability parameter</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-900">{student.averageAbility.toFixed(2)}</p>
              <p className="text-xs text-amber-600 mt-1">
                {student.averageAbility < -1 ? '🌱 Pemula' :
                 student.averageAbility < 0 ? '📚 Berkembang' :
                 student.averageAbility < 1 ? '⭐ Kompeten' :
                 student.averageAbility < 2 ? '🏆 Mahir' : '👑 Expert'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
