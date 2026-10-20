import React from 'react';
import { Flame, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'carnet' | 'wisdom' | 'formula';
  setActiveTab: (tab: 'calculator' | 'carnet' | 'wisdom' | 'formula') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-red-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Flame className="w-5 h-5 text-slate-950 fill-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wider text-white font-display uppercase flex items-center gap-1.5">
              GRINTTA
              <span className="text-xs font-semibold text-amber-400 font-arabic tracking-normal px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                ڨرينتة
              </span>
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'calculator'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            7seb el Mada
          </button>
          <button
            onClick={() => setActiveTab('carnet')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'carnet'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Carnet Trimestre
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'formula'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Chnouwa el 80/20%?
          </button>
          <button
            onClick={() => setActiveTab('wisdom')}
            className={`whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'wisdom'
                ? 'text-amber-400 font-semibold'
                : 'hover:text-slate-200'
            }`}
          >
            Nsa2e7 w Grintta
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 text-slate-400 hover:text-amber-400 transition-colors rounded-lg bg-slate-900 border border-slate-800"
            title={soundEnabled ? 'صوت مفعل' : 'صوت صامت'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setActiveTab('calculator');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all rounded-lg shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>7seb Tawwa</span>
          </button>
        </div>
      </div>
    </header>
  );
};
