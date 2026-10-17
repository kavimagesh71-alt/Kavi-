import React from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireCelebrationFireworks, fireHeartsConfetti } from '../../utils/fx';
import { RotateCcw, Heart, Sparkles, Share2, Sliders } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onRestart: () => void;
  onOpenCustomizer: () => void;
  onShare: () => void;
}

export const Step12FinalPhoto: React.FC<Props> = ({
  config,
  onRestart,
  onOpenCustomizer,
  onShare,
}) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;

  const handleCelebrate = () => {
    sound.playSparkle();
    fireHeartsConfetti();
    fireCelebrationFireworks();
  };

  const handleRestartJourney = () => {
    sound.playSparkle();
    onRestart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10 text-center">
      <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Subtle decorative badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-300 text-xs sm:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Keepsake Photograph</span>
        </div>

        {/* Intro Text */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mb-1">
          One last thing...
        </h2>
        <p className="text-xl sm:text-2xl text-rose-300 font-serif italic mb-6">
          Keep smiling. ❤️
        </p>

        {/* Glowing Photo Frame */}
        <div 
          onClick={handleCelebrate}
          className="relative max-w-sm mx-auto mb-6 p-2.5 rounded-3xl bg-gradient-to-tr from-amber-300 via-rose-500 to-pink-500 shadow-[0_0_40px_rgba(244,63,94,0.5)] cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="relative rounded-[20px] overflow-hidden bg-slate-900 border-2 border-white/20 aspect-[4/5] shadow-inner">
            <img
              src={config.userTakenPhotoUrl || config.finalPhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
              alt={config.finalPhotoCaption || 'Final Birthday Photo'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {config.userTakenPhotoUrl && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-pink-300 border border-pink-400/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>VIP Birthday Star</span>
              </div>
            )}
            {/* Soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Sparkle icon indicator */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20">
              ✨
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-slate-200 text-sm sm:text-base font-serif italic mb-6 px-2">
          "{config.finalPhotoCaption || 'Keep smiling, because your smile lights up the universe! 🌟❤️'}"
        </p>

        {/* Concluding Greeting */}
        <div className="py-4 border-y border-white/10 mb-8">
          <p className="text-2xl sm:text-3xl font-black text-transparent bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 bg-clip-text font-serif">
            Happy Birthday Once Again! 🎂❤️
          </p>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            With endless love, {config.fromName}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Restart Experience Button */}
          <button
            onClick={handleRestartJourney}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)',
              boxShadow: '0 0 30px rgba(244, 63, 94, 0.45)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-90 duration-300" />
              <span>Experience Again</span>
              <span className="text-xl">🔄</span>
            </span>
          </button>

          {/* Share & Customizer Sub-buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onShare}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-pink-400" />
              <span>Share Gift Link</span>
            </button>

            <button
              onClick={onOpenCustomizer}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Customize Gift</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
