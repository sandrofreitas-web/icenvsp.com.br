import { Language } from '../types';

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
  // Brand colors from manual:
  // Cyan (Primary Light): #007cc3
  // Dark Blue (Primary Dark): #28166f
  // Grey (Light): #aaa9a9
  // Dark Grey: #72706f

  const textPrimaryColor = isScrolled ? 'text-[#28166f]' : 'text-white';
  const textSecondaryColor = isScrolled ? 'text-[#72706f]' : 'text-gray-300';
  const logoColor = isScrolled ? 'text-[#28166f]' : 'text-white';
  const dividerBg = isScrolled ? 'bg-[#72706f]/20' : 'bg-white/20';
  const goldColor = 'text-[#b59a57]';
  const goldBg = 'bg-[#b59a57]';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* SVG Church Icon - Church Silhouette with Official Dove Logo inside the circular window */}
      <div className={`flex-shrink-0 transition-transform duration-300 hover:scale-105 ${logoColor}`}>
        <svg
          viewBox="0 0 100 100"
          className="h-10 w-10 sm:h-12 sm:w-12 drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="door-mask">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {/* Pointed Door cut-out */}
              <path d="M 42,85 L 42,67 L 50,59 L 58,67 L 58,85 Z" fill="black" />
            </mask>
          </defs>
          {/* Left Wing of church building */}
          <path d="M 3,50 L 25,40 L 25,85 L 5,85 L 5,52 Z" fill="currentColor" />
          {/* Center Tower of church building with door masked out */}
          <path
            d="M 50,16 L 27,33 L 31,33 L 31,85 L 69,85 L 69,33 L 73,33 Z"
            fill="currentColor"
            mask="url(#door-mask)"
          />
          {/* Right Wing of church building */}
          <path d="M 97,50 L 75,40 L 75,85 L 95,85 L 95,52 Z" fill="currentColor" />
          
          {/* Circular Window with white background */}
          <circle cx="50" cy="46" r="10" fill="white" />
          
          {/* Scaled official circular dove logo inside window */}
          <g transform="translate(50, 46) scale(0.22) translate(-50, -50)">
            {/* Left Wing & Chest - Cyan (#007cc3) */}
            <path
              d="M 50,5 A 45 45 0 0 0 50 95 C 41 85, 32 75, 32 62 C 32 52, 38 48, 31 46 C 35 44, 42 42, 45 35 C 47 28, 48 15, 50 5 Z"
              fill="#007cc3"
            />
            {/* Right Wing & Tail - Dark Blue (#28166f) */}
            <path
              d="M 50,5 A 45 45 0 0 1 50 95 C 58 85, 68 78, 68 70 C 68 62, 58 55, 75 48 C 58 45, 52 35, 68 18 C 58 15, 52 10, 50 5 Z"
              fill="#28166f"
            />
          </g>
        </svg>
      </div>

      {variant === 'full' && (
         <div className="flex items-center space-x-3">
           {/* Vertical Divider line */}
           <div className={`w-[1px] h-10 sm:h-12 transition-colors duration-300 ${dividerBg}`} />
 
           {/* Text Branding Column */}
           <div className="flex flex-col text-left font-gothic">
             {/* Row 1: Igreja Cristã Evangélica */}
             <span
               className={`font-medium text-[10px] sm:text-[11px] leading-tight tracking-normal transition-colors duration-300 ${textPrimaryColor}`}
             >
               {language === 'pt' ? 'Igreja Cristã Evangélica' : 'Evangelical Christian Church'}
             </span>
 
             {/* Row 2: NovaVida */}
             <span
               className={`text-lg sm:text-xl md:text-2xl leading-none -mt-0.5 tracking-tight transition-colors duration-300 ${textPrimaryColor}`}
             >
               <span className="font-medium">Nova</span>
               <span className="font-black">Vida</span>
             </span>
 
             {/* Row 3: Golden Divider */}
             <div className={`h-[1px] w-full mt-1 mb-0.5 ${goldBg}`} />
 
             {/* Row 4: São Paulo Est. 1912 */}
             <span
               className={`font-normal text-[8px] sm:text-[9px] uppercase tracking-widest leading-none ${goldColor}`}
             >
               {language === 'pt' ? 'São Paulo Est. 1912' : 'São Paulo Est. 1912'}
             </span>
           </div>
         </div>
      )}
    </div>
  );
}
