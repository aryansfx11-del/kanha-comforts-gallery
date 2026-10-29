import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { STORE_INFO, buildWhatsAppUrl } from '../utils/enquiry';

export const AboutAndAssistanceSection: React.FC = () => {
  const assistanceWhatsapp = buildWhatsAppUrl(
    'Hello Kanha Comforts Gallery! I have a few questions before choosing bedroom essentials and would appreciate your guidance.'
  );

  return (
    <section
      aria-labelledby="about-store-heading"
      className="py-20 sm:py-28 bg-[#FAF7F2]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 space-y-16 sm:space-y-20">
        {/* About the Store */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-3">
              <span>ABOUT THE STORE</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>NEW DELHI</span>
            </p>
            <h2
              id="about-store-heading"
              className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.15] text-[#1F1C1A]"
            >
              Comfort, Thoughtfully Chosen.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-5 text-base leading-[1.8] text-[#4A433D]">
            <p>
              {STORE_INFO.name} brings together everyday bedroom essentials in New Delhi,
              making it effortless to furnish and refresh your personal space in one
              considered destination.
            </p>
            <p>
              Whether you are selecting a supportive mattress, choosing breathable cotton
              bedsheets and bed linen, layering seasonal comforters and blankets, or
              exploring queen-size beds, pillows, cushions, and bedroom accessories, our
              focus remains simple: helping you create a calm, comfortable home.
            </p>
          </div>
        </div>

        {/* Questions Before You Buy? (Replaces unverified testimonials with genuine store assistance) */}
        <div className="rounded-xl bg-[#F3EDE2] border border-[#1F1C1A]/8 p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-2">
              PERSONAL GUIDANCE
            </p>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F1C1A] mb-3">
              Questions Before You Buy?
            </h3>
            <p className="text-sm sm:text-base leading-[1.7] text-[#4A433D]">
              Unsure which mattress comfort feel suits your bedroom, or looking to match
              bed linen sizes and current Sleepwell promotional offers? Speak directly
              with our New Delhi store for straightforward product guidance and
              availability.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <a
              href={assistanceWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#231F1D] text-[#FAF7F2] text-sm font-medium rounded-md hover:bg-[#38312D] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#D5B98A]" />
              <span>Ask on WhatsApp</span>
            </a>

            <a
              href={STORE_INFO.phoneTel}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFFFFF] text-[#1F1C1A] border border-[#1F1C1A]/15 text-sm font-medium rounded-md hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#8C6F41]" />
              <span>Call {STORE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
