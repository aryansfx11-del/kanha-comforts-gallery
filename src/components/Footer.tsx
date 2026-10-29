import React from 'react';
import { COLLECTIONS } from '../data/storeData';
import { STORE_INFO } from '../utils/enquiry';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1D1917] text-[#E6DFD3] pt-16 sm:pt-20 pb-12 border-t border-[#FAF7F2]/8">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#FAF7F2]/10">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              className="font-editorial text-2xl sm:text-3xl text-[#FAF7F2] tracking-tight inline-block mb-4"
            >
              {STORE_INFO.name}
            </a>
            <p className="text-sm leading-[1.7] text-[#B8AEA0] max-w-sm mb-5">
              One-stop solution for mattresses, pillows, bedsheets, comforters,
              blankets, queen-size beds, and bedroom accessories in New Delhi, India.
            </p>
            <p className="font-editorial italic text-lg text-[#D5B98A]">
              “{STORE_INFO.tagline}”
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs tracking-[0.16em] font-semibold text-[#FAF7F2] mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B8AEA0]">
              <li>
                <a href="#home" className="hover:text-[#FAF7F2] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-[#FAF7F2] transition-colors">
                  Featured Brands
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-[#FAF7F2] transition-colors">
                  Festival Offers
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#FAF7F2] transition-colors">
                  Bedroom Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
                  Contact Store
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs tracking-[0.16em] font-semibold text-[#FAF7F2] mb-4">
              CATEGORIES
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B8AEA0]">
              {COLLECTIONS.map((item) => (
                <li key={item.id}>
                  <a
                    href="#collections"
                    className="hover:text-[#FAF7F2] transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Store Contact & Links */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs tracking-[0.16em] font-semibold text-[#FAF7F2] mb-4">
              STORE &amp; CONNECT
            </h3>
            <ul className="space-y-3 text-sm text-[#B8AEA0]">
              <li>{STORE_INFO.location}</li>
              <li className="tabular-nums">
                <a
                  href={STORE_INFO.phoneTel}
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  {STORE_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5B98A] transition-colors"
                >
                  WhatsApp Enquiry
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5B98A] transition-colors"
                >
                  Instagram ({STORE_INFO.instagramHandle})
                </a>
              </li>
              <li>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5B98A] transition-colors"
                >
                  Google Maps Directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E847A] pr-0 sm:pr-16">
          <p>
            © {currentYear} {STORE_INFO.name}. All rights reserved.
          </p>
          <p>New Delhi, India · Mattresses, Bed Linen &amp; Bedroom Essentials</p>
        </div>
      </div>
    </footer>
  );
};
