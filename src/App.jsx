import React, { useState } from 'react';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { WeeklyMenu } from './components/WeeklyMenu.jsx';
import { PricingCalculator } from './components/PricingCalculator.jsx';
import { ServicesSection } from './components/ServicesSection.jsx';
import { FeaturesSection } from './components/FeaturesSection.jsx';
import { DeliveryChecker } from './components/DeliveryChecker.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { ReviewsSection } from './components/ReviewsSection.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { ContactFooter } from './components/ContactFooter.jsx';
import { TrialBookingModal } from './components/TrialBookingModal.jsx';
import { PaymentModal } from './components/PaymentModal.jsx';
import { AdminPanelModal } from './components/AdminPanelModal.jsx';
import { FloatingActions } from './components/FloatingActions.jsx';

export default function App() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedDayMenu, setSelectedDayMenu] = useState(null);

  const handleOpenTrialWithDay = (menu) => {
    setSelectedDayMenu(menu);
    setTrialModalOpen(true);
  };

  return (
    <div className="min-vh-100 bg-white font-sans text-dark d-flex flex-column">
      {/* Header Bar */}
      <Header
        onOpenTrialModal={() => setTrialModalOpen(true)}
        onOpenPaymentModal={() => setPaymentModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow-1">
        <Hero onOpenTrialModal={() => setTrialModalOpen(true)} />
        <WeeklyMenu onSelectDayTrial={handleOpenTrialWithDay} />
        <PricingCalculator
          onOpenTrialModal={() => setTrialModalOpen(true)}
          onOpenPaymentModal={() => setPaymentModalOpen(true)}
        />
        <ServicesSection onOpenTrialModal={() => setTrialModalOpen(true)} />
        <FeaturesSection />
        <DeliveryChecker />
        <AboutSection />
        <ReviewsSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <ContactFooter
        onOpenTrialModal={() => setTrialModalOpen(true)}
        onOpenPaymentModal={() => setPaymentModalOpen(true)}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Modals & Floating Buttons */}
      <TrialBookingModal
        isOpen={trialModalOpen}
        onClose={() => {
          setTrialModalOpen(false);
          setSelectedDayMenu(null);
        }}
        selectedDayMenu={selectedDayMenu}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      <FloatingActions onOpenTrialModal={() => setTrialModalOpen(true)} />
    </div>
  );
}
