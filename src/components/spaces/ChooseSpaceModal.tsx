'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Seat } from '../../types';
import {
  X,
  ArrowLeft,
  Check,
  Zap,
  Sun,
  ShieldCheck,
  Info,
  Sparkles,
} from 'lucide-react';

export const ChooseSpaceModal: React.FC = () => {
  const {
    selectedSpace,
    isSeatPickerOpen,
    closeSeatPicker,
    openSpaceDetails,
    confirmSeat,
    selectedSeat,
    setSelectedSeat,
  } = useApp();

  const [filterZone, setFilterZone] = useState<string>('All');
  const [occupiedToast, setOccupiedToast] = useState<string | null>(null);

  if (!isSeatPickerOpen || !selectedSpace) return null;

  const seats = selectedSpace.floorPlan.seats;
  const zones = ['All', 'Window Desks', 'Silent Pods', 'Study Carrels', 'Group Tables'];

  const displayedSeats =
    filterZone === 'All'
      ? seats
      : seats.filter((s) => s.zone === filterZone);

  const availableCount = seats.filter((s) => s.status === 'available').length;

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') {
      setOccupiedToast(`Seat ${seat.number} is currently occupied.`);
      setTimeout(() => setOccupiedToast(null), 2000);
      return;
    }
    setSelectedSeat(seat);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-md bg-[#FBFBFA] rounded-t-[36px] sm:rounded-[36px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-white/80 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-[#0B132B]/15 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2.5 border-b border-[#0B132B]/5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeSeatPicker();
                openSpaceDetails(selectedSpace);
              }}
              className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#0B132B]"
              aria-label="Back to details"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="font-bold text-sm text-[#0B132B]">
                Choose Your Seat
              </h2>
              <p className="text-[11px] text-[#7F8DA4]">
                {selectedSpace.name} • {selectedSpace.floorPlan.floorNumber}
              </p>
            </div>
          </div>

          <button
            onClick={closeSeatPicker}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#485672]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Occupied Seat Alert Toast */}
        {occupiedToast && (
          <div className="bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 text-center transition-all animate-fade-in flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>{occupiedToast}</span>
          </div>
        )}

        {/* Scrollable Floor Plan Workspace */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4 no-scrollbar pb-36">
          {/* Status Legend (Requirement: Green = Available, Grey = Occupied) */}
          <div className="glass-card rounded-2xl p-3 flex items-center justify-around border border-white/90">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-emerald-300/40 shadow-xs" />
              <span className="text-xs font-medium text-[#0B132B]">
                Available ({availableCount})
              </span>
            </div>

            <div className="w-px h-4 bg-[#0B132B]/10" />

            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#CBD5E1] shadow-xs" />
              <span className="text-xs font-medium text-[#7F8DA4]">
                Occupied ({seats.length - availableCount})
              </span>
            </div>

            <div className="w-px h-4 bg-[#0B132B]/10" />

            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#0B132B] ring-2 ring-black/20 shadow-xs" />
              <span className="text-xs font-semibold text-[#0B132B]">
                Selected
              </span>
            </div>
          </div>

          {/* Zone Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5">
            {zones.map((zone) => {
              const isActive = filterZone === zone;
              return (
                <button
                  key={zone}
                  onClick={() => setFilterZone(zone)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#0B132B] text-white shadow-xs'
                      : 'bg-white/80 text-[#485672] hover:bg-white border border-black/5'
                  }`}
                >
                  {zone}
                </button>
              );
            })}
          </div>

          {/* Floor Plan Layout Canvas */}
          <div className="glass-card rounded-3xl p-5 border border-white shadow-md relative overflow-hidden bg-gradient-to-b from-white to-[#F6F5F1]">
            {/* Architectural Room Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#0B132B]/10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7F8DA4] bg-white px-2 py-0.5 rounded border border-black/5">
                  Floor Plan
                </span>
                <span className="text-xs font-semibold text-[#0B132B]">
                  {selectedSpace.floorPlan.floorName}
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#7F8DA4] flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-500" />
                Window Wall (North)
              </span>
            </div>

            {/* Seat Grid Layout */}
            {displayedSeats.length > 0 ? (
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5 sm:gap-3 py-2 justify-items-center">
                {displayedSeats.map((seat) => {
                  const isSelected = selectedSeat?.id === seat.id;
                  const isAvailable = seat.status === 'available';

                  return (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      className={`group relative w-10 h-10 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 apple-btn-tap ${
                        isSelected
                          ? 'bg-[#0B132B] text-white ring-4 ring-[#0B132B]/20 scale-110 shadow-lg shadow-black/20 z-10'
                          : isAvailable
                          ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-400 hover:border-emerald-600 hover:scale-105 shadow-xs'
                          : 'bg-[#E2E8F0] text-[#94A3B8] border border-[#CBD5E1] cursor-not-allowed opacity-75'
                      }`}
                      title={`Seat ${seat.number} (${seat.zone}) - ${seat.status}`}
                    >
                      {/* Seat Dot Indicator */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full mb-0.5 ${
                          isSelected
                            ? 'bg-white'
                            : isAvailable
                            ? 'bg-emerald-500 group-hover:scale-125 transition-transform'
                            : 'bg-[#94A3B8]'
                        }`}
                      />
                      <span className="text-[9px] font-bold leading-none">
                        {seat.number}
                      </span>

                      {/* Outlet micro-dot */}
                      {seat.hasOutlet && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400/90" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#7F8DA4]">
                No seats found in this zone.
              </div>
            )}

            {/* Entrance / Exit Markers */}
            <div className="mt-6 pt-3 border-t border-dashed border-[#0B132B]/15 flex items-center justify-between text-[10px] text-[#7F8DA4]">
              <span>◄ Main Door & Quiet Air Lock</span>
              <span>Restrooms & Water Station ►</span>
            </div>
          </div>

          {/* Seat details guide */}
          <div className="flex items-center gap-3 px-1 text-[11px] text-[#7F8DA4]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Power outlet available
            </span>
            <span>•</span>
            <span>Tap green dot to reserve desk</span>
          </div>
        </div>

        {/* Selected Seat Confirmation Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-[#FBFBFA]/95 backdrop-blur-md border-t border-[#0B132B]/8 flex flex-col gap-2.5">
          {selectedSeat ? (
            <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-2xl border border-emerald-300 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  #{selectedSeat.number}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0B132B]">
                      Seat {selectedSeat.number}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Available
                    </span>
                  </div>
                  <span className="text-[11px] text-[#485672]">
                    {selectedSeat.zone} • {selectedSeat.hasOutlet ? 'With Outlet' : 'Standard'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-emerald-600">
                <Check className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-[#7F8DA4] py-1 font-medium">
              Tap any green seat dot above to select your desk
            </div>
          )}

          <button
            disabled={!selectedSeat}
            onClick={() => {
              if (selectedSeat) {
                confirmSeat(selectedSpace, selectedSeat);
              }
            }}
            className={`w-full py-3.5 px-5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all apple-btn-tap ${
              selectedSeat
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/25 cursor-pointer'
                : 'bg-[#0B132B]/10 text-[#7F8DA4] cursor-not-allowed shadow-none'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>
              {selectedSeat ? `Confirm Seat #${selectedSeat.number}` : 'Select a Seat to Continue'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
