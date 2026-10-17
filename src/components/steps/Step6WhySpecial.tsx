import React, { useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireConfettiBurst } from '../../utils/fx';
import { Heart, Sparkles, ArrowRight, Check } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
}

export const Step6WhySpecial: React.FC<Props> = ({ config, onNext }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const reasons = config.reasons && config.reasons.length >= 5 ? config.reasons : [
    'You always know how to make people smile. ✨',
    'Your presence makes ordinary moments special. 💫',
    'You have the kindest heart and warm soul. ❤️',
    'You are always there when it matters most. 🌟',
    'Because you are uniquely, authentically YOU! 💖'
  ];

  const [revealedCount, setRevealedCount] = useState(1);

  const handleRevealNext = () => {
    sound.playSparkle();
    if (revealedCount < reasons.length) {
      setRevealedCount(prev => prev + 1);
      if (revealedCount + 1 === reasons.length) {
        setTimeout(() => {
          sound.playUnlockChime();
          fireConfettiBurst();
        }, 300);
      }
    }
  };

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10">
      <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 text-rose-300 text-xs sm:text-sm font-semibold mb-2">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>5 Truths About You</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Why You Are So Special ❤️
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Revealed {revealedCount} of {reasons.length} heartwarming reasons
          </p>
        </div>

        {/* Reasons Cards List */}
        <div className="space-y-4 mb-8">
          {reasons.slice(0, revealedCount).map((reason, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-black/40 border border-white/15 shadow-lg transform transition-all duration-500 animate-[fadeIn_0.5s_ease-out] relative overflow-hidden group hover:border-pink-400/40"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
                      Reason #{index + 1} ❤️
                    </span>
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  </div>
                  <p className="text-slate-100 text-sm sm:text-base font-medium leading-relaxed">
                    {reason}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        {revealedCount < reasons.length ? (
          <button
            onClick={handleRevealNext}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #e11d48 100%)',
              boxShadow: '0 0 25px rgba(244, 63, 94, 0.4)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Reveal Reason #{revealedCount + 1}</span>
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12 duration-200" />
            </span>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-amber-300 font-bold text-sm sm:text-base flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>All 5 reasons revealed! You are extraordinary.</span>
            </div>

            <button
              onClick={handleNext}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f43f5e 100%)',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.45)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Choose A Gift 🎁</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
