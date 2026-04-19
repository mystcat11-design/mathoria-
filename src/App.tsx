import { useState, useEffect } from 'react';
import { QuizInterface } from './components/QuizInterface';
import { EssayQuizInterface } from './components/EssayQuizInterface';
import { Leaderboard } from './components/Leaderboard';
import { Dashboard } from './components/Dashboard';
import { LoginScreen } from './components/LoginScreen';
import { AchievementNotification } from './components/AchievementNotification';
import { TutorialModal } from './components/TutorialModal';
import { Profile } from './components/Profile';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Trophy, Home, User, HelpCircle } from 'lucide-react';
import { checkBadges } from './utils/badgeChecker';
import { questionBank, Question } from './utils/irtEngine';
import * as supabaseClient from './utils/supabaseClient';
import { toast, Toaster } from 'sonner@2.0.3';

export interface Student {
  id: string;
  name: string;
  totalScore: number;
  testsCompleted: number;
  averageAbility: number;
  badges: string[];
  lastActive: string;
  completedLevels: number[];
  profilePhoto?: string;
  coverPhoto?: string;
  bio?: string;
  xp?: number;
  level?: number;
  hintsUsed?: number;
  correctAnswersByTopic?: {
    Eksponen: number;
    Logaritma: number;
    SPLDV: number;
    SPLTV: number;
    SPtLDV: number;
  };
  topicAnswerCounts?: {
    Eksponen: number;
    Logaritma: number;
    SPLDV: number;
    SPLTV: number;
    SPtLDV: number;
  };
  highestScore?: number;
  hardQuestionCorrect?: number;
  totalQuestionsAnswered?: number;
  totalCorrectAnswers?: number;
  currentStreak?: number;
  bestStreak?: number;
  triedLevels?: number[];
  perfectLevels?: number[];
  highLevelAttempts?: number;
  scoreHistory?: {
    date: string;
    score: number;
    level: number;
  }[];
  abilityHistory?: {
    date: string;
    ability: number;
  }[];
}

export interface QuizResult {
  studentId: string;
  score: number;
  ability: number;
  correctAnswers: number;
  totalQuestions: number;
  timestamp: string;
  level: number;
  xpEarned?: number;
  hintsUsed?: number;
  answerDetails?: {
    questionId: string;
    topic: string;
    pisaLevel: number;
    isCorrect: boolean;
  }[];
}

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'quiz' | 'leaderboard' | 'profile'>('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(questionBank);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage first, then sync with Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load from localStorage first for instant UI
        const savedStudents = localStorage.getItem('mathIRT_students');
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents).map((s: Student) => ({
            ...s,
            completedLevels: s.completedLevels || []
          }));
          setStudents(parsedStudents);
        }

        const savedCurrentStudent = localStorage.getItem('mathIRT_currentStudent');
        if (savedCurrentStudent) {
          const parsedStudent = JSON.parse(savedCurrentStudent);
          setCurrentStudent({
            ...parsedStudent,
            completedLevels: parsedStudent.completedLevels || []
          });
        }

        const savedQuestions = localStorage.getItem('mathIRT_questions');
        if (savedQuestions) {
          setQuestions(JSON.parse(savedQuestions));
        } else {
          // If no questions in localStorage, use default question bank
          setQuestions(questionBank);
          localStorage.setItem('mathIRT_questions', JSON.stringify(questionBank));
        }

        // Then sync from Supabase in background (non-blocking)
        try {
          console.log('🔄 Syncing from Supabase...');
          const cloudData = await supabaseClient.syncCloudToLocal();
          
          // Update state with cloud data if available
          if (cloudData.students.length > 0) {
            setStudents(cloudData.students);
          }
          
          if (cloudData.questions.length > 0) {
            setQuestions(cloudData.questions);
          } else if (questions.length > 0) {
            // If no questions in cloud, upload the default bank
            await supabaseClient.saveQuestions(questionBank);
          }
        } catch (syncError) {
          console.warn('⚠️ Cloud sync failed, using local data only:', syncError);
          toast.error('Tidak dapat terhubung ke server. Menggunakan data lokal.');
        }
        
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Terjadi kesalahan saat memuat data.');
      }
      
      setTimeout(() => setIsLoading(false), 200);
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (currentStudent) {
      const tutorialKey = `mathIRT_tutorial_${currentStudent.id}`;
      const hasSeenTutorial = localStorage.getItem(tutorialKey);
      
      if (!hasSeenTutorial) {
        const timer = setTimeout(() => setShowTutorial(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStudent]);

  const handleCloseTutorial = () => {
    if (currentStudent) {
      const tutorialKey = `mathIRT_tutorial_${currentStudent.id}`;
      localStorage.setItem(tutorialKey, 'true');
    }
    setShowTutorial(false);
  };

  const handleLogin = (name: string) => {
    if (name.toLowerCase() === 'saya guru') {
      setIsTeacherMode(true);
      const teacherUser: Student = {
        id: 'teacher',
        name: 'Saya Guru',
        totalScore: 0,
        testsCompleted: 0,
        averageAbility: 0,
        badges: [],
        lastActive: new Date().toISOString(),
        completedLevels: []
      };
      setCurrentStudent(teacherUser);
      return;
    }
    
    const existingStudent = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    
    if (existingStudent) {
      const updatedStudent = { 
        ...existingStudent, 
        lastActive: new Date().toISOString(),
        completedLevels: existingStudent.completedLevels || []
      };
      setCurrentStudent(updatedStudent);
      localStorage.setItem('mathIRT_currentStudent', JSON.stringify(updatedStudent));
      
      const updatedStudents = students.map(s => 
        s.id === existingStudent.id ? updatedStudent : s
      );
      setStudents(updatedStudents);
      localStorage.setItem('mathIRT_students', JSON.stringify(updatedStudents));
      
      // Sync to Supabase
      supabaseClient.saveStudent(updatedStudent);
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        name,
        totalScore: 0,
        testsCompleted: 0,
        averageAbility: 0,
        badges: [],
        lastActive: new Date().toISOString(),
        completedLevels: [],
        xp: 0,
        level: 1,
        hintsUsed: 0,
        scoreHistory: [],
        abilityHistory: [],
        correctAnswersByTopic: {
          Eksponen: 0,
          Logaritma: 0,
          SPLDV: 0,
          SPLTV: 0,
          SPtLDV: 0
        },
        topicAnswerCounts: {
          Eksponen: 0,
          Logaritma: 0,
          SPLDV: 0,
          SPLTV: 0,
          SPtLDV: 0
        },
        highestScore: 0,
        hardQuestionCorrect: 0,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        currentStreak: 0,
        bestStreak: 0,
        triedLevels: [],
        perfectLevels: [],
        highLevelAttempts: 0
      };
      
      setCurrentStudent(newStudent);
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      
      localStorage.setItem('mathIRT_currentStudent', JSON.stringify(newStudent));
      localStorage.setItem('mathIRT_students', JSON.stringify(updatedStudents));
      
      // Sync new student to Supabase
      supabaseClient.saveStudent(newStudent);
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    if (!currentStudent) return;

    if (result.level === 0) {
      const updatedStudent = {
        ...currentStudent,
        lastActive: new Date().toISOString()
      };
      
      setCurrentStudent(updatedStudent);
      localStorage.setItem('mathIRT_currentStudent', JSON.stringify(updatedStudent));
      
      const updatedStudents = students.map(s => 
        s.id === currentStudent.id ? updatedStudent : s
      );
      setStudents(updatedStudents);
      localStorage.setItem('mathIRT_students', JSON.stringify(updatedStudents));
      
      setActiveView('dashboard');
      setSelectedLevel(null);
      return;
    }

    const earnedBadges = checkBadges(currentStudent, result);
    const newCompletedLevels = [...currentStudent.completedLevels];
    
    if (!newCompletedLevels.includes(result.level)) {
      newCompletedLevels.push(result.level);
    }
    
    const correctByTopic = currentStudent.correctAnswersByTopic || {
      Eksponen: 0,
      Logaritma: 0,
      SPLDV: 0,
      SPLTV: 0,
      SPtLDV: 0
    };
    
    const topicCounts = currentStudent.topicAnswerCounts || {
      Eksponen: 0,
      Logaritma: 0,
      SPLDV: 0,
      SPLTV: 0,
      SPtLDV: 0
    };
    
    let hardQuestionCorrect = currentStudent.hardQuestionCorrect || 0;
    let totalQuestionsAnswered = (currentStudent.totalQuestionsAnswered || 0) + result.totalQuestions;
    let totalCorrectAnswers = (currentStudent.totalCorrectAnswers || 0) + result.correctAnswers;
    let currentStreak = currentStudent.currentStreak || 0;
    let bestStreak = currentStudent.bestStreak || 0;
    const triedLevels = currentStudent.triedLevels || [];
    const perfectLevels = currentStudent.perfectLevels || [];
    let highLevelAttempts = currentStudent.highLevelAttempts || 0;
    
    if (!triedLevels.includes(result.level)) {
      triedLevels.push(result.level);
    }
    
    const isPerfectLevel = result.correctAnswers === result.totalQuestions;
    if (isPerfectLevel && !perfectLevels.includes(result.level)) {
      perfectLevels.push(result.level);
    }
    
    if (result.level >= 5) {
      highLevelAttempts++;
    }
    
    let consecutiveCorrect = 0;
    let maxConsecutiveInQuiz = 0;
    if (result.answerDetails) {
      result.answerDetails.forEach(answer => {
        if (answer.isCorrect) {
          consecutiveCorrect++;
          maxConsecutiveInQuiz = Math.max(maxConsecutiveInQuiz, consecutiveCorrect);
        } else {
          consecutiveCorrect = 0;
        }
      });
    }
    
    if (maxConsecutiveInQuiz >= 5) {
      currentStreak = maxConsecutiveInQuiz;
      bestStreak = Math.max(bestStreak, currentStreak);
    }
    
    if (result.answerDetails) {
      result.answerDetails.forEach(answer => {
        const topic = answer.topic as keyof typeof correctByTopic;
        topicCounts[topic]++;
        
        if (answer.isCorrect) {
          correctByTopic[topic]++;
          
          if (answer.pisaLevel >= 5) {
            hardQuestionCorrect++;
          }
        }
      });
    }
    
    const highestScore = Math.max(currentStudent.highestScore || 0, result.score);
    
    let xpEarned = 0;
    if (result.answerDetails) {
      result.answerDetails.forEach(answer => {
        if (answer.isCorrect) {
          xpEarned += answer.pisaLevel * 10;
        }
      });
    }
    
    const bonusXP = isPerfectLevel ? 50 : 0;
    const hintsXPCost = (result.hintsUsed || 0) * 5;
    const finalXP = Math.max(0, xpEarned + bonusXP - hintsXPCost);
    const currentXP = currentStudent.xp || 0;
    const newXP = currentXP + finalXP;
    const newLevel = Math.floor(newXP / 100) + 1;
    const totalHintsUsed = (currentStudent.hintsUsed || 0) + (result.hintsUsed || 0);
    
    const newScoreHistory = [
      ...(currentStudent.scoreHistory || []),
      { 
        date: new Date().toISOString(), 
        score: result.score, 
        level: result.level 
      }
    ];
    
    const newAbilityHistory = [
      ...(currentStudent.abilityHistory || []),
      { 
        date: new Date().toISOString(), 
        ability: result.ability 
      }
    ];

    const updatedStudent: Student = {
      ...currentStudent,
      totalScore: currentStudent.totalScore + result.score,
      testsCompleted: currentStudent.testsCompleted + 1,
      averageAbility: ((currentStudent.averageAbility * currentStudent.testsCompleted) + result.ability) / (currentStudent.testsCompleted + 1),
      badges: [...currentStudent.badges, ...earnedBadges],
      completedLevels: newCompletedLevels,
      correctAnswersByTopic: correctByTopic,
      topicAnswerCounts: topicCounts,
      highestScore: highestScore,
      hardQuestionCorrect: hardQuestionCorrect,
      totalQuestionsAnswered: totalQuestionsAnswered,
      totalCorrectAnswers: totalCorrectAnswers,
      currentStreak: currentStreak,
      bestStreak: bestStreak,
      triedLevels: triedLevels,
      perfectLevels: perfectLevels,
      highLevelAttempts: highLevelAttempts,
      xp: newXP,
      level: newLevel,
      hintsUsed: totalHintsUsed,
      scoreHistory: newScoreHistory,
      abilityHistory: newAbilityHistory,
      lastActive: new Date().toISOString()
    };

    setCurrentStudent(updatedStudent);
    
    const updatedStudents = students.map(s => 
      s.id === currentStudent.id ? updatedStudent : s
    );
    setStudents(updatedStudents);
    
    localStorage.setItem('mathIRT_currentStudent', JSON.stringify(updatedStudent));
    localStorage.setItem('mathIRT_students', JSON.stringify(updatedStudents));
    
    // Sync to Supabase
    supabaseClient.saveStudent(updatedStudent);
    
    if (earnedBadges.length > 0) {
      setNewBadges(earnedBadges);
    }
    
    setActiveView('dashboard');
    setSelectedLevel(null);
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    setIsTeacherMode(false);
    localStorage.removeItem('mathIRT_currentStudent');
    setActiveView('dashboard');
  };

  const handleUpdateQuestions = (updatedQuestions: Question[]) => {
    setQuestions(updatedQuestions);
    localStorage.setItem('mathIRT_questions', JSON.stringify(updatedQuestions));
    
    // Sync questions to Supabase (untuk guru)
    supabaseClient.saveQuestions(updatedQuestions);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Memuat Mathoria...</p>
        </div>
      </div>
    );
  }

  if (!currentStudent) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (isTeacherMode) {
    return (
      <TeacherDashboard 
        students={students} 
        onLogout={handleLogout}
        questions={questions}
        onUpdateQuestions={handleUpdateQuestions}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" richColors />
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Mathoria</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Halo, <span className="font-semibold text-gray-900">{currentStudent.name}</span></span>
              <button
                onClick={() => setShowTutorial(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                title="Lihat Panduan"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Panduan</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                activeView === 'dashboard'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('leaderboard')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                activeView === 'leaderboard'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                activeView === 'profile'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              <User className="w-4 h-4" />
              Profil
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && (
          <Dashboard 
            student={currentStudent} 
            onStartQuiz={(level: number) => {
              setSelectedLevel(level);
              setActiveView('quiz');
            }}
          />
        )}
        {activeView === 'quiz' && selectedLevel !== null && (
          selectedLevel === 6 ? (
            <EssayQuizInterface 
              student={currentStudent}
              selectedLevel={selectedLevel}
              onComplete={() => {
                // For Level 6 essay, just mark as attempted (score pending review)
                toast.success('Jawaban Level 6 telah dikirim untuk direview guru!');
                setActiveView('dashboard');
                setSelectedLevel(null);
              }}
              onCancel={() => {
                setActiveView('dashboard');
                setSelectedLevel(null);
              }}
              questions={questions.filter(q => q.pisaLevel === selectedLevel)}
            />
          ) : (
            <QuizInterface 
              student={currentStudent}
              selectedLevel={selectedLevel}
              onComplete={handleQuizComplete}
              onCancel={() => {
                setActiveView('dashboard');
                setSelectedLevel(null);
              }}
              questions={questions.filter(q => q.pisaLevel === selectedLevel)}
            />
          )
        )}
        {activeView === 'leaderboard' && (
          <Leaderboard 
            students={students}
            currentStudentId={currentStudent.id}
          />
        )}
        {activeView === 'profile' && (
          <Profile 
            student={currentStudent}
            onUpdateProfile={(updates) => {
              const updatedStudent = { ...currentStudent, ...updates };
              setCurrentStudent(updatedStudent);
              
              const updatedStudents = students.map(s => 
                s.id === currentStudent.id ? updatedStudent : s
              );
              setStudents(updatedStudents);
              
              localStorage.setItem('mathIRT_currentStudent', JSON.stringify(updatedStudent));
              localStorage.setItem('mathIRT_students', JSON.stringify(updatedStudents));
              
              // Sync profile updates to Supabase
              supabaseClient.saveStudent(updatedStudent);
            }}
          />
        )}
      </main>

      {newBadges.length > 0 && (
        <AchievementNotification 
          badges={newBadges}
          onClose={() => setNewBadges([])}
        />
      )}

      {showTutorial && (
        <TutorialModal 
          onClose={handleCloseTutorial}
        />
      )}
    </div>
  );
}