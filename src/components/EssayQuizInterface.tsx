import { useState, useEffect } from 'react';
import { Student } from '../App';
import { Clock, X, FileText, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';
import { Question } from '../utils/irtEngine';
import * as supabaseClient from '../utils/supabaseClient';

interface EssayQuizInterfaceProps {
  student: Student;
  selectedLevel: number;
  onComplete: () => void;
  onCancel: () => void;
  questions: Question[];
}

export interface EssaySubmission {
  id: string;
  studentId: string;
  studentName: string;
  questionId: string;
  questionText: string;
  answer: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
  score?: number;
  rubricScores?: {
    identifikasi: number;
    integrasi: number;
    akurasi: number;
    evaluasi: number;
    kreativitas: number;
  };
  feedback?: string;
  feedbackType?: 'isolasi' | 'prediksi' | 'batasan' | 'justifikasi';
  probingQuestions?: string[];
}

export function EssayQuizInterface({ student, selectedLevel, onComplete, onCancel, questions }: EssayQuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [essayAnswer, setEssayAnswer] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState<string[]>(Array(questions.length).fill(''));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveAndNext = () => {
    // Save current answer
    const newSavedAnswers = [...savedAnswers];
    newSavedAnswers[currentQuestionIndex] = essayAnswer;
    setSavedAnswers(newSavedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setEssayAnswer(newSavedAnswers[currentQuestionIndex + 1] || '');
    } else {
      // All questions answered, submit
      handleSubmitAll(newSavedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer before going back
      const newSavedAnswers = [...savedAnswers];
      newSavedAnswers[currentQuestionIndex] = essayAnswer;
      setSavedAnswers(newSavedAnswers);
      
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setEssayAnswer(newSavedAnswers[currentQuestionIndex - 1] || '');
    }
  };

  const handleSubmitAll = async (answers: string[]) => {
    setIsSubmitting(true);

    try {
      // Create essay submissions for each question
      const submissions: EssaySubmission[] = questions.map((question, index) => ({
        id: `essay-${student.id}-${question.id}-${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        questionId: question.id,
        questionText: question.text,
        answer: answers[index] || '',
        submittedAt: new Date().toISOString(),
        status: 'pending' as const,
      }));

      // Save to Supabase
      for (const submission of submissions) {
        await supabaseClient.saveEssaySubmission(submission);
      }

      console.log(`✅ ${submissions.length} essay answers submitted for review`);
      
      // Mark as completed (without score for now - will be scored by teacher)
      onComplete();
    } catch (error) {
      console.error('Error submitting essays:', error);
      alert('Terjadi kesalahan saat mengirim jawaban. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = essayAnswer.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minWords = 100;
  const isAnswerSufficient = wordCount >= minWords;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Level 6: Penalaran & Evaluasi</h2>
                <p className="text-sm text-gray-600">Soal Essay - Analisis Multi-Materi</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Batalkan"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-gray-700">Waktu: {formatTime(timeElapsed)}</span>
              </div>
              <span className="font-medium text-purple-600">
                Soal {currentQuestionIndex + 1} dari {questions.length}
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Question Number Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg mb-6">
            <BookOpen className="w-4 h-4" />
            <span className="font-semibold">Soal {currentQuestionIndex + 1}</span>
          </div>

          {/* Question Text */}
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
              {currentQuestion?.text || currentQuestion?.question}
            </p>
          </div>

          {/* Essay Instructions */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Panduan Menjawab Level 6
            </h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span><strong>Identifikasi:</strong> Tentukan materi apa saja yang terlibat (Eksponen, Logaritma, SPLDV, SPLTV, SPtLDV)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span><strong>Integrasikan:</strong> Hubungkan hasil dari satu materi ke materi lainnya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span><strong>Hitung dengan Akurat:</strong> Tunjukkan perhitungan matematis yang detail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span><strong>Evaluasi & Justifikasi:</strong> Berikan alasan kuat mengapa Anda mengambil keputusan tersebut</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span><strong>Kreativitas:</strong> Tambahkan rekomendasi atau solusi alternatif jika ada</span>
              </li>
            </ul>
          </div>

          {/* Essay Textarea */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Jawaban Anda:
              </label>
              <span className={`text-sm font-medium ${
                isAnswerSufficient ? 'text-green-600' : 'text-orange-600'
              }`}>
                {wordCount} / {minWords} kata minimum
                {isAnswerSufficient && <CheckCircle2 className="inline w-4 h-4 ml-1" />}
              </span>
            </div>
            <textarea
              value={essayAnswer}
              onChange={(e) => setEssayAnswer(e.target.value)}
              placeholder="Tulis jawaban lengkap Anda di sini... Jelaskan proses pemikiran, perhitungan, dan alasan keputusan Anda secara detail."
              className="w-full h-96 p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none font-mono text-sm"
              disabled={isSubmitting}
            />
          </div>

          {/* Word Count Warning */}
          {!isAnswerSufficient && essayAnswer.length > 0 && (
            <div className="mt-3 flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-orange-800">
                Jawaban Anda masih terlalu singkat. Untuk analisis Level 6 yang komprehensif, 
                minimal <strong>{minWords} kata</strong> diperlukan untuk menjelaskan proses pemikiran Anda.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || isSubmitting}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Soal Sebelumnya
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-purple-600 scale-125'
                    : savedAnswers[index]
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
                title={`Soal ${index + 1}${savedAnswers[index] ? ' (Terjawab)' : ''}`}
              />
            ))}
          </div>

          <button
            onClick={handleSaveAndNext}
            disabled={!isAnswerSufficient || isSubmitting}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              !isAnswerSufficient || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : currentQuestionIndex === questions.length - 1
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
            }`}
          >
            {isSubmitting 
              ? 'Mengirim...' 
              : currentQuestionIndex === questions.length - 1 
              ? '✓ Kirim Semua Jawaban' 
              : 'Simpan & Lanjut →'
            }
          </button>
        </div>

        {/* Answer Overview */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Status Jawaban:</h3>
          <div className="grid grid-cols-3 gap-2">
            {questions.map((q, index) => (
              <button
                key={index}
                onClick={() => {
                  // Save current answer first
                  const newSavedAnswers = [...savedAnswers];
                  newSavedAnswers[currentQuestionIndex] = essayAnswer;
                  setSavedAnswers(newSavedAnswers);
                  // Navigate to clicked question
                  setCurrentQuestionIndex(index);
                  setEssayAnswer(newSavedAnswers[index] || '');
                }}
                disabled={isSubmitting}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-purple-600 text-white shadow-md'
                    : savedAnswers[index]
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div>Soal {index + 1}</div>
                <div className="text-xs mt-1">
                  {savedAnswers[index] 
                    ? `${savedAnswers[index].trim().split(/\s+/).length} kata`
                    : 'Belum dijawab'
                  }
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}