import { useEffect, useState } from 'react';
import { Award, X } from 'lucide-react';
import { motion } from 'motion/react';

const BADGE_INFO: Record<string, { icon: string; color: string; description: string }> = {
  // Basic Achievements
  'Genius': { icon: '🧠', color: 'bg-purple-100 text-purple-700 border-purple-300', description: 'Skor ≥ 90' },
  'Excellent': { icon: '⭐', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Skor ≥ 80' },
  'Dedicated': { icon: '🎯', color: 'bg-blue-100 text-blue-700 border-blue-300', description: '5 tes selesai' },
  'Master': { icon: '👑', color: 'bg-amber-100 text-amber-700 border-amber-300', description: '10 tes selesai' },
  
  // Special Achievements
  'Math Adventurer': { icon: '🗺️', color: 'bg-teal-100 text-teal-700 border-teal-300', description: 'Variatif: 3 soal dari 4+ topik' },
  'Puzzle Breaker': { icon: '🧩', color: 'bg-red-100 text-red-700 border-red-300', description: '10 soal sulit (Level 5-6)' },
  'Number Champion': { icon: '🏆', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Skor sempurna: 100' },
  'Grand Mathematician': { icon: '👨‍🔬', color: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-400', description: 'Selesaikan semua 6 level' },
  
  // Eksponen Badges
  'Exponent Explorer': { icon: '🔢', color: 'bg-green-100 text-green-700 border-green-300', description: '5 soal Eksponen benar' },
  'Exponent Strategist': { icon: '📐', color: 'bg-emerald-100 text-emerald-700 border-emerald-300', description: '10 soal Eksponen benar' },
  'Exponent Virtuoso': { icon: '💎', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: 'Semua soal Eksponen benar' },
  
  // System Badges (SPLDV + SPLTV)
  'System Solver': { icon: '🔧', color: 'bg-blue-100 text-blue-700 border-blue-300', description: '5 soal Persamaan benar' },
  'System Analyst': { icon: '🔬', color: 'bg-indigo-100 text-indigo-700 border-indigo-300', description: '10 soal Persamaan benar' },
  'System Architect': { icon: '🏗️', color: 'bg-violet-100 text-violet-700 border-violet-300', description: 'Semua soal Persamaan benar' },
  
  // Inequality Badges (SPtLDV)
  'Inequality Seeker': { icon: '🔍', color: 'bg-orange-100 text-orange-700 border-orange-300', description: '5 soal Pertidaksamaan benar' },
  'Inequality Specialist': { icon: '⚖️', color: 'bg-amber-100 text-amber-700 border-amber-300', description: '10 soal Pertidaksamaan benar' },
  'Inequality Master': { icon: '⚡', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Semua soal Pertidaksamaan benar' },
  
  // Logarithm Badge
  'Logarithm Specialist': { icon: '📊', color: 'bg-pink-100 text-pink-700 border-pink-300', description: 'Semua soal Logaritma benar' }
};

interface AchievementNotificationProps {
  badges: string[];
  onClose: () => void;
}

export function AchievementNotification({ badges, onClose }: AchievementNotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (badges.length > 0) {
      setVisible(true);
      // Auto close after 8 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [badges, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!visible || badges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 max-w-md"
    >
      <div className="bg-white rounded-xl shadow-2xl border-2 border-yellow-400 p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">🎉 Achievement Unlocked!</h3>
            <p className="text-sm text-gray-600">Selamat! Anda mendapat badge baru</p>
          </div>
        </div>

        <div className="space-y-2">
          {badges.map((badge) => {
            const info = BADGE_INFO[badge];
            if (!info) return null;

            return (
              <motion.div
                key={badge}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`flex items-center gap-3 p-3 border-2 rounded-lg ${info.color}`}
              >
                <span className="text-3xl">{info.icon}</span>
                <div>
                  <p className="font-bold">{badge}</p>
                  <p className="text-xs opacity-75">{info.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}