import { ThemeType } from '../types';

export interface ThemeColors {
  background: string;
  cardBg: string;
  accent: string;
  accentGradient: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  glow: string;
  badge: string;
}

export const THEME_CONFIGS: Record<ThemeType, ThemeColors> = {
  romantic: {
    background: 'from-rose-950 via-slate-950 to-pink-950',
    cardBg: 'bg-rose-950/40 border-rose-500/20 backdrop-blur-xl',
    accent: 'text-rose-400',
    accentGradient: 'from-rose-500 via-pink-500 to-rose-600',
    textPrimary: 'text-rose-100',
    textSecondary: 'text-rose-300/80',
    border: 'border-rose-500/30',
    glow: 'shadow-[0_0_35px_rgba(244,63,94,0.35)]',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  cute: {
    background: 'from-pink-950 via-purple-950 to-fuchsia-950',
    cardBg: 'bg-fuchsia-950/40 border-pink-400/20 backdrop-blur-xl',
    accent: 'text-pink-300',
    accentGradient: 'from-pink-400 via-purple-400 to-fuchsia-500',
    textPrimary: 'text-pink-50',
    textSecondary: 'text-pink-200/80',
    border: 'border-pink-400/30',
    glow: 'shadow-[0_0_35px_rgba(236,72,153,0.35)]',
    badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  },
  friendship: {
    background: 'from-amber-950 via-slate-950 to-cyan-950',
    cardBg: 'bg-slate-900/60 border-amber-500/20 backdrop-blur-xl',
    accent: 'text-amber-400',
    accentGradient: 'from-amber-400 via-orange-400 to-yellow-500',
    textPrimary: 'text-amber-50',
    textSecondary: 'text-amber-200/80',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  funny: {
    background: 'from-violet-950 via-slate-950 to-amber-950',
    cardBg: 'bg-violet-950/50 border-yellow-400/20 backdrop-blur-xl',
    accent: 'text-yellow-300',
    accentGradient: 'from-yellow-400 via-emerald-400 to-violet-500',
    textPrimary: 'text-yellow-50',
    textSecondary: 'text-yellow-200/80',
    border: 'border-yellow-400/30',
    glow: 'shadow-[0_0_35px_rgba(250,204,21,0.35)]',
    badge: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  },
  family: {
    background: 'from-emerald-950 via-slate-950 to-teal-950',
    cardBg: 'bg-emerald-950/40 border-emerald-500/20 backdrop-blur-xl',
    accent: 'text-emerald-400',
    accentGradient: 'from-emerald-400 via-teal-400 to-amber-400',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-200/80',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_35px_rgba(52,211,153,0.35)]',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  simple: {
    background: 'from-zinc-950 via-neutral-950 to-zinc-900',
    cardBg: 'bg-zinc-900/60 border-zinc-700/40 backdrop-blur-xl',
    accent: 'text-amber-200',
    accentGradient: 'from-zinc-200 via-neutral-100 to-amber-200',
    textPrimary: 'text-zinc-100',
    textSecondary: 'text-zinc-400',
    border: 'border-zinc-700/50',
    glow: 'shadow-[0_0_35px_rgba(255,255,255,0.15)]',
    badge: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  },
};
