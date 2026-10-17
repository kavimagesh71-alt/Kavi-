import React, { useState, useEffect } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireConfettiBurst, fireCelebrationFireworks } from '../../utils/fx';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
}

export const Step11FinalSurprise: React.FC<Props> = ({ config, onNext }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const [countdown, setCountdown] = useState<number | null>(3);
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      sound.playSparkle();
      const timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 900);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isExploded) {
      setIsExploded(true);
      sound.playConfettiPop();
      sound.playHappyBirthdaySequence(true);
      fireConfettiBurst();
      fireCelebrationFireworks();
    }
  }, [countdown, isExploded]);

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  const defaultWishes = [
    '✨ Endless Happiness & Laughter',
    '✨ Massive Success & Prosperity',
    '✨ Unconditional Love & Warmth',
    '✨ Peaceful Mind & Radiant Health',
    '✨ A Lifetime of Beautiful Memories',
  ];

  const wishes = config.finalWishes && config.finalWishes.length > 0 ? config.finalWishes : defaultWishes;

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10 text-center">
      {/* Dramatic Countdown Screen */}
      {!isExploded ? (
        <div className="flex flex-col items-center justify-center space-y-6">
          <p className="text-xl sm:text-2xl text-slate-300 font-light tracking-widest uppercase animate-pulse">
            Hold your breath...
          </p>
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-1 flex items-center justify-center shadow-[0_0_60px_rgba(244,63,94,0.7)] animate-bounce">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-6xl sm:text-7xl font-black text-white">
              {countdown}
            </div>
          </div>
          <p className="text-xs text-slate-400 font-mono">Grand Birthday Finale loading...</p>
        </div>
      ) : (
        /* Exploded Grand Celebration Container */
        <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl animate-[fadeIn_0.8s_ease-out] ${theme.cardBg} ${theme.glow}`}>
          {/* Confetti blast header */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-400/50 bg-amber-500/20 text-amber-300 text-sm font-bold tracking-widest uppercase mb-4 animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>🎉 GRAND FINALE CELEBRATION 🎉</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight mt-2 mb-2 leading-tight">
            🎂 HAPPY BIRTHDAY <br />
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              {config.birthdayPersonName}
            </span> 🎂
          </h1>

          <div className="text-2xl my-2 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-bounce" />
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          </div>

          <div className="my-6 p-5 rounded-2xl bg-black/40 border border-white/10 text-left">
            <p className="text-xs uppercase tracking-wider text-pink-300 font-bold mb-3 text-center">
              May your life be abundantly filled with:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-slate-100 font-medium">
              {wishes.map((w, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <span className="text-amber-400">★</span>
                  <span>{w.replace(/^[✨★]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Final Customized Message */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/40 to-purple-950/40 border border-rose-500/30 text-rose-100 font-serif italic text-base sm:text-lg mb-8 leading-relaxed whitespace-pre-line">
            "{config.finalMessage}"
          </div>

          {/* Button to Final Photo */}
          <button
            onClick={handleNext}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f59e0b 100%)',
              boxShadow: '0 0 35px rgba(236, 72, 153, 0.45)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>One Last Keepsake...</span>
              <span className="text-xl">📸</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
