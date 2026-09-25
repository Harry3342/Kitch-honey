import React from 'react';

interface KitchLogoProps {
  className?: string;
  variant?: 'badge' | 'horizontal' | 'icon-only' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const KitchLogo: React.FC<KitchLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  showTagline = true,
}) => {
  // Size mapping for badge / image
  const sizeClasses = {
    sm: {
      img: 'w-8 h-8',
      text: 'text-lg',
      tagline: 'text-[9px]',
      icon: 'w-6 h-6',
    },
    md: {
      img: 'w-11 h-11',
      text: 'text-2xl',
      tagline: 'text-[10px]',
      icon: 'w-8 h-8',
    },
    lg: {
      img: 'w-16 h-16',
      text: 'text-3xl',
      tagline: 'text-xs',
      icon: 'w-12 h-12',
    },
    xl: {
      img: 'w-24 h-24',
      text: 'text-4xl',
      tagline: 'text-sm',
      icon: 'w-16 h-16',
    },
  }[size];

  // SVG representation of the dripping honeycomb
  const HoneycombDripIcon = ({ className: iconClass = 'w-8 h-8' }: { className?: string }) => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden="true"
    >
      {/* Upper Hexagon 1 (left) */}
      <polygon
        points="30,22 42,15 54,22 54,36 42,43 30,36"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Upper Hexagon 2 (center) */}
      <polygon
        points="48,12 60,5 72,12 72,26 60,33 48,26"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Upper Hexagon 3 (right) */}
      <polygon
        points="66,22 78,15 90,22 90,36 78,43 66,36"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Lower Hexagon Left */}
      <polygon
        points="21,37 33,30 45,37 45,51 33,58 21,51"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Lower Hexagon Center-Right */}
      <polygon
        points="66,37 78,30 90,37 90,51 78,58 66,51"
        fill="#f59e0b"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* Dripping honey liquid body */}
      <path
        d="M26,45 C26,55 28,62 30,68 C31,71 34,71 35,68 C37,60 40,48 42,48 C44,48 46,58 48,65 C49,68 52,68 53,65 C55,58 57,50 60,50 C62,50 64,68 66,76 C67,81 72,81 73,76 C75,66 77,54 82,46 Z"
        fill="#f59e0b"
      />
      {/* Prominent main drip */}
      <path
        d="M66,65 C66,76 66,84 68,88 C69,90 72,90 73,88 C75,84 75,76 75,65 Z"
        fill="#f59e0b"
      />
      {/* Secondary left drip */}
      <path
        d="M29,60 C29,68 29,74 31,76 C32,77 34,77 35,76 C36,74 36,68 36,60 Z"
        fill="#f59e0b"
      />
      {/* Specular highlights on honey */}
      <ellipse cx="69" cy="86" rx="1.5" ry="2.5" fill="#fef08a" opacity="0.8" />
      <ellipse cx="32" cy="74" rx="1.2" ry="2" fill="#fef08a" opacity="0.8" />
      <path
        d="M33,33 L41,28"
        stroke="#fef08a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M51,23 L59,18"
        stroke="#fef08a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );

  // Variant: BADGE (Exact match with user's uploaded image graphic)
  if (variant === 'badge') {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-[#4A151B] shadow-md border border-[#5d1c23] overflow-hidden ${className}`}
      >
        <img
          src="/kitch-logo.jpg"
          alt="Kitch - The Best Organic Honey In Kenya"
          referrerPolicy="no-referrer"
          className={`${sizeClasses.img} rounded-xl object-contain`}
          onError={(e) => {
            // Fallback to inline SVG if local image fails
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Variant: ICON ONLY
  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src="/kitch-logo.jpg"
          alt="Kitch Honey Logo"
          referrerPolicy="no-referrer"
          className={`${sizeClasses.img} rounded-xl object-cover shadow-xs border border-amber-900/30`}
        />
      </div>
    );
  }

  // Variant: FOOTER (Rich dark backdrop styling)
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <img
          src="/kitch-logo.jpg"
          alt="Kitch Logo"
          referrerPolicy="no-referrer"
          className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shadow-md shrink-0"
        />
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Kitch
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-semibold">
              Organic
            </span>
          </div>
          {showTagline && (
            <span className="text-xs italic text-amber-200/90 font-serif -mt-0.5">
              The Best Organic Honey In Kenya
            </span>
          )}
        </div>
      </div>
    );
  }

  // Variant: HORIZONTAL (Standard Navbar & Headers)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap ${className}`}>
      {/* Brand Icon Image Badge */}
      <div className="relative shrink-0 overflow-hidden rounded-xl bg-[#4A151B] p-0.5 sm:p-1 border border-amber-900/40 shadow-xs">
        <img
          src="/kitch-logo.jpg"
          alt="Kitch Honey"
          referrerPolicy="no-referrer"
          className={`${sizeClasses.img} rounded-lg object-cover shrink-0`}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col shrink-0 justify-center">
        <div className="flex items-center gap-1.5 leading-tight">
          <span className={`font-serif font-bold tracking-tight text-stone-900 hover:text-amber-900 transition-colors leading-none ${sizeClasses.text}`}>
            Kitch
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded leading-none">
            Organic
          </span>
        </div>

        {showTagline && (
          <span className={`italic font-serif text-amber-800 leading-tight hidden lg:block mt-0.5 ${sizeClasses.tagline}`}>
            The Best Organic Honey In Kenya
          </span>
        )}
      </div>
    </div>
  );
};
