import React, { useState, useEffect } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireHeartsConfetti } from '../../utils/fx';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
  onOpenCustomizer?: () => void;
}

export const Step3PersonalMessage: React.FC<Props> = ({ config, onNext, onOpenCustomizer }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const [displayedText, setDisplayedText] = useState('');
  const letterTitle = config.personalMessageTitle || 'A Personal Letter For You';
  const fullText = config.personalMessage || `Dear ${config.birthdayPersonName},\n\nYou are one of the most special people in my life.\n\nThank you for all the smiles, memories and beautiful moments.\n\nI hope this birthday brings you everything you wish for. ❤️\n\n— ${config.fromName}`;

  useEffect(() => {
    sound.playPaperSound();
    fireHeartsConfetti();

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10">
      {/* Floating hearts background animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-4 text-rose-400 text-2xl animate-[ping_3s_infinite] opacity-60">❤️</div>
        <div className="absolute top-2/3 right-6 text-pink-400 text-3xl animate-[bounce_3s_infinite] opacity-70">💖</div>
        <div className="absolute bottom-10 left-10 text-amber-300 text-2xl animate-pulse opacity-50">✨</div>
      </div>

      {/* Parchment / Letter Styled Card */}
      <div className={`w-full p-4 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Wax Seal / Stamp Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400">
              💌
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
              {letterTitle}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>

        {/* Letter content with typewriter effect */}
        <div 
          onClick={handleSkipTyping}
          className="bg-black/30 rounded-2xl p-4 sm:p-8 border border-white/10 mb-6 sm:mb-8 min-h-[170px] sm:min-h-[220px] cursor-pointer relative group"
          title="Click to reveal all text instantly"
        >
          <div className="text-slate-100 text-base sm:text-lg leading-relaxed whitespace-pre-line font-serif italic selection:bg-rose-500 selection:text-white">
            {displayedText}
            {displayedText.length < fullText.length && (
              <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {displayedText.length < fullText.length && (
            <div className="absolute bottom-2 right-4 text-[11px] text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity">
              Tap anywhere to show full text
            </div>
          )}
        </div>

        {/* Button: "I Have More For You →" */}
        <button
          onClick={handleNext}
          className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #ec4899 50%, #9333ea 100%)',
            boxShadow: '0 0 30px rgba(225, 29, 72, 0.45)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>I Have More For You</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
          </span>
        </button>

        {onOpenCustomizer && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="text-xs text-pink-400 hover:text-pink-300 underline underline-offset-2 cursor-pointer font-medium"
            >
              Customize Step 3 Letter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
