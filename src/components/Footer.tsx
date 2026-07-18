import { Mail, Phone, MapPin, Youtube, Facebook, Instagram, Share2 } from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { DICTIONARY } from '../data';
import ChurchLogo from './ChurchLogo';
import DenominationLogo from './DenominationLogo';

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
    <footer id="footer-container" className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick('home')}>
              <ChurchLogo language={language} isScrolled={false} />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {language === 'pt'
                ? 'Uma igreja de teologia bíblica reformada, liturgia acolhedora e compromisso profundo com o testemunho cristão no coração de São Paulo.'
                : 'A church of reformed biblical theology, welcoming liturgy, and deep commitment to Christian witness in the heart of São Paulo.'}
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 block mb-2">
                {language === 'pt' ? 'Filiação Denominacional' : 'Denominational Affiliation'}
              </span>
              <p className="text-xs text-neutral-400 mb-2">
                {language === 'pt'
                  ? 'Filiada à Igreja Cristã Evangélica do Brasil (ICEB).'
                  : 'Affiliated with the Evangelical Christian Church of Brazil (ICEB).'}
              </p>
              <DenominationLogo theme="dark" className="h-8 opacity-90 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Navigation Links Col */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-100 mb-4">
              {language === 'pt' ? 'Links Úteis' : 'Useful Links'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {dict.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('sobre')}
                  className="hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {dict.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('cultos')}
                  className="hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {dict.navServices}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('sermoes')}
                  className="hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {dict.navSermons}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('eventos')}
                  className="hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {dict.navEvents}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contato')}
                  className="hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {dict.navContact}
                </button>
              </li>
              <li className="pt-1.5 border-t border-neutral-800">
                <button
                  onClick={() => handleLinkClick('admin')}
                  className="text-neutral-400 hover:text-amber-400 text-xs font-semibold tracking-wide uppercase transition-colors focus:outline-none flex items-center space-x-1"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
                  <span>{language === 'pt' ? 'Painel Admin' : 'Admin Panel'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Schedule Col */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-100 mb-4">
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
                  {language === 'pt' ? 'Culto de Adoração Principal' : 'Primary Worship Service'}
                </span>
              </div>
              <div>
                <span className="font-medium text-amber-400 block">
                  {language === 'pt' ? 'Terça-feira — 20h00' : 'Tuesday — 8:00 PM'}
                </span>
                <span className="text-neutral-400 text-xs">
                  {language === 'pt' ? 'Reunião de Oração e Estudo' : 'Prayer & Bible Study'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact details Col */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-neutral-100 mb-4">
              {language === 'pt' ? 'Contate-nos' : 'Get in Touch'}
            </h3>
            <ul className="space-y-3.5 text-sm text-neutral-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-2.5 mt-0.5 shrink-0" />
                <span>{dict.contactAddress}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-amber-400 mr-2.5 shrink-0" />
                <a href="tel:1132840000" className="hover:text-amber-400 transition-colors">
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
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
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
