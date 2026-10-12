import React from 'react';
import { X, Cpu, Code2, Bot, Layers, Users, Zap, ExternalLink } from 'lucide-react';
import { soundEngine } from '../utils/soundFX';

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchModal: () => void;
}

export const AboutDrawer: React.FC<AboutDrawerProps> = ({ isOpen, onClose, onLaunchModal }) => {
  if (!isOpen) return null;

  const categories = [
    {
      title: 'RoboKriti',
      desc: 'High-octane robotics warzones, obstacle navigation, autonomous drones, and aqua bots.',
      icon: <Bot className="w-5 h-5 text-red-400" />,
      color: 'from-red-950/40 border-red-500/30',
    },
    {
      title: 'CodeKriti',
      desc: 'Hackathons, algorithmic blitzes, capture-the-flag cybersecurity, and open-source sprints.',
      icon: <Code2 className="w-5 h-5 text-orange-400" />,
      color: 'from-orange-950/40 border-orange-500/30',
    },
    {
      title: 'Sanrachna',
      desc: 'Civil marvels, bridge crafting, structural simulations, and futuristic architectural models.',
      icon: <Layers className="w-5 h-5 text-yellow-400" />,
      color: 'from-yellow-950/40 border-yellow-500/30',
    },
    {
      title: 'Techno-Conclave',
      desc: 'Keynote summits with tech pioneers, venture capitalists, and aerospace visionaries.',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-950/40 border-cyan-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0e0404]/95 border-2 border-red-600/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(220,38,38,0.3)] max-h-[90vh] overflow-y-auto">
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-400" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Flagship Techno-Management Festival
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-red-400 tracking-wider">
            ABOUT TECHSRIJAN
          </h2>
          <p className="text-sm text-zinc-300 mt-2 max-w-xl mx-auto leading-relaxed">
            TechSRIJAN is the prestigious annual technical extravaganza organized by the <strong className="text-white">Technical Sub Council (Council of Student Activities)</strong> at <strong className="text-white">Madan Mohan Malaviya University of Technology, Gorakhpur</strong>.
          </p>
        </div>

        {/* Grid of Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl bg-gradient-to-b ${cat.color} to-black/60 border backdrop-blur-sm hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {cat.icon}
                </div>
                <h4 className="font-cinzel font-bold text-white text-base tracking-wide">
                  {cat.title}
                </h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center my-6">
          <div>
            <div className="text-2xl font-cinzel font-black text-orange-400">50+</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Events & Challenges</div>
          </div>
          <div>
            <div className="text-2xl font-cinzel font-black text-yellow-400">₹5,00,000+</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Prize Pool</div>
          </div>
          <div>
            <div className="text-2xl font-cinzel font-black text-red-400">10,000+</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">Participants</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
              onLaunchModal();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center gap-2 transition-all hover:scale-105"
          >
            Launch Countdown
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
