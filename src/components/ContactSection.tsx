import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import {
  STORE_INFO,
  PRODUCT_INTEREST_OPTIONS,
  EnquiryFormInput,
  EnquiryValidationErrors,
  validateEnquiryForm,
  formatEnquiryWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/enquiry';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormInput>({
    fullName: '',
    phone: '',
    productInterest: PRODUCT_INTEREST_OPTIONS[0],
    message: '',
  });
  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [preparedWhatsappUrl, setPreparedWhatsappUrl] = useState<string | null>(null);
  const [preparedPreview, setPreparedPreview] = useState<string>('');

  const handleChange = (
    field: keyof EnquiryFormInput,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (preparedWhatsappUrl) {
      setPreparedWhatsappUrl(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateEnquiryForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedWhatsappUrl(null);
      return;
    }

    setErrors({});
    const formattedText = formatEnquiryWhatsAppMessage(formData);
    const whatsappUrl = buildWhatsAppUrl(formattedText);
    setPreparedPreview(formattedText);
    setPreparedWhatsappUrl(whatsappUrl);

    // Trigger anchor navigation in new tab without window.open
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 md:scroll-mt-20 py-20 sm:py-28 bg-[#F3EDE2] border-t border-[#1F1C1A]/8"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Store Details & Direct Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.16em] font-medium text-[#8C6F41] mb-3">
                <span>CONTACT &amp; VISIT</span>
                <span aria-hidden="true" className="mx-2">
                  ·
                </span>
                <span>NEW DELHI</span>
              </p>

              <h2
                id="contact-heading"
                className="font-editorial text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.15] text-[#1F1C1A] mb-5"
              >
                Connect With {STORE_INFO.name}
              </h2>

              <p className="text-base leading-[1.7] text-[#4A433D] mb-8">
                Reach out to confirm product availability, bedroom sizing, or active
                Sleepwell festival offers before visiting our store in New Delhi.
              </p>

              {/* Verified Store Details List */}
              <dl className="space-y-4 border-y border-[#1F1C1A]/10 py-6 mb-8 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[#6E655D] font-medium">Store</dt>
                  <dd className="text-[#1F1C1A] font-medium text-right">
                    {STORE_INFO.name}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[#6E655D] font-medium">Location</dt>
                  <dd className="text-[#1F1C1A] text-right">{STORE_INFO.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[#6E655D] font-medium">Phone</dt>
                  <dd className="text-[#1F1C1A] tabular-nums text-right">
                    <a
                      href={STORE_INFO.phoneTel}
                      className="hover:text-[#8C6F41] transition-colors"
                    >
                      {STORE_INFO.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[#6E655D] font-medium">Instagram</dt>
                  <dd className="text-[#1F1C1A] text-right">
                    <a
                      href={STORE_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#8C6F41] transition-colors"
                    >
                      {STORE_INFO.instagramHandle}
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Four Functional Store Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={STORE_INFO.phoneTel}
                  className="inline-flex items-center justify-between px-4 py-3.5 bg-[#FFFFFF] border border-[#1F1C1A]/12 rounded-md text-sm font-medium text-[#1F1C1A] hover:border-[#8C6F41] transition-colors whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#8C6F41]" />
                    <span>Call Now</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#6E655D]" />
                </a>

                <a
                  href={STORE_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-3.5 bg-[#231F1D] rounded-md text-sm font-medium text-[#FAF7F2] hover:bg-[#38312D] transition-colors whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-[#D5B98A]" />
                    <span>WhatsApp Us</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#D5B98A]" />
                </a>

                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-3.5 bg-[#FFFFFF] border border-[#1F1C1A]/12 rounded-md text-sm font-medium text-[#1F1C1A] hover:border-[#8C6F41] transition-colors whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-[#8C6F41]" />
                    <span>Follow on Instagram</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#6E655D]" />
                </a>

                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-3.5 bg-[#FFFFFF] border border-[#1F1C1A]/12 rounded-md text-sm font-medium text-[#1F1C1A] hover:border-[#8C6F41] transition-colors whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#8C6F41]" />
                    <span>Get Directions</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#6E655D]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated WhatsApp Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] rounded-xl border border-[#1F1C1A]/10 p-6 sm:p-9 lg:p-10 shadow-[0_16px_40px_rgba(31,28,26,0.05)]">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F1C1A] mb-2">
                Send a Product Enquiry
              </h3>
              <p className="text-sm text-[#5A514A] mb-7 leading-relaxed">
                Complete your details below to prepare a formatted WhatsApp enquiry
                directly for {STORE_INFO.name}. Your details are not stored in any
                external database.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="enquiry-full-name"
                      className="block text-xs font-medium text-[#231F1D] mb-2"
                    >
                      Full Name <span className="text-[#8C6F41]">*</span>
                    </label>
                    <input
                      id="enquiry-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="e.g., Aarav Sharma"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName ? 'error-full-name' : undefined
                      }
                      className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] rounded-md border text-[#1F1C1A] placeholder:text-[#8E847A] transition-colors ${
                        errors.fullName
                          ? 'border-[#A63A3A]'
                          : 'border-[#1F1C1A]/15 focus:border-[#8C6F41]'
                      }`}
                    />
                    {errors.fullName && (
                      <p
                        id="error-full-name"
                        role="alert"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#A63A3A]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-xs font-medium text-[#231F1D] mb-2"
                    >
                      Phone Number <span className="text-[#8C6F41]">*</span>
                    </label>
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="e.g., +91 98100 12345"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] rounded-md border text-[#1F1C1A] placeholder:text-[#8E847A] tabular-nums transition-colors ${
                        errors.phone
                          ? 'border-[#A63A3A]'
                          : 'border-[#1F1C1A]/15 focus:border-[#8C6F41]'
                      }`}
                    />
                    {errors.phone && (
                      <p
                        id="error-phone"
                        role="alert"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#A63A3A]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Interest Dropdown */}
                <div>
                  <label
                    htmlFor="enquiry-interest"
                    className="block text-xs font-medium text-[#231F1D] mb-2"
                  >
                    Product Interest <span className="text-[#8C6F41]">*</span>
                  </label>
                  <select
                    id="enquiry-interest"
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={(e) => handleChange('productInterest', e.target.value)}
                    aria-invalid={Boolean(errors.productInterest)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF7F2] rounded-md border border-[#1F1C1A]/15 text-[#1F1C1A] focus:border-[#8C6F41] transition-colors"
                  >
                    {PRODUCT_INTEREST_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Customer Message */}
                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block text-xs font-medium text-[#231F1D] mb-2"
                  >
                    Your Message <span className="text-[#8C6F41]">*</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Share your bed size, preferred category, or questions about availability..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] rounded-md border text-[#1F1C1A] placeholder:text-[#8E847A] transition-colors resize-y ${
                      errors.message
                        ? 'border-[#A63A3A]'
                        : 'border-[#1F1C1A]/15 focus:border-[#8C6F41]'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="error-message"
                      role="alert"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[#A63A3A]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#231F1D] text-[#FAF7F2] text-sm font-medium rounded-md hover:bg-[#38312D] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-[#D5B98A]" />
                  <span>Submit Enquiry via WhatsApp</span>
                </button>
              </form>

              {/* Clear Post-Validation Feedback State */}
              {preparedWhatsappUrl && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 p-5 rounded-lg bg-[#F5EFE5] border border-[#8C6F41]/35 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#4D6B48] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#1F1C1A]">
                        Your WhatsApp Enquiry Is Ready
                      </p>
                      <p className="text-xs text-[#5A514A] mt-0.5 leading-relaxed">
                        If WhatsApp did not open automatically in a new tab, select the
                        button below to send your prefilled message to{' '}
                        {STORE_INFO.phoneDisplay}.
                      </p>
                    </div>
                  </div>

                  <pre className="text-xs text-[#3F3934] bg-[#FAF7F2] p-3 rounded border border-[#1F1C1A]/8 whitespace-pre-wrap font-sans">
                    {preparedPreview}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={preparedWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#231F1D] text-[#FAF7F2] text-xs font-medium rounded-md hover:bg-[#38312D] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#D5B98A]" />
                      <span>Open WhatsApp Conversation</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          fullName: '',
                          phone: '',
                          productInterest: PRODUCT_INTEREST_OPTIONS[0],
                          message: '',
                        });
                        setPreparedWhatsappUrl(null);
                      }}
                      className="px-4 py-2.5 text-xs font-medium text-[#5A514A] hover:text-[#1F1C1A] transition-colors whitespace-nowrap"
                    >
                      Clear Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
