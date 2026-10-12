// Pure Web Audio API Sound Synthesizer for Epic Cinematic Effects
class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle ambient atmospheric hum / warm ember drone
  public toggleAtmosphere(enable: boolean) {
    this.init();
    if (!this.ctx) return;

    if (!enable) {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      }
      this.isAmbientPlaying = false;
      return;
    }

    if (this.isAmbientPlaying) return;
    this.isAmbientPlaying = true;

    // Create subtle dark cinematic sub-drone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    this.ambientGain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A1

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(54.7, this.ctx.currentTime); // Slight binaural beat

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, this.ctx.currentTime);

    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
  }

  // Epic Launch sound effect: Deep impact boom, resonant brass swell & celestial chime
  public playLaunchImpact() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Sub Bass Drop Impact
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

    subGain.gain.setValueAtTime(0.4, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 2.2);

    // 2. Cinematic Brass / War Horn Swell
    const hornOsc = this.ctx.createOscillator();
    const hornFilter = this.ctx.createBiquadFilter();
    const hornGain = this.ctx.createGain();

    hornOsc.type = 'sawtooth';
    hornOsc.frequency.setValueAtTime(110, now); // A2
    hornOsc.frequency.exponentialRampToValueAtTime(164.81, now + 0.8); // E3

    hornFilter.type = 'bandpass';
    hornFilter.frequency.setValueAtTime(280, now);
    hornFilter.Q.setValueAtTime(3.5, now);

    hornGain.gain.setValueAtTime(0.001, now);
    hornGain.gain.linearRampToValueAtTime(0.2, now + 0.4);
    hornGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    hornOsc.connect(hornFilter);
    hornFilter.connect(hornGain);
    hornGain.connect(this.ctx.destination);
    hornOsc.start(now);
    hornOsc.stop(now + 2.6);

    // 3. Shimmering Chime / Sparkle
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      if (!this.ctx) return;
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(freq, now + i * 0.08);

      chimeGain.gain.setValueAtTime(0.08, now + i * 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.5);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);
      chimeOsc.start(now + i * 0.08);
      chimeOsc.stop(now + i * 0.08 + 1.6);
    });
  }

  // Subtle button click mechanical sound
  public playClick() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }
}

export const soundEngine = new CinematicAudioEngine();
