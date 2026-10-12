import React from 'react';
import { Dignitary } from '../data/dignitaries';

interface DignitaryMedallionProps {
  dignitary: Dignitary;
  isVC?: boolean;
  onSelect: (dignitary: Dignitary) => void;
}

export const DignitaryMedallion: React.FC<DignitaryMedallionProps> = ({ dignitary, isVC = false, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(dignitary)}
      className={`flex flex-col items-center group cursor-pointer text-center select-none transition-all duration-300 hover:-translate-y-1.5 w-full ${
        isVC ? '-translate-y-1 z-10 scale-105' : ''
      }`}
    >
      {/* Medallion Frame Container */}
      <div
        className={`relative mb-1 transition-transform duration-300 group-hover:scale-105 ${
          isVC
            ? 'w-[72px] h-[72px] sm:w-[82px] sm:h-[82px] md:w-[92px] md:h-[92px] lg:w-[102px] lg:h-[102px] xl:w-[110px] xl:h-[110px]'
            : 'w-[56px] h-[56px] sm:w-[66px] sm:h-[66px] md:w-[74px] md:h-[74px] lg:w-[82px] lg:h-[82px] xl:w-[88px] xl:h-[88px]'
        }`}
      >
        {/* Top Ornate Finial & Glowing Ruby Gem Accent */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div
            className={`rotate-45 bg-gradient-to-tr from-red-600 via-red-500 to-amber-200 border border-amber-200/90 shadow-[0_0_10px_rgba(239,68,68,1)] transition-transform duration-300 group-hover:scale-125 ${
              isVC ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'
            }`}
          />
          <div className="w-1 h-1 bg-amber-200 rounded-full blur-[0.5px] -mt-1" />
        </div>

        {/* Outer Ornate Golden Beveled Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
            isVC
              ? 'border-gold-400 shadow-[0_0_20px_rgba(243,194,98,0.6)] group-hover:shadow-[0_0_30px_rgba(243,194,98,0.9)]'
              : 'border-gold-warm/75 group-hover:border-gold-300 shadow-[0_0_12px_rgba(243,194,98,0.35)] group-hover:shadow-[0_0_22px_rgba(243,194,98,0.7)]'
          }`}
        />

        {/* Inner Secondary Bevel Ring */}
        <div
          className={`absolute inset-1 rounded-full border transition-colors duration-300 ${
            isVC ? 'border-red-500/60 group-hover:border-red-400' : 'border-red-500/40 group-hover:border-red-400/80'
          }`}
        />

        {/* Circular Avatar / Silhouette Container */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden bg-gradient-to-b from-[#1c0707] via-[#0d0303] to-[#040101] flex items-center justify-center shadow-inner">
          {dignitary.photoUrl ? (
            <img
              src={dignitary.photoUrl}
              alt={dignitary.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            /* Premium Backlit Dignified Silhouette (Exact match to Image 2 poster) */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Backlit halo aura */}
              <div
                className={`absolute inset-0 transition-colors duration-300 ${
                  isVC
                    ? 'bg-[radial-gradient(circle_at_center,rgba(243,194,98,0.4)_0,transparent_75%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.6)_0,transparent_80%)]'
                    : 'bg-[radial-gradient(circle_at_center,rgba(243,194,98,0.25)_0,transparent_75%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.45)_0,transparent_80%)]'
                }`}
              />

              {dignitary.silhouetteType === 'female' ? (
                /* Female Dignitary Cameo Silhouette (styled hair contours) */
                <svg
                  viewBox="0 0 64 64"
                  className="w-full h-full p-1.5 text-zinc-950 drop-shadow-[0_0_4px_rgba(243,194,98,0.6)] fill-current"
                >
                  <path d="M14 58 C14 46, 21 41, 32 41 C43 41, 50 46, 50 58 Z" fill="#140606" />
                  <path d="M28 35 L36 35 L35 43 L29 43 Z" fill="#0d0303" />
                  <path d="M19 32 C17 24, 21 13, 32 13 C43 13, 47 24, 45 32 C43 38, 41 44, 41 46 C37 46, 36 39, 36 36 C34 37, 30 37, 28 36 C28 39, 27 46, 23 46 C23 44, 21 38, 19 32 Z" fill="#140606" />
                  <ellipse cx="32" cy="26" rx="8" ry="10" fill="#0b0303" />
                </svg>
              ) : dignitary.silhouetteType === 'glasses' ? (
                /* Male Dignitary with Spectacles Silhouette */
                <svg
                  viewBox="0 0 64 64"
                  className="w-full h-full p-1.5 text-zinc-950 drop-shadow-[0_0_4px_rgba(243,194,98,0.6)] fill-current"
                >
                  <path d="M12 58 C12 45, 20 40, 32 40 C44 40, 52 45, 52 58 Z" fill="#140606" />
                  <path d="M16 58 C16 47, 23 42, 32 42 C41 42, 48 47, 48 58 Z" fill="#0d0404" />
                  <circle cx="32" cy="24" r="10" fill="#140606" />
                  <circle cx="28" cy="23" r="3.2" fill="none" stroke="#f3c262" strokeWidth="1.2" opacity="0.9" />
                  <circle cx="36" cy="23" r="3.2" fill="none" stroke="#f3c262" strokeWidth="1.2" opacity="0.9" />
                  <line x1="31.2" y1="23" x2="32.8" y2="23" stroke="#f3c262" strokeWidth="1.2" opacity="0.9" />
                </svg>
              ) : (
                /* Male Dignitary Cameo Silhouette (Suit & Collar) */
                <svg
                  viewBox="0 0 64 64"
                  className="w-full h-full p-1.5 text-zinc-950 drop-shadow-[0_0_4px_rgba(243,194,98,0.6)] fill-current"
                >
                  <path d="M12 58 C12 45, 20 40, 32 40 C44 40, 52 45, 52 58 Z" fill="#140606" />
                  <path d="M16 58 C16 47, 23 42, 32 42 C41 42, 48 47, 48 58 Z" fill="#0d0404" />
                  <path d="M29 42 L32 48 L35 42 Z" fill="#2a1010" />
                  <circle cx="32" cy="24" r="10.5" fill="#140606" />
                  <circle cx="32" cy="24" r="9.5" fill="#0c0303" />
                </svg>
              )}
            </div>
          )}
        </div>

        {/* Ambient Pulsing Gem Sparkle */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400 opacity-0 group-hover:opacity-100 transition-opacity blur-[0.5px]" />
      </div>

      {/* Dignitary Name (NO truncation - full name always displayed) */}
      <h4
        className={`tracking-tight leading-tight transition-colors w-full break-words ${
          isVC
            ? 'text-gold-200 text-[9.5px] sm:text-[10.5px] md:text-[11.5px] lg:text-[12.5px] font-bold'
            : 'text-white text-[9px] sm:text-[10px] md:text-[10.5px] lg:text-[11px] font-semibold group-hover:text-gold-300'
        }`}
      >
        {dignitary.name}
      </h4>

      {/* Role */}
      <p
        className={`tracking-normal mt-0.5 leading-tight w-full break-words ${
          isVC
            ? 'text-amber-300 font-semibold text-[8px] sm:text-[9px] md:text-[9.5px] lg:text-[10px]'
            : 'text-orange-300/90 text-[7.5px] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] font-medium'
        }`}
      >
        {dignitary.role}
      </p>

      {/* Organization / Council */}
      <p className="text-[7px] sm:text-[7.5px] md:text-[8px] lg:text-[8.5px] text-zinc-400 font-normal leading-tight mt-0.5 w-full break-words">
        {dignitary.organization}
      </p>
    </div>
  );
};
