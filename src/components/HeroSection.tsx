import React, { useState } from 'react';
import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { HERO_IMAGE } from '../data/storeData';
import { STORE_INFO, buildWhatsAppUrl } from '../utils/enquiry';
import { ResilientImage } from './ResilientImage';

export const HeroSection: React.FC = () => {
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({
      x: Number((normX * -10).toFixed(2)),
      y: Number((normY * -8).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  const whatsappHref = buildWhatsAppUrl(
    'Hello Kanha Comforts Gallery! I would like to explore your bedroom comfort collection.'
  );

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[88vh] lg:min-h-[92vh] pt-20 flex items-center overflow-hidden bg-[#F2ECE1]"
    >
      {/* Background Cinematic Photograph with subtle interactive depth */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0) scale(1.035)`,
        }}
      >
        <ResilientImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fallbackLabel={STORE_INFO.name}
          priority={true}
          className="w-full h-full"
          imgClassName="object-center lg:object-[62%_center]"
        />
      </div>

      {/* Measured Architectural Contrast Scrims for Legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/97 via-[#FAF7F2]/90 to-[#FAF7F2]/45 sm:from-[#FAF7F2]/96 sm:via-[#FAF7F2]/84 sm:to-[#FAF7F2]/15 lg:from-[#FAF7F2]/95 lg:via-[#FAF7F2]/76 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/50 to-transparent"
      />

      {/* Editorial Foreground Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 sm:px-8 py-14 sm:py-20 lg:py-24">
        <div className="max-w-[600px]">
          {/* Unboxed Metadata Label */}
          <p className="text-xs tracking-[0.18em] font-medium text-[#6B5A45] mb-5">
            <span>KANHA COMFORTS GALLERY</span>
            <span aria-hidden="true" className="mx-2 text-[#A68652]">
              ·
            </span>
            <span>NEW DELHI</span>
          </p>

          <h1 className="font-editorial text-[2.5rem] sm:text-[3.35rem] lg:text-[3.85rem] leading-[1.08] font-normal text-[#1F1C1A] tracking-[-0.015em] mb-6">
            Comfort That Transforms Your Everyday.
          </h1>

          <p className="text-base sm:text-lg leading-[1.7] text-[#3F3934] max-w-[52ch] mb-9">
            Discover thoughtfully selected mattresses, luxurious bed linen, pillows, and
            bedroom essentials designed to make your space feel more like home.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <a
              href="#collections"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#231F1D] text-[#FAF7F2] text-sm font-medium rounded-md hover:bg-[#38312D] transition-all duration-150 shadow-[0_10px_28px_rgba(35,31,29,0.16)] whitespace-nowrap shrink-0"
            >
              <span>Explore Our Collection</span>
              <ArrowDownRight className="w-4 h-4 text-[#D5B98A]" strokeWidth={1.8} />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#FAF7F2]/90 text-[#1F1C1A] border border-[#1F1C1A]/20 text-sm font-medium rounded-md hover:bg-[#FFFFFF] hover:border-[#1F1C1A]/40 transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#8C6F41]" strokeWidth={1.8} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Subtle Editorial Tagline Note */}
          <div className="mt-12 pt-6 border-t border-[#1F1C1A]/12 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5A514A]">
            <span>Mattresses</span>
            <span aria-hidden="true">·</span>
            <span>Bed Linen</span>
            <span aria-hidden="true">·</span>
            <span>Pillows &amp; Comforters</span>
            <span aria-hidden="true">·</span>
            <span>Queen-Size Beds</span>
          </div>
        </div>
      </div>
    </section>
  );
};
