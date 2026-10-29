import heroLuxuryBedroomImg from '../assets/images/hero_luxury_bedroom_1793271877340.jpg';
import editorialBedroomSanctuaryImg from '../assets/images/editorial_bedroom_sanctuary_1793271879524.jpg';
import luxuryMattressBedImg from '../assets/images/luxury_mattress_bed_1793271881701.jpg';
import plushBedPillowsImg from '../assets/images/plush_bed_pillows_1793271882767.jpg';
import cottonBedLinenImg from '../assets/images/cotton_bed_linen_1793271884745.jpg';
import layeredBedComfortersImg from '../assets/images/layered_bed_comforters_1793271886277.jpg';
import designerQueenBedImg from '../assets/images/designer_queen_bed_1793271888433.jpg';
import bedroomDecorAccessoriesImg from '../assets/images/bedroom_decor_accessories_1793271890372.jpg';
import festiveWarmBedroomImg from '../assets/images/festive_warm_bedroom_1793271891359.jpg';
import galleryMasterSuiteImg from '../assets/images/gallery_master_suite_1793271893192.jpg';
import galleryLinenDrapeImg from '../assets/images/gallery_linen_drape_1793271895031.jpg';
import galleryWalnutHeadboardImg from '../assets/images/gallery_walnut_headboard_1793271897063.jpg';
import gallerySunlitBeddingImg from '../assets/images/gallery_sunlit_bedding_1793271899099.jpg';
import galleryCozyBlanketsImg from '../assets/images/gallery_cozy_blankets_1793271900119.jpg';
import galleryBedsideStylingImg from '../assets/images/gallery_bedside_styling_1793271900260.jpg';

export interface CollectionItem {
  id: string;
  indexLabel: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  editorialOverview: string;
  enquiryHighlights: string[];
  whatsappPrompt: string;
}

export interface BrandItem {
  id: string;
  name: string;
  category: string;
  supportingText: string;
  whatsappPrompt: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: 'bed' | 'award' | 'message' | 'gift';
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  alt: string;
  layoutSpan: 'wide' | 'tall' | 'standard';
}

export const HERO_IMAGE = {
  src: heroLuxuryBedroomImg,
  alt: 'Spacious contemporary luxury bedroom featuring an upholstered king-size bed, layered ivory and champagne bedding, walnut nightstand, and soft natural morning light.',
};

export const EDITORIAL_INTRO_IMAGE = {
  src: editorialBedroomSanctuaryImg,
  alt: 'Serene sunlit bedroom sanctuary with layered neutral linen bedding, plush cushions, and a dark walnut bedroom bench.',
};

export const FESTIVAL_OFFER_IMAGE = {
  src: festiveWarmBedroomImg,
  alt: 'Warm golden-hour bedroom interior dressed with quilted ivory bedding, champagne cushions, brushed brass candleholders, and subtle festive florals.',
};

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'mattresses',
    indexLabel: '01',
    title: 'Mattresses',
    description: 'Find your ideal foundation for everyday comfort.',
    image: luxuryMattressBedImg,
    imageAlt:
      'Premium quilted euro-top mattress displayed on a tailored dark walnut platform bed in a calm cream bedroom.',
    editorialOverview:
      'A restful night begins beneath the sheets. Explore supportive mattress options—including selections from Sleepwell—suited to different comfort preferences, bed dimensions, and everyday sleeping habits.',
    enquiryHighlights: [
      'Guidance across plush, medium, and firm support feels',
      'Standard and custom-fit mattress sizing assistance',
      'Current Sleepwell festival offers and eligible gifts',
    ],
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I would like assistance choosing a mattress and learning about current options and availability.',
  },
  {
    id: 'pillows-cushions',
    indexLabel: '02',
    title: 'Pillows & Cushions',
    description: 'Thoughtful comfort for a softer, more restful space.',
    image: plushBedPillowsImg,
    imageAlt:
      'Plump ivory sleeping pillows paired with textured linen and bouclé decorative cushions against an upholstered headboard.',
    editorialOverview:
      'Balance head-and-neck sleeping comfort with inviting visual depth. Pair everyday sleeping pillows with tactile accent cushions that bring proportion and softness to your headboard.',
    enquiryHighlights: [
      'Sleeping pillows for varied loft and softness preferences',
      'Decorative cushions and coordinated cushion covers',
      'Layering suggestions for king and queen beds',
    ],
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I am interested in pillows and cushions for my bedroom. Please share what options are currently available.',
  },
  {
    id: 'bedsheets-linen',
    indexLabel: '03',
    title: 'Bedsheets & Bed Linen',
    description: 'Bring a refined finish to your everyday bedding.',
    image: cottonBedLinenImg,
    imageAlt:
      'Fine cotton bedsheets in warm ivory and champagne beige draped neatly across a luxury bed in natural daylight.',
    editorialOverview:
      'Experience breathable fabrics and calm, harmonious palettes designed for daily ease. Discover bedsheets and bed linen selections—including options from Trident and Signature Home—for master and guest bedrooms alike.',
    enquiryHighlights: [
      'Bed linen options from Trident and Signature Home',
      'Everyday cotton bedsheets and coordinated pillowcases',
      'Festive gifting sets and seasonal colorways',
    ],
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I would like to enquire about bedsheets and bed linen options currently available at your store.',
  },
  {
    id: 'comforters-blankets',
    indexLabel: '04',
    title: 'Comforters & Blankets',
    description: 'Add a layer of softness and warmth to your bedroom.',
    image: layeredBedComfortersImg,
    imageAlt:
      'Lofty quilted ivory comforter paired with a folded herringbone blanket across the foot of a wooden bed.',
    editorialOverview:
      'From lightweight all-season AC comforters to cozy winter blankets, effortlessly dress your bed for changing Delhi seasons while adding an inviting, hotel-inspired drape.',
    enquiryHighlights: [
      'Light all-season comforters and warm winter blankets',
      'Textured throws and quilted bed covers',
      'Single, double, queen, and king bed sizing enquiries',
    ],
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I am looking for comforters and blankets. Could you help me with current options and availability?',
  },
  {
    id: 'queen-size-beds',
    indexLabel: '05',
    title: 'Queen-Size Beds',
    description: 'Discover elegant bed designs for your personal sanctuary.',
    image: designerQueenBedImg,
    imageAlt:
      'Contemporary queen-size bed with a channel-tufted beige fabric headboard and solid dark walnut frame.',
    editorialOverview:
      'Anchor your bedroom with clean proportions and enduring warmth. Explore queen-size bed designs selected to pair seamlessly with supportive mattresses and layered textiles.',
    enquiryHighlights: [
      'Queen-size bed designs for modern residential interiors',
      'Guidance on pairing bed frames with compatible mattress sizes',
      'Personal assistance on finishes and current availability',
    ],
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I would like to enquire about queen-size bed designs and current availability.',
  },
  {
    id: 'bedroom-accessories',
    indexLabel: '06',
    title: 'Bedroom Accessories',
    description: 'Complete your space with carefully chosen finishing touches.',
    image: bedroomDecorAccessoriesImg,
    imageAlt:
      'Tasteful bedroom accessories including a woven bed runner, tactile cushions, and warm bedside styling.',
    editorialOverview:
      'Thoughtful home furnishing accents bring cohesion to the entire room. Complete your bedding ensemble with protective layers, bed runners, cushion accents, and everyday bedroom essentials.',
    enquiryHighlights: [
      'Mattress protectors, bed runners, and accent textiles',
      'Home furnishing essentials to coordinate your room palette',
      'Tailored recommendations when refreshing a bedroom',
    ],
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I would like to explore home furnishing and bedroom accessories available at your store.',
  },
];

export const FEATURED_BRANDS: BrandItem[] = [
  {
    id: 'sleepwell',
    name: 'Sleepwell',
    category: 'Mattresses',
    supportingText:
      'Explore Sleepwell mattresses and ask us about current festival offers and eligible gifts.',
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I would like to enquire about Sleepwell mattresses, available models, and current festival offers.',
  },
  {
    id: 'trident',
    name: 'Trident',
    category: 'Bed Linen',
    supportingText: 'Discover bed linen options from Trident.',
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I would like to check current Trident bed linen options and availability.',
  },
  {
    id: 'signature-home',
    name: 'Signature Home',
    category: 'Bed Linen',
    supportingText: 'Explore bed linen options from Signature Home.',
    whatsappPrompt:
      'Hello Kanha Comforts Gallery! I would like to explore Signature Home bed linen options available at your store.',
  },
];

export const WHY_SHOP_BENEFITS: BenefitItem[] = [
  {
    id: 'bedroom-essentials',
    title: 'Bedroom Essentials',
    description: 'Explore mattresses, bedding, and accessories in one place.',
    iconName: 'bed',
  },
  {
    id: 'recognized-brands',
    title: 'Recognized Brands',
    description: 'Discover Sleepwell, Trident, and Signature Home products.',
    iconName: 'award',
  },
  {
    id: 'personal-assistance',
    title: 'Personal Assistance',
    description: 'Contact the store for product guidance and availability.',
    iconName: 'message',
  },
  {
    id: 'current-offers',
    title: 'Current Offers',
    description: 'Ask about available promotions and selected mattress offers.',
    iconName: 'gift',
  },
];

export const INSPIRATION_GALLERY: GalleryPhoto[] = [
  {
    id: 'suite-sanctuary',
    title: 'Calm Architectural Suite',
    category: 'Bedroom Interiors',
    caption:
      'Natural daylight, sheer drapery, and an upholstered bed dressed in tonal sand and ivory linen.',
    image: galleryMasterSuiteImg,
    alt: 'Spacious contemporary master bedroom suite with sheer ivory curtains, sand linen bed, and warm wood flooring.',
    layoutSpan: 'wide',
  },
  {
    id: 'folded-textiles',
    title: 'Layered Cotton & Quilted Weaves',
    category: 'Bed Linen & Coverlets',
    caption:
      'Tactile stacks of breathable bedsheets, quilted coverlets, and tailored pillows in warm neutral hues.',
    image: galleryLinenDrapeImg,
    alt: 'Neatly stacked luxury cotton bedsheets, quilted coverlet, and neutral pillows resting on a walnut bench.',
    layoutSpan: 'tall',
  },
  {
    id: 'headboard-detail',
    title: 'Tailored Upholstery & Timber',
    category: 'Beds & Craftsmanship',
    caption:
      'Warm walnut framing paired with textured cream upholstery and crisp layered sleeping pillows.',
    image: galleryWalnutHeadboardImg,
    alt: 'Close-up of a tailored walnut and cream fabric headboard with a warm brass reading sconce and layered pillows.',
    layoutSpan: 'standard',
  },
  {
    id: 'morning-bedding',
    title: 'Morning Light & Breathable Sheets',
    category: 'Everyday Comfort',
    caption:
      'Crisp sheets turned back over a supportive mattress with a lightweight waffle throw for effortless comfort.',
    image: gallerySunlitBeddingImg,
    alt: 'Sunlit luxury bed with crisp white sheets, beige waffle blanket, and warm plaster wall.',
    layoutSpan: 'standard',
  },
  {
    id: 'evening-throws',
    title: 'Plush Blankets & Evening Warmth',
    category: 'Comforters & Blankets',
    caption:
      'Inviting knit and quilted layers styled at the foot of the bed for restful evenings.',
    image: galleryCozyBlanketsImg,
    alt: 'Foot of an upholstered bed draped with a chunky sand knit blanket and quilted comforter under warm lamp glow.',
    layoutSpan: 'tall',
  },
  {
    id: 'bedside-finishes',
    title: 'Considered Bedside Accents',
    category: 'Bedroom Accessories',
    caption:
      'Coordinated accent cushions, textured runners, and warm ambient lighting that complete a bedroom.',
    image: galleryBedsideStylingImg,
    alt: 'Layered neutral velvet and linen cushions beside a dark walnut nightstand with a sculptural ceramic lamp.',
    layoutSpan: 'wide',
  },
];
