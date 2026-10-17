/**
 * Web Audio API synthesizer for Birthday Music Box & Sound Effects
 * Reliable, zero external network dependency, plays instantly on any mobile device.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicIntervalId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private masterGain: GainNode | null = null;
  private isMuted = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.35;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : 0.35;
    }
    if (this.customAudio) {
      this.customAudio.muted = muted;
    }
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying && !this.isMuted;
  }

  // Play a soft kalimba / music box bell tone
  private playNote(freq: number, duration: number, timeOffset = 0, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    
    const now = this.ctx.currentTime + timeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Harmonic overtone for music box sparkle
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    overtoneGain.gain.setValueAtTime(0.001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.06, now + 0.015);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(this.masterGain);
    overtoneGain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration);
    overtone.stop(now + duration);
  }

  // Note frequency helper
  private noteFreq(note: string): number {
    const notes: Record<string, number> = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
      C6: 1046.50
    };
    return notes[note] || 440;
  }

  // Play the "Happy Birthday to you" song sequence
  public playHappyBirthdaySequence(loop = true) {
    this.initContext();
    if (!this.ctx) return;

    this.isMusicPlaying = true;

    // Melody: (Note, duration in beats)
    const melody: [string, number][] = [
      ['C4', 0.75], ['C4', 0.25], ['D4', 1], ['C4', 1], ['F4', 1], ['E4', 2],
      ['C4', 0.75], ['C4', 0.25], ['D4', 1], ['C4', 1], ['G4', 1], ['F4', 2],
      ['C4', 0.75], ['C4', 0.25], ['C5', 1], ['A4', 1], ['F4', 1], ['E4', 1], ['D4', 2],
      ['B4', 0.75], ['B4', 0.25], ['A4', 1], ['F4', 1], ['G4', 1], ['F4', 2.5]
    ];

    const beatDuration = 0.55; // tempo
    let totalTime = 0;

    const playFullSong = () => {
      if (!this.isMusicPlaying) return;
      let offset = 0;
      melody.forEach(([note, beats]) => {
        const freq = this.noteFreq(note);
        const duration = beats * beatDuration;
        this.playNote(freq, duration * 1.5, offset);
        offset += duration;
      });
      totalTime = offset;
    };

    playFullSong();

    if (loop) {
      if (this.musicIntervalId) window.clearInterval(this.musicIntervalId);
      this.musicIntervalId = window.setInterval(() => {
        if (this.isMusicPlaying) {
          playFullSong();
        }
      }, (totalTime + 1.5) * 1000);
    }
  }

  public startMusic(customUrl?: string) {
    this.initContext();
    if (customUrl && customUrl.trim() !== '') {
      try {
        if (!this.customAudio) {
          this.customAudio = new Audio(customUrl);
          this.customAudio.loop = true;
        } else {
          this.customAudio.src = customUrl;
        }
        this.customAudio.play().catch(() => {
          // Fallback to synth if audio fails
          this.playHappyBirthdaySequence(true);
        });
        this.isMusicPlaying = true;
        return;
      } catch {
        // Fallback to synth
      }
    }
    this.playHappyBirthdaySequence(true);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId) {
      window.clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMusic(customUrl?: string): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(customUrl);
      return true;
    }
  }

  // Sound Effects

  // 1. Blow Candle effect (breath whoosh + puff)
  public playCandleBlow() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Noise buffer for gentle blowing wind
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(150, this.ctx.currentTime + 0.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.15);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    whiteNoise.stop(this.ctx.currentTime + 0.85);

    // Magical chime immediately following the blow
    setTimeout(() => {
      this.playUnlockChime();
    }, 600);
  }

  // 2. Confetti pop
  public playConfettiPop() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.16);

    // follow-up sparkle
    setTimeout(() => {
      this.playSparkle();
    }, 100);
  }

  // 3. Unlock chime / magical reveal
  public playUnlockChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      this.playNote(freq, 0.6, idx * 0.08, 'sine');
    });
  }

  // 4. Sparkle tap
  public playSparkle() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = [880, 1174.66, 1396.91];
    notes.forEach((freq, idx) => {
      this.playNote(freq, 0.3, idx * 0.05, 'sine');
    });
  }

  // 5. Envelope open paper sound
  public playPaperSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.26);
  }

  // 6. Gift box unbox
  public playGiftUnbox() {
    this.playPaperSound();
    setTimeout(() => {
      this.playSparkle();
    }, 150);
  }

  // 7. Camera shutter click
  public playCameraShutter() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.06);

    setTimeout(() => {
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(320, t);
      osc2.frequency.exponentialRampToValueAtTime(80, t + 0.08);

      gain2.gain.setValueAtTime(0.5, t);
      gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(t);
      osc2.stop(t + 0.09);
    }, 70);
  }

  // 8. Wrong password buzzer
  public playBuzzer() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }
}

export const sound = new SoundEngine();
