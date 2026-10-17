import React from 'react';
import { JOURNEY_5_MODULES, JourneyModule } from '../types';
import { sound } from '../utils/sound';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Music, 
  Sparkles,
  PlayCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onSelectStep: (stepIndex: number) => void;
  onOpenMusicStudio: () => void;
}

const STEP_TITLES: Record<number, string> = {
  0: 'Mystery QR Envelope',
  1: 'Secret Welcome Greeting',
  2: 'Birthday Reveal Countdown',
  3: 'Personal Tribute Letter',
  4: 'Memory Card Match Game',
  5: 'Cherished Photo Album',
  6: '5 Reasons You Are Special',
  7: 'Mystery Gift Box Unboxing',
  8: 'Blow the Cake Candles',
  9: 'Wax-Sealed Heartfelt Letter',
  10: 'Decipher the Secret Cipher',
  11: 'Grand Confetti Celebration',
  12: 'Keepsake Photo & Digital Card',
};

export const ModuleNavigatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentStep,
  onSelectStep,
  onOpenMusicStudio,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-white/20 rounded-3xl p-5 sm:p-7 max-w-2xl w-full text-left shadow-2xl relative max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Module Navigator"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                5-Module Journey Map
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold uppercase tracking-wider">
                Full Roadmap
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Explore your birthday surprise journey organized across 5 immersive modules
            </p>
          </div>
        </div>

        {/* AI Music Studio Banner Shortcut */}
        <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/50 to-indigo-950/60 border border-pink-500/30 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-600/30 border border-pink-400/40 flex items-center justify-center shrink-0">
              <Music className="w-4 h-4 text-pink-300 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>AI Birthday Music Studio</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-500/30 text-pink-200 font-mono">Lyria</span>
              </p>
              <p className="text-[11px] text-slate-300">
                Generate 30s clips or full-length tracks with Lyria AI models!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playSparkle();
              onClose();
              onOpenMusicStudio();
            }}
            className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer shadow-md shadow-pink-600/30"
          >
            Open Studio
          </button>
        </div>

        {/* 5 Modules List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {JOURNEY_5_MODULES.map((mod: JourneyModule) => {
            const isModuleActive = mod.stepIndices.includes(currentStep);
            const isModuleCompleted = mod.stepIndices.every((s) => s < currentStep);

            return (
              <div
                key={mod.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isModuleActive
                    ? 'bg-slate-950/90 border-pink-500 shadow-lg ring-1 ring-pink-500/40'
                    : 'bg-slate-950/40 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Module Top Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                      {mod.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-white font-serif">
                          {mod.title}
                        </span>
                        {isModuleActive && (
                          <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-bold animate-pulse">
                            Active
                          </span>
                        )}
                        {isModuleCompleted && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {mod.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Start Module button */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playSparkle();
                      onSelectStep(mod.stepIndices[0]);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer border border-white/10"
                  >
                    <span>Jump to</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Micro-Steps Pill List */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/10">
                  {mod.stepIndices.map((stepIdx) => {
                    const isStepCurrent = stepIdx === currentStep;
                    const isStepDone = stepIdx < currentStep;

                    return (
                      <button
                        key={stepIdx}
                        type="button"
                        onClick={() => {
                          sound.playSparkle();
                          onSelectStep(stepIdx);
                          onClose();
                        }}
                        className={`text-xs px-2.5 py-1 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                          isStepCurrent
                            ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold shadow-md shadow-pink-500/30'
                            : isStepDone
                            ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50'
                            : 'bg-slate-800/60 border border-white/5 text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        {isStepCurrent ? (
                          <PlayCircle className="w-3.5 h-3.5 text-pink-200" />
                        ) : isStepDone ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        )}
                        <span>
                          Step {stepIdx}: {STEP_TITLES[stepIdx] || `Step ${stepIdx}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 pt-3.5 mt-4 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Currently on Step {currentStep} of 12</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
};
