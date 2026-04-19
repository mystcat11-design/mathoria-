import { useState, useMemo } from 'react';
import * as React from 'react';
import { Student } from '../App';
import { Users, TrendingUp, Award, BookOpen, BarChart3, Activity, Trophy, Star, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getBadgeInfo } from '../utils/badgeInfo';
import { Question } from '../utils/irtEngine';
import { QuestionBankEditor } from './QuestionBankEditor';
import { EssayReviewPanel } from './EssayReviewPanel';

interface TeacherDashboardProps {
  students: Student[];
  onLogout: () => void;
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
}

export function TeacherDashboard({ students, onLogout, questions, onUpdateQuestions }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'essays' | 'questions'>('overview');
  const [sortField, setSortField] = useState<'name' | 'theta' | 'score' | 'level' | 'badges'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  // Calculate overall statistics
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const avgTheta = students.reduce((sum, s) => sum + s.averageAbility, 0) / totalStudents || 0;
    const totalTests = students.reduce((sum, s) => sum + s.testsCompleted, 0);
    const totalBadges = students.reduce((sum, s) => sum + s.badges.length, 0);
    
    return {
      totalStudents,
      avgTheta: avgTheta.toFixed(2),
      totalTests,
      totalBadges,
      avgTestsPerStudent: (totalTests / totalStudents || 0).toFixed(1)
    };
  }, [students]);

  // Theta distribution data for chart
  const thetaDistribution = useMemo(() => {
    const ranges = [
      { range: '< -1.0', min: -Infinity, max: -1.0, count: 0 },
      { range: '-1.0 to -0.5', min: -1.0, max: -0.5, count: 0 },
      { range: '-0.5 to 0', min: -0.5, max: 0, count: 0 },
      { range: '0 to 0.5', min: 0, max: 0.5, count: 0 },
      { range: '0.5 to 1.0', min: 0.5, max: 1.0, count: 0 },
      { range: '> 1.0', min: 1.0, max: Infinity, count: 0 }
    ];

    students.forEach(student => {
      const theta = student.averageAbility;
      const range = ranges.find(r => theta >= r.min && theta < r.max);
      if (range) range.count++;
    });

    return ranges.map((r, idx) => ({ id: `theta-${idx}`, name: r.range, siswa: r.count }));
  }, [students]);

  // Level completion data
  const levelCompletion = useMemo(() => {
    const levels = [1, 2, 3, 4, 5, 6];
    return levels.map(level => ({
      id: `level-${level}`,
      level: `Level ${level}`,
      completed: students.filter(s => s.completedLevels?.includes(level)).length,
      total: students.length
    }));
  }, [students]);

  // Badge distribution - top 10 badges
  const badgeDistribution = useMemo(() => {
    const badgeCounts: Record<string, number> = {};
    students.forEach(student => {
      student.badges.forEach(badge => {
        badgeCounts[badge] = (badgeCounts[badge] || 0) + 1;
      });
    });

    return Object.entries(badgeCounts)
      .map(([name, count], index) => ({ id: `badge-${index}`, name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [students]);

  // Top performers
  const topPerformers = useMemo(() => {
    return [...students]
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5);
  }, [students]);

  // Sort students
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'theta':
          aVal = a.averageAbility;
          bVal = b.averageAbility;
          break;
        case 'score':
          aVal = a.totalScore;
          bVal = b.totalScore;
          break;
        case 'level':
          aVal = Math.max(...(a.completedLevels || [0]));
          bVal = Math.max(...(b.completedLevels || [0]));
          break;
        case 'badges':
          aVal = a.badges.length;
          bVal = b.badges.length;
          break;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortOrder === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [students, sortField, sortOrder]);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Guru</h1>
                <p className="text-xs text-gray-500">Mathoria Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Guru</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Siswa</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rata-rata θ</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgTheta}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTests}</p>
              </div>
              <BookOpen className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Badge</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBadges}</p>
              </div>
              <Award className="w-10 h-10 text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Tes/Siswa</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgTestsPerStudent}</p>
              </div>
              <Activity className="w-10 h-10 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              } rounded-lg transition-colors`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('essays')}
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === 'essays' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              } rounded-lg transition-colors`}
            >
              Review Esai
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === 'questions' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              } rounded-lg transition-colors`}
            >
              Bank Soal
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Theta Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-gray-900">Distribusi Kemampuan (θ)</h2>
                </div>
                {students.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250} key="theta-chart-container">
                    <BarChart data={thetaDistribution} key="theta-chart">
                      <CartesianGrid strokeDasharray="3 3" key="theta-grid" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} key="theta-xaxis" />
                      <YAxis key="theta-yaxis" />
                      <Tooltip key="theta-tooltip" />
                      <Bar dataKey="siswa" fill="#3B82F6" key="theta-bar" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-400">
                    <p>Belum ada data siswa</p>
                  </div>
                )}
              </div>

              {/* Level Completion */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h2 className="font-bold text-gray-900">Progress per Level</h2>
                </div>
                {students.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250} key="level-chart-container">
                    <BarChart data={levelCompletion} key="level-chart">
                      <CartesianGrid strokeDasharray="3 3" key="level-grid" />
                      <XAxis dataKey="level" key="level-xaxis" />
                      <YAxis key="level-yaxis" />
                      <Tooltip key="level-tooltip" />
                      <Bar dataKey="completed" fill="#10B981" name="Selesai" key="level-bar" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-400">
                    <p>Belum ada data siswa</p>
                  </div>
                )}
              </div>

              {/* Top Performers */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-amber-600" />
                  <h2 className="font-bold text-gray-900">Top 5 Performers</h2>
                </div>
                {topPerformers.length > 0 ? (
                  <div className="space-y-3">
                    {topPerformers.map((student, idx) => (
                      <div key={student.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-600' : 'bg-blue-500'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-600">θ: {student.averageAbility.toFixed(2)} | Badge: {student.badges.length}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{student.totalScore}</p>
                          <p className="text-xs text-gray-500">poin</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-400">
                    <p>Belum ada data siswa</p>
                  </div>
                )}
              </div>

              {/* Badge Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-purple-600" />
                  <h2 className="font-bold text-gray-900">Top 10 Badge</h2>
                </div>
                {badgeDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250} key="badge-chart-container">
                    <BarChart data={badgeDistribution} layout="horizontal" key="badge-chart">
                      <CartesianGrid strokeDasharray="3 3" key="badge-grid" />
                      <XAxis type="number" key="badge-xaxis" />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10 }} key="badge-yaxis" />
                      <Tooltip key="badge-tooltip" />
                      <Bar dataKey="count" fill="#8B5CF6" key="badge-bar" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-400">
                    <p>Belum ada badge yang diraih</p>
                  </div>
                )}
              </div>
            </div>

            {/* Student Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-bold text-gray-900">Monitoring Siswa ({students.length})</h2>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        No
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          Nama Siswa
                          <SortIcon field="name" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort('theta')}
                      >
                        <div className="flex items-center gap-1">
                          Kemampuan (θ)
                          <SortIcon field="theta" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort('score')}
                      >
                        <div className="flex items-center gap-1">
                          Total Skor
                          <SortIcon field="score" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort('level')}
                      >
                        <div className="flex items-center gap-1">
                          Level Tertinggi
                          <SortIcon field="level" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSort('badges')}
                      >
                        <div className="flex items-center gap-1">
                          Badge
                          <SortIcon field="badges" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Total Soal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Detail
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedStudents.map((student, idx) => (
                      <React.Fragment key={student.id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {idx + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              {student.profilePhoto ? (
                                <img 
                                  src={student.profilePhoto} 
                                  alt={student.name}
                                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-gray-900">{student.name}</p>
                                <p className="text-xs text-gray-500">{student.testsCompleted} tes selesai</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              student.averageAbility > 1 ? 'bg-green-100 text-green-800' :
                              student.averageAbility > 0 ? 'bg-blue-100 text-blue-800' :
                              student.averageAbility > -1 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {student.averageAbility.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                            {student.totalScore}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                              Level {Math.max(...(student.completedLevels || [0]))}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4 text-amber-500" />
                              <span className="font-semibold text-gray-900">{student.badges.length}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {student.totalQuestionsAnswered || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              {expandedStudent === student.id ? 'Tutup' : 'Lihat'}
                            </button>
                          </td>
                        </tr>
                        {expandedStudent === student.id && (
                          <tr>
                            <td colSpan={8} className="px-6 py-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Completed Levels */}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Level Selesai</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {[1, 2, 3, 4, 5, 6].map(level => (
                                      <span
                                        key={level}
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                          student.completedLevels?.includes(level)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                        }`}
                                      >
                                        L{level}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Topic Accuracy */}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Akurasi per Topik</h4>
                                  <div className="space-y-1 text-xs">
                                    {student.correctAnswersByTopic && student.topicAnswerCounts && (
                                      <>
                                        {Object.entries(student.correctAnswersByTopic).map(([topic, correct]) => {
                                          const total = student.topicAnswerCounts![topic as keyof typeof student.topicAnswerCounts] || 0;
                                          const percentage = total > 0 ? ((correct / total) * 100).toFixed(0) : '0';
                                          return (
                                            <div key={topic} className="flex justify-between">
                                              <span className="text-gray-600">{topic}:</span>
                                              <span className="font-semibold text-gray-900">{correct}/{total} ({percentage}%)</span>
                                            </div>
                                          );
                                        })}
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Badges */}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Badge Diraih ({student.badges.length})</h4>
                                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                                    {student.badges.map(badge => {
                                      const badgeInfo = getBadgeInfo(badge);
                                      return (
                                        <span
                                          key={badge}
                                          className="px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded text-xs font-medium"
                                          title={badgeInfo.description}
                                        >
                                          {badgeInfo.icon} {badge}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'essays' && (
          <EssayReviewPanel />
        )}

        {activeTab === 'questions' && (
          <QuestionBankEditor 
            questions={questions}
            onUpdateQuestions={onUpdateQuestions}
          />
        )}
      </main>
    </div>
  );
}