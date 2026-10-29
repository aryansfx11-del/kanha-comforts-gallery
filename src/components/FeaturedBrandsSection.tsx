import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { FEATURED_BRANDS } from '../data/storeData';
import { buildWhatsAppUrl } from '../utils/enquiry';

export const FeaturedBrandsSection: React.FC = () => {
  const generalBrandsWhatsapp = buildWhatsAppUrl(
    'Hello Kanha Comforts Gallery! I would like to check product availability across Sleepwell, Trident, and Signature Home.'
  );

  return (
    <section
      id="brands"
      aria-labelledby="brands-heading"
      className="scroll-mt-16 md:scroll-mt-20 py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#1F1C1A]/8"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-3">
              <span>FEATURED BRANDS</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>CURATED SELECTION</span>
            </p>
            <h2
              id="brands-heading"
              className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.15] text-[#1F1C1A]"
            >
              Trusted Names for Everyday Comfort
            </h2>
          </div>

          <a
            href={generalBrandsWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#231F1D] text-[#FAF7F2] text-xs sm:text-sm font-medium rounded-md hover:bg-[#38312D] transition-colors self-start md:self-auto whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#D5B98A]" />
            <span>Enquire About Availability</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_BRANDS.map((brand) => {
            const brandWhatsapp = buildWhatsAppUrl(brand.whatsappPrompt);
            return (
              <article
                key={brand.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#1F1C1A]/8 p-7 sm:p-9 flex flex-col justify-between transition-colors duration-200 hover:border-[#A68652]/45"
              >
                <div>
                  <p className="text-xs tracking-[0.14em] text-[#8C6F41] font-medium mb-4">
                    <span>{brand.category.toUpperCase()}</span>
                  </p>

                  {/* Clean Editorial Typographic Wordmark */}
                  <h3 className="font-editorial text-3xl sm:text-[2.1rem] font-semibold tracking-tight text-[#1F1C1A] mb-4">
                    {brand.name}
                  </h3>

                  <div className="w-10 h-[1px] bg-[#C5A878] mb-5" aria-hidden="true" />

                  <p className="text-sm leading-[1.7] text-[#4A433D]">
                    {brand.supportingText}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#1F1C1A]/8">
                  <a
                    href={brandWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#231F1D] hover:text-[#8C6F41] transition-colors whitespace-nowrap"
                  >
                    <span>Ask About {brand.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8C6F41]" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
