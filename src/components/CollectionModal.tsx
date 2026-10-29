import React, { useEffect, useRef } from 'react';
import { X, MessageCircle, Phone, Check } from 'lucide-react';
import { CollectionItem } from '../data/storeData';
import { STORE_INFO, buildWhatsAppUrl } from '../utils/enquiry';
import { ResilientImage } from './ResilientImage';

interface CollectionModalProps {
  collection: CollectionItem | null;
  onClose: () => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({ collection, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!collection) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [collection, onClose]);

  if (!collection) return null;

  const whatsappHref = buildWhatsAppUrl(collection.whatsappPrompt);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1C1A]/65 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF7F2] rounded-xl shadow-[0_28px_70px_rgba(20,17,15,0.32)] border border-[#1F1C1A]/10">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${collection.title} details`}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FAF7F2]/92 text-[#1F1C1A] flex items-center justify-center hover:bg-[#FFFFFF] transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-6 min-h-[240px] sm:min-h-[300px] md:min-h-full">
            <ResilientImage
              src={collection.image}
              alt={collection.imageAlt}
              fallbackLabel={collection.title}
              className="w-full h-full"
            />
          </div>

          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.14em] text-[#8C6F41] font-medium mb-2">
                <span>COLLECTION {collection.indexLabel}</span>
                <span aria-hidden="true" className="mx-2">
                  ·
                </span>
                <span>CATEGORY SHOWCASE</span>
              </p>

              <h3
                id="collection-modal-title"
                className="font-editorial text-2xl sm:text-3xl text-[#1F1C1A] mb-3"
              >
                {collection.title}
              </h3>

              <p className="text-sm font-medium text-[#3B3530] mb-4">
                {collection.description}
              </p>

              <p className="text-sm leading-[1.7] text-[#5A514A] mb-6">
                {collection.editorialOverview}
              </p>

              <div className="border-t border-[#1F1C1A]/10 pt-4 mb-6">
                <p className="text-xs font-semibold text-[#231F1D] mb-3">
                  How We Can Assist You
                </p>
                <ul className="space-y-2">
                  {collection.enquiryHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A433D]"
                    >
                      <Check
                        className="w-4 h-4 text-[#8C6F41] shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#231F1D] text-[#FAF7F2] text-sm font-medium rounded-md hover:bg-[#38312D] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#D5B98A]" />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href={STORE_INFO.phoneTel}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FFFFFF] text-[#1F1C1A] border border-[#1F1C1A]/15 text-sm font-medium rounded-md hover:bg-[#F3EDE2] transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#8C6F41]" />
                <span>Call {STORE_INFO.phoneDisplay}</span>
              </a>

              <p className="text-[11px] leading-relaxed text-[#6E655D] text-center">
                Photography is illustrative of category styles. Message or call us for
                current designs and store availability in New Delhi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
