import React from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { LockOpen, Sparkles, Heart } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
}

export const Step1SecretWelcome: React.FC<Props> = ({ config, onNext }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;

  const handleOpen = () => {
    sound.playUnlockChime();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 max-w-lg mx-auto w-full text-center relative z-10">
      {/* Floating ambient hearts */}
      <div className="absolute top-10 left-6 text-pink-500/20 text-3xl animate-pulse pointer-events-none">❤️</div>
      <div className="absolute bottom-16 right-6 text-rose-500/20 text-4xl animate-bounce pointer-events-none">✨</div>

      <div className={`w-full p-8 sm:p-12 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Mysterious glowing sphere */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-400 p-1 shadow-[0_0_40px_rgba(236,72,153,0.5)] flex items-center justify-center animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-3xl">
            👀
          </div>
        </div>

        {/* Text sequence */}
        <div className="space-y-6 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
            {config.welcomeGreeting || `Hey ${config.birthdayPersonName}... 👀`}
          </h2>

          <div className="text-xl sm:text-2xl text-slate-200 font-light leading-relaxed whitespace-pre-line">
            {config.welcomeSubtitle || 'Before you continue...\nI made something special for you. ❤️'}
          </div>

          <div className="flex items-center justify-center gap-2 text-rose-400 text-sm font-medium pt-2">
            <Heart className="w-4 h-4 fill-rose-400 animate-ping" />
            <span>Crafted with love for your special day</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
        </div>

        {/* Glowing action button */}
        <button
          onClick={handleOpen}
          className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-2xl transition-all duration-300 active:scale-95 hover:scale-[1.03] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
            boxShadow: '0 0 35px rgba(236, 72, 153, 0.55)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Open My Surprise</span>
            <LockOpen className="w-6 h-6 transition-transform group-hover:rotate-12 duration-200" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
