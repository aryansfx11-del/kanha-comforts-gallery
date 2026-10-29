import React from 'react';
import { EDITORIAL_INTRO_IMAGE } from '../data/storeData';
import { STORE_INFO } from '../utils/enquiry';
import { ResilientImage } from './ResilientImage';

export const BrandIntroduction: React.FC = () => {
  return (
    <section
      aria-labelledby="sanctuary-heading"
      className="py-20 sm:py-28 bg-[#FAF7F2]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Editorial Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-4">
              <span>THE SHOWROOM EXPERIENCE</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>NEW DELHI</span>
            </p>

            <h2
              id="sanctuary-heading"
              className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.15] font-normal text-[#1F1C1A] mb-6"
            >
              Your Bedroom. Your Comfort. Your Sanctuary.
            </h2>

            <p className="text-base leading-[1.75] text-[#4A433D] mb-6">
              From the perfect mattress to the finishing touches of beautiful bed linen,
              discover bedroom essentials that bring comfort, style, and warmth into your
              everyday life.
            </p>

            <p className="text-sm leading-[1.7] text-[#5E554D] mb-8">
              At {STORE_INFO.name}, every layer of the bedroom is considered together—from
              supportive foundations and queen-size beds to breathable sheets, plush pillows,
              and seasonal comforters.
            </p>

            <div className="pt-6 border-t border-[#1F1C1A]/10">
              <p className="font-editorial italic text-xl text-[#2B2522]">
                “{STORE_INFO.tagline}”
              </p>
            </div>
          </div>

          {/* Lifestyle Photograph Column */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[320px] sm:min-h-[420px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(31,28,26,0.08)]">
              <ResilientImage
                src={EDITORIAL_INTRO_IMAGE.src}
                alt={EDITORIAL_INTRO_IMAGE.alt}
                fallbackLabel="Bedroom Sanctuary"
                className="w-full h-full lg:h-full"
                imgClassName="transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
