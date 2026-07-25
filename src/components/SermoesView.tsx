import { useState, useMemo, FormEvent, useEffect } from 'react';
import { Search, Play, Clock, Calendar, User, BookOpen, X, Filter, Mail, Check, RefreshCw, ChevronDown } from 'lucide-react';
import { Language, Sermon } from '../types';
import { DICTIONARY } from '../data';
import { getSermons } from '../lib/supabase';

interface SermoesViewProps {
  language: Language;
}

export default function SermoesView({ language }: SermoesViewProps) {
  const dict = DICTIONARY[language];

  // States
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedPreacher, setSelectedPreacher] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  // Fetch sermons from database
  useEffect(() => {
    let active = true;
    getSermons().then((data) => {
      if (active) {
        setSermons(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Lists for dropdown options
  const seriesOptions = useMemo(() => {
    const list = sermons.map((s) => s.series?.[language] || '');
    return Array.from(new Set(list)).filter(Boolean);
  }, [sermons, language]);

  const preacherOptions = useMemo(() => {
    const list = sermons.map((s) => s.preacher?.[language] || '');
    return Array.from(new Set(list)).filter(Boolean);
  }, [sermons, language]);

  const themeOptions = useMemo(() => {
    const list = sermons.map((s) => s.theme?.[language] || '');
    return Array.from(new Set(list)).filter(Boolean);
  }, [sermons, language]);

  // Filter logic
  const filteredSermons = useMemo(() => {
    return sermons.filter((sermon) => {
      const titleText = sermon.title?.[language] || '';
      const matchesSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeries = selectedSeries ? sermon.series?.[language] === selectedSeries : true;
      const matchesPreacher = selectedPreacher ? sermon.preacher?.[language] === selectedPreacher : true;
      const matchesTheme = selectedTheme ? sermon.theme?.[language] === selectedTheme : true;

      return matchesSearch && matchesSeries && matchesPreacher && matchesTheme;
    });
  }, [sermons, language, searchQuery, selectedSeries, selectedPreacher, selectedTheme]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSeries('');
    setSelectedPreacher('');
    setSelectedTheme('');
    setVisibleCount(6);
  };

  return (
    <div id="sermoes-view" className="animate-fade-in pt-20 bg-background text-on-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[38vh] min-h-[280px] flex items-center justify-center bg-surface-alt border-b border-outline-variant/30">
        <div className="relative z-10 text-center px-4 sm:px-6">
          <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase block mb-3">
            {language === 'pt' ? 'MENSAGENS & ENSINAMENTOS' : 'MESSAGES & TEACHINGS'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            {dict.sermonsHeroTitle}
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {dict.sermonsHeroSub}
          </p>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-white border-b border-outline-variant/30 py-6 sticky top-20 z-40 shadow-sm">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'pt' ? 'Buscar sermão...' : 'Search sermon...'}
                className="w-full pl-11 pr-4 py-3 bg-surface-alt border border-outline rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-sans"
              />
            </div>

            {/* Series Filter */}
            <div className="relative">
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-surface-alt border border-outline rounded-xl appearance-none focus:border-primary outline-none text-sm font-sans cursor-pointer text-on-surface"
              >
                <option value="">{language === 'pt' ? 'Todas as Séries' : 'All Series'}</option>
                {seriesOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
            </div>

            {/* Preacher Filter */}
            <div className="relative">
              <select
                value={selectedPreacher}
                onChange={(e) => setSelectedPreacher(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-surface-alt border border-outline rounded-xl appearance-none focus:border-primary outline-none text-sm font-sans cursor-pointer text-on-surface"
              >
                <option value="">{language === 'pt' ? 'Todos os Pregadores' : 'All Preachers'}</option>
                {preacherOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
            </div>

            {/* Topic Filter */}
            <div className="relative">
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-surface-alt border border-outline rounded-xl appearance-none focus:border-primary outline-none text-sm font-sans cursor-pointer text-on-surface"
              >
                <option value="">{language === 'pt' ? 'Todos os Temas' : 'All Topics'}</option>
                {themeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Grid */}
      <section className="py-16 max-w-container-max mx-auto px-4 sm:px-6 lg:px-12">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <RefreshCw className="h-8 w-8 text-primary animate-spin mb-3" />
            <span className="text-xs text-text-muted font-mono">
              {language === 'pt' ? 'Carregando sermões...' : 'Loading sermons...'}
            </span>
          </div>
        ) : filteredSermons.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <p className="text-text-muted text-lg">
              {language === 'pt'
                ? 'Nenhum sermão encontrado com os filtros selecionados.'
                : 'No sermons found matching your criteria.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all"
            >
              {language === 'pt' ? 'Limpar Filtros' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.slice(0, visibleCount).map((sermon) => (
              <article
                key={sermon.id}
                className="bg-white border border-surface-tint rounded-2xl overflow-hidden dynamic-card ambient-shadow flex flex-col group cursor-pointer"
                onClick={() => setActiveSermon(sermon)}
              >
                <div className="relative aspect-video overflow-hidden bg-neutral-900">
                  <img
                    src={
                      sermon.thumbnail_url ||
                      'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={sermon.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="h-7 w-7 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2.5 py-1 rounded-md text-xs font-mono backdrop-blur-sm">
                    {sermon.duration || '45 min'}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-surface-tint text-primary font-bold rounded-full text-xs uppercase tracking-wider">
                      {sermon.series?.[language] || 'Mensagem'}
                    </span>
                    <span className="text-xs font-mono text-text-muted">
                      {sermon.date || '2026'}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-on-background line-clamp-2 group-hover:text-primary transition-colors">
                    {sermon.title[language]}
                  </h3>

                  <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
                    {sermon.description[language]}
                  </p>

                  <div className="mt-auto pt-4 border-t border-surface-container flex items-center justify-between text-xs text-text-muted font-medium">
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-primary" />
                      {sermon.preacher?.[language] || 'Pr. Silas Campos'}
                    </span>
                    <span className="text-primary font-bold group-hover:underline flex items-center gap-1">
                      {language === 'pt' ? 'Ouvir' : 'Listen'} <Play className="h-3 w-3 fill-current" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredSermons.length > visibleCount && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-container transition-all shadow-md cursor-pointer"
            >
              {language === 'pt' ? 'Carregar Mais Sermões' : 'Load More Sermons'}
            </button>
          </div>
        )}
      </section>

      {/* Sermon Player Modal */}
      {activeSermon && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-primary text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-mono uppercase text-white/80">
                  {activeSermon.series?.[language] || 'Sermão'}
                </span>
                <h3 className="font-display font-bold text-xl">{activeSermon.title[language]}</h3>
              </div>
              <button
                onClick={() => setActiveSermon(null)}
                className="p-2 hover:bg-white/10 rounded-full text-white cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {activeSermon.youtube_id ? (
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeSermon.youtube_id}?autoplay=1`}
                    title={activeSermon.title[language]}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-2xl bg-neutral-900 text-white flex items-center justify-center p-8 text-center">
                  <div>
                    <Play className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-lg font-bold">{activeSermon.title[language]}</p>
                    <p className="text-sm text-neutral-400 mt-1">
                      {activeSermon.preacher?.[language]} — {activeSermon.date}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-900 mb-2">{language === 'pt' ? 'Resumo da Mensagem' : 'Message Summary'}</h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  {activeSermon.description[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
