'use client';

import React from 'react';
import { StudySpace } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MapPin,
  Volume2,
  Wifi,
  Zap,
  Bookmark,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SpaceCardProps {
  space: StudySpace;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  const { openSpaceDetails, savedSpaceIds, toggleSaveSpace } = useApp();
  const isSaved = savedSpaceIds.includes(space.id);

  // Status configuration based on requirements
  // green = Available, orange = Busy, red = Full
  const getStatusBadge = () => {
    switch (space.status) {
      case 'Available':
        return {
          bg: 'bg-emerald-50 border-emerald-200/80 text-emerald-800',
          dot: 'bg-emerald-500',
          ping: 'bg-emerald-400',
          label: 'Available',
          seatText: 'text-emerald-700',
        };
      case 'Busy':
        return {
          bg: 'bg-amber-50 border-amber-200/80 text-amber-800',
          dot: 'bg-amber-500',
          ping: 'bg-amber-400',
          label: 'Busy',
          seatText: 'text-amber-700',
        };
      case 'Full':
        return {
          bg: 'bg-rose-50 border-rose-200/80 text-rose-800',
          dot: 'bg-rose-500',
          ping: '',
          label: 'Full',
          seatText: 'text-rose-700',
        };
    }
  };

  const statusConfig = getStatusBadge();

  return (
    <div
      onClick={() => openSpaceDetails(space)}
      className="group relative cursor-pointer glass-card rounded-3xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#0B132B]/8 hover:-translate-y-0.5 border border-white/80 active:scale-[0.985] overflow-hidden"
    >
      {/* Subtle light sheen highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-80 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Top row: Code + Status Badge + Bookmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#0B132B] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
              {space.code}
            </span>
            <div>
              <h3 className="font-semibold text-[15px] text-[#0B132B] tracking-tight group-hover:text-emerald-700 transition-colors">
                {space.name}
              </h3>
              <p className="text-[11px] text-[#7F8DA4] font-medium truncate max-w-[180px]">
                {space.buildingName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Status Pill */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.bg}`}
            >
              <span className="relative flex h-2 w-2">
                {statusConfig.ping && (
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.ping}`}
                  />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${statusConfig.dot}`}
                />
              </span>
              <span>{statusConfig.label}</span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveSpace(space.id);
              }}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark space'}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                isSaved
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-[#7F8DA4] hover:bg-black/5'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Middle row: Seats Count & Distance */}
        <div className="flex items-center justify-between pt-1 border-t border-[#0B132B]/5">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-2xl font-bold tracking-tight ${statusConfig.seatText}`}
            >
              {space.availableSeats}
            </span>
            <span className="text-xs text-[#485672] font-medium">
              seats available
            </span>
            <span className="text-[11px] text-[#7F8DA4]">
              / {space.totalSeats} total
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-[#485672] bg-[#0B132B]/4 px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-[#7F8DA4]" />
            <span>{space.walkMinutes} min walk</span>
          </div>
        </div>

        {/* Amenities mini-tags */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#485672] bg-white/70 px-2 py-0.5 rounded-full border border-black/5">
            <Volume2 className="w-2.5 h-2.5 text-emerald-600" />
            {space.amenities.quietLevel}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#485672] bg-white/70 px-2 py-0.5 rounded-full border border-black/5">
            <Zap className="w-2.5 h-2.5 text-amber-500" />
            Outlets
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#485672] bg-white/70 px-2 py-0.5 rounded-full border border-black/5">
            <Wifi className="w-2.5 h-2.5 text-blue-500" />
            Wi-Fi
          </span>
          <span className="ml-auto text-[11px] font-medium text-emerald-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            <span>Details</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
