import { Mail, Phone, MapPin, Youtube, Facebook, Instagram, Share2 } from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { DICTIONARY } from '../data';
import ChurchLogo from './ChurchLogo';

interface FooterProps {
  onChangeTab: (tab: ActiveTab) => void;
  language: Language;
}

export default function Footer({ onChangeTab, language }: FooterProps) {
  const dict = DICTIONARY[language];

  const handleLinkClick = (tabId: ActiveTab) => {
    onChangeTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-container" className="bg-gradient-to-br from-[#1e1054] to-[#0a0421] text-gray-200 border-t-2 border-[#b59a57]/30 shadow-2xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick('cultos')}>
              <ChurchLogo language={language} isScrolled={false} className="h-16 sm:h-20 md:h-24" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {language === 'pt'
                ? 'Uma igreja de teologia bíblica e compromisso profundo com o testemunho cristão.'
                : 'A church of biblical theology and deep commitment to Christian witness.'}
            </p>
          </div>

          {/* Navigation Links Col */}
          <div>
            <h3 className="text-base font-bold tracking-wider uppercase text-amber-400 mb-6 font-sans">
              {language === 'pt' ? 'Links Úteis' : 'Useful Links'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('cultos')}
                  className="hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {dict.navServices}
                </button>
              </li>
              <li>
                <a
                  href="#horarios"
                  className="hover:text-amber-400 transition-colors focus:outline-none inline-block"
                >
                  {language === 'pt' ? 'Horários dos Cultos' : 'Worship Times'}
                </a>
              </li>
              <li>
                <a
                  href="#localizacao"
                  className="hover:text-amber-400 transition-colors focus:outline-none inline-block"
                >
                  {language === 'pt' ? 'Localização' : 'Location'}
                </a>
              </li>
            </ul>
          </div>

          {/* Schedule Col */}
          <div>
            <h3 className="text-base font-bold tracking-wider uppercase text-amber-400 mb-6 font-sans">
              {language === 'pt' ? 'Nossos Horários' : 'Our Services'}
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-medium text-amber-400 block">
                  {language === 'pt' ? 'Domingo — 9h30' : 'Sunday — 9:30 AM'}
                </span>
                <span className="text-neutral-400 text-xs">
                  {language === 'pt' ? 'Escola Bíblica Dominical (EBD)' : 'Sunday School (EBD)'}
                </span>
              </div>
              <div>
                <span className="font-medium text-amber-400 block">
                  {language === 'pt' ? 'Domingo — 18h00' : 'Sunday — 6:00 PM'}
                </span>
                <span className="text-neutral-400 text-xs">
                  {language === 'pt' ? 'Culto de Adoração' : 'Worship Service'}
                </span>
              </div>
              <div>
                <span className="font-medium text-amber-400 block">
                  {language === 'pt' ? 'Terça-feira — 20h00' : 'Tuesday — 8:00 PM'}
                </span>
                <span className="text-neutral-400 text-xs">
                  {language === 'pt' ? 'Reunião de Oração' : 'Prayer Meeting'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact details Col */}
          <div>
            <h3 className="text-base font-bold tracking-wider uppercase text-amber-400 mb-6 font-sans">
              {language === 'pt' ? 'Contate-nos' : 'Get in Touch'}
            </h3>
            <ul className="space-y-3.5 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-2.5 mt-0.5 shrink-0" />
                <span>{dict.contactAddress}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-amber-400 mr-2.5 shrink-0" />
                <a href="tel:" className="hover:text-amber-400 transition-colors">
                  {dict.contactPhone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-amber-400 mr-2.5 shrink-0" />
                <a
                  href="mailto:contato@icenvsp.com.br"
                  className="hover:text-amber-400 transition-colors break-all"
                >
                  {dict.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Social / Copyright Row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p className="mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Igreja Cristã Evangélica Nova Vida. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex space-x-5">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-neutral-500 hover:text-red-500 transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-neutral-500 hover:text-blue-500 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-500 hover:text-pink-500 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Igreja Cristã Evangélica Nova Vida',
                    text: 'Desde 1912 pregando a palavra de Deus no coração de São Paulo.',
                    url: window.location.href,
                  });
                } else {
                  alert(language === 'pt' ? 'Link copiado para compartilhar!' : 'Share link copied!');
                }
              }}
              aria-label="Share"
              className="text-neutral-500 hover:text-amber-400 transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
