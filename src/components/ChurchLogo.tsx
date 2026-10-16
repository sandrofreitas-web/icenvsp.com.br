import { Language } from '../types';
import logoHorizontalColorido from '../assets/icenv-logo-horizontal-colorido.png';
import logoHorizontalWhite from '../assets/icenv-logo-horizontal-branco.png';
import logoHorizontalColoridoDark from '../assets/icenv-logo-horizontal-colorido-dark.png';
import logoSimplificadaColorido from '../assets/icenv-logo-simplificada-horizontal-colorido.png';
import logoSimplificadaWhite from '../assets/icenv-logo-simplificada-horizontal-branco.png';
import logoSelo1912 from '../assets/icenv-selo-circular-1912-colorido.png';

interface ChurchLogoProps {
  language?: Language;
  variant?: 'full' | 'icon' | 'compact' | 'badge';
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
  // Refined default height for crisp brand prominence without navbar crowding
  const heightClass = className.includes('h-') ? '' : 'h-11 sm:h-12 md:h-14';

  let logoSrc = theme === 'dark' ? logoHorizontalColoridoDark : logoHorizontalColorido;
  if (variant === 'compact' || variant === 'icon') {
    logoSrc = theme === 'dark' ? logoSimplificadaWhite : logoSimplificadaColorido;
  } else if (variant === 'badge') {
    logoSrc = logoSelo1912;
  }

  return (
    <div className={`flex items-center select-none ${heightClass} ${className}`}>
      <img
        src={logoSrc}
        alt="Igreja Cristã Evangélica Nova Vida"
        className="h-full w-auto max-h-full object-contain transition-all duration-300 drop-shadow-xs group-hover:scale-[1.02]"
      />
    </div>
  );
}

