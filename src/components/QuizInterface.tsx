import { useState, useEffect } from 'react';
import { Student, QuizResult } from '../App';
import { Clock, CheckCircle, XCircle, X, Sparkles, TrendingUp, Heart, Star, Zap, Target } from 'lucide-react';
import { updateAbility, calculateFinalScore, Question } from '../utils/irtEngine';

interface QuizInterfaceProps {
  student: Student;
  selectedLevel: number;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
  questions: Question[];
}

// Pesan apresiasi untuk jawaban benar
const CORRECT_MESSAGES = [
  { emoji: '🎉', title: 'Luar Biasa!', message: 'Jawabanmu tepat sekali!' },
  { emoji: '⭐', title: 'Sempurna!', message: 'Kamu menguasai materi ini!' },
  { emoji: '🚀', title: 'Keren Sekali!', message: 'Terus pertahankan ya!' },
  { emoji: '💯', title: 'Perfect!', message: 'Pemahaman yang sangat baik!' },
  { emoji: '🌟', title: 'Hebat!', message: 'Kamu benar-benar memahaminya!' },
  { emoji: '🏆', title: 'Excellent!', message: 'Jawaban yang cemerlang!' },
  { emoji: '✨', title: 'Brilian!', message: 'Kemampuanmu terus meningkat!' },
  { emoji: '🎯', title: 'Tepat Sasaran!', message: 'Analisis yang bagus!' },
  { emoji: '💪', title: 'Mantap!', message: 'Kerja bagus, lanjutkan!' },
  { emoji: '👏', title: 'Luar Biasa!', message: 'Kamu memang jago matematika!' }
];

// Pesan motivasi untuk jawaban salah
const INCORRECT_MESSAGES = [
  { emoji: '💪', title: 'Tetap Semangat!', message: 'Setiap kesalahan adalah pelajaran berharga!' },
  { emoji: '🌱', title: 'Terus Belajar!', message: 'Kamu semakin dekat dengan pemahaman yang benar!' },
  { emoji: '🔥', title: 'Jangan Menyerah!', message: 'Kesalahan adalah bagian dari proses belajar!' },
  { emoji: '📚', title: 'Keep Going!', message: 'Latihan membuat sempurna, kamu pasti bisa!' },
  { emoji: '🎓', title: 'Belajar Terus!', message: 'Setiap master pernah jadi pemula!' },
  { emoji: '✊', title: 'Bangkit Lagi!', message: 'Kesalahan hari ini adalah keberhasilan besok!' },
  { emoji: '🌟', title: 'Hampir Benar!', message: 'Kamu di jalur yang tepat, terus berlatih!' },
  { emoji: '💡', title: 'Ayo Coba Lagi!', message: 'Pemahaman datang dengan latihan!' },
  { emoji: '🚀', title: 'Terus Maju!', message: 'Setiap usaha membawamu lebih dekat ke tujuan!' },
  { emoji: '⭐', title: 'Stay Positive!', message: 'Kesalahan adalah guru terbaik!' }
];

export function QuizInterface({ student, selectedLevel, onComplete, onCancel, questions }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [theta, setTheta] = useState(student.averageAbility || 0);
  const [hintsUsedInQuiz, setHintsUsedInQuiz] = useState(0); // Track hints used in this quiz
  const [currentXP, setCurrentXP] = useState(student.xp || 0); // Track current XP (can decrease when using hints)
  
  // Helper to get PISA level info
  const getPisaLevelInfo = (level: number) => {
    const levelInfo: Record<number, { name: string; description: string; color: string }> = {
      1: { name: 'Level 1', description: 'Mengingat & menghitung langsung', color: 'bg-green-100 text-green-700 border-green-300' },
      2: { name: 'Level 2', description: 'Prosedural & representasi', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      3: { name: 'Level 3', description: 'Interpretasi & koneksi', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      4: { name: 'Level 4', description: 'Pemodelan matematis', color: 'bg-orange-100 text-orange-700 border-orange-300' },
      5: { name: 'Level 5', description: 'Evaluasi & penalaran', color: 'bg-red-100 text-red-700 border-red-300' },
      6: { name: 'Level 6', description: 'Refleksi abstrak', color: 'bg-purple-100 text-purple-700 border-purple-300' }
    };
    return levelInfo[level] || levelInfo[1];
  };
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [answerDetails, setAnswerDetails] = useState<Array<{
    questionId: string;
    topic: string;
    pisaLevel: number;
    isCorrect: boolean;
  }>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleAnswerSelect = (answerId: string) => {
    if (!showFeedback) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setShowFeedback(true);

    // Store answer details
    const newAnswerDetails = [
      ...answerDetails,
      {
        questionId: currentQuestion.id,
        topic: currentQuestion.topic,
        pisaLevel: currentQuestion.pisaLevel,
        isCorrect
      }
    ];
    setAnswerDetails(newAnswerDetails);

    // Update theta using IRT
    const newTheta = updateAbility(theta, isCorrect, currentQuestion.difficulty, currentQuestion.discrimination);
    setTheta(newTheta);

    // Wait before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Quiz complete
        const correctCount = newAnswers.filter(a => a).length;
        const score = Math.round((correctCount / questions.length) * 100);
        
        const result: QuizResult = {
          studentId: student.id,
          score,
          ability: newTheta,
          correctAnswers: correctCount,
          totalQuestions: questions.length,
          timestamp: new Date().toISOString(),
          level: selectedLevel,
          answerDetails: newAnswerDetails
        };
        
        onComplete(result);
      }
    }, 3000); // Ubah dari 1500 menjadi 3000 untuk memberikan waktu lebih untuk apresiasi
  };

  // Get random feedback message
  const getFeedbackMessage = (isCorrect: boolean) => {
    const messages = isCorrect ? CORRECT_MESSAGES : INCORRECT_MESSAGES;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tidak Ada Soal Tersedia</h2>
          <p className="text-gray-600 mb-6">Maaf, tidak ada soal tersedia untuk level ini saat ini.</p>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const pisaInfo = getPisaLevelInfo(currentQuestion.pisaLevel);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tes Level {selectedLevel}</h2>
            <p className="text-sm text-gray-600">Soal {currentQuestionIndex + 1} dari {questions.length} • {pisaInfo.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Batalkan Tes"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        {/* PISA Level & Topic Badges */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 ${pisaInfo.color}`}>
            <span className="font-bold">{pisaInfo.name}</span>: {pisaInfo.description}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
            {currentQuestion.topic}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-xl text-gray-900 mb-6 leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.id === currentQuestion.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`${
                    showCorrect ? 'text-green-900' :
                    showIncorrect ? 'text-red-900' :
                    isSelected ? 'text-blue-900' :
                    'text-gray-900'
                  }`}>
                    {option.text}
                  </span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showFeedback && (() => {
          const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
          const feedbackMsg = getFeedbackMessage(isCorrect);
          
          return (
            <>
              {/* Feedback Modal/Card - Apresiasi atau Motivasi */}
              <div className={`mt-6 overflow-hidden rounded-xl shadow-lg border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                isCorrect
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'
              }`}>
                {/* Header dengan Emoji Besar */}
                <div className={`p-6 text-center ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}>
                  <div className="text-6xl mb-3 animate-in zoom-in duration-300 delay-100">
                    {feedbackMsg.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 animate-in fade-in slide-in-from-top-2 duration-300 delay-200">
                    {feedbackMsg.title}
                  </h3>
                  <p className="text-white/90 animate-in fade-in duration-300 delay-300">
                    {feedbackMsg.message}
                  </p>
                </div>

                {/* Explanation Section */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCorrect 
                        ? 'bg-green-200' 
                        : 'bg-blue-200'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-700" />
                      ) : (
                        <Target className="w-6 h-6 text-blue-700" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold mb-2 ${
                        isCorrect ? 'text-green-900' : 'text-blue-900'
                      }`}>
                        {isCorrect ? '✓ Jawaban Benar!' : '💡 Pembahasan:'}
                      </p>
                      <p className={`text-sm leading-relaxed ${
                        isCorrect ? 'text-green-700' : 'text-blue-700'
                      }`}>
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Stats Progress */}
                  <div className={`mt-4 pt-4 border-t-2 ${
                    isCorrect ? 'border-green-200' : 'border-blue-200'
                  }`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          isCorrect ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {answers.filter(a => a).length}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Benar</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          isCorrect ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {Math.round(((answers.filter(a => a).length + (isCorrect ? 1 : 0)) / (answers.length + 1)) * 100)}%
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Akurasi</div>
                      </div>
                    </div>
                  </div>

                  {/* Next Question Indicator */}
                  {currentQuestionIndex < questions.length - 1 && (
                    <div className={`mt-4 p-3 rounded-lg text-center ${
                      isCorrect 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      <p className="text-sm font-medium">
                        ⏱️ Lanjut ke soal berikutnya...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Submit Button */}
      {!showFeedback && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              selectedAnswer
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Lanjut' : 'Selesai'}
          </button>
        </div>
      )}

      {/* IRT Info */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-600">Estimasi Kemampuan (θ): </span>
            <span className="font-mono font-semibold text-gray-900">{theta.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-600">Benar: </span>
            <span className="font-semibold text-green-600">{answers.filter(a => a).length}</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="font-semibold text-gray-900">{answers.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}