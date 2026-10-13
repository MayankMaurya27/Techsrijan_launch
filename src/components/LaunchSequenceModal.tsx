import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, RotateCcw, Sparkles, Trophy, Calendar, MapPin, Zap, Rocket, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundFX';

interface LaunchSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchSequenceModal: React.FC<LaunchSequenceModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'countdown' | 'video' | 'launched'>('countdown');
  const [count, setCount] = useState<number>(3);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasTriggeredEndRef = useRef<boolean>(false);

  // Trigger rich confetti celebration
  const triggerConfettiShower = () => {
    const end = Date.now() + 3.0 * 1000;
    const colors = ['#f59e0b', '#ef4444', '#ffffff', '#fbbf24', '#ea580c', '#38bdf8'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Center explosive bursts
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.55 },
      colors,
    });
  };

  // Handle countdown sequence
  useEffect(() => {
    if (!isOpen) {
      setPhase('countdown');
      setCount(3);
      hasTriggeredEndRef.current = false;
      return;
    }

    setPhase('countdown');
    setCount(3);
    hasTriggeredEndRef.current = false;
    soundEngine.playCountdownTick(3);

    const timer1 = setTimeout(() => {
      setCount(2);
      soundEngine.playCountdownTick(2);
    }, 1000);

    const timer2 = setTimeout(() => {
      setCount(1);
      soundEngine.playCountdownTick(1);
    }, 2000);

    const timer3 = setTimeout(() => {
      setCount(0);
      soundEngine.playWarpExplosion();
      setPhase('video');
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  // Handle video autoplay with default audio and universal browser fallback
  useEffect(() => {
    let safetyTimer: NodeJS.Timeout | null = null;

    if (phase === 'video') {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.muted = false;
        video.volume = 1.0;

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Playback with audio prevented by browser policy, fallback to muted:', err);
            // Universal fallback for strict Safari / iOS / low-power mobile browsers
            video.muted = true;
            video.play().catch((e) => console.error('Video play error:', e));
          });
        }
      }

      // Hard safety timer: Video is 11.60s, so at 11.8s we ensure handleVideoEnd triggers
      safetyTimer = setTimeout(() => {
        handleVideoEnd();
      }, 11800);
    }

    return () => {
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [phase]);

  // Cut before the last 30-50 milliseconds and transition to celebration + open new tab
  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const remainingTime = videoRef.current.duration - videoRef.current.currentTime;
      if (remainingTime <= 0.05) {
        handleVideoEnd();
      }
    }
  };

  const handleVideoEnd = () => {
    if (hasTriggeredEndRef.current) return;
    hasTriggeredEndRef.current = true;

    // Open techsrijan.org in a NEW tab
    try {
      window.open('https://techsrijan.org', '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked by browser:', e);
    }

    // Switch current tab to the premium celebration screen
    setPhase('launched');
    soundEngine.playLaunchImpact();
    triggerConfettiShower();
  };




  const handleReplay = () => {
    hasTriggeredEndRef.current = false;
    setPhase('countdown');
    setCount(3);
    soundEngine.playCountdownTick(3);

    const timer1 = setTimeout(() => {
      setCount(2);
      soundEngine.playCountdownTick(2);
    }, 1000);

    const timer2 = setTimeout(() => {
      setCount(1);
      soundEngine.playCountdownTick(1);
    }, 2000);

    const timer3 = setTimeout(() => {
      setCount(0);
      soundEngine.playWarpExplosion();
      setPhase('video');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center bg-black select-none overflow-hidden"
    >
      {/* =========================================================================
          PHASE 1: Visual Animated 3-Second Cinematic Countdown
          ========================================================================= */}
      {phase === 'countdown' && (
        <div className="relative flex flex-col items-center justify-center text-center px-4 w-full h-full bg-black/95 backdrop-blur-2xl">
          {/* Atmospheric background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.25)_0,transparent_70%)] pointer-events-none" />

          {/* Close button during countdown */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-20 cursor-pointer"
            title="Cancel Launch"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Holographic Circular Energy Ring HUD */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Outer Rotating Energy Ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-orange-500/30 border-t-amber-400 border-r-orange-500 animate-spin"
              style={{ animationDuration: '4s' }}
            />

            {/* Inner Reverse Rotating Ring */}
            <div
              className="absolute inset-3 sm:inset-5 rounded-full border border-dashed border-red-500/40 animate-spin"
              style={{ animationDuration: '7s', animationDirection: 'reverse' }}
            />

            {/* Pulsing Shockwave Aura on Each Beat */}
            <div
              key={`shockwave-${count}`}
              className="absolute inset-0 rounded-full bg-orange-600/20 blur-xl animate-ping pointer-events-none"
              style={{ animationDuration: '1s' }}
            />

            {/* SVG Countdown Progress Arc */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-zinc-900 fill-none"
                strokeWidth="4"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-amber-400 fill-none transition-all duration-1000 ease-linear"
                strokeWidth="5"
                strokeDasharray="1000"
                strokeDashoffset={1000 - ((4 - count) / 3) * 1000}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 10px #f59e0b)' }}
              />
            </svg>

            {/* Center Animated Giant Countdown Number */}
            <div
              key={`count-${count}`}
              className="relative z-10 flex flex-col items-center justify-center animate-count-pop"
            >
              <span
                className="font-cinzel text-7xl sm:text-9xl md:text-[140px] font-black tracking-tight"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #fbbf24 45%, #ea580c 85%, #7f1d1d 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.8)) drop-shadow(0 4px 16px rgba(0,0,0,0.95))',
                }}
              >
                {count > 0 ? count : '⚡'}
              </span>
            </div>
          </div>

          {/* Phase HUD Status Text */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-[0.35em] uppercase text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]">
              {count === 3 && 'INITIATING LAUNCH SEQUENCE'}
              {count === 2 && 'DISENGAGING DIMENSIONAL SEALS'}
              {count === 1 && 'PORTAL IGNITION ENGAGED'}
              {count === 0 && 'AWAKENING BEGINS'}
            </span>

            {/* Ticking dots */}
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full transition-colors ${count <= 3 ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-zinc-800'}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${count <= 2 ? 'bg-orange-500 shadow-[0_0_8px_#ea580c]' : 'bg-zinc-800'}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${count <= 1 ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-zinc-800'}`} />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 2: Full Width, Full Screen Clean Video Playback
          (NO overlays, NO text, Full Audio default, auto-redirect on finish)
          ========================================================================= */}
      {phase === 'video' && (
        <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src="/launch-video.mp4"
            playsInline
            autoPlay
            preload="auto"
            controls={false}
            disablePictureInPicture
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnd}
            className="w-full h-full w-screen h-screen object-cover"
          />
        </div>
      )}


      {/* =========================================================================
          PHASE 3: Premium Launched Celebration Screen (On Current Tab)
          ========================================================================= */}
      {phase === 'launched' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-8 text-center bg-black/95 backdrop-blur-2xl overflow-y-auto">
          {/* Cosmic Nebula Radiance Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.25)_0,rgba(220,38,38,0.18)_35%,rgba(0,0,0,0.98)_75%)] pointer-events-none" />

          {/* Animated Background Energy Ring */}
          <div
            className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full border border-orange-500/10 animate-spin pointer-events-none"
            style={{ animationDuration: '40s' }}
          />
          <div
            className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-amber-500/10 animate-spin pointer-events-none"
            style={{ animationDuration: '25s', animationDirection: 'reverse' }}
          />

          {/* Close / Return Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-20 cursor-pointer"
            title="Return to Launchpad"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Center Card Content */}
          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center animate-fade-in py-4">
            {/* Live Status Holographic Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/60 via-amber-950/40 to-emerald-950/60 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.22em] text-emerald-300 uppercase">
                DIMENSIONAL PORTAL ACTIVE • SYSTEM LIVE
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </div>

            {/* Grand Announcement Title with Golden Shimmer */}
            <h1
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black tracking-wide leading-tight mb-2 animate-gold-shimmer"
              style={{
                filter: 'drop-shadow(0 0 35px rgba(245, 158, 11, 0.75)) drop-shadow(0 4px 16px rgba(0,0,0,0.95))',
              }}
            >
              TECHSRIJAN'27
            </h1>

            {/* Flanked Banner Subtitle */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
              <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-red-500" />
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-bounce" />
                <span className="font-cinzel text-base sm:text-xl md:text-2xl font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_10px_rgba(239,68,68,0.9)]">
                  OFFICIALLY LAUNCHED
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-red-500" />
            </div>

            {/* Creative Cinematic Lore Passage */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed mb-7 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2">
              "The sacred gateway has awakened. From the cradle of innovation at Madan Mohan Malaviya University of Technology, Gorakhpur, North India's grandest techno-management odyssey begins. Break boundaries, seize glory, and write history."
            </p>

            {/* Key Highlights Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-xl mb-7">
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-amber-500/25 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white">30+ Arenas</span>
                <span className="text-[10px] text-zinc-400">Flagship Events</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-amber-500/25 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white">₹5,00,000+</span>
                <span className="text-[10px] text-zinc-400">Prize Odyssey</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-amber-500/25 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white">25–27 DEC</span>
                <span className="text-[10px] text-zinc-400">Grand Tech Fest</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-amber-500/25 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white">MMMUT</span>
                <span className="text-[10px] text-zinc-400">Gorakhpur</span>
              </div>
            </div>

            {/* Action Buttons Hub */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center">
              {/* Primary Direct Link to Portal in New Tab */}
              <a
                href="https://techsrijan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-500 hover:to-amber-400 text-white font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(245,158,11,0.65)] hover:shadow-[0_0_40px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Enter Portal: techsrijan.org</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Replay Launch Sequence */}
              <button
                onClick={handleReplay}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-amber-400/60 text-zinc-300 hover:text-white font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Replay Teaser</span>
              </button>
            </div>

            {/* Informational Status Badge */}
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>
                Official portal opened in your new tab. Tap the button above anytime to visit directly.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

