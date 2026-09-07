'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, RefreshCw, BookmarkCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { resetDemoData, demoToast } = useApp();

  return (
    <header className="sticky top-0 z-30 pt-2 pb-3 px-5 backdrop-blur-xl bg-[#FBFBFA]/85 border-b border-[#0B132B]/5 transition-all">
      {/* Toast Notification */}
      {demoToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B132B] text-white text-xs font-medium shadow-xl shadow-black/20 animate-fade-in border border-white/20">
          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{demoToast}</span>
        </div>
      )}

      {/* Top micro-bar: Brand & Demo Data tag */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-sm shadow-emerald-600/30">
            <span className="text-white font-bold text-xs tracking-tight">SS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm tracking-tight text-[#0B132B]">StudySpot</span>
            <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-md border border-emerald-300/60">
              Campus
            </span>
          </div>
        </div>

        {/* Demo Data badge */}
        <button
          onClick={resetDemoData}
          title="Click to reset simulated demo occupancy"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B132B]/5 hover:bg-[#0B132B]/10 active:scale-95 transition-all border border-[#0B132B]/10 text-[11px] text-[#485672] font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Demo Data</span>
          <RefreshCw className="w-2.5 h-2.5 opacity-60 ml-0.5" />
        </button>
      </div>
    </header>
  );
};
