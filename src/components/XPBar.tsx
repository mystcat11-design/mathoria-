import { Zap, Star } from 'lucide-react';

interface XPBarProps {
  xp: number;
  level: number;
}

export function XPBar({ xp = 0, level = 1 }: XPBarProps) {
  const xpPerLevel = 100;
  const currentLevelXP = xp % xpPerLevel;
  const progress = (currentLevelXP / xpPerLevel) * 100;
  const xpToNextLevel = xpPerLevel - currentLevelXP;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-amber-900">Level {level}</div>
            <div className="text-xs text-amber-700">Player Level</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-lg border border-amber-200">
          <Zap className="w-4 h-4 text-amber-600 fill-amber-200" />
          <span className="text-sm font-bold text-amber-900">{xp.toLocaleString()} XP</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="h-3 bg-white/70 rounded-full overflow-hidden border border-amber-200">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }}></div>
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className="text-amber-700 font-medium">{currentLevelXP} / {xpPerLevel} XP</span>
          <span className="text-amber-600">{xpToNextLevel} XP untuk Level {level + 1}</span>
        </div>
      </div>
    </div>
  );
}
