import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { STORE_INFO, buildWhatsAppUrl } from '../utils/enquiry';

interface NotFoundPageProps {
  onReturnHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturnHome }) => {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1F1C1A] flex flex-col items-center justify-center px-5 text-center">
      <p className="text-xs tracking-[0.18em] text-[#8C6F41] font-medium mb-3">
        404 · PAGE NOT FOUND
      </p>
      <h1 className="font-editorial text-4xl sm:text-5xl text-[#1F1C1A] mb-4">
        Return to Your Sanctuary
      </h1>
      <p className="text-base text-[#5A514A] max-w-md mb-8 leading-relaxed">
        The page you requested could not be found. Explore mattresses, bed linen, and
        bedroom essentials on the {STORE_INFO.name} main showroom page.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3.5">
        <button
          type="button"
          onClick={onReturnHome}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#231F1D] text-[#FAF7F2] text-sm font-medium rounded-md hover:bg-[#38312D] transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 text-[#D5B98A]" />
          <span>Back to Showroom</span>
        </button>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFFFFF] text-[#1F1C1A] border border-[#1F1C1A]/15 text-sm font-medium rounded-md hover:bg-[#F3EDE2] transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 text-[#8C6F41]" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </main>
  );
};
