import React, { useState } from 'react';
import { Volume2, VolumeX, Info } from 'lucide-react';
import { EmberCanvas } from './components/EmberCanvas';
import { DignitaryMedallion } from './components/DignitaryMedallion';
import { DignitaryModal } from './components/DignitaryModal';
import { CountdownModal } from './components/CountdownModal';
import { AboutDrawer } from './components/AboutDrawer';
import { DIGNITARIES, Dignitary } from './data/dignitaries';
import { soundEngine } from './utils/soundFX';

export const App: React.FC = () => {
  const [selectedDignitary, setSelectedDignitary] = useState<Dignitary | null>(null);
  const [isCountdownOpen, setIsCountdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const toggleAudio = () => {
    const nextState = !isAudioEnabled;
    setIsAudioEnabled(nextState);
    soundEngine.playClick();
    soundEngine.toggleAtmosphere(nextState);
  };

  const handleLaunchClick = () => {
    soundEngine.playLaunchImpact();
    setIsCountdownOpen(true);
  };

  const handleDignitarySelect = (dignitary: Dignitary) => {
    soundEngine.playClick();
    setSelectedDignitary(dignitary);
  };

  return (
    <div className="relative w-full h-screen max-h-screen bg-black text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      {/* Background Graphic - Original high-res artwork */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/Background.png')",
        }}
      >
        {/* Subtle cinematic gradient scrims for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/10 to-black/55 pointer-events-none" />
      </div>

      {/* Interactive 60fps Rising Ember Particle System */}
      <EmberCanvas />

      {/* Outer Framing: Top Red Laser Line with Center Diamond and Corner Brackets */}
      <div className="fixed top-2 left-3 right-3 z-30 pointer-events-none flex items-center justify-between">
        <div className="w-10 sm:w-16 h-3.5 border-t-2 border-l-2 border-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        <div className="flex-1 mx-2 sm:mx-4 flex items-center justify-center relative">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-red-600/90 to-transparent shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rotate-45 bg-gradient-to-tr from-red-600 via-orange-500 to-amber-300 border border-amber-200 shadow-[0_0_10px_rgba(239,68,68,1)]" />
          </div>
        </div>
        <div className="w-10 sm:w-16 h-3.5 border-t-2 border-r-2 border-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      </div>

      {/* Bottom Corner Brackets */}
      <div className="fixed bottom-2 left-3 z-30 w-10 sm:w-16 h-3.5 border-b-2 border-l-2 border-red-500/80 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      <div className="fixed bottom-2 right-3 z-30 w-10 sm:w-16 h-3.5 border-b-2 border-r-2 border-red-500/80 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.8)]" />

      {/* Floating Control Buttons Dock (Mounted on Right Edge - Never Clashes with Cards or Text) */}
      <div className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5">
        <button
          onClick={toggleAudio}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 ${isAudioEnabled
              ? 'bg-orange-600/40 border-orange-500 text-orange-300 shadow-orange-500/40'
              : 'bg-black/75 border-white/20 text-zinc-400 hover:text-white hover:border-white/40'
            }`}
          title={isAudioEnabled ? 'Mute Atmosphere Audio' : 'Play Cinematic Atmosphere Audio'}
        >
          {isAudioEnabled ? (
            <div className="relative">
              <Volume2 className="w-4 h-4 animate-pulse text-orange-400" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setIsAboutOpen(true);
          }}
          className="p-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all shadow-xl hover:scale-110 active:scale-95"
          title="About TechSRIJAN'27"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          TOP SECTION: Logos & University Authority Header
          ========================================================================= */}
      <header className="relative z-20 w-full px-3 sm:px-6 md:px-8 pt-2.5 sm:pt-3.5 shrink-0">
        <div className="w-full max-w-[1680px] mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4 md:gap-6">
          {/* Top Left Logos (IEEE + SAE) */}
          <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 shrink-0 justify-start">
            {/* IEEE Logo */}
            <div className="group relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 lg:w-[78px] lg:h-[78px] xl:w-[86px] xl:h-[86px] rounded-full p-[2px] bg-gradient-to-tr from-blue-700 via-sky-400 to-white shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_24px_rgba(59,130,246,0.8)] transition-all duration-300 hover:scale-105">
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center p-0.5 sm:p-1">
                <img
                  src="/logos/IEE.png"
                  alt="IEEE Student Branch Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* SAE Logo */}
            <div className="group relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 lg:w-[78px] lg:h-[78px] xl:w-[86px] xl:h-[86px] rounded-full p-[2px] bg-gradient-to-tr from-amber-600 via-yellow-400 to-white shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_24px_rgba(245,158,11,0.8)] transition-all duration-300 hover:scale-105">
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center p-0.5 sm:p-1">
                <img
                  src="/logos/SAE.png"
                  alt="SAE Collegiate Club MMMUT Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Top Center University & Council Typography */}
          <div className="text-center px-1 sm:px-2 md:px-4 min-w-0 flex flex-col items-center justify-center">
            <h1 className="text-[11px] sm:text-[13px] md:text-[16px] lg:text-[19px] xl:text-[22px] font-bold font-sans tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.14em] text-white uppercase whitespace-normal lg:whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              MADAN MOHAN MALAVIYA UNIVERSITY OF TECHNOLOGY
            </h1>
            <h2 className="text-[8.5px] sm:text-[10px] md:text-[11.5px] lg:text-[13px] font-semibold tracking-[0.1em] sm:tracking-[0.18em] md:tracking-[0.24em] text-zinc-200 uppercase mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              COUNCIL OF STUDENT ACTIVITIES
            </h2>
            <h3 className="text-[7.5px] sm:text-[8.5px] md:text-[10px] lg:text-[11px] font-medium tracking-[0.14em] sm:tracking-[0.22em] md:tracking-[0.3em] text-orange-200/95 uppercase mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              TECHNICAL SUB COUNCIL
            </h3>
          </div>

          {/* Top Right Logos (TSC + MMMUT) */}
          <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 shrink-0 justify-end">
            {/* TSC Logo */}
            <div className="group relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 lg:w-[78px] lg:h-[78px] xl:w-[86px] xl:h-[86px] rounded-full p-[2px] bg-gradient-to-tr from-red-600 via-orange-400 to-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_24px_rgba(239,68,68,0.8)] transition-all duration-300 hover:scale-105">
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center p-0.5 sm:p-1">
                <img
                  src="/logos/TSC.png"
                  alt="Technical Sub Council Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* MMMUT Logo */}
            <div className="group relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 lg:w-[78px] lg:h-[78px] xl:w-[86px] xl:h-[86px] rounded-full p-[2px] bg-gradient-to-tr from-blue-700 via-indigo-400 to-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_24px_rgba(99,102,241,0.8)] transition-all duration-300 hover:scale-105">
              <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center p-0.5 sm:p-1">
                <img
                  src="/logos/MMMUT.png"
                  alt="MMMUT Official Crest Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO CENTERPIECE: Tightened upwards to leave the central wanderer on the
          rock peak completely visible and unobstructed
          ========================================================================= */}
      <main className="relative z-20 flex-1 min-h-0 flex flex-col items-center justify-start px-4 pt-0.5 sm:pt-1 pb-0 text-center shrink-1">
        {/* "organises" flourish with decorative wings */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-0">
          <div className="w-12 sm:w-20 md:w-28 h-[1px] bg-gradient-to-r from-transparent to-amber-300/80" />
          <span className="font-script text-xl sm:text-2xl md:text-3xl text-amber-200/95 tracking-wide drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
            organises
          </span>
          <div className="w-12 sm:w-20 md:w-28 h-[1px] bg-gradient-to-l from-transparent to-amber-300/80" />
        </div>

        {/* "LAUNCH EVENT" */}
        <div className="relative my-0">
          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold tracking-[0.14em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <span className="gold-gradient-text drop-shadow-[0_0_25px_rgba(243,194,98,0.45)]">
              LAUNCH EVENT
            </span>
          </h2>

          {/* Winged Arrow Underline Divider with Center Diamond */}
          <div className="flex items-center justify-center gap-2 mt-0.5 max-w-xs sm:max-w-md mx-auto">
            <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-orange-400 to-amber-300" />
            <div className="flex items-center text-amber-300">
              <span className="text-[10px] sm:text-xs">◆</span>
            </div>
            <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-orange-400 to-amber-300" />
          </div>
        </div>

        {/* "for" flourish */}
        <div className="my-0">
          <span className="font-script text-base sm:text-xl md:text-2xl text-amber-200/90 italic drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">
            for
          </span>
        </div>

        {/* "TECHSRIJAN'27" - Monotonous, Solid, Uniform Typography (Diamond removed from T) */}
        <div className="relative group my-0.5 cursor-pointer" onClick={handleLaunchClick}>
          {/* Crimson & Ember Backglow Aura */}
          <div className="absolute inset-0 -inset-x-8 bg-red-600/30 blur-3xl rounded-full pointer-events-none group-hover:bg-red-600/50 transition-all duration-500" />

          {/* Monotonous, crisp, solid metallic white title */}
          <h1
            className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[98px] font-black tracking-[0.02em] text-white group-hover:scale-[1.01] transition-transform duration-300 select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
            style={{
              textShadow: '0 0 20px rgba(220, 38, 38, 0.8), 0 0 45px rgba(185, 28, 28, 0.5)',
            }}
          >
            TECHSRIJAN'27
          </h1>
        </div>

        {/* CTA Launch Button & Awakening Subtitle */}
        <div className="mt-1 sm:mt-2 flex flex-col items-center gap-1">
          {/* Animated Flowing THICK Neon Glow Border Button */}
          <button
            onClick={handleLaunchClick}
            className="flowing-neon-btn group cursor-pointer select-none active:scale-95"
            title="Launch TechSRIJAN'27"
          >
            {/* The Animated Glowing Neon Beam that flows along the perimeter */}
            <div className="flowing-neon-beam" />

            {/* Button Inner Body with Smoky Glass Backing */}
            <div className="flowing-neon-content px-7 sm:px-11 py-2 sm:py-2.5 flex items-center gap-2.5 sm:gap-3.5">
              {/* Subtle corner micro-accents */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-amber-300/80 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-amber-300/80 pointer-events-none" />

              {/* Shimmer flare sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transition-transform" />

              {/* Button text */}
              <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-[0.22em] text-white group-hover:text-amber-100 uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                LAUNCH TECHSRIJAN'27
              </span>
              <span className="text-amber-400 group-hover:translate-x-1.5 transition-transform duration-300 text-sm md:text-base">
                →
              </span>
            </div>
          </button>

          {/* Subtitle: "THE AWAKENING BEGINS" */}
          <p className="font-cinzel text-[9px] sm:text-[10px] md:text-xs tracking-[0.35em] sm:tracking-[0.45em] text-orange-200/95 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            THE AWAKENING BEGINS
          </p>
        </div>

        {/* Generous Open Clearance: Keeps the Central Character on the Rock Peak 100% Visible */}
        <div className="w-full flex-1 min-h-[50px] sm:min-h-[80px] md:min-h-[110px] pointer-events-none" />
      </main>

      {/* =========================================================================
          BOTTOM SECTION: Exactly 11 Dignitaries & Faculty in Golden Medallions
          Grid 11 Columns — All 11 Visible, VC Card Centered & Larger, Full Names
          ========================================================================= */}
      <footer className="relative z-20 w-full pt-1 pb-3 px-2 sm:px-4 shrink-0">
        {/* Decorative Top Separator */}
        <div className="max-w-5xl mx-auto mb-1 flex items-center justify-center gap-2 opacity-40">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-red-500/40 to-gold-400/60" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold-400/80" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-red-500/40 to-gold-400/60" />
        </div>

        {/* 11 Dignitaries Grid: All 11 items guaranteed visible in one row */}
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-11 gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 items-end">
          {DIGNITARIES.map((dignitary, index) => (
            <DignitaryMedallion
              key={dignitary.id}
              dignitary={dignitary}
              isVC={index === 5} // Index 5 is Prof. Anupama Kaushal (Vice Chancellor)
              onSelect={handleDignitarySelect}
            />
          ))}
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE MODALS
          ========================================================================= */}
      {/* 1. Dignitary Bio Modal */}
      <DignitaryModal
        dignitary={selectedDignitary}
        onClose={() => setSelectedDignitary(null)}
      />

      {/* 2. Official Launch Countdown Modal */}
      <CountdownModal
        isOpen={isCountdownOpen}
        onClose={() => setIsCountdownOpen(false)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* 3. About TechSRIJAN'27 Drawer */}
      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onLaunchModal={() => setIsCountdownOpen(true)}
      />
    </div>
  );
};

export default App;
