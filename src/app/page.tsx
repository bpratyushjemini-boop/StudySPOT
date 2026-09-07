'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { DeviceFrame } from '../components/common/DeviceFrame';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { HomeScreen } from '../components/home/HomeScreen';
import { CampusMapScreen } from '../components/map/CampusMapScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { SavedScreen } from '../components/saved/SavedScreen';
import { ProfileScreen } from '../components/profile/ProfileScreen';
import { SpaceDetailsModal } from '../components/spaces/SpaceDetailsModal';
import { ChooseSpaceModal } from '../components/spaces/ChooseSpaceModal';
import { ConfirmationModal } from '../components/booking/ConfirmationModal';
import { DirectionsModal } from '../components/directions/DirectionsModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <DeviceFrame>
      <Header />

      <main className="flex-1 flex flex-col w-full relative">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'map' && <CampusMapScreen />}
        {activeTab === 'search' && <SearchScreen />}
        {activeTab === 'saved' && <SavedScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </main>

      <BottomNav />

      {/* Global Modals for End-to-End Clickable Flows */}
      <SpaceDetailsModal />
      <ChooseSpaceModal />
      <ConfirmationModal />
      <DirectionsModal />
    </DeviceFrame>
  );
};

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
