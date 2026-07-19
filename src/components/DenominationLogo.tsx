import logoICE from '../Logo_Denominacao_ICE.png';

interface DenominationLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function DenominationLogo({ className = 'h-10', theme = 'light' }: DenominationLogoProps) {
  // Since logoICE has a solid white background, if we are in dark theme (like in the footer),
  // we render it inside a white rounded container with padding so it looks like a clean badge.
  // In light theme, we can just render the image directly.
  if (theme === 'dark') {
    return (
      <div className="inline-flex items-center bg-white px-4 py-2 rounded-xl shadow-md border border-white/10 hover:shadow-lg transition-all duration-300">
        <img
          src={logoICE}
          alt="Igreja Cristã Evangélica"
          className={`${className} w-auto object-contain`}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoICE}
        alt="Igreja Cristã Evangélica"
        className="h-full w-auto object-contain"
      />
    </div>
  );
}


