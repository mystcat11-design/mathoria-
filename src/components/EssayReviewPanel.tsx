import { useState, useEffect } from 'react';
import { FileText, User, Calendar, CheckCircle2, Clock, Send, X, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';
import * as supabaseClient from '../utils/supabaseClient';
import type { EssaySubmission } from '../utils/supabaseClient';
import { questionBank } from '../utils/irtEngine';

const FEEDBACK_TYPES = {
  isolasi: {
    name: 'Kesalahan Isolasi',
    description: 'Siswa hanya mengerjakan satu materi dan mengabaikan yang lain',
    example: '"Hasil perhitungan materialmu sudah tepat. Sekarang, bagaimana jika angka tersebut dibandingkan dengan laju kenaikan debit air?"'
  },
  prediksi: {
    name: 'Kesalahan Prediksi',
    description: 'Siswa memilih model yang tidak sesuai (misal: linear untuk fenomena eksponensial)',
    example: '"Kamu memilih menambah mesin (linear). Coba hitung selisihnya pada jam ke-24. Apakah mesin tersebut masih bisa mengejar kebocoran?"'
  },
  batasan: {
    name: 'Kesalahan Batasan',
    description: 'Siswa melanggar constraint/batasan yang ada (anggaran/lahan)',
    example: '"Secara teknis jumlah ini benar. Namun, coba cek kembali bagian anggaran di SPtLDV. Apakah total biayanya masih masuk batas?"'
  },
  justifikasi: {
    name: 'Kesalahan Justifikasi',
    description: 'Siswa tidak bisa menjelaskan alasan pilihannya',
    example: '"Pilihanmu sudah tepat. Bisakah kamu menjelaskan mengapa strategi ini lebih aman bagi perusahaan dalam jangka panjang?"'
  }
};

export function EssayReviewPanel() {
  const [essays, setEssays] = useState<EssaySubmission[]>([]);
  const [selectedEssay, setSelectedEssay] = useState<EssaySubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScoring, setIsScoring] = useState(false);
  
  // Rubric scores
  const [identifikasi, setIdentifikasi] = useState(0);
  const [integrasi, setIntegrasi] = useState(0);
  const [akurasi, setAkurasi] = useState(0);
  const [evaluasi, setEvaluasi] = useState(0);
  const [kreativitas, setKreativitas] = useState(0);
  
  // Feedback
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState<keyof typeof FEEDBACK_TYPES | ''>('');
  const [probingQuestions, setProbingQuestions] = useState<string[]>(['', '', '']);

  useEffect(() => {
    loadEssays();
  }, []);

  const loadEssays = async () => {
    setIsLoading(true);
    const pendingEssays = await supabaseClient.getPendingEssays();
    setEssays(pendingEssays);
    setIsLoading(false);
  };

  const handleSelectEssay = (essay: EssaySubmission) => {
    setSelectedEssay(essay);
    // Reset scoring form
    setIdentifikasi(essay.rubricScores?.identifikasi || 0);
    setIntegrasi(essay.rubricScores?.integrasi || 0);
    setAkurasi(essay.rubricScores?.akurasi || 0);
    setEvaluasi(essay.rubricScores?.evaluasi || 0);
    setKreativitas(essay.rubricScores?.kreativitas || 0);
    setFeedback(essay.feedback || '');
    setFeedbackType(essay.feedbackType || '');
    setProbingQuestions(essay.probingQuestions || ['', '', '']);
  };

  // Get expected answer and rubric guidelines from question bank
  const getQuestionGuidelines = (questionId: string) => {
    return questionBank.find(q => q.id === questionId);
  };

  const calculateTotalScore = () => {
    return identifikasi + integrasi + akurasi + evaluasi + kreativitas;
  };

  const handleSubmitScore = async () => {
    if (!selectedEssay) return;
    
    const totalScore = calculateTotalScore();
    
    if (totalScore === 0) {
      alert('Silakan berikan skor rubrik terlebih dahulu!');
      return;
    }

    if (!feedback.trim()) {
      alert('Silakan berikan feedback untuk siswa!');
      return;
    }

    setIsScoring(true);
    
    const success = await supabaseClient.scoreEssay(
      selectedEssay.id,
      totalScore,
      {
        identifikasi,
        integrasi,
        akurasi,
        evaluasi,
        kreativitas
      },
      feedback,
      feedbackType as any || undefined,
      probingQuestions.filter(q => q.trim() !== '')
    );

    if (success) {
      alert(`Essay dari ${selectedEssay.studentName} berhasil dinilai dengan skor ${totalScore}/100!`);
      setSelectedEssay(null);
      await loadEssays();
    } else {
      alert('Terjadi kesalahan saat menyimpan penilaian.');
    }
    
    setIsScoring(false);
  };

  const updateProbingQuestion = (index: number, value: string) => {
    const newQuestions = [...probingQuestions];
    newQuestions[index] = value;
    setProbingQuestions(newQuestions);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Memuat essay yang perlu direview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Essay List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-900">Essay Pending</h3>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              {essays.length}
            </span>
          </div>

          {essays.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600">Semua essay sudah direview!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {essays.map((essay) => (
                <button
                  key={essay.id}
                  onClick={() => handleSelectEssay(essay)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedEssay?.id === essay.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{essay.studentName}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(essay.submittedAt)}
                      </p>
                      <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {essay.answer.split(/\s+/).length} kata
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Essay Review Form */}
      <div className="lg:col-span-2">
        {!selectedEssay ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Pilih essay dari daftar untuk mulai review</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            {/* Student Info */}
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedEssay.studentName}</h3>
                <p className="text-sm text-gray-500">Dikirim: {formatDate(selectedEssay.submittedAt)}</p>
              </div>
              <button
                onClick={() => setSelectedEssay(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Question */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Pertanyaan:</h4>
              <p className="text-gray-800 whitespace-pre-wrap">{selectedEssay.questionText}</p>
            </div>

            {/* Student Answer */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <h4 className="font-semibold text-gray-900 mb-2">Jawaban Siswa:</h4>
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{selectedEssay.answer}</p>
              <p className="text-xs text-gray-500 mt-3">
                {selectedEssay.answer.split(/\s+/).length} kata
              </p>
            </div>

            {/* Expected Answer & Rubric Guidelines */}
            {(() => {
              const questionGuidelines = getQuestionGuidelines(selectedEssay.questionId);
              return questionGuidelines?.expectedAnswer && (
                <>
                  {/* Expected Answer */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Jawaban yang Diinginkan (Panduan Guru)
                    </h4>
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                      {questionGuidelines.expectedAnswer}
                    </p>
                  </div>

                  {/* Rubric Guidelines */}
                  {questionGuidelines.rubricGuidelines && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Panduan Rubrik Penilaian
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-blue-800">🎯 Identifikasi:</span>
                          <p className="text-gray-700 mt-1">{questionGuidelines.rubricGuidelines.identifikasi}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">🔗 Integrasi:</span>
                          <p className="text-gray-700 mt-1">{questionGuidelines.rubricGuidelines.integrasi}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">📐 Akurasi:</span>
                          <p className="text-gray-700 mt-1">{questionGuidelines.rubricGuidelines.akurasi}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">⚖️ Evaluasi:</span>
                          <p className="text-gray-700 mt-1">{questionGuidelines.rubricGuidelines.evaluasi}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-800">💡 Kreativitas:</span>
                          <p className="text-gray-700 mt-1">{questionGuidelines.rubricGuidelines.kreativitas}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}

            {/* Rubrik Penilaian */}
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4">Rubrik Penilaian (Total: {calculateTotalScore()}/100)</h4>
              
              <div className="space-y-4">
                {/* Identifikasi & Pemodelan - 25% */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Identifikasi & Pemodelan (0-25)
                    </label>
                    <span className="text-lg font-bold text-purple-600">{identifikasi}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={identifikasi}
                    onChange={(e) => setIdentifikasi(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kemampuan mengidentifikasi materi dan membuat model matematika
                  </p>
                </div>

                {/* Integrasi Antar-Materi - 30% */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Integrasi Antar-Materi (0-30)
                    </label>
                    <span className="text-lg font-bold text-purple-600">{integrasi}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={integrasi}
                    onChange={(e) => setIntegrasi(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Menghubungkan hasil dari satu materi ke materi lainnya
                  </p>
                </div>

                {/* Akurasi Perhitungan - 15% */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Akurasi Perhitungan (0-15)
                    </label>
                    <span className="text-lg font-bold text-purple-600">{akurasi}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={akurasi}
                    onChange={(e) => setAkurasi(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ketepatan perhitungan matematis pada setiap langkah
                  </p>
                </div>

                {/* Evaluasi & Justifikasi - 20% */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Evaluasi & Justifikasi (0-20)
                    </label>
                    <span className="text-lg font-bold text-purple-600">{evaluasi}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={evaluasi}
                    onChange={(e) => setEvaluasi(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Alasan kuat dan prediksi dampak jangka panjang
                  </p>
                </div>

                {/* Kreativitas Solusi - 10% */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Kreativitas Solusi (0-10)
                    </label>
                    <span className="text-lg font-bold text-purple-600">{kreativitas}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={kreativitas}
                    onChange={(e) => setKreativitas(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Rekomendasi tambahan yang masuk akal
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback Type (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jenis Kesalahan (Opsional)
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value as any)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <option value="">-- Pilih jenis kesalahan --</option>
                {Object.entries(FEEDBACK_TYPES).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.name}
                  </option>
                ))}
              </select>
              {feedbackType && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 mb-1"><strong>{FEEDBACK_TYPES[feedbackType].description}</strong></p>
                  <p className="text-xs text-blue-700 italic">{FEEDBACK_TYPES[feedbackType].example}</p>
                </div>
              )}
            </div>

            {/* Probing Questions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                Pertanyaan Probing (Socratic Questions)
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Berikan pertanyaan yang memicu siswa untuk menemukan kesalahan mereka sendiri, bukan koreksi langsung.
              </p>
              <div className="space-y-3">
                {probingQuestions.map((question, index) => (
                  <textarea
                    key={index}
                    value={question}
                    onChange={(e) => updateProbingQuestion(index, e.target.value)}
                    placeholder={`Pertanyaan ${index + 1} (Opsional)`}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
                    rows={2}
                  />
                ))}
              </div>
            </div>

            {/* General Feedback */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Umpan Balik Umum (Wajib) *
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Berikan umpan balik menggunakan pendekatan Sandwich Feedback:&#10;1. Apresiasi logika (bagian yang benar)&#10;2. Identifikasi celah (di mana hubungan antar-materi terputus)&#10;3. Tantangan lanjutan (instruksi untuk memperbaiki)"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
                rows={6}
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-600">
                <strong>Skor Total:</strong> <span className="text-2xl font-bold text-purple-600 ml-2">{calculateTotalScore()}/100</span>
              </div>
              <button
                onClick={handleSubmitScore}
                disabled={isScoring || calculateTotalScore() === 0 || !feedback.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isScoring ? 'Menyimpan...' : 'Kirim Penilaian'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}