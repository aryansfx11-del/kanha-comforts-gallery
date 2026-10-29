import React from 'react';
import { STORE_INFO, buildWhatsAppUrl } from '../utils/enquiry';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappHref = buildWhatsAppUrl(
    `Hello ${STORE_INFO.name}! I would like to enquire about bedroom products at your New Delhi store.`
  );

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kanha Comforts Gallery on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#231F1D] text-[#FAF7F2] border border-[#D5B98A]/40 shadow-[0_12px_32px_rgba(25,22,20,0.28)] hover:bg-[#342E2A] hover:-translate-y-0.5 transition-all duration-150"
    >
      {/* Crisp Recognizable WhatsApp Glyph */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-5 h-5 fill-[#25D366] shrink-0"
      >
        <path d="M12.031 2c-5.508 0-9.987 4.479-9.987 9.988 0 1.763.459 3.479 1.332 4.994L2 22l5.152-1.351a9.95 9.95 0 0 0 4.879 1.277h.004c5.508 0 9.988-4.479 9.988-9.988 0-2.669-1.039-5.178-2.926-7.065A9.927 9.927 0 0 0 12.031 2zm0 18.299h-.003a8.28 8.28 0 0 1-4.222-1.156l-.303-.18-3.139.823.838-3.059-.197-.314a8.277 8.277 0 0 1-1.273-4.425c0-4.579 3.726-8.305 8.303-8.305 2.217 0 4.302.864 5.87 2.433a8.248 8.248 0 0 1 2.431 5.872c0 4.58-3.726 8.311-8.305 8.311zm4.556-6.22c-.25-.125-1.477-.729-1.706-.812-.229-.083-.395-.125-.562.125-.166.25-.645.812-.791.979-.146.166-.291.187-.541.062-.25-.125-1.055-.389-2.009-1.24-.743-.662-1.244-1.481-1.39-1.731-.146-.25-.016-.385.109-.509.112-.112.25-.291.375-.437.125-.146.166-.25.25-.416.083-.167.042-.312-.021-.437-.062-.125-.562-1.354-.77-1.854-.203-.487-.409-.421-.562-.429l-.479-.008c-.166 0-.437.062-.666.312-.229.25-.874.854-.874 2.083s.895 2.416 1.02 2.583c.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.526.598.19 1.143.163 1.573.099.48-.072 1.477-.604 1.685-1.187.208-.583.208-1.083.146-1.187-.063-.104-.229-.167-.479-.292z" />
      </svg>
      <span className="hidden sm:inline text-xs font-medium tracking-wide whitespace-nowrap">
        WhatsApp Us
      </span>
    </a>
  );
};
