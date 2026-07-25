import { useState, useEffect } from 'react';
import { Clock, Heart, Music, BookOpen, Shield, MapPin, Compass, Church, RefreshCw, Sun, Moon, Zap, ArrowDown, ArrowRight } from 'lucide-react';
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
    <div id="cultos-view" className="animate-fade-in pt-20 bg-background text-on-background">
      {/* Hero Section: Dynamic & Bold */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-on-background text-white">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJvnyU8WvnaORHrgmwxIaY2niSk6f_J0qVuuyQHoOVQ_jqArnPGKbPkuqhFAPNdwn9ScJqTCKQDKDL2LKw0wSI97qtUqgbU68gva44kmP_A9W2b5uhNP-pHCs-tVn0yMoSgL7mG6h3N5XS4BmtuRdpdk93M4XSSiruds2m6VDB-ySjXNL8JmkE5FsjQTbK5VlOMfavYBQRX5eiZHM8579Pcp8JE3oxeSqscrTXcuiAc7jZNMmhQOV-JCnHhYTLZR5m6hvBz5_8rNE')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-on-background via-on-background/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center py-16">
          <div className="max-w-xl">
            <span className="inline-block py-1 px-3.5 rounded-full bg-tertiary-container/20 text-tertiary-fixed text-xs font-bold font-mono tracking-widest mb-6 border border-tertiary-container/30 uppercase">
              {language === 'pt' ? 'VIVA O NOVO' : 'EXPERIENCE RENEWAL'}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              {dict.servicesHeroTitle}
            </h1>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              {dict.servicesHeroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#horarios"
                className="bg-primary-container text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-primary transition-all flex items-center gap-2 shadow-lg"
              >
                {language === 'pt' ? 'Ver Horários' : 'View Schedule'}{' '}
                <ArrowDown className="h-4 w-4" />
              </a>
              <button
                onClick={() => onChangeTab('sobre')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/20 transition-all cursor-pointer"
              >
                {language === 'pt' ? 'Nossa Visão' : 'Our Vision'}
              </button>
            </div>
          </div>

          <div className="hidden md:block relative h-[480px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden transform rotate-2 border-4 border-white/10 shadow-2xl">
              <img
                alt="Worship band"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBkni0VPOambvnYVJjtJwDowGTyClayKt-bNv7EUjvwNesa3aFhObWWiPjNAQ1Io8Rp5Hiyh23BPIJlCGrPw8YdGh-KCTP25gnJxxZ1-z8oPJjkYBdQBSfuRgcTK_heAd8joDAHuEWKV-rrvgEYhm2u8eJEel9TIJHkkV8HIZ0jXx3s5GwSLDiyNHBGRsNoTq-BW65s1-sSoBnf4VDBicuefMab4WFT-5E8XXS2PZgRND1WgH_quKq0oiQWZlW1g1GXsfwV4U0pio"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden transform -rotate-6 border-4 border-white/20 shadow-2xl">
              <img
                alt="Community member"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTR4jyl-QDJSEIOOuhC_SSrSCnkRlpYvNagqzfof7D1eTd3aVqj4BgUsdM3AtvXWCoFv0Hpka9tP_WE4cERRMhGiCyGHSrGBlwXHu7SIGu1Bj8ZnWgADb4UeI9jpegJkABj0bsy2wcpicgDm76pYREXeNzuZVY1ASyX-8SmLIa2_s5RzZpVCsJ4Yit2y3Ed_TXhTS19bqOk__DQfuu9I5la6Fzod30LQMBJaxJwd5gkOZXf9qa-cuivwB2BN_LK1gn_vjSo78-Pjg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Worship Blocks: Modern Card Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-surface-alt" id="horarios">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold text-amber-700 tracking-widest uppercase block mb-2">
                {language === 'pt' ? 'Programação Semanal' : 'Weekly Schedule'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary mb-4">
                {dict.worshipTimesHeader}
              </h2>
              <p className="text-text-muted text-base">
                {language === 'pt'
                  ? 'Diferentes expressões, o mesmo propósito. Encontre o horário que melhor se adapta à sua rotina.'
                  : 'Different expressions, the same purpose. Find the schedule that best fits your routine.'}
              </p>
            </div>
            <div className="hidden md:block w-32 h-1 bg-primary/20 mb-4 rounded-full" />
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mb-3" />
              <span className="text-xs text-text-muted font-mono">
                {language === 'pt' ? 'Carregando programação...' : 'Loading schedule...'}
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {schedules.map((sch, idx) => {
                const isMain = idx === 1 || sch.title.pt.toLowerCase().includes('principal');
                if (isMain) {
                  return (
                    <div
                      key={sch.id}
                      className="bg-primary text-white p-8 sm:p-10 rounded-2xl dynamic-card flex flex-col h-full relative overflow-hidden ring-4 ring-primary-container shadow-xl"
                    >
                      <div className="absolute top-0 right-0 p-4">
                        <span className="bg-tertiary-container text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow">
                          {language === 'pt' ? 'Mais Frequentado' : 'Most Attended'}
                        </span>
                      </div>
                      <div className="mb-8 flex justify-between items-start">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                          <Zap className="h-7 w-7" />
                        </div>
                        <span className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider">
                          DOMINGO
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-2">
                        {sch.title[language]}
                      </h3>
                      <p className="text-white/80 text-sm mb-8 flex-grow leading-relaxed">
                        {sch.description[language]}
                      </p>
                      <div className="pt-6 border-t border-white/20 flex items-center justify-between">
                        <span className="text-4xl font-extrabold font-mono">{sch.day_time[language]}</span>
                        <button
                          onClick={() => onChangeTab('contato')}
                          className="bg-white text-primary px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-surface-bright transition-colors cursor-pointer"
                        >
                          {language === 'pt' ? 'Planejar Visita' : 'Plan Visit'}
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={sch.id}
                    className="bg-white p-8 sm:p-10 rounded-2xl border border-surface-container dynamic-card flex flex-col h-full shadow-sm"
                  >
                    <div className="mb-8 flex justify-between items-start">
                      <div className="w-14 h-14 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary">
                        {idx === 0 ? <Sun className="h-7 w-7" /> : <Moon className="h-7 w-7" />}
                      </div>
                      <span className="text-xs font-mono font-bold text-tertiary-container uppercase tracking-wider">
                        {idx === 0 ? 'DOMINGO' : 'QUARTA-FEIRA'}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 text-on-surface">
                      {sch.title[language]}
                    </h3>
                    <p className="text-text-muted text-sm mb-8 flex-grow leading-relaxed">
                      {sch.description[language]}
                    </p>
                    <div className="pt-6 border-t border-surface-container flex items-center justify-between">
                      <span className="text-3xl font-extrabold text-primary font-mono">{sch.day_time[language]}</span>
                      <button
                        onClick={() => onChangeTab('contato')}
                        className="text-primary hover:translate-x-1 transition-transform p-2 cursor-pointer"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="relative">
                <div className="bg-secondary-container rounded-[2rem] w-full aspect-[4/5] overflow-hidden transform -rotate-3 shadow-xl">
                  <img
                    alt="Joyful congregation"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Cd0jqgfJBE9SgA2Q-qcyd7XzgRfT8leScKVMFGliUlkmqaKfywAftX1xZP-Fnht30tyLRS7T7uzg5HQCTGjapi5f7pc-L6Il4JxBlVtGN_9jDuAceeermZpJnQcmaCHG-ce5sonbYrr_lo_S2HTPDJOKl5W55DZONyJoMAsp6NCIgaw6OG74mFSXPBlZcKANSahR1-E9AfDd_4tdbyxueIr3BNNTlFOY9NqeY0PqyXyMxKnq8uXhg-Srin1SeTdvS_9SkhYp8-8"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-surface-container max-w-[260px] transform rotate-3">
                  <p className="text-primary font-bold italic text-sm mb-2">
                    "Aqui encontrei uma família que acolhe com amor e verdade."
                  </p>
                  <span className="text-xs text-text-muted">— Membro ICENVSP</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 order-1 md:order-2 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700 tracking-widest uppercase block mb-2">
                  {language === 'pt' ? 'Instruções para Visitantes' : 'Guest Information'}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-on-surface">
                  {dict.expectHeader}
                </h2>
              </div>

              <div className="space-y-8">
                <div className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Music className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-on-surface mb-1">
                      {dict.expectItem1Title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {dict.expectItem1Desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-on-surface mb-1">
                      {dict.expectItem2Title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {dict.expectItem2Desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-on-surface mb-1">
                      {dict.expectItem3Title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {dict.expectItem3Desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-on-surface mb-1">
                      {dict.expectItem4Title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {dict.expectItem4Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Callout */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-surface-container overflow-hidden">
        <div className="max-w-container-max mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-surface-container">
            <h3 className="font-display text-3xl font-extrabold text-primary mb-4">
              {dict.visitUsBoxTitle}
            </h3>
            <p className="text-text-muted text-sm mb-8 leading-relaxed">
              {dict.visitUsBoxText}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-on-surface text-sm font-semibold">
                <MapPin className="h-5 w-5 text-tertiary shrink-0" />
                <span>{dict.visitUsBoxAddress}</span>
              </div>
              <p className="text-xs text-text-muted pl-8">
                {language === 'pt'
                  ? '✓ Estacionamento no local e acesso acessível para todos.'
                  : '✓ On-site parking and accessible entrance for all.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onChangeTab('contato')}
                className="flex-1 bg-primary text-white text-center py-3.5 rounded-xl font-bold text-sm hover:bg-primary-container transition-all cursor-pointer shadow"
              >
                {language === 'pt' ? 'Como Chegar' : 'Get Directions'}
              </button>
            </div>
          </div>

          <div className="relative h-[380px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-xl bg-neutral-900 border border-neutral-800">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-10 flex flex-col items-center">
                <div className="animate-bounce bg-primary text-white p-3.5 rounded-full shadow-2xl relative border-4 border-white">
                  <Church className="h-7 w-7 text-white" />
                  <div className="absolute -inset-2 rounded-full bg-primary/30 animate-ping" />
                </div>
                <div className="mt-3 bg-neutral-950/90 border border-neutral-700 backdrop-blur px-4 py-2 rounded-xl text-center shadow-2xl">
                  <span className="font-display font-extrabold text-sm text-white block">
                    ICE Nova Vida - SP
                  </span>
                  <span className="text-xs font-mono text-primary-container block">
                    Rua Luis Antônio dos Santos, 54
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
