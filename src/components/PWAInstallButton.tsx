import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share, PlusSquare, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  variant?: 'header' | 'banner' | 'card';
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed and launched from home screen as standalone app, show subtle badge or hide
  if (isInstalled) {
    if (variant === 'banner') return null;
    return (
      <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Mobile App Installed</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 4000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // General instructions for browsers that don't emit beforeinstallprompt (e.g. desktop safari/firefox)
      setShowIOSGuide(true);
    }
  };

  const buttonText = isInstalled
    ? 'App Installed'
    : isInstallable
    ? 'Install Mobile App'
    : isIOS
    ? 'Add to Phone Home Screen'
    : 'Install as App';

  return (
    <>
      {variant === 'banner' ? (
        <div className="w-full max-w-xl mx-auto my-3 p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/70 via-purple-950/70 to-slate-950/90 border border-pink-500/40 shadow-xl flex items-center justify-between gap-3 text-left animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <span>Open Like a Real Mobile App</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </h4>
              <p className="text-[11px] text-slate-300">
                Install on iPhone or Android home screen for full-screen gifts & music!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleInstallClick}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold shrink-0 shadow-lg shadow-pink-500/30 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleInstallClick}
          title="Install as native mobile app on your phone's home screen"
          className="px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border border-pink-400/50 backdrop-blur-xl text-white flex items-center gap-1.5 text-xs font-bold shadow-md shadow-pink-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
          <span>{buttonText}</span>
        </button>
      )}

      {/* Guided Mobile Installation Sheet (For iOS Safari & General Mobile) */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-2xl text-white relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 shadow-lg mb-2 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Install on Your Phone</h3>
              <p className="text-xs text-slate-300 mt-1">
                Enjoy Anu's Birthday Journey as a full-screen app right on your phone home screen!
              </p>
            </div>

            <div className="space-y-3 bg-black/50 p-4 rounded-2xl border border-white/10 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-600/40 text-pink-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <p className="text-slate-200 pt-0.5">
                  Tap the <strong className="text-white flex items-center gap-1 inline-flex"><Share className="w-3.5 h-3.5 text-pink-400 inline" /> Share</strong> button in your phone browser toolbar (Safari or Chrome bottom bar).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-600/40 text-pink-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <p className="text-slate-200 pt-0.5">
                  Scroll down and tap <strong className="text-white flex items-center gap-1 inline-flex"><PlusSquare className="w-3.5 h-3.5 text-pink-400 inline" /> Add to Home Screen</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-pink-600/40 text-pink-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <p className="text-slate-200 pt-0.5">
                  Tap <strong className="text-emerald-400">Add</strong> in top right. Open the icon on your phone anytime!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
