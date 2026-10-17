import React, { useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireCelebrationFireworks } from '../../utils/fx';
import { Lock, Unlock, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
}

export const Step10SecretMessage: React.FC<Props> = ({ config, onNext }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    sound.playUnlockChime();
    setIsUnlocked(true);
    fireCelebrationFireworks();
  };

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10 text-center">
      <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm font-semibold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Vault of Secrets</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            🔐 SECRET MESSAGE
          </h2>
          <p className="text-sm text-pink-300 mt-1 font-medium">
            Only for {config.birthdayPersonName}
          </p>
        </div>

        {/* Locked Heart Representation */}
        {!isUnlocked ? (
          <div className="my-8 flex flex-col items-center">
            {/* Pulsing Lock Heart Container */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl animate-ping" />
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 p-1 shadow-[0_0_40px_rgba(244,63,94,0.6)] flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform">
                <div className="w-full h-full bg-slate-950/80 rounded-[22px] flex flex-col items-center justify-center gap-2">
                  <Heart className="w-10 h-10 text-rose-400 fill-rose-500 animate-pulse" />
                  <Lock className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-xs mb-8">
              This message has been encrypted and locked. Tap below to unlock with your heartbeat.
            </p>

            <button
              onClick={handleUnlock}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #8b5cf6 100%)',
                boxShadow: '0 0 35px rgba(236, 72, 153, 0.5)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Unlock ❤️</span>
                <Unlock className="w-5 h-5 transition-transform group-hover:rotate-12 duration-200" />
              </span>
            </button>
          </div>
        ) : (
          <div className="animate-fadeIn space-y-6">
            {/* Glowing Unlocked Message Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-purple-950/60 to-rose-950/60 border-2 border-rose-400/40 shadow-2xl text-left relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border-b border-rose-500/20 pb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Unlocked Confidential Message</span>
              </div>

              <div className="font-serif text-rose-100 text-base sm:text-lg leading-relaxed whitespace-pre-line italic">
                {config.secretMessage}
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-rose-300/80 pt-2 border-t border-rose-500/20">
                <span>Kept in my heart forever</span>
                <span className="font-semibold">— {config.fromName} ❤️</span>
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 50%, #ec4899 100%)',
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.45)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>The Final Surprise 🎉</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
