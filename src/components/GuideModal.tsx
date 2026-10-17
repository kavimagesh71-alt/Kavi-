import React from 'react';
import { X, BookOpen, CheckCircle2, Heart, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomizer: () => void;
  onOpenQR: () => void;
}

export const GuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenCustomizer,
  onOpenQR,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'How to customize each of the 5 steps',
      content: 'Click the prominent "Customize" button at the top-left anytime. The customizer features dedicated tabs for Step 1 (Passcode & Names), Step 2 (Reveal), Step 3 (Personal Tribute), Step 4 (Birthday Cake), Step 5 (Special Wax-Sealed Letter), and Theme & AI Music!',
    },
    {
      num: 2,
      title: 'Step 1: Passcode Gate & Secret Envelope',
      content: 'Under "Step 1: Passcode", configure the recipient\'s name, sender name, secret passcode (PIN or word), and hint. The recipient must enter this passcode to unlock the surprise!',
    },
    {
      num: 3,
      title: 'Step 2 & Step 3: Reveal & Personal Tribute',
      content: 'Under "Step 2: Reveal", customize the countdown typing subtext. Under "Step 3: Tribute", write your heartfelt tribute on parchment paper with live typing animation.',
    },
    {
      num: 4,
      title: 'Step 4: Interactive Birthday Cake & Wish',
      content: 'Under "Step 4: Cake", edit the wish prompt text. The birthday person makes a wish and taps to blow out the glowing candles with authentic whoosh sound effects and sparklers!',
    },
    {
      num: 5,
      title: 'Step 5: The Special Wax-Sealed Letter',
      content: 'Under "Step 5: Special Letter", customize your handwritten grand finale letter. The recipient taps the 3D wax seal to break the seal and unfold the emotional personal letter with celebratory fireworks!',
    },
    {
      num: 6,
      title: 'How to deploy it online',
      content: 'Build the project with `npm run build`. You can host the resulting `dist` folder on Vercel, Netlify, Cloudflare Pages, GitHub Pages, or Firebase Hosting in seconds for free.',
    },
    {
      num: 7,
      title: 'How to get the website URL',
      content: 'Once deployed (or using your live shared app URL), copy the browser URL. When you use the "QR Code" button in this app, your exact personalized messages and photos are encoded directly into the shareable link so the recipient sees your exact customized version!',
    },
    {
      num: 8,
      title: 'How to generate the QR code',
      content: 'Click the "QR Code" button in the top menu or inside the Customize studio. The system automatically creates a crisp, high-resolution QR code pointing to your customized birthday gift.',
    },
    {
      num: 9,
      title: 'How to download and print the QR code',
      content: 'In the QR modal, click "Download QR PNG" for the standalone QR code, or "Download Card PNG" for a complete luxury gift card with borders and messages. Print it on photo paper or cardstock to place on a greeting card, chocolate box, or gift box.',
    },
    {
      num: 10,
      title: 'How to test the QR code from another phone',
      content: 'Open the default Camera app on any iPhone or Android phone. Point the camera lens at the printed QR code (or your computer screen). A yellow link banner will appear—tap it to verify the surprise starts smoothly from Step 0!',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-white my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <BookOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">
                Complete 10-Step Guide
              </h2>
              <p className="text-xs text-slate-400">
                Everything you need to customize, print, and gift this experience
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold flex items-center justify-center border border-pink-500/30">
                  {st.num}
                </span>
                <h3 className="text-sm font-bold text-white font-sans">
                  {st.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-8">
                {st.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-4 gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenCustomizer();
            }}
            className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Open Customizer Now</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenQR();
            }}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate & Print QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
