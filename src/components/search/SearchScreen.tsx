'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { SpaceCard } from '../home/SpaceCard';
import { FilterChip } from '../../types';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';

export const SearchScreen: React.FC = () => {
  const {
    spaces,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
  } = useApp();

  const filterChips: FilterChip[] = ['All', 'Library', 'Quiet', 'Group', '24×7'];

  const filteredSpaces = spaces.filter((space) => {
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : space.category.includes(activeFilter as any);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      space.name.toLowerCase().includes(q) ||
      space.code.toLowerCase().includes(q) ||
      space.buildingName.toLowerCase().includes(q) ||
      space.amenities.quietLevel.toLowerCase().includes(q) ||
      space.subtitle.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 px-5 pt-3 pb-28 animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#0B132B]">
          Search Spaces
        </h1>
        <p className="text-xs text-[#485672]">
          Find study spaces by building name, code, or quiet preference.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="glass-pill flex items-center px-3.5 py-3 rounded-2xl border border-white/80 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all">
          <Search className="w-4 h-4 text-[#7F8DA4] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search e.g. C1, Digital Library, Silent..."
            className="w-full bg-transparent px-2.5 text-sm text-[#0B132B] placeholder-[#7F8DA4] outline-none font-medium"
            autoFocus={false}
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

      {/* Filter Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-5 px-5">
        {filterChips.map((chip) => {
          const isActive = activeFilter === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 apple-btn-tap ${
                isActive
                  ? 'bg-[#0B132B] text-white shadow-xs'
                  : 'bg-white/80 text-[#485672] hover:bg-white border border-black/5'
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-bold text-[#7F8DA4] uppercase tracking-wider">
          Results ({filteredSpaces.length})
        </span>
        {searchQuery && (
          <span className="text-xs text-emerald-700 font-medium">
            Filtering by “{searchQuery}”
          </span>
        )}
      </div>

      {/* Results List */}
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
          <p className="font-semibold text-sm text-[#0B132B]">No study spots found</p>
          <p className="text-xs text-[#7F8DA4]">
            Try clearing your search or checking our 5 campus library spaces.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
            }}
            className="mt-2 text-xs font-semibold text-emerald-700 underline"
          >
            Show all study spaces
          </button>
        </div>
      )}
    </div>
  );
};
