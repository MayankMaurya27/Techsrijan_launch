import React from 'react';
import { X, Award, Building } from 'lucide-react';

import { Dignitary } from '../data/dignitaries';
import { soundEngine } from '../utils/soundFX';

interface DignitaryModalProps {
  dignitary: Dignitary | null;
  onClose: () => void;
}

export const DignitaryModal: React.FC<DignitaryModalProps> = ({ dignitary, onClose }) => {
  if (!dignitary) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#120606] border border-gold-500/50 rounded-2xl p-6 shadow-[0_0_40px_rgba(243,194,98,0.25)] overflow-hidden">
        {/* Ornate corner borders */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold-400" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-gold-400" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-gold-400" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-gold-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Avatar / Medallion */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-red-600 border border-gold-300 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <div className="w-full h-full rounded-full border-2 border-gold-400/80 p-1 shadow-[0_0_20px_rgba(243,194,98,0.4)]">
              <div className="w-full h-full rounded-full bg-black/80 overflow-hidden flex items-center justify-center">
                {dignitary.photoUrl ? (
                  <img src={dignitary.photoUrl} alt={dignitary.name} className="w-full h-full object-cover" />
                ) : (
                  <svg viewBox="0 0 64 64" className="w-16 h-16 fill-[#1c0a0a] drop-shadow-[0_0_6px_rgba(243,194,98,0.5)]">
                    <path d="M12 56 C12 43, 20 38, 32 38 C44 38, 52 43, 52 56 Z" />
                    <circle cx="32" cy="24" r="11" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-[11px] font-semibold text-gold-300 uppercase tracking-wider mb-2">
            {dignitary.badge || 'Distinguished Faculty'}
          </div>


          <h3 className="text-xl font-cinzel font-bold text-white tracking-wide">
            {dignitary.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs font-medium text-orange-400 mt-1">
            <Award className="w-3.5 h-3.5" />
            <span>{dignitary.role}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
            <Building className="w-3.5 h-3.5" />
            <span>{dignitary.organization}</span>
          </div>

          {dignitary.bio && (
            <p className="text-xs text-zinc-300 mt-4 leading-relaxed bg-white/[0.03] p-3 rounded-lg border border-white/5 text-left">
              {dignitary.bio}
            </p>
          )}

          <div className="mt-5 w-full">
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-zinc-200 transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
