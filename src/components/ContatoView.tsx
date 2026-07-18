import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Check, Youtube, Facebook, Instagram, Share2, Compass, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface ContatoViewProps {
  language: Language;
}

export default function ContatoView({ language }: ContatoViewProps) {
  const dict = DICTIONARY[language];

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('info');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form submit handler
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setIsSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setSubject('info');
      }, 1500);
    }
  };

  return (
    <div id="contato-view" className="animate-fade-in pt-24">
      {/* 1. HERO BANNER */}
      <section
        id="contato-hero"
        className="relative bg-neutral-900 text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,15,15,0.85), rgba(15,15,15,0.6)), url("https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-block text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-3">
            {language === 'pt' ? 'Atendimento & Diálogo' : 'Assistance & Dialogue'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white">
            {dict.contactHeroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200">
            {dict.contactHeroSub}
          </p>
        </div>
      </section>

      {/* 2. SPLIT CONTACT & DETAILS COLUMNS */}
      <section id="contato-main" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Form submission */}
            <div className="lg:col-span-7 bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
              <h3 className="font-sans font-extrabold text-xl text-gray-950 mb-6">
                {dict.contactFormTitle}
              </h3>

              {isSuccess ? (
                /* Success Prompt Visual Container */
                <div id="form-success-box" className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-sans font-bold text-lg text-emerald-950">
                      {dict.formSuccessTitle}
                    </h4>
                    <p className="text-sm text-emerald-850 leading-relaxed max-w-sm mx-auto">
                      {dict.formSuccessDesc}
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      id="reset-success-form"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                    >
                      {language === 'pt' ? 'Enviar nova mensagem' : 'Send another message'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Inputs */
                <form id="contact-message-form" onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        {dict.formName}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samuel Silva"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                        {dict.formEmail}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. samuel@gmail.com"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                      {dict.formSubject}
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm cursor-pointer"
                    >
                      <option value="info">{dict.formSubjectOption1}</option>
                      <option value="prayer">{dict.formSubjectOption2}</option>
                      <option value="counseling">{dict.formSubjectOption3}</option>
                      <option value="ministry">{dict.formSubjectOption4}</option>
                    </select>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                      {dict.formMessage}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button with dynamic loading indicators */}
                  <div className="pt-2">
                    <button
                      id="contact-form-submit"
                      type="submit"
                      disabled={isSending}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow shadow-amber-500/10 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSending ? (
                        <>
                          <div className="h-4 w-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                          <span>{dict.formSendingBtn}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>{dict.formSendBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Contact info details */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Box 1: Info Cards */}
              <div id="contact-info-cards" className="space-y-6">
                <h3 className="font-sans font-extrabold text-xl text-gray-950">
                  {dict.contactInfoTitle}
                </h3>
                <div className="h-1 w-12 bg-amber-500 rounded" />

                <div className="space-y-5 text-sm">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-gray-900 mb-0.5">
                        {language === 'pt' ? 'Endereço' : 'Address'}
                      </h4>
                      <p className="text-gray-500 leading-relaxed">
                        {dict.contactAddress}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-gray-900 mb-0.5">
                        {language === 'pt' ? 'Telefone' : 'Phone'}
                      </h4>
                      <a href="tel:1132840000" className="text-gray-500 hover:text-amber-700 transition-colors">
                        {dict.contactPhone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-gray-900 mb-0.5">
                        {language === 'pt' ? 'E-mail Principal' : 'Primary Email'}
                      </h4>
                      <a href="mailto:contato@igrejacristanovavida.org.br" className="text-gray-500 hover:text-amber-700 transition-colors break-all">
                        {dict.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Social Media */}
              <div id="contact-social-media" className="pt-6 border-t border-gray-100 space-y-3">
                <h4 className="font-sans font-bold text-sm text-gray-900">
                  {dict.socialFollow}
                </h4>
                <div className="flex gap-3">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-xl border border-gray-100 hover:border-red-100 transition-all"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-500 rounded-xl border border-gray-100 hover:border-blue-100 transition-all"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-50 hover:bg-pink-50 text-gray-500 hover:text-pink-500 rounded-xl border border-gray-100 hover:border-pink-100 transition-all"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Box 3: Sunday Visit prompt */}
              <div id="contact-sunday-visit-card" className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100/50 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 uppercase tracking-widest">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>{dict.visitUsHeader}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {dict.visitUsSundayDetail}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MAP SECTION */}
      <section id="contato-map" className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="font-sans font-extrabold text-2xl text-gray-950">
              {dict.mapTitle}
            </h3>
            <p className="text-sm text-gray-500">
              {language === 'pt' ? 'Venha cultuar conosco neste domingo' : 'Come worship with us this Sunday'}
            </p>
            <div className="h-1 w-12 bg-amber-500 rounded mx-auto" />
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative min-h-[400px]">
            {/* Map Grid Pattern representation */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#007cc3_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Streets mock map paths */}
              <svg className="w-full h-full text-gray-200 absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                <line x1="15%" y1="0" x2="15%" y2="100%" stroke="currentColor" strokeWidth="6" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="10" />
                <line x1="85%" y1="0" x2="85%" y2="100%" stroke="currentColor" strokeWidth="6" />
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="12" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="currentColor" strokeWidth="6" />
              </svg>

              {/* Detailed Church Pin Element */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="animate-bounce bg-[#007cc3] text-white p-4 rounded-full shadow-2xl relative border-4 border-white">
                  <Compass className="h-7 w-7 text-white" />
                  <div className="absolute -inset-2 rounded-full bg-[#007cc3]/20 animate-ping" />
                </div>
                
                <div className="mt-3 bg-neutral-900 border border-neutral-800 text-white p-4 rounded-2xl shadow-xl max-w-xs text-center">
                  <h4 className="font-sans font-black text-xs block text-[#007cc3]">
                    Igreja Cristã Evangélica Nova Vida
                  </h4>
                  <p className="text-[10px] text-gray-300 font-mono mt-1 block">
                    Rua Luis Antônio dos Santos, 54 — Santa Teresinha, SP
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-neutral-800">
                    {language === 'pt' ? 'Estacionamento próprio e gratuito no local' : 'Free private parking on-site'}
                  </p>
                </div>
              </div>

              {/* Local Area Landmarks annotations */}
              <div className="absolute top-1/4 left-[15%] text-gray-400 text-[10px] sm:text-xs font-mono">
                Rua Voluntários da Pátria
              </div>
              <div className="absolute bottom-1/4 right-[20%] text-gray-400 text-[10px] sm:text-xs font-mono">
                Av. Eng. Caetano Álvares
              </div>
              <div className="absolute top-[65%] right-[35%] text-gray-500 text-[10px] sm:text-xs font-mono">
                Metrô Santana (Linha 1)
              </div>
              <div className="absolute top-1/3 right-[15%] text-gray-300 text-[10px] sm:text-xs font-mono">
                Cons. Moreira de Barros
              </div>
              <div className="absolute bottom-1/3 left-[10%] text-gray-300 text-[10px] sm:text-xs font-mono">
                Alameda Afonso Schmidt
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
