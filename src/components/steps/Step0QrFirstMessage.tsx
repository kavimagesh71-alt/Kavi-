import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { BirthdayGiftConfig } from '../../types';
import { THEME_CONFIGS } from '../../utils/themeStyles';
import { sound } from '../../utils/sound';
import { fireConfettiBurst, fireHeartsConfetti } from '../../utils/fx';
import { generateShareableUrl } from '../../utils/storage';
import { 
  Lock, 
  Unlock, 
  Sparkles, 
  Gift, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight,
  Eye,
  EyeOff,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  AlertTriangle
} from 'lucide-react';

interface Props {
  config: BirthdayGiftConfig;
  onNext: () => void;
  onOpenCustomizer: () => void;
  onOpenQRModal?: () => void;
  onToggleMobileSimulator?: () => void;
  isMobileSimulator?: boolean;
}

export const Step0QrFirstMessage: React.FC<Props> = ({ 
  config, 
  onNext, 
  onOpenCustomizer,
  onOpenQRModal,
  onToggleMobileSimulator,
  isMobileSimulator,
}) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.romantic;

  const isPasscodeEnabled = config.enablePasscodeLock !== false;

  // Passcode states
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(!isPasscodeEnabled);
  const [showPasscodeText, setShowPasscodeText] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);

  // Live verified QR code states
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [showQrPreview, setShowQrPreview] = useState(false);

  const targetPasscode = (config.secretPasscode || '1234').trim().toLowerCase();
  const shareUrl = generateShareableUrl(config, 'clean', 'current');

  // Generate verified QR code for this specific gift
  useEffect(() => {
    let isMounted = true;
    const generateVerifiedQr = async () => {
      try {
        const url = await QRCode.toDataURL(shareUrl, {
          width: 512,
          margin: 2,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        });
        if (isMounted) {
          setQrDataUrl(url);
        }
      } catch (err) {
        console.warn('QR generation error:', err);
      }
    };

    generateVerifiedQr();
    return () => {
      isMounted = false;
    };
  }, [config, shareUrl]);

  // Passcode verification
  const handleVerifyPasscode = (codeToTest?: string) => {
    const code = (codeToTest !== undefined ? codeToTest : enteredPasscode).trim().toLowerCase();

    // Verify against set passcode, default '1234', or blank
    if (code === targetPasscode || code === '1234' || targetPasscode === '') {
      setIsUnlocked(true);
      setPasscodeError(false);
      sound.playUnlockChime();
      fireHeartsConfetti();
    } else {
      setPasscodeError(true);
      sound.playBuzzer();
      setTimeout(() => setPasscodeError(false), 900);
    }
  };

  const handleKeypadPress = (val: string) => {
    sound.playSparkle();
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // ignore
      }
    }
    if (val === 'CLEAR') {
      setEnteredPasscode('');
      setPasscodeError(false);
    } else if (val === 'BACK') {
      setEnteredPasscode((prev) => prev.slice(0, -1));
      setPasscodeError(false);
    } else {
      const next = enteredPasscode + val;
      setEnteredPasscode(next);
      setPasscodeError(false);

      // Auto verify if exact target length reached
      if (targetPasscode.length > 0 && next.length === targetPasscode.length) {
        handleVerifyPasscode(next);
      }
    }
  };

  const handleCopyLink = async () => {
    sound.playSparkle();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleStartSurprise = () => {
    sound.startMusic(config.customAudioUrl);
    sound.playConfettiPop();
    fireConfettiBurst();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[72vh] sm:min-h-[85vh] px-2 sm:px-4 py-2 sm:py-8 max-w-xl mx-auto w-full text-center relative z-10 animate-fadeIn">
      {/* Decorative Top Badge */}
      <div 
        className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full border text-xs sm:text-sm font-medium mb-3 sm:mb-5 tracking-wide shadow-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <QrCode className="w-3.5 h-3.5 text-pink-400" />
        <span>Verified Birthday Gift QR</span>
        <Sparkles className="w-3 h-3 text-amber-300" />
      </div>

      {/* Main Glass Note Card */}
      <div className={`w-full p-4 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-2xl relative overflow-hidden ${theme.cardBg} ${theme.glow}`}>
        {/* Glow ambient background circles */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Lock/Unlock Icon Header */}
        <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-lg flex items-center justify-center">
          <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center">
            {isUnlocked ? (
              <Unlock className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-400 animate-bounce" />
            ) : (
              <Lock className="w-7 h-7 sm:w-10 sm:h-10 text-pink-300 animate-pulse" />
            )}
          </div>
        </div>

        {/* Personalized Welcome Title */}
        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-200 via-white to-amber-200 bg-clip-text text-transparent font-serif mb-1">
          Happy Birthday, {config.birthdayPersonName}! ❤️
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 font-light mb-4 sm:mb-6">
          {isUnlocked
            ? 'Passcode unlocked! Your surprise journey is ready.'
            : 'Enter the secret passcode to unlock your personalized birthday journey.'}
        </p>

        {/* ================= PASSCODE INPUT & KEYPAD ================= */}
        {!isUnlocked ? (
          <div className="space-y-4 max-w-sm mx-auto">
            {/* Input field with toggle */}
            <div className="relative">
              <div className="flex items-center justify-center gap-2">
                <input
                  type={showPasscodeText ? 'text' : 'password'}
                  value={enteredPasscode}
                  onChange={(e) => {
                    setEnteredPasscode(e.target.value);
                    setPasscodeError(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleVerifyPasscode();
                  }}
                  placeholder="Enter passcode..."
                  className={`w-full text-center text-xl sm:text-2xl font-mono tracking-widest bg-slate-950 border rounded-2xl py-3 px-4 text-white focus:outline-none transition-all ${
                    passcodeError
                      ? 'border-rose-500 ring-2 ring-rose-500/40 animate-[shake_0.4s_ease-in-out]'
                      : 'border-pink-500/40 focus:border-pink-400 focus:ring-1 focus:ring-pink-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscodeText(!showPasscodeText)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={showPasscodeText ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscodeText ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {passcodeError && (
                <p className="text-rose-400 text-xs font-semibold mt-2 flex items-center justify-center gap-1 animate-fadeIn">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incorrect code. Tap "Need a Hint?" below!</span>
                </p>
              )}
            </div>

            {/* Quick Numeric Keypad */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'BACK'].map((btn) => (
                <button
                  key={btn}
                  type="button"
                  onClick={() => handleKeypadPress(btn)}
                  className={`h-12 sm:h-13 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all cursor-pointer select-none active:scale-95 touch-manipulation flex items-center justify-center ${
                    btn === 'CLEAR' || btn === 'BACK'
                      ? 'bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300'
                      : 'bg-white/10 hover:bg-white/20 text-white shadow-sm'
                  }`}
                >
                  {btn === 'CLEAR' ? 'Clear' : btn === 'BACK' ? '⌫' : btn}
                </button>
              ))}
            </div>

            {/* Verify Button & Direct Open Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleVerifyPasscode()}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Secret Journey</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsUnlocked(true);
                  sound.playSparkle();
                  fireHeartsConfetti();
                }}
                title="Open directly without passcode"
                className="px-3.5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Direct Open</span>
              </button>
            </div>

            {/* Secret Hint */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs text-pink-300 hover:text-pink-200 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Secret Hint' : 'Need a Hint?'}</span>
              </button>

              {showHint && (
                <div className="mt-2 p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 text-xs text-pink-200 animate-fadeIn">
                  💡 {config.passcodeHint || 'Hint: Enter "1234" or your special date ❤️'}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ================= UNLOCKED CELEBRATION STATE ================= */
          <div className="space-y-4 animate-fadeIn">
            {/* Unlocked message note */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>VIP Access Granted!</span>
              </div>
              <p className="text-white text-sm font-serif">
                Welcome, {config.birthdayPersonName}. Your special surprise journey is ready!
              </p>
            </div>

            {/* First Message from Creator */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left space-y-2">
              <div className="flex items-center gap-2 text-pink-300 text-xs font-semibold">
                <Gift className="w-3.5 h-3.5" />
                <span>A special message from {config.fromName}:</span>
              </div>
              <p className="text-slate-200 text-sm font-light italic leading-relaxed whitespace-pre-line px-1">
                "{config.firstMessage}"
              </p>
            </div>

            {/* Start Birthday Surprise Button */}
            <button
              type="button"
              onClick={handleStartSurprise}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg sm:text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] cursor-pointer overflow-hidden shadow-[0_0_35px_rgba(244,63,94,0.45)]"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>Start Your Birthday Surprise</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-200" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <p className="text-xs text-slate-400 font-light">
              🔊 Background music & magical journey will begin upon tapping
            </p>
          </div>
        )}

        {/* ================= VERIFIED QR CODE SECTION ================= */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-pink-400" />
              <span>Universal Gift QR Code (For All Phones)</span>
            </span>

            <button
              type="button"
              onClick={() => setShowQrPreview(!showQrPreview)}
              className="text-xs text-pink-400 hover:text-pink-300 underline cursor-pointer"
            >
              {showQrPreview ? 'Hide QR Code' : 'View Scannable QR'}
            </button>
          </div>

          {/* QR Preview Box */}
          {showQrPreview && (
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center space-y-3 animate-fadeIn">
              <div className="w-48 h-48 mx-auto bg-white p-2.5 rounded-xl border-2 border-slate-800 shadow-md flex items-center justify-center">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Verified Gift QR Code" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xs text-slate-600">Generating QR...</span>
                )}
              </div>

              <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 py-1.5 px-2.5 rounded-xl border border-emerald-500/30 truncate select-all">
                {shareUrl}
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Link</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'URL Copied!' : 'Copy Gift URL'}</span>
                </button>

                {onOpenQRModal && (
                  <button
                    type="button"
                    onClick={onOpenQRModal}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Download Printable QR Card</span>
                  </button>
                )}

                {onToggleMobileSimulator && (
                  <button
                    type="button"
                    onClick={onToggleMobileSimulator}
                    className="px-3 py-1.5 rounded-xl bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-sky-200" />
                    <span>{isMobileSimulator ? 'Exit Phone Mode' : '📱 Test in Mobile Frame'}</span>
                  </button>
                )}
              </div>

              {/* Mobile Phone Error Helper */}
              <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-2.5 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Cannot open on phone? (Cookie / Auth Check)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  If your phone displays <span className="text-white font-medium">"Action required to load your app"</span>: tap <span className="text-pink-300 font-semibold">"Authenticate in new window"</span> or <span className="text-pink-300 font-semibold">"Close and continue"</span> on your phone screen. Or open in Chrome with your Google account.
                </p>
              </div>

              <p className="text-[11px] text-slate-400 font-mono">
                ✅ Direct public link • Instant scan on iPhone, Android & Tablets
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick links for the gift */}
      <div className="mt-5 flex items-center justify-center gap-4 text-xs text-slate-400">
        {!config.isCustomizationFrozen && (
          <>
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="hover:text-pink-300 underline underline-offset-4 transition-colors cursor-pointer"
            >
              Customize Passcode & Messages
            </button>
            {onOpenQRModal && <span>•</span>}
          </>
        )}

        {onOpenQRModal && (
          <button
            type="button"
            onClick={onOpenQRModal}
            className="hover:text-pink-300 underline underline-offset-4 transition-colors cursor-pointer"
          >
            Printable QR Card Download
          </button>
        )}
      </div>
    </div>
  );
};
