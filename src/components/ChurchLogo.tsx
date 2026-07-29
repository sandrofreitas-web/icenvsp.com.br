import { Language } from '../types';
import logoOld from '../Logo_ICENova_Vida_old.png';

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
  // If className doesn't specify a height, default to a larger responsive height
  const heightClass = className.includes('h-') ? '' : 'h-10 sm:h-12 md:h-14';

  return (
    <div className={`flex items-center select-none ${heightClass} ${className}`}>
      <img
        src={logoOld}
        alt="Igreja Cristã Evangélica Nova Vida"
        className="h-full w-auto object-contain transition-all duration-300"
      />
    </div>
  );
}




