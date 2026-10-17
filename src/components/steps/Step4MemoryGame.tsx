import React, { useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireConfettiBurst } from '../../utils/fx';
import { Heart, Sparkles, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
}

export const Step4MemoryGame: React.FC<Props> = ({ config, onNext }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const memories = config.memories && config.memories.length >= 5 ? config.memories : config.memories.slice(0, 5);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);

  const isAllUnlocked = unlockedIds.length === memories.length;

  const handleCardClick = (id: string, index: number) => {
    sound.playSparkle();
    if (!unlockedIds.includes(id)) {
      const nextUnlocked = [...unlockedIds, id];
      setUnlockedIds(nextUnlocked);
      if (nextUnlocked.length === memories.length) {
        setTimeout(() => {
          sound.playUnlockChime();
          fireConfettiBurst();
        }, 300);
      }
    }
    setSelectedMemoryIndex(index);
  };

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10">
      <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-300 text-xs sm:text-sm font-semibold mb-3">
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
            <span>Interactive Memory Cards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Unlock Our 5 Memories
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Tap each hidden card below to reveal what made each moment unforgettable ❤️
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-pink-300">
            <span>Unlocked: {unlockedIds.length} / {memories.length}</span>
            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-amber-400 transition-all duration-300"
                style={{ width: `${(unlockedIds.length / memories.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5 Hidden Memory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {memories.map((mem, index) => {
            const isUnlocked = unlockedIds.includes(mem.id);
            const isSelected = selectedMemoryIndex === index;

            return (
              <button
                key={mem.id}
                onClick={() => handleCardClick(mem.id, index)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer group relative overflow-hidden ${
                  isUnlocked
                    ? isSelected
                      ? 'bg-rose-500/30 border-rose-400 shadow-md ring-2 ring-rose-400/50'
                      : 'bg-white/10 border-white/20 hover:bg-white/15'
                    : 'bg-black/40 border-white/10 hover:border-pink-500/50 hover:bg-black/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isUnlocked 
                      ? 'bg-rose-500 text-white shadow-sm' 
                      : 'bg-white/10 text-slate-400 group-hover:text-pink-300'
                  }`}>
                    {isUnlocked ? '📸' : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <span>{mem.title || `Memory ${index + 1}`}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {isUnlocked ? 'Tap to view memory' : 'Tap to unlock'}
                    </div>
                  </div>
                </div>

                {isUnlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Heart className="w-4 h-4 text-pink-400/50 group-hover:scale-125 transition-transform" />
                )}
              </button>
            );
          })}
        </div>

        {/* Currently viewed memory card details */}
        {selectedMemoryIndex !== null && memories[selectedMemoryIndex] && (
          <div className="bg-black/50 border border-white/15 rounded-2xl p-5 mb-6 animate-fadeIn transition-all">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span>📸 {memories[selectedMemoryIndex].title || `Memory ${selectedMemoryIndex + 1}`}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>

            {memories[selectedMemoryIndex].photoUrl && (
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-3 border border-white/10 bg-slate-900 shadow-inner">
                <img
                  src={memories[selectedMemoryIndex].photoUrl}
                  alt={memories[selectedMemoryIndex].caption}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            )}

            <p className="text-slate-100 text-sm sm:text-base italic font-serif leading-relaxed px-1">
              "{memories[selectedMemoryIndex].caption}"
            </p>
          </div>
        )}

        {/* Completion Announcement & Next Button */}
        {isAllUnlocked ? (
          <div className="text-center pt-2 animate-bounce">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-base sm:text-lg mb-4">
              <Sparkles className="w-5 h-5" />
              <span>You unlocked all the memories! 🎉</span>
              <Sparkles className="w-5 h-5" />
            </div>

            <button
              onClick={handleNext}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)',
                boxShadow: '0 0 30px rgba(244, 63, 94, 0.45)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Next Surprise</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
              </span>
            </button>
          </div>
        ) : (
          <p className="text-center text-xs text-slate-400">
            Unlock all 5 memories above to proceed to the next surprise 🔓
          </p>
        )}
      </div>
    </div>
  );
};
