import React, { useState, useEffect, useRef } from 'react';
import { BirthdayGiftConfig } from '../types';
import { sound } from '../utils/sound';
import { 
  X, 
  Music, 
  Sparkles, 
  Play, 
  Pause, 
  Download, 
  Check, 
  Loader2, 
  Radio, 
  Volume2, 
  Wand2, 
  AlertCircle,
  Clock,
  Disc3
} from 'lucide-react';

interface Props {
  config: BirthdayGiftConfig;
  isOpen: boolean;
  onClose: () => void;
  onApplyMusic: (audioUrl: string, prompt?: string, lyrics?: string, model?: 'lyria-3-clip-preview' | 'lyria-3-pro-preview') => void;
}

const PRESET_STYLES = [
  {
    id: 'acoustic',
    label: 'Acoustic Guitar & Music Box',
    desc: 'Soft fingerpicking, warm kalimba bells, intimate warmth',
    prompt: 'A gentle, heartwarming acoustic fingerstyle guitar and music box birthday melody with soft harmonic chimes, emotional warmth, and uplifting acoustic tones.',
    duration: 'clip',
  },
  {
    id: 'pop',
    label: 'Joyful Festive Pop',
    desc: 'Upbeat rhythm, cheerful bells, celebratory bounce',
    prompt: 'A cheerful, energetic, and joyful birthday pop celebration soundtrack with playful rhythmic clapping, bright bells, catchy cheerful melody, and festive energy.',
    duration: 'clip',
  },
  {
    id: 'lofi',
    label: 'Cozy Lo-Fi Chill Birthday',
    desc: 'Relaxing ambient beats, vinyl crackle, sparkling piano',
    prompt: 'A cozy lo-fi chillhop birthday soundtrack featuring sweet music box melody, soft vintage rhodes piano, relaxing warm bass, and gentle vinyl warmth.',
    duration: 'clip',
  },
  {
    id: 'cinematic',
    label: 'Grand Cinematic Strings & Piano',
    desc: 'Sweeping orchestral swells, emotional celebration',
    prompt: 'An emotional cinematic birthday celebration with grand piano, soaring orchestral strings, sparkling bell chimes, and a heartfelt triumphant climax.',
    duration: 'pro',
  },
  {
    id: 'romantic',
    label: 'Romantic Candlelight Serenade',
    desc: 'Tender violin and piano, deep heartfelt emotion',
    prompt: 'A deeply romantic acoustic birthday waltz with sweet violin, tender acoustic piano, candlelight ambiance, and loving warmth.',
    duration: 'pro',
  },
];

export const AIMusicGeneratorModal: React.FC<Props> = ({
  config,
  isOpen,
  onClose,
  onApplyMusic,
}) => {
  const [model, setModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Audio playback state
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [generatedLyrics, setGeneratedLyrics] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Suggestions state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize with personalized prompt
  useEffect(() => {
    if (isOpen) {
      if (!customPrompt) {
        setCustomPrompt(
          `A celebratory, heartfelt acoustic birthday song for ${config.birthdayPersonName}, with soft acoustic guitar, sparkling music box chimes, and warm melody.`
        );
      }
      fetchSuggestions();
    }
  }, [isOpen, config.birthdayPersonName]);

  // Audio element listeners
  useEffect(() => {
    if (generatedAudioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(generatedAudioUrl);
      } else {
        audioRef.current.src = generatedAudioUrl;
      }

      const audio = audioRef.current;
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      };
    }
  }, [generatedAudioUrl]);

  if (!isOpen) return null;

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const res = await fetch('/api/music-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personName: config.birthdayPersonName,
          relationship: config.relationship,
          theme: config.theme,
        }),
      });
      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch {
      // Fallback suggestions
      setSuggestions([
        `Gentle kalimba and acoustic chords celebrating ${config.birthdayPersonName}'s magical day.`,
        `Upbeat festive acoustic pop with clapping and joyous bells.`,
        `Soft piano lullaby with twinkling music box birthday chime.`,
      ]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_STYLES[0]) => {
    sound.playSparkle();
    setModel(preset.duration === 'pro' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview');
    setCustomPrompt(preset.prompt);
  };

  const handleGenerate = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setAppliedSuccess(false);
    setGenerationProgress(10);

    const progressInterval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 90) return p;
        return p + Math.floor(Math.random() * 8) + 2;
      });
    }, 400);

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          model,
          personName: config.birthdayPersonName,
        }),
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to generate music');
      }

      // Convert base64 audio to Blob URL
      const byteCharacters = atob(data.audioData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });
      const url = URL.createObjectURL(blob);

      setGeneratedAudioUrl(url);
      setGeneratedLyrics(data.lyrics || null);
      sound.playUnlockChime();

      // Auto play preview
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 300);

    } catch (err: unknown) {
      clearInterval(progressInterval);
      const msg = err instanceof Error ? err.message : 'Error generating music';
      setErrorMsg(msg);
      sound.playPaperSound();
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !generatedAudioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleApply = () => {
    if (!generatedAudioUrl) return;
    onApplyMusic(generatedAudioUrl, customPrompt, generatedLyrics || undefined, model);
    setAppliedSuccess(true);
    sound.playUnlockChime();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleDownload = () => {
    if (!generatedAudioUrl) return;
    const a = document.createElement('a');
    a.href = generatedAudioUrl;
    a.download = `Happy_Birthday_${config.birthdayPersonName.replace(/\s+/g, '_')}_Soundtrack.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-pink-500/30 rounded-3xl p-5 sm:p-7 max-w-2xl w-full text-left shadow-2xl relative max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Music Generator"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Music className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                AI Birthday Music Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold uppercase tracking-wider">
                Lyria
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Compose custom, personalized birthday music for <span className="text-pink-300 font-semibold">{config.birthdayPersonName}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* Model Selector: lyria-3-clip-preview vs lyria-3-pro-preview */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-pink-400" />
              <span>Select Lyria Engine & Length:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  setModel('lyria-3-clip-preview');
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  model === 'lyria-3-clip-preview'
                    ? 'border-pink-500 bg-pink-500/20 ring-2 ring-pink-500/40 text-white'
                    : 'border-white/10 bg-slate-950/60 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Lyria Clip (30s)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/30 text-pink-200 font-mono">
                    lyria-3-clip-preview
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Fast, celebratory clip ideal for background chime & birthday surprise.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  setModel('lyria-3-pro-preview');
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  model === 'lyria-3-pro-preview'
                    ? 'border-purple-500 bg-purple-500/20 ring-2 ring-purple-500/40 text-white'
                    : 'border-white/10 bg-slate-950/60 hover:border-white/20 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Lyria Pro (Full Track)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-200 font-mono">
                    lyria-3-pro-preview
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Full-length studio track with rich musical structure & instruments.
                </p>
              </button>
            </div>
          </div>

          {/* Quick Style Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Musical Moods:</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESET_STYLES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="p-2.5 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-white/5 hover:border-pink-500/40 text-left transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-xs text-white truncate">{preset.label}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Music Prompt / Style Details:</span>
              </label>
              <button
                type="button"
                onClick={fetchSuggestions}
                disabled={loadingSuggestions}
                className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-1 cursor-pointer"
              >
                {loadingSuggestions ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                <span>New ideas</span>
              </button>
            </div>

            <textarea
              rows={3}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Describe the desired birthday song style, mood, and instruments..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-slate-500"
            />

            {/* Smart Suggestions Chips */}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {suggestions.slice(0, 3).map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      sound.playSparkle();
                      setCustomPrompt(sug);
                    }}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-colors cursor-pointer text-left truncate max-w-full"
                  >
                    💡 {sug}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-100">Generation Note</p>
                <p className="mt-0.5 text-rose-200/90">{errorMsg}</p>
                <p className="mt-1 text-[11px] text-rose-300">
                  Tip: Lyria music generation utilizes Google's official audio models. If using a personal API key, ensure it is set under environment secrets.
                </p>
              </div>
            </div>
          )}

          {/* Generation Progress Bar */}
          {isGenerating && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/30 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-pink-300 text-xs font-semibold">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Lyria is composing your birthday soundtrack...</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                Synthesizing audio waves with {model}...
              </p>
            </div>
          )}

          {/* Generated Audio Player */}
          {generatedAudioUrl && !isGenerating && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/30 via-slate-950 to-purple-950/30 border border-pink-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center">
                    <Disc3 className={`w-5 h-5 text-pink-400 ${isPlaying ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Track for {config.birthdayPersonName}
                    </h4>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-pink-400" />
                      {model === 'lyria-3-pro-preview' ? 'Full Track • Lyria Pro' : '30s Clip • Lyria'}
                    </span>
                  </div>
                </div>

                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="w-11 h-11 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 transition-transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>

              {/* Animated wave bars during playback */}
              {isPlaying && (
                <div className="flex items-center justify-center gap-1 h-6 py-1">
                  {[40, 70, 100, 60, 85, 45, 90, 75, 50, 95, 65, 80].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-pink-400 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 75}ms`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Lyrics or description if returned */}
              {generatedLyrics && (
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300 font-serif italic max-h-20 overflow-y-auto">
                  "{generatedLyrics}"
                </div>
              )}

              {/* Audio actions */}
              <div className="flex items-center justify-between pt-1 gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .wav</span>
                </button>

                <button
                  type="button"
                  onClick={handleApply}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    appliedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-500/20'
                  }`}
                >
                  {appliedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Soundtrack Applied!</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Set as Birthday Background Music</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 pt-4 mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-pink-500/25 transition-transform active:scale-95 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating with Lyria...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Music ({model === 'lyria-3-clip-preview' ? 'Lyria Clip' : 'Lyria Pro'})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
