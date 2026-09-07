'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { SpaceCard } from '../home/SpaceCard';
import { Bookmark, Compass, Sparkles } from 'lucide-react';

export const SavedScreen: React.FC = () => {
  const { spaces, savedSpaceIds, setActiveTab } = useApp();

  const savedSpaces = spaces.filter((space) => savedSpaceIds.includes(space.id));

  return (
    <div className="flex flex-col gap-4 px-5 pt-3 pb-28 animate-fade-in">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <Bookmark className="w-4 h-4 text-emerald-700 fill-emerald-600/30" />
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Bookmarks
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B132B]">
          Saved Spaces
        </h1>
        <p className="text-xs text-[#485672]">
          Your favorite campus study sanctuaries ready for instant access.
        </p>
      </div>

      {/* Saved Spaces List */}
      {savedSpaces.length > 0 ? (
        <div className="flex flex-col gap-3.5 mt-2">
          {savedSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-8 text-center flex flex-col items-center gap-3 mt-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-sm text-[#0B132B]">No saved spaces yet</p>
            <p className="text-xs text-[#7F8DA4] max-w-xs">
              Tap the bookmark icon on any library card to keep your go-to study spots handy.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('home')}
            className="mt-2 px-4 py-2 rounded-full bg-[#0B132B] text-white text-xs font-semibold flex items-center gap-1.5 apple-btn-tap"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover Spaces</span>
          </button>
        </div>
      )}
    </div>
  );
};
