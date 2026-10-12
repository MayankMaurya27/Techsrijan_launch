import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, Sparkles, Calendar, Clock, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundFX';

interface CountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAbout: () => void;
}

export const CountdownModal: React.FC<CountdownModalProps> = ({ isOpen, onClose, onOpenAbout }) => {
  // Default target date: 3 days, 14 hours, 28 minutes from now
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    d.setHours(11, 0, 0, 0);
    return d;
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  const [hasLaunched, setHasLaunched] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const calculateTime = () => {
      if (hasLaunched) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        return;
      }

      const diff = targetDate.getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        triggerCelebration();
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isComplete: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [isOpen, targetDate, hasLaunched]);

  const triggerCelebration = () => {
    setHasLaunched(true);
    soundEngine.playLaunchImpact();

    // Epic multi-stage confetti
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ea580c', '#eab308', '#dc2626', '#ffffff'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ea580c', '#eab308', '#dc2626', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSimulateLaunch = () => {
    soundEngine.playClick();
    triggerCelebration();
  };

  const handleResetCountdown = () => {
    soundEngine.playClick();
    setHasLaunched(false);
    const d = new Date();
    d.setDate(d.getDate() + 4);
    d.setHours(11, 0, 0, 0);
    setTargetDate(d);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.25)_0,rgba(0,0,0,0.8)_70%)]" />

      <div className="relative w-full max-w-2xl bg-[#0d0505]/95 border-2 border-red-600/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(220,38,38,0.35)] overflow-hidden">
        {/* Ornate Gold Corner Borders */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-400 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            Official Launch Countdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
            {hasLaunched ? (
              <span className="text-orange-400 animate-pulse">TechSRIJAN'27 IS OFFICIALLY AWAKENED!</span>
            ) : (
              <span>COUNTDOWN TO THE AWAKENING</span>
            )}
          </h2>
          <p className="text-sm text-zinc-400 mt-1 font-sans">
            Technical Sub Council • Madan Mohan Malaviya University of Technology
          </p>
        </div>

        {/* Countdown Digits */}
        {!hasLaunched ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 my-6">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-orange-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group hover:border-orange-500/60 transition-all"
              >
                <span className="font-cinzel text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-400 tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-6 p-6 rounded-xl bg-gradient-to-r from-red-950/60 via-orange-950/60 to-red-950/60 border border-orange-500/40 text-center animate-fade-in">
            <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-3 animate-spin" />
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-yellow-300">
              WELCOME TO THE FUTURE OF INNOVATION
            </h3>
            <p className="text-sm text-zinc-300 mt-2 max-w-md mx-auto">
              The cosmic portal has opened. Registrations for flagship hackathons, robotic arenas, and design conclaves are now active!
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenAbout();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 font-semibold text-sm shadow-lg shadow-orange-600/30 flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                View Events & Highlights
              </button>
            </div>
          </div>
        )}

        {/* Demo Controls Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>Target: {targetDate.toLocaleDateString()} @ {targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <div className="flex items-center gap-2">
            {!hasLaunched ? (
              <button
                onClick={handleSimulateLaunch}
                className="px-3 py-1.5 rounded-lg bg-orange-600/30 hover:bg-orange-600/50 border border-orange-500/40 text-orange-200 font-semibold flex items-center gap-1.5 transition-colors"
                title="Instant live demo"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Simulate Launch (Zero)
              </button>
            ) : (
              <button
                onClick={handleResetCountdown}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Timer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
