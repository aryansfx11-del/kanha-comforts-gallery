/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandIntroduction } from './components/BrandIntroduction';
import { CollectionsSection } from './components/CollectionsSection';
import { ComfortStudio3D } from './components/ComfortStudio3D';
import { FeaturedBrandsSection } from './components/FeaturedBrandsSection';
import { FestivalOffersSection } from './components/FestivalOffersSection';
import { WhyShopSection } from './components/WhyShopSection';
import { InspirationGallery } from './components/InspirationGallery';
import { AboutAndAssistanceSection } from './components/AboutAndAssistanceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { NotFoundPage } from './components/NotFoundPage';

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  const isNotFound =
    pathname !== '/' && pathname !== '/index.html' && pathname !== '';

  if (isNotFound) {
    return (
      <NotFoundPage
        onReturnHome={() => {
          window.history.pushState({}, '', '/');
          setPathname('/');
        }}
      />
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F1C1A]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#231F1D] focus:text-[#FAF7F2] focus:rounded-md focus:text-sm"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          <HeroSection />
          <BrandIntroduction />
          <CollectionsSection />
          <ComfortStudio3D />
          <FeaturedBrandsSection />
          <FestivalOffersSection />
          <WhyShopSection />
          <InspirationGallery />
          <AboutAndAssistanceSection />
          <ContactSection />
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
