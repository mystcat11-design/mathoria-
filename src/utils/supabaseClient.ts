import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-773c0d79`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`,
};

// Helper function to handle fetch with better error messages
async function safeFetch(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error(`Network error fetching ${url}:`, error);
    throw new Error(`Failed to connect to server. Please check your internet connection.`);
  }
}

// ==================== STUDENT API ====================

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

export async function getAllStudents(): Promise<Student[]> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/students`, {
      method: 'GET',
      headers,
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('Error fetching students from server:', result.error);
      return [];
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Network error while fetching students:', error);
    return [];
  }
}

export async function getStudent(id: string): Promise<Student | null> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/students/${id}`, {
      method: 'GET',
      headers,
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error(`Error fetching student ${id}:`, result.error);
      return null;
    }
    
    return result.data;
  } catch (error) {
    console.error(`Network error while fetching student ${id}:`, error);
    return null;
  }
}

export async function saveStudent(student: Student): Promise<Student | null> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers,
      body: JSON.stringify(student),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('Error saving student to server:', result.error);
      return null;
    }
    
    console.log(`✅ Student ${student.name} synced to cloud`);
    return result.data;
  } catch (error) {
    console.error('Network error while saving student:', error);
    return null;
  }
}

export async function updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error(`Error updating student ${id}:`, result.error);
      return null;
    }
    
    console.log(`✅ Student ${id} updated in cloud`);
    return result.data;
  } catch (error) {
    console.error(`Network error while updating student ${id}:`, error);
    return null;
  }
}

// ==================== QUESTIONS API ====================

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  pisaLevel: number;
  difficulty: number;
  discrimination: number;
}

export async function getQuestions(): Promise<Question[]> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/questions`, {
      method: 'GET',
      headers,
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('Error fetching questions from server:', result.error);
      return [];
    }
    
    console.log(`✅ Loaded ${result.data.length} questions from cloud`);
    return result.data || [];
  } catch (error) {
    console.error('Network error while fetching questions:', error);
    return [];
  }
}

export async function saveQuestions(questions: Question[]): Promise<boolean> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(questions),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('Error saving questions to server:', result.error);
      return false;
    }
    
    console.log(`✅ ${questions.length} questions synced to cloud`);
    return true;
  } catch (error) {
    console.error('Network error while saving questions:', error);
    return false;
  }
}

// ==================== SYNC HELPERS ====================

// Essay submission interface
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

// Save essay submission
export async function saveEssaySubmission(submission: EssaySubmission): Promise<boolean> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/essays`, {
      method: 'POST',
      headers,
      body: JSON.stringify(submission),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('Error saving essay submission:', result.error);
      return false;
    }
    
    console.log(`✅ Essay submission saved: ${submission.id}`);
    return true;
  } catch (error) {
    console.error('Network error while saving essay:', error);
    return false;
  }
}

// Get all pending essays (for teacher)
export async function getPendingEssays(): Promise<EssaySubmission[]> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/essays/pending`, {
      method: 'GET',
      headers,
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('Error fetching pending essays:', result.error);
      return [];
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Network error while fetching pending essays:', error);
    return [];
  }
}

// Get essays by student ID
export async function getStudentEssays(studentId: string): Promise<EssaySubmission[]> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/essays/student/${studentId}`, {
      method: 'GET',
      headers,
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error(`Error fetching essays for student ${studentId}:`, result.error);
      return [];
    }
    
    return result.data || [];
  } catch (error) {
    console.error(`Network error while fetching student ${studentId} essays:`, error);
    return [];
  }
}

// Update essay with score and feedback
export async function scoreEssay(
  essayId: string, 
  score: number, 
  rubricScores: EssaySubmission['rubricScores'],
  feedback: string,
  feedbackType?: EssaySubmission['feedbackType'],
  probingQuestions?: string[]
): Promise<boolean> {
  try {
    const response = await safeFetch(`${API_BASE_URL}/essays/${essayId}/score`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        score,
        rubricScores,
        feedback,
        feedbackType,
        probingQuestions,
        status: 'reviewed'
      }),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error(`Error scoring essay ${essayId}:`, result.error);
      return false;
    }
    
    console.log(`✅ Essay ${essayId} scored successfully`);
    return true;
  } catch (error) {
    console.error(`Network error while scoring essay ${essayId}:`, error);
    return false;
  }
}

// Sync localStorage to Supabase (untuk migrasi data existing)
export async function syncLocalToCloud() {
  try {
    console.log('🔄 Starting sync from localStorage to cloud...');
    
    // Sync students
    const savedStudents = localStorage.getItem('mathIRT_students');
    if (savedStudents) {
      const students: Student[] = JSON.parse(savedStudents);
      for (const student of students) {
        await saveStudent(student);
      }
      console.log(`✅ Synced ${students.length} students to cloud`);
    }
    
    // Sync questions
    const savedQuestions = localStorage.getItem('mathIRT_questions');
    if (savedQuestions) {
      const questions: Question[] = JSON.parse(savedQuestions);
      await saveQuestions(questions);
    }
    
    console.log('✅ Sync complete!');
    return true;
  } catch (error) {
    console.error('Error during sync:', error);
    return false;
  }
}

// Load from cloud and update localStorage (auto-sync)
export async function syncCloudToLocal() {
  try {
    console.log('🔄 Syncing from cloud to local...');
    
    // Sync students with error handling
    let students: Student[] = [];
    try {
      students = await getAllStudents();
      if (students.length > 0) {
        localStorage.setItem('mathIRT_students', JSON.stringify(students));
        console.log(`✅ Synced ${students.length} students from cloud`);
      }
    } catch (error) {
      console.warn('⚠️ Could not sync students from cloud, using local data:', error);
    }
    
    // Sync questions with error handling
    let questions: Question[] = [];
    try {
      questions = await getQuestions();
      if (questions.length > 0) {
        localStorage.setItem('mathIRT_questions', JSON.stringify(questions));
        console.log(`✅ Synced ${questions.length} questions from cloud`);
      }
    } catch (error) {
      console.warn('⚠️ Could not sync questions from cloud, using local data:', error);
    }
    
    return { students, questions };
  } catch (error) {
    console.error('Error during cloud to local sync:', error);
    // Return empty arrays instead of throwing
    return { students: [], questions: [] };
  }
}