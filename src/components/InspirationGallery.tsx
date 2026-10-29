import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { INSPIRATION_GALLERY } from '../data/storeData';
import { ResilientImage } from './ResilientImage';
import { GalleryLightbox } from './GalleryLightbox';

export const InspirationGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-16 md:scroll-mt-20 py-20 sm:py-28 bg-[#F3EDE2]/60 border-t border-[#1F1C1A]/8"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-3">
              <span>BEDROOM INSPIRATION</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>EDITORIAL LOOKBOOK</span>
            </p>
            <h2
              id="gallery-heading"
              className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.15] text-[#1F1C1A]"
            >
              Find Inspiration for Your Perfect Bedroom
            </h2>
          </div>

          <p className="text-sm text-[#5A514A] max-w-md leading-[1.65]">
            Explore calm palettes, layered textures, and harmonious bedroom styling.
            Select any photograph to inspect full screen.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {INSPIRATION_GALLERY.map((photo, index) => {
            const colSpanClass =
              index === 0
                ? 'md:col-span-8 aspect-[16/10]'
                : index === 1
                ? 'md:col-span-4 aspect-[4/5] md:aspect-auto md:min-h-[340px]'
                : index === 2
                ? 'md:col-span-4 aspect-[4/3]'
                : index === 3
                ? 'md:col-span-4 aspect-[4/3]'
                : index === 4
                ? 'md:col-span-4 aspect-[4/3]'
                : 'md:col-span-12 aspect-[16/9] sm:aspect-[21/9]';

            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open inspiration photo: ${photo.title}`}
                className={`group relative rounded-xl overflow-hidden bg-[#E9E1D3] text-left focus-visible:ring-2 focus-visible:ring-[#8C6F41] ${colSpanClass}`}
              >
                <ResilientImage
                  src={photo.image}
                  alt={photo.alt}
                  fallbackLabel={photo.title}
                  className="w-full h-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Measured Scrim Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#191614]/80 via-[#191614]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-200"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.14em] text-[#E2C99E] font-medium mb-1">
                      {photo.category.toUpperCase()}
                    </p>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#FAF7F2]">
                      {photo.title}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full bg-[#FAF7F2]/15 text-[#FAF7F2] flex items-center justify-center shrink-0 group-hover:bg-[#FAF7F2] group-hover:text-[#1F1C1A] transition-colors duration-200"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-[#6E655D]">
          Illustrative interior styling lookbook curated for bedroom design inspiration.
        </p>
      </div>

      <GalleryLightbox
        photos={INSPIRATION_GALLERY}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChangeIndex={setActiveIndex}
      />
    </section>
  );
};
