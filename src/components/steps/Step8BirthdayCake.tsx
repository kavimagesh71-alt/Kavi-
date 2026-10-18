import React, { useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireConfettiBurst, fireCelebrationFireworks } from '../../utils/fx';
import { Sparkles, ArrowRight } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
  onOpenCustomizer?: () => void;
}

export const Step8BirthdayCake: React.FC<Props> = ({ config, onNext, onOpenCustomizer }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const flavor = config.cakeFlavor || 'strawberry';
  const wishGrantedText = config.cakeWishGrantedText || 'May your heart’s deepest wish come true this year! ❤️';

  const handleBlowCandles = () => {
    if (candlesBlown) return;

    // Trigger sound & haptic feel
    sound.playCandleBlow();
    setIsShaking(true);

    setTimeout(() => {
      setCandlesBlown(true);
      setIsShaking(false);
      fireConfettiBurst();
      fireCelebrationFireworks();
      sound.playHappyBirthdaySequence(true);
    }, 500);
  };

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10 text-center ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
      <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Step 4 of 5 • Birthday Cake Ritual</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            {candlesBlown ? '🎉 WISH GRANTED! 🎉' : 'Make a Wish! ✨'}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 mt-2 font-light">
            {candlesBlown 
              ? wishGrantedText 
              : (config.cakeWishPrompt || 'Close your eyes...\nMake your wish...')}
          </p>
        </div>

        {/* 🎂 Animated Cake Illustration */}
        <div className="relative w-56 h-52 sm:w-64 sm:h-60 mx-auto my-4 sm:my-6 flex flex-col items-center justify-end select-none">
          {/* Candles row - directly tappable on mobile touchscreens */}
          <div className="flex items-end justify-center gap-5 sm:gap-6 mb-1 z-20">
            {[0, 1, 2].map((idx) => (
              <div 
                key={idx} 
                onClick={handleBlowCandles}
                title="Tap to blow out candle"
                className="flex flex-col items-center relative cursor-pointer active:scale-95 touch-manipulation group"
              >
                {/* Candle Flame / Smoke */}
                {!candlesBlown ? (
                  <div className="relative w-4 h-6 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    {/* Flame outer glow */}
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-pulse shadow-[0_0_15px_#f59e0b]" />
                    {/* Inner core */}
                    <div className="absolute w-2 h-3 rounded-full bg-blue-300/60 bottom-0.5" />
                  </div>
                ) : (
                  /* Smoke puff when blown */
                  <div className="w-4 h-6 flex items-center justify-center mb-1 animate-[fadeOut_1.5s_ease-out]">
                    <span className="text-xs text-slate-400 opacity-60">💨</span>
                  </div>
                )}

                {/* Candle Stick */}
                <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-b from-pink-300 via-rose-400 to-pink-500 border border-white/20 shadow-sm relative overflow-hidden">
                  <div className="w-full h-1 bg-white/40 my-1.5" />
                  <div className="w-full h-1 bg-white/40 my-1.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Tier 1 (Top) */}
          <div className={`w-36 h-14 rounded-t-2xl border-t-2 border-white/40 shadow-md relative z-10 flex items-center justify-center ${
            flavor === 'chocolate'
              ? 'bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-200'
              : flavor === 'blueberry'
              ? 'bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400 text-purple-900'
              : flavor === 'vanilla'
              ? 'bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 text-amber-900'
              : 'bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 text-rose-900'
          }`}>
            {/* Frosting Drips */}
            <div className="absolute -bottom-1 inset-x-0 flex justify-around text-xs">
              {flavor === 'chocolate' ? '🍫 🍫 🍫' : flavor === 'blueberry' ? '🫐 🫐 🫐' : flavor === 'vanilla' ? '🍯 🍯 🍯' : '🍓 🍓 🍓'}
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider">
              {config.birthdayPersonName}
            </div>
          </div>

          {/* Tier 2 (Middle) */}
          <div className={`w-48 h-16 rounded-t-xl border-t-2 border-white/40 shadow-lg relative z-0 flex items-center justify-center ${
            flavor === 'chocolate'
              ? 'bg-gradient-to-r from-amber-950 via-stone-800 to-amber-900'
              : flavor === 'blueberry'
              ? 'bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300'
              : flavor === 'vanilla'
              ? 'bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200'
              : 'bg-gradient-to-r from-amber-200 via-pink-200 to-amber-200'
          }`}>
            <div className="flex gap-3 text-sm">
              ✨ 🌸 ✨ 🌸 ✨
            </div>
          </div>

          {/* Tier 3 (Bottom Base) */}
          <div className={`w-60 h-16 rounded-b-2xl border-b-4 shadow-2xl relative flex items-center justify-center ${
            flavor === 'chocolate'
              ? 'bg-gradient-to-r from-amber-900 via-stone-900 to-amber-900 border-amber-950'
              : flavor === 'blueberry'
              ? 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 border-purple-700'
              : flavor === 'vanilla'
              ? 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 border-amber-500'
              : 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 border-rose-600/30'
          }`}>
            <div className="flex gap-2 text-white/90 text-xs font-semibold">
              🍰 HAPPY BIRTHDAY 🍰
            </div>
          </div>

          {/* Cake Stand Plate */}
          <div className="w-64 h-3 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full shadow-xl mt-0.5 border border-white/60" />
        </div>

        {/* Action Button */}
        {!candlesBlown ? (
          <button
            onClick={handleBlowCandles}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.45)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Blow the Candles</span>
              <span className="text-xl">🕯️</span>
            </span>
          </button>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 font-medium text-sm">
              ✨ The universe has officially recorded your birthday wish! ✨
            </div>

            <button
              onClick={handleNext}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.45)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Open Special Letter 💌</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
              </span>
            </button>
          </div>
        )}

        {onOpenCustomizer && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="text-xs text-amber-300 hover:text-amber-200 underline underline-offset-2 cursor-pointer font-medium"
            >
              Customize Step 4 Cake & Wish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
