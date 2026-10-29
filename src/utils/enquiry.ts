export const STORE_INFO = {
  name: 'Kanha Comforts Gallery',
  tagline: 'Your One-Stop Destination for Bedroom Comfort.',
  location: 'New Delhi, India',
  phoneDisplay: '+91 79824 61161',
  phoneTel: 'tel:+917982461161',
  whatsappNumber: '917982461161',
  whatsappBaseUrl: 'https://wa.me/917982461161',
  instagramHandle: '@kanhacomfortsgallery',
  instagramUrl: 'https://www.instagram.com/kanhacomfortsgallery',
  googleMapsUrl: 'https://maps.app.goo.gl/rAXzAVvkLG68PfQa8',
} as const;

export const FESTIVAL_OFFER_PREFILL =
  'Hello Kanha Comforts Gallery! I would like to know about your latest Sleepwell mattress festival offers and available free gifts.';

export interface EnquiryFormInput {
  fullName: string;
  phone: string;
  productInterest: string;
  message: string;
}

export interface EnquiryValidationErrors {
  fullName?: string;
  phone?: string;
  productInterest?: string;
  message?: string;
}

export interface EnquiryValidationResult {
  valid: boolean;
  errors: EnquiryValidationErrors;
}

export const PRODUCT_INTEREST_OPTIONS = [
  'Premium Mattresses',
  'Sleepwell Festival Offers',
  'Pillows & Cushions',
  'Bedsheets & Bed Linen',
  'Comforters & Blankets',
  'Queen-Size Beds',
  'Bedroom Accessories',
  'General Store Enquiry',
] as const;

export function buildWhatsAppUrl(prefillMessage?: string): string {
  if (!prefillMessage || prefillMessage.trim().length === 0) {
    return STORE_INFO.whatsappBaseUrl;
  }
  return `${STORE_INFO.whatsappBaseUrl}?text=${encodeURIComponent(prefillMessage.trim())}`;
}

export function validateEnquiryForm(input: EnquiryFormInput): EnquiryValidationResult {
  const errors: EnquiryValidationErrors = {};

  const trimmedName = input.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  const trimmedPhone = input.phone.trim();
  const digitsOnly = trimmedPhone.replace(/[\s\-+()]/g, '');
  if (!trimmedPhone) {
    errors.phone = 'Please enter a contact phone number.';
  } else if (!/^\d{10,15}$/.test(digitsOnly)) {
    errors.phone = 'Please enter a valid 10 to 15 digit phone number.';
  }

  const trimmedInterest = input.productInterest.trim();
  if (!trimmedInterest) {
    errors.productInterest = 'Please select a product category.';
  }

  const trimmedMessage = input.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please share a brief note about what you are looking for.';
  } else if (trimmedMessage.length < 6) {
    errors.message = 'Please enter at least a few words for your enquiry.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatEnquiryWhatsAppMessage(input: EnquiryFormInput): string {
  const lines = [
    `Hello ${STORE_INFO.name}! I would like to make an enquiry.`,
    '',
    `Name: ${input.fullName.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Interested In: ${input.productInterest.trim()}`,
    `Message: ${input.message.trim()}`,
  ];
  return lines.join('\n');
}

export function getNextGalleryIndex(
  currentIndex: number,
  direction: 'next' | 'prev',
  totalItems: number
): number {
  if (totalItems <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % totalItems;
  }
  return (currentIndex - 1 + totalItems) % totalItems;
}
