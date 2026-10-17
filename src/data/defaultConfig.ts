import { BirthdayGiftConfig } from '../types';

export const defaultGiftConfig: BirthdayGiftConfig = {
  birthdayPersonName: 'Anu',
  fromName: 'Kavi',
  relationship: 'Best Friend',
  birthdayDate: 'October 24',
  theme: 'romantic',
  enableFloatingBalloons: true,
  
  firstMessage: `Happy Birthday, Anu! ❤️

This is not just a QR code...
It is a little journey I made especially for you.

Scan it and discover your surprise. 🎁

— Kavi ❤️`,

  secretPasscode: '1234',
  passcodeHint: 'Hint: Enter "1234" or your special date ❤️',
  enablePasscodeLock: true,
  enablePhotoCapture: true,

  welcomeGreeting: 'Hey Anu... 👀',
  welcomeSubtitle: 'Before you continue...\nI made something special for you. ❤️',

  revealSubtext: 'Today is your special day!\nI hope this little surprise makes you smile. 😊',

  personalMessage: `Dear Anu,

You are one of the most special people in my life.

Thank you for all the smiles, laughs, late-night talks, and beautiful memories we share.

I hope this birthday brings you boundless joy, peace, and everything your heart truly wishes for. ❤️

— Kavi`,

  memories: [
    {
      id: 'm1',
      title: 'Memory 1',
      caption: 'That unforgettable coffee date where we laughed until our stomachs hurt. ☕✨',
      photoUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm2',
      title: 'Memory 2',
      caption: 'The spontaneous sunset walk when the sky turned into cotton candy pink. 🌅💛',
      photoUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm3',
      title: 'Memory 3',
      caption: 'Celebrating your milestone achievement—I was so proud of you! 🎓🎉',
      photoUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm4',
      title: 'Memory 4',
      caption: 'Getting completely lost on that road trip and turning it into our best adventure. 🚗💨',
      photoUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm5',
      title: 'Memory 5',
      caption: 'Just quiet moments feeling grateful for having you by my side. 🌸💫',
      photoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    },
  ],

  galleryPhotos: [
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
      caption: 'Brightest smiles and warmest vibes! 🎈',
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Party lights and celebrating YOU! ✨',
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80',
      caption: 'Sweetest slice of life! 🍰',
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
      caption: 'May you dance through every year with joy! 💃🎶',
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
      caption: 'Here is to another chapter of laughter and sunshine! 🥂💖',
    },
  ],

  reasons: [
    'You always know how to make people smile, even on their gloomy days. ✨',
    'Your presence turns ordinary, boring moments into unforgettable memories. 💫',
    'You listen with your whole heart and make everyone feel valued. 🎧❤️',
    'Your courage to keep chasing your dreams inspires me constantly. 🌟',
    'Because you are uniquely, authentically YOU—irreplaceable and golden! 💛',
  ],

  gifts: [
    {
      id: 'gift-1',
      emoji: '🍕',
      title: 'Gift Box #1',
      subtitle: 'Could it be diamonds?',
      revealText: 'A Lifetime Coupon for Free Hugs (and 1 free slice of cheesy pizza whenever you request it)! 🍕🤗',
      isRealGift: false,
    },
    {
      id: 'gift-2',
      emoji: '👑',
      title: 'Gift Box #2',
      subtitle: 'Something royal...',
      revealText: 'The Official Royal Crown of "Coolest Human Being on Earth" for the entire year! 👑✨',
      isRealGift: false,
    },
    {
      id: 'gift-3',
      emoji: '💖',
      title: 'Gift Box #3',
      subtitle: 'The special one...',
      revealText: 'The real gift is... A lifetime of beautiful memories, unconditional support, and endless adventures together! ❤️',
      isRealGift: true,
    },
  ],

  cakeWishPrompt: 'Close your eyes... make the biggest wish of your heart...',
  cakeWishGrantedText: 'May your heart’s deepest wish come true this year! ❤️',
  cakeFlavor: 'strawberry',

  specialLetterTitle: 'A Special Letter For You',
  specialMessage: `Dear Anu,

No matter where life takes us,
I hope you always stay happy,
keep smiling and achieve everything
you dream about.

You deserve all the happiness
in the world. ❤️

Happy Birthday! 🎂`,
  specialLetterSignoff: 'With all my love & heart',
  specialLetterPs: 'P.S. Never forget how truly cherished and loved you are! 🌟',
  specialLetterWaxSeal: '❤️',

  envelopeStamp: '❤️',
  revealTitle: 'HAPPY BIRTHDAY',
  revealTagline: 'Today is your special day!',
  personalMessageTitle: 'A Personal Letter For You',
  personalMessageSignoff: 'With all my love & gratitude',

  secretMessage: `If you are reading this...

Just remember one thing:

You are truly special to me, more than words could ever describe. Thank you for existing! ❤️`,

  finalWishes: [
    '✨ Endless Happiness & Laughter',
    '✨ Thriving Success in All Dreams',
    '✨ Everlasting Love & Warmth',
    '✨ Peaceful Mind & Radiant Health',
    '✨ A Lifetime of Beautiful Moments',
  ],

  finalMessage: `May this year bring you all the wonder you give to the world.
Always hold onto your sparkling smile!`,

  finalPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  finalPhotoCaption: 'Keep smiling, because your smile lights up the universe! 🌟❤️',

  musicTrack: 'musicbox_birthday',
};
