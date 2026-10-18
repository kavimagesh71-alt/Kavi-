import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { sound } from './utils/sound';

// Mobile Audio unlock on first touch or click
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    sound.unlockAudioOnMobile();
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('click', unlockAudio);
  };
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('click', unlockAudio, { passive: true });
}

createRoot(document.getElementById('root')!).render(<App />);
