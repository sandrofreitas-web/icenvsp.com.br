import { useState, useMemo, FormEvent, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, ArrowRight, X, Sparkles, Check, Send, RefreshCw, User } from 'lucide-react';
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

  // Fetch events from Supabase
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

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (attendeeName.trim() && attendeeEmail.trim()) {
      setIsRegistrationSuccess(true);
    }
  };

  const handleCloseModal = () => {
    setRegisteringEvent(null);
    setAttendeeName('');
    setAttendeeEmail('');
    setIsRegistrationSuccess(false);
  };

  return (
    <div id="eventos-view" className="animate-fade-in pt-20 bg-background text-on-surface min-h-screen">
      {/* Hero Section */}
      <header className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="flex flex-col gap-3 max-w-3xl">
            <span className="text-primary font-mono text-xs tracking-widest uppercase font-bold">
              {language === 'pt' ? 'NOSSA COMUNIDADE EM AÇÃO' : 'OUR COMMUNITY IN ACTION'}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-on-background">
              {dict.eventsHeroTitle}
            </h1>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mt-2">
              {dict.eventsHeroSub}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -skew-x-12 translate-x-1/2 pointer-events-none" />
      </header>

      {/* Filter Navigation */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex gap-8 py-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`font-mono text-xs font-bold uppercase tracking-wider pb-2 transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              {language === 'pt' ? 'Próximos Eventos' : 'Upcoming Events'}
            </button>
            <button
              onClick={() => setActiveTab('conferencias')}
              className={`font-mono text-xs font-bold uppercase tracking-wider pb-2 transition-all cursor-pointer ${
                activeTab === 'conferencias'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              {language === 'pt' ? 'Conferências' : 'Conferences'}
            </button>
            <button
              onClick={() => setActiveTab('ministerios')}
              className={`font-mono text-xs font-bold uppercase tracking-wider pb-2 transition-all cursor-pointer ${
                activeTab === 'ministerios'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              {language === 'pt' ? 'Ministérios' : 'Ministries'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <main className="px-4 sm:px-6 lg:px-12 py-16 max-w-container-max mx-auto">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <RefreshCw className="h-8 w-8 text-primary animate-spin mb-3" />
            <span className="text-xs text-text-muted font-mono">
              {language === 'pt' ? 'Carregando eventos...' : 'Loading events...'}
            </span>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Event Spotlight */}
            {spotlightEvent && activeTab === 'all' && (
              <div className="relative group overflow-hidden rounded-3xl bg-white border border-outline-variant/50 event-card-hover ambient-shadow grid md:grid-cols-12 gap-0">
                <div className="md:col-span-7 aspect-video md:aspect-auto overflow-hidden relative">
                  <img
                    src={
                      spotlightEvent.image_url ||
                      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={spotlightEvent.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-lg text-center">
                    <span className="block font-mono font-bold text-xs text-primary uppercase">
                      {spotlightEvent.date?.[language]?.split(' ')[0] || 'EM BREVE'}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="inline-block px-3.5 py-1 bg-tertiary-container/20 text-tertiary font-bold rounded-full text-xs uppercase tracking-wider mb-4">
                      {language === 'pt' ? 'Destaque Especial' : 'Featured Event'}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-on-background mb-4">
                      {spotlightEvent.title[language]}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                      {spotlightEvent.description[language]}
                    </p>
                  </div>

                  <div className="space-y-3 text-xs text-text-muted border-t border-surface-container pt-6">
                    <div className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{spotlightEvent.time?.[language] || 'Horário a definir'}</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{spotlightEvent.location?.[language] || 'Templo Principal'}</span>
                    </div>

                    <button
                      onClick={() => setRegisteringEvent(spotlightEvent)}
                      className="w-full mt-4 bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary-container transition-all cursor-pointer shadow"
                    >
                      {language === 'pt' ? 'Garantir Minha Vaga' : 'Register Now'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Event Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl border border-outline-variant/40 overflow-hidden event-card-hover ambient-shadow flex flex-col justify-between"
                >
                  <div className="aspect-video relative overflow-hidden bg-neutral-100">
                    <img
                      src={
                        evt.image_url ||
                        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={evt.title[language]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl shadow text-center">
                      <span className="block font-mono font-bold text-xs text-primary">
                        {evt.date?.[language] || '2026'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <h4 className="font-display font-bold text-xl text-on-background">
                      {evt.title[language]}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed flex-grow">
                      {evt.description[language]}
                    </p>

                    <div className="pt-4 border-t border-surface-container space-y-2 text-xs text-text-muted font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{evt.time?.[language] || 'Horário do Evento'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{evt.location?.[language] || 'Salão da Igreja'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setRegisteringEvent(evt)}
                      className="w-full py-3 bg-surface-tint text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {language === 'pt' ? 'Inscrever-se' : 'Register'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Registration Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-primary text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-mono uppercase text-white/80">Inscrição de Evento</span>
                <h3 className="font-display font-bold text-xl">{registeringEvent.title[language]}</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/10 rounded-full text-white cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {isRegistrationSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900">Inscrição Confirmada!</h4>
                  <p className="text-text-muted text-sm">
                    Aguardamos você com alegria. Um lembrete foi enviado para seu e-mail.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Seu E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-container transition-all shadow cursor-pointer"
                  >
                    Confirmar Inscrição
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
