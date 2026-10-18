import React, { useEffect, useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireConfettiBurst, fireCelebrationFireworks } from '../../utils/fx';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
  onOpenCustomizer?: () => void;
}

export const Step2BirthdayReveal: React.FC<Props> = ({ config, onNext, onOpenCustomizer }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const [typedText, setTypedText] = useState('');
  const fullSubtext = config.revealSubtext || 'I hope this little surprise makes you smile. 😊';
  const revealHeading = config.revealTitle || 'HAPPY BIRTHDAY';
  const revealTagline = config.revealTagline || 'Today is your special day!';

  useEffect(() => {
    sound.playConfettiPop();
    fireConfettiBurst();
    fireCelebrationFireworks();

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullSubtext.length) {
        setTypedText(fullSubtext.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [fullSubtext]);

  const handleContinue = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full text-center relative z-10">
      {/* Animated Floating Balloons in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute left-[10%] -bottom-10 text-5xl animate-[bounce_3s_infinite] opacity-75">🎈</span>
        <span className="absolute right-[12%] -bottom-5 text-6xl animate-[bounce_4s_infinite_0.5s] opacity-75">🎈</span>
        <span className="absolute left-[25%] -bottom-2 text-4xl animate-[bounce_3.5s_infinite_1s] opacity-60">🎈</span>
        <span className="absolute right-[28%] -bottom-8 text-5xl animate-[bounce_4.5s_infinite_0.2s] opacity-60">🎈</span>
      </div>

      <div className={`w-full p-5 sm:p-12 rounded-2xl sm:rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Celebration header badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-amber-400/40 bg-amber-500/20 text-amber-200 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-6 shadow-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
          <span>CELEBRATING YOUR SPECIAL DAY</span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
        </div>

        {/* Big Reveal Heading */}
        <h1 className="text-2xl sm:text-5xl font-black tracking-tight mb-3 sm:mb-4">
          <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 bg-clip-text text-transparent block">
            🎉 {revealHeading} 🎉
          </span>
          <span className="text-2xl sm:text-5xl font-serif text-white block mt-2 sm:mt-3 font-normal drop-shadow-md">
            {config.birthdayPersonName} <span className="text-rose-500 inline-block animate-pulse">❤️</span>
          </span>
        </h1>

        <p className="text-base sm:text-2xl text-pink-200 font-medium tracking-wide mt-2 sm:mt-4 mb-4 sm:mb-6">
          {revealTagline}
        </p>

        {/* Typing message container */}
        <div className="min-h-[60px] sm:min-h-[70px] bg-black/25 rounded-2xl p-3.5 sm:p-6 border border-white/10 mb-6 sm:mb-8 flex items-center justify-center">
          <p className="text-slate-200 text-sm sm:text-xl font-light italic leading-relaxed">
            {typedText}
            <span className="inline-block w-1.5 h-5 bg-pink-400 ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #f59e0b 100%)',
            boxShadow: '0 0 30px rgba(244, 63, 94, 0.4)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
          </span>
        </button>

        <div className="flex items-center justify-center gap-3 mt-6 text-xs text-slate-400 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Made especially by {config.fromName}</span>
          </span>
          {onOpenCustomizer && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="text-pink-400 hover:text-pink-300 underline underline-offset-2 cursor-pointer font-medium"
              >
                Customize Step 2
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
