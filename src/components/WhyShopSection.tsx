import React from 'react';
import { BedDouble, Award, MessageSquare, Gift } from 'lucide-react';
import { WHY_SHOP_BENEFITS, BenefitItem } from '../data/storeData';

const renderIcon = (name: BenefitItem['iconName']) => {
  const props = { className: 'w-5 h-5 text-[#8C6F41]', strokeWidth: 1.6 };
  switch (name) {
    case 'bed':
      return <BedDouble {...props} />;
    case 'award':
      return <Award {...props} />;
    case 'message':
      return <MessageSquare {...props} />;
    case 'gift':
      return <Gift {...props} />;
  }
};

export const WhyShopSection: React.FC = () => {
  return (
    <section
      aria-labelledby="why-shop-heading"
      className="py-20 sm:py-24 bg-[#FAF7F2]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="max-w-xl mb-12">
          <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-3">
            <span>WHY SHOP WITH US</span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span>THOUGHTFUL SERVICE</span>
          </p>
          <h2
            id="why-shop-heading"
            className="font-editorial text-3xl sm:text-4xl text-[#1F1C1A]"
          >
            Everything Chosen for Restful Living
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_SHOP_BENEFITS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-xl bg-[#FFFFFF] border border-[#1F1C1A]/8"
            >
              <div className="w-11 h-11 rounded-lg bg-[#F3EDE2] flex items-center justify-center mb-5">
                {renderIcon(item.iconName)}
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-[#1F1C1A] mb-2">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.65] text-[#5A514A]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
