import React, { useState } from 'react';
import { BedDouble } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3EDE2] via-[#EBE2D3] to-[#DFD3BF] text-[#4A433D] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <BedDouble className="w-8 h-8 text-[#8C6F41] mb-3 opacity-80" strokeWidth={1.3} />
        {fallbackLabel && (
          <span className="font-editorial text-lg tracking-wide text-[#231F1D]">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#EFE9DE] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
};
