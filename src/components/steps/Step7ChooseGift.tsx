import React, { useState } from 'react';
import { BirthdayGiftConfig } from '../../types';
import { sound } from '../../utils/sound';
import { fireConfettiBurst } from '../../utils/fx';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { THEME_CONFIGS } from '../../utils/themeStyles';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
}

export const Step7ChooseGift: React.FC<Props> = ({ config, onNext }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;
  const gifts = config.gifts && config.gifts.length >= 3 ? config.gifts : [
    {
      id: 'g1',
      emoji: '🍕',
      title: 'Gift 1',
      subtitle: 'Could it be gold?',
      revealText: 'A Lifetime Coupon for Free Hugs (and 1 free slice of cheesy pizza whenever you want)! 🍕🤗',
      isRealGift: false,
    },
    {
      id: 'g2',
      emoji: '👑',
      title: 'Gift 2',
      subtitle: 'Something royal...',
      revealText: 'The Official Royal Title of "Coolest Human Being on Earth" for the whole year! 👑✨',
      isRealGift: false,
    },
    {
      id: 'g3',
      emoji: '💖',
      title: 'Gift 3',
      subtitle: 'The real treasure...',
      revealText: 'The real gift is... A lifetime of beautiful memories, unconditional love, and infinite laughs together. ❤️',
      isRealGift: true,
    },
  ];

  const [openedGifts, setOpenedGifts] = useState<string[]>([]);
  const [activeGiftModal, setActiveGiftModal] = useState<number | null>(null);

  const handleOpenGift = (index: number) => {
    const gift = gifts[index];
    sound.playGiftUnbox();
    
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts(prev => [...prev, gift.id]);
    }
    setActiveGiftModal(index);

    if (gift.isRealGift || openedGifts.length >= 2) {
      fireConfettiBurst();
    }
  };

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-xl mx-auto w-full relative z-10 text-center">
      <div className={`w-full p-6 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl ${theme.cardBg} ${theme.glow}`}>
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-semibold mb-3">
            <span>🎁 Mystery Present Time 🎁</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">
            Choose One Gift... 👀
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Pick a mystery box below to see what surprise is waiting inside!
          </p>
        </div>

        {/* 3 Gift Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {gifts.map((gift, idx) => {
            const isOpened = openedGifts.includes(gift.id);

            return (
              <button
                key={gift.id}
                onClick={() => handleOpenGift(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden ${
                  isOpened 
                    ? 'bg-rose-950/40 border-rose-500/50 shadow-lg scale-100'
                    : 'bg-black/40 border-white/15 hover:border-pink-500/60 hover:scale-105 hover:bg-black/60 shadow-md'
                }`}
              >
                {/* Ribbon decoration */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-rose-600 p-0.5 mb-3 flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                  <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center text-3xl">
                    {isOpened ? gift.emoji : '🎁'}
                  </div>
                </div>

                <span className="font-bold text-white text-base">
                  {gift.title || `Gift ${idx + 1}`}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  {isOpened ? 'Unwrapped! Tap to read' : 'Tap to open'}
                </span>

                {isOpened && (
                  <span className="absolute top-2 right-2 text-xs">✨</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Display for opened gift */}
        {activeGiftModal !== null && gifts[activeGiftModal] && (
          <div className="bg-black/50 border border-white/20 rounded-2xl p-6 mb-8 text-left animate-fadeIn">
            <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span>{gifts[activeGiftModal].title} Unboxed</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="text-3xl mb-2">{gifts[activeGiftModal].emoji}</div>
            
            <p className="text-white text-base sm:text-lg font-serif italic leading-relaxed">
              "{gifts[activeGiftModal].revealText}"
            </p>

            {gifts[activeGiftModal].isRealGift && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                <Heart className="w-4 h-4 fill-rose-400" />
                <span>The greatest gift is having each other.</span>
              </div>
            )}
          </div>
        )}

        {/* Continue Button */}
        {openedGifts.length > 0 && (
          <div className="animate-fadeIn">
            <button
              onClick={handleNext}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #f43f5e 100%)',
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Wait... There is Still More</span>
                <span className="text-xl">👀</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
