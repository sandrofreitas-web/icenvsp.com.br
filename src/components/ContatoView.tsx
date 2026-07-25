import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Check, Youtube, Facebook, Instagram, Share2, Compass, Building, Landmark, PhoneCall } from 'lucide-react';
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
      }, 1200);
    }
  };

  return (
    <div id="contato-view" className="animate-fade-in pt-20 bg-background text-on-surface min-h-screen">
      {/* Hero Map Section */}
      <section className="relative w-full h-[400px] sm:h-[450px] overflow-hidden border-b-4 border-primary">
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58509.3094038165!2d-46.68065054179688!3d-23.57448839999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a688975765%3A0x6b4047b1988ef11b!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
          className="w-full h-full border-none"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-background text-center relative z-20 -mt-16">
        <div className="max-w-container-max mx-auto bg-white p-8 sm:p-12 shadow-sm border border-outline-variant/50 rounded-3xl">
          <span className="text-primary font-mono text-xs uppercase tracking-widest font-bold mb-3 block">
            {language === 'pt' ? 'DESDE 1912' : 'SINCE 1912'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-primary font-bold italic mb-4">
            {dict.contactHeroTitle}
          </h1>
          <div className="w-20 h-0.5 bg-primary mx-auto my-6" />
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {dict.contactHeroSub}
          </p>
        </div>
      </section>

      {/* Traditional Layout: Details & Form */}
      <section className="pb-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-container-max mx-auto space-y-16">
          {/* Contact Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center border-b border-outline-variant/40 pb-16">
            <div className="space-y-4 p-6 bg-white rounded-2xl border border-surface-tint shadow-sm">
              <Building className="h-10 w-10 text-primary mx-auto" />
              <h3 className="font-display text-xl font-bold text-on-surface">
                {language === 'pt' ? 'Sede Administrativa' : 'Administrative Headquarters'}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Rua Luis Antônio dos Santos, 54<br />
                Santana, São Paulo - SP
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white rounded-2xl border border-surface-tint shadow-sm">
              <PhoneCall className="h-10 w-10 text-primary mx-auto" />
              <h3 className="font-display text-xl font-bold text-on-surface">
                {language === 'pt' ? 'Secretaria Geral' : 'General Office'}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                +55 (11) 2977-8899<br />
                {language === 'pt' ? 'Segunda a Sexta, 09h às 18h' : 'Monday to Friday, 9am to 6pm'}
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white rounded-2xl border border-surface-tint shadow-sm">
              <Landmark className="h-10 w-10 text-primary mx-auto" />
              <h3 className="font-display text-xl font-bold text-on-surface">
                {language === 'pt' ? 'Chancelaria' : 'Chancellery'}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                contato@icenvsp.org.br<br />
                expediente@icenvsp.org.br
              </p>
            </div>
          </div>

          {/* Form & Image Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Context Image */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-outline-variant shadow-lg group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC23L17Q5rdxvbiuOwrNuimDvoCVaqEykFn2PceuxUZ9c9uCG1hSc9QKAKOTvB7ZjzuTEnsHZGbui9VXQVo5InEV3inkDrVyQy2uU2IHS6QPCVHa0M9J2oCyxMjE8BY6L3ZD-KZagoxbWIt_Bu7YQ9gBUoE9hvUPt2Y5R_GVD6qEhZwVUNuuxKNpojoVEiNRaeLfQm5rIuPrtd4vla60Qh7bGUp2_wtgeSOUcWhvMLje9tPaULiTv_sOEXfGcF0XatOXF1rMCzK5Ek"
                  alt="Igreja Histórica"
                  className="w-full h-80 object-cover sepia-effect group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-primary/90 text-white text-xs uppercase tracking-widest font-mono text-center">
                  {language === 'pt' ? 'Fachada Histórica — Preservando Valores' : 'Historic Facade — Preserving Values'}
                </div>
              </div>

              <div className="p-6 bg-surface-alt rounded-2xl border border-outline-variant/30 space-y-3">
                <h4 className="font-display font-bold text-base text-on-surface">
                  {language === 'pt' ? 'Atendimento Pastoral' : 'Pastoral Care'}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed">
                  {language === 'pt'
                    ? 'Agendamentos para atendimento pastoral individual ou familiar podem ser solicitados através do formulário ou diretamente na secretaria.'
                    : 'Appointments for individual or family pastoral counseling can be requested through this form or at the office.'}
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7 bg-white border border-outline-variant/50 rounded-3xl p-8 sm:p-10 shadow-sm">
              <h3 className="font-display font-extrabold text-2xl text-on-surface mb-6">
                {dict.contactFormTitle}
              </h3>

              {isSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="h-14 w-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-7 w-7" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-emerald-950">
                    {dict.formSuccessTitle}
                  </h4>
                  <p className="text-sm text-emerald-800 max-w-sm mx-auto leading-relaxed">
                    {dict.formSuccessDesc}
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                  >
                    {language === 'pt' ? 'Enviar nova mensagem' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                        {language === 'pt' ? 'Seu Nome Completo' : 'Your Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: João Silva"
                        className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                        {language === 'pt' ? 'Seu E-mail' : 'Your Email Address'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="joao@exemplo.com"
                        className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                      {language === 'pt' ? 'Assunto' : 'Subject'}
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm cursor-pointer text-on-surface"
                    >
                      <option value="info">{language === 'pt' ? 'Informações Gerais' : 'General Information'}</option>
                      <option value="prayer">{language === 'pt' ? 'Pedido de Oração' : 'Prayer Request'}</option>
                      <option value="pastoral">{language === 'pt' ? 'Aconselhamento Pastoral' : 'Pastoral Counseling'}</option>
                      <option value="admin">{language === 'pt' ? 'Secretaria / Administração' : 'Secretary / Admin'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                      {language === 'pt' ? 'Sua Mensagem' : 'Your Message'}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={language === 'pt' ? 'Escreva sua mensagem aqui...' : 'Write your message here...'}
                      className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow cursor-pointer disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>{language === 'pt' ? 'Enviando...' : 'Sending...'}</span>
                    ) : (
                      <>
                        <span>{language === 'pt' ? 'Enviar Mensagem' : 'Send Message'}</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
