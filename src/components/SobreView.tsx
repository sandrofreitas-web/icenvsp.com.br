import { useState } from 'react';
import { Shield, Target, Award, ArrowRight, UserCheck, BookOpen, Heart, Globe, Coins, Users, Building2, Compass, FileText } from 'lucide-react';
import { Language, ActiveTab, Leader, TimelineEvent } from '../types';
import { DICTIONARY, LEADERS, TIMELINE } from '../data';

interface SobreViewProps {
  language: Language;
  onChangeTab: (tab: ActiveTab, subTab?: string) => void;
  activeSubTab: string;
  setActiveSubTab: (subTab: string) => void;
}

export default function SobreView({ language, onChangeTab, activeSubTab, setActiveSubTab }: SobreViewProps) {
  const dict = DICTIONARY[language];
  const leaders: Leader[] = LEADERS;
  const timeline: TimelineEvent[] = TIMELINE;

  return (
    <div id="sobre-view" className="animate-fade-in pt-24">
      {/* 1. HERO BANNER */}
      <section
        id="about-hero"
        className="relative bg-neutral-900 text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,15,15,0.85), rgba(15,15,15,0.6)), url("https://images.unsplash.com/photo-1548625361-155deee21623?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            {language === 'pt' ? 'Quem Somos' : 'Who We Are'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white">
            {dict.aboutHeroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200">
            {dict.aboutHeroSub}
          </p>
        </div>
      </section>

      {/* 2. MISSION, VISION, VALUES BENTO GRID */}
      <section id="about-mission-vision" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Box */}
            <div className="bg-amber-50/30 p-8 rounded-2xl border border-amber-100 flex flex-col justify-between group hover:bg-amber-50 transition-all duration-200">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="font-sans font-bold text-xl text-gray-900">
                  {dict.mission}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dict.missionText}
                </p>
              </div>
              <div className="h-[2px] w-8 bg-amber-500 rounded mt-6" />
            </div>

            {/* Vision Box */}
            <div className="bg-amber-50/30 p-8 rounded-2xl border border-amber-100 flex flex-col justify-between group hover:bg-amber-50 transition-all duration-200">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-sans font-bold text-xl text-gray-900">
                  {dict.vision}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dict.visionText}
                </p>
              </div>
              <div className="h-[2px] w-8 bg-amber-500 rounded mt-6" />
            </div>

            {/* Values Box */}
            <div className="bg-neutral-900 text-amber-100 p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between group hover:bg-neutral-850 transition-all duration-200 shadow-lg">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-sans font-bold text-xl text-white">
                  {dict.values}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {dict.valuesText}
                </p>
              </div>
              <div className="h-[2px] w-8 bg-amber-400 rounded mt-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE CHURCH LIFE SUB-NAVIGATION SYSTEM */}
      <section id="about-navigation" className="bg-[#fcfaf5] border-t border-b border-gray-100 py-4 sticky top-16 z-30 shadow-sm overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 whitespace-nowrap min-w-max">
            
            <button
              onClick={() => setActiveSubTab('historia')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'historia'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>{language === 'pt' ? 'História' : 'History'}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('confissao')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'confissao'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>{language === 'pt' ? 'Confissão de Fé' : 'Faith Confession'}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('lideranca')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'lideranca'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>{language === 'pt' ? 'Liderança' : 'Leadership'}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('ebd')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'ebd'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>EBD</span>
            </button>

            <button
              onClick={() => setActiveSubTab('dizimos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'dizimos'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <Coins className="h-4 w-4" />
              <span>{language === 'pt' ? 'Dízimos & Ofertas' : 'Tithes & Offerings'}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('denominacao')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'denominacao'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>{language === 'pt' ? 'Nossa Denominação' : 'Denomination'}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('missionarios')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'missionarios'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'pt' ? 'Missionários' : 'Missionaries'}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('grupos')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'grupos'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>{language === 'pt' ? 'Pequenos Grupos' : 'Small Groups'}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('ministerios')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeSubTab === 'ministerios'
                  ? 'bg-[#28166f] text-white shadow-md'
                  : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-100'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>{language === 'pt' ? 'Ministérios' : 'Ministries'}</span>
            </button>

          </div>
        </div>
      </section>

      {/* 4. MAIN CONTAINER FOR CORE LIFE SECTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TAB CONTENT: TIMELINE/HISTORIA */}
          {activeSubTab === 'historia' && (
            <div className="space-y-12 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Nossa Jornada' : 'Our Journey'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {dict.historyTitle}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              {/* Timeline layout */}
              <div className="relative border-l-2 border-amber-500/30 ml-4 md:ml-32 space-y-12 pb-4">
                {timeline.map((item, index) => (
                  <div key={item.year} id={`timeline-item-${item.year}`} className="relative pl-6 md:pl-10">
                    <div className="absolute left-0 top-1.5 -translate-x-1/2 h-5 w-5 rounded-full bg-amber-500 border-4 border-white shadow" />
                    <div className="md:absolute md:left-[-140px] md:top-1 md:w-28 md:text-right">
                      <span className="inline-block font-sans font-black text-2xl sm:text-3xl text-amber-700 font-mono tracking-tight leading-none">
                        {item.year}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      <div className="sm:col-span-8 space-y-3">
                        <span className="md:hidden inline-block font-sans font-black text-2xl text-amber-700 font-mono tracking-tight mb-1">
                          {item.year}
                        </span>
                        <h3 className="font-sans font-extrabold text-lg sm:text-xl text-gray-900 leading-snug">
                          {item.title[language]}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description[language]}
                        </p>
                      </div>
                      {item.image && (
                        <div className="sm:col-span-4 rounded-xl overflow-hidden aspect-video sm:aspect-square bg-gray-100 shadow-inner">
                          <img
                            src={item.image}
                            alt={item.title[language]}
                            className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: CONFISSAO DE FE */}
          {activeSubTab === 'confissao' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Em que Cremos' : 'Our Creed'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {language === 'pt' ? 'Confissão de Fé & Doutrina' : 'Confession of Faith & Doctrine'}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-[#fcfaf5] border border-amber-100 rounded-2xl p-6 space-y-3">
                  <h3 className="font-sans font-black text-amber-800 text-lg uppercase tracking-tight">
                    Sola Scriptura
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Cremos que a Bíblia Sagrada é a Palavra de Deus inspirada, infalível e a única regra de fé, prática e conduta para o cristão.'
                      : 'We believe that the Holy Bible is the inspired, infallible Word of God, and the only rule of faith, practice, and conduct for Christians.'}
                  </p>
                </div>

                <div className="bg-[#fcfaf5] border border-amber-100 rounded-2xl p-6 space-y-3">
                  <h3 className="font-sans font-black text-amber-800 text-lg uppercase tracking-tight">
                    Solus Christus
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Jesus Cristo é o Filho de Deus, o único mediador entre Deus e os homens, que morreu na cruz pelos nossos pecados e ressuscitou.'
                      : 'Jesus Christ is the Son of God, the only mediator between God and man, who died on the cross for our sins and rose again.'}
                  </p>
                </div>

                <div className="bg-[#fcfaf5] border border-amber-100 rounded-2xl p-6 space-y-3">
                  <h3 className="font-sans font-black text-amber-800 text-lg uppercase tracking-tight">
                    Sola Gratia & Sola Fide
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'A salvação é operada exclusivamente pela soberana graça de Deus e recebida unicamente pela fé em Cristo Jesus, não por obras.'
                      : 'Salvation is worked exclusively by God\'s sovereign grace and received solely through faith in Christ Jesus, not of works.'}
                  </p>
                </div>

              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 space-y-4 max-w-4xl mx-auto mt-8">
                <h4 className="font-sans font-extrabold text-gray-900 text-lg">
                  {language === 'pt' ? 'Identidade Teológica' : 'Theological Identity'}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === 'pt'
                    ? 'Somos uma igreja histórica de tradição evangélica e reformada. Cremos na soberania de Deus, na Trindade Divina (Pai, Filho e Espírito Santo) e subscrevemos os Credos Ecumênicos da Igreja Antiga (Credo Apostólico) e os pilares teológicos da Reforma Protestante do Século XVI.'
                    : 'We are a historic church of evangelical and reformed tradition. We believe in the sovereignty of God, the Divine Trinity (Father, Son, and Holy Spirit), and we subscribe to the Ecumenical Creeds of the Early Church (Apostles\' Creed) and the theological pillars of the 16th-century Protestant Reformation.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB CONTENT: LIDERANÇA */}
          {activeSubTab === 'lideranca' && (
            <div className="space-y-12 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Corpo Pastoral e Conselho' : 'Pastoral Council'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {dict.leadershipTitle}
                </h2>
                <p className="text-sm text-gray-500">
                  {dict.leadershipSub}
                </p>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {leaders.map((leader) => (
                  <div
                    key={leader.id}
                    id={`leader-card-${leader.id}`}
                    className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group flex flex-col justify-between hover:shadow-md hover:bg-white transition-all duration-200"
                  >
                    <div>
                      <div className="relative aspect-square bg-gray-200 overflow-hidden">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur p-1.5 rounded-lg text-amber-700 shadow-sm">
                          <UserCheck className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-sans font-bold text-base text-gray-900 leading-tight">
                          {leader.name}
                        </h3>
                        <span className="inline-block text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
                          {leader.role[language]}
                        </span>
                        <p className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-gray-100/60">
                          {leader.bio[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: ESCOLA BÍBLICA DOMINICAL */}
          {activeSubTab === 'ebd' && (
            <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Ensino & Edificação' : 'Teaching & Growth'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {language === 'pt' ? 'Escola Bíblica Dominical (EBD)' : 'Sunday Bible School (EBD)'}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-10">
                <div className="md:col-span-7 space-y-4">
                  <h3 className="font-sans font-black text-gray-900 text-xl leading-tight">
                    {language === 'pt' ? 'O Coração do Ensino na Igreja' : 'The Heart of Church Education'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Desde nossa fundação in 1912, a Escola Bíblica Dominical tem sido o pilar educacional da ICENV. Todos os domingos pela manhã, nos reunimos para estudar as Escrituras de forma aprofundada, promovendo o crescimento espiritual e a comunhão.'
                      : 'Since our foundation in 1912, the Sunday Bible School has been the educational cornerstone of ICENV. Every Sunday morning, we gather to study the Scriptures deeply, fostering spiritual growth and tight-knit fellowship.'}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Temos classes adequadas para cada faixa etária, com currículos bíblicos estruturados:'
                      : 'We offer classes suitable for every age range, utilizing structured biblical curricula:'}
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-5">
                    <li><strong>{language === 'pt' ? 'Classe Infantil:' : 'Kids Class:'}</strong> {language === 'pt' ? 'Histórias bíblicas e atividades lúdicas.' : 'Bible stories and creative activities.'}</li>
                    <li><strong>{language === 'pt' ? 'Classe de Adolescentes & Jovens:' : 'Teens & Youth Class:'}</strong> {language === 'pt' ? 'Aplicação prática da Palavra no dia a dia.' : 'Practical application of the Word in daily life.'}</li>
                    <li><strong>{language === 'pt' ? 'Classe de Adultos:' : 'Adult Class:'}</strong> {language === 'pt' ? 'Estudos sistemáticos, teologia e história da igreja.' : 'Systematic study, theology, and church history.'}</li>
                  </ul>
                </div>
                <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-square shadow bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
                    alt="EBD"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-3 text-center border border-amber-100 shadow">
                    <span className="block text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest">{language === 'pt' ? 'HORÁRIO DA EBD' : 'EBD SCHEDULE'}</span>
                    <span className="block font-sans font-black text-gray-900 text-sm">{language === 'pt' ? 'Domingo às 09h30' : 'Sunday at 09:30 AM'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: DIZIMOS E OFERTAS */}
          {activeSubTab === 'dizimos' && (
            <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Contribuição & Adoração' : 'Giving & Worship'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {language === 'pt' ? 'Dízimos e Ofertas' : 'Tithes and Offerings'}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                
                {/* Theological basis */}
                <div className="md:col-span-6 bg-[#fcfaf5] border border-amber-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-sans font-black text-gray-900 text-lg leading-tight uppercase tracking-tight">
                      {language === 'pt' ? 'Um ato de Adoração' : 'An Act of Worship'}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {language === 'pt'
                        ? 'Cremos que a contribuição financeira por meio de dízimos e ofertas é uma demonstração de amor, gratidão e fidelidade a Deus. É com essas contribuições voluntárias que mantemos os cultos, os projetos de ação social, o sustento de missionários e a manutenção de nosso patrimônio histórico.'
                        : 'We believe that giving tithes and offerings is a response of love, gratitude, and faithfulness to God. Through these voluntary acts, we sustain our worship services, social action programs, missionary work, and the conservation of our historic facilities.'}
                    </p>
                    <blockquote className="border-l-4 border-amber-500 pl-4 py-1 italic text-amber-900 text-xs sm:text-sm leading-relaxed bg-amber-500/5 pr-2">
                      {language === 'pt'
                        ? '"Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." — 2 Coríntios 9:7'
                        : '"Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7'}
                    </blockquote>
                  </div>
                </div>

                {/* Account details */}
                <div className="md:col-span-6 bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-neutral-800 shadow-xl">
                  <div className="space-y-4">
                    <h3 className="font-sans font-black text-amber-400 text-lg uppercase tracking-tight">
                      {language === 'pt' ? 'Dados para Transferência' : 'Banking Coordinates'}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {language === 'pt'
                        ? 'Sua doação pode ser feita por PIX ou depósito bancário:'
                        : 'You can make your donation via PIX transfer or direct bank deposit:'}
                    </p>

                    <div className="bg-neutral-950 rounded-2xl p-4 border border-neutral-800 space-y-3 font-mono text-xs text-neutral-300">
                      <div>
                        <span className="block text-[10px] text-neutral-500 font-bold uppercase">{language === 'pt' ? 'CHAVE PIX (CNPJ)' : 'PIX KEY (CNPJ)'}</span>
                        <span className="text-[#007cc3] font-bold text-sm select-all">60.123.456/0001-77</span>
                      </div>
                      <div className="pt-2 border-t border-neutral-900 grid grid-cols-2 gap-2">
                        <div>
                          <span className="block text-[10px] text-neutral-500 font-bold uppercase">{language === 'pt' ? 'BANCO' : 'BANK'}</span>
                          <span className="font-bold text-neutral-200">Bradesco (237)</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-neutral-500 font-bold uppercase">{language === 'pt' ? 'FAVORECIDO' : 'PAYEE'}</span>
                          <span className="font-bold text-neutral-200">ICENV</span>
                        </div>
                        <div className="pt-1">
                          <span className="block text-[10px] text-neutral-500 font-bold uppercase">{language === 'pt' ? 'AGÊNCIA' : 'AGENCY'}</span>
                          <span className="font-bold text-neutral-200">0123-4</span>
                        </div>
                        <div className="pt-1">
                          <span className="block text-[10px] text-neutral-500 font-bold uppercase">{language === 'pt' ? 'CONTA CORRENTE' : 'ACCOUNT'}</span>
                          <span className="font-bold text-neutral-200">98765-4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-500 text-center italic">
                    {language === 'pt' ? 'Igreja Cristã Evangélica Nova Vida — CNPJ 60.123.456/0001-77' : 'Nova Vida Christian Evangelical Church — Tax ID 60.123.456/0001-77'}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB CONTENT: DENOMINAÇÃO ICEB */}
          {activeSubTab === 'denominacao' && (
            <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Nossa Aliança Histórica' : 'Our Historic Alliance'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                  {language === 'pt' ? 'Igreja Cristã Evangélica do Brasil (ICEB)' : 'Christian Evangelical Church of Brazil (ICEB)'}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-10">
                <div className="md:col-span-8 space-y-4">
                  <h3 className="font-sans font-black text-gray-900 text-xl leading-tight">
                    {language === 'pt' ? 'Uma história centenária de fidelidade bíblica' : 'A Century-Old History of Biblical Faithfulness'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'A Igreja Cristã Evangélica Nova Vida é filiada à Igreja Cristã Evangélica do Brasil (ICEB). Fundada oficialmente em 1901 pelos missionários pioneiros Dr. Reginald Young e Sarah Poulton Kalley, a ICEB é uma das mais tradicionais e históricas denominações evangélicas do país.'
                      : 'The Nova Vida Christian Evangelical Church is affiliated with the Christian Evangelical Church of Brazil (ICEB). Officially founded in 1901 by pioneer missionaries Dr. Reginald Young and Sarah Poulton Kalley, ICEB is one of the nation\'s most traditional and historic evangelical denominations.'}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'A ICEB se destaca pelo apego às Escrituras Sagradas, forte ênfase na plantação de igrejas, zelo doutrinário reformado, esforço na evangelização urbana e compromisso sério com a obra missionária nacional e internacional.'
                      : 'ICEB stands out for its attachment to the Holy Scriptures, strong emphasis on church planting, reformed doctrinal zeal, urban evangelism efforts, and serious commitment to national and international missionary works.'}
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://iceb.org.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                    >
                      <span>{language === 'pt' ? 'Conhecer portal oficial da ICEB' : 'Visit official ICEB portal'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                <div className="md:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center space-y-3">
                  <Building2 className="h-12 w-12 text-[#28166f] mx-auto" />
                  <div className="space-y-1">
                    <span className="block font-sans font-black text-gray-900 text-base">ICEB</span>
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">{language === 'pt' ? 'FUNDADA EM 1901' : 'ESTABLISHED IN 1901'}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === 'pt' ? 'Uma das denominações pioneiras no movimento missionário brasileiro.' : 'One of the pioneering denominations in the Brazilian missionary movement.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: MISSIONARIOS */}
          {activeSubTab === 'missionarios' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Até os Confins da Terra' : 'To the Ends of the Earth'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                  {language === 'pt' ? 'Nossos Missionários & Campos' : 'Our Missionaries & Fields'}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Mission Card 1 */}
                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[#28166f] font-mono text-[10px] font-bold uppercase tracking-wider block">{language === 'pt' ? 'Campo Nacional — Nordeste' : 'National Field — Northeast'}</span>
                    <h3 className="font-sans font-bold text-gray-950 text-base">{language === 'pt' ? 'Família Silva' : 'Silva Family'}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {language === 'pt'
                        ? 'Atuam no sertão do Maranhão no desenvolvimento de uma nova congregação e em projetos sociais de alfabetização de crianças.'
                        : 'Serving in the countryside of Maranhão, planting a new church and running childhood literacy social programs.'}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200/50 text-[10px] text-gray-400">
                    <strong>{language === 'pt' ? 'Como orar:' : 'How to pray:'}</strong> {language === 'pt' ? 'Pelo sustento, saúde e sabedoria na alfabetização.' : 'For provision, physical health, and wisdom in teaching.'}
                  </div>
                </div>

                {/* Mission Card 2 */}
                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[#28166f] font-mono text-[10px] font-bold uppercase tracking-wider block">{language === 'pt' ? 'Campo Transcultural — Ásia' : 'Cross-Cultural — Asia'}</span>
                    <h3 className="font-sans font-bold text-gray-950 text-base">{language === 'pt' ? 'Pr. Jonathan & Clara' : 'Pr. Jonathan & Clara'}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {language === 'pt'
                        ? 'Apoio a líderes locais no sudeste asiático através de capacitação teológica discreta em países com restrições à liberdade de crença.'
                        : 'Supporting local leaders in Southeast Asia through discreet theological training in countries with restrictions on religious freedom.'}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200/50 text-[10px] text-gray-400">
                    <strong>{language === 'pt' ? 'Como orar:' : 'How to pray:'}</strong> {language === 'pt' ? 'Pela proteção diária e eficácia no treinamento pastoral.' : 'For daily protection and effectiveness in pastoral training.'}
                  </div>
                </div>

                {/* Mission Card 3 */}
                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-[#28166f] font-mono text-[10px] font-bold uppercase tracking-wider block">{language === 'pt' ? 'Parceria Institucional' : 'Institutional Partnership'}</span>
                    <h3 className="font-sans font-bold text-gray-950 text-base">{language === 'pt' ? 'Departamento de Missões ICEB' : 'ICEB Missions Department'}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {language === 'pt'
                        ? 'Contribuímos mensalmente com a Junta de Missões da nossa denominação, auxiliando no envio e manutenção de dezenas de missionários.'
                        : 'We contribute monthly to our denomination\'s Mission Board, assisting in the sending and upkeep of dozens of missionaries.'}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200/50 text-[10px] text-gray-400">
                    <strong>{language === 'pt' ? 'Como ajudar:' : 'How to help:'}</strong> {language === 'pt' ? 'Participe da nossa oferta mensal específica de missões.' : 'Participate in our dedicated monthly mission offerings.'}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB CONTENT: PEQUENOS GRUPOS */}
          {activeSubTab === 'grupos' && (
            <div id="about-small-groups" className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Vida em Comunidade' : 'Life in Community'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                  {language === 'pt' ? 'Pequenos Grupos (Células)' : 'Small Groups (Cells)'}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#fcfaf5] border border-amber-100 rounded-3xl p-6 sm:p-10">
                <div className="md:col-span-7 space-y-4">
                  <h3 className="font-sans font-black text-gray-900 text-xl leading-tight">
                    {language === 'pt' ? 'Comunhão e Crescimento de Perto' : 'Fellowship and Closer Growth'}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Nossos Pequenos Grupos são o lugar ideal para vivenciar o amor cristão de maneira prática. São reuniões semanais simples e acolhedoras que acontecem nos lares de membros da nossa igreja nos bairros da zona norte de São Paulo.'
                      : 'Our Small Groups are the perfect setting to experience Christian love practically. They are simple, welcoming weekly home gatherings hosted by church members in northern São Paulo neighborhoods.'}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt'
                      ? 'Em um Pequeno Grupo, você terá a oportunidade de estudar a Bíblia de forma interativa, receber e oferecer apoio mútuo através da oração, e desenvolver amizades sólidas baseadas na fé.'
                      : 'In a Small Group, you will have the chance to study the Bible interactively, receive and extend mutual support through prayer, and develop solid faith-based friendships.'}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onChangeTab('contato')}
                      className="px-5 py-2.5 bg-[#28166f] hover:bg-[#1e1054] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                    >
                      {language === 'pt' ? 'Quero fazer parte de um grupo' : 'I want to join a group'}
                    </button>
                  </div>
                </div>
                <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-video sm:aspect-square bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80"
                    alt="Pequenos Grupos"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: MINISTÉRIOS */}
          {activeSubTab === 'ministerios' && (
            <div id="about-ministries-list" className="space-y-8 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <span className="text-amber-700 uppercase font-mono text-xs font-bold tracking-widest block">
                  {language === 'pt' ? 'Membros em Ação' : 'Members in Action'}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                  {language === 'pt' ? 'Nossos Ministérios' : 'Our Ministries'}
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Ministry 1 */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-[#28166f]/10 text-[#28166f] rounded-xl flex items-center justify-center">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-black text-gray-950 text-base uppercase tracking-tight">{language === 'pt' ? 'Adoração & Música' : 'Worship & Music'}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === 'pt'
                      ? 'Responsável por conduzir a congregação na louvação ao Senhor com zelo técnico e maturidade teológica em cada cântico.'
                      : 'Responsible for leading the congregation in praise to the Lord, with technical care and theological maturity in every hymn.'}
                  </p>
                </div>

                {/* Ministry 2 */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-[#28166f]/10 text-[#28166f] rounded-xl flex items-center justify-center">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-black text-gray-950 text-base uppercase tracking-tight">{language === 'pt' ? 'Nova Vida Kids (Infantil)' : 'Nova Vida Kids (Children)'}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === 'pt'
                      ? 'Nossa equipe de educadores e voluntários que acolhe, ensina e pastoreia o coração das nossas crianças durante os cultos dominicais.'
                      : 'Our team of educators and volunteers who welcome, teach, and shepherd our children\'s hearts during Sunday worship services.'}
                  </p>
                </div>

                {/* Ministry 3 */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-[#28166f]/10 text-[#28166f] rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-black text-gray-950 text-base uppercase tracking-tight">{language === 'pt' ? 'Mocidade & Adolescentes' : 'Youth & Teens'}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === 'pt'
                      ? 'Ambiente dinâmico de mentoria e discipulado focado nos desafios da nova geração à luz das verdades bíblicas inalteráveis.'
                      : 'Dynamic mentoring and discipleship environment focusing on the new generation\'s challenges under unalterable biblical truths.'}
                  </p>
                </div>

                {/* Ministry 4 */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-[#28166f]/10 text-[#28166f] rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-black text-gray-950 text-base uppercase tracking-tight">{language === 'pt' ? 'Famílias & Casais' : 'Couples & Families'}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === 'pt'
                      ? 'Reuniões de casais e acampamentos direcionados a firmar e restaurar lares e casamentos sobre a rocha do evangelho.'
                      : 'Couples meetups and retreats directed toward grounding and restoring homes and marriages on the rock of the gospel.'}
                  </p>
                </div>

                {/* Ministry 5 */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 bg-[#28166f]/10 text-[#28166f] rounded-xl flex items-center justify-center">
                    <Coins className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-black text-gray-950 text-base uppercase tracking-tight">{language === 'pt' ? 'Ação Social & Compaixão' : 'Social Action & Mercy'}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === 'pt'
                      ? 'Nossa ação de socorro prático na comunidade norte de SP, distribuindo cestas básicas e prestando assistência a famílias vulneráveis.'
                      : 'Our practical relief work in northern SP community, distributing basic food baskets and assisting vulnerable families.'}
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. CTA BLOCK */}
      <section id="about-cta" className="py-16 md:py-20 bg-neutral-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-[-10%] w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-[-10%] w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {dict.ctaAboutTitle}
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-300 leading-relaxed">
            {dict.ctaAboutSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="cta-visit-sunday"
              onClick={() => onChangeTab('cultos')}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 text-neutral-950 rounded-xl text-sm font-bold hover:bg-amber-400 transition-all shadow shadow-amber-500/10"
            >
              {dict.ctaAboutBtnVisit}
            </button>
            <button
              id="cta-contact-pastors"
              onClick={() => onChangeTab('contato')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 text-white hover:bg-white/15 rounded-xl text-sm font-semibold border border-white/20 transition-all"
            >
              {dict.ctaAboutBtnContact}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
