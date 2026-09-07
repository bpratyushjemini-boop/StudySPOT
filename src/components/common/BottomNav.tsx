'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../../types';
import { Compass, Map, Search, Bookmark, User } from 'lucide-react';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, savedSpaceIds } = useApp();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedSpaceIds.length },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav aria-label="Bottom Navigation" className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto pointer-events-none">
      <div className="mx-4 mb-3.5 pointer-events-auto">
        <div className="glass-pill px-3 py-2 rounded-full border border-white/70 shadow-xl shadow-[#0B132B]/10 flex items-center justify-between">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-full transition-all duration-200 apple-btn-tap ${
                  isActive
                    ? 'text-[#0B132B]'
                    : 'text-[#7F8DA4] hover:text-[#485672]'
                }`}
              >
                {/* Active pill indicator */}
                {isActive && (
                  <span className="absolute inset-0 bg-[#0B132B]/6 rounded-full -z-10" />
                )}

                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-105 stroke-[2.4]' : 'stroke-[1.8]'
                    }`}
                  />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium tracking-tight mt-0.5 ${
                    isActive ? 'font-semibold text-[#0B132B]' : 'text-[#7F8DA4]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
