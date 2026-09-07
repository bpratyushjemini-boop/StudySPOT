'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isCondensed, setIsCondensed] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 18;

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedSpaceIds.length },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Scroll listener that watches both the app container and the window
  useEffect(() => {
    const handleScroll = (currentScrollTop: number) => {
      const delta = currentScrollTop - lastScrollY.current;

      // When near the top, always expand
      if (currentScrollTop < 30) {
        setIsCondensed(false);
        lastScrollY.current = currentScrollTop;
        return;
      }

      // Scrolling down significantly -> condense
      if (delta > scrollThreshold && currentScrollTop > 60) {
        setIsCondensed(true);
      }
      // Scrolling up significantly -> expand
      else if (delta < -scrollThreshold) {
        setIsCondensed(false);
      }

      lastScrollY.current = currentScrollTop;
    };

    const onContainerScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) {
        handleScroll(target.scrollTop);
      }
    };

    const onWindowScroll = () => {
      handleScroll(window.scrollY || document.documentElement.scrollTop);
    };

    const container = document.getElementById('app-scroll-container');
    if (container) {
      container.addEventListener('scroll', onContainerScroll, { passive: true });
    }
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener('scroll', onContainerScroll);
      }
      window.removeEventListener('scroll', onWindowScroll);
    };
  }, []);

  return (
    <div
      className="fixed bottom-5 sm:bottom-6 left-0 right-0 z-40 max-w-md mx-auto px-4 pointer-events-none flex justify-center"
      style={{ perspective: 1000 }}
    >
      {/* Liquid Glass Pill Navigation Bar */}
      <motion.nav
        role="navigation"
        aria-label="Main Navigation"
        initial={false}
        animate={{
          width: isCondensed ? '78%' : '94%',
          maxWidth: isCondensed ? '320px' : '385px',
          paddingTop: isCondensed ? '6px' : '9px',
          paddingBottom: isCondensed ? '6px' : '9px',
          paddingLeft: isCondensed ? '8px' : '10px',
          paddingRight: isCondensed ? '8px' : '10px',
          scale: isCondensed ? 0.96 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 30,
        }}
        className="pointer-events-auto relative rounded-full liquid-glass-bar flex items-center justify-between overflow-hidden select-none"
      >
        {/* Liquid Glass Specular Top Highlight (Caustic Reflection Rim) */}
        <div className="absolute inset-x-5 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95 pointer-events-none rounded-full" />
        
        {/* Soft Specular Ambient Sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none rounded-full" />

        {/* Tab Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              title={item.label}
              className={`relative flex flex-col items-center justify-center flex-1 rounded-full transition-colors duration-200 apple-btn-tap z-10 ${
                isCondensed ? 'py-1.5' : 'py-1'
              } ${
                isActive
                  ? 'text-[#0B132B]'
                  : 'text-[#7F8DA4] hover:text-[#485672]'
              }`}
            >
              {/* Active Tab Liquid Droplet Highlight Pill */}
              {isActive && (
                <motion.div
                  layoutId="liquid-active-pill"
                  transition={{
                    type: 'spring',
                    stiffness: 460,
                    damping: 34,
                  }}
                  className="absolute inset-0 rounded-full liquid-glass-active -z-10"
                >
                  {/* Subtle refraction sheen inside active pill */}
                  <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
                </motion.div>
              )}

              {/* Icon & Badge Container */}
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`transition-all duration-200 ${
                    isCondensed ? 'w-[19px] h-[19px]' : 'w-5 h-5'
                  } ${
                    isActive
                      ? 'stroke-[2.4] text-[#0B132B] scale-105 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'
                      : 'stroke-[1.8] text-[#7F8DA4]'
                  }`}
                />

                {/* Badge for Saved items */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center shadow-[0_2px_6px_rgba(16,185,129,0.35)] border border-white">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label (smoothly condenses/shrinks when scrolling) */}
              <AnimatePresence initial={false}>
                {!isCondensed && (
                  <motion.span
                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                    transition={{ duration: 0.16, ease: 'easeInOut' }}
                    className={`text-[10px] tracking-tight mt-0.5 overflow-hidden whitespace-nowrap leading-none ${
                      isActive
                        ? 'font-bold text-[#0B132B]'
                        : 'font-medium text-[#7F8DA4]'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Micro Dot for Active Status in Condensed Mode */}
              {isCondensed && isActive && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="w-1 h-1 rounded-full bg-emerald-500 mt-0.5 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                />
              )}
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};
