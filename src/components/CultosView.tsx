import { useState, useEffect } from 'react';
import { 
  Clock, Heart, Music, BookOpen, Shield, MapPin, Church, 
  RefreshCw, Sun, Moon, Sparkles, ArrowRight, Calendar, Users, 
  Car, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { DICTIONARY } from '../data';
import { getWeeklySchedules, WeeklySchedule } from '../lib/supabase';

interface CultosViewProps {
  language: Language;
  onChangeTab: (tab: ActiveTab) => void;
}

export default function CultosView({ language, onChangeTab }: CultosViewProps) {
  const dict = DICTIONARY[language];
  const [schedules, setSchedules] = useState<WeeklySchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getWeeklySchedules().then((data) => {
      if (active) {
        setSchedules(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div id="cultos-view" className="animate-fade-in pt-24 bg-white text-gray-900">
      
      {/* 1. HERO BANNER: Consistent with SobreView (Brand Hegemony) */}
      <section
        id="cultos-hero"
        className="relative bg-neutral-900 text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,15,15,0.88), rgba(15,15,15,0.65)), url("https://images.unsplash.com/photo-1548625361-155deee21623?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            {language === 'pt' ? 'Celebração e Liturgia' : 'Worship & Liturgy'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white">
            {dict.servicesHeroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200">
            {dict.servicesHeroSub}
          </p>
        </div>
      </section>

      {/* 2. WORSHIP TIMES: Clean & Modern Card Grid */}
      <section id="horarios" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 tracking-widest uppercase block">
              {language === 'pt' ? 'Programação Semanal' : 'Weekly Schedule'}
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              {dict.worshipTimesHeader}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              {language === 'pt'
                ? 'Participe dos nossos encontros presenciais no templo. Há sempre um lugar preparado para você e sua família.'
                : 'Join our in-person gatherings in the sanctuary. There is always a seat prepared for you and your family.'}
            </p>
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <RefreshCw className="h-8 w-8 text-[#007cc3] animate-spin mb-3" />
              <span className="text-xs text-gray-400 font-mono">
                {language === 'pt' ? 'Carregando horários...' : 'Loading schedule...'}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {schedules.map((sch, idx) => {
                const isMain = idx === 1 || sch.title.pt.toLowerCase().includes('principal');

                if (isMain) {
                  return (
                    <div
                      key={sch.id}
                      className="bg-gradient-to-b from-[#28166f] to-[#1e1054] text-white p-8 sm:p-9 rounded-2xl flex flex-col justify-between relative shadow-xl border border-[#28166f]/40 group hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="absolute top-4 right-4">
                        <span className="bg-amber-400 text-neutral-950 text-[10px] px-3 py-1 rounded-full font-mono font-bold uppercase tracking-wider shadow">
                          {language === 'pt' ? 'Culto Principal' : 'Main Service'}
                        </span>
                      </div>

                      <div className="space-y-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 border border-white/10">
                          <Church className="h-6 w-6" />
                        </div>

                        <div>
                          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block mb-1">
                            {language === 'pt' ? 'Domingo' : 'Sunday'}
                          </span>
                          <h3 className="font-sans font-bold text-2xl text-white">
                            {sch.title[language]}
                          </h3>
                        </div>

                        <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                          {sch.description[language]}
                        </p>
                      </div>

                      <div className="pt-6 mt-8 border-t border-white/15 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-neutral-400 block font-bold">
                            {language === 'pt' ? 'Horário' : 'Time'}
                          </span>
                          <span className="text-xl font-black font-mono text-white tracking-tight">
                            {sch.day_time[language]}
                          </span>
                        </div>
                        <button
                          onClick={() => onChangeTab('contato')}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow flex items-center gap-1.5"
                        >
                          <span>{language === 'pt' ? 'Participar' : 'Attend'}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={sch.id}
                    className="bg-white p-8 sm:p-9 rounded-2xl border border-gray-200/80 hover:border-amber-400/50 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 group-hover:bg-amber-100 transition-colors">
                        {idx === 0 ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                      </div>

                      <div>
                        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block mb-1">
                          {idx === 0 ? (language === 'pt' ? 'Domingo' : 'Sunday') : (language === 'pt' ? 'Quarta-feira' : 'Wednesday')}
                        </span>
                        <h3 className="font-sans font-bold text-2xl text-gray-900">
                          {sch.title[language]}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed font-sans">
                        {sch.description[language]}
                      </p>
                    </div>

                    <div className="pt-6 mt-8 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-gray-400 block font-bold">
                          {language === 'pt' ? 'Horário' : 'Time'}
                        </span>
                        <span className="text-xl font-black font-mono text-gray-900 tracking-tight">
                          {sch.day_time[language]}
                        </span>
                      </div>
                      <button
                        onClick={() => onChangeTab('contato')}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#28166f] text-gray-600 hover:text-white transition-colors cursor-pointer"
                        title={language === 'pt' ? 'Saiba como participar' : 'Learn how to attend'}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 3. WHAT TO EXPECT: Clean Editorial Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 tracking-widest uppercase block">
              {language === 'pt' ? 'Guia do Visitante' : 'Guest Guide'}
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              {dict.expectHeader}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              {dict.expectText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Music className="h-5 w-5" />
              </div>
              <h4 className="font-sans font-bold text-lg text-gray-900">
                {dict.expectItem1Title}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {dict.expectItem1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <BookOpen className="h-5 w-5" />
              </div>
              <h4 className="font-sans font-bold text-lg text-gray-900">
                {dict.expectItem2Title}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {dict.expectItem2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Heart className="h-5 w-5" />
              </div>
              <h4 className="font-sans font-bold text-lg text-gray-900">
                {dict.expectItem3Title}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {dict.expectItem3Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/70 border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all space-y-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="font-sans font-bold text-lg text-gray-900">
                {dict.expectItem4Title}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {dict.expectItem4Desc}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. LOCATION & ACCESS: Clean Minimalist Card */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-sm text-center space-y-6">
          <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
            <MapPin className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest block">
              {language === 'pt' ? 'Endereço e Localização' : 'Address & Location'}
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-900">
              {dict.visitUsBoxTitle}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {dict.visitUsBoxText}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-gray-100 inline-block font-sans text-sm sm:text-base font-semibold text-gray-800">
            📍 {dict.visitUsBoxAddress}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 pt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              {language === 'pt' ? 'Estacionamento conveniado no local' : 'Partnered parking on-site'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              {language === 'pt' ? 'Acessibilidade plena' : 'Full accessibility'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              {language === 'pt' ? 'Espaço infantil preparado' : 'Children ministry ready'}
            </span>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onChangeTab('contato')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-[#28166f] hover:bg-[#28166f]/90 text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>{language === 'pt' ? 'Abrir Mapa & Fale Conosco' : 'Open Map & Contact Us'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

