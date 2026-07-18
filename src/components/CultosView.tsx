import { useState, useEffect } from 'react';
import { Clock, Coffee, Heart, Music, BookOpen, Shield, HelpCircle, MapPin, Compass, Church, RefreshCw } from 'lucide-react';
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
    <div id="cultos-view" className="animate-fade-in pt-24">
      {/* 1. HERO HEADER */}
      <section
        id="cultos-hero"
        className="relative bg-neutral-900 text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,15,15,0.85), rgba(15,15,15,0.6)), url("https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            {language === 'pt' ? 'Liturgia & Agenda' : 'Liturgy & Schedule'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white">
            {dict.servicesHeroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200">
            {dict.servicesHeroSub}
          </p>
        </div>
      </section>

      {/* 2. DETAILED SERVICE SCHEDULE */}
      <section id="cultos-schedule-detail" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block font-bold">
              {language === 'pt' ? 'Programação Semanal' : 'Weekly Schedule'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {dict.worshipTimesHeader}
            </h2>
            <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <RefreshCw className="h-8 w-8 text-[#007cc3] animate-spin mb-3" />
              <span className="text-xs text-gray-400 font-mono">
                {language === 'pt' ? 'Buscando programação...' : 'Retrieving schedule...'}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {schedules.map((sch) => {
                const titleLower = (sch.title.pt || sch.title.en || '').toLowerCase();
                const isWorship = titleLower.includes('culto') || titleLower.includes('worship');
                const isEbd = titleLower.includes('ebd') || titleLower.includes('escola') || titleLower.includes('bible');
                
                // Keep the gorgeous visual differences between cards
                if (isWorship) {
                  return (
                    <div key={sch.id} className="bg-white border-2 border-amber-500 rounded-2xl p-8 relative flex flex-col justify-between shadow-lg group duration-200">
                      <span className="absolute top-0 right-8 -translate-y-1/2 bg-amber-500 text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow">
                        {language === 'pt' ? 'Recomendado' : 'Recommended'}
                      </span>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                            {language === 'pt' ? 'Celebração Principal' : 'Main Celebration'}
                          </span>
                          <Compass className="h-5 w-5 text-amber-600 animate-spin-slow" />
                        </div>
                        <div>
                          <h3 className="font-sans font-bold text-xl text-gray-900 mb-2">
                            {sch.title[language]}
                          </h3>
                          <p className="text-2xl font-black text-amber-800 font-mono tracking-tight mb-4">
                            {sch.day_time[language]}
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {sch.description[language]}
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-200/50 text-xs text-gray-500">
                        <span className="font-semibold text-gray-800 block mb-1">
                          {language === 'pt' ? 'Incluso durante o culto:' : 'Included during service:'}
                        </span>
                        <span>{language === 'pt' ? 'Berçário e Culto Infantil para crianças até 10 anos.' : 'Nursery and Children’s Church for kids up to 10 years old.'}</span>
                      </div>
                    </div>
                  );
                } else if (isEbd) {
                  return (
                    <div key={sch.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 relative flex flex-col justify-between hover:shadow-md transition-all group duration-200">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                            {language === 'pt' ? 'Educação Teológica' : 'Theological Study'}
                          </span>
                          <Clock className="h-5 w-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-sans font-bold text-xl text-gray-900 mb-2">
                            {sch.title[language]}
                          </h3>
                          <p className="text-2xl font-black text-amber-700 font-mono tracking-tight mb-4">
                            {sch.day_time[language]}
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {sch.description[language]}
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-200/50 text-xs text-gray-500">
                        <span className="font-semibold text-gray-700 block mb-1">
                          {language === 'pt' ? 'Quem deve participar?' : 'Who is this for?'}
                        </span>
                        <span>{language === 'pt' ? 'Toda a família. Classes específicas de bebês a adultos.' : 'The whole family. Specific classrooms from infants to seniors.'}</span>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={sch.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 relative flex flex-col justify-between hover:shadow-md transition-all group duration-200">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                            {language === 'pt' ? 'Espiritualidade' : 'Spirituality'}
                          </span>
                          <Heart className="h-5 w-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-sans font-bold text-xl text-gray-900 mb-2">
                            {sch.title[language]}
                          </h3>
                          <p className="text-2xl font-black text-amber-700 font-mono tracking-tight mb-4">
                            {sch.day_time[language]}
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {sch.description[language]}
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-200/50 text-xs text-gray-500">
                        <span className="font-semibold text-gray-700 block mb-1">
                          {language === 'pt' ? 'Onde ocorre?' : 'Where does it happen?'}
                        </span>
                        <span>{language === 'pt' ? 'No Salão de Oração Anexo (Entrada Lateral).' : 'In the Annex Prayer Hall (Side Entrance).'}</span>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. WHAT TO EXPECT SECTION */}
      <section id="cultos-expect" className="py-16 md:py-24 bg-amber-50/20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content List */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Instruções para Visitantes' : 'Guest Instructions'}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {dict.expectHeader}
                </h2>
                <p className="text-gray-600 text-sm">
                  {dict.expectText}
                </p>
              </div>
              <div className="h-1 w-12 bg-amber-500 rounded" />

              <div className="space-y-6 pt-4">
                {/* Item 1 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Music className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-gray-900 mb-1">
                      {dict.expectItem1Title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {dict.expectItem1Desc}
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-gray-900 mb-1">
                      {dict.expectItem2Title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {dict.expectItem2Desc}
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-gray-900 mb-1">
                      {dict.expectItem3Title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {dict.expectItem3Desc}
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-gray-900 mb-1">
                      {dict.expectItem4Title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {dict.expectItem4Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Photo Grid */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-4">
              <div className="col-span-12 relative rounded-2xl overflow-hidden shadow aspect-video bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
                  alt="Fellowship and Community"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-6 relative rounded-2xl overflow-hidden shadow aspect-square bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Bibles and studies"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-6 relative rounded-2xl overflow-hidden shadow aspect-square bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Singing praises"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAP BOX & INFO */}
      <section id="cultos-visit-map" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Arrival instructions box */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{language === 'pt' ? 'Endereço & Como Chegar' : 'Address & Navigation'}</span>
                </div>
                <h3 className="font-sans font-black text-2xl sm:text-3xl text-white leading-tight">
                  {dict.visitUsBoxTitle}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {dict.visitUsBoxText}
                </p>
                <div className="pt-4 space-y-2.5 text-sm text-neutral-200 border-t border-white/10">
                  <p className="flex items-start">
                    <MapPin className="h-5 w-5 text-amber-400 mr-2 shrink-0 mt-0.5" />
                    <span className="font-semibold">{dict.visitUsBoxAddress}</span>
                  </p>
                  <p className="text-xs text-neutral-400 pl-7">
                    {language === 'pt'
                      ? '✓ Estacionamento conveniado e gratuito para visitantes (Rua Pamplona, 50).'
                      : '✓ Partnered parking free for guests (Pamplona Street, 50).'}
                  </p>
                  <p className="text-xs text-neutral-400 pl-7">
                    {language === 'pt'
                      ? '✓ Próximo ao Metrô Trianon-Masp (Linha 2-Verde — apenas 3 minutos caminhando).'
                      : '✓ Near Trianon-Masp Subway Station (Line 2-Green — just a 3-minute walk).'}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center gap-4">
                <button
                  id="google-maps-redirect"
                  onClick={() => onChangeTab('contato')}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-all text-center"
                >
                  {language === 'pt' ? 'Ver no Google Maps' : 'View on Google Maps'}
                </button>
                <span className="text-neutral-400 text-xs text-center font-mono italic">
                  {language === 'pt' ? 'Venha como estiver!' : 'Come as you are!'}
                </span>
              </div>
            </div>

            {/* Right Mock Interactive Map Visualizer */}
            <div className="lg:col-span-7 relative min-h-[300px] bg-neutral-950 overflow-hidden">
              {/* Clean Map SVG Grid Graphic */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Visual streets drawing mock */}
                <svg className="w-full h-full text-neutral-800 opacity-40 absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="4" />
                  <line x1="45%" y1="0" x2="45%" y2="100%" stroke="currentColor" strokeWidth="6" />
                  <line x1="80%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="4" />
                  <line x1="0" y1="25%" x2="100%" y2="25%" stroke="currentColor" strokeWidth="8" />
                  <line x1="0" y1="65%" x2="100%" y2="65%" stroke="currentColor" strokeWidth="4" />
                </svg>

                {/* Styled Pin Element */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="animate-bounce bg-[#007cc3] text-white p-3 rounded-full shadow-2xl relative border-4 border-white">
                    <Church className="h-6 w-6 text-white" />
                    {/* Ripple outer pulse */}
                    <div className="absolute -inset-2 rounded-full bg-[#007cc3]/25 animate-ping" />
                  </div>
                  <div className="mt-3 bg-neutral-950/90 border border-neutral-700 backdrop-blur px-3 py-1.5 rounded-lg text-center shadow-lg">
                    <span className="font-sans font-extrabold text-xs text-white block">
                      ICE Nova Vida
                    </span>
                    <span className="text-[10px] font-mono text-[#007cc3] block">
                      Rua Luis Antônio dos Santos, 54
                    </span>
                  </div>
                </div>

                {/* Surrounding landmarks */}
                <div className="absolute top-1/4 left-[15%] text-neutral-500 text-[10px] font-mono">
                  R. Voluntários da Pátria
                </div>
                <div className="absolute bottom-1/4 right-[15%] text-neutral-500 text-[10px] font-mono">
                  Av. Eng. Caetano Álvares
                </div>
                <div className="absolute top-[60%] right-[30%] text-neutral-600 text-[10px] font-mono">
                  Metrô Santana
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
