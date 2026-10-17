import React, { useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireHeartsConfetti } from '../../utils/fx';
import { Mail, MailOpen, ArrowRight, Heart } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
}

export const Step9SpecialLetter: React.FC<Props> = ({ config, onNext }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    sound.playPaperSound();
    sound.playUnlockChime();
    fireHeartsConfetti();
    setIsOpen(true);
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-300 text-xs sm:text-sm font-semibold mb-2">
            <Mail className="w-4 h-4 text-pink-300" />
            <span>Special Delivery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            💌 You received a special letter.
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Carefully written and sealed with pure love
          </p>
        </div>

        {/* Envelope Graphic */}
        {!isOpen ? (
          <div className="my-8 flex flex-col items-center">
            {/* 3D Envelope illustration */}
            <div 
              onClick={handleOpenLetter}
              className="w-64 h-44 bg-gradient-to-tr from-amber-100 via-rose-100 to-amber-50 rounded-2xl shadow-2xl border-2 border-amber-200 relative flex items-center justify-center cursor-pointer group hover:scale-105 transition-all duration-300"
            >
              {/* Envelope flap lines */}
              <div className="absolute top-0 inset-x-0 h-24 border-b-2 border-amber-300/50 flex items-center justify-center">
                {/* Wax Seal */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-rose-700 border-2 border-red-300 shadow-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                  ❤️
                </div>
              </div>

              <div className="absolute bottom-3 text-xs font-serif font-bold text-slate-700 tracking-wider uppercase">
                To: {config.birthdayPersonName}
              </div>
            </div>

            <button
              onClick={handleOpenLetter}
              className="mt-8 w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #e11d48 0%, #ec4899 50%, #f43f5e 100%)',
                boxShadow: '0 0 30px rgba(225, 29, 72, 0.45)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Open Letter</span>
                <MailOpen className="w-5 h-5 transition-transform group-hover:rotate-12 duration-200" />
              </span>
            </button>
          </div>
        ) : (
          <div className="animate-fadeIn space-y-6">
            {/* Open parchment paper */}
            <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/95 text-slate-900 border-2 border-amber-200 shadow-2xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3 mb-4">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                  Handcrafted Note
                </span>
                <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-600" />
                  {config.birthdayDate}
                </span>
              </div>

              <div className="font-serif text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line italic">
                {config.specialMessage}
              </div>

              <div className="mt-6 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs text-slate-600">
                <span>With all my heart</span>
                <span className="font-bold text-slate-800 font-serif text-sm">— {config.fromName}</span>
              </div>
            </div>

            {/* Next Step Button */}
            <button
              onClick={handleNext}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.45)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Secret Message Ahead 🔐</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
