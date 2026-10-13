import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, RotateCcw, Trophy, Calendar, MapPin, Zap, Rocket, Radio, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

import { soundEngine } from '../utils/soundFX';

interface LaunchSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchSequenceModal: React.FC<LaunchSequenceModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'countdown' | 'video' | 'launched'>('countdown');
  const [count, setCount] = useState<number>(3);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(3);
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);
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
      setRedirectCountdown(3);
      setHasRedirected(false);
      hasTriggeredEndRef.current = false;
      return;
    }

    setPhase('countdown');
    setCount(3);
    setRedirectCountdown(3);
    setHasRedirected(false);
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

      // Hard safety timer: Video is 9.75s, so at 10.0s we ensure handleVideoEnd triggers
      safetyTimer = setTimeout(() => {
        handleVideoEnd();
      }, 10000);
    }

    return () => {
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [phase]);

  // Cut before the last 30-50 milliseconds and transition to celebration
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

    // Switch current tab to the premium celebration screen
    setPhase('launched');
    soundEngine.playLaunchImpact();
    triggerConfettiShower();
  };

  // 2-3 seconds timer on celebration screen before automatically redirecting to techsrijan.org in the SAME tab
  useEffect(() => {
    if (phase !== 'launched') {
      setRedirectCountdown(3);
      setHasRedirected(false);
      return;
    }

    setRedirectCountdown(3);
    setHasRedirected(false);

    const interval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setHasRedirected(true);
          // Automatically redirect to techsrijan.org in the SAME tab
          try {
            window.location.assign('https://techsrijan.org');
          } catch {
            window.location.href = 'https://techsrijan.org';
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);


  const handleReplay = () => {
    hasTriggeredEndRef.current = false;
    setPhase('countdown');
    setCount(3);
    setRedirectCountdown(3);
    setHasRedirected(false);
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
          Uses assets/somewhere.png in background with high-contrast protection scrims
          ========================================================================= */}
      {phase === 'launched' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-8 text-center overflow-y-auto">
          {/* Apocalyptic Red Landscape Backdrop from assets/somewhere.png */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url('/somewhere.png')" }}
          />

          {/* Contrast-Protection Scrims: Ensures background imagery never obscures text or cards */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.5)_0,rgba(0,0,0,0.85)_75%)] pointer-events-none" />

          {/* Animated Background Energy Rings */}
          <div
            className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full border border-orange-500/20 animate-spin pointer-events-none"
            style={{ animationDuration: '40s' }}
          />
          <div
            className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-amber-500/20 animate-spin pointer-events-none"
            style={{ animationDuration: '25s', animationDirection: 'reverse' }}
          />

          {/* Close / Return Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/20 transition-colors z-30 cursor-pointer backdrop-blur-md"
            title="Return to Launchpad"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Center Content Card */}
          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center animate-fade-in py-2">
            {/* Live Status Holographic Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 rounded-full bg-black/80 border border-emerald-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.35)] mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-cinzel text-[11px] sm:text-xs font-bold tracking-[0.22em] text-emerald-300 uppercase">
                DIMENSIONAL PORTAL ACTIVE • SYSTEM LIVE
              </span>
            </div>

            {/* Grand Announcement Title with Golden Shimmer */}
            <h1
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black tracking-wide leading-tight mb-2 animate-gold-shimmer"
              style={{
                filter: 'drop-shadow(0 0 35px rgba(245, 158, 11, 0.85)) drop-shadow(0 4px 20px rgba(0,0,0,1)) drop-shadow(0 8px 30px rgba(0,0,0,0.95))',
              }}
            >
              TECHSRIJAN'27
            </h1>

            {/* Flanked Banner Subtitle */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-red-500" />
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-bounce" />
                <span className="font-cinzel text-base sm:text-xl md:text-2xl font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_12px_rgba(239,68,68,1)]">
                  OFFICIALLY LAUNCHED
                </span>
              </div>
              <div className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-red-500" />
            </div>

            {/* Creative Cinematic Lore Passage - High contrast container */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-100 max-w-xl leading-relaxed mb-6 italic drop-shadow-[0_2px_8px_rgba(0,0,0,1)] px-4 py-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
              "The sacred gateway has awakened. From the cradle of innovation at Madan Mohan Malaviya University of Technology, Gorakhpur, North India's grandest techno-management odyssey begins. Break boundaries, seize glory, and write history."
            </p>

            {/* Key Highlights Pill Grid - Frosted obsidian cards with high legibility */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-xl mb-6">
              <div className="flex flex-col items-center p-3 rounded-xl bg-black/70 border border-amber-500/35 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">30+ Arenas</span>
                <span className="text-[10px] text-zinc-300">Flagship Events</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-black/70 border border-amber-500/35 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">₹5,00,000+</span>
                <span className="text-[10px] text-zinc-300">Prize Odyssey</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-black/70 border border-amber-500/35 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">25–27 DEC</span>
                <span className="text-[10px] text-zinc-300">Grand Tech Fest</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-black/70 border border-amber-500/35 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">MMMUT</span>
                <span className="text-[10px] text-zinc-300">Gorakhpur</span>
              </div>
            </div>

            {/* Prominent 2-3s Auto-Redirect Countdown Timer Pill */}
            <div className="mb-5 flex items-center justify-center">
              <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-black/85 border border-amber-400/60 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                {redirectCountdown > 0 ? (
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-amber-200 tracking-wider">
                    REDIRECTING TO PORTAL IN{' '}
                    <span className="inline-block px-2 py-0.5 mx-1 font-mono text-sm sm:text-base font-black text-white bg-gradient-to-r from-red-600 to-amber-500 rounded border border-amber-300 shadow-[0_0_12px_#f59e0b]">
                      {redirectCountdown}s
                    </span>
                  </span>
                ) : (
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-emerald-300 tracking-wider flex items-center gap-1.5">
                    REDIRECTING TO OFFICIAL PORTAL... 🚀
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons Hub */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center">
              {/* Primary Direct Link to Portal in Same Tab */}
              <a
                href="https://techsrijan.org"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-500 hover:to-amber-400 text-white font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(245,158,11,0.65)] hover:shadow-[0_0_40px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Enter Portal: techsrijan.org</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Replay Launch Sequence */}
              <button
                onClick={handleReplay}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-400/60 text-zinc-200 hover:text-white font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Replay Teaser</span>
              </button>
            </div>

            {/* Informational Status Badge */}
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>
                {hasRedirected
                  ? 'Redirecting to official portal...'
                  : 'Official portal will open in this tab in a few seconds. Tap button above to enter immediately.'}
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

