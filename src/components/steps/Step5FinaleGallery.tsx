import React, { useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireCelebrationFireworks, fireHeartsConfetti, fireConfettiBurst } from '../../utils/fx';
import { 
  Sparkles, 
  Heart, 
  RotateCcw, 
  Share2, 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  QrCode, 
  Music,
  Download,
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

export const Step5FinaleGallery: React.FC<Props> = ({
  config,
  onRestart,
  onOpenCustomizer,
  onOpenQR,
  onOpenMusicStudio,
  onShare,
}) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const photos = config.galleryPhotos && config.galleryPhotos.length > 0 ? config.galleryPhotos : [
    { id: '1', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80', caption: 'Brightest smiles and warmest vibes! 🎈' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likesCount, setLikesCount] = useState<Record<number, number>>({});

  const handlePrevPhoto = () => {
    sound.playSparkle();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextPhoto = () => {
    sound.playSparkle();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleCelebrate = () => {
    sound.playSparkle();
    sound.playConfettiPop();
    fireCelebrationFireworks();
    fireHeartsConfetti();
    setLikesCount((prev) => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 0) + 1,
    }));
  };

  const activePhoto = photos[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-3 sm:px-4 py-8 max-w-xl mx-auto w-full relative z-10 text-center animate-fadeIn">
      {/* Floating confetti icons in ambient bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-10 left-6 text-3xl animate-bounce opacity-70">🎉</span>
        <span className="absolute top-24 right-8 text-3xl animate-pulse opacity-70">✨</span>
        <span className="absolute bottom-20 left-10 text-4xl animate-[bounce_4s_infinite] opacity-60">💖</span>
        <span className="absolute bottom-16 right-12 text-3xl animate-bounce opacity-60">🎈</span>
      </div>

      <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Step 5 Finale Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-300 text-xs sm:text-sm font-semibold mb-3">
          <PartyPopper className="w-4 h-4 text-amber-300" />
          <span>Step 5 of 5 • Grand Finale & Keepsake</span>
        </div>

        {/* Big Heartfelt Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif mb-1">
          Forever Celebrated, {config.birthdayPersonName}! ❤️
        </h2>
        <p className="text-sm text-slate-200 mb-6 font-light">
          {config.finalMessage || 'Thank you for being such an extraordinary part of my life. Keep smiling always!'}
        </p>

        {/* Photo Memory Carousel Box */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-2xl mb-4 group select-none">
          {activePhoto && (
            <img
              src={activePhoto.url}
              alt={activePhoto.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80';
              }}
            />
          )}

          {/* Navigation Controls */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Counter pill */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10">
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Heart reaction button */}
          <button
            type="button"
            onClick={handleCelebrate}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 hover:bg-rose-600/80 text-white flex items-center gap-1.5 transition-all cursor-pointer border border-white/20 backdrop-blur-md text-xs font-semibold"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{(likesCount[currentIndex] || 0) + 12}</span>
          </button>
        </div>

        {/* Caption */}
        <div className="p-3.5 rounded-xl bg-black/30 border border-white/10 text-center mb-6">
          <p className="text-slate-100 text-xs sm:text-sm font-serif italic">
            "{activePhoto?.caption || 'A memory to hold forever.'}"
          </p>
        </div>

        {/* Final Wishing Signoff */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 via-slate-950 to-purple-950/40 border border-pink-500/30">
          <p className="text-sm font-serif text-pink-200 italic mb-1">
            "May all your birthday wishes come true, today and always."
          </p>
          <p className="text-xs font-bold text-white tracking-wide">
            — With all my love, {config.fromName} ❤️
          </p>
        </div>

        {/* Action Controls Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            type="button"
            onClick={handleCelebrate}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 transition-transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Celebrate Again! 🎉</span>
          </button>

          <button
            type="button"
            onClick={onShare}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 transition-transform active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share This Gift ❤️</span>
          </button>
        </div>

        {/* Secondary Buttons */}
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

        {/* Restart Button */}
        <div className="mt-4 pt-3 border-t border-white/5">
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
    </div>
  );
};
