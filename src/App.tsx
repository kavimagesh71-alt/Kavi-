/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BirthdayGiftConfig } from './types';
import { loadSavedConfig, saveConfigToStorage, generateShareableUrl } from './utils/storage';
import { THEME_CONFIGS } from './utils/themeStyles';
import { sound } from './utils/sound';

// 5 Core Steps
import { Step0QrFirstMessage } from './components/steps/Step0QrFirstMessage';
import { Step2BirthdayReveal } from './components/steps/Step2BirthdayReveal';
import { Step3PersonalMessage } from './components/steps/Step3PersonalMessage';
import { Step8BirthdayCake } from './components/steps/Step8BirthdayCake';
import { Step5SpecialLetter } from './components/steps/Step5SpecialLetter';

// Modals & Controls
import { CreatorPanel, TabType } from './components/CreatorPanel';
import { QRCodeModal } from './components/QRCodeModal';
import { GuideModal } from './components/GuideModal';
import { AudioToggle } from './components/AudioToggle';
import { StepProgress } from './components/StepProgress';
import { AIMusicGeneratorModal } from './components/AIMusicGeneratorModal';
import { FloatingBalloons } from './components/FloatingBalloons';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Smartphone, Wifi, Battery, Volume2, Lock, Unlock, X, Key } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<BirthdayGiftConfig>(() => loadSavedConfig());
  const [currentStep, setCurrentStep] = useState<number>(1); // 1 to 5
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);

  // Unfreeze Creator Modal state
  const [showUnfreezeModal, setShowUnfreezeModal] = useState<boolean>(false);
  const [unfreezeCode, setUnfreezeCode] = useState<string>('');
  const [unfreezeError, setUnfreezeError] = useState<boolean>(false);

  // Modals state
  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
  const [creatorInitialTab, setCreatorInitialTab] = useState<TabType>('step1');
  const [isQROpen, setIsQROpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isMusicStudioOpen, setIsMusicStudioOpen] = useState<boolean>(false);

  // Check URL parameters on mount
  useEffect(() => {
    const loaded = loadSavedConfig();
    setConfig(loaded);
  }, []);

  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;

  const handleOpenCustomizer = (tab?: TabType) => {
    if (tab) {
      setCreatorInitialTab(tab);
    } else {
      const stepTabMap: Record<number, TabType> = {
        1: 'step1',
        2: 'step2',
        3: 'step3',
        4: 'step4',
        5: 'step5',
      };
      setCreatorInitialTab(stepTabMap[currentStep] || 'step1');
    }
    setIsCreatorOpen(true);
  };

  const handleVerifyUnfreeze = () => {
    const targetCode = (config.secretPasscode || '1234').trim().toLowerCase();
    const entered = unfreezeCode.trim().toLowerCase();
    if (entered === targetCode || entered === '1234' || targetCode === '') {
      const updated: BirthdayGiftConfig = { ...config, isCustomizationFrozen: false };
      setConfig(updated);
      saveConfigToStorage(updated);
      setShowUnfreezeModal(false);
      setUnfreezeCode('');
      setUnfreezeError(false);
      sound.playSparkle();
      handleOpenCustomizer();
    } else {
      setUnfreezeError(true);
      sound.playBuzzer();
      setTimeout(() => setUnfreezeError(false), 2000);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 5)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStep(1); // restarts to Step 1 (Passcode Gate)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveConfig = (updated: BirthdayGiftConfig) => {
    setConfig(updated);
    saveConfigToStorage(updated);
  };

  const handleApplyGeneratedMusic = (
    audioUrl: string,
    prompt?: string,
    lyrics?: string,
    model?: 'lyria-3-clip-preview' | 'lyria-3-pro-preview'
  ) => {
    const updated: BirthdayGiftConfig = {
      ...config,
      customAudioUrl: audioUrl,
      generatedMusicUrl: audioUrl,
      generatedMusicPrompt: prompt,
      generatedMusicLyrics: lyrics,
      generatedMusicModel: model,
    };
    setConfig(updated);
    saveConfigToStorage(updated);
    sound.startMusic(audioUrl);
  };

  const handleShare = async () => {
    const url = generateShareableUrl(config);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday, ${config.birthdayPersonName}! ❤️`,
          text: `Scan or click to open your personalized 5-step birthday surprise journey! 🎁`,
          url,
        });
      } catch {
        navigator.clipboard.writeText(url);
        alert('Birthday Gift URL copied to clipboard! Share it with the birthday person ❤️');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Birthday Gift URL copied to clipboard! Share it with the birthday person ❤️');
    }
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step0QrFirstMessage
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step1')}
            onOpenQRModal={() => setIsQROpen(true)}
            onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
            isMobileSimulator={isMobileSimulator}
          />
        );
      case 2:
        return (
          <Step2BirthdayReveal
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step2')}
          />
        );
      case 3:
        return (
          <Step3PersonalMessage
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step3')}
          />
        );
      case 4:
        return (
          <Step8BirthdayCake
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step4')}
          />
        );
      case 5:
        return (
          <Step5SpecialLetter
            config={config}
            onRestart={handleRestart}
            onOpenCustomizer={() => handleOpenCustomizer('step5')}
            onOpenQR={() => setIsQROpen(true)}
            onOpenMusicStudio={() => setIsMusicStudioOpen(true)}
            onShare={handleShare}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.background} text-slate-100 relative transition-colors duration-700 overflow-x-hidden selection:bg-pink-500 selection:text-white flex flex-col justify-between`}>
      {/* Floating festive balloons background persisting across all 5 steps */}
      <FloatingBalloons enabled={config.enableFloatingBalloons !== false} />

      {/* Subtle ambient lighting effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-amber-600/10 blur-[120px]" />
      </div>

      {/* Top Floating Navigation Bar */}
      <StepProgress
        currentStep={currentStep}
        totalSteps={5}
        onJumpToStep={handleJumpToStep}
        onOpenCustomizer={() => handleOpenCustomizer()}
        onOpenQR={() => setIsQROpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenMusicStudio={() => setIsMusicStudioOpen(true)}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
        isCustomizationFrozen={config.isCustomizationFrozen !== false}
        onUnfreezeCustomizer={() => setShowUnfreezeModal(true)}
      />

      {/* Top Right Controls: PWA Install & Audio */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-2">
        <PWAInstallButton variant="header" />
        <AudioToggle customAudioUrl={config.customAudioUrl} />
      </div>

      {/* Main Experience: Phone Simulator or Full-Screen Responsive View */}
      {isMobileSimulator ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 px-2 relative z-10 w-full animate-fadeIn pt-16">
          <div className="mb-2 text-center">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              📱 Interactive Mobile App Simulator (iPhone / Android)
            </span>
          </div>

          {/* Smartphone Mockup Frame */}
          <div className="w-full max-w-[390px] h-[780px] bg-slate-950 rounded-[48px] border-[8px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/10 relative overflow-hidden flex flex-col">
            {/* Phone Status Bar */}
            <div className="h-10 bg-slate-950 flex items-center justify-between px-6 pt-1 text-[11px] font-semibold text-slate-300 z-30 select-none shrink-0">
              <span>9:41</span>
              {/* Dynamic Island */}
              <div className="w-24 h-5 rounded-full bg-black border border-white/15 flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-[9px] text-pink-300 font-mono font-medium">Anu Gift</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Wifi className="w-3.5 h-3.5 text-slate-300" />
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Phone Screen Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 relative flex flex-col justify-between">
              <main className="flex-1 flex flex-col justify-center items-center py-2 px-1 w-full pb-14">
                {renderActiveStep()}
              </main>

              {/* Mobile App Bottom Nav inside simulator */}
              <div className="sticky bottom-0 left-0 right-0 z-40 mt-auto">
                <MobileBottomNav
                  currentStep={currentStep}
                  totalSteps={5}
                  onJumpToStep={handleJumpToStep}
                  onOpenCustomizer={() => handleOpenCustomizer()}
                  onOpenQR={() => setIsQROpen(true)}
                  isCustomizationFrozen={config.isCustomizationFrozen !== false}
                />
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0">
              <div className="w-28 h-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <main className="flex-1 flex flex-col justify-center items-center py-4 sm:py-16 px-2 sm:px-6 relative z-10 w-full max-w-full pb-20 sm:pb-8">
            {renderActiveStep()}
          </main>

          {/* Native Mobile App Bottom Navigation Bar for smartphones */}
          <MobileBottomNav
            currentStep={currentStep}
            totalSteps={5}
            onJumpToStep={handleJumpToStep}
            onOpenCustomizer={() => handleOpenCustomizer()}
            onOpenQR={() => setIsQROpen(true)}
            isCustomizationFrozen={config.isCustomizationFrozen !== false}
          />
        </>
      )}

      {/* PWA Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* Bottom Mini Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500 font-light flex items-center justify-center gap-4 flex-wrap px-4">
        <span>Handcrafted with ❤️ for {config.birthdayPersonName}</span>
        <span>•</span>
        {!config.isCustomizationFrozen ? (
          <>
            <button
              onClick={() => handleOpenCustomizer()}
              className="hover:text-pink-300 transition-colors font-medium text-pink-400 cursor-pointer flex items-center gap-1"
            >
              <span>Customize Gift</span>
            </button>
            <span>•</span>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowUnfreezeModal(true)}
              title="Gift customization is frozen for Anu. Click to unfreeze with creator passcode"
              className="text-slate-600 hover:text-slate-400 transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-500/70" />
              <span>Gift Frozen (Creator Edit)</span>
            </button>
            <span>•</span>
          </>
        )}
        <button
          onClick={() => setIsQROpen(true)}
          className="hover:text-pink-300 transition-colors underline underline-offset-2 cursor-pointer"
        >
          Printable QR Code
        </button>
        <span>•</span>
        <button
          onClick={() => setIsMusicStudioOpen(true)}
          className="hover:text-pink-300 transition-colors underline underline-offset-2 cursor-pointer"
        >
          AI Music Studio (Lyria)
        </button>
        <span>•</span>
        <button
          onClick={() => setIsGuideOpen(true)}
          className="hover:text-pink-300 transition-colors underline underline-offset-2 cursor-pointer"
        >
          Guide
        </button>
      </footer>

      {/* Modals */}
      <CreatorPanel
        config={config}
        isOpen={isCreatorOpen}
        initialTab={creatorInitialTab}
        onClose={() => setIsCreatorOpen(false)}
        onSave={handleSaveConfig}
        onOpenQR={() => {
          setIsCreatorOpen(false);
          setIsQROpen(true);
        }}
        onOpenMusicStudio={() => {
          setIsCreatorOpen(false);
          setIsMusicStudioOpen(true);
        }}
      />

      <QRCodeModal
        config={config}
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onOpenCustomizer={() => setIsCreatorOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
      />

      <AIMusicGeneratorModal
        config={config}
        isOpen={isMusicStudioOpen}
        onClose={() => setIsMusicStudioOpen(false)}
        onApplyMusic={handleApplyGeneratedMusic}
      />

      {/* Creator Unfreeze Modal */}
      {showUnfreezeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 text-white text-center">
            <button
              onClick={() => {
                setShowUnfreezeModal(false);
                setUnfreezeCode('');
                setUnfreezeError(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
              <Lock className="w-6 h-6 text-amber-300" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Gift Customization is Frozen
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Editing is locked so {config.birthdayPersonName} experiences the clean gift. Enter creator passcode to unfreeze:
            </p>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Enter passcode (e.g. 1234)..."
                value={unfreezeCode}
                onChange={(e) => {
                  setUnfreezeCode(e.target.value);
                  setUnfreezeError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleVerifyUnfreeze();
                }}
                className="w-full text-center text-lg font-mono bg-black/60 border border-white/20 rounded-xl py-2.5 px-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-400"
              />

              {unfreezeError && (
                <p className="text-rose-400 text-xs font-semibold animate-fadeIn">
                  Incorrect passcode. Hint: 1234
                </p>
              )}

              <button
                type="button"
                onClick={handleVerifyUnfreeze}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unfreeze & Open Customizer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
