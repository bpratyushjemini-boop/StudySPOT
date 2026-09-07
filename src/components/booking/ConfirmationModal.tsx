'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  MapPin,
  Navigation,
  Map,
  X,
  Share2,
  Calendar,
  Clock,
  QrCode,
  Sparkles,
} from 'lucide-react';

export const ConfirmationModal: React.FC = () => {
  const {
    activeBooking,
    selectedSpace,
    isConfirmationOpen,
    closeConfirmation,
    openDirections,
    setActiveTab,
  } = useApp();

  useEffect(() => {
    if (isConfirmationOpen) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10B981', '#34D399', '#0B132B', '#EFEFEA'],
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isConfirmationOpen]);

  if (!isConfirmationOpen || !activeBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md transition-opacity duration-300">
      <div
        className="w-full max-w-sm bg-[#FBFBFA] rounded-[36px] flex flex-col shadow-2xl overflow-hidden border border-white/90 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Confirmed Pass
          </span>

          <button
            onClick={closeConfirmation}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#485672]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-5 pt-2 pb-5 flex flex-col items-center text-center gap-4">
          {/* Animated Success Badge */}
          <div className="relative mt-1">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner ring-8 ring-emerald-50">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B132B]">
              You’re all set!
            </h2>
            <p className="text-xs text-[#485672] font-medium">
              Your study space pass has been confirmed.
            </p>
          </div>

          {/* Apple Wallet Style Pass Card */}
          <div className="w-full bg-white rounded-3xl p-4.5 border border-[#0B132B]/10 shadow-sm flex flex-col gap-3 text-left relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-[#0B132B]" />

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7F8DA4]">
                  Selected Location
                </span>
                <h3 className="font-bold text-sm text-[#0B132B]">
                  {activeBooking.spaceName}
                </h3>
              </div>
              <span className="w-7 h-7 rounded-lg bg-[#0B132B] text-white flex items-center justify-center font-bold text-xs">
                {activeBooking.spaceCode}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#0B132B]/5">
              <div>
                <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
                  Selected Seat
                </span>
                <p className="text-base font-extrabold text-emerald-700">
                  Seat #{activeBooking.seatNumber}
                </p>
                <span className="text-[10px] text-[#485672]">
                  {activeBooking.zone}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
                  Floor Level
                </span>
                <p className="text-sm font-bold text-[#0B132B]">
                  {activeBooking.floor}
                </p>
                <span className="text-[10px] text-[#485672]">
                  Check-in Ready
                </span>
              </div>
            </div>

            {/* Pass details footer */}
            <div className="pt-2 border-t border-dashed border-[#0B132B]/10 flex items-center justify-between text-[11px] text-[#7F8DA4]">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{activeBooking.validUntil}</span>
              </div>
              <span className="font-mono text-[10px] font-medium text-[#0B132B]">
                {activeBooking.id}
              </span>
            </div>
          </div>

          {/* Action Buttons (Requirements: "View on Map" & "Get Directions") */}
          <div className="w-full flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => {
                if (selectedSpace) {
                  openDirections(selectedSpace);
                }
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#0B132B] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1C2541] apple-btn-tap shadow-md shadow-[#0B132B]/15"
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Get Directions</span>
            </button>

            <button
              onClick={() => {
                closeConfirmation();
                setActiveTab('map');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-white border border-[#0B132B]/10 text-[#0B132B] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#0B132B]/5 apple-btn-tap"
            >
              <Map className="w-4 h-4 text-[#485672]" />
              <span>View on Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
