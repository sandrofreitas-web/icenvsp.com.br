import { useState, FormEvent, useEffect, useMemo } from 'react';
import { Calendar, Clock, MapPin, X, Check, RefreshCw, Sparkles, ArrowRight, Bell } from 'lucide-react';
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

  // Spotlight: o evento de data mais próxima (primeiro da lista)
  const spotlightEvent = useMemo(() => {
    if (events.length === 0) return null;
    return events[0];
  }, [events]);

  // Demais eventos da agenda
  const upcomingEvents = useMemo(() => {
    if (events.length <= 1) return [];
    return events.slice(1);
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
    <div id="eventos-view" className="animate-fade-in pt-24 pb-24 bg-background text-on-surface min-h-screen">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="h-9 w-9 text-primary animate-spin" />
            <span className="text-sm font-mono text-text-muted">
              {language === 'pt' ? 'Carregando agenda de eventos...' : 'Loading events schedule...'}
            </span>
          </div>
        ) : (
          <>
            {/* ========================================================= */}
            {/* 🌟 MODELO 1: HERO EDITORIAL SPLIT (EVENTO MAIS PRÓXIMO) */}
            {/* ========================================================= */}
            {spotlightEvent ? (
              <section aria-label="Evento em Destaque" className="pt-4">
                <div className="relative overflow-hidden rounded-3xl bg-white border border-outline-variant/60 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0 group">
                  
                  {/* Lado Esquerdo: Imagem com Badge Flutuante */}
                  <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] overflow-hidden bg-neutral-900">
                    <img
                      src={
                        spotlightEvent.image ||
                        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
                      }
                      alt={spotlightEvent.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Badge de Data Flutuante no Topo da Foto */}
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/40 text-center">
                      <span className="block font-mono font-extrabold text-2xl sm:text-3xl text-primary leading-none">
                        {spotlightEvent.day}
                      </span>
                      <span className="block font-mono font-bold text-xs uppercase tracking-wider text-neutral-700 mt-0.5">
                        {spotlightEvent.month[language]} {spotlightEvent.year}
                      </span>
                    </div>

                    {/* Tag de Destaque no Rodapé da Foto */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2 text-white/90 text-xs font-mono font-bold tracking-wider uppercase">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{language === 'pt' ? 'Inscrições e Participação Abertas' : 'Registrations & Attendance Open'}</span>
                    </div>
                  </div>

                  {/* Lado Direito: Informações & Chamada para Ação */}
                  <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-gradient-to-br from-white via-surface-alt/20 to-surface-container-low/40">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                        <span>{language === 'pt' ? 'Próximo Encontro da Igreja' : 'Next Upcoming Church Event'}</span>
                      </div>

                      <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-on-surface leading-tight">
                        {spotlightEvent.title[language]}
                      </h2>

                      <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                        {spotlightEvent.description[language]}
                      </p>
                    </div>

                    {/* Detalhes de Horário & Local */}
                    <div className="space-y-3 pt-6 border-t border-outline-variant/40 text-xs sm:text-sm">
                      <div className="flex items-center gap-3 text-neutral-800 font-medium">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <span>
                          {spotlightEvent.day} de {spotlightEvent.month[language]} de {spotlightEvent.year}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-neutral-800 font-medium">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Clock className="h-4 w-4" />
                        </div>
                        <span>{spotlightEvent.time || (language === 'pt' ? 'Horário a definir' : 'Time TBA')}</span>
                      </div>

                      <div className="flex items-center gap-3 text-neutral-800 font-medium">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <span>{spotlightEvent.location[language]}</span>
                      </div>

                      <button
                        onClick={() => setRegisteringEvent(spotlightEvent)}
                        className="w-full mt-4 py-4 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group/btn"
                      >
                        <span>{language === 'pt' ? 'Garantir Vaga / Inscrever-se' : 'Register / Save Your Spot'}</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              </section>
            ) : (
              <div className="py-20 text-center text-text-muted">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-base font-medium">
                  {language === 'pt' ? 'Nenhum evento agendado no momento.' : 'No upcoming events scheduled.'}
                </p>
              </div>
            )}

            {/* ========================================================= */}
            {/* 📅 SEÇÃO: DEMAIS EVENTOS DA AGENDA                       */}
            {/* ========================================================= */}
            {upcomingEvents.length > 0 && (
              <section aria-label="Próximos Eventos" className="space-y-8 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/40 pb-6">
                  <div>
                    <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold block mb-1">
                      {language === 'pt' ? 'CALENDÁRIO DE ATIVIDADES' : 'ACTIVITY SCHEDULE'}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-on-surface">
                      {language === 'pt' ? 'Outros Encontros & Atividades' : 'More Church Gatherings'}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    {upcomingEvents.length} {language === 'pt' ? 'eventos programados' : 'scheduled events'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="bg-white rounded-3xl border border-outline-variant/50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="aspect-video relative overflow-hidden bg-neutral-100">
                        <img
                          src={
                            evt.image ||
                            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
                          }
                          alt={evt.title[language]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md text-center border border-white/40">
                          <span className="block font-mono font-bold text-base text-primary leading-none">
                            {evt.day}
                          </span>
                          <span className="block font-mono font-bold text-[10px] text-neutral-600 uppercase mt-0.5">
                            {evt.month[language]}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-display font-bold text-lg sm:text-xl text-on-surface leading-snug">
                            {evt.title[language]}
                          </h4>
                          <p className="text-text-muted text-xs sm:text-sm leading-relaxed line-clamp-3">
                            {evt.description[language]}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-outline-variant/30 space-y-2 text-xs text-text-muted">
                          <div className="flex items-center gap-2 font-medium">
                            <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span>{evt.time}</span>
                          </div>
                          <div className="flex items-center gap-2 font-medium">
                            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="line-clamp-1">{evt.location[language]}</span>
                          </div>

                          <button
                            onClick={() => setRegisteringEvent(evt)}
                            className="w-full mt-3 py-3 bg-surface-alt hover:bg-primary hover:text-white text-primary border border-primary/20 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                          >
                            {language === 'pt' ? 'Ver Detalhes / Inscrever-se' : 'Details / Register'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* ========================================================= */}
      {/* 📝 MODAL DE INSCRIÇÃO RÁPIDA                              */}
      {/* ========================================================= */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-primary text-white flex justify-between items-start">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/80 block mb-1">
                  {language === 'pt' ? 'Inscrição de Participação' : 'Event Registration'}
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl leading-snug">
                  {registeringEvent.title[language]}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 hover:bg-white/10 rounded-full text-white cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {isRegistrationSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-neutral-900">
                    {language === 'pt' ? 'Inscrição Confirmada!' : 'Registration Confirmed!'}
                  </h4>
                  <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                    {language === 'pt'
                      ? 'Aguardamos você com alegria. Um e-mail de confirmação com as instruções foi registrado.'
                      : 'We look forward to seeing you. A confirmation email with details has been recorded.'}
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer mt-2"
                  >
                    {language === 'pt' ? 'Concluir' : 'Done'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="p-3.5 bg-surface-alt rounded-2xl border border-outline-variant/30 text-xs space-y-1">
                    <div className="font-bold text-neutral-800">
                      📅 {registeringEvent.day} {registeringEvent.month[language]} {registeringEvent.year} — {registeringEvent.time}
                    </div>
                    <div className="text-text-muted">
                      📍 {registeringEvent.location[language]}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      {language === 'pt' ? 'Seu Nome Completo *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                      {language === 'pt' ? 'Seu E-mail *' : 'Your Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      placeholder="joao@exemplo.com"
                      className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-container transition-all shadow cursor-pointer mt-2"
                  >
                    {language === 'pt' ? 'Confirmar Presença' : 'Confirm Registration'}
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
