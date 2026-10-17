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

export default function App() {
  const [config, setConfig] = useState<BirthdayGiftConfig>(() => loadSavedConfig());
  const [currentStep, setCurrentStep] = useState<number>(1); // 1 to 5

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

      {/* Top Floating Controls with prominent Customize button */}
      <StepProgress
        currentStep={currentStep}
        totalSteps={5}
        onJumpToStep={handleJumpToStep}
        onOpenCustomizer={() => handleOpenCustomizer()}
        onOpenQR={() => setIsQROpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenMusicStudio={() => setIsMusicStudioOpen(true)}
      />

      <AudioToggle customAudioUrl={config.customAudioUrl} />

      {/* Main 5-Step Dynamic Birthday Experience */}
      <main className="flex-1 flex flex-col justify-center items-center py-16 px-3 sm:px-6 relative z-10 w-full">
        {/* Step 1: Passcode Gate & Secret Envelope */}
        {currentStep === 1 && (
          <Step0QrFirstMessage
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step1')}
            onOpenQRModal={() => setIsQROpen(true)}
          />
        )}

        {/* Step 2: The Big Birthday Reveal & Countdown */}
        {currentStep === 2 && (
          <Step2BirthdayReveal
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step2')}
          />
        )}

        {/* Step 3: Words From The Heart (Personal Letter) */}
        {currentStep === 3 && (
          <Step3PersonalMessage
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step3')}
          />
        )}

        {/* Step 4: Interactive Birthday Cake & Blow the Candles */}
        {currentStep === 4 && (
          <Step8BirthdayCake
            config={config}
            onNext={handleNextStep}
            onOpenCustomizer={() => handleOpenCustomizer('step4')}
          />
        )}

        {/* Step 5: The Special Wax-Sealed Letter & Grand Finale */}
        {currentStep === 5 && (
          <Step5SpecialLetter
            config={config}
            onRestart={handleRestart}
            onOpenCustomizer={() => handleOpenCustomizer('step5')}
            onOpenQR={() => setIsQROpen(true)}
            onOpenMusicStudio={() => setIsMusicStudioOpen(true)}
            onShare={handleShare}
          />
        )}
      </main>

      {/* Bottom Mini Footer */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-500 font-light flex items-center justify-center gap-4 flex-wrap px-4">
        <span>Handcrafted with ❤️ for {config.birthdayPersonName}</span>
        <span>•</span>
        <button
          onClick={() => handleOpenCustomizer()}
          className="hover:text-pink-300 transition-colors font-medium text-pink-400 cursor-pointer flex items-center gap-1"
        >
          <span>Customize Gift</span>
        </button>
        <span>•</span>
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
    </div>
  );
}
