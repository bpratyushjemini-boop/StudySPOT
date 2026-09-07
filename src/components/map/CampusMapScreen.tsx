'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudySpace } from '../../types';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  ChevronRight,
  Sparkles,
  Users,
  Volume2,
} from 'lucide-react';

export const CampusMapScreen: React.FC = () => {
  const { spaces, openSpaceDetails } = useApp();
  const [activePinSpace, setActivePinSpace] = useState<StudySpace>(spaces[0]);

  // Marker colors by status
  const getMarkerStyle = (status: StudySpace['status'], isSelected: boolean) => {
    switch (status) {
      case 'Available':
        return {
          bg: isSelected ? 'bg-emerald-600' : 'bg-emerald-500',
          ring: 'ring-emerald-400/40',
          ping: 'bg-emerald-400',
          border: 'border-white',
          text: 'text-white',
          label: 'Available',
          badgeBg: 'bg-emerald-100 text-emerald-800',
        };
      case 'Busy':
        return {
          bg: isSelected ? 'bg-amber-600' : 'bg-amber-500',
          ring: 'ring-amber-400/40',
          ping: 'bg-amber-400',
          border: 'border-white',
          text: 'text-white',
          label: 'Busy',
          badgeBg: 'bg-amber-100 text-amber-800',
        };
      case 'Full':
        return {
          bg: isSelected ? 'bg-rose-600' : 'bg-rose-500',
          ring: 'ring-rose-400/40',
          ping: '',
          border: 'border-white',
          text: 'text-white',
          label: 'Full',
          badgeBg: 'bg-rose-100 text-rose-800',
        };
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-140px)] min-h-[580px] w-full animate-fade-in overflow-hidden">
      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="glass-pill px-3.5 py-1.5 rounded-full pointer-events-auto flex items-center gap-2 shadow-md shadow-black/5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-[#0B132B]">
            Interactive Campus Map
          </span>
          <span className="text-[10px] text-[#7F8DA4]">5 Libraries</span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <div className="glass-pill p-2 rounded-full text-[#485672] shadow-sm">
            <Compass className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Campus Map Illustrated SVG Canvas */}
      <div className="relative flex-1 w-full bg-[#EAE8E1] select-none overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 800 650"
          className="w-full h-full object-cover"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.05))' }}
        >
          {/* Defs & Gradients */}
          <defs>
            {/* Soft Grass Pattern */}
            <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2EDE2" />
              <stop offset="100%" stopColor="#D4E4D3" />
            </linearGradient>

            {/* Path Gradient */}
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F3ED" />
              <stop offset="100%" stopColor="#ECE8DF" />
            </linearGradient>

            {/* Pond Water */}
            <linearGradient id="pondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D2E8F7" />
              <stop offset="100%" stopColor="#BCDDF5" />
            </linearGradient>

            {/* Building 3D drop shadow */}
            <filter id="buildingShadow" x="-10%" y="-10%" width="120%" height="125%">
              <feDropShadow dx="2" dy="6" stdDeviation="6" floodOpacity="0.08" floodColor="#0C1A30" />
            </filter>
          </defs>

          {/* Background Quad Grassy Areas */}
          <rect x="0" y="0" width="800" height="650" fill="#F1EFEA" />

          {/* Great Lawn & North Woods */}
          <path
            d="M 50 60 Q 250 40 450 70 T 750 90 L 760 380 Q 550 420 380 370 T 40 320 Z"
            fill="url(#grassGrad)"
            opacity="0.8"
          />
          <path
            d="M 80 420 Q 320 390 520 440 T 740 500 L 750 620 L 50 620 Z"
            fill="url(#grassGrad)"
            opacity="0.75"
          />

          {/* Campus Pond / Reflection Water Feature */}
          <ellipse cx="400" cy="270" rx="90" ry="48" fill="url(#pondGrad)" />
          <path
            d="M 370 260 Q 400 250 430 260 Q 420 285 370 275 Z"
            fill="#FFFFFF"
            opacity="0.35"
          />

          {/* Major Pedestrian Promenades */}
          <path
            d="M 400 650 L 400 100"
            stroke="url(#pathGrad)"
            strokeWidth="36"
            strokeLinecap="round"
          />
          <path
            d="M 50 350 L 750 350"
            stroke="url(#pathGrad)"
            strokeWidth="30"
            strokeLinecap="round"
          />
          <path
            d="M 180 550 Q 320 420 580 400"
            stroke="url(#pathGrad)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 220 180 Q 400 240 680 180"
            stroke="url(#pathGrad)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="400" cy="350" r="42" fill="#ECE8DF" />

          {/* Trees / Botanical Clusters */}
          {[
            [120, 140], [160, 120], [200, 160], [290, 90], [330, 120],
            [480, 110], [540, 90], [600, 130], [640, 100],
            [120, 260], [150, 300], [260, 270], [520, 250], [580, 280],
            [140, 470], [190, 510], [290, 480], [620, 460], [660, 520],
          ].map(([tx, ty], idx) => (
            <g key={idx} opacity="0.6">
              <circle cx={tx + 1} cy={ty + 2} r="12" fill="#0C1A30" opacity="0.05" />
              <circle cx={tx} cy={ty} r="11" fill="#A8D2A8" />
              <circle cx={tx - 2} cy={ty - 2} r="8" fill="#BFE3BF" />
            </g>
          ))}

          {/* Building Silhouettes & Footprints */}

          {/* C1 Building Footprint */}
          <g filter="url(#buildingShadow)">
            <rect x="290" y="195" width="100" height="75" rx="14" fill="#FFFFFF" />
            <rect x="295" y="200" width="90" height="65" rx="10" fill="#F8F8F6" stroke="#E3E2DC" strokeWidth="1.5" />
            <text x="340" y="238" textAnchor="middle" fill="#0B132B" fontSize="13" fontWeight="700" fontFamily="-apple-system, sans-serif">
              C1 Library
            </text>
            <text x="340" y="252" textAnchor="middle" fill="#7F8DA4" fontSize="9" fontWeight="500">
              Central Complex
            </text>
          </g>

          {/* C3 Building Footprint */}
          <g filter="url(#buildingShadow)">
            <rect x="425" y="190" width="95" height="75" rx="14" fill="#FFFFFF" />
            <rect x="430" y="195" width="85" height="65" rx="10" fill="#F8F8F6" stroke="#E3E2DC" strokeWidth="1.5" />
            <text x="472" y="233" textAnchor="middle" fill="#0B132B" fontSize="13" fontWeight="700" fontFamily="-apple-system, sans-serif">
              C3 Library
            </text>
            <text x="472" y="247" textAnchor="middle" fill="#7F8DA4" fontSize="9" fontWeight="500">
              East Commons
            </text>
          </g>

          {/* D6 Building Footprint */}
          <g filter="url(#buildingShadow)">
            <rect x="555" y="310" width="95" height="70" rx="14" fill="#FFFFFF" />
            <rect x="560" y="315" width="85" height="60" rx="10" fill="#F8F8F6" stroke="#E3E2DC" strokeWidth="1.5" />
            <text x="602" y="350" textAnchor="middle" fill="#0B132B" fontSize="13" fontWeight="700" fontFamily="-apple-system, sans-serif">
              D6 Digital
            </text>
            <text x="602" y="364" textAnchor="middle" fill="#7F8DA4" fontSize="9" fontWeight="500">
              Turing Center
            </text>
          </g>

          {/* B1 Building Footprint */}
          <g filter="url(#buildingShadow)">
            <rect x="160" y="355" width="90" height="75" rx="14" fill="#FFFFFF" />
            <rect x="165" y="360" width="80" height="65" rx="10" fill="#F8F8F6" stroke="#E3E2DC" strokeWidth="1.5" />
            <text x="205" y="398" textAnchor="middle" fill="#0B132B" fontSize="13" fontWeight="700" fontFamily="-apple-system, sans-serif">
              Block B1
            </text>
            <text x="205" y="412" textAnchor="middle" fill="#7F8DA4" fontSize="9" fontWeight="500">
              Founders Hall
            </text>
          </g>

          {/* D8 Building Footprint */}
          <g filter="url(#buildingShadow)">
            <rect x="505" y="100" width="95" height="70" rx="14" fill="#FFFFFF" />
            <rect x="510" y="105" width="85" height="60" rx="10" fill="#F8F8F6" stroke="#E3E2DC" strokeWidth="1.5" />
            <text x="552" y="140" textAnchor="middle" fill="#0B132B" fontSize="13" fontWeight="700" fontFamily="-apple-system, sans-serif">
              Block D8
            </text>
            <text x="552" y="154" textAnchor="middle" fill="#7F8DA4" fontSize="9" fontWeight="500">
              Science Quad
            </text>
          </g>

          {/* Student Hub Center Pin (You Are Here) */}
          <g transform="translate(400, 480)">
            <circle cx="0" cy="0" r="18" fill="#3B82F6" opacity="0.15" />
            <circle cx="0" cy="0" r="9" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="3" />
            <text x="0" y="24" textAnchor="middle" fill="#1E3A8A" fontSize="10" fontWeight="700">
              Current Location (Campus Quad)
            </text>
          </g>
        </svg>

        {/* HTML Interactive Pins Positioned Precisely Over Campus */}
        {spaces.map((space) => {
          const isSelected = activePinSpace.id === space.id;
          const style = getMarkerStyle(space.status, isSelected);

          return (
            <div
              key={space.id}
              onClick={() => setActivePinSpace(space)}
              style={{
                left: `${space.mapCoords.x}%`,
                top: `${space.mapCoords.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer z-20 group transition-all duration-300"
            >
              {/* Pulse circle for available/busy */}
              {style.ping && (
                <div
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full ${style.ping} opacity-70 animate-ping pointer-events-none`}
                />
              )}

              {/* Pin Bubble Card */}
              <div
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl shadow-xl transition-all duration-200 apple-btn-tap border-2 ${
                  isSelected
                    ? `${style.bg} ${style.border} scale-110 shadow-black/25 z-30`
                    : 'bg-white/95 text-[#0B132B] border-white shadow-black/10 hover:scale-105'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : style.bg
                  }`}
                />
                <span
                  className={`font-bold text-xs ${
                    isSelected ? 'text-white' : 'text-[#0B132B]'
                  }`}
                >
                  {space.code}
                </span>

                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-black/20 text-white'
                      : style.badgeBg
                  }`}
                >
                  {space.status === 'Full' ? 'Full' : `${space.availableSeats} seats`}
                </span>
              </div>

              {/* Pin point tail */}
              <div
                className={`w-2.5 h-2.5 mx-auto -mt-1 rotate-45 border-r-2 border-b-2 ${
                  isSelected
                    ? `${style.bg} ${style.border}`
                    : 'bg-white/95 border-white'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Selected Space Bottom Slide-up Preview Card */}
      {activePinSpace && (
        <div className="absolute bottom-4 left-4 right-4 z-30 animate-slide-up">
          <div className="glass-card rounded-3xl p-4 shadow-2xl border border-white/90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#0B132B] text-white flex items-center justify-center font-bold text-sm">
                  {activePinSpace.code}
                </span>
                <div>
                  <h3 className="font-semibold text-sm text-[#0B132B]">
                    {activePinSpace.name}
                  </h3>
                  <p className="text-[11px] text-[#7F8DA4]">
                    {activePinSpace.buildingName} • {activePinSpace.walkMinutes} min walk
                  </p>
                </div>
              </div>

              <div
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  activePinSpace.status === 'Available'
                    ? 'bg-emerald-100 text-emerald-800'
                    : activePinSpace.status === 'Busy'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {activePinSpace.status} ({activePinSpace.availableSeats} seats)
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#0B132B]/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#485672]">
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activePinSpace.amenities.quietLevel} Zone</span>
              </div>

              <button
                onClick={() => openSpaceDetails(activePinSpace)}
                className="px-4 py-2 rounded-full bg-[#0B132B] text-white text-xs font-semibold flex items-center gap-1 apple-btn-tap hover:bg-[#1C2541]"
              >
                <span>View Space</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
