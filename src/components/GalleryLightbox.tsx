import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../data/storeData';
import { getNextGalleryIndex } from '../utils/enquiry';
import { ResilientImage } from './ResilientImage';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  activeIndex,
  onClose,
  onChangeIndex,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onChangeIndex(getNextGalleryIndex(activeIndex, 'next', photos.length));
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex(getNextGalleryIndex(activeIndex, 'prev', photos.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, photos.length, onClose, onChangeIndex]);

  if (activeIndex === null || !photos[activeIndex]) return null;

  const current = photos[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bedroom inspiration lightbox: ${current.title}`}
      className="fixed inset-0 z-50 bg-[#171412]/94 flex flex-col justify-between p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-[#FAF7F2] max-w-[1200px] w-full mx-auto">
        <p className="text-xs tracking-[0.14em] text-[#D5B98A] tabular-nums">
          <span>
            {activeIndex + 1} / {photos.length}
          </span>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <span>{current.category}</span>
        </p>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery lightbox"
          className="w-11 h-11 rounded-full bg-[#FAF7F2]/10 text-[#FAF7F2] hover:bg-[#FAF7F2]/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Image & Prev/Next Controls */}
      <div className="relative flex-1 flex items-center justify-center my-4 max-w-[1200px] w-full mx-auto">
        <button
          type="button"
          onClick={() =>
            onChangeIndex(getNextGalleryIndex(activeIndex, 'prev', photos.length))
          }
          aria-label="Previous inspiration image"
          className="absolute left-0 sm:left-2 z-10 w-11 h-11 rounded-full bg-[#231F1D]/85 text-[#FAF7F2] border border-[#FAF7F2]/15 hover:bg-[#38312D] flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="max-h-[70vh] max-w-[920px] w-full px-12 sm:px-16 flex items-center justify-center">
          <div className="w-full max-h-[68vh] aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-[#FAF7F2]/10">
            <ResilientImage
              src={current.image}
              alt={current.alt}
              fallbackLabel={current.title}
              priority={true}
              className="w-full h-full"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onChangeIndex(getNextGalleryIndex(activeIndex, 'next', photos.length))
          }
          aria-label="Next inspiration image"
          className="absolute right-0 sm:right-2 z-10 w-11 h-11 rounded-full bg-[#231F1D]/85 text-[#FAF7F2] border border-[#FAF7F2]/15 hover:bg-[#38312D] flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Caption Footer */}
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="font-editorial text-2xl text-[#FAF7F2] mb-1">{current.title}</h3>
        <p className="text-xs sm:text-sm text-[#CEC5B8]">{current.caption}</p>
      </div>
    </div>
  );
};
