'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { SpaceCard } from './SpaceCard';
import { FilterChip } from '../../types';
import { Search, X, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    spaces,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    setActiveTab,
  } = useApp();

  const filterChips: FilterChip[] = ['All', 'Library', 'Quiet', 'Group', '24×7'];

  // Filter spaces according to search and active category
  const filteredSpaces = spaces.filter(space => {
    // Category match
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : space.category.includes(activeFilter as any);

    // Search query match (search by name, code, building, quiet level)
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      space.name.toLowerCase().includes(q) ||
      space.code.toLowerCase().includes(q) ||
      space.buildingName.toLowerCase().includes(q) ||
      space.amenities.quietLevel.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-5 px-5 pt-3 pb-28 animate-fade-in">
      {/* Hero Greeting Section */}
      <section className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit">
            <Sparkles className="w-2.5 h-2.5" />
            Live Campus Status
          </span>
          <button
            onClick={() => setActiveTab('map')}
            className="text-xs text-[#485672] font-medium hover:text-[#0B132B] flex items-center gap-1 bg-white/60 px-2.5 py-1 rounded-full border border-black/5"
          >
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>Campus Map</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#0B132B] mt-1">
          Good morning
        </h1>
        <p className="text-[15px] font-normal text-[#485672] leading-snug">
          Find a space. Get to work.
        </p>
      </section>

      {/* Apple-style Search Bar */}
      <div className="relative">
        <div className="glass-pill flex items-center px-3.5 py-2.5 rounded-2xl border border-white/80 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all">
          <Search className="w-4 h-4 text-[#7F8DA4] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a library or building"
            className="w-full bg-transparent px-2.5 text-sm text-[#0B132B] placeholder-[#7F8DA4] outline-none font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-[#7F8DA4] hover:bg-black/5 active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5">
        {filterChips.map((chip) => {
          const isActive = activeFilter === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 apple-btn-tap ${
                isActive
                  ? 'bg-[#0B132B] text-white shadow-md shadow-[#0B132B]/15 scale-[1.02]'
                  : 'bg-white/80 text-[#485672] hover:bg-white hover:text-[#0B132B] border border-black/5'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Nearby Study Spaces Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-base tracking-tight text-[#0B132B]">
              Nearby Study Spaces
            </h2>
            <span className="text-[11px] font-semibold text-[#7F8DA4] bg-white/70 px-2 py-0.5 rounded-full border border-black/5">
              {filteredSpaces.length} spots
            </span>
          </div>

          <span className="text-[11px] text-[#7F8DA4] font-medium">
            Tap for details
          </span>
        </div>

        {/* Space Cards */}
        {filteredSpaces.length > 0 ? (
          <div className="flex flex-col gap-3.5">
            {filteredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-8 text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <p className="font-semibold text-sm text-[#0B132B]">No study spots match</p>
            <p className="text-xs text-[#7F8DA4]">Try selecting another filter or searching a different keyword.</p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-medium text-emerald-700 underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
