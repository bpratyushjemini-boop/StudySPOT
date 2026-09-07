'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Bookmark,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  Shield,
  Volume2,
  Zap,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    spaces,
    savedSpaceIds,
    recentBookings,
    openSpaceDetails,
    resetDemoData,
    setActiveTab,
  } = useApp();

  const savedSpaces = spaces.filter((space) => savedSpaceIds.includes(space.id));

  return (
    <div className="flex flex-col gap-5 px-5 pt-3 pb-32 animate-fade-in">
      {/* Student Profile Card */}
      <div className="glass-card rounded-3xl p-5 border border-white flex flex-col gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-700 to-[#0B132B] flex items-center justify-center text-white text-lg font-bold shadow-md shadow-emerald-700/20">
              AC
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold text-[#0B132B] tracking-tight">
                Alex Chen
              </h1>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                Student
              </span>
            </div>
            <p className="text-xs text-[#485672]">
              Sophomore • Computer Science
            </p>
            <p className="text-[11px] text-[#7F8DA4]">
              ID: #ST-892401 • Campus Center
            </p>
          </div>
        </div>

        {/* Study Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#0B132B]/5 text-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
              Saved Spots
            </span>
            <span className="text-lg font-extrabold text-[#0B132B]">
              {savedSpaces.length}
            </span>
          </div>

          <div className="flex flex-col border-x border-[#0B132B]/5">
            <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
              Recent Visits
            </span>
            <span className="text-lg font-extrabold text-emerald-700">
              {recentBookings.length}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
              Quiet Focus
            </span>
            <span className="text-lg font-extrabold text-[#0B132B]">
              94%
            </span>
          </div>
        </div>
      </div>

      {/* Saved Spaces Quick Access (Requirement: Saved spaces) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7F8DA4]">
            Saved Spaces ({savedSpaces.length})
          </h2>
          <button
            onClick={() => setActiveTab('saved')}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            View all
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {savedSpaces.slice(0, 3).map((space) => (
            <div
              key={space.id}
              onClick={() => openSpaceDetails(space)}
              className="glass-card rounded-2xl p-3 flex items-center justify-between border border-white/80 cursor-pointer hover:bg-white transition-all apple-btn-tap"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#0B132B] text-white flex items-center justify-center font-bold text-xs">
                  {space.code}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-[#0B132B]">
                    {space.name}
                  </h3>
                  <span className="text-[11px] text-[#7F8DA4]">
                    {space.availableSeats} seats available • {space.walkMinutes} min walk
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#7F8DA4]" />
            </div>
          ))}
        </div>
      </section>

      {/* Recent Study Spaces (Requirement: Recent study spaces) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7F8DA4]">
            Recent Study Sessions
          </h2>
          <span className="text-[11px] text-[#7F8DA4] flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-600" />
            Activity Log
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {recentBookings.map((b) => (
            <div
              key={b.id}
              className="glass-card rounded-2xl p-3.5 flex items-center justify-between border border-white/90"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  #{b.seatNumber}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-[#0B132B]">
                      {b.spaceName}
                    </h3>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      Seat {b.seatNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7F8DA4]">
                    {b.zone} • {b.timestamp}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-[#7F8DA4] bg-black/5 px-2 py-1 rounded-md">
                {b.id}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences & Demo Information */}
      <section className="flex flex-col gap-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#7F8DA4]">
          Study Preferences
        </h2>

        <div className="glass-card rounded-2xl p-3.5 flex flex-col gap-3 border border-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-[#0B132B]">
                Prefer Silent Zones
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700">Enabled</span>
          </div>

          <div className="w-full h-px bg-[#0B132B]/5" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-[#0B132B]">
                Power Outlet Filter
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700">Always</span>
          </div>
        </div>

        {/* Prototype Notice */}
        <div className="glass-card rounded-2xl p-4 flex flex-col gap-2 border border-white/60 bg-white/40">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#485672]">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>StudySpot Campus Prototype</span>
          </div>
          <p className="text-[11px] text-[#7F8DA4] leading-relaxed">
            This application uses realistic simulated campus occupancy data to demonstrate how college students discover and select study desks. No live sensors or actual university backend are connected.
          </p>
          <button
            onClick={resetDemoData}
            className="w-fit text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 mt-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Occupancy Data</span>
          </button>
        </div>
      </section>
    </div>
  );
};
