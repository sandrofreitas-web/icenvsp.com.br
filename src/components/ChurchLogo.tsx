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
  // Default height optimized for clean navigation balance
  const heightClass = className.includes('h-') ? '' : 'h-11 sm:h-12 md:h-13';

  return (
    <div className={`flex items-center select-none ${heightClass} ${className}`}>
      <img
        src={churchLogo}
        alt="Igreja Cristã Evangélica Nova Vida"
        className="h-full w-auto max-h-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-all duration-300"
      />
    </div>
  );
}




