import React, { useState, useEffect } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { 
  fireHeartsConfetti, 
  fireCelebrationFireworks, 
  fireConfettiBurst,
  fireGrandFinaleConfettiExplosion 
} from '../../utils/fx';
import { 
  Mail, 
  MailOpen, 
  Sparkles, 
  Heart, 
  RotateCcw, 
  Share2, 
  Sliders, 
  QrCode, 
  Music,
  PartyPopper
} from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onRestart: () => void;
  onOpenCustomizer: () => void;
  onOpenQR: () => void;
  onOpenMusicStudio: () => void;
  onShare: () => void;
}

export const Step5SpecialLetter: React.FC<Props> = ({
  config,
  onRestart,
  onOpenCustomizer,
  onOpenQR,
  onOpenMusicStudio,
  onShare,
}) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const [isOpen, setIsOpen] = useState(false);

  const waxSealEmoji = config.specialLetterWaxSeal || '❤️';
  const letterTitle = config.specialLetterTitle || '💌 A Special Letter For You';
  const letterSignoff = config.specialLetterSignoff || 'With all my love & heart';
  const letterPs = config.specialLetterPs || 'P.S. Never forget how truly cherished and loved you are! 🌟';

  // Trigger grand finale celebration confetti explosion when user reaches Step 5
  useEffect(() => {
    const cleanupConfetti = fireGrandFinaleConfettiExplosion();
    sound.playConfettiPop();

    return () => {
      if (cleanupConfetti) cleanupConfetti();
    };
  }, []);

  const handleOpenLetter = () => {
    sound.playPaperSound();
    sound.playUnlockChime();
    fireGrandFinaleConfettiExplosion();
    setIsOpen(true);
  };

  const handleCelebrateAgain = () => {
    sound.playSparkle();
    sound.playConfettiPop();
    fireGrandFinaleConfettiExplosion();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] sm:min-h-[85vh] px-2 sm:px-4 py-2 sm:py-8 max-w-xl mx-auto w-full relative z-10 text-center animate-fadeIn">
      {/* Floating background celebratory hearts & sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-10 left-6 text-3xl animate-bounce opacity-70">💌</span>
        <span className="absolute top-24 right-8 text-3xl animate-pulse opacity-70">✨</span>
        <span className="absolute bottom-20 left-10 text-4xl animate-[bounce_4s_infinite] opacity-60">💖</span>
        <span className="absolute bottom-16 right-12 text-3xl animate-bounce opacity-60">🌹</span>
      </div>

      <div className={`w-full p-4 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Step 5 Badge */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-300 text-xs sm:text-sm font-semibold mb-2">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300" />
            <span>Step 5 of 5 • The Special Letter</span>
            <Sparkles className="w-3 h-3 text-amber-300" />
          </div>

          <h2 className="text-xl sm:text-4xl font-extrabold text-white font-serif">
            {isOpen ? letterTitle : 'You Received A Sealed Letter!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isOpen
              ? `Written from the bottom of my heart for ${config.birthdayPersonName}`
              : `Sealed with love by ${config.fromName}. Tap the wax seal to open!`}
          </p>
        </div>

        {/* 3D Wax-Sealed Envelope Graphic */}
        {!isOpen ? (
          <div className="my-8 flex flex-col items-center animate-fadeIn">
            {/* Interactive Envelope with glowing wax seal */}
            <div 
              onClick={handleOpenLetter}
              className="w-72 sm:w-80 h-48 sm:h-52 bg-gradient-to-tr from-amber-100 via-rose-100 to-amber-50 rounded-2xl shadow-2xl border-2 border-amber-300/80 relative flex items-center justify-center cursor-pointer group hover:scale-105 transition-all duration-300 select-none shadow-[0_15px_35px_rgba(244,63,94,0.3)]"
            >
              {/* Envelope flap lines */}
              <div className="absolute top-0 inset-x-0 h-28 border-b-2 border-amber-300/60 flex items-center justify-center bg-gradient-to-b from-amber-50 to-rose-50/80 rounded-t-2xl">
                {/* 3D Wax Seal Button */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-red-800 border-2 border-amber-300 shadow-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ring-4 ring-red-500/30 animate-pulse">
                  {waxSealEmoji}
                </div>
              </div>

              {/* Recipient tag */}
              <div className="absolute bottom-4 text-xs font-serif font-bold text-slate-800 tracking-wider uppercase px-3 py-1 bg-white/70 rounded-full border border-amber-200 shadow-sm">
                For: {config.birthdayPersonName} ❤️
              </div>
            </div>

            {/* Tap to open button */}
            <button
              onClick={handleOpenLetter}
              className="mt-8 w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #e11d48 0%, #ec4899 50%, #f43f5e 100%)',
                boxShadow: '0 0 35px rgba(225, 29, 72, 0.45)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Break Seal & Open Letter</span>
                <MailOpen className="w-5 h-5 transition-transform group-hover:rotate-12 duration-200" />
              </span>
            </button>

            <p className="mt-3 text-xs text-slate-400 font-light">
              👆 Tap the wax seal or button to unfold your handwritten letter
            </p>

            <button
              type="button"
              onClick={() => {
                sound.playSparkle();
                sound.playConfettiPop();
                fireGrandFinaleConfettiExplosion();
              }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-200 text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <PartyPopper className="w-4 h-4 text-amber-300" />
              <span>Launch Confetti Explosion 🎊</span>
            </button>
          </div>
        ) : (
          /* Unfolded Parchment Paper Letter */
          <div className="animate-fadeIn space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50 via-amber-50/95 to-amber-100/90 text-slate-900 border-2 border-amber-300 shadow-2xl text-left relative overflow-hidden">
              {/* Paper Top Bar */}
              <div className="flex items-center justify-between border-b border-amber-300/70 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {waxSealEmoji}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-slate-600 font-bold font-serif">
                    Handwritten Special Letter
                  </span>
                </div>
                <span className="text-xs text-rose-700 font-semibold flex items-center gap-1 font-serif">
                  <Heart className="w-3.5 h-3.5 fill-rose-600" />
                  {config.birthdayDate || 'Your Special Day'}
                </span>
              </div>

              {/* Letter Content */}
              <div className="font-serif text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line italic px-1">
                {config.specialMessage || `Dear ${config.birthdayPersonName},

No matter where life takes us,
I hope you always stay happy,
keep smiling and achieve everything
you dream about.

You deserve all the happiness
in the world. ❤️

Happy Birthday! 🎂`}
              </div>

              {/* Signature */}
              <div className="mt-6 pt-3 border-t border-amber-300/70 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-serif">
                <span className="italic">{letterSignoff},</span>
                <span className="font-bold text-slate-900 text-base font-serif">— {config.fromName} ❤️</span>
              </div>

              {/* P.S. Note */}
              {letterPs && (
                <div className="mt-3 pt-2 border-t border-amber-200 text-xs sm:text-sm font-serif italic text-rose-800/90">
                  {letterPs}
                </div>
              )}
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCelebrateAgain}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 transition-transform active:scale-95 cursor-pointer"
              >
                <PartyPopper className="w-4 h-4 text-amber-300" />
                <span>Celebrate! 🎉</span>
              </button>

              <button
                type="button"
                onClick={onShare}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 transition-transform active:scale-95 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Gift ❤️</span>
              </button>
            </div>

            {/* Secondary Controls */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={onOpenQR}
                className="py-2.5 px-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-300" />
                <span className="truncate">Gift QR Code</span>
              </button>

              <button
                type="button"
                onClick={onOpenMusicStudio}
                className="py-2.5 px-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Music className="w-3.5 h-3.5 text-pink-300" />
                <span className="truncate">AI Music</span>
              </button>

              <button
                type="button"
                onClick={onOpenCustomizer}
                className="py-2.5 px-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-purple-300" />
                <span className="truncate">Customize</span>
              </button>
            </div>

            {/* Replay Option */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  onRestart();
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Surprise Journey from Step 1</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
