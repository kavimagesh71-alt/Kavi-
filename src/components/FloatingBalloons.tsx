import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface BalloonSpec {
  id: number;
  leftPercent: number; // 0 - 100
  size: number; // width in px
  height: number;
  duration: number; // float duration in seconds
  delay: number; // negative delay in seconds for immediate distribution
  swayDuration: number;
  swayPx: number;
  opacity: number;
  colorGrad: {
    start: string;
    end: string;
    knot: string;
    stringColor: string;
  };
  zIndex: number;
}

// 15 gracefully configured festive balloons
const BALLOON_TEMPLATES: BalloonSpec[] = [
  {
    id: 1,
    leftPercent: 4,
    size: 44,
    height: 56,
    duration: 19,
    delay: -4,
    swayDuration: 4.2,
    swayPx: 16,
    opacity: 0.8,
    colorGrad: { start: '#ff4081', end: '#f50057', knot: '#c51162', stringColor: 'rgba(255, 64, 129, 0.45)' },
    zIndex: 1,
  },
  {
    id: 2,
    leftPercent: 12,
    size: 52,
    height: 66,
    duration: 23,
    delay: -14,
    swayDuration: 5.0,
    swayPx: 22,
    opacity: 0.75,
    colorGrad: { start: '#ffd700', end: '#ffab00', knot: '#ff8f00', stringColor: 'rgba(255, 215, 0, 0.45)' },
    zIndex: 2,
  },
  {
    id: 3,
    leftPercent: 21,
    size: 38,
    height: 48,
    duration: 17,
    delay: -8,
    swayDuration: 3.8,
    swayPx: 14,
    opacity: 0.65,
    colorGrad: { start: '#00e5ff', end: '#00b0ff', knot: '#0091ea', stringColor: 'rgba(0, 229, 255, 0.45)' },
    zIndex: 1,
  },
  {
    id: 4,
    leftPercent: 30,
    size: 56,
    height: 72,
    duration: 25,
    delay: -19,
    swayDuration: 5.5,
    swayPx: 26,
    opacity: 0.82,
    colorGrad: { start: '#e040fb', end: '#aa00ff', knot: '#7b1fa2', stringColor: 'rgba(224, 64, 251, 0.45)' },
    zIndex: 2,
  },
  {
    id: 5,
    leftPercent: 40,
    size: 42,
    height: 54,
    duration: 21,
    delay: -6,
    swayDuration: 4.6,
    swayPx: 18,
    opacity: 0.68,
    colorGrad: { start: '#ff6e40', end: '#ff3d00', knot: '#dd2c00', stringColor: 'rgba(255, 110, 64, 0.45)' },
    zIndex: 1,
  },
  {
    id: 6,
    leftPercent: 49,
    size: 48,
    height: 62,
    duration: 22,
    delay: -16,
    swayDuration: 4.8,
    swayPx: 20,
    opacity: 0.72,
    colorGrad: { start: '#76ff03', end: '#00e676', knot: '#00c853', stringColor: 'rgba(118, 255, 3, 0.45)' },
    zIndex: 1,
  },
  {
    id: 7,
    leftPercent: 58,
    size: 54,
    height: 70,
    duration: 24,
    delay: -10,
    swayDuration: 5.2,
    swayPx: 24,
    opacity: 0.85,
    colorGrad: { start: '#ff1744', end: '#d50000', knot: '#b71c1c', stringColor: 'rgba(255, 23, 68, 0.45)' },
    zIndex: 2,
  },
  {
    id: 8,
    leftPercent: 67,
    size: 40,
    height: 52,
    duration: 18,
    delay: -3,
    swayDuration: 4.0,
    swayPx: 15,
    opacity: 0.65,
    colorGrad: { start: '#651fff', end: '#3d5afe', knot: '#304ffe', stringColor: 'rgba(101, 31, 255, 0.45)' },
    zIndex: 1,
  },
  {
    id: 9,
    leftPercent: 75,
    size: 58,
    height: 74,
    duration: 26,
    delay: -18,
    swayDuration: 5.6,
    swayPx: 25,
    opacity: 0.8,
    colorGrad: { start: '#ffd700', end: '#ff9100', knot: '#ff6d00', stringColor: 'rgba(255, 215, 0, 0.45)' },
    zIndex: 2,
  },
  {
    id: 10,
    leftPercent: 84,
    size: 46,
    height: 60,
    duration: 20,
    delay: -12,
    swayDuration: 4.4,
    swayPx: 18,
    opacity: 0.76,
    colorGrad: { start: '#f06292', end: '#ec407a', knot: '#c2185b', stringColor: 'rgba(240, 98, 146, 0.45)' },
    zIndex: 1,
  },
  {
    id: 11,
    leftPercent: 93,
    size: 50,
    height: 64,
    duration: 21,
    delay: -7,
    swayDuration: 4.9,
    swayPx: 20,
    opacity: 0.78,
    colorGrad: { start: '#00b0ff', end: '#2979ff', knot: '#1565c0', stringColor: 'rgba(0, 176, 255, 0.45)' },
    zIndex: 2,
  },
  {
    id: 12,
    leftPercent: 16,
    size: 36,
    height: 46,
    duration: 16,
    delay: -2,
    swayDuration: 3.6,
    swayPx: 12,
    opacity: 0.55,
    colorGrad: { start: '#b388ff', end: '#7c4dff', knot: '#651fff', stringColor: 'rgba(179, 136, 255, 0.4)' },
    zIndex: 0,
  },
  {
    id: 13,
    leftPercent: 45,
    size: 38,
    height: 48,
    duration: 17,
    delay: -11,
    swayDuration: 3.9,
    swayPx: 14,
    opacity: 0.58,
    colorGrad: { start: '#ff80ab', end: '#ff4081', knot: '#f50057', stringColor: 'rgba(255, 128, 171, 0.4)' },
    zIndex: 0,
  },
  {
    id: 14,
    leftPercent: 88,
    size: 34,
    height: 44,
    duration: 15,
    delay: -15,
    swayDuration: 3.5,
    swayPx: 12,
    opacity: 0.52,
    colorGrad: { start: '#ffe57f', end: '#ffd740', knot: '#ffc400', stringColor: 'rgba(255, 229, 127, 0.4)' },
    zIndex: 0,
  },
];

interface Props {
  enabled?: boolean;
}

export const FloatingBalloons: React.FC<Props> = ({ enabled = true }) => {
  const [poppedMap, setPoppedMap] = useState<Record<number, boolean>>({});

  const handlePopBalloon = useCallback((e: React.MouseEvent, balloon: BalloonSpec) => {
    e.stopPropagation();
    if (poppedMap[balloon.id]) return;

    // Sound effect
    sound.playConfettiPop();
    sound.playSparkle();

    // Trigger mini confetti burst at balloon position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 22,
      spread: 55,
      startVelocity: 25,
      origin: { x, y },
      colors: [balloon.colorGrad.start, balloon.colorGrad.end, '#ffffff', '#ffd700'],
      zIndex: 1200,
    });

    // Mark popped
    setPoppedMap((prev) => ({ ...prev, [balloon.id]: true }));

    // Re-inflate balloon after 4.5 seconds
    setTimeout(() => {
      setPoppedMap((prev) => ({ ...prev, [balloon.id]: false }));
    }, 4500);
  }, [poppedMap]);

  if (!enabled) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {BALLOON_TEMPLATES.map((b) => {
        const isPopped = !!poppedMap[b.id];

        return (
          <div
            key={b.id}
            className="balloon-float-container absolute top-0"
            style={{
              left: `${b.leftPercent}%`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              zIndex: b.zIndex,
              // CSS variable for opacity during floating
              ['--balloon-opacity' as string]: b.opacity,
            }}
          >
            <div
              className="balloon-sway-container"
              style={{
                animationDuration: `${b.swayDuration}s`,
                ['--sway-px' as string]: `${b.swayPx}px`,
              }}
            >
              <div
                onClick={(e) => handlePopBalloon(e, b)}
                className={`relative group pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 ${
                  isPopped ? 'animate-[popBalloon_0.35s_ease-out_forwards] pointer-events-none' : ''
                }`}
                title="Tap to pop balloon! 🎈"
                style={{
                  width: `${b.size}px`,
                  height: `${b.height + 40}px`, // includes string length
                }}
              >
                {/* SVG Balloon with realistic gradient lighting, highlight shine, knot, and string */}
                <svg
                  width={b.size}
                  height={b.height + 40}
                  viewBox="0 0 100 160"
                  className="w-full h-full drop-shadow-md overflow-visible"
                >
                  <defs>
                    {/* Main 3D Balloon Gradient */}
                    <radialGradient
                      id={`balloon-grad-${b.id}`}
                      cx="38%"
                      cy="35%"
                      r="65%"
                      fx="30%"
                      fy="28%"
                    >
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                      <stop offset="25%" stopColor={b.colorGrad.start} />
                      <stop offset="85%" stopColor={b.colorGrad.end} />
                      <stop offset="100%" stopColor={b.colorGrad.knot} />
                    </radialGradient>

                    {/* Glossy specular reflection gradient */}
                    <linearGradient
                      id={`balloon-shine-${b.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Curving dangling string */}
                  <path
                    d="M 50 112 Q 44 125, 54 138 T 47 158"
                    fill="none"
                    stroke={b.colorGrad.stringColor}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Bottom knot */}
                  <polygon
                    points="45,114 55,114 50,108"
                    fill={b.colorGrad.knot}
                  />

                  {/* Main Balloon Body */}
                  <ellipse
                    cx="50"
                    cy="58"
                    rx="46"
                    ry="54"
                    fill={`url(#balloon-grad-${b.id})`}
                  />

                  {/* Upper-left glossy shine reflection */}
                  <ellipse
                    cx="34"
                    cy="36"
                    rx="14"
                    ry="24"
                    transform="rotate(-28 34 36)"
                    fill={`url(#balloon-shine-${b.id})`}
                  />

                  {/* Secondary mini reflection dot */}
                  <circle
                    cx="48"
                    cy="22"
                    r="4"
                    fill="#ffffff"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
