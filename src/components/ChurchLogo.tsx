import { Language } from '../types';
import churchLogo from '../Logo_simples_CF_rev01.png';

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
  // If className doesn't specify a height, default to a responsive height
  const heightClass = className.includes('h-') ? '' : 'h-10 sm:h-12 md:h-14';

  return (
    <div className={`flex items-center select-none ${heightClass} ${className}`}>
      <img
        src={churchLogo}
        alt="Igreja Cristã Evangélica Nova Vida"
        className="h-full w-auto object-contain transition-all duration-300"
      />
    </div>
  );
}




