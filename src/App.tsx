import { useState, useEffect } from 'react';
import { Language, ActiveTab } from './types';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import SobreView from './components/SobreView';
import CultosView from './components/CultosView';
import SermoesView from './components/SermoesView';
import EventosView from './components/EventosView';
import ContatoView from './components/ContatoView';
import AdminView from './components/AdminView';
import { ArrowUp, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeSobreSubTab, setActiveSobreSubTab] = useState<string>('historia');
  const [language, setLanguage] = useState<Language>('pt');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scrolling to trigger scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tab: ActiveTab, subTab?: string) => {
    setActiveTab(tab);
    if (subTab) {
      setActiveSobreSubTab(subTab);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView language={language} onChangeTab={handleTabChange} />;
      case 'sobre':
        return (
          <SobreView
            language={language}
            onChangeTab={handleTabChange}
            activeSubTab={activeSobreSubTab}
            setActiveSubTab={setActiveSobreSubTab}
          />
        );
      case 'cultos':
        return <CultosView language={language} onChangeTab={handleTabChange} />;
      case 'sermoes':
        return <SermoesView language={language} />;
      case 'eventos':
        return <EventosView language={language} />;
      case 'contato':
        return <ContatoView language={language} />;
      case 'admin':
        return <AdminView language={language} />;
      default:
        return <HomeView language={language} onChangeTab={handleTabChange} />;
    }
  };

  return (
    <div id="app-root-wrapper" className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-gray-800">
      {/* Universal Top Navigation Header */}
      <TopNavBar
        currentTab={activeTab}
        onChangeTab={handleTabChange}
        language={language}
        onChangeLanguage={setLanguage}
      />

      {/* Main Multi-Screen Content Node */}
      <main id="main-content-area" className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Quick floating contact badge trigger */}
      {activeTab !== 'contato' && (
        <button
          id="floating-contact-trigger"
          onClick={() => handleTabChange('contato')}
          aria-label="Fale Conosco"
          className="fixed bottom-20 right-6 z-40 h-12 w-12 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/15 cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      )}

      {/* Smooth scroll to top button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={handleScrollToTop}
          aria-label="Voltar ao topo"
          className="fixed bottom-6 right-6 z-40 h-10 w-10 bg-neutral-900 hover:bg-neutral-850 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* Universal Bottom Footer */}
      <Footer onChangeTab={handleTabChange} language={language} />
    </div>
  );
}
