import { useState, useMemo, FormEvent, useEffect } from 'react';
import { Search, Play, Clock, Calendar, User, BookOpen, X, Filter, Mail, Check, RefreshCw } from 'lucide-react';
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
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  // Fetch sermons from database (falls back to static if missing)
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
      const matchesSearch = titleText
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSeries = selectedSeries ? (sermon.series?.[language] === selectedSeries) : true;
      const matchesPreacher = selectedPreacher ? (sermon.preacher?.[language] === selectedPreacher) : true;
      const matchesTheme = selectedTheme ? (sermon.theme?.[language] === selectedTheme) : true;

      return matchesSearch && matchesSeries && matchesPreacher && matchesTheme;
    });
  }, [sermons, language, searchQuery, selectedSeries, selectedPreacher, selectedTheme]);

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  // Reset filters handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSeries('');
    setSelectedPreacher('');
    setSelectedTheme('');
    setVisibleCount(4);
  };

  // Newsletter submission
  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => {
        setIsNewsletterSubscribed(false);
      }, 5000);
    }
  };

  return (
    <>
      <div id="sermoes-view" className="animate-fade-in pt-24">
        {/* 1. HERO BANNER */}
      <section
        id="sermons-hero"
        className="relative bg-neutral-900 text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,15,15,0.85), rgba(15,15,15,0.6)), url("https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            {language === 'pt' ? 'Mídia & Pregação' : 'Media & Preaching'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white">
            {dict.sermonsHeroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200">
            {dict.sermonsHeroSub}
          </p>
        </div>
      </section>

      {/* 2. LIVE SEARCH & DETAILED FILTER BAR */}
      <section id="sermons-filter-bar" className="bg-amber-50/40 border-b border-gray-100 py-8 relative z-20 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="sermon-search-input"
                type="text"
                placeholder={dict.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-all"
              />
            </div>

            {/* Filter Dropdown Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Series Selector */}
              <div className="relative flex items-center bg-white border border-gray-200 rounded-xl shadow-sm px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-amber-500">
                <Filter className="h-4 w-4 text-amber-600 mr-2 shrink-0" />
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                    {dict.filterSeries}
                  </label>
                  <select
                    id="filter-series-select"
                    value={selectedSeries}
                    onChange={(e) => setSelectedSeries(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none w-full border-none p-0 cursor-pointer"
                  >
                    <option value="">{dict.allSeries}</option>
                    {seriesOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preacher Selector */}
              <div className="relative flex items-center bg-white border border-gray-200 rounded-xl shadow-sm px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-amber-500">
                <User className="h-4 w-4 text-amber-600 mr-2 shrink-0" />
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                    {dict.filterPreacher}
                  </label>
                  <select
                    id="filter-preacher-select"
                    value={selectedPreacher}
                    onChange={(e) => setSelectedPreacher(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none w-full border-none p-0 cursor-pointer"
                  >
                    <option value="">{dict.allPreachers}</option>
                    {preacherOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="relative flex items-center bg-white border border-gray-200 rounded-xl shadow-sm px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-amber-500">
                <BookOpen className="h-4 w-4 text-amber-600 mr-2 shrink-0" />
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                    {dict.filterTheme}
                  </label>
                  <select
                    id="filter-theme-select"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none w-full border-none p-0 cursor-pointer"
                  >
                    <option value="">{dict.allThemes}</option>
                    {themeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERMONS DISPLAY GRID */}
      <section id="sermons-grid" className="py-16 bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <RefreshCw className="h-8 w-8 text-[#007cc3] animate-spin mb-3" />
              <span className="text-xs text-gray-400 font-mono">
                {language === 'pt' ? 'Buscando sermões...' : 'Loading sermons...'}
              </span>
            </div>
          ) : filteredSermons.length === 0 ? (
            /* Empty State Container */
            <div id="sermons-empty-state" className="text-center py-20 max-w-md mx-auto space-y-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                <Search className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-bold text-lg text-gray-950">
                  {dict.noSermonsFound}
                </h3>
                <p className="text-gray-500 text-sm">
                  {language === 'pt'
                    ? 'Tente alterar os termos de busca ou remover as seleções dos filtros.'
                    : 'Try changing your search terms or clearing selected dropdown filters.'}
                </p>
              </div>
              <button
                id="reset-sermons-filters"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-amber-500 text-neutral-950 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow"
              >
                {dict.resetFilters}
              </button>
            </div>
          ) : (
            /* Sermon Grid with dynamic limits */
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredSermons.slice(0, visibleCount).map((sermon) => (
                  <div
                    key={sermon.id}
                    id={`sermon-card-${sermon.id}`}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={sermon.image}
                          alt={sermon.title[language]}
                          className="w-full h-full object-cover group-hover:scale-[1.03] duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {/* Play button hover overlay */}
                        <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            id={`play-sermon-${sermon.id}`}
                            onClick={() => setActiveSermon(sermon)}
                            className="h-16 w-16 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center hover:bg-amber-400 hover:scale-110 transition-all shadow shadow-amber-500/10 cursor-pointer"
                          >
                            <Play className="h-6 w-6 fill-neutral-950 ml-1" />
                          </button>
                        </div>
                        {/* Duration flag overlay */}
                        <span className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur text-[10px] font-mono font-semibold text-white px-2 py-0.5 rounded">
                          {sermon.duration}
                        </span>
                      </div>

                      {/* Info Panel */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-block text-[10px] font-mono font-bold bg-amber-50 border border-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {sermon.series[language]}
                          </span>
                          <span className="inline-block text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded">
                            {sermon.theme[language]}
                          </span>
                        </div>

                        <h3
                          onClick={() => setActiveSermon(sermon)}
                          className="font-sans font-extrabold text-lg text-gray-950 cursor-pointer hover:text-amber-700 leading-snug line-clamp-2 transition-colors"
                        >
                          {sermon.title[language]}
                        </h3>

                        <blockquote className="italic border-l-2 border-amber-500/50 pl-3 py-0.5 text-xs text-gray-500 line-clamp-1">
                          {sermon.verse}
                        </blockquote>
                      </div>
                    </div>

                    {/* Preacher and Date Details Footer */}
                    <div className="p-6 pt-0 border-t border-gray-50/50 mt-2 flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                          <User className="h-3 w-3" />
                        </div>
                        <span className="font-semibold text-gray-700">{sermon.preacher[language]}</span>
                      </div>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="h-3.5 w-3.5 text-gray-300" />
                        <span>{new Date(sermon.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Trigger Button */}
              {filteredSermons.length > visibleCount && (
                <div className="text-center pt-6">
                  <button
                    id="load-more-sermons-btn"
                    onClick={handleLoadMore}
                    className="px-6 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    {language === 'pt' ? 'Carregar Mais Sermões' : 'Load More Sermons'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4. NEWSLETTER INSCRIPTION BLOCK */}
      <section id="sermons-newsletter" className="py-16 bg-amber-50/20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="h-12 w-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Mail className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {dict.sermonNewsletterTitle}
            </h2>
            <p className="max-w-lg mx-auto text-sm text-gray-500">
              {dict.sermonNewsletterSub}
            </p>
          </div>

          <form id="newsletter-form" onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              id="newsletter-email-input"
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={dict.emailPlaceholder}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
            <button
              id="newsletter-submit-btn"
              type="submit"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/10 transition-all shrink-0 cursor-pointer"
            >
              {dict.subscribeBtn}
            </button>
          </form>

          {isNewsletterSubscribed && (
            <div
              id="newsletter-success-toast"
              className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-100 text-xs font-semibold animate-in fade-in duration-300"
            >
              <Check className="h-4 w-4 text-emerald-600" />
              <span>{dict.newsletterSuccess}</span>
            </div>
          )}
        </div>
      </section>
      </div>

      {/* MODAL: EXQUISITE SERMON VIDEO PLAYER */}
      {activeSermon && (
        <div
          id="active-sermon-player-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-800">
              <div>
                <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest block font-bold">
                  {activeSermon.series[language]}
                </span>
                <h4 className="text-white font-sans font-bold text-sm sm:text-base line-clamp-1">
                  {activeSermon.title[language]}
                </h4>
              </div>
              <button
                id="close-active-sermon"
                onClick={() => setActiveSermon(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Responsive Iframe Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                id="active-sermon-iframe"
                src={activeSermon.videoUrl}
                title={activeSermon.title[language]}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Details Footer */}
            <div className="p-4 bg-neutral-900 text-neutral-400 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white">{activeSermon.preacher[language]}</span>
                <span>•</span>
                <span>{activeSermon.verse}</span>
                <span>•</span>
                <span>{new Date(activeSermon.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}</span>
              </div>
              <span className="font-mono text-[11px] bg-neutral-800 px-2 py-1 rounded text-amber-400 font-semibold">
                {language === 'pt' ? 'Transmissão Gravada' : 'Recorded Stream'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
