import { Student, QuizResult } from '../App';

export interface BadgeCheckResult {
  earnedBadges: string[];
  updatedStats: {
    correctByTopic: Record<string, number>;
    topicCounts: Record<string, number>;
    hardQuestionCorrect: number;
    totalQuestionsAnswered: number;
    totalCorrectAnswers: number;
    currentStreak: number;
    bestStreak: number;
    triedLevels: number[];
    perfectLevels: number[];
    highLevelAttempts: number;
  };
}

export function checkBadges(
  student: Student,
  result: QuizResult,
  newCompletedLevels: number[]
): BadgeCheckResult {
  const earnedBadges: string[] = [];
  
  // Initialize tracking data
  const correctByTopic = student.correctAnswersByTopic || {
    Eksponen: 0, Logaritma: 0, SPLDV: 0, SPLTV: 0, SPtLDV: 0
  };
  
  const topicCounts = student.topicAnswerCounts || {
    Eksponen: 0, Logaritma: 0, SPLDV: 0, SPLTV: 0, SPtLDV: 0
  };
  
  let hardQuestionCorrect = student.hardQuestionCorrect || 0;
  let totalQuestionsAnswered = (student.totalQuestionsAnswered || 0) + result.totalQuestions;
  let totalCorrectAnswers = (student.totalCorrectAnswers || 0) + result.correctAnswers;
  let currentStreak = student.currentStreak || 0;
  let bestStreak = student.bestStreak || 0;
  const triedLevels = student.triedLevels || [];
  const perfectLevels = student.perfectLevels || [];
  let highLevelAttempts = student.highLevelAttempts || 0;
  
  // Track tried levels
  if (!triedLevels.includes(result.level)) {
    triedLevels.push(result.level);
  }
  
  // Track perfect levels
  if (result.correctAnswers === result.totalQuestions && !perfectLevels.includes(result.level)) {
    perfectLevels.push(result.level);
  }
  
  // Track high level attempts
  if (result.level >= 5) highLevelAttempts++;
  
  // Calculate streak
  let consecutiveCorrect = 0;
  let maxConsecutiveInQuiz = 0;
  
  if (result.answerDetails) {
    result.answerDetails.forEach(answer => {
      const topic = answer.topic as keyof typeof correctByTopic;
      topicCounts[topic]++;
      
      if (answer.isCorrect) {
        correctByTopic[topic]++;
        if (answer.pisaLevel >= 5) hardQuestionCorrect++;
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
  
  // Check badges (compact conditions)
  const checks: [boolean, string][] = [
    // Basic achievements
    [newCompletedLevels.length === 6 && result.score >= 90, 'Genius'],
    [newCompletedLevels.length === 6 && result.score >= 80, 'Excellent'],
    [student.testsCompleted + 1 >= 5, 'Dedicated'],
    [student.testsCompleted + 1 >= 10, 'Master'],
    
    // Special achievements
    [Object.values(correctByTopic).filter(c => c >= 3).length >= 4, 'Math Adventurer'],
    [hardQuestionCorrect >= 10, 'Puzzle Breaker'],
    [newCompletedLevels.length === 6 && result.score === 100, 'Number Champion'],
    [newCompletedLevels.length === 6, 'Grand Mathematician'],
    
    // Topic badges
    [correctByTopic.Eksponen >= 5, 'Exponent Explorer'],
    [correctByTopic.Eksponen >= 10, 'Exponent Strategist'],
    [correctByTopic.Eksponen >= 6, 'Exponent Virtuoso'],
    [correctByTopic.SPLDV + correctByTopic.SPLTV >= 5, 'System Solver'],
    [correctByTopic.SPLDV + correctByTopic.SPLTV >= 10, 'System Analyst'],
    [correctByTopic.SPLDV + correctByTopic.SPLTV >= 11, 'System Architect'],
    [correctByTopic.SPtLDV >= 5, 'Inequality Seeker'],
    [correctByTopic.SPtLDV >= 5, 'Inequality Specialist'],
    [correctByTopic.SPtLDV >= 5, 'Inequality Master'],
    [correctByTopic.Logaritma >= 6, 'Logarithm Specialist'],
    
    // Progress badges
    [totalQuestionsAnswered >= 1, 'First Step'],
    [totalCorrectAnswers >= 3, 'Math Beginner'],
    [student.testsCompleted + 1 >= 1, 'Getting Started'],
    [bestStreak >= 5 && result.level >= 3, 'Streak Master'],
    [bestStreak >= 5 && result.score >= 80 && result.level >= 3, 'Lightning Calculator'],
    [perfectLevels.some(l => l >= 3), 'Perfect Solver'],
    [triedLevels.length === 6, 'Level Explorer'],
    [highLevelAttempts >= 1, 'Challenge Seeker'],
    [hardQuestionCorrect >= 5, 'Problem Crusher'],
    [hardQuestionCorrect >= 15, 'Master Challenger'],
    [perfectLevels.includes(6), 'Challenge Conqueror'],
  ];
  
  checks.forEach(([condition, badge]) => {
    if (condition && !student.badges.includes(badge)) {
      earnedBadges.push(badge);
    }
  });
  
  return {
    earnedBadges,
    updatedStats: {
      correctByTopic,
      topicCounts,
      hardQuestionCorrect,
      totalQuestionsAnswered,
      totalCorrectAnswers,
      currentStreak,
      bestStreak,
      triedLevels,
      perfectLevels,
      highLevelAttempts
    }
  };
}
