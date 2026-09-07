'use client';

import React, { createContext, useContext, useState } from 'react';
import { StudySpace, TabType, FilterChip, Seat, Booking } from '../types';
import { INITIAL_STUDY_SPACES } from '../data/studySpaces';

interface AppContextType {
  spaces: StudySpace[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeFilter: FilterChip;
  setActiveFilter: (filter: FilterChip) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSpace: StudySpace | null;
  setSelectedSpace: (space: StudySpace | null) => void;
  isDetailsOpen: boolean;
  openSpaceDetails: (space: StudySpace) => void;
  closeSpaceDetails: () => void;
  isSeatPickerOpen: boolean;
  openSeatPicker: (space: StudySpace) => void;
  closeSeatPicker: () => void;
  selectedSeat: Seat | null;
  setSelectedSeat: (seat: Seat | null) => void;
  activeBooking: Booking | null;
  isConfirmationOpen: boolean;
  confirmSeat: (space: StudySpace, seat: Seat) => void;
  closeConfirmation: () => void;
  isDirectionsOpen: boolean;
  openDirections: (space: StudySpace) => void;
  closeDirections: () => void;
  savedSpaceIds: string[];
  toggleSaveSpace: (spaceId: string) => void;
  recentBookings: Booking[];
  deviceFrame: boolean;
  setDeviceFrame: React.Dispatch<React.SetStateAction<boolean>>;
  resetDemoData: () => void;
  demoToast: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<StudySpace[]>(INITIAL_STUDY_SPACES);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeFilter, setActiveFilter] = useState<FilterChip>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Navigation & Flow modals
  const [selectedSpace, setSelectedSpace] = useState<StudySpace | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSeatPickerOpen, setIsSeatPickerOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  
  // Saved spaces (preloaded with a couple bookmarks for realism)
  const [savedSpaceIds, setSavedSpaceIds] = useState<string[]>(['central-c1', 'digital-d6']);
  
  // Recent study spots
  const [recentBookings, setRecentBookings] = useState<Booking[]>([
    {
      id: 'prev-bk-1',
      spaceId: 'central-c1',
      spaceName: 'Central Library (C1)',
      spaceCode: 'C1',
      seatId: 'seat-14',
      seatNumber: 14,
      zone: 'Window Desks',
      floor: 'Floor 2',
      timestamp: 'Yesterday at 3:15 PM',
      validUntil: 'Completed',
    },
    {
      id: 'prev-bk-2',
      spaceId: 'digital-d6',
      spaceName: 'Digital Library (D6)',
      spaceCode: 'D6',
      seatId: 'seat-32',
      seatNumber: 32,
      zone: 'Silent Pods',
      floor: 'Floor 4',
      timestamp: 'Friday, 10:00 AM',
      validUntil: 'Completed',
    },
  ]);

  // Frame toggle for desktop users (true = iPhone 16 Pro mockup shell, false = fluid responsive)
  const [deviceFrame, setDeviceFrame] = useState(true);
  const [demoToast, setDemoToast] = useState<string | null>(null);

  const showDemoToast = (msg: string) => {
    setDemoToast(msg);
    setTimeout(() => {
      setDemoToast(null);
    }, 2800);
  };

  const openSpaceDetails = (space: StudySpace) => {
    setSelectedSpace(space);
    setIsDetailsOpen(true);
  };

  const closeSpaceDetails = () => {
    setIsDetailsOpen(false);
  };

  const openSeatPicker = (space: StudySpace) => {
    setSelectedSpace(space);
    setIsDetailsOpen(false);
    setIsSeatPickerOpen(true);
    setSelectedSeat(null);
  };

  const closeSeatPicker = () => {
    setIsSeatPickerOpen(false);
  };

  const confirmSeat = (space: StudySpace, seat: Seat) => {
    // Generate booking
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const expires = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours pass
    const expireStr = expires.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newBooking: Booking = {
      id: `SS-${Math.floor(100000 + Math.random() * 900000)}`,
      spaceId: space.id,
      spaceName: space.name,
      spaceCode: space.code,
      seatId: seat.id,
      seatNumber: seat.number,
      zone: seat.zone,
      floor: space.floorPlan.floorNumber,
      timestamp: `Today at ${timeStr}`,
      validUntil: `Today until ${expireStr}`,
    };

    // Update space seat status locally
    setSpaces(prev =>
      prev.map(sp => {
        if (sp.id === space.id) {
          const updatedSeats = sp.floorPlan.seats.map(s =>
            s.id === seat.id ? { ...s, status: 'occupied' as const } : s
          );
          const newAvail = Math.max(0, sp.availableSeats - 1);
          return {
            ...sp,
            availableSeats: newAvail,
            status: newAvail === 0 ? 'Full' : newAvail < 15 ? 'Busy' : 'Available',
            floorPlan: {
              ...sp.floorPlan,
              availableSeats: newAvail,
              seats: updatedSeats,
            },
          };
        }
        return sp;
      })
    );

    setActiveBooking(newBooking);
    setRecentBookings(prev => [newBooking, ...prev]);
    setIsSeatPickerOpen(false);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const openDirections = (space: StudySpace) => {
    setSelectedSpace(space);
    setIsConfirmationOpen(false);
    setIsDetailsOpen(false);
    setIsDirectionsOpen(true);
  };

  const closeDirections = () => {
    setIsDirectionsOpen(false);
  };

  const toggleSaveSpace = (spaceId: string) => {
    setSavedSpaceIds(prev => {
      const exists = prev.includes(spaceId);
      if (exists) {
        showDemoToast('Removed from Saved Spaces');
        return prev.filter(id => id !== spaceId);
      } else {
        showDemoToast('Saved to your favorites');
        return [...prev, spaceId];
      }
    });
  };

  const resetDemoData = () => {
    setSpaces(INITIAL_STUDY_SPACES);
    showDemoToast('Demo occupancy data refreshed');
  };

  return (
    <AppContext.Provider
      value={{
        spaces,
        activeTab,
        setActiveTab,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
        selectedSpace,
        setSelectedSpace,
        isDetailsOpen,
        openSpaceDetails,
        closeSpaceDetails,
        isSeatPickerOpen,
        openSeatPicker,
        closeSeatPicker,
        selectedSeat,
        setSelectedSeat,
        activeBooking,
        isConfirmationOpen,
        confirmSeat,
        closeConfirmation,
        isDirectionsOpen,
        openDirections,
        closeDirections,
        savedSpaceIds,
        toggleSaveSpace,
        recentBookings,
        deviceFrame,
        setDeviceFrame,
        resetDemoData,
        demoToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
