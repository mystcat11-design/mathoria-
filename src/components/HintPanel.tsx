import { useState } from 'react';
import { Lightbulb, Lock, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface HintPanelProps {
  hints: string[];
  currentXP: number;
  onUseHint: () => void;
  disabled?: boolean;
}

export function HintPanel({ hints, currentXP, onUseHint, disabled = false }: HintPanelProps) {
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const hintCost = 5;

  const handleRevealHint = () => {
    if (revealedHints < hints.length && currentXP >= hintCost && !disabled) {
      setRevealedHints(prev => prev + 1);
      onUseHint();
      setIsExpanded(true);
    }
  };

  const canRevealMore = revealedHints < hints.length && currentXP >= hintCost && !disabled;
  const allRevealed = revealedHints >= hints.length;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-amber-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-amber-900">Sistem Petunjuk</div>
            <div className="text-xs text-amber-600">{revealedHints} / {hints.length} petunjuk terungkap</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/70 px-2 py-1 rounded-md border border-amber-200">
            <Zap className="w-3 h-3 text-amber-600" />
            <span className="text-xs font-semibold text-amber-900">{hintCost} XP/hint</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-amber-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-amber-600" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Revealed Hints */}
          {hints.slice(0, revealedHints).map((hint, index) => (
            <div key={index} className="bg-white/80 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-amber-500 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">{hint}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Locked Hints Preview */}
          {!allRevealed && (
            <div className="bg-white/50 border border-amber-200 rounded-lg p-3 border-dashed">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700">
                    {hints.length - revealedHints} petunjuk tersisa
                  </span>
                </div>
                <button
                  onClick={handleRevealHint}
                  disabled={!canRevealMore}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    canRevealMore
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-md hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  Buka Petunjuk (-{hintCost} XP)
                </button>
              </div>
            </div>
          )}

          {/* Warning if not enough XP */}
          {currentXP < hintCost && !allRevealed && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <p className="text-xs text-red-700 text-center">
                ⚠️ XP tidak cukup untuk membuka petunjuk (minimal {hintCost} XP)
              </p>
            </div>
          )}

          {/* All hints revealed message */}
          {allRevealed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <p className="text-xs text-green-700 text-center font-medium">
                ✅ Semua petunjuk telah terungkap!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
