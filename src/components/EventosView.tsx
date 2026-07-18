import { useState, useMemo, FormEvent, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, ArrowRight, X, Sparkles, Check, Send, RefreshCw } from 'lucide-react';
import { Language, ChurchEvent } from '../types';
import { DICTIONARY } from '../data';
import { getEvents } from '../lib/supabase';

interface EventosViewProps {
  language: Language;
}

export default function EventosView({ language }: EventosViewProps) {
  const dict = DICTIONARY[language];

  // States
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'conferencias' | 'ministerios'>('all');
  const [registeringEvent, setRegisteringEvent] = useState<ChurchEvent | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  // Fetch events from Supabase on mount
  useEffect(() => {
    let active = true;
    getEvents().then((data) => {
      if (active) {
        setEvents(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Filter events based on tab
  const filteredEvents = useMemo(() => {
    if (activeTab === 'all') return events;
    return events.filter((evt) => evt.category === activeTab);
  }, [events, activeTab]);

  // Spotlight featured event
  const spotlightEvent = useMemo(() => {
    if (events.length === 0) return null;
    return events.find((evt) => evt.category === 'conferencias') || events[0];
  }, [events]);

  // Registration submit handler
  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (attendeeName.trim() && attendeeEmail.trim()) {
      setIsRegistrationSuccess(true);
    }
  };

  // Close registration modal
  const handleCloseModal = () => {
    setRegisteringEvent(null);
    setAttendeeName('');
    setAttendeeEmail('');
    setIsRegistrationSuccess(false);
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
    <div id="eventos-view" className="animate-fade-in pt-24">
      {/* 1. HERO BANNER */}
      <section
        id="events-hero"
        className="relative bg-neutral-900 text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,15,15,0.85), rgba(15,15,15,0.6)), url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            {language === 'pt' ? 'Comunidade & Atividade' : 'Community & Activities'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white">
            {dict.eventsHeroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200">
            {dict.eventsHeroSub}
          </p>
        </div>
      </section>

      {/* 2. TAB SELECTOR BAR */}
      <section id="events-tabs" className="bg-white border-b border-gray-100 py-6 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 border-b border-gray-100 pb-px overflow-x-auto scrollbar-none">
            <button
              id="event-tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'border-amber-500 text-amber-800 font-extrabold'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
              }`}
            >
              {dict.tabAll}
            </button>
            <button
              id="event-tab-conferencias"
              onClick={() => setActiveTab('conferencias')}
              className={`px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'conferencias'
                  ? 'border-amber-500 text-amber-800 font-extrabold'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
              }`}
            >
              {dict.tabConferences}
            </button>
            <button
              id="event-tab-ministerios"
              onClick={() => setActiveTab('ministerios')}
              className={`px-5 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'ministerios'
                  ? 'border-amber-500 text-amber-800 font-extrabold'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
              }`}
            >
              {dict.tabMinistries}
            </button>
          </div>
        </div>
      </section>

      {/* 3. SPLIT MAIN GRID SECTION */}
      <section id="events-main" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Main Timeline Column */}
            <div className="lg:col-span-8 space-y-8">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 p-8">
                  <RefreshCw className="h-8 w-8 text-[#007cc3] animate-spin mb-3" />
                  <span className="text-xs text-gray-400 font-mono">
                    {language === 'pt' ? 'Buscando eventos no banco...' : 'Retrieving events...'}
                  </span>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div id="events-empty" className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 p-8">
                  <p className="text-gray-500 text-sm">
                    {language === 'pt' ? 'Nenhum evento agendado para esta categoria.' : 'No events scheduled for this category.'}
                  </p>
                </div>
              ) : (
                filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    id={`event-row-${evt.id}`}
                    className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-stretch group"
                  >
                    {/* Giant Date Indicator (Left) */}
                    <div className="flex flex-row sm:flex-col items-center sm:justify-center text-center px-4 py-3 bg-amber-50 rounded-xl sm:min-w-[90px] border border-amber-100/50 shrink-0 gap-2 sm:gap-0.5">
                      <span className="font-sans font-black text-3xl sm:text-4xl text-gray-950 font-mono tracking-tight leading-none">
                        {evt.day}
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest">
                        {evt.month?.[language] || ''}
                      </span>
                    </div>

                    {/* Middle Details */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-block text-[9px] font-mono font-bold bg-amber-100/55 text-amber-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {evt.category === 'conferencias'
                              ? language === 'pt' ? 'Conferência' : 'Conference'
                              : language === 'pt' ? 'Ministério' : 'Ministry'}
                          </span>
                        </div>
                        <h3 className="font-sans font-extrabold text-lg text-gray-950 leading-snug group-hover:text-amber-800 transition-colors">
                          {evt.title?.[language] || ''}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                          {evt.description?.[language] || ''}
                        </p>
                      </div>

                      {/* Place & Time Grid Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-gray-50/50 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-300" />
                          <span>{evt.time}</span>
                        </span>
                        <span className="flex items-center gap-1.5 leading-tight">
                          <MapPin className="h-4 w-4 text-gray-300 shrink-0" />
                          <span className="line-clamp-1">{evt.location?.[language] || ''}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Register Trigger Button */}
                    <div className="sm:self-center shrink-0 flex items-center">
                      <button
                        id={`register-trigger-${evt.id}`}
                        onClick={() => setRegisteringEvent(evt)}
                        className="w-full sm:w-auto px-5 py-3.5 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer shadow-sm"
                      >
                        {dict.registerBtn}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right Side Panels Column */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Highlight of the Month Panel */}
              {spotlightEvent ? (
                <div id="spotlight-panel" className="bg-neutral-900 text-white rounded-3xl p-6 relative overflow-hidden border border-neutral-800 shadow-xl">
                  <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full">
                        <Sparkles className="h-3 w-3" />
                        <span>{dict.featuredEventHeader}</span>
                      </span>
                      <span className="font-mono text-xs font-black text-amber-400">
                        {spotlightEvent.day} {spotlightEvent.month?.[language] || ''}
                      </span>
                    </div>

                    <div className="aspect-video rounded-xl overflow-hidden bg-neutral-850">
                      <img
                        src={spotlightEvent.image}
                        alt={spotlightEvent.title?.[language] || ''}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <h3 className="font-sans font-bold text-base text-white leading-snug line-clamp-2">
                      {spotlightEvent.title?.[language] || ''}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      {spotlightEvent.description?.[language] || ''}
                    </p>

                    <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                      <p className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>{spotlightEvent.time}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span className="line-clamp-1">{spotlightEvent.location?.[language] || ''}</span>
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        id="spotlight-register-btn"
                        onClick={() => setRegisteringEvent(spotlightEvent)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        <span>{dict.featuredEventBtn}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-900 text-neutral-400 rounded-3xl p-6 border border-neutral-800 text-center py-10 text-xs">
                  {language === 'pt' ? 'Nenhum destaque para este mês.' : 'No spotlight events this month.'}
                </div>
              )}

              {/* Newsletter Stay Informed Panel */}
              <div id="newsletter-panel" className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-4">
                <h3 className="font-sans font-extrabold text-base text-gray-950">
                  {dict.keepInformedHeader}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {dict.keepInformedSub}
                </p>

                <form id="events-newsletter-form" onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    id="events-newsletter-email"
                    type="email"
                    required
                    placeholder={dict.emailPlaceholder}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                  />
                  <button
                    id="events-newsletter-submit"
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 py-3 bg-neutral-900 text-amber-400 hover:text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{language === 'pt' ? 'Cadastrar E-mail' : 'Register Email'}</span>
                  </button>
                </form>

                {isNewsletterSubscribed && (
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 text-xs font-semibold">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{dict.newsletterSuccess}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION BACKDROP INTERACTIVE MODAL */}
      {registeringEvent && (
        <div
          id="registration-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 bg-gray-50 border-b border-gray-100">
              <div>
                <span className="text-amber-700 font-mono text-[10px] uppercase tracking-widest block font-bold">
                  {language === 'pt' ? 'Ficha de Inscrição' : 'Registration Form'}
                </span>
                <h4 className="text-gray-950 font-sans font-bold text-sm sm:text-base line-clamp-1">
                  {registeringEvent.title[language]}
                </h4>
              </div>
              <button
                id="close-registration-modal"
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-950 hover:bg-gray-200/50 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6">
              {!isRegistrationSuccess ? (
                /* Registration Input Form */
                <form id="event-reg-form" onSubmit={handleRegisterSubmit} className="space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">
                    {language === 'pt'
                      ? 'Preencha os campos abaixo para garantir o seu assento ou obter as coordenadas do evento.'
                      : 'Fill in the fields below to secure your seat or get coordinates for this event.'}
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                      {dict.formName}
                    </label>
                    <input
                      id="reg-attendee-name"
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                      {dict.formEmail}
                    </label>
                    <input
                      id="reg-attendee-email"
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      placeholder="e.g. johndoe@gmail.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      id="reg-submit-btn"
                      type="submit"
                      className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow shadow-amber-500/10 transition-all cursor-pointer"
                    >
                      {language === 'pt' ? 'Confirmar minha inscrição' : 'Confirm my registration'}
                    </button>
                  </div>
                </form>
              ) : (
                /* Interactive Success screen */
                <div id="reg-success-view" className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="font-sans font-bold text-lg text-gray-950">
                      {dict.registerModalTitle}
                    </h5>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                      {dict.registerModalText}
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center text-xs font-mono select-all">
                    <span className="block text-gray-400 uppercase tracking-widest text-[9px] mb-0.5">
                      {language === 'pt' ? 'CÓDIGO DE ACESSO' : 'ACCESS CODE'}
                    </span>
                    <span className="text-amber-700 font-extrabold text-sm uppercase">
                      ICE-REG-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                  <div className="pt-4">
                    <button
                      id="reg-close-btn"
                      onClick={handleCloseModal}
                      className="w-full py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                    >
                      {dict.closeBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
