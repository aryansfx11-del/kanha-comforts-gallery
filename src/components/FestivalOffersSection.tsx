import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { FESTIVAL_OFFER_IMAGE } from '../data/storeData';
import { FESTIVAL_OFFER_PREFILL, STORE_INFO, buildWhatsAppUrl } from '../utils/enquiry';
import { ResilientImage } from './ResilientImage';

export const FestivalOffersSection: React.FC = () => {
  const offerWhatsappHref = buildWhatsAppUrl(FESTIVAL_OFFER_PREFILL);

  return (
    <section
      id="offers"
      aria-labelledby="festival-offers-heading"
      className="scroll-mt-16 md:scroll-mt-20 py-20 sm:py-28 bg-[#F3EDE2]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#231F1D] border border-[#C5A878]/30 shadow-[0_24px_60px_rgba(31,28,26,0.16)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Warm Festive Editorial Content */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-[#D9BF93] font-medium mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#D9BF93]" strokeWidth={1.6} />
                <span>SEASONAL PROMOTION · SLEEPWELL MATTRESSES</span>
              </div>

              <h2
                id="festival-offers-heading"
                className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-[#FAF7F2] tracking-[0.01em] mb-5"
              >
                A Little Extra Comfort. A Little Extra Joy.
              </h2>

              <p className="text-base leading-[1.75] text-[#DFD7CB] max-w-[48ch] mb-8">
                Explore festival offers and free gifts on selected Sleepwell mattresses.
                Contact us to discover the latest deals, eligibility, and availability.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={offerWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#D5B98A] text-[#1F1C1A] text-sm font-semibold rounded-md hover:bg-[#E2C99E] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-[#1F1C1A]" strokeWidth={2} />
                  <span>Unlock Current Offers</span>
                </a>

                <a
                  href={STORE_INFO.phoneTel}
                  className="inline-flex items-center justify-center px-6 py-4 text-sm font-medium text-[#FAF7F2] border border-[#FAF7F2]/25 rounded-md hover:bg-[#FAF7F2]/10 transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  Call {STORE_INFO.phoneDisplay}
                </a>
              </div>

              <p className="mt-6 text-xs text-[#B8AEA0] leading-relaxed">
                Offers and complimentary gifts apply to selected Sleepwell mattresses.
                Call or message on WhatsApp to confirm active promotions and stock.
              </p>
            </div>

            {/* Warm Candlelit Bedroom Photograph */}
            <div className="lg:col-span-6 relative min-h-[290px] sm:min-h-[380px]">
              <ResilientImage
                src={FESTIVAL_OFFER_IMAGE.src}
                alt={FESTIVAL_OFFER_IMAGE.alt}
                fallbackLabel="Sleepwell Festival Offers"
                className="w-full h-full lg:h-full"
              />
              <div
                aria-hidden="true"
                className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#231F1D] to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
