import { useState, FormEvent } from 'react';
import { Send, Check, AlertCircle, Phone } from 'lucide-react';
import { Language, MessageSubject } from '../types';
import { DICTIONARY } from '../data';
import { sendMessage } from '../lib/supabase';
import churchFrontImg from '../20260823_174032 (2).png';

interface ContatoViewProps {
  language: Language;
}

export default function ContatoView({ language }: ContatoViewProps) {
  const dict = DICTIONARY[language];

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState<MessageSubject>('info');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form submit handler
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage(
        language === 'pt'
          ? 'Por favor, preencha todos os campos obrigatórios.'
          : 'Please fill in all required fields.'
      );
      return;
    }

    setIsSending(true);

    try {
      await sendMessage({
        name,
        email,
        phone: phone.trim() || undefined,
        subject,
        message
      });

      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubject('info');
    } catch (err: any) {
      console.error('Error sending message:', err);
      setErrorMessage(
        language === 'pt'
          ? 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato pelo e-mail contato@icenvsp.com.br.'
          : 'An error occurred while sending your message. Please try again or contact us at contato@icenvsp.com.br.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="contato-view" className="animate-fade-in pt-20 bg-background text-on-surface min-h-screen">
      {/* Hero Map Section */}
      <section id="contato-map-section" className="relative w-full h-[400px] sm:h-[450px] overflow-hidden border-b-4 border-primary">
        <iframe
          title="Localização da Igreja Cristã Evangélica Nova Vida no Google Maps"
          src="https://maps.google.com/maps?q=Rua+Lu%C3%ADs+Ant%C3%B4nio+dos+Santos%2C+54+-+Santa+Teresinha%2C+S%C3%A3o+Paulo+-+SP%2C+02460-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
      <section id="contato-content-section" className="pb-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-container-max mx-auto space-y-16">
          {/* Form & Image Section */}
          <div id="contato-form-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Context Image */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-outline-variant shadow-lg group">
                <img
                  src={churchFrontImg}
                  alt="Fachada da Igreja"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
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
                    ? 'Agendamentos para atendimento pastoral individual ou familiar podem ser solicitados através do formulário.'
                    : 'Appointments for individual or family pastoral counseling can be requested through this form.'}
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
                <form id="contato-form" onSubmit={handleFormSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5 animate-in fade-in duration-200">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                        {language === 'pt' ? 'Seu Nome Completo *' : 'Your Full Name *'}
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
                        {language === 'pt' ? 'Seu E-mail *' : 'Your Email Address *'}
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

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-2 flex items-center justify-between">
                        <span>{language === 'pt' ? 'WhatsApp / Telefone' : 'WhatsApp / Phone'}</span>
                        <span className="text-[10px] text-gray-400 font-normal lowercase tracking-normal">
                          {language === 'pt' ? '(opcional)' : '(optional)'}
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                      {language === 'pt' ? 'Assunto *' : 'Subject *'}
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value as MessageSubject)}
                      className="w-full px-4 py-3 bg-surface-alt border border-outline rounded-xl focus:border-primary outline-none text-sm cursor-pointer text-on-surface"
                    >
                      <option value="info">{language === 'pt' ? 'Informações Gerais' : 'General Information'}</option>
                      <option value="prayer">{language === 'pt' ? 'Pedido de Oração' : 'Prayer Request'}</option>
                      <option value="pastoral">{language === 'pt' ? 'Aconselhamento Pastoral' : 'Pastoral Counseling'}</option>
                      <option value="admin">{language === 'pt' ? 'Secretaria / Administração' : 'Secretary / Admin'}</option>
                      <option value="ministries">{language === 'pt' ? 'Dúvidas sobre Ministérios' : 'Ministry Inquiries'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-2">
                      {language === 'pt' ? 'Sua Mensagem *' : 'Your Message *'}
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
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{language === 'pt' ? 'Enviando mensagem...' : 'Sending message...'}</span>
                      </span>
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
