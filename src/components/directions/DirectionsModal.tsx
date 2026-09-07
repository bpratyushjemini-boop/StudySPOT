'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowLeft,
  Navigation,
  Footprints,
  Compass,
  CornerUpRight,
  MoveUp,
  MapPin,
  Clock,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const DirectionsModal: React.FC = () => {
  const { selectedSpace, isDirectionsOpen, closeDirections, openSpaceDetails } = useApp();

  if (!isDirectionsOpen || !selectedSpace) return null;

  const route = selectedSpace.routeFromHub;

  // Icon selector helper
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'CornerUpRight':
        return <CornerUpRight className="w-4 h-4 text-emerald-600" />;
      case 'MoveUp':
        return <MoveUp className="w-4 h-4 text-blue-600" />;
      case 'MapPin':
        return <MapPin className="w-4 h-4 text-rose-600" />;
      default:
        return <Compass className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-md bg-[#FBFBFA] rounded-t-[36px] sm:rounded-[36px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-white/80 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-[#0B132B]/15 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2.5 border-b border-[#0B132B]/5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                closeDirections();
                openSpaceDetails(selectedSpace);
              }}
              className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#0B132B]"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="font-bold text-sm text-[#0B132B]">
                Walking Directions
              </h2>
              <p className="text-[11px] text-[#7F8DA4]">
                Campus Walking Route (Demo)
              </p>
            </div>
          </div>

          <button
            onClick={closeDirections}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#485672]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4 no-scrollbar pb-28">
          {/* Origin & Destination Card */}
          <div className="glass-card rounded-3xl p-4 border border-white flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-1">
                <span className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                <div className="w-0.5 h-7 bg-dashed border-l border-blue-400 my-0.5" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center text-[8px] text-white font-bold">
                  ✓
                </span>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div>
                  <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
                    From (Current Location)
                  </span>
                  <p className="text-xs font-bold text-[#0B132B]">
                    {route.origin}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-[#7F8DA4] uppercase">
                    To Destination
                  </span>
                  <p className="text-xs font-bold text-emerald-800">
                    {route.destination}
                  </p>
                </div>
              </div>
            </div>

            {/* Total time & distance stats */}
            <div className="pt-2.5 border-t border-[#0B132B]/5 flex items-center justify-around text-center">
              <div>
                <span className="text-[10px] text-[#7F8DA4] uppercase font-semibold">
                  Walking Time
                </span>
                <p className="text-sm font-extrabold text-[#0B132B]">
                  {route.totalTime}
                </p>
              </div>

              <div className="w-px h-6 bg-[#0B132B]/10" />

              <div>
                <span className="text-[10px] text-[#7F8DA4] uppercase font-semibold">
                  Distance
                </span>
                <p className="text-sm font-extrabold text-[#0B132B]">
                  {route.totalDistance}
                </p>
              </div>

              <div className="w-px h-6 bg-[#0B132B]/10" />

              <div>
                <span className="text-[10px] text-[#7F8DA4] uppercase font-semibold">
                  Elevation
                </span>
                <p className="text-xs font-bold text-[#0B132B] truncate max-w-[100px]">
                  {route.elevation}
                </p>
              </div>
            </div>
          </div>

          {/* Mini Illustrated Route Map SVG */}
          <div className="glass-card rounded-3xl p-3 border border-white overflow-hidden bg-[#ECE8DF] relative h-48 flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* Campus Greens background */}
              <rect x="0" y="0" width="400" height="240" fill="#EAE6DE" />
              <path
                d="M 20 40 Q 150 20 280 40 T 390 60 L 390 200 L 20 200 Z"
                fill="#DEEADA"
                opacity="0.7"
              />

              {/* Paved roads */}
              <path
                d="M 200 240 L 200 40"
                stroke="#F8F6F0"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 30 140 L 370 140"
                stroke="#F8F6F0"
                strokeWidth="20"
                strokeLinecap="round"
              />

              {/* Start Point (Quad) */}
              <circle cx="200" cy="200" r="8" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2.5" />
              <text x="200" y="222" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontWeight="700">
                You Are Here
              </text>

              {/* Destination Point */}
              <circle
                cx={selectedSpace.mapCoords.x * 4}
                cy={selectedSpace.mapCoords.y * 2.4}
                r="10"
                fill="#10B981"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
              <text
                cx={selectedSpace.mapCoords.x * 4}
                x={selectedSpace.mapCoords.x * 4}
                y={selectedSpace.mapCoords.y * 2.4 - 14}
                textAnchor="middle"
                fill="#065F46"
                fontSize="10"
                fontWeight="800"
              >
                {selectedSpace.code}
              </text>

              {/* Animated Walking Route Polyline */}
              <polyline
                points={route.pathCoordinates
                  .map(([px, py]) => `${px * 4},${py * 2.4}`)
                  .join(' ')}
                fill="none"
                stroke="#10B981"
                strokeWidth="4"
                strokeDasharray="6,4"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>

            {/* Floating Navigation Pill */}
            <div className="absolute top-2 left-3 glass-pill px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#0B132B] flex items-center gap-1 shadow-xs">
              <Footprints className="w-3 h-3 text-emerald-600" />
              <span>Direct Pedestrian Route</span>
            </div>
          </div>

          {/* Turn-by-Turn Step Instructions */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7F8DA4]">
              Turn-by-Turn Instructions
            </h3>

            <div className="flex flex-col gap-2">
              {route.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-3 flex items-start gap-3 border border-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-black/5 shadow-xs">
                    {getStepIcon(step.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#7F8DA4] uppercase">
                        Step {idx + 1}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {step.distance}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#0B132B] mt-0.5">
                      {step.instruction}
                    </p>
                    {step.subtext && (
                      <p className="text-[11px] text-[#7F8DA4] mt-0.5 italic">
                        {step.subtext}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-[#FBFBFA]/95 backdrop-blur-md border-t border-[#0B132B]/8">
          <button
            onClick={closeDirections}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#0B132B] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1C2541] apple-btn-tap shadow-md shadow-[#0B132B]/15"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Got It • Start Walking</span>
          </button>
        </div>
      </div>
    </div>
  );
};
