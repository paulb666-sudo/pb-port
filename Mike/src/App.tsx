/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SeasonalBoxSection } from './components/SeasonalBoxSection';
import { AvailableThisWeek } from './components/AvailableThisWeek';
import { WhatMikeGrows } from './components/WhatMikeGrows';
import { OurApproach } from './components/OurApproach';
import { MeetMike } from './components/MeetMike';
import { CatnipSection } from './components/CatnipSection';
import { HowToOrder } from './components/HowToOrder';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { OrderModal } from './components/OrderModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ConfirmationDialog } from './components/ConfirmationDialog';

const AppContent: React.FC = () => {
  const { pendingConfirmation, closeConfirmation } = useFarm();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C241F] selection:bg-[#1E3A2B] selection:text-[#FAF7F2] pb-16 lg:pb-0">
      {/* Navigation Header */}
      <Header />

      {/* Main Single Page Experience */}
      <main className="flex-1">
        <Hero />
        <SeasonalBoxSection />
        <AvailableThisWeek />
        <WhatMikeGrows />
        <OurApproach />
        <MeetMike />
        <CatnipSection />
        <HowToOrder />
        <FinalCTA />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Bar */}
      <MobileBottomBar />

      {/* Interactive Order Flow (WhatsApp / Email) */}
      <OrderModal />

      {/* Farmer Mike Admin Drawer & Real-Time Google Doc Sync */}
      <AdminDashboard />

      {/* Mandatory User Confirmation Dialog for mutating Google Docs data */}
      {pendingConfirmation && (
        <ConfirmationDialog
          isOpen={pendingConfirmation.isOpen}
          title={pendingConfirmation.title}
          message={pendingConfirmation.message}
          confirmLabel="Yes, Update Google Doc"
          cancelLabel="Cancel"
          onConfirm={pendingConfirmation.onConfirm}
          onCancel={closeConfirmation}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <FarmProvider>
      <AppContent />
    </FarmProvider>
  );
}
