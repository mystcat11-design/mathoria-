import { useState } from 'react';
import { Question } from '../utils/irtEngine';
import { Edit, Trash2, Plus, X, FileQuestion, Filter, Download, Upload, FileText } from 'lucide-react';

interface QuestionBankEditorProps {
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
}

export function QuestionBankEditor({ questions, onUpdateQuestions }: QuestionBankEditorProps) {
  const [filterLevel, setFilterLevel] = useState<number | 'all'>('all');
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Get unique topics from existing questions
  const uniqueTopics = Array.from(new Set(questions.map(q => q.topic)));
  
  const pisaLevels = [
    { level: 1, name: 'Mengingat & menghitung langsung' },
    { level: 2, name: 'Prosedural & representasi sederhana' },
    { level: 3, name: 'Interpretasi & koneksi data' },
    { level: 4, name: 'Pemodelan matematis' },
    { level: 5, name: 'Evaluasi & penalaran' },
    { level: 6, name: 'Penalaran abstrak & generalisasi' }
  ];

  const [newQuestion, setNewQuestion] = useState<Question>({
    id: `q_${Date.now()}`,
    question: '',
    options: [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' }
    ],
    correctAnswer: 'A',
    difficulty: 0,
    discrimination: 1.0,
    topic: 'Eksponen',
    pisaLevel: 1,
    pisaLevelName: 'Mengingat & menghitung langsung',
    explanation: '',
    hints: ['', ''],
    // Level 6 essay fields
    text: '',
    expectedAnswer: '',
    rubricGuidelines: {
      identifikasi: '',
      integrasi: '',
      akurasi: '',
      evaluasi: '',
      kreativitas: ''
    }
  });

  const filteredQuestions = questions.filter(q => {
    const levelMatch = filterLevel === 'all' || q.pisaLevel === filterLevel;
    const topicMatch = filterTopic === 'all' || q.topic === filterTopic;
    return levelMatch && topicMatch;
  });

  const handleAddQuestion = () => {
    // Different validation for Level 6 essay vs Level 1-5 multiple choice
    if (newQuestion.pisaLevel === 6) {
      // Level 6 validation
      if (!newQuestion.text?.trim()) {
        alert('Teks essay soal Level 6 wajib diisi!');
        return;
      }
      if (!newQuestion.expectedAnswer?.trim()) {
        alert('Jawaban yang diinginkan untuk Level 6 wajib diisi!');
        return;
      }
    } else {
      // Level 1-5 validation
      if (!newQuestion.question.trim()) {
        alert('Pertanyaan wajib diisi!');
        return;
      }
      const allOptions = newQuestion.options.every(opt => opt.text.trim() !== '');
      if (!allOptions) {
        alert('Semua opsi jawaban wajib diisi!');
        return;
      }
    }

    const questionWithId: Question = {
      ...newQuestion,
      id: `q_${Date.now()}`,
      pisaLevelName: pisaLevels.find(l => l.level === newQuestion.pisaLevel)?.name || '',
      // For Level 6, ensure options is empty array
      options: newQuestion.pisaLevel === 6 ? [] : newQuestion.options,
      correctAnswer: newQuestion.pisaLevel === 6 ? '' : newQuestion.correctAnswer
    };

    onUpdateQuestions([...questions, questionWithId]);
    
    // Reset form
    setNewQuestion({
      id: `q_${Date.now()}`,
      question: '',
      options: [
        { id: 'A', text: '' },
        { id: 'B', text: '' },
        { id: 'C', text: '' },
        { id: 'D', text: '' }
      ],
      correctAnswer: 'A',
      difficulty: 0,
      discrimination: 1.0,
      topic: 'Eksponen',
      pisaLevel: 1,
      pisaLevelName: 'Mengingat & menghitung langsung',
      explanation: '',
      hints: ['', ''],
      text: '',
      expectedAnswer: '',
      rubricGuidelines: {
        identifikasi: '',
        integrasi: '',
        akurasi: '',
        evaluasi: '',
        kreativitas: ''
      }
    });
    setShowAddModal(false);
  };

  const handleEditQuestion = () => {
    if (!editingQuestion) return;

    // Different validation for Level 6 vs Level 1-5
    if (editingQuestion.pisaLevel === 6) {
      if (!editingQuestion.text?.trim()) {
        alert('Teks essay soal Level 6 wajib diisi!');
        return;
      }
      if (!editingQuestion.expectedAnswer?.trim()) {
        alert('Jawaban yang diinginkan untuk Level 6 wajib diisi!');
        return;
      }
    } else {
      if (!editingQuestion.question.trim()) {
        alert('Pertanyaan wajib diisi!');
        return;
      }
    }

    const updatedQuestions = questions.map(q => 
      q.id === editingQuestion.id ? {
        ...editingQuestion,
        pisaLevelName: pisaLevels.find(l => l.level === editingQuestion.pisaLevel)?.name || '',
        // For Level 6, ensure options is empty array
        options: editingQuestion.pisaLevel === 6 ? [] : editingQuestion.options,
        correctAnswer: editingQuestion.pisaLevel === 6 ? '' : editingQuestion.correctAnswer
      } : q
    );

    onUpdateQuestions(updatedQuestions);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Yakin ingin menghapus soal ini?')) {
      onUpdateQuestions(questions.filter(q => q.id !== id));
    }
  };

  // Export questions to JSON file
  const handleExport = () => {
    if (questions.length === 0) {
      alert('Tidak ada soal untuk di-export!');
      return;
    }

    const dataStr = JSON.stringify(questions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    
    const date = new Date().toISOString().split('T')[0];
    link.download = `mathoria-bank-soal-${date}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import questions from JSON file
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Validate if it's an array
        if (!Array.isArray(importedData)) {
          alert('Format file tidak valid! File harus berisi array soal.');
          return;
        }

        // Basic validation for question structure
        const isValid = importedData.every(q => 
          q.id && q.topic && q.pisaLevel
        );

        if (!isValid) {
          alert('Format soal tidak valid! Pastikan semua field yang diperlukan ada.');
          return;
        }

        // Ask for confirmation
        const confirmImport = confirm(
          `Akan mengimport ${importedData.length} soal. Ini akan MENGGANTI semua soal yang ada. Lanjutkan?`
        );

        if (confirmImport) {
          onUpdateQuestions(importedData);
          alert(`Berhasil mengimport ${importedData.length} soal!`);
        }
      } catch (error) {
        alert('Gagal membaca file! Pastikan file adalah JSON yang valid.');
      }
    };

    reader.readAsText(file);
    // Reset input value so the same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-gray-900">Bank Soal ({filteredQuestions.length} soal)</h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title="Export bank soal sebagai file JSON"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            {/* Import Button */}
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            {/* Add Question Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Soal
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Semua Level</option>
              {[1, 2, 3, 4, 5, 6].map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>

          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Semua Topik</option>
            {uniqueTopics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileQuestion className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Tidak ada soal yang sesuai dengan filter</p>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div key={q.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                      Level {q.pisaLevel}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {q.topic}
                    </span>
                    <span className="text-xs text-gray-500">
                      θ = {q.difficulty.toFixed(1)}
                    </span>
                    {q.pisaLevel === 6 && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        ESSAY
                      </span>
                    )}
                  </div>
                  
                  {/* For Level 6: Show essay text */}
                  {q.pisaLevel === 6 ? (
                    <>
                      <p className="text-gray-900 font-medium mb-2 whitespace-pre-wrap text-sm leading-relaxed max-h-32 overflow-y-auto">
                        {q.text || q.question}
                      </p>
                      {q.expectedAnswer && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-xs font-semibold text-green-900 mb-1">✅ Jawaban yang Diinginkan (Preview):</p>
                          <p className="text-xs text-gray-700 whitespace-pre-wrap line-clamp-3">
                            {q.expectedAnswer}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    /* For Level 1-5: Show multiple choice */
                    <>
                      <p className="text-gray-900 font-medium mb-2">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {q.options.map(opt => (
                          <div 
                            key={opt.id}
                            className={`px-2 py-1 rounded ${
                              opt.id === q.correctAnswer 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            <span className="font-semibold">{opt.id}.</span> {opt.text}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingQuestion(q)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto my-8">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                Tambah Soal Baru
                {newQuestion.pisaLevel === 6 && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Mode ESSAY
                  </span>
                )}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level PISA *</label>
                  <select
                    value={newQuestion.pisaLevel}
                    onChange={(e) => setNewQuestion({ ...newQuestion, pisaLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {pisaLevels.map(level => (
                      <option key={level.level} value={level.level}>
                        Level {level.level} - {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topik *</label>
                  <input
                    type="text"
                    value={newQuestion.topic}
                    onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Masukkan topik (misal: Multi-Materi)"
                  />
                </div>
              </div>

              {/* LEVEL 6 ESSAY MODE */}
              {newQuestion.pisaLevel === 6 ? (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-900 font-semibold mb-2">📝 Mode Soal Essay (Level 6)</p>
                    <p className="text-xs text-orange-700">Soal essay tidak memerlukan opsi pilihan ganda. Lengkapi teks soal, jawaban yang diinginkan, dan panduan rubrik untuk guru.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teks Essay Soal *</label>
                    <textarea
                      value={newQuestion.text}
                      onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={8}
                      placeholder="Masukkan soal essay yang lengkap dengan konteks, data, dan pertanyaan analisis..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban yang Diinginkan (Panduan Guru) *</label>
                    <textarea
                      value={newQuestion.expectedAnswer}
                      onChange={(e) => setNewQuestion({ ...newQuestion, expectedAnswer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={10}
                      placeholder={`Contoh jawaban lengkap yang diharapkan, termasuk:
- Perhitungan eksponen/logaritma
- Penyelesaian SPLTV/SPtLDV
- Evaluasi & perbandingan
- Kreativitas solusi`}
                    />
                  </div>

                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h4 className="font-semibold text-blue-900 mb-3">Panduan Rubrik Penilaian (Opsional)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">🎯 Identifikasi & Pemodelan (25%)</label>
                        <textarea
                          value={newQuestion.rubricGuidelines?.identifikasi}
                          onChange={(e) => setNewQuestion({ 
                            ...newQuestion, 
                            rubricGuidelines: { ...newQuestion.rubricGuidelines!, identifikasi: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                          placeholder="Panduan: Apa yang harus siswa identifikasi?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">🔗 Integrasi Antar-Materi (30%)</label>
                        <textarea
                          value={newQuestion.rubricGuidelines?.integrasi}
                          onChange={(e) => setNewQuestion({ 
                            ...newQuestion, 
                            rubricGuidelines: { ...newQuestion.rubricGuidelines!, integrasi: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                          placeholder="Panduan: Bagaimana menghubungkan antar-materi?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">📐 Akurasi Perhitungan (15%)</label>
                        <textarea
                          value={newQuestion.rubricGuidelines?.akurasi}
                          onChange={(e) => setNewQuestion({ 
                            ...newQuestion, 
                            rubricGuidelines: { ...newQuestion.rubricGuidelines!, akurasi: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                          placeholder="Panduan: Standard perhitungan yang benar"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">⚖️ Evaluasi & Justifikasi (20%)</label>
                        <textarea
                          value={newQuestion.rubricGuidelines?.evaluasi}
                          onChange={(e) => setNewQuestion({ 
                            ...newQuestion, 
                            rubricGuidelines: { ...newQuestion.rubricGuidelines!, evaluasi: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                          placeholder="Panduan: Ekspektasi justifikasi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">💡 Kreativitas Solusi (10%)</label>
                        <textarea
                          value={newQuestion.rubricGuidelines?.kreativitas}
                          onChange={(e) => setNewQuestion({ 
                            ...newQuestion, 
                            rubricGuidelines: { ...newQuestion.rubricGuidelines!, kreativitas: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                          placeholder="Panduan: Contoh solusi inovatif"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* LEVEL 1-5 MULTIPLE CHOICE MODE */
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan *</label>
                    <textarea
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                      placeholder="Masukkan pertanyaan..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {newQuestion.options.map((option, idx) => (
                      <div key={option.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Opsi {option.id} *
                        </label>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => {
                            const updatedOptions = [...newQuestion.options];
                            updatedOptions[idx] = { ...option, text: e.target.value };
                            setNewQuestion({ ...newQuestion, options: updatedOptions });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder={`Opsi ${option.id}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban Benar *</label>
                    <select
                      value={newQuestion.correctAnswer}
                      onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {newQuestion.options.map(option => (
                        <option key={option.id} value={option.id}>{option.id}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Penjelasan *</label>
                    <textarea
                      value={newQuestion.explanation}
                      onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                      placeholder="Penjelasan jawaban..."
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty (θ)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discrimination</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newQuestion.discrimination}
                    onChange={(e) => setNewQuestion({ ...newQuestion, discrimination: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Tambah Soal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure with conditional rendering */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto my-8">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                Edit Soal
                {editingQuestion.pisaLevel === 6 && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Mode ESSAY
                  </span>
                )}
              </h3>
              <button onClick={() => setEditingQuestion(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level PISA *</label>
                  <select
                    value={editingQuestion.pisaLevel}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, pisaLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {pisaLevels.map(level => (
                      <option key={level.level} value={level.level}>
                        Level {level.level} - {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topik *</label>
                  <input
                    type="text"
                    value={editingQuestion.topic}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, topic: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* LEVEL 6 ESSAY MODE */}
              {editingQuestion.pisaLevel === 6 ? (
                <>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-900 font-semibold mb-2">📝 Mode Soal Essay (Level 6)</p>
                    <p className="text-xs text-orange-700">Soal essay tidak memerlukan opsi pilihan ganda.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teks Essay Soal *</label>
                    <textarea
                      value={editingQuestion.text || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban yang Diinginkan *</label>
                    <textarea
                      value={editingQuestion.expectedAnswer || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, expectedAnswer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={10}
                    />
                  </div>

                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h4 className="font-semibold text-blue-900 mb-3">Panduan Rubrik Penilaian</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">🎯 Identifikasi</label>
                        <textarea
                          value={editingQuestion.rubricGuidelines?.identifikasi || ''}
                          onChange={(e) => setEditingQuestion({ 
                            ...editingQuestion, 
                            rubricGuidelines: { 
                              ...editingQuestion.rubricGuidelines!,
                              identifikasi: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">🔗 Integrasi</label>
                        <textarea
                          value={editingQuestion.rubricGuidelines?.integrasi || ''}
                          onChange={(e) => setEditingQuestion({ 
                            ...editingQuestion, 
                            rubricGuidelines: { 
                              ...editingQuestion.rubricGuidelines!,
                              integrasi: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">📐 Akurasi</label>
                        <textarea
                          value={editingQuestion.rubricGuidelines?.akurasi || ''}
                          onChange={(e) => setEditingQuestion({ 
                            ...editingQuestion, 
                            rubricGuidelines: { 
                              ...editingQuestion.rubricGuidelines!,
                              akurasi: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">⚖️ Evaluasi</label>
                        <textarea
                          value={editingQuestion.rubricGuidelines?.evaluasi || ''}
                          onChange={(e) => setEditingQuestion({ 
                            ...editingQuestion, 
                            rubricGuidelines: { 
                              ...editingQuestion.rubricGuidelines!,
                              evaluasi: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">💡 Kreativitas</label>
                        <textarea
                          value={editingQuestion.rubricGuidelines?.kreativitas || ''}
                          onChange={(e) => setEditingQuestion({ 
                            ...editingQuestion, 
                            rubricGuidelines: { 
                              ...editingQuestion.rubricGuidelines!,
                              kreativitas: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* LEVEL 1-5 MULTIPLE CHOICE MODE */
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan *</label>
                    <textarea
                      value={editingQuestion.question}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {editingQuestion.options.map((option, idx) => (
                      <div key={option.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Opsi {option.id} *
                        </label>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => {
                            const updatedOptions = [...editingQuestion.options];
                            updatedOptions[idx] = { ...option, text: e.target.value };
                            setEditingQuestion({ ...editingQuestion, options: updatedOptions });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban Benar *</label>
                    <select
                      value={editingQuestion.correctAnswer}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, correctAnswer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {editingQuestion.options.map(option => (
                        <option key={option.id} value={option.id}>{option.id}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Penjelasan *</label>
                    <textarea
                      value={editingQuestion.explanation}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty (θ)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingQuestion.difficulty}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, difficulty: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discrimination</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingQuestion.discrimination}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, discrimination: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleEditQuestion}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
