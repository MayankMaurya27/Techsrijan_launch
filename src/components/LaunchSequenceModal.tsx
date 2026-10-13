import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { soundEngine } from '../utils/soundFX';

interface LaunchSequenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchSequenceModal: React.FC<LaunchSequenceModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'countdown' | 'video'>('countdown');
  const [count, setCount] = useState<number>(3);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasRedirectedRef = useRef<boolean>(false);

  // Handle countdown sequence
  useEffect(() => {
    if (!isOpen) {
      setPhase('countdown');
      setCount(3);
      hasRedirectedRef.current = false;
      return;
    }

    setPhase('countdown');
    setCount(3);
    hasRedirectedRef.current = false;
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

  // Handle video autoplay with default audio and request fullscreen if permitted
  useEffect(() => {
    if (phase === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = false;
      video.volume = 1.0;

      // Request browser fullscreen for true full width & full screen experience
      try {
        if (containerRef.current?.requestFullscreen) {
          containerRef.current.requestFullscreen().catch(() => {
            // Ignore if fullscreen is blocked by permissions
          });
        }
      } catch {
        // no-op
      }

      video.play().catch((err) => {
        console.warn('Initial play with sound caught:', err);
        // If browser policies block unmuted sound, play with mute fallback
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [phase]);

  // Cut before the last 20-40 milliseconds and redirect immediately
  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const remainingTime = videoRef.current.duration - videoRef.current.currentTime;
      // When 0.04s (40ms) or less remains, trigger redirect immediately
      if (remainingTime <= 0.04) {
        handleVideoEnd();
      }
    }
  };

  const handleVideoEnd = () => {
    if (hasRedirectedRef.current) return;
    hasRedirectedRef.current = true;
    window.location.href = 'https://techsrijan.org';
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

          {/* Close button during countdown only */}
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
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnd}
            className="w-full h-full w-screen h-screen object-cover"
          />
        </div>
      )}
    </div>
  );
};
