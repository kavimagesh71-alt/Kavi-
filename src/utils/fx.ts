import confetti from 'canvas-confetti';

export function fireConfettiBurst() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff4081', '#ffd700', '#00e5ff', '#76ff03', '#ff6d00', '#e040fb'],
  });
}

/**
 * Grand Finale Confetti Explosion using canvas-confetti
 * Delivers an explosive celebration with dual side cannons, center starburst,
 * and cascading colorful volleys when reaching Step 5.
 */
export function fireGrandFinaleConfettiExplosion() {
  const festiveColors = [
    '#ff1744', // radiant rose
    '#ff4081', // hot pink
    '#ffd700', // warm gold
    '#00e5ff', // electric cyan
    '#76ff03', // lime spark
    '#e040fb', // bright purple
    '#ff9100', // vivid amber
    '#ffffff', // sparkle white
  ];

  // 1. Dual side cannon blasts from bottom corners firing inwards and upwards
  confetti({
    particleCount: 90,
    angle: 60,
    spread: 80,
    startVelocity: 55,
    origin: { x: 0, y: 0.82 },
    colors: festiveColors,
    shapes: ['square', 'circle', 'star'],
    zIndex: 1500,
  });

  confetti({
    particleCount: 90,
    angle: 120,
    spread: 80,
    startVelocity: 55,
    origin: { x: 1, y: 0.82 },
    colors: festiveColors,
    shapes: ['square', 'circle', 'star'],
    zIndex: 1500,
  });

  // 2. Center explosion starburst
  setTimeout(() => {
    confetti({
      particleCount: 130,
      spread: 120,
      startVelocity: 48,
      origin: { x: 0.5, y: 0.58 },
      colors: festiveColors,
      shapes: ['star', 'circle'],
      scalar: 1.25,
      zIndex: 1500,
    });
  }, 160);

  // 3. Sustained cascading celebration fireworks rain over 3.2 seconds
  const duration = 3.2 * 1000;
  const animationEnd = Date.now() + duration;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = Math.floor(45 * (timeLeft / duration));
    
    // Left & right floating firework bursts
    confetti({
      particleCount,
      startVelocity: 35,
      spread: 360,
      ticks: 70,
      origin: { x: randomInRange(0.12, 0.4), y: Math.random() * 0.42 },
      colors: festiveColors,
      shapes: ['square', 'circle', 'star'],
      zIndex: 1500,
    });

    confetti({
      particleCount,
      startVelocity: 35,
      spread: 360,
      ticks: 70,
      origin: { x: randomInRange(0.6, 0.88), y: Math.random() * 0.42 },
      colors: festiveColors,
      shapes: ['square', 'circle', 'star'],
      zIndex: 1500,
    });
  }, 280);

  return () => {
    clearInterval(interval);
  };
}

export function fireCelebrationFireworks() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval: ReturnType<typeof setInterval> = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    // Left & Right bursts
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}

export function fireHeartsConfetti() {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.7 },
    shapes: ['star'],
    colors: ['#ff1744', '#ff4081', '#f50057', '#ff80ab', '#ffd700'],
  });
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
