import React from 'react';
import { Lock, Sparkles, Heart, Cake, Mail, Sliders, Volume2, VolumeX, QrCode } from 'lucide-react';
import { sound } from '../utils/sound';

interface Props {
  currentStep: number;
  totalSteps?: number;
  onJumpToStep: (step: number) => void;
  onOpenCustomizer: () => void;
  onOpenQR: () => void;
  isCustomizationFrozen?: boolean;
}

const STEP_ICONS = [
  { step: 1, label: 'Gate', icon: Lock },
  { step: 2, label: 'Reveal', icon: Sparkles },
  { step: 3, label: 'Words', icon: Heart },
  { step: 4, label: 'Cake', icon: Cake },
  { step: 5, label: 'Letter', icon: Mail },
];

export const MobileBottomNav: React.FC<Props> = ({
  currentStep,
  onJumpToStep,
  onOpenCustomizer,
  onOpenQR,
  isCustomizationFrozen,
}) => {
  const isMuted = sound.getIsMuted();

  const handleStepClick = (s: number) => {
    sound.playSparkle();
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // ignore
      }
    }
    onJumpToStep(s);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around sm:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      {STEP_ICONS.map(({ step, label, icon: Icon }) => {
        const isActive = currentStep === step;
        return (
          <button
            key={step}
            type="button"
            onClick={() => handleStepClick(step)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
              isActive
                ? 'text-pink-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <span className="absolute -top-1 w-6 h-1 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
            )}
            <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400 animate-pulse' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5 leading-none">{label}</span>
          </button>
        );
      })}

      <div className="w-[1px] h-6 bg-white/10 mx-0.5" />

      {/* Customize shortcut - hidden when frozen */}
      {!isCustomizationFrozen && (
        <button
          type="button"
          onClick={() => {
            sound.playSparkle();
            onOpenCustomizer();
          }}
          title="Customize Gift"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-300 hover:text-white cursor-pointer"
        >
          <Sliders className="w-4 h-4 text-pink-300" />
          <span className="text-[10px] mt-0.5 leading-none">Edit</span>
        </button>
      )}

      {/* QR shortcut */}
      <button
        type="button"
        onClick={() => {
          sound.playSparkle();
          onOpenQR();
        }}
        title="QR Code & Install"
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-300 hover:text-white cursor-pointer"
      >
        <QrCode className="w-4 h-4 text-amber-300" />
        <span className="text-[10px] mt-0.5 leading-none">QR</span>
      </button>
    </nav>
  );
};
