import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { DICTIONARY } from '../data';
import ChurchLogo from './ChurchLogo';

interface TopNavBarProps {
  currentTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
}

export default function TopNavBar({
  currentTab,
  onChangeTab,
  language,
  onChangeLanguage,
}: TopNavBarProps) {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dict = DICTIONARY[language];

  useEffect(() => {
    // Maintain scrolled state as true to guarantee beautiful, high-contrast light menu
    setIsScrolled(true);
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: dict.navHome },
    { id: 'sobre', label: dict.navAbout },
    { id: 'cultos', label: dict.navServices },
    { id: 'sermoes', label: dict.navSermons },
    { id: 'eventos', label: dict.navEvents },
    { id: 'contato', label: dict.navContact },
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    onChangeTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="top-navbar-container"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            id="brand-logo"
            className="flex items-center cursor-pointer group"
            onClick={() => handleTabClick('home')}
          >
            <ChurchLogo language={language} isScrolled={isScrolled} />
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? isScrolled
                        ? 'bg-[#007cc3]/10 text-[#28166f]'
                        : 'bg-white/15 text-white shadow-sm'
                      : isScrolled
                      ? 'text-gray-600 hover:text-[#007cc3] hover:bg-gray-50'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Language Switcher */}
            <div className="h-5 w-[1px] bg-gray-300 mx-3 self-center hidden lg:block" />
            <div className="flex items-center space-x-1 pl-2">
              <Globe className={`h-4 w-4 ${isScrolled ? 'text-gray-500' : 'text-white/60'}`} />
              <div className="flex items-center text-xs font-mono font-bold">
                <button
                  id="lang-toggle-pt"
                  onClick={() => onChangeLanguage('pt')}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    language === 'pt'
                      ? isScrolled
                        ? 'text-[#007cc3] font-extrabold'
                        : 'text-[#007cc3] font-extrabold'
                      : isScrolled
                      ? 'text-gray-400 hover:text-gray-600'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  PT
                </button>
                <span className={isScrolled ? 'text-gray-300' : 'text-white/30'}>|</span>
                <button
                  id="lang-toggle-en"
                  onClick={() => onChangeLanguage('en')}
                  className={`px-1.5 py-0.5 rounded transition-all ${
                    language === 'en'
                      ? isScrolled
                        ? 'text-[#007cc3] font-extrabold'
                        : 'text-[#007cc3] font-extrabold'
                      : isScrolled
                      ? 'text-gray-400 hover:text-gray-600'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Quick Lang Switch */}
            <button
              id="lang-toggle-mobile"
              onClick={() => onChangeLanguage(language === 'pt' ? 'en' : 'pt')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-mono font-bold border ${
                isScrolled
                  ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all focus:outline-none ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden animate-in slide-in-from-top duration-200"
        >
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left block px-4 py-2.5 rounded-md text-base font-medium transition-all ${
                    isActive
                      ? 'bg-[#007cc3]/10 text-[#28166f] font-semibold'
                      : 'text-gray-600 hover:text-[#007cc3] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
