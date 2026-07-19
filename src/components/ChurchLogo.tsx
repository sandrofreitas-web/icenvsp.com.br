import { Language } from '../types';
import logoSBSF from '../Logo_ICENV_SB_SF.png';

interface ChurchLogoProps {
  language: Language;
  variant?: 'full' | 'icon';
  isScrolled?: boolean;
  className?: string;
}

export default function ChurchLogo({
  language,
  variant = 'full',
  isScrolled = true,
  className = '',
}: ChurchLogoProps) {
  // logoSBSF is navy/dark blue, has no border, and has a transparent background.
  // If isScrolled is true (scrolled, white background), we render it normally.
  // If isScrolled is false (transparent header over dark hero, or dark footer), we make it white using CSS filter.
  const filterClass = isScrolled ? '' : 'brightness-0 invert';
  
  // If className doesn't specify a height, default to a larger responsive height
  const heightClass = className.includes('h-') ? '' : 'h-10 sm:h-12 md:h-14';

  return (
    <div className={`flex items-center select-none ${heightClass} ${className}`}>
      <img
        src={logoSBSF}
        alt="Igreja Cristã Evangélica Nova Vida"
        className={`h-full w-auto object-contain transition-all duration-300 ${filterClass}`}
      />
    </div>
  );
}




