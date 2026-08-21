import { Language } from '../types';
import churchLogo from '../Logo simples_SF_r1.png';

interface ChurchLogoProps {
  language?: Language;
  variant?: 'full' | 'icon';
  isScrolled?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export default function ChurchLogo({
  language,
  variant = 'full',
  isScrolled = true,
  className = '',
  theme = 'light',
}: ChurchLogoProps) {
  // Enhanced default height for bold brand prominence with wide horizontal logo
  const heightClass = className.includes('h-') ? '' : 'h-14 sm:h-16 md:h-20';

  return (
    <div className={`flex items-center select-none ${heightClass} ${className}`}>
      <img
        src={churchLogo}
        alt="Igreja Cristã Evangélica Nova Vida"
        className={`h-full w-auto max-h-full object-contain transition-all duration-300 ${
          theme === 'dark'
            ? 'brightness-0 invert drop-shadow-[0_4px_16px_rgba(255,255,255,0.3)]'
            : 'drop-shadow-sm group-hover:scale-105'
        }`}
      />
    </div>
  );
}
