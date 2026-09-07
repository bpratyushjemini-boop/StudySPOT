'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Users,
  Volume2,
  Wifi,
  Zap,
  Wind,
  Sun,
  Layers,
  Bookmark,
  Navigation,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const SpaceDetailsModal: React.FC = () => {
  const {
    selectedSpace,
    isDetailsOpen,
    closeSpaceDetails,
    openSeatPicker,
    openDirections,
    savedSpaceIds,
    toggleSaveSpace,
  } = useApp();

  if (!isDetailsOpen || !selectedSpace) return null;

  const isSaved = savedSpaceIds.includes(selectedSpace.id);
  const isFull = selectedSpace.status === 'Full' || selectedSpace.availableSeats === 0;

  const getStatusColor = () => {
    switch (selectedSpace.status) {
      case 'Available':
        return {
          pill: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          text: 'text-emerald-700',
        };
      case 'Busy':
        return {
          pill: 'bg-amber-100 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          text: 'text-amber-700',
        };
      case 'Full':
        return {
          pill: 'bg-rose-100 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          text: 'text-rose-700',
        };
    }
  };

  const statusStyle = getStatusColor();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-md bg-[#FBFBFA] rounded-t-[36px] sm:rounded-[36px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-white/80 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle for mobile */}
        <div className="w-12 h-1.5 bg-[#0B132B]/15 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2 border-b border-[#0B132B]/5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#0B132B] text-white flex items-center justify-center font-bold text-xs">
              {selectedSpace.code}
            </span>
            <div>
              <span className="text-xs font-semibold text-[#7F8DA4] uppercase tracking-wider">
                Study Space Details
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleSaveSpace(selectedSpace.id)}
              aria-label="Bookmark space"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isSaved ? 'bg-emerald-100 text-emerald-700' : 'text-[#7F8DA4] hover:bg-black/5'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={closeSpaceDetails}
              aria-label="Close details"
              className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#485672] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-5 no-scrollbar pb-32">
          {/* Header Title & Status */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-[#0B132B]">
                {selectedSpace.name}
              </h2>
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle.pill}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                <span>{selectedSpace.status}</span>
              </div>
            </div>
            <p className="text-xs text-[#485672] font-medium">
              {selectedSpace.buildingName}
            </p>
            <p className="text-xs text-[#7F8DA4] italic">
              {selectedSpace.subtitle}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="glass-card rounded-2xl p-3 flex flex-col items-center text-center">
              <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
                Available Seats
              </span>
              <span className={`text-xl font-extrabold mt-0.5 ${statusStyle.text}`}>
                {selectedSpace.availableSeats}
              </span>
              <span className="text-[10px] text-[#485672]">
                of {selectedSpace.totalSeats} seats
              </span>
            </div>

            <div className="glass-card rounded-2xl p-3 flex flex-col items-center text-center">
              <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
                Floor
              </span>
              <span className="text-sm font-bold text-[#0B132B] mt-1 truncate max-w-full">
                {selectedSpace.amenities.floor}
              </span>
              <span className="text-[10px] text-[#485672]">Elevation</span>
            </div>

            <div className="glass-card rounded-2xl p-3 flex flex-col items-center text-center">
              <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
                Walking Time
              </span>
              <span className="text-sm font-bold text-[#0B132B] mt-1">
                {selectedSpace.walkMinutes} min
              </span>
              <span className="text-[10px] text-[#485672]">
                {selectedSpace.distanceMeters}m away
              </span>
            </div>
          </div>

          {/* Core Amenities Checklist (Required Specifications) */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7F8DA4]">
              Space Amenities & Environment
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Quiet Level */}
              <div className="glass-card rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B132B]">Quiet Level</span>
                    <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedSpace.amenities.quietLevel}
                    </span>
                  </div>
                  <p className="text-xs text-[#485672] mt-0.5">
                    {selectedSpace.amenities.quietDescription}
                  </p>
                </div>
              </div>

              {/* Wi-Fi */}
              <div className="glass-card rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B]">Wi-Fi Performance</span>
                  <p className="text-xs text-[#485672] mt-0.5">
                    {selectedSpace.amenities.wifi}
                  </p>
                </div>
              </div>

              {/* Power Outlets */}
              <div className="glass-card rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B]">Power Outlets</span>
                  <p className="text-xs text-[#485672] mt-0.5">
                    {selectedSpace.amenities.outlets}
                  </p>
                </div>
              </div>

              {/* AC / Climate */}
              <div className="glass-card rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B]">Air Conditioning</span>
                  <p className="text-xs text-[#485672] mt-0.5">
                    {selectedSpace.amenities.ac}
                  </p>
                </div>
              </div>

              {/* Lighting */}
              <div className="glass-card rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0B132B]">Lighting & Natural Daylight</span>
                  <p className="text-xs text-[#485672] mt-0.5">
                    {selectedSpace.amenities.lighting}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-[#FBFBFA]/95 backdrop-blur-md border-t border-[#0B132B]/8 flex items-center gap-3">
          <button
            onClick={() => openDirections(selectedSpace)}
            className="p-3.5 rounded-2xl bg-white border border-[#0B132B]/10 text-[#0B132B] apple-btn-tap shadow-xs hover:bg-[#0B132B]/5"
            title="Get Directions"
          >
            <Navigation className="w-5 h-5 text-emerald-600" />
          </button>

          <button
            onClick={() => openSeatPicker(selectedSpace)}
            className={`flex-1 py-3.5 px-5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all apple-btn-tap ${
              isFull
                ? 'bg-[#0B132B]/10 text-[#0B132B] hover:bg-[#0B132B]/15'
                : 'bg-[#0B132B] text-white hover:bg-[#1C2541] shadow-[#0B132B]/20'
            }`}
          >
            <span>{isFull ? 'Explore Floor Plan (Full)' : 'Choose a Space'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
