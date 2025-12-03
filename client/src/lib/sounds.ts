// Sound effects utility for Investamania
export class SoundManager {
  private audioContext: AudioContext | null = null;
  private isEnabled = true;

  constructor() {
    // Initialize AudioContext on user interaction to comply with browser policies
    this.initializeAudioContext();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio not supported in this browser');
      this.isEnabled = false;
    }
  }

  private async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Generate tones using Web Audio API
  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
    if (!this.isEnabled || !this.audioContext) return;

    this.resumeAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play complex sound effects
  private playComplexTone(frequencies: number[], duration: number, type: OscillatorType = 'sine', volume: number = 0.05) {
    frequencies.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, duration / frequencies.length, type, volume), index * (duration * 1000) / frequencies.length);
    });
  }

  // Investment action sounds
  playInvestmentDrop() {
    this.playTone(800, 0.1, 'triangle', 0.08);
  }

  playInvestmentSelect() {
    this.playTone(600, 0.08, 'square', 0.06);
  }

  playAllocationChange() {
    this.playTone(400, 0.05, 'sine', 0.04);
  }

  // Market event sound
  playMarketEvent() {
    this.playComplexTone([300, 400, 350, 450], 0.6, 'sawtooth', 0.08);
  }

  // Round completion sounds
  playRoundComplete() {
    this.playComplexTone([523, 659, 784, 1047], 0.8, 'triangle', 0.1);
  }

  playPositiveGain() {
    this.playComplexTone([523, 659, 784], 0.6, 'sine', 0.08);
  }

  playNegativeGain() {
    this.playComplexTone([392, 330, 262], 0.6, 'triangle', 0.08);
  }

  // Special achievement sounds
  playEarlyVictory() {
    // Triumphant fanfare
    const melody = [523, 659, 784, 1047, 1319, 1568];
    melody.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, 0.3, 'triangle', 0.12), index * 100);
    });
  }

  playGameComplete() {
    // Victory fanfare
    const victoryMelody = [523, 523, 523, 415, 466, 523, 466, 523];
    victoryMelody.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, 0.2, 'triangle', 0.1), index * 150);
    });
  }

  playGameFail() {
    // Descending sad tones
    this.playComplexTone([392, 349, 294, 262], 1.2, 'triangle', 0.08);
  }

  // Calculate returns sound
  playCalculating() {
    // Quick ascending beeps
    const beeps = [400, 450, 500, 550, 600];
    beeps.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, 0.08, 'square', 0.06), index * 80);
    });
  }

  // Button interaction sounds
  playButtonClick() {
    this.playTone(800, 0.05, 'square', 0.04);
  }

  playButtonHover() {
    this.playTone(1000, 0.03, 'sine', 0.02);
  }

  // Toggle sound on/off
  toggleSound() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  isActive() {
    return this.isEnabled;
  }
}

// Global sound manager instance
export const soundManager = new SoundManager();