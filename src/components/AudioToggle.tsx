import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  customAudioUrl?: string;
}

export const AudioToggle: React.FC<Props> = ({ customAudioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkState = () => {
      setIsPlaying(sound.getIsPlaying());
    };
    const interval = setInterval(checkState, 600);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const newState = sound.toggleMusic(customAudioUrl);
    setIsPlaying(newState);
  };

  return (
    <button
      onClick={handleToggle}
      title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
      className={`fixed top-4 right-4 z-40 p-2.5 sm:px-3 sm:py-2 rounded-full border backdrop-blur-xl flex items-center gap-2 shadow-lg transition-all duration-300 cursor-pointer ${
        isPlaying
          ? 'bg-rose-500/30 border-rose-400 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.35)]'
          : 'bg-black/40 border-white/15 text-slate-400 hover:text-white'
      }`}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 animate-bounce text-pink-300" />
          <span className="text-xs font-semibold hidden sm:inline">Music ON</span>
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-0.5 h-3 bg-pink-400 animate-pulse" />
            <span className="w-0.5 h-2 bg-pink-400 animate-pulse delay-75" />
            <span className="w-0.5 h-2.5 bg-pink-400 animate-pulse delay-150" />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="text-xs font-medium hidden sm:inline">Music OFF</span>
        </>
      )}
    </button>
  );
};
