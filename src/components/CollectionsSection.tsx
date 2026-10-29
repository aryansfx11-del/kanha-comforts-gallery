import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS, CollectionItem } from '../data/storeData';
import { ResilientImage } from './ResilientImage';
import { CollectionModal } from './CollectionModal';

interface PerspectiveCardProps {
  item: CollectionItem;
  onSelect: (item: CollectionItem) => void;
}

const PerspectiveCard: React.FC<PerspectiveCardProps> = ({ item, onSelect }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 4.5).toFixed(2)),
      rotateY: Number((x * 4.5).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={`Explore ${item.title} — ${item.description}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
      className="group text-left w-full bg-[#FFFFFF] rounded-xl border border-[#1F1C1A]/8 overflow-hidden transition-[transform,box-shadow,border-color] duration-200 ease-out hover:border-[#A68652]/45 hover:shadow-[0_18px_40px_rgba(31,28,26,0.08)] flex flex-col will-change-transform"
    >
      {/* 4:3 Lead Product Photograph */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFE9DE]">
        <ResilientImage
          src={item.image}
          alt={item.imageAlt}
          fallbackLabel={item.title}
          className="w-full h-full"
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#1F1C1A]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>

      {/* Clean Card Copy */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#8C6F41] font-medium mb-2 tabular-nums">
            <span>{item.indexLabel}</span>
            <span aria-hidden="true" className="mx-1.5">
              ·
            </span>
            <span>Bedroom Category</span>
          </p>
          <h3 className="font-editorial text-2xl font-semibold text-[#1F1C1A] mb-2 group-hover:text-[#5B4628] transition-colors">
            {item.title}
          </h3>
          <p className="text-sm leading-[1.65] text-[#5A514A]">{item.description}</p>
        </div>

        <div className="mt-5 pt-4 border-t border-[#1F1C1A]/8 flex items-center justify-between text-xs font-medium text-[#231F1D]">
          <span>View Details &amp; Enquire</span>
          <ArrowUpRight className="w-4 h-4 text-[#8C6F41] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>
  );
};

export const CollectionsSection: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(
    null
  );

  return (
    <section
      id="collections"
      aria-labelledby="collections-heading"
      className="scroll-mt-16 md:scroll-mt-20 py-20 sm:py-28 bg-[#F3EDE2]/65 border-y border-[#1F1C1A]/6"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-3">
              <span>CURATED CATEGORIES</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>SIX ESSENTIALS</span>
            </p>
            <h2
              id="collections-heading"
              className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.15] text-[#1F1C1A]"
            >
              Everything Your Bedroom Needs
            </h2>
          </div>

          <p className="text-sm text-[#5A514A] max-w-md leading-[1.65]">
            Select any category to view showroom guidance and enquire directly on WhatsApp
            for current designs and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS.map((item) => (
            <PerspectiveCard
              key={item.id}
              item={item}
              onSelect={setSelectedCollection}
            />
          ))}
        </div>
      </div>

      <CollectionModal
        collection={selectedCollection}
        onClose={() => setSelectedCollection(null)}
      />
    </section>
  );
};
