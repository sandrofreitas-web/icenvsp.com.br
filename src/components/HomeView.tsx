import { useState, useEffect } from 'react';
import { Play, ArrowRight, Calendar, MapPin, Clock, ExternalLink, X, ChevronRight, Church, Compass, Users, BookOpen, Heart, HelpCircle } from 'lucide-react';
import { Language, ActiveTab, Sermon, ChurchEvent } from '../types';
import { DICTIONARY, SERMONS, EVENTS } from '../data';
import { getSermons, getEvents } from '../lib/supabase';
import DenominationLogo from './DenominationLogo';
// @ts-ignore
import heroBgImage from '../20250420_065947.jpg';

interface HomeViewProps {
  language: Language;
  onChangeTab: (tab: ActiveTab, subTab?: string) => void;
}

export default function HomeView({ language, onChangeTab }: HomeViewProps) {
  const dict = DICTIONARY[language];
  const [isPlayingSermon, setIsPlayingSermon] = useState(false);
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false);
  const [sermons, setSermons] = useState<Sermon[]>(SERMONS);
  const [events, setEvents] = useState<ChurchEvent[]>(EVENTS);

  useEffect(() => {
    let active = true;
    getSermons().then((data) => {
      if (active && data && data.length > 0) {
        setSermons(data);
      }
    });
    getEvents().then((data) => {
      if (active && data && data.length > 0) {
        setEvents(data);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Latest sermon details
  const featuredSermon: Sermon = sermons[0] || SERMONS[0];

  // Get first 3 upcoming events
  const upcomingEvents: ChurchEvent[] = events.slice(0, 3);

  return (
    <>
      <div id="home-view" className="animate-fade-in">
        {/* 1. HERO SECTION */}
      <section
        id="home-hero"
        className="relative pt-32 pb-24 md:pt-48 md:pb-36 bg-cover bg-center min-h-[90vh] flex items-center overflow-hidden bg-neutral-900 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${heroBgImage})`
        }}
      >
        {/* Soft elegant overlay to ensure the uploaded church interior photo is highly visible and clear */}
        <div className="absolute inset-0 bg-black/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0f4c]/40 via-transparent to-black/30 z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-3xl mr-auto bg-[#1e1054]/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 md:p-12 space-y-6 shadow-2xl text-left">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 tracking-wider uppercase backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                {language === 'pt' ? 'Bem-vindo à Nova Vida' : 'Welcome to Nova Vida'}
              </div>
              
              {/* Denomination Reference Badge with beautiful mini logo */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#007cc3]/30 text-white border border-[#007cc3]/40 backdrop-blur-sm">
                <svg viewBox="0 0 100 100" className="h-3.5 w-3.5 shrink-0">
                  <circle cx="50" cy="50" r="45" fill="#007cc3" />
                  <path
                    d="M 50,15 A 35 35 0 0 0 50 85 C 43 77, 36 69, 36 59 C 36 51, 41 48, 35 46 C 38 44, 44 42, 46 37 C 48 31, 49 22, 50 15 Z"
                    fill="white"
                  />
                  <path
                    d="M 50,15 A 35 35 0 0 1 50 85 C 56 77, 64 71, 64 65 C 64 59, 56 53, 70 48 C 56 45, 52 37, 64 24 C 56 22, 52 18, 50 15 Z"
                    fill="#e6f2fa"
                  />
                </svg>
                <span>
                  {language === 'pt' 
                    ? 'Igreja Cristã Evangélica' 
                    : 'Evangelical Christian Church'}
                </span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-white tracking-tight leading-tight uppercase">
              {language === 'pt' ? (
                <>
                  Adorando a Deus, <span className="text-amber-400">Edificando os Crentes</span> e Proclamando o Evangelho ao Mundo
                </>
              ) : (
                <>
                  Worshipping God, <span className="text-amber-400">Edifying Believers</span>, and Proclaiming the Gospel to the World
                </>
              )}
            </h1>
            
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-2xl font-sans font-normal italic border-l-2 border-amber-400 pl-3">
              {language === 'pt' 
                ? 'Nossa missão histórica desde 1912: proclamar a verdade bíblica e viver em comunhão fraterna.' 
                : 'Our historic mission since 1912: proclaiming biblical truth and living in brotherly fellowship.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                id="hero-visit-btn"
                onClick={() => onChangeTab('cultos')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white bg-[#b59a57] hover:bg-[#cbb073] transition-all font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-150 cursor-pointer"
              >
                <span>{dict.heroBtnVisit}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                id="hero-sermons-btn"
                onClick={() => setIsIntegrationOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-all font-bold border border-white/20 hover:-translate-y-0.5 duration-150 cursor-pointer backdrop-blur-sm animate-pulse"
              >
                <span>{language === 'pt' ? 'É novo por aqui? Saiba como interagir' : 'New here? Learn how to interact'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SLOGAN BANNER (Notebook Image 1) */}
      <section id="slogan-integration" className="py-12 bg-gradient-to-r from-[#28166f] to-[#1e1054] text-white border-y border-amber-500/20 shadow-inner relative overflow-hidden">
        {/* Background glow styling */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-4 flex flex-col items-center">
            <div className="flex items-center gap-2 justify-center">
              <span className="px-3 py-1 bg-amber-500 text-neutral-950 font-mono text-[10px] font-black uppercase rounded tracking-wider">
                {language === 'pt' ? 'Quem Somos' : 'Who We Are'}
              </span>
              <span className="text-amber-400 font-mono text-xs font-bold">
                {language === 'pt' ? 'História e Família' : 'History and Family'}
              </span>
            </div>
            <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed max-w-2xl">
              {language === 'pt' ? (
                'Somos uma família de fé acolhedora em São Paulo, comprometida com a pregação bíblica pura e a edificação mútua. Queremos caminhar ao seu lado em cada passo da sua jornada com Deus.'
              ) : (
                'We are a welcoming faith family in São Paulo, committed to pure biblical preaching and mutual edification. We want to walk alongside you in every step of your journey with God.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 2. PASTOR MESSAGE */}
      <section id="pastor-message" className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Pastor Portrait with creative frame */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 to-amber-100 rounded-3xl opacity-30 blur-lg" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-amber-50 aspect-[4/5] border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=800&q=80"
                  alt="Rev. Marcos S. Oliveira"
                  className="w-full h-full object-cover grayscale-[15%] hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-400 text-neutral-950 px-6 py-4 rounded-2xl shadow-xl hidden sm:block">
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-amber-950 block">
                  {dict.pastorRole}
                </span>
                <span className="font-sans font-extrabold text-base block">
                  Rev. Marcos S. Oliveira
                </span>
              </div>
            </div>

            {/* Message Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-amber-600 uppercase font-mono text-xs font-bold tracking-widest block">
                  {dict.pastorTitle}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {dict.pastorGreeting}
                </h2>
              </div>
              <div className="h-1 w-12 bg-amber-500 rounded" />
              <div className="space-y-4 text-gray-600 leading-relaxed font-sans text-base">
                <p>{dict.pastorText1}</p>
                <p>{dict.pastorText2}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-lg text-gray-900">
                    {dict.pastorSignature}
                  </h4>
                  <p className="text-xs text-amber-700 font-mono tracking-wider font-semibold">
                    {dict.pastorRole}, ICE Nova Vida
                  </p>
                </div>
                {/* Signature visual accent */}
                <div className="font-serif italic text-gray-300 text-4xl select-none hidden sm:block">
                  MarcosOliveira
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORSHIP TIMES */}
      <section id="worship-times" className="py-20 bg-amber-50/40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest">
              {dict.servicesTitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {dict.servicesSub}
            </h2>
            <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* EBD Card */}
            <div className="bg-white rounded-2xl p-8 border border-amber-100/50 shadow-sm hover:shadow-md transition-all group hover:translate-y-[-2px] duration-150">
              <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-6 group-hover:bg-amber-100 transition-colors">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-sans font-bold text-xl text-gray-900 mb-3">
                {dict.sundayEbdTitle}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {dict.sundayEbdDesc}
              </p>
              <div className="flex items-center text-amber-700 font-semibold text-xs uppercase tracking-wider group-hover:text-amber-800 transition-colors">
                <span>{language === 'pt' ? 'Sala de aula' : 'Classrooms'}</span>
                <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Principal Worship Card */}
            <div className="bg-white rounded-2xl p-8 border-2 border-amber-500 shadow-lg relative group hover:translate-y-[-2px] transition-all duration-150">
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-amber-500 text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow">
                {language === 'pt' ? 'Principal' : 'Primary'}
              </span>
              <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-6 group-hover:bg-amber-200 transition-colors">
                <Church className="h-6 w-6" />
              </div>
              <h3 className="font-sans font-bold text-xl text-gray-900 mb-3">
                {dict.sundayWorshipTitle}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {dict.sundayWorshipDesc}
              </p>
              <div className="flex items-center text-amber-800 font-bold text-xs uppercase tracking-wider group-hover:text-amber-900 transition-colors">
                <span>{language === 'pt' ? 'Templo Principal' : 'Main Sanctuary'}</span>
                <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Wednesday Card */}
            <div className="bg-white rounded-2xl p-8 border border-amber-100/50 shadow-sm hover:shadow-md transition-all group hover:translate-y-[-2px] duration-150">
              <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-6 group-hover:bg-amber-100 transition-colors">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-sans font-bold text-xl text-gray-900 mb-3">
                {dict.wednesdayTitle}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {dict.wednesdayDesc}
              </p>
              <div className="flex items-center text-amber-700 font-semibold text-xs uppercase tracking-wider group-hover:text-amber-800 transition-colors">
                <span>{language === 'pt' ? 'Salão de Oração' : 'Prayer Hall'}</span>
                <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              id="plan-visit-cta"
              onClick={() => onChangeTab('cultos')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-900 text-amber-400 hover:text-amber-300 hover:bg-neutral-800 rounded-xl text-sm font-bold transition-all shadow shadow-neutral-950/20"
            >
              <span>{dict.planVisitBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS CAROUSEL */}
      <section id="upcoming-events" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                {dict.homeEventsTitle}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                {dict.homeEventsSub}
              </h2>
              <div className="h-1 w-12 bg-amber-500 rounded" />
            </div>
            <button
              id="view-all-events"
              onClick={() => onChangeTab('eventos')}
              className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer group"
            >
              <span>{language === 'pt' ? 'Ver toda a agenda' : 'View full calendar'}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                id={`home-event-${evt.id}`}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group flex flex-col justify-between hover:shadow-lg hover:bg-white transition-all duration-200"
              >
                <div>
                  <div className="relative aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={evt.image}
                      alt={evt.title?.[language] || ''}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Date Badge overlay */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur shadow rounded-xl p-2.5 text-center min-w-[50px]">
                      <span className="block font-mono text-xl font-black text-gray-900 leading-none">
                        {evt.day}
                      </span>
                      <span className="block font-mono text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                        {evt.month?.[language] || ''}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-sans font-bold text-lg text-gray-900 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">
                      {evt.title?.[language] || ''}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {evt.description?.[language] || ''}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100/50 mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-amber-600" />
                    <span>{evt.time}</span>
                  </span>
                  <button
                    id={`home-event-btn-${evt.id}`}
                    onClick={() => onChangeTab('eventos')}
                    className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-0.5"
                  >
                    <span>{dict.seeMore}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HISTORIC HERITAGE */}
      <section id="historic-heritage" className="py-20 md:py-28 bg-amber-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Historical Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {dict.heritageSub}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {dict.heritageTitle}
                </h2>
              </div>
              <div className="h-1 w-12 bg-amber-500 rounded" />
              <div className="space-y-4 text-gray-600 leading-relaxed font-sans text-base">
                <p>{dict.heritageText1}</p>
                <p>{dict.heritageText2}</p>
              </div>

              {/* Numerical stats row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                <div id="stat-history-years">
                  <span className="block text-3xl sm:text-4xl font-black text-amber-700 leading-none mb-1">
                    {dict.stat1Number}
                  </span>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {dict.stat1Label}
                  </span>
                </div>
                <div id="stat-foundation">
                  <span className="block text-3xl sm:text-4xl font-black text-amber-700 leading-none mb-1">
                    {dict.stat2Number}
                  </span>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {dict.stat2Label}
                  </span>
                </div>
                <div id="stat-ministries">
                  <span className="block text-3xl sm:text-4xl font-black text-amber-700 leading-none mb-1">
                    {dict.stat3Number}
                  </span>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {dict.stat3Label}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="history-details-btn"
                  onClick={() => onChangeTab('sobre')}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-xl text-sm font-bold transition-all"
                >
                  <span>{language === 'pt' ? 'Conhecer Nossa História' : 'Read Our History'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bento-grid of church heritage imagery */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4">
              <div className="col-span-8 relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1548625361-155deee21623?auto=format&fit=crop&w=800&q=80"
                  alt="Igreja Cristã Evangélica Nova Vida"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-4 relative rounded-2xl overflow-hidden shadow-md aspect-square bg-gray-100 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Stained glass detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-4 relative rounded-2xl overflow-hidden shadow-md aspect-square bg-gray-100 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Ancient manuscripts"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-8 relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80"
                  alt="Worship congregation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* MODAL: EXQUISITE SERMON VIDEO PLAYER */}
      {isPlayingSermon && (
        <div
          id="sermon-video-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-800">
              <div>
                <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest block font-bold">
                  {featuredSermon.series?.[language] || ''}
                </span>
                <h4 className="text-white font-sans font-bold text-sm sm:text-base line-clamp-1">
                  {featuredSermon.title?.[language] || ''}
                </h4>
              </div>
              <button
                id="close-sermon-player"
                onClick={() => setIsPlayingSermon(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Responsive Iframe Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                id="sermon-video-iframe"
                src={featuredSermon.videoUrl}
                title={featuredSermon.title?.[language] || ''}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Details Footer */}
            <div className="p-4 bg-neutral-900 text-neutral-400 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white">{featuredSermon.preacher?.[language] || ''}</span>
                <span>•</span>
                <span>{featuredSermon.verse}</span>
              </div>
              <span className="font-mono text-[11px] bg-neutral-800 px-2 py-1 rounded text-amber-400 font-semibold">
                {language === 'pt' ? 'Transmissão Gravada' : 'Recorded Stream'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INTERACTIVE INTEGRATION GUIDE ("É Novo por Aqui?") */}
      {isIntegrationOpen && (
        <div
          id="integration-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] sm:max-h-[90vh]">
            {/* Header - Compact */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-[#28166f] to-[#1e1054] text-white">
              <div className="space-y-0.5">
                <span className="text-amber-400 font-mono text-[9px] uppercase tracking-widest font-black block leading-none">
                  {language === 'pt' ? 'Guia do Visitante' : 'Visitor\'s Guide'}
                </span>
                <h4 className="font-sans font-black text-base sm:text-lg text-white leading-tight">
                  {language === 'pt' ? 'É Novo por Aqui? Saiba Como se Integrar' : 'New Here? Discover How to Get Connected'}
                </h4>
              </div>
              <button
                id="close-integration-modal"
                onClick={() => setIsIntegrationOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content - More compact margins & text */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-left">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {language === 'pt' 
                  ? 'Ficamos muito alegres com a sua presença! Preparamos este caminho simples para você conhecer nossa igreja, fazer novos amigos e caminhar conosco na fé reformada:'
                  : 'We are thrilled to have you! We have designed this simple path for you to get to know our church, build friendships, and walk with us in reformed faith:'}
              </p>

              {/* Steps grid - Compact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Step 1 */}
                <div className="bg-[#fcfaf5] border border-amber-100/70 rounded-xl p-3.5 space-y-2 hover:border-amber-200/90 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 bg-[#28166f]/10 text-[#28166f] rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                      1
                    </div>
                    <h5 className="font-sans font-black text-xs text-gray-900 uppercase tracking-tight">
                      {language === 'pt' ? 'Participar dos Cultos & EBD' : 'Join Our Services & EBD'}
                    </h5>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Venha nos visitar no Domingo! Temos a Escola Bíblica Dominical (EBD) às 9h30 para todas as idades, e o Culto Principal de Adoração às 18h.'
                      : 'Come visit us on Sunday! We have Sunday School (EBD) at 9:30 AM for all ages, and our Main Worship Service at 6:00 PM.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsIntegrationOpen(false);
                      onChangeTab('cultos');
                    }}
                    className="inline-flex items-center text-[10px] font-bold text-[#b59a57] hover:text-[#a18746]"
                  >
                    <span>{language === 'pt' ? 'Ver horários e local' : 'View times and location'}</span>
                    <ChevronRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                {/* Step 2 */}
                <div className="bg-[#fcfaf5] border border-amber-100/70 rounded-xl p-3.5 space-y-2 hover:border-amber-200/90 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 bg-[#28166f]/10 text-[#28166f] rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                      2
                    </div>
                    <h5 className="font-sans font-black text-xs text-gray-900 uppercase tracking-tight">
                      {language === 'pt' ? 'Entrar em um Pequeno Grupo' : 'Join a Small Group'}
                    </h5>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Nossos Pequenos Grupos (Células) se reúnem nas casas durante a semana para estudar a Bíblia, orar e compartilhar a vida em comunhão profunda.'
                      : 'Our Small Groups meet in homes during the week to study the Bible, pray, and share life in deep Christian fellowship.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsIntegrationOpen(false);
                      onChangeTab('sobre', 'grupos');
                      setTimeout(() => {
                        const el = document.getElementById('about-small-groups');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                    className="inline-flex items-center text-[10px] font-bold text-[#b59a57] hover:text-[#a18746]"
                  >
                    <span>{language === 'pt' ? 'Encontrar Pequeno Grupo' : 'Find a Small Group'}</span>
                    <ChevronRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                {/* Step 3 */}
                <div className="bg-[#fcfaf5] border border-amber-100/70 rounded-xl p-3.5 space-y-2 hover:border-amber-200/90 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 bg-[#28166f]/10 text-[#28166f] rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                      3
                    </div>
                    <h5 className="font-sans font-black text-xs text-gray-900 uppercase tracking-tight">
                      {language === 'pt' ? 'Classe de Integração' : 'Integration Class'}
                    </h5>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Quer se tornar membro ou conhecer nossa doutrina? Faça parte da nossa classe regular de novos membros para aprender sobre teologia reformada.'
                      : 'Want to become a member or learn our doctrine? Join our regular new members class to learn about reformed theology and church history.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsIntegrationOpen(false);
                      onChangeTab('contato');
                    }}
                    className="inline-flex items-center text-[10px] font-bold text-[#b59a57] hover:text-[#a18746]"
                  >
                    <span>{language === 'pt' ? 'Inscrever-se na classe' : 'Sign up for class'}</span>
                    <ChevronRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

                {/* Step 4 */}
                <div className="bg-[#fcfaf5] border border-amber-100/70 rounded-xl p-3.5 space-y-2 hover:border-amber-200/90 transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 bg-[#28166f]/10 text-[#28166f] rounded-lg flex items-center justify-center font-black text-xs shrink-0">
                      4
                    </div>
                    <h5 className="font-sans font-black text-xs text-gray-900 uppercase tracking-tight">
                      {language === 'pt' ? 'Servir nos Ministérios' : 'Serve in Ministries'}
                    </h5>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Encontre seu lugar de serviço! Temos ministérios de Ação Social, Música, Infantil, Jovens, Recepção, Mídias e muitos outros.'
                      : 'Find your place to serve! We have social action, music, children, youth, hospitality, media ministries, and many others.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsIntegrationOpen(false);
                      onChangeTab('sobre', 'ministerios');
                      setTimeout(() => {
                        const el = document.getElementById('about-ministries-list');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                    className="inline-flex items-center text-[10px] font-bold text-[#b59a57] hover:text-[#a18746]"
                  >
                    <span>{language === 'pt' ? 'Ver todos os ministérios' : 'View all ministries'}</span>
                    <ChevronRight className="h-3 w-3 ml-0.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Footer - Compact */}
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-gray-500 text-center sm:text-left leading-tight">
                {language === 'pt' ? 'Ficou alguma dúvida? Nossa equipe está pronta para ajudar.' : 'Any questions? Our team is ready to help.'}
              </span>
              <button
                onClick={() => {
                  setIsIntegrationOpen(false);
                  onChangeTab('contato');
                }}
                className="w-full sm:w-auto px-4 py-2 bg-[#28166f] text-white hover:bg-[#1e1054] text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center"
              >
                {language === 'pt' ? 'Falar com um Pastor' : 'Speak with a Pastor'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
