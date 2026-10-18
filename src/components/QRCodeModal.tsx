import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { BirthdayGiftConfig } from '../types';
import { generateShareableUrl } from '../utils/storage';
import { PWAInstallButton } from './PWAInstallButton';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Printer, 
  Sparkles, 
  Heart, 
  QrCode as QrIcon,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

interface Props {
  config: BirthdayGiftConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<Props> = ({ config, isOpen, onClose }) => {
  const [urlMode, setUrlMode] = useState<'full' | 'clean'>('clean');
  const [urlSource, setUrlSource] = useState<'dev' | 'custom' | 'current'>('dev');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showMobileHelp, setShowMobileHelp] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const printableCardRef = useRef<HTMLDivElement>(null);

  const effectiveSource = urlSource === 'custom' && customUrl.trim() ? customUrl.trim() : urlSource;
  const activeUrl = generateShareableUrl(config, urlMode, effectiveSource);

  useEffect(() => {
    if (isOpen) {
      generateQR(activeUrl);
    }
  }, [isOpen, config, urlMode, urlSource, customUrl, activeUrl]);

  const generateQR = async (urlToEncode: string) => {
    setIsGenerating(true);
    try {
      // Generate ultra high resolution 1024x1024 QR Code with medium error correction for camera readability
      const url = await QRCode.toDataURL(urlToEncode, {
        width: 1024,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Surprise for ${config.birthdayPersonName}! 🎁`,
          text: `Scan or click to open your personalized birthday surprise journey! ❤️`,
          url: activeUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQrPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `Birthday-QR-${config.birthdayPersonName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadCardPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw luxury card background
    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 1600);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(0.5, '#1e112a');
    bgGradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 1600);

    // Card frame
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 14;
    ctx.strokeRect(60, 60, 1080, 1480);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 80, 1040, 1440);

    // Header
    ctx.fillStyle = '#fbcfe8';
    ctx.font = 'bold 54px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎁 A SPECIAL GIFT FOR YOU 🎁', 600, 220);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 68px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Happy Birthday, ${config.birthdayPersonName}!`, 600, 320);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'italic 36px Georgia, serif';
    ctx.fillText('Scan with any smartphone camera to begin your surprise ❤️', 600, 395);

    // QR Image
    const qrImg = new Image();
    qrImg.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(250, 460, 700, 700, 36);
      ctx.fill();

      ctx.drawImage(qrImg, 290, 500, 620, 620);

      // Footer
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 44px Georgia, serif';
      ctx.fillText('A magical journey is waiting for you ❤️', 600, 1270);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'italic 46px "Dancing Script", Georgia, serif';
      ctx.fillText(`— Made with love by ${config.fromName}`, 600, 1370);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '28px sans-serif';
      ctx.fillText('Point your camera lens at the QR code 📱', 600, 1450);

      const link = document.createElement('a');
      link.download = `Printable-Birthday-Card-${config.birthdayPersonName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    qrImg.src = qrDataUrl;
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-5 sm:p-8 text-white my-6 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-2 border border-pink-500/30">
            <QrIcon className="w-3.5 h-3.5" />
            <span>100% Camera-Scannable QR Code</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Your Birthday QR Code is Ready! 🎁
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Print this QR code on a card, gift box, or send it directly to {config.birthdayPersonName}
          </p>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Target Host / Cloud URL Selector for Worldwide Mobile Scanning */}
          <div className="bg-slate-950/90 p-2.5 rounded-2xl border border-pink-500/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-pink-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Mobile Scan Destination Link:</span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/30">
                100% Mobile Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setUrlSource('dev')}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold text-center transition-all cursor-pointer ${
                  urlSource === 'dev'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow ring-1 ring-pink-400/50'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>⚡ Live Mobile Cloud Link</span>
              </button>
              <button
                type="button"
                onClick={() => setUrlSource('custom')}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold text-center transition-all cursor-pointer ${
                  urlSource === 'custom'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow ring-1 ring-pink-400/50'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>✏️ Custom Domain / IP</span>
              </button>
            </div>

            {urlSource === 'custom' && (
              <div className="pt-1 animate-fadeIn">
                <input
                  type="url"
                  placeholder="Paste URL, e.g. https://mygift.com or http://192.168.1.10:3000"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full text-xs font-mono bg-black/70 border border-pink-500/40 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-pink-400"
                />
              </div>
            )}
          </div>

          {/* QR URL Mode Selector */}
          <div className="bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-1">
            <button
              type="button"
              onClick={() => setUrlMode('clean')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                urlMode === 'clean'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow ring-1 ring-pink-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>⭐ Main Gift URL (Opens for Everyone)</span>
            </button>
            <button
              type="button"
              onClick={() => setUrlMode('full')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                urlMode === 'full'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow ring-1 ring-pink-400/50'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🔗 Custom Encoded URL</span>
            </button>
          </div>

          {/* Printable Card Preview Box */}
          <div 
            ref={printableCardRef}
            className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-dashed border-rose-500/40 rounded-2xl p-5 text-center shadow-xl relative overflow-hidden"
          >
            <div className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest mb-1">
              🎁 SCAN ME 🎁
            </div>

            <h4 className="text-lg font-bold text-white mb-1">
              Happy Birthday, {config.birthdayPersonName}!
            </h4>

            <p className="text-xs text-pink-200/90 italic font-serif mb-4">
              A magical birthday surprise journey is waiting for you ❤️
            </p>

            {/* QR Code Container */}
            <div className="w-52 h-52 sm:w-56 sm:h-56 mx-auto bg-white p-3.5 rounded-2xl shadow-2xl border-4 border-slate-800 flex items-center justify-center">
              {isGenerating || !qrDataUrl ? (
                <div className="animate-spin text-slate-600 text-sm">Generating QR...</div>
              ) : (
                <img
                  src={qrDataUrl}
                  alt="Birthday Gift QR Code"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="mt-3 text-xs font-serif text-slate-300">
              — {config.fromName} ❤️
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified camera-scannable on iOS & Android</span>
            </div>
          </div>

          {/* URL Box & Test Link */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Target QR Link:</span>
              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 flex items-center gap-1 font-medium"
              >
                <span>Test Link in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="p-2 rounded-xl bg-black/60 font-mono text-[11px] text-slate-300 truncate select-all border border-white/5">
              {activeUrl}
            </div>
          </div>

          {/* Mobile Phone Troubleshooter & Error Guide */}
          <div className="rounded-2xl border border-amber-500/40 bg-amber-950/30 overflow-hidden text-left">
            <button
              type="button"
              onClick={() => setShowMobileHelp(!showMobileHelp)}
              className="w-full p-3 flex items-center justify-between text-xs font-semibold text-amber-300 hover:bg-amber-500/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>📱 Cannot open on your phone? Tap here to fix!</span>
              </div>
              {showMobileHelp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showMobileHelp && (
              <div className="p-3 pt-0 text-[11px] text-slate-300 space-y-2 border-t border-amber-500/20">
                <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 space-y-1.5">
                  <p className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Seeing "Action required / Cookie check" on your phone?</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    This is Google AI Studio's 1-time browser security check. When that page appears on your phone:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-200 font-medium">
                    <li>Tap <strong className="text-pink-300">"Authenticate in new window"</strong> or <strong className="text-pink-300">"Close and continue"</strong> on your phone.</li>
                    <li>If you use iPhone Safari, go to <span className="text-white">Settings &gt; Safari</span> and turn OFF <span className="text-white">"Prevent Cross-Site Tracking"</span>, or open the link directly in Chrome.</li>
                  </ol>
                </div>

                <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 space-y-1.5">
                  <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Want Anu to open it with ZERO Google login required?</span>
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Select <strong className="text-pink-300">"✏️ Custom Domain / IP"</strong> above, enter any public link (e.g. from Vercel, Netlify, or your own domain), and the QR code will instantly point to that open link!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* PWA Mobile App Install Prompt */}
          <div className="pt-1">
            <PWAInstallButton variant="banner" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 space-y-2.5 mt-2">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDownloadQrPng}
              disabled={!qrDataUrl}
              className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Download QR PNG</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCardPng}
              disabled={!qrDataUrl}
              className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Download Card PNG</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
