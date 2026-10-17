import React, { useState, useEffect } from 'react';
import { BirthdayGiftConfig, RelationshipType, ThemeType } from '../types';
import { resetToDefaults } from '../utils/storage';
import { 
  X, 
  Save, 
  RotateCcw, 
  Sparkles, 
  Heart, 
  Music, 
  Palette, 
  Lock,
  Mail,
  PartyPopper,
  Flame,
  FileText,
  Check,
  Eye,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export type TabType = 'all' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'theme';

interface Props {
  config: BirthdayGiftConfig;
  isOpen: boolean;
  initialTab?: TabType;
  onClose: () => void;
  onSave: (updated: BirthdayGiftConfig) => void;
  onOpenQR: () => void;
  onOpenMusicStudio: () => void;
}

const WAX_SEAL_EMOJIS = ['❤️', '🌹', '👑', '✨', '💌', '💎', '🎁', '🎂'];
const ENVELOPE_STAMPS = ['❤️', '✨', '💌', '🎁', '⭐', '🎈'];

export const CreatorPanel: React.FC<Props> = ({
  config,
  isOpen,
  initialTab = 'step1',
  onClose,
  onSave,
  onOpenQR,
  onOpenMusicStudio,
}) => {
  const [formData, setFormData] = useState<BirthdayGiftConfig>(config);
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(config);
      if (initialTab) {
        setActiveTab(initialTab);
      }
    }
  }, [isOpen, config, initialTab]);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof BirthdayGiftConfig, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyPreset = (presetType: RelationshipType) => {
    let theme: ThemeType = 'romantic';
    let firstMsg = formData.firstMessage;
    let revealTitle = 'HAPPY BIRTHDAY';
    let revealTagline = 'Today is your special day!';
    let revealSubtext = formData.revealSubtext;
    let personalTitle = 'A Personal Letter For You';
    let personalMsg = formData.personalMessage;
    let personalSignoff = 'With all my love & gratitude';
    let cakeWishPrompt = 'Close your eyes... make the biggest wish of your heart...';
    let cakeWishGranted = 'May your heart’s deepest wish come true this year! ❤️';
    let specialLetterTitle = 'A Special Letter For You';
    let specialLetterMsg = formData.specialMessage;
    let specialLetterSignoff = 'With all my love & heart';
    let specialLetterPs = 'P.S. Never forget how truly cherished and loved you are! 🌟';
    let waxSeal = '❤️';

    if (presetType === 'Lover') {
      theme = 'romantic';
      firstMsg = `Happy Birthday to my favorite person in the entire universe! ❤️\n\nThis is a special surprise journey made just for you.\n\nOpen it and discover my love for you. 🎁\n\n— Forever yours, ${formData.fromName} ❤️`;
      revealTitle = 'HAPPY BIRTHDAY MY LOVE';
      revealTagline = 'The universe is brighter because you exist.';
      revealSubtext = `Today we celebrate the most wonderful human being on earth: my love, ${formData.birthdayPersonName}. ❤️`;
      personalTitle = 'To The Love Of My Life';
      personalMsg = `My dearest ${formData.birthdayPersonName},\n\nYou are my home, my peace, and my greatest adventure.\n\nThank you for loving me, for holding my hand through everything, and for lighting up my world.\n\nHappy Birthday my love! ❤️`;
      personalSignoff = 'Forever and always yours';
      cakeWishPrompt = 'Close your eyes, make a wish, and blow the candles... ✨';
      cakeWishGranted = 'May every single dream of your heart come true! You deserve the world. ❤️';
      specialLetterTitle = '💌 My Forever Love Letter';
      specialLetterMsg = `Dear ${formData.birthdayPersonName},\n\nEvery day with you is a blessing I will never take for granted. On your birthday, I want to remind you how deeply and endlessly you are loved.\n\nYou deserve all the magic, warmth, and dreams this universe has to offer.\n\nNo matter what tomorrow brings, my heart will always choose you. Happy Birthday, my soulmate. ❤️`;
      specialLetterSignoff = 'With all my soul & heart';
      specialLetterPs = 'P.S. You will always be my favorite reason to smile. 🌹';
      waxSeal = '❤️';
    } else if (presetType === 'Best Friend') {
      theme = 'friendship';
      firstMsg = `HAPPY BIRTHDAY TO MY BEST FRIEND EVER! 🎉\n\nTo the one who knows all my secrets, shares all my crazy ideas, and makes life 1000x more fun!\n\nGet ready for your surprise! 🚀\n\n— ${formData.fromName} 🥳`;
      revealTitle = 'HAPPY BIRTHDAY BESTIE';
      revealTagline = 'Cheers to another year of legendary memories!';
      revealSubtext = `To the coolest, craziest, and most loyal best friend: have the happiest birthday ever! 🎈`;
      personalTitle = 'Words For My Best Friend';
      personalMsg = `Yo ${formData.birthdayPersonName}!\n\nI honestly don’t know what I would do without you. Through all the chaos, late-night laughs, and wild adventures, you have always had my back.\n\nCheers to another year of legendary memories! 🍻✨`;
      personalSignoff = 'Your partner-in-crime';
      cakeWishPrompt = 'Make the biggest, wildest wish for this year! 🌟';
      cakeWishGranted = 'May this year bring non-stop adventures, massive success, and zero regrets! 🚀';
      specialLetterTitle = '💌 A True Friend Letter';
      specialLetterMsg = `Dear ${formData.birthdayPersonName},\n\nThank you for being the most genuine, loyal, and hilariously wonderful friend anyone could ask for. No matter where life takes us, you will always be family to me.\n\nKeep shining, dreaming big, and conquering your goals! Happy Birthday! 🎉`;
      specialLetterSignoff = 'With total love & respect';
      specialLetterPs = 'P.S. Free pizza and lifetime laughs guaranteed on demand! 🍕';
      waxSeal = '👑';
    } else if (presetType === 'Sister' || presetType === 'Brother') {
      theme = 'cute';
      firstMsg = `Happy Birthday to my favorite sibling! 🎂✨\n\nEven though we tease each other, you know you are one of the most important people in my life.\n\nEnjoy this little surprise! 💖\n\n— ${formData.fromName}`;
      revealTitle = 'HAPPY BIRTHDAY SIBLING';
      revealTagline = 'Proud of you today and every day!';
      revealSubtext = `Wishing the most wonderful birthday to my one-and-only sibling! 🎂`;
      personalTitle = 'From Your Sibling';
      personalMsg = `Happy Birthday, ${formData.birthdayPersonName}!\n\nGrowing up with you has been the best gift. Thank you for always being there, through thick and thin.\n\nI am so proud of the person you are today. ❤️`;
      personalSignoff = 'Always in your corner';
      cakeWishPrompt = 'Make a wish and blow out the candles! 🕯️';
      cakeWishGranted = 'May this year bring immense happiness, success, and endless smiles! ✨';
      specialLetterTitle = '💌 A Sibling Keepsake Letter';
      specialLetterMsg = `Dear ${formData.birthdayPersonName},\n\nHaving you as my sibling is a lifelong treasure. I hope this birthday brings you immense happiness, endless success, and peace in your heart.\n\nI am always here for you, no matter what happens in life!\n\n— With endless love! 🎂`;
      specialLetterSignoff = 'With endless sibling love';
      specialLetterPs = 'P.S. Don’t forget to save me the largest piece of cake! 🍰';
      waxSeal = '✨';
    } else {
      theme = 'simple';
      firstMsg = `Happy Birthday, ${formData.birthdayPersonName}! 🎂\n\nWishing you a day filled with joy, peace, laughter, and beautiful surprises!\n\n— ${formData.fromName} ✨`;
      revealTitle = 'HAPPY BIRTHDAY';
      revealTagline = 'Today is your special day!';
      revealSubtext = `Wishing you a day filled with warmth, smiles, and delightful celebrations! 🎈`;
      personalTitle = 'A Personal Letter For You';
      personalMsg = `Dear ${formData.birthdayPersonName},\n\nMay this year bring you great health, boundless joy, and the fulfillment of your dreams. Happy Birthday! 🎈`;
      personalSignoff = 'Warmest wishes';
      cakeWishPrompt = 'Close your eyes and make a special birthday wish... ✨';
      cakeWishGranted = 'May every wish in your heart come true! ✨';
      specialLetterTitle = '💌 A Special Birthday Letter';
      specialLetterMsg = `Dear ${formData.birthdayPersonName},\n\nWishing you a magnificent birthday full of warmth, smiles, and blessings. Thank you for bringing so much brightness into our lives!\n\n— Best wishes, ${formData.fromName} ✨`;
      specialLetterSignoff = 'Best wishes & happiness';
      specialLetterPs = 'P.S. May your year ahead be truly golden! 🌟';
      waxSeal = '💌';
    }

    setFormData((prev) => ({
      ...prev,
      relationship: presetType,
      theme,
      firstMessage: firstMsg,
      revealTitle,
      revealTagline,
      revealSubtext,
      personalMessageTitle: personalTitle,
      personalMessage: personalMsg,
      personalMessageSignoff: personalSignoff,
      cakeWishPrompt,
      cakeWishGrantedText: cakeWishGranted,
      specialLetterTitle,
      specialMessage: specialLetterMsg,
      specialLetterSignoff,
      specialLetterPs,
      specialLetterWaxSeal: waxSeal,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all 5 steps back to default template?')) {
      const reset = resetToDefaults();
      setFormData(reset);
      onSave(reset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-5 sm:p-8 text-white my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                Customize All 5 Steps
              </h3>
              <p className="text-xs text-slate-400">
                Personalize every detail across Step 1 to Step 5
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close customizer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Relationship Theme Presets Bar */}
        <div className="mb-4 p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span>Quick 1-Click Presets (Updates text for all 5 steps):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['Best Friend', 'Lover', 'Sister', 'Brother', 'Family', 'Friend'] as RelationshipType[]).map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => handleApplyPreset(rel)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  formData.relationship === rel
                    ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated Tabs for ALL 5 STEPS */}
        <div className="flex border-b border-slate-800 gap-1.5 mb-4 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'all'
                ? 'border-b-2 border-pink-500 text-pink-300 font-bold bg-pink-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4 text-pink-400" />
            <span>All 5 Steps (Unified)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('step1')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'step1' ? 'border-b-2 border-pink-500 text-pink-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-pink-400" />
            <span>Step 1: Passcode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('step2')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'step2' ? 'border-b-2 border-amber-500 text-amber-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PartyPopper className="w-4 h-4 text-amber-400" />
            <span>Step 2: Reveal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('step3')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'step3' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Step 3: Tribute</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('step4')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'step4' ? 'border-b-2 border-amber-500 text-amber-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Step 4: Cake</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('step5')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'step5' ? 'border-b-2 border-rose-500 text-rose-300 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 text-rose-400" />
            <span>Step 5: Special Letter</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('theme')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'theme' ? 'border-b-2 border-cyan-500 text-cyan-300' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Theme & Music</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          {activeTab === 'all' && (
            <div className="p-3.5 bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-amber-900/40 border border-pink-500/30 rounded-2xl flex items-center justify-between text-xs text-pink-200">
              <span className="font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-pink-400" />
                <span>All 5 Steps Mode Active — Customize Everything on One Page</span>
              </span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                Scroll down to edit all 5 steps or click tabs above
              </span>
            </div>
          )}

          {/* STEP 1: PASSCODE GATE & NAMES */}
          {(activeTab === 'all' || activeTab === 'step1') && (
            <div className={`space-y-4 animate-fadeIn ${activeTab === 'all' ? 'p-4 sm:p-5 rounded-2xl bg-slate-950 border border-pink-500/30' : ''}`}>
              {activeTab === 'all' && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-pink-300 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-pink-400" />
                    <span>Step 1: Passcode Gate, Names & Envelope Note</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('step1')}
                    className="text-[11px] text-pink-400 hover:text-pink-300 font-semibold underline cursor-pointer"
                  >
                    Focus Tab ➔
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Birthday Person Name:
                  </label>
                  <input
                    type="text"
                    value={formData.birthdayPersonName}
                    onChange={(e) => handleTextChange('birthdayPersonName', e.target.value)}
                    placeholder="e.g. Anu"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    From Name (Sender):
                  </label>
                  <input
                    type="text"
                    value={formData.fromName}
                    onChange={(e) => handleTextChange('fromName', e.target.value)}
                    placeholder="e.g. Kavi"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Relationship:
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleTextChange('relationship', e.target.value as RelationshipType)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-pink-500 focus:outline-none"
                  >
                    <option value="Friend">Friend</option>
                    <option value="Best Friend">Best Friend</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Lover">Lover</option>
                    <option value="Family">Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Birthday Date:
                  </label>
                  <input
                    type="text"
                    value={formData.birthdayDate}
                    onChange={(e) => handleTextChange('birthdayDate', e.target.value)}
                    placeholder="e.g. October 24"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Secret Passcode Gate Settings */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-pink-400" />
                    <span>Secret Passcode Security Gate (Step 1)</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold">
                    Step 1 Gate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Secret Passcode (PIN or word):
                    </label>
                    <input
                      type="text"
                      value={formData.secretPasscode || ''}
                      onChange={(e) => handleTextChange('secretPasscode', e.target.value)}
                      placeholder="e.g. 1234 or LOVE"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Passcode Hint (Shown if they ask for help):
                    </label>
                    <input
                      type="text"
                      value={formData.passcodeHint || ''}
                      onChange={(e) => handleTextChange('passcodeHint', e.target.value)}
                      placeholder="e.g. Hint: Enter 1234 or our special date ❤️"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-1 text-xs text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.enablePasscodeLock !== false}
                      onChange={(e) => handleTextChange('enablePasscodeLock', e.target.checked)}
                      className="rounded accent-pink-500"
                    />
                    <span>Require secret passcode to unlock birthday surprise</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Step 1 Envelope First Note (Shown on envelope scan):
                </label>
                <textarea
                  rows={3}
                  value={formData.firstMessage}
                  onChange={(e) => handleTextChange('firstMessage', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Envelope Stamp Icon:
                </label>
                <div className="flex gap-2">
                  {ENVELOPE_STAMPS.map((stamp) => (
                    <button
                      key={stamp}
                      type="button"
                      onClick={() => handleTextChange('envelopeStamp', stamp)}
                      className={`w-9 h-9 rounded-xl border text-lg flex items-center justify-center transition-all cursor-pointer ${
                        (formData.envelopeStamp || '❤️') === stamp
                          ? 'border-pink-500 bg-pink-500/20 scale-110 shadow-sm'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-600'
                      }`}
                    >
                      {stamp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stepper Navigation */}
              {activeTab !== 'all' && (
                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('step2')}
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Next: Step 2 Reveal</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: BIRTHDAY REVEAL */}
          {(activeTab === 'all' || activeTab === 'step2') && (
            <div className={`space-y-4 animate-fadeIn ${activeTab === 'all' ? 'p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/30' : ''}`}>
              {activeTab === 'all' && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <PartyPopper className="w-4 h-4 text-amber-400" />
                    <span>Step 2: Big Birthday Reveal & Headlines</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('step2')}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                  >
                    Focus Tab ➔
                  </button>
                </div>
              )}
              <div className={`p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 ${activeTab === 'all' ? 'border-0 p-0 bg-transparent' : ''}`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <PartyPopper className="w-3.5 h-3.5" />
                    <span>Step 2: Big Birthday Reveal & Countdown</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                    Step 2
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Reveals the celebratory heading with festive fireworks, confetti, and floating balloons.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Reveal Title Heading:
                    </label>
                    <input
                      type="text"
                      value={formData.revealTitle || ''}
                      onChange={(e) => handleTextChange('revealTitle', e.target.value)}
                      placeholder="e.g. HAPPY BIRTHDAY or HAPPY 21ST BIRTHDAY"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-bold focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Reveal Tagline:
                    </label>
                    <input
                      type="text"
                      value={formData.revealTagline || ''}
                      onChange={(e) => handleTextChange('revealTagline', e.target.value)}
                      placeholder="e.g. Today is your special day!"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Typing Subtext / Reveal Message:
                  </label>
                  <textarea
                    rows={3}
                    value={formData.revealSubtext}
                    onChange={(e) => handleTextChange('revealSubtext', e.target.value)}
                    placeholder="Today is your special day! I hope this little surprise makes you smile. 😊"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    This text types out dynamically with typewriter sound and celebratory confetti burst.
                  </p>
                </div>

                {/* Live Preview Box */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/20 text-center">
                  <div className="text-[11px] font-semibold text-amber-300 mb-1 flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Live Step 2 Preview:</span>
                  </div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400">
                    🎉 {formData.revealTitle || 'HAPPY BIRTHDAY'} 🎉
                  </h3>
                  <div className="text-base font-serif text-white mt-1">
                    {formData.birthdayPersonName} ❤️
                  </div>
                  <div className="text-xs text-pink-200 mt-1 italic">
                    "{formData.revealTagline || 'Today is your special day!'}"
                  </div>
                </div>

                {/* Stepper Navigation */}
                {activeTab !== 'all' && (
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('step1')}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Step 1 Passcode</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('step3')}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next: Step 3 Tribute</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: PERSONAL TRIBUTE */}
          {(activeTab === 'all' || activeTab === 'step3') && (
            <div className={`space-y-4 animate-fadeIn ${activeTab === 'all' ? 'p-4 sm:p-5 rounded-2xl bg-slate-950 border border-purple-500/30' : ''}`}>
              {activeTab === 'all' && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>Step 3: Words From The Heart (Personal Letter)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('step3')}
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold underline cursor-pointer"
                  >
                    Focus Tab ➔
                  </button>
                </div>
              )}
              <div className={`p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4 ${activeTab === 'all' ? 'border-0 p-0 bg-transparent' : ''}`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Step 3: Words From The Heart (Personal Letter)</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                    Step 3
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  A personal tribute on parchment paper expressing love, cherished memories, and gratitude.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Letter Title / Heading:
                    </label>
                    <input
                      type="text"
                      value={formData.personalMessageTitle || ''}
                      onChange={(e) => handleTextChange('personalMessageTitle', e.target.value)}
                      placeholder="e.g. A Personal Letter For You"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Letter Sign-Off Closing:
                    </label>
                    <input
                      type="text"
                      value={formData.personalMessageSignoff || ''}
                      onChange={(e) => handleTextChange('personalMessageSignoff', e.target.value)}
                      placeholder="e.g. With all my love & gratitude"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Personal Letter Message:
                  </label>
                  <textarea
                    rows={6}
                    value={formData.personalMessage}
                    onChange={(e) => handleTextChange('personalMessage', e.target.value)}
                    placeholder={`Dear ${formData.birthdayPersonName},\n\nYou are one of the most special people in my life...`}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-purple-400 focus:outline-none font-serif leading-relaxed"
                  />
                </div>

                {/* Stepper Navigation */}
                {activeTab !== 'all' && (
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('step2')}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Step 2 Reveal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('step4')}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next: Step 4 Cake</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: BIRTHDAY CAKE */}
          {(activeTab === 'all' || activeTab === 'step4') && (
            <div className={`space-y-4 animate-fadeIn ${activeTab === 'all' ? 'p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/30' : ''}`}>
              {activeTab === 'all' && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Step 4: Interactive Birthday Cake & Wish Ritual</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('step4')}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                  >
                    Focus Tab ➔
                  </button>
                </div>
              )}
              <div className={`p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 ${activeTab === 'all' ? 'border-0 p-0 bg-transparent' : ''}`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Step 4: Interactive Birthday Cake & Wish Ritual</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                    Step 4
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  The recipient makes a wish and taps the glowing candles to blow them out with realistic wind whoosh sound and smoke!
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Wish Prompt Text:
                  </label>
                  <input
                    type="text"
                    value={formData.cakeWishPrompt || ''}
                    onChange={(e) => handleTextChange('cakeWishPrompt', e.target.value)}
                    placeholder="Close your eyes... make the biggest wish of your heart... ✨"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Wish Granted Celebration Text:
                  </label>
                  <input
                    type="text"
                    value={formData.cakeWishGrantedText || ''}
                    onChange={(e) => handleTextChange('cakeWishGrantedText', e.target.value)}
                    placeholder="May your heart’s deepest wish come true this year! ❤️"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cake Flavor & Color Style:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'strawberry', name: 'Strawberry', emoji: '🍓', color: 'from-pink-400 to-rose-400' },
                      { id: 'chocolate', name: 'Chocolate', emoji: '🍫', color: 'from-amber-900 to-amber-950' },
                      { id: 'vanilla', name: 'Vanilla Cream', emoji: '🍯', color: 'from-amber-200 to-yellow-200' },
                      { id: 'blueberry', name: 'Blueberry', emoji: '🫐', color: 'from-indigo-400 to-purple-400' },
                    ].map((fl) => (
                      <button
                        key={fl.id}
                        type="button"
                        onClick={() => handleTextChange('cakeFlavor', fl.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          (formData.cakeFlavor || 'strawberry') === fl.id
                            ? 'border-amber-400 bg-amber-400/20 shadow-md ring-2 ring-amber-400/30'
                            : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-lg">{fl.emoji}</div>
                        <div className="text-xs font-semibold mt-1">{fl.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stepper Navigation */}
                {activeTab !== 'all' && (
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('step3')}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Step 3 Tribute</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('step5')}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next: Step 5 Special Letter</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: SPECIAL WAX-SEALED LETTER */}
          {(activeTab === 'all' || activeTab === 'step5') && (
            <div className={`space-y-4 animate-fadeIn ${activeTab === 'all' ? 'p-4 sm:p-5 rounded-2xl bg-slate-950 border border-rose-500/40' : ''}`}>
              {activeTab === 'all' && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-rose-400" />
                    <span>Step 5: The Special Wax-Sealed Climax Letter</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('step5')}
                    className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold underline cursor-pointer"
                  >
                    Focus Tab ➔
                  </button>
                </div>
              )}
              <div className={`p-4 sm:p-5 rounded-2xl bg-slate-950 border border-rose-500/50 space-y-4 ${activeTab === 'all' ? 'border-0 p-0 bg-transparent' : ''}`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-rose-400" />
                    <span>Step 5: The Special Wax-Sealed Letter (Grand Climax)</span>
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-300 font-bold border border-rose-500/40">
                    Step 5 Finale Letter
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  The culminating climax! A 3D wax-sealed letter addressed to {formData.birthdayPersonName}. When tapped, the wax seal breaks and unfolds into this handwritten parchment letter.
                </p>

                {/* Wax Seal Emoji Picker */}
                <div>
                  <label className="block text-xs font-semibold text-rose-200 mb-1.5 flex items-center gap-1.5">
                    <span>Wax Seal Stamp Icon:</span>
                    <span className="text-slate-400 font-normal">(Shown on the 3D red wax seal)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {WAX_SEAL_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleTextChange('specialLetterWaxSeal', emoji)}
                        className={`w-10 h-10 rounded-xl border text-xl flex items-center justify-center transition-all cursor-pointer ${
                          (formData.specialLetterWaxSeal || '❤️') === emoji
                            ? 'border-rose-400 bg-rose-500/30 scale-110 shadow-lg ring-2 ring-rose-400/50'
                            : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Letter Title:
                    </label>
                    <input
                      type="text"
                      value={formData.specialLetterTitle || ''}
                      onChange={(e) => handleTextChange('specialLetterTitle', e.target.value)}
                      placeholder="e.g. 💌 A Special Letter For You"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-rose-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Letter Sign-Off Closing:
                    </label>
                    <input
                      type="text"
                      value={formData.specialLetterSignoff || ''}
                      onChange={(e) => handleTextChange('specialLetterSignoff', e.target.value)}
                      placeholder="e.g. With all my love & heart"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Special Letter Handwritten Content:
                  </label>
                  <textarea
                    rows={8}
                    value={formData.specialMessage || ''}
                    onChange={(e) => handleTextChange('specialMessage', e.target.value)}
                    placeholder={`Dear ${formData.birthdayPersonName},\n\nNo matter where life takes us, I hope you always stay happy, keep smiling and achieve everything you dream about.\n\nYou deserve all the happiness in the world. ❤️\n\nHappy Birthday! 🎂`}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-rose-400 focus:outline-none font-serif leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Special P.S. Note:
                  </label>
                  <input
                    type="text"
                    value={formData.specialLetterPs || ''}
                    onChange={(e) => handleTextChange('specialLetterPs', e.target.value)}
                    placeholder="e.g. P.S. Never forget how truly cherished and loved you are! 🌟"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-rose-400 focus:outline-none font-serif italic"
                  />
                </div>

                {/* Live Step 5 Parchment Preview */}
                <div className="p-4 rounded-2xl bg-amber-50 text-slate-900 border-2 border-amber-300 shadow-md">
                  <div className="flex items-center justify-between border-b border-amber-300/80 pb-2 mb-2 text-xs font-serif">
                    <span className="font-bold flex items-center gap-1 text-slate-700">
                      <span>{formData.specialLetterWaxSeal || '❤️'}</span>
                      <span>{formData.specialLetterTitle || '💌 A Special Letter For You'}</span>
                    </span>
                    <span className="text-rose-700 font-semibold">{formData.birthdayDate || 'Your Special Day'}</span>
                  </div>
                  <p className="font-serif italic text-xs leading-relaxed text-slate-800 line-clamp-3">
                    {formData.specialMessage || `Dear ${formData.birthdayPersonName}, No matter where life takes us...`}
                  </p>
                  <div className="mt-2 pt-2 border-t border-amber-200 flex justify-between items-center text-xs font-serif text-slate-700">
                    <span className="italic">{formData.specialLetterSignoff || 'With all my love & heart'},</span>
                    <span className="font-bold text-slate-900">— {formData.fromName} ❤️</span>
                  </div>
                  {formData.specialLetterPs && (
                    <div className="mt-1 text-[11px] font-serif italic text-rose-800">
                      {formData.specialLetterPs}
                    </div>
                  )}
                </div>

                {/* Stepper Navigation */}
                {activeTab !== 'all' && (
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab('step4')}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Step 4 Cake</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('theme')}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next: Theme & Music</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* THEME & AI MUSIC */}
          {(activeTab === 'all' || activeTab === 'theme') && (
            <div className={`space-y-6 animate-fadeIn ${activeTab === 'all' ? 'p-4 sm:p-5 rounded-2xl bg-slate-950 border border-cyan-500/30' : ''}`}>
              {activeTab === 'all' && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-cyan-400" />
                    <span>Visual Theme, Floating Balloons & Audio</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('theme')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold underline cursor-pointer"
                  >
                    Focus Tab ➔
                  </button>
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Visual Theme:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'romantic', label: 'Romantic ❤️', desc: 'Roses & glowing hearts' },
                    { id: 'cute', label: 'Cute 🥰', desc: 'Pastel violet & pink sparkles' },
                    { id: 'friendship', label: 'Friendship 🤝', desc: 'Warm amber & vibrant vibes' },
                    { id: 'funny', label: 'Funny 😂', desc: 'Playful neon & confetti' },
                    { id: 'family', label: 'Family 👨‍👩‍👧', desc: 'Velvet emerald & royal gold' },
                    { id: 'simple', label: 'Simple ✨', desc: 'Minimalist & elegant' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleTextChange('theme', t.id as ThemeType)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.theme === t.id
                          ? 'border-pink-500 bg-pink-500/20 shadow-md ring-2 ring-pink-500/40'
                          : 'border-white/10 bg-slate-950 hover:border-white/20'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">{t.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Balloons Background Toggle */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <span>🎈 Floating Balloons Background Effect</span>
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Persistent floating balloons across all 5 steps with tap-to-pop festive interactions
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableFloatingBalloons !== false}
                  onChange={(e) => handleTextChange('enableFloatingBalloons', e.target.checked)}
                  className="w-5 h-5 accent-pink-500 rounded cursor-pointer"
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-pink-400" />
                    <span>Background Music & AI Soundtrack:</span>
                  </span>
                  <button
                    type="button"
                    onClick={onOpenMusicStudio}
                    className="px-2.5 py-1 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Open AI Music Studio (Lyria)</span>
                  </button>
                </h4>
                <div className="space-y-3">
                  {formData.customAudioUrl ? (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/60 to-purple-950/60 border border-pink-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎵</span>
                          <div>
                            <p className="text-xs font-bold text-white">Custom Soundtrack Active</p>
                            <p className="text-[11px] text-pink-300 font-mono truncate max-w-xs">
                              {formData.generatedMusicModel ? `Generated with ${formData.generatedMusicModel}` : 'Custom Audio URL'}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleTextChange('customAudioUrl', '');
                            handleTextChange('generatedMusicUrl', '');
                          }}
                          className="text-[11px] text-rose-400 hover:text-rose-300 underline cursor-pointer"
                        >
                          Reset to Synth
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">Soft Kalimba / Music Box Synthesizer</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          Built-in Happy Birthday melody is pre-configured and 100% reliable offline.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onOpenMusicStudio}
                        className="px-2.5 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-xs font-semibold shrink-0 cursor-pointer"
                      >
                        Generate AI Track
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Direct Audio URL (MP3/WAV):
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/birthday-song.mp3"
                      value={formData.customAudioUrl || ''}
                      onChange={(e) => handleTextChange('customAudioUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white text-xs focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Stepper Navigation */}
              {activeTab !== 'all' && (
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('step5')}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Step 5 Special Letter</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save All 5 Steps</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-4 gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                handleSave();
                onOpenQR();
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Generate QR</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Preview</span>
            </button>
          </div>
        </div>

        {/* Toast */}
        {saveToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl animate-bounce">
            Settings Saved & Applied Successfully! ❤️
          </div>
        )}
      </div>
    </div>
  );
};
