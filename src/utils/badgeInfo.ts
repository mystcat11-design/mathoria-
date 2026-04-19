export const BADGE_INFO: Record<string, { icon: string; color: string; description: string }> = {
  // Basic Achievements
  'Genius': { icon: '🧠', color: 'bg-purple-100 text-purple-700 border-purple-300', description: 'Skor ≥ 90' },
  'Excellent': { icon: '⭐', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Skor ≥ 80' },
  'Dedicated': { icon: '🎯', color: 'bg-blue-100 text-blue-700 border-blue-300', description: '5 tes selesai' },
  'Master': { icon: '👑', color: 'bg-amber-100 text-amber-700 border-amber-300', description: '10 tes selesai' },
  
  // Beginner
  'Math Beginner': { icon: '🌟', color: 'bg-lime-100 text-lime-700 border-lime-300', description: '3 soal pertama benar' },
  'Getting Started': { icon: '✨', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: 'Selesaikan satu set soal' },
  'Rising Star': { icon: '🌠', color: 'bg-gradient-to-r from-yellow-100 to-pink-100 text-yellow-700 border-yellow-400', description: 'Top 5 Leaderboard' },
  
  // Progress & Milestones
  'First Step': { icon: '🚀', color: 'bg-green-100 text-green-700 border-green-300', description: 'Menyelesaikan soal pertama' },
  'Level Explorer': { icon: '🗺️', color: 'bg-teal-100 text-teal-700 border-teal-300', description: 'Mencoba semua level soal' },
  'Perfect Solver': { icon: '💯', color: 'bg-pink-100 text-pink-700 border-pink-300', description: 'Selesaikan 1 level tanpa kesalahan' },
  'Challenge Conqueror': { icon: '🏅', color: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-400', description: 'Selesaikan level tersulit sempurna' },
  
  // Streak & Speed
  'Streak Master': { icon: '🔥', color: 'bg-red-100 text-red-700 border-red-300', description: '5 soal berturut benar (Level 3+)' },
  'Lightning Calculator': { icon: '⚡', color: 'bg-yellow-100 text-yellow-700 border-yellow-400', description: '5 soal berturut benar cepat (Level 3+)' },
  
  // Challenge
  'Challenge Seeker': { icon: '🎯', color: 'bg-indigo-100 text-indigo-700 border-indigo-300', description: 'Coba soal tingkat tinggi' },
  'Problem Crusher': { icon: '💪', color: 'bg-orange-100 text-orange-700 border-orange-300', description: 'Selesaikan beberapa soal sulit' },
  'Master Challenger': { icon: '🏆', color: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-400', description: 'Selesaikan semua soal tingkat tinggi' },
  
  // Special
  'Math Adventurer': { icon: '🧭', color: 'bg-teal-100 text-teal-700 border-teal-300', description: 'Variatif: 3 soal dari 4+ topik' },
  'Puzzle Breaker': { icon: '🧩', color: 'bg-red-100 text-red-700 border-red-300', description: '10 soal sulit (Level 5-6)' },
  'Number Champion': { icon: '🏆', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Skor sempurna: 100' },
  'Grand Mathematician': { icon: '👨‍🔬', color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-400', description: 'Selesaikan semua 6 level' },
  
  // Topic Badges
  'Exponent Explorer': { icon: '🔢', color: 'bg-green-100 text-green-700 border-green-300', description: '5 soal Eksponen benar' },
  'Exponent Strategist': { icon: '📐', color: 'bg-emerald-100 text-emerald-700 border-emerald-300', description: '10 soal Eksponen benar' },
  'Exponent Virtuoso': { icon: '💎', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: 'Semua soal Eksponen benar' },
  'System Solver': { icon: '🔧', color: 'bg-blue-100 text-blue-700 border-blue-300', description: '5 soal SPLDV/SPLTV benar' },
  'System Analyst': { icon: '🧮', color: 'bg-indigo-100 text-indigo-700 border-indigo-300', description: '10 soal SPLDV/SPLTV benar' },
  'System Architect': { icon: '🏗️', color: 'bg-purple-100 text-purple-700 border-purple-300', description: 'Semua soal SPLDV/SPLTV benar' },
  'Inequality Seeker': { icon: '⚖️', color: 'bg-teal-100 text-teal-700 border-teal-300', description: '5 soal SPtLDV benar' },
  'Inequality Specialist': { icon: '📊', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: '10 soal SPtLDV benar' },
  'Inequality Master': { icon: '🎓', color: 'bg-blue-100 text-blue-700 border-blue-300', description: 'Semua soal SPtLDV benar' },
  'Logarithm Specialist': { icon: '📈', color: 'bg-green-100 text-green-700 border-green-300', description: 'Semua soal Logaritma benar' },
};

// Helper function to get badge info
export function getBadgeInfo(badgeName: string) {
  return BADGE_INFO[badgeName] || { 
    icon: '🏅', 
    color: 'bg-gray-100 text-gray-700 border-gray-300', 
    description: 'Unknown Badge' 
  };
}

export const BADGE_ORDER = [
  // Easiest - Beginner badges
  'First Step',
  'Math Beginner',
  'Getting Started',
  
  // Topic basics
  'Exponent Explorer',
  'System Solver',
  'Inequality Seeker',
  
  // Progression
  'Dedicated',
  'Challenge Seeker',
  'Level Explorer',
  
  // Topic intermediate
  'Exponent Strategist',
  'System Analyst',
  'Inequality Specialist',
  'Logarithm Specialist',
  
  // Advanced
  'Excellent',
  'Master',
  'Problem Crusher',
  'Perfect Solver',
  'Streak Master',
  'Lightning Calculator',
  
  // Topic mastery
  'Exponent Virtuoso',
  'System Architect',
  'Inequality Master',
  
  // Expert
  'Genius',
  'Math Adventurer',
  'Puzzle Breaker',
  'Master Challenger',
  'Number Champion',
  'Challenge Conqueror',
  
  // Ultimate - Exclusive (requires all 6 levels)
  'Grand Mathematician',
  'Rising Star',
];