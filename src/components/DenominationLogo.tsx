import React from 'react';

interface DenominationLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function DenominationLogo({ className = 'h-10', theme = 'light' }: DenominationLogoProps) {
  const textColor = theme === 'light' ? 'text-gray-500' : 'text-neutral-300';
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Dove Circle */}
      <svg viewBox="0 0 100 100" className="h-full shrink-0 drop-shadow-sm">
        <circle cx="50" cy="50" r="45" fill="#007cc3" />
        {/* White dove negative space silhouette */}
        <path
          d="M 50,15 A 35 35 0 0 0 50 85 C 43 77, 36 69, 36 59 C 36 51, 41 48, 35 46 C 38 44, 44 42, 46 37 C 48 31, 49 22, 50 15 Z"
          fill="white"
        />
        {/* Subtle highlight to give it depth */}
        <path
          d="M 50,15 A 35 35 0 0 1 50 85 C 56 77, 64 71, 64 65 C 64 59, 56 53, 70 48 C 56 45, 52 37, 64 24 C 56 22, 52 18, 50 15 Z"
          fill="#e6f2fa"
        />
      </svg>
      
      {/* Brand Text styled like the official logo in the attachment */}
      <div className="flex flex-col text-left font-sans select-none leading-none">
        <span className="text-[#007cc3] text-xs sm:text-sm font-medium tracking-wide">
          Igreja
        </span>
        <span className={`text-sm sm:text-base md:text-lg font-black tracking-tight ${textColor}`}>
          Cristã Evangélica
        </span>
      </div>
    </div>
  );
}
