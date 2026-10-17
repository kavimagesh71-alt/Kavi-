import React, { useState, useRef, useEffect } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireHeartsConfetti } from '../../utils/fx';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Heart, 
  ArrowRight,
  Sparkles,
  Music,
  Play,
  Pause,
  Grid,
  Layers
} from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
  onOpenMusicStudio?: () => void;
}

export const Step5PhotoGallery: React.FC<Props> = ({ config, onNext, onOpenMusicStudio }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const photos = config.galleryPhotos && config.galleryPhotos.length > 0 ? config.galleryPhotos : [
    { id: '1', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80', caption: 'Brightest smiles and warmest vibes! 🎈' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [likesCount, setLikesCount] = useState<Record<number, number>>({});
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'slideshow' | 'grid'>('slideshow');

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNextPhoto();
    } else if (diff < -50) {
      handlePrevPhoto();
    }
    touchStartX.current = null;
  };

  const handleNextPhoto = () => {
    sound.playSparkle();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    sound.playSparkle();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, photos.length]);

  const handleLike = (e: React.MouseEvent) => {
    sound.playSparkle();
    fireHeartsConfetti();
    setLikesCount(prev => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 0) + 1
    }));

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setFloatingHearts(prev => [...prev, newHeart]);
  };

  useEffect(() => {
    if (floatingHearts.length > 0) {
      const timer = setTimeout(() => {
        setFloatingHearts(prev => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [floatingHearts]);

  const activePhoto = photos[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10">
      <div className={`w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Module Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 text-pink-300 text-xs sm:text-sm font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-pink-400" />
            <span>Module 3: Memories • Photo Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Our Beautiful Memories ❤️
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Cherished moments shared with {config.birthdayPersonName}
          </p>

          {/* Quick controls bar: Slideshow vs Grid & AI Music trigger */}
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <button
              onClick={() => {
                sound.playSparkle();
                setIsAutoPlaying(!isAutoPlaying);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isAutoPlaying
                  ? 'bg-pink-600 text-white border-pink-400 shadow-md'
                  : 'bg-black/40 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isAutoPlaying ? 'Pause Slideshow' : 'Auto Play'}</span>
            </button>

            <button
              onClick={() => {
                sound.playSparkle();
                setViewMode(viewMode === 'slideshow' ? 'grid' : 'slideshow');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-black/40 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>{viewMode === 'grid' ? 'Single View' : 'Grid View'}</span>
            </button>

            {onOpenMusicStudio && (
              <button
                onClick={() => {
                  sound.playSparkle();
                  onOpenMusicStudio();
                }}
                className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-pink-950/70 border border-pink-500/40 text-pink-200 hover:text-white transition-all cursor-pointer"
              >
                <Music className="w-3 h-3 text-pink-300 animate-pulse" />
                <span>AI Music for Photos</span>
              </button>
            )}
          </div>
        </div>

        {/* View Mode: Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3 mb-6 max-h-[50vh] overflow-y-auto pr-1">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => {
                  sound.playSparkle();
                  setCurrentIndex(idx);
                  setViewMode('slideshow');
                }}
                className="relative rounded-2xl overflow-hidden aspect-square border border-white/15 cursor-pointer group hover:scale-[1.02] transition-transform shadow-lg"
              >
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                  <p className="text-white text-xs font-medium line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white">
                  #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Main Slideshow Photo Viewer */
          <div 
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/15 select-none shadow-xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activePhoto && (
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80';
                }}
              />
            )}

            {/* Controls overlay */}
            <button
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextPhoto}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Zoom button */}
            <button
              onClick={() => setIsZoomed(true)}
              aria-label="Zoom photo"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Heart reaction button */}
            <button
              onClick={handleLike}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 hover:bg-rose-600/80 text-white flex items-center gap-1.5 transition-all cursor-pointer border border-white/20 backdrop-blur-md text-xs font-semibold group"
            >
              <Heart className="w-4 h-4 text-rose-400 group-hover:scale-125 transition-transform fill-rose-400" />
              <span>{(likesCount[currentIndex] || 0) + 7}</span>
            </button>

            {/* Floating animated hearts on like */}
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                className="absolute pointer-events-none text-2xl animate-[ping_0.8s_ease-out] text-rose-500"
                style={{ left: h.x, top: h.y }}
              >
                💖
              </div>
            ))}

            {/* Photo Counter */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        )}

        {/* Caption */}
        {viewMode === 'slideshow' && (
          <div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/10 text-center min-h-[56px] flex items-center justify-center">
            <p className="text-slate-100 text-sm sm:text-base font-serif italic">
              "{activePhoto?.caption || 'A memory to hold forever.'}"
            </p>
          </div>
        )}

        {/* Thumbnail bar */}
        {viewMode === 'slideshow' && (
          <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto py-2">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playSparkle();
                  setCurrentIndex(idx);
                }}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                  idx === currentIndex ? 'border-pink-500 scale-105 shadow-md' : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <img src={p.url} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={() => {
            sound.playSparkle();
            onNext();
          }}
          className="w-full mt-6 group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Next: 5 Reasons You Are Special</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
          </span>
        </button>
      </div>

      {/* Full Screen Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoomed view"
            className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhoto?.url}
            alt={activePhoto?.caption}
            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />
          <p className="mt-4 text-white text-base font-serif italic text-center max-w-lg">
            "{activePhoto?.caption}"
          </p>
        </div>
      )}
    </div>
  );
};
