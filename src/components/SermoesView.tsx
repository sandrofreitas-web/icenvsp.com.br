import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Play,
  Calendar,
  User,
  BookOpen,
  X,
  RefreshCw,
  ChevronDown,
  Download,
  FileText,
  Bookmark,
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Language, Sermon, SermonarioEntry } from '../types';
import { DICTIONARY, SERMONARIO_2026, SERMONARIO_BOOKS, SERMONS } from '../data';
import { getSermons } from '../lib/supabase';

interface SermoesViewProps {
  language: Language;
}

export default function SermoesView({ language }: SermoesViewProps) {
  const dict = DICTIONARY[language];

  // View mode tab: 'sermonario' | 'videos'
  const [activeTab, setActiveTab] = useState<'sermonario' | 'videos'>('sermonario');

  // Video sermons states
  const [sermons, setSermons] = useState<Sermon[]>(SERMONS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedPreacher, setSelectedPreacher] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  // Sermonário filter states
  const [sermonarioMonth, setSermonarioMonth] = useState<string>('all');
  const [sermonarioSearch, setSermonarioSearch] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch sermons from database
  useEffect(() => {
    let active = true;
    getSermons().then((data) => {
      if (active) {
        if (data && data.length > 0) {
          setSermons(data);
        } else {
          setSermons(SERMONS);
        }
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Filtered Sermonario Entries
  const filteredSermonario = useMemo(() => {
    return SERMONARIO_2026.filter((item) => {
      const matchesMonth = sermonarioMonth === 'all' || item.mes === sermonarioMonth;
      const query = sermonarioSearch.toLowerCase().trim();
      if (!query) return matchesMonth;

      const title = item.tituloTema?.[language]?.toLowerCase() || '';
      const scripture = item.textoBiblico.toLowerCase();
      const series = item.serie[language].toLowerCase();
      const refs = item.referencias?.toLowerCase() || '';

      const matchesQuery =
        title.includes(query) ||
        scripture.includes(query) ||
        series.includes(query) ||
        refs.includes(query);

      return matchesMonth && matchesQuery;
    });
  }, [sermonarioMonth, sermonarioSearch, language]);

  // Video dropdown options
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

  // Video Filter logic
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

  const handleResetVideoFilters = () => {
    setSearchQuery('');
    setSelectedSeries('');
    setSelectedPreacher('');
    setSelectedTheme('');
    setVisibleCount(6);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/docs/sermonario2026.pdf');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div id="sermoes-view" className="animate-fade-in pt-20 bg-background text-on-background min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#0c3945] to-[#124250] text-white overflow-hidden border-b border-[#2a8182]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40 text-[#bbd2d0] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2a8182]" />
              <span>{language === 'pt' ? 'Pregação Bíblica Expositiva' : 'Expository Biblical Preaching'}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'pt' ? 'Sermões & Sermonário 2026' : 'Sermons & 2026 Preaching Calendar'}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              {language === 'pt'
                ? 'Conheça o planejamento pastoral da Palavra de Deus para o 2º semestre de 2026. Acompanhe as leituras bíblicas e acesse nossa biblioteca de mensagens gravadas.'
                : 'Explore our pastoral preaching calendar for the 2nd half of 2026. Follow weekly scripture readings and access our video library.'}
            </p>

            {/* Quick Action Download Button */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/docs/sermonario2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="sermonario2026_icenv.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-[#329697] text-white text-xs sm:text-sm font-bold shadow-md shadow-secondary/30 transition-all duration-200 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'pt' ? 'Baixar Sermonário Oficial (PDF)' : 'Download Official Calendar (PDF)'}</span>
              </a>

              <button
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium border border-white/20 transition-all active:scale-95"
                title="Copiar link do PDF"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">{language === 'pt' ? 'Link Copiado!' : 'Link Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-300" />
                    <span>{language === 'pt' ? 'Compartilhar' : 'Share'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TAB SELECTOR: SERMONÁRIO 2026 vs ACERVO EM VÍDEO */}
      <section className="bg-white border-b border-gray-200 sticky top-16 sm:top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-2 scrollbar-none">
            <div className="inline-flex p-1 bg-surface-alt rounded-2xl border border-gray-200 shadow-inner">
              <button
                onClick={() => setActiveTab('sermonario')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === 'sermonario'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-neutral-dark hover:text-primary hover:bg-white/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'pt' ? 'Sermonário 2026 (Escala Litúrgica)' : '2026 Calendar (Liturgical Scale)'}</span>
                <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-secondary text-white font-extrabold">
                  {SERMONARIO_2026.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === 'videos'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-neutral-dark hover:text-primary hover:bg-white/60'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{language === 'pt' ? 'Mensagens Gravadas (Vídeos)' : 'Recorded Messages (Videos)'}</span>
                <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-200 text-slate-800 font-extrabold">
                  {sermons.length}
                </span>
              </button>
            </div>

            {/* Quick Badge */}
            <div className="hidden md:flex items-center gap-2 text-xs text-neutral-dark font-medium font-sans">
              <BookOpen className="w-4 h-4 text-secondary" />
              <span>{language === 'pt' ? 'Ano Bíblico 2026 • 2º Semestre' : 'Biblical Year 2026 • 2nd Semester'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTENT AREA */}
      {activeTab === 'sermonario' ? (
        /* ========================================================================= */
        /* ABA 1: SERMONÁRIO 2026                                                    */
        /* ========================================================================= */
        <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Card das Séries Oficiais e Livros Recomendados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERMONARIO_BOOKS.map((book, idx) => (
              <div
                key={`book-${idx}`}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-secondary/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-secondary/15 text-primary">
                      {book.tag[language]}
                    </span>
                    <span className="text-xs font-mono text-gray-500">{book.editora}</span>
                  </div>
                  <h3 className="font-display text-xl font-extrabold text-primary leading-tight">
                    {book.titulo}
                  </h3>
                  <p className="text-xs font-mono text-secondary font-bold">
                    {language === 'pt' ? 'Autor:' : 'Author:'} {book.autor} • {book.serie[language]}
                  </p>
                  <p className="text-sm text-neutral-dark leading-relaxed font-sans">
                    {book.descricao[language]}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-secondary" />
                    <span>{language === 'pt' ? 'Acompanhamento do Membro' : 'Congregational Reading'}</span>
                  </span>
                  <span className="font-bold text-primary font-mono">Editora Fiel</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filtros por Mês e Busca */}
          <div className="bg-surface-alt rounded-2xl p-4 sm:p-5 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Seletor de Meses */}
            <div className="flex items-center flex-wrap gap-1.5 w-full sm:w-auto">
              <span className="text-xs font-mono font-bold text-gray-500 mr-1 uppercase">
                {language === 'pt' ? 'Filtrar Mês:' : 'Filter Month:'}
              </span>
              {[
                { id: 'all', label: language === 'pt' ? 'Todos' : 'All' },
                { id: '08', label: language === 'pt' ? 'Agosto' : 'August' },
                { id: '09', label: language === 'pt' ? 'Setembro' : 'September' },
                { id: '10', label: language === 'pt' ? 'Outubro' : 'October' },
                { id: '11', label: language === 'pt' ? 'Novembro' : 'November' },
                { id: '12', label: language === 'pt' ? 'Dezembro' : 'December' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSermonarioMonth(btn.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    sermonarioMonth === btn.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Input de Busca no Sermonário */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={sermonarioSearch}
                onChange={(e) => setSermonarioSearch(e.target.value)}
                placeholder={language === 'pt' ? 'Buscar texto bíblico ou tema...' : 'Search verse or topic...'}
                className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {sermonarioSearch && (
                <button
                  onClick={() => setSermonarioSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Grid / Lista de Sermões do Calendário */}
          {filteredSermonario.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-gray-200">
              <Calendar className="w-10 h-10 text-gray-300 mx-auto" />
              <h4 className="text-base font-bold text-gray-800">
                {language === 'pt' ? 'Nenhum sermão encontrado' : 'No sermons found'}
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {language === 'pt'
                  ? 'Tente remover o filtro de mês ou o termo de pesquisa.'
                  : 'Try clearing the month filter or the search term.'}
              </p>
              <button
                onClick={() => {
                  setSermonarioMonth('all');
                  setSermonarioSearch('');
                }}
                className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90"
              >
                {language === 'pt' ? 'Limpar Filtros' : 'Clear Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSermonario.map((item) => {
                const isSpecial = item.tipo === 'especial';
                const isAdvent = item.tipo === 'advento';
                const isGratitude = item.tipo === 'gratidao';

                return (
                  <article
                    key={item.id}
                    className={`bg-white rounded-2xl p-6 border transition-all duration-200 hover:shadow-md flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                      isSpecial
                        ? 'border-amber-400/80 bg-gradient-to-br from-white via-amber-50/20 to-amber-50/40 shadow-xs'
                        : isAdvent
                        ? 'border-secondary/40 bg-gradient-to-br from-white via-[#f0f8f8] to-[#e4f2f2]'
                        : isGratitude
                        ? 'border-emerald-500/40 bg-gradient-to-br from-white to-emerald-50/30'
                        : 'border-gray-200 hover:border-secondary/40'
                    }`}
                  >
                    {/* Top Tag & Date */}
                    <div className="flex items-start justify-between gap-3">
                      {/* Bloco de Data */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex flex-col items-center justify-center rounded-xl h-14 w-14 shrink-0 shadow-xs font-mono ${
                            isSpecial
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : isAdvent
                              ? 'bg-secondary text-white font-bold'
                              : 'bg-primary text-white font-bold'
                          }`}
                        >
                          <span className="text-xl leading-none font-extrabold">{item.dia}</span>
                          <span className="text-[10px] tracking-wider uppercase font-semibold">
                            {item.mesNome[language].slice(0, 3)}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">
                            {item.mesNome[language]} de 2026
                          </span>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider mt-0.5 ${
                              isSpecial
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : isAdvent
                                ? 'bg-secondary/15 text-primary border border-secondary/30'
                                : isGratitude
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {isSpecial
                              ? language === 'pt'
                                ? 'Culto Solene'
                                : 'Solemn Service'
                              : isAdvent
                              ? language === 'pt'
                                ? 'Série Advento'
                                : 'Advent Series'
                              : isGratitude
                              ? language === 'pt'
                                ? 'Fim de Ano'
                                : 'Year End'
                              : language === 'pt'
                              ? 'Exposição Bíblica'
                              : 'Expository'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Texto Bíblico & Título */}
                    <div className="space-y-2">
                      <div className="font-mono text-xs font-extrabold text-secondary tracking-wide">
                        📖 {item.textoBiblico}
                      </div>

                      <h4 className="font-display text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                        {item.tituloTema?.[language] || item.textoBiblico}
                      </h4>

                      <p className="text-xs text-neutral-dark font-sans leading-relaxed line-clamp-2">
                        {item.serie[language]}
                      </p>

                      {item.referencias && (
                        <div className="pt-1 text-[11px] font-mono text-gray-500 bg-white/70 px-2 py-1 rounded border border-gray-100">
                          <span className="font-bold text-primary">Refs:</span> {item.referencias}
                        </div>
                      )}
                    </div>

                    {/* Footer com Ações */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-gray-400">
                        {language === 'pt' ? 'Culto de Domingo • 18h' : 'Sunday Service • 6 PM'}
                      </span>

                      <a
                        href={`https://www.bibliaonline.com.br/nvi/${encodeURIComponent(
                          item.textoBiblico.toLowerCase().replace('.', ' ').split(';')[0]
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-primary hover:text-secondary transition-colors"
                      >
                        <span>{language === 'pt' ? 'Ler Texto' : 'Read Text'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Banner de Download do PDF Oficial no Rodapé */}
          <div className="bg-[#0c3945] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-[#2a8182]/30">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#bbd2d0] text-xs font-mono font-bold uppercase">
                  <FileText className="w-3.5 h-3.5 text-secondary" />
                  <span>{language === 'pt' ? 'Documento Oficial em PDF' : 'Official PDF Document'}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {language === 'pt' ? 'Tenha o Sermonário 2026 em mãos' : 'Have the 2026 Preaching Calendar at Hand'}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-sans">
                  {language === 'pt'
                    ? 'Baixe a versão original em PDF para imprimir ou salvar em seu dispositivo móvel, contendo toda a escala de sermões de Mateus e a Série de Advento.'
                    : 'Download the original PDF version to print or keep on your phone, covering Matthew expository schedule and the Advent Series.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href="/docs/sermonario2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-secondary hover:bg-[#329697] text-white text-xs sm:text-sm font-bold shadow-lg shadow-black/20 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Visualizar / Baixar PDF' : 'View / Download PDF'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ========================================================================= */
        /* ABA 2: ACERVO DE VÍDEOS / GRAVAÇÕES                                       */
        /* ========================================================================= */
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'pt' ? 'Buscar sermão gravado...' : 'Search recorded sermon...'}
                  className="w-full pl-11 pr-4 py-2.5 bg-surface-alt border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xs font-sans"
                />
              </div>

              {/* Series Filter */}
              <div className="relative">
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-surface-alt border border-gray-200 rounded-xl appearance-none focus:border-primary outline-none text-xs font-sans cursor-pointer text-gray-700"
                >
                  <option value="">{language === 'pt' ? 'Todas as Séries' : 'All Series'}</option>
                  {seriesOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Preacher Filter */}
              <div className="relative">
                <select
                  value={selectedPreacher}
                  onChange={(e) => setSelectedPreacher(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-surface-alt border border-gray-200 rounded-xl appearance-none focus:border-primary outline-none text-xs font-sans cursor-pointer text-gray-700"
                >
                  <option value="">{language === 'pt' ? 'Todos os Pregadores' : 'All Preachers'}</option>
                  {preacherOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Topic Filter */}
              <div className="relative">
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-surface-alt border border-gray-200 rounded-xl appearance-none focus:border-primary outline-none text-xs font-sans cursor-pointer text-gray-700"
                >
                  <option value="">{language === 'pt' ? 'Todos os Temas' : 'All Topics'}</option>
                  {themeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Sermon Grid */}
          <div>
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center">
                <RefreshCw className="h-8 w-8 text-primary animate-spin mb-3" />
                <span className="text-xs text-text-muted font-mono">
                  {language === 'pt' ? 'Carregando sermões...' : 'Loading sermons...'}
                </span>
              </div>
            ) : filteredSermons.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-white rounded-2xl border border-gray-200">
                <p className="text-text-muted text-base">
                  {language === 'pt'
                    ? 'Nenhum sermão encontrado com os filtros selecionados.'
                    : 'No sermons found matching your criteria.'}
                </p>
                <button
                  onClick={handleResetVideoFilters}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all"
                >
                  {language === 'pt' ? 'Limpar Filtros' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSermons.slice(0, visibleCount).map((sermon) => (
                  <article
                    key={sermon.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden dynamic-card ambient-shadow flex flex-col group cursor-pointer"
                    onClick={() => setActiveSermon(sermon)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-neutral-900">
                      <img
                        src={
                          sermon.image ||
                          'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80'
                        }
                        alt={sermon.title?.[language] || sermon.title?.pt || ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-12 w-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="h-6 w-6 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white px-2 py-0.5 rounded text-[11px] font-mono backdrop-blur-sm">
                        {sermon.duration || '45 min'}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-2.5 py-0.5 bg-secondary/10 text-primary font-bold rounded text-[11px] uppercase tracking-wider">
                          {sermon.series?.[language] || sermon.series?.pt || 'Mensagem'}
                        </span>
                        <span className="text-[11px] font-mono text-gray-500">
                          {sermon.date || '2026'}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {sermon.title?.[language] || sermon.title?.pt || ''}
                      </h3>

                      {sermon.verse && (
                        <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed italic">
                          "{sermon.verse}"
                        </p>
                      )}

                      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-secondary" />
                          <span>{sermon.preacher?.[language] || 'Pr. Marcos S. Oliveira'}</span>
                        </span>
                        <span className="text-primary font-bold group-hover:underline flex items-center gap-1">
                          {language === 'pt' ? 'Assistir' : 'Watch'} <Play className="h-3 w-3 fill-current text-secondary" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredSermons.length > visibleCount && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md cursor-pointer"
                >
                  {language === 'pt' ? 'Carregar Mais Sermões' : 'Load More Sermons'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. SERMON PLAYER MODAL */}
      {activeSermon && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-5 bg-primary text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-mono uppercase text-[#bbd2d0]">
                  {activeSermon.series?.[language] || 'Sermão'}
                </span>
                <h3 className="font-display font-bold text-xl">{activeSermon.title[language]}</h3>
              </div>
              <button
                onClick={() => setActiveSermon(null)}
                className="p-2 hover:bg-white/10 rounded-full text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {activeSermon.videoUrl && activeSermon.videoUrl.includes('youtube') ? (
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                  <iframe
                    src={activeSermon.videoUrl}
                    title={activeSermon.title[language]}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-2xl bg-neutral-900 text-white flex items-center justify-center p-8 text-center">
                  <div>
                    <Play className="h-14 w-14 text-secondary mx-auto mb-3 animate-pulse" />
                    <p className="text-base font-bold">{activeSermon.title[language]}</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {activeSermon.preacher?.[language]} — {activeSermon.date}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                  {language === 'pt' ? 'Resumo da Mensagem' : 'Message Summary'}
                </h4>
                <p className="text-neutral-dark text-xs sm:text-sm leading-relaxed">
                  {activeSermon.theme?.[language] || activeSermon.title?.[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
