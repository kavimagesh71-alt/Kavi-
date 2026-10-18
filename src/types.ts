export type RelationshipType = 
  | 'Friend' 
  | 'Best Friend' 
  | 'Brother' 
  | 'Sister' 
  | 'Lover' 
  | 'Family';

export type ThemeType = 
  | 'romantic' 
  | 'cute' 
  | 'friendship' 
  | 'funny' 
  | 'family' 
  | 'simple';

export type MusicType = 
  | 'musicbox_birthday' 
  | 'acoustic_chimes' 
  | 'festive_pop' 
  | 'custom';

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  photoUrl: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface GiftBoxItem {
  id: string;
  emoji: string;
  title: string;
  revealText: string;
  subtitle: string;
  isRealGift: boolean;
}

export interface BirthdayGiftConfig {
  birthdayPersonName: string;
  fromName: string;
  relationship: RelationshipType;
  birthdayDate: string;
  theme: ThemeType;
  enableFloatingBalloons?: boolean;
  isCustomizationFrozen?: boolean;
  
  // Step 0 & 1 - First QR Screen & Passcode Photo Lock
  firstMessage: string;
  secretPasscode?: string;
  passcodeHint?: string;
  enablePasscodeLock?: boolean;
  enablePhotoCapture?: boolean;
  userTakenPhotoUrl?: string;
  envelopeStamp?: string;

  // Step 1 - Welcome
  welcomeGreeting: string;
  welcomeSubtitle: string;

  // Step 2 - Birthday Reveal
  revealTitle?: string;
  revealSubtext: string;
  revealTagline?: string;

  // Step 3 - Personal Message
  personalMessageTitle?: string;
  personalMessage: string;
  personalMessageSignoff?: string;

  // Step 4 - Memories (5 items)
  memories: MemoryItem[];

  // Step 5 - Gallery (5-8 photos)
  galleryPhotos: GalleryPhoto[];

  // Step 6 - Reasons (5 reasons)
  reasons: string[];

  // Step 7 - 3 Gifts
  gifts: GiftBoxItem[];

  // Step 4 (Cake ritual in 5-step flow)
  cakeWishPrompt: string;
  cakeWishGrantedText?: string;
  cakeFlavor?: 'strawberry' | 'chocolate' | 'vanilla' | 'blueberry';

  // Step 5 (Special Letter in 5-step flow)
  specialLetterTitle?: string;
  specialMessage: string;
  specialLetterSignoff?: string;
  specialLetterPs?: string;
  specialLetterWaxSeal?: string;

  // Step 10 - Secret Message
  secretMessage: string;

  // Step 11 - Final Surprise
  finalWishes: string[];
  finalMessage: string;

  // Step 12 - Final Photo
  finalPhotoUrl: string;
  finalPhotoCaption: string;

  // Audio & AI Music settings
  musicTrack: MusicType;
  customAudioUrl?: string;
  generatedMusicUrl?: string;
  generatedMusicPrompt?: string;
  generatedMusicLyrics?: string;
  generatedMusicModel?: 'lyria-3-clip-preview' | 'lyria-3-pro-preview';
}

export interface JourneyModule {
  id: number; // 1 to 5
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  icon: string;
  description: string;
  stepIndices: number[];
  color: string;
  badge: string;
}

export const JOURNEY_5_MODULES: JourneyModule[] = [
  {
    id: 1,
    number: 1,
    title: 'Step 1: Passcode Gate & Secret Envelope',
    shortTitle: '1. Passcode Gate',
    subtitle: 'Secret passcode protection & scannable gift QR',
    icon: '🔒',
    description: 'Enter the secret code to open the envelope and begin the birthday surprise.',
    stepIndices: [1],
    color: 'from-pink-500 to-rose-600',
    badge: 'Step 1',
  },
  {
    id: 2,
    number: 2,
    title: 'Step 2: The Big Birthday Reveal',
    shortTitle: '2. Reveal',
    subtitle: 'Countdown, confetti fireworks & celebration music',
    icon: '🎉',
    description: 'An explosion of balloons, festive confetti, and celebratory birthday music.',
    stepIndices: [2],
    color: 'from-amber-500 to-orange-600',
    badge: 'Step 2',
  },
  {
    id: 3,
    number: 3,
    title: 'Step 3: Words From The Heart',
    shortTitle: '3. Personal Letter',
    subtitle: 'Heartfelt letter & tribute from the sender',
    icon: '💌',
    description: 'Deep expressions of love, gratitude, and heartfelt birthday wishes.',
    stepIndices: [3],
    color: 'from-purple-500 to-indigo-600',
    badge: 'Step 3',
  },
  {
    id: 4,
    number: 4,
    title: 'Step 4: Birthday Cake & Candle Ritual',
    shortTitle: '4. Birthday Cake',
    subtitle: 'Make a wish & blow out glowing candles',
    icon: '🎂',
    description: 'Interactive birthday cake where you make a wish and blow out the candles.',
    stepIndices: [4],
    color: 'from-emerald-500 to-teal-600',
    badge: 'Step 4',
  },
  {
    id: 5,
    number: 5,
    title: 'Step 5: The Special Wax-Sealed Letter',
    shortTitle: '5. Special Letter',
    subtitle: 'Handcrafted letter sealed with wax & heartfelt message',
    icon: '💌',
    description: 'A wax-sealed luxury letter addressed to the birthday person, with celebratory fireworks & keepsake share.',
    stepIndices: [5],
    color: 'from-rose-500 to-pink-600',
    badge: 'Step 5',
  },
];

export function getModuleForStep(stepIndex: number): JourneyModule {
  for (const mod of JOURNEY_5_MODULES) {
    if (mod.number === stepIndex || mod.stepIndices.includes(stepIndex)) {
      return mod;
    }
  }
  return JOURNEY_5_MODULES[0];
}

