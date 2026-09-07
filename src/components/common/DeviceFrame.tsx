'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { deviceFrame, setDeviceFrame } = useApp();

  return (
    <div className="min-h-screen w-full bg-[#EFEFEA] flex flex-col items-center justify-start sm:py-6 sm:px-4 transition-colors">
      {/* Desktop view switcher pill */}
      <div className="hidden sm:flex items-center gap-2 mb-4 z-50">
        <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#0B132B] shadow-md border border-white/80">
          <span className="text-[#7F8DA4] font-medium">Preview Mode:</span>
          <button
            onClick={() => setDeviceFrame(true)}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
              deviceFrame
                ? 'bg-[#0B132B] text-white shadow-xs'
                : 'text-[#485672] hover:text-[#0B132B]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone Frame</span>
          </button>
          <button
            onClick={() => setDeviceFrame(false)}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
              !deviceFrame
                ? 'bg-[#0B132B] text-white shadow-xs'
                : 'text-[#485672] hover:text-[#0B132B]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Fluid Mobile View</span>
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrame
            ? 'sm:max-w-[420px] sm:rounded-[55px] sm:shadow-[0_25px_70px_-15px_rgba(11,19,43,0.35)] sm:ring-[12px] sm:ring-[#1E293B] sm:border-[4px] sm:border-[#334155]'
            : 'max-w-md shadow-xl sm:rounded-3xl'
        } bg-[#FBFBFA] min-h-screen sm:min-h-[880px] sm:max-h-[920px] flex flex-col relative overflow-hidden`}
      >
        {/* Apple Dynamic Island & Status Bar (shown in mockup) */}
        <div className="w-full pt-3 px-7 pb-1 flex items-center justify-between z-40 select-none bg-[#FBFBFA]/90 backdrop-blur-md">
          {/* Clock */}
          <span className="text-xs font-bold text-[#0B132B] tracking-tight">
            9:41
          </span>

          {/* Dynamic Island pill */}
          <div className="w-24 h-6 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F2937]" />
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-[#0B132B]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold">100%</span>
              <Battery className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>

        {/* Inner App Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          {children}
        </div>

        {/* iPhone Home Indicator Bar */}
        <div className="w-full pb-2 pt-1 flex justify-center bg-transparent pointer-events-none z-50">
          <div className="w-32 h-1 bg-[#0B132B]/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
