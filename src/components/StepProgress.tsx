import React from 'react';
import { Sliders, QrCode, HelpCircle, Music, Sparkles, Smartphone } from 'lucide-react';
import { getModuleForStep } from '../types';

interface Props {
  currentStep: number;
  totalSteps?: number;
  onJumpToStep?: (step: number) => void;
  onOpenCustomizer: () => void;
  onOpenQR: () => void;
  onOpenGuide: () => void;
  onOpenMusicStudio: () => void;
  isMobileSimulator?: boolean;
  onToggleMobileSimulator?: () => void;
  isCustomizationFrozen?: boolean;
  onUnfreezeCustomizer?: () => void;
}

const STEP_NAMES: Record<number, string> = {
  1: 'Passcode Gate',
  2: 'Birthday Reveal',
  3: 'Personal Letter',
  4: 'Birthday Cake',
  5: 'Special Letter',
};

export const StepProgress: React.FC<Props> = ({
  currentStep,
  totalSteps = 5,
  onJumpToStep,
  onOpenCustomizer,
  onOpenQR,
  onOpenGuide,
  onOpenMusicStudio,
  isMobileSimulator,
  onToggleMobileSimulator,
  isCustomizationFrozen,
  onUnfreezeCustomizer,
}) => {
  const isFrontPage = currentStep === 1;

  return (
    <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40 flex items-center gap-1.5 sm:gap-2 flex-wrap max-w-[calc(100vw-80px)]">
      {/* 5-Step Interactive Jump Indicators - Hidden on front page (Step 1) as requested */}
      {!isFrontPage && (
        <div className="px-2.5 py-1 sm:py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-xl flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-white shadow-lg animate-fadeIn">
          <span className="text-pink-300 font-bold hidden sm:inline mr-1 text-[11px] sm:text-xs">
            Step {currentStep} of {totalSteps}:
          </span>
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onJumpToStep?.(s)}
              title={`Jump to Step ${s}: ${STEP_NAMES[s]}`}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] sm:text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                currentStep === s
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-110 ring-2 ring-pink-400/50'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="text-slate-300 hidden md:inline font-normal text-xs pl-1">
            • {STEP_NAMES[currentStep]}
          </span>
        </div>
      )}

      {/* Customization Studio Button - Only shown when NOT frozen */}
      {!isCustomizationFrozen ? (
        <button
          onClick={onOpenCustomizer}
          title="Open Customizer to edit all 5 steps, names, letters, and theme"
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 border border-pink-400/50 backdrop-blur-xl text-white flex items-center gap-1.5 text-xs font-bold shadow-lg shadow-pink-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Sliders className="w-3.5 h-3.5 text-white" />
          <span>{isFrontPage ? 'Customize Gift' : 'Customize Steps'}</span>
        </button>
      ) : null}

      {/* QR Code generator trigger button */}
      <button
        onClick={onOpenQR}
        title="Generate & Download Printable QR Code"
        className="px-2.5 sm:px-3 py-1.5 rounded-full bg-black/50 hover:bg-white/10 border border-white/15 backdrop-blur-xl text-slate-200 hover:text-white flex items-center gap-1.5 text-xs font-semibold shadow-md transition-colors cursor-pointer"
      >
        <QrCode className="w-3.5 h-3.5 text-amber-300" />
        <span className="hidden sm:inline">QR Code</span>
      </button>

      {/* Mobile Simulator Toggle Button */}
      {onToggleMobileSimulator && (
        <button
          onClick={onToggleMobileSimulator}
          title={isMobileSimulator ? 'Switch back to Full Screen' : 'Test on Phone View (Mobile Simulator)'}
          className={`px-2.5 sm:px-3 py-1.5 rounded-full border backdrop-blur-xl flex items-center gap-1.5 text-xs font-semibold shadow-md transition-all cursor-pointer ${
            isMobileSimulator
              ? 'bg-blue-600 text-white border-blue-400 shadow-blue-500/30'
              : 'bg-black/50 hover:bg-white/10 border-white/15 text-slate-200 hover:text-white'
          }`}
        >
          <Smartphone className={`w-3.5 h-3.5 ${isMobileSimulator ? 'text-white' : 'text-sky-300'}`} />
          <span className="hidden sm:inline">{isMobileSimulator ? 'Full Screen' : 'Phone View'}</span>
        </button>
      )}

      {/* AI Music Studio Button */}
      <button
        onClick={onOpenMusicStudio}
        title="Open Lyria AI Music Studio"
        className="px-2.5 sm:px-3 py-1.5 rounded-full bg-pink-950/60 hover:bg-pink-900/70 border border-pink-500/40 backdrop-blur-xl text-pink-200 hover:text-white flex items-center gap-1.5 text-xs font-semibold shadow-md transition-all cursor-pointer"
      >
        <Music className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
        <span className="hidden md:inline">AI Music</span>
      </button>

      {/* Guide trigger button */}
      <button
        onClick={onOpenGuide}
        title="View Instructions & Printing Guide"
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-black/40 hover:bg-white/10 border border-white/15 backdrop-blur-xl text-slate-300 hover:text-white flex items-center gap-1 text-xs font-medium shadow-md transition-colors cursor-pointer"
      >
        <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
        <span className="hidden lg:inline">Guide</span>
      </button>
    </div>
  );
};
