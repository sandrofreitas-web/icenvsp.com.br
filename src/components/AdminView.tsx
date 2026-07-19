import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, Eye, EyeOff, LayoutDashboard, Calendar, Video, 
  Clock, Plus, Trash2, Edit2, LogOut, CheckCircle, AlertTriangle, 
  Database, RefreshCw, X, Save, ArrowLeft, Globe, ArrowUpRight, Upload
} from 'lucide-react';
import { Language, Sermon, ChurchEvent } from '../types';
import { 
  supabase, 
  isSupabaseConfigured, 
  getSermons, 
  saveSermon, 
  deleteSermon,
  getEvents,
  saveEvent,
  deleteEvent,
  getWeeklySchedules,
  saveWeeklySchedule,
  deleteWeeklySchedule,
  WeeklySchedule,
  uploadImage
} from '../lib/supabase';

interface AdminViewProps {
  language: Language;
}

type AdminSubTab = 'sermons' | 'events' | 'schedules';

export default function AdminView({ language }: AdminViewProps) {
  // Session & Auth state
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin Sub-Tab
  const [subTab, setSubTab] = useState<AdminSubTab>('sermons');

  // Database Data States
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [schedules, setSchedules] = useState<WeeklySchedule[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // holds action id during save/delete

  // Editing/Creating Modals States
  const [activeModal, setActiveModal] = useState<'sermon' | 'event' | 'schedule' | null>(null);
  const [editSermon, setEditSermon] = useState<Partial<Sermon> | null>(null);
  const [editEvent, setEditEvent] = useState<Partial<ChurchEvent> | null>(null);
  const [editSchedule, setEditSchedule] = useState<Partial<WeeklySchedule> | null>(null);

  // Status message state
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Image Uploading States
  const [uploadingSermonImage, setUploadingSermonImage] = useState(false);
  const [uploadingEventImage, setUploadingEventImage] = useState(false);

  // Image Upload Handlers
  const handleSermonImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSermonImage(true);
    try {
      const url = await uploadImage(file, 'sermons');
      setEditSermon((prev) => ({ ...prev, image: url }));
      triggerToast('success', 'Imagem da capa carregada com sucesso!');
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha no upload: ${err.message || err}`);
    } finally {
      setUploadingSermonImage(false);
    }
  };

  const handleEventImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingEventImage(true);
    try {
      const url = await uploadImage(file, 'events');
      setEditEvent((prev) => ({ ...prev, image: url }));
      triggerToast('success', 'Imagem de divulgação carregada com sucesso!');
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha no upload: ${err.message || err}`);
    } finally {
      setUploadingEventImage(false);
    }
  };

  // Load Auth Session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Database tables when authenticated or subtab changes
  useEffect(() => {
    if (session) {
      fetchCurrentTab();
    }
  }, [session, subTab]);

  const fetchCurrentTab = async () => {
    setLoadingData(true);
    try {
      if (subTab === 'sermons') {
        const data = await getSermons();
        setSermons(data);
      } else if (subTab === 'events') {
        const data = await getEvents();
        setEvents(data);
      } else if (subTab === 'schedules') {
        const data = await getWeeklySchedules();
        setSchedules(data);
      }
    } catch (err: any) {
      console.error(err);
      triggerToast('error', 'Erro ao buscar dados do Supabase. Verifique a tabela e RLS.');
    } finally {
      setLoadingData(false);
    }
  };

  const triggerToast = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Auth Submit Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setAuthLoading(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      setSession(data.session);
      triggerToast('success', 'Conectado com sucesso!');
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Erro de autenticação. Verifique os dados.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
      setSession(null);
      triggerToast('success', 'Sessão encerrada.');
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // SERMON OPERATIONS
  // ==========================================
  const handleOpenSermonModal = (sermon: Sermon | null = null) => {
    if (sermon) {
      setEditSermon({ ...sermon });
    } else {
      setEditSermon({
        title: { pt: '', en: '' },
        series: { pt: '', en: '' },
        preacher: { pt: '', en: '' },
        date: new Date().toISOString().split('T')[0],
        theme: { pt: '', en: '' },
        duration: '',
        videoUrl: '',
        image: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=600&q=80',
        verse: ''
      });
    }
    setActiveModal('sermon');
  };

  const handleSaveSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSermon || !editSermon.title?.pt || !editSermon.series?.pt || !editSermon.preacher?.pt) {
      triggerToast('error', 'Preencha os campos obrigatórios (Título, Série e Pregador em Português).');
      return;
    }

    setActionLoading('save_sermon');
    try {
      const saved = await saveSermon(editSermon as Sermon);
      if (saved) {
        triggerToast('success', 'Sermão salvo com sucesso no banco de dados!');
        setActiveModal(null);
        setEditSermon(null);
        fetchCurrentTab();
      }
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha ao salvar: ${err.message || err}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteSermon = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir permanentemente este sermão?')) return;
    setActionLoading(`delete_${id}`);
    try {
      await deleteSermon(id);
      triggerToast('success', 'Sermão excluído.');
      fetchCurrentTab();
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha ao excluir: ${err.message || err}`);
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // EVENT OPERATIONS
  // ==========================================
  const handleOpenEventModal = (event: ChurchEvent | null = null) => {
    if (event) {
      setEditEvent({ ...event });
    } else {
      setEditEvent({
        day: '',
        month: { pt: '', en: '' },
        year: String(new Date().getFullYear()),
        title: { pt: '', en: '' },
        description: { pt: '', en: '' },
        time: '',
        location: { pt: '', en: '' },
        category: 'proximos',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80'
      });
    }
    setActiveModal('event');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvent || !editEvent.title?.pt || !editEvent.day || !editEvent.month?.pt || !editEvent.time || !editEvent.location?.pt) {
      triggerToast('error', 'Preencha os campos obrigatórios (Dia, Mês, Título, Hora e Local em Português).');
      return;
    }

    setActionLoading('save_event');
    try {
      const saved = await saveEvent(editEvent as ChurchEvent);
      if (saved) {
        triggerToast('success', 'Evento salvo com sucesso!');
        setActiveModal(null);
        setEditEvent(null);
        fetchCurrentTab();
      }
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha ao salvar: ${err.message || err}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este evento?')) return;
    setActionLoading(`delete_${id}`);
    try {
      await deleteEvent(id);
      triggerToast('success', 'Evento deletado.');
      fetchCurrentTab();
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha ao deletar: ${err.message || err}`);
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // SCHEDULE/SERVICES OPERATIONS
  // ==========================================
  const handleOpenScheduleModal = (schedule: WeeklySchedule | null = null) => {
    if (schedule) {
      setEditSchedule({ ...schedule });
    } else {
      setEditSchedule({
        day_time: { pt: '', en: '' },
        title: { pt: '', en: '' },
        description: { pt: '', en: '' },
        sort_order: schedules.length + 1
      });
    }
    setActiveModal('schedule');
  };

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSchedule || !editSchedule.day_time?.pt || !editSchedule.title?.pt) {
      triggerToast('error', 'Preencha o Dia/Horário e o Título em Português.');
      return;
    }

    setActionLoading('save_schedule');
    try {
      const saved = await saveWeeklySchedule(editSchedule as WeeklySchedule);
      if (saved) {
        triggerToast('success', 'Culto/Programação atualizada no banco de dados!');
        setActiveModal(null);
        setEditSchedule(null);
        fetchCurrentTab();
      }
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha ao salvar: ${err.message || err}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!window.confirm('Excluir este culto da programação semanal do site?')) return;
    setActionLoading(`delete_${id}`);
    try {
      await deleteWeeklySchedule(id);
      triggerToast('success', 'Culto excluído.');
      fetchCurrentTab();
    } catch (err: any) {
      console.error(err);
      triggerToast('error', `Falha ao excluir: ${err.message || err}`);
    } finally {
      setActionLoading(null);
    }
  };


  // Loading placeholder
  if (loadingSession) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-8 w-8 text-[#28166f] animate-spin mb-3" />
          <span className="text-gray-500 font-mono text-sm">Carregando painel...</span>
        </div>
      </div>
    );
  }

  // DIAGNOSTIC SCREEN: If Supabase is not configured yet
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-slate-50 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mt-6">
          <div className="bg-gradient-to-r from-[#28166f] to-[#007cc3] p-6 text-white flex items-center space-x-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <Database className="h-8 w-8 text-amber-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight">Supabase não Configurado</h1>
              <p className="text-sm text-neutral-200 mt-0.5">Prepare seu projeto para Hostinger & Supabase</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start space-x-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 text-sm">Sua aplicação está pronta para o Banco de Dados!</h3>
                <p className="text-xs text-amber-800 mt-1">
                  O código foi estruturado para ler de forma dinâmica e possui fallback automático. Agora, basta conectar o Supabase e adicionar as credenciais nas variáveis de ambiente na Hostinger ou localmente.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-gray-900 text-base flex items-center">
                <span className="bg-[#28166f]/15 text-[#28166f] h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2 font-mono">1</span>
                Passo 1: Criar Tabelas no Supabase
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed pl-8">
                Abra o seu painel do Supabase, crie um projeto e acesse o menu <strong>SQL Editor</strong>. Copie o script completo que preparamos para você no arquivo <strong className="text-gray-800">/schema.sql</strong> localizado na raiz deste projeto e execute-o. Ele criará as tabelas de <code>sermons</code>, <code>events</code>, e <code>schedules</code> já configurando a segurança.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-gray-900 text-base flex items-center">
                <span className="bg-[#28166f]/15 text-[#28166f] h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2 font-mono">2</span>
                Passo 2: Configurar Variáveis de Ambiente
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed pl-8">
                Copie os valores do Supabase (<strong>Project URL</strong> e <strong>Anon Key</strong>) e configure no seu servidor ou no painel da Hostinger como variáveis de ambiente:
              </p>
              <div className="bg-neutral-900 text-gray-300 font-mono text-xs p-4 rounded-xl overflow-x-auto pl-8">
                <p className="text-amber-400"># Variáveis exigidas pelo Vite (com prefixo VITE_)</p>
                <p className="mt-1">VITE_SUPABASE_URL=<span className="text-[#007cc3]">"https://sua-url-aqui.supabase.co"</span></p>
                <p>VITE_SUPABASE_ANON_KEY=<span className="text-[#007cc3]">"seu-token-anonimo-key-aqui"</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-bold text-gray-900 text-base flex items-center">
                <span className="bg-[#28166f]/15 text-[#28166f] h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2 font-mono">3</span>
                Passo 3: Criar um Usuário Administrador
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed pl-8">
                No painel do Supabase, vá em <strong>Authentication &gt; Users</strong>, clique em <strong>Add User &gt; Create User</strong>. Adicione o email e senha do administrador da igreja. Este usuário será usado para logar neste Painel Administrativo.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-[11px] text-gray-400">
                A aplicação continuará funcionando com os dados locais salvos em <code>src/data.ts</code> até ser configurada.
              </div>
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-4 py-2 bg-[#28166f] hover:bg-[#28166f]/90 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                <span>Acessar Supabase</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTH FORM: Show if session is null
  if (!session) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#28166f] p-6 text-white text-center">
            <Lock className="h-8 w-8 text-amber-400 mx-auto mb-2" />
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
            <p className="text-xs text-neutral-300 mt-1">Conecte-se com sua conta da ICE Nova Vida</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4">
            {authError && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100 flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@icenovavida.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28166f] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28166f] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#28166f] hover:bg-[#28166f]/90 text-white py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md shadow-[#28166f]/10 cursor-pointer flex items-center justify-center space-x-2"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Entrar no Painel</span>
              )}
            </button>

            <div className="text-[11px] text-gray-400 text-center leading-relaxed mt-4">
              Tip: Cadastre os usuários administradores na aba Authentication &gt; Users no painel do Supabase.
            </div>
          </form>
        </div>
      </div>
    );
  }

  // FULL ADMIN DASHBOARD VIEW
  return (
    <div className="min-h-screen pt-28 pb-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Status Toast Notification */}
        {statusMessage && (
          <div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4.5 py-3 rounded-xl shadow-2xl border text-sm font-medium animate-fade-in ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
              : 'bg-red-50 border-red-100 text-red-800'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Header Block */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="bg-[#28166f]/10 p-3 rounded-xl">
              <LayoutDashboard className="h-7 w-7 text-[#28166f]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-sans text-gray-900 leading-tight">Painel Administrativo</h1>
              <p className="text-xs text-gray-500 mt-0.5">ICE Nova Vida · São Paulo Est. 1912</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <div className="hidden sm:flex flex-col text-right text-xs mr-2">
              <span className="font-semibold text-gray-800">{session.user.email}</span>
              <span className="text-[10px] text-emerald-600 font-mono font-bold uppercase">● Conectado Supabase</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-700 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1.5"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Encerrar Sessão</span>
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center space-x-2 bg-white border border-gray-100 p-1.5 rounded-xl shadow-sm mb-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSubTab('sermons')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              subTab === 'sermons'
                ? 'bg-[#28166f] text-white'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Video className="h-4 w-4" />
            <span>Sermões</span>
          </button>
          <button
            onClick={() => setSubTab('events')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              subTab === 'events'
                ? 'bg-[#28166f] text-white'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Eventos</span>
          </button>
          <button
            onClick={() => setSubTab('schedules')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              subTab === 'schedules'
                ? 'bg-[#28166f] text-white'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Cultos / Agenda</span>
          </button>
        </div>

        {/* Main Database Table & Operations Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
          {/* Section Header Controls */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-base font-bold text-gray-900 font-sans uppercase tracking-tight">
                {subTab === 'sermons' && 'Gerenciador de Sermões'}
                {subTab === 'events' && 'Gerenciador de Eventos'}
                {subTab === 'schedules' && 'Gerenciador da Programação Semanal'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {subTab === 'sermons' && 'Publique novos sermões ou gerencie as gravações bíblicas existentes.'}
                {subTab === 'events' && 'Organize congressos, ações e reuniões de ministério.'}
                {subTab === 'schedules' && 'Defina os horários e descrições dos cultos da semana.'}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={fetchCurrentTab}
                disabled={loadingData}
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-all cursor-pointer"
                title="Recarregar dados"
              >
                <RefreshCw className={`h-4 w-4 ${loadingData ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => {
                  if (subTab === 'sermons') handleOpenSermonModal();
                  else if (subTab === 'events') handleOpenEventModal();
                  else if (subTab === 'schedules') handleOpenScheduleModal();
                }}
                className="bg-[#007cc3] hover:bg-[#007cc3]/90 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar</span>
              </button>
            </div>
          </div>

          {/* Loading Indicator */}
          {loadingData ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <RefreshCw className="h-8 w-8 text-[#007cc3] animate-spin mb-3" />
              <span className="text-xs text-gray-400 font-mono">Sincronizando com Supabase...</span>
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              
              {/* ==================== SERMONS LIST ==================== */}
              {subTab === 'sermons' && (
                sermons.length === 0 ? (
                  <div className="text-center py-16">
                    <Video className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-700">Nenhum sermão cadastrado</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">Crie seu primeiro sermão no banco do Supabase clicando em Adicionar.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-wider border-b border-gray-100">
                          <th className="p-4">Capa</th>
                          <th className="p-4">Título / Série</th>
                          <th className="p-4">Pregador</th>
                          <th className="p-4">Data</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {sermons.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <img src={s.image} alt="" className="h-10 w-16 object-cover rounded-md border" />
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-gray-900 leading-tight">{s.title.pt}</div>
                              <div className="text-xs text-[#007cc3] font-medium mt-0.5">{s.series.pt}</div>
                            </td>
                            <td className="p-4 text-gray-600 font-medium">{s.preacher.pt}</td>
                            <td className="p-4 text-xs font-mono text-gray-500">{s.date}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                <button
                                  onClick={() => handleOpenSermonModal(s)}
                                  className="p-2 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg transition-colors cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSermon(s.id)}
                                  disabled={actionLoading === `delete_${s.id}`}
                                  className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                                  title="Deletar"
                                >
                                  {actionLoading === `delete_${s.id}` ? (
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}

              {/* ==================== EVENTS LIST ==================== */}
              {subTab === 'events' && (
                events.length === 0 ? (
                  <div className="text-center py-16">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-700">Nenhum evento cadastrado</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">Insira congressos, palestras e cultos especiais clicando no botão Adicionar.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-wider border-b border-gray-100">
                          <th className="p-4">Data</th>
                          <th className="p-4">Título</th>
                          <th className="p-4">Categoria</th>
                          <th className="p-4">Local / Hora</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {events.map((e) => (
                          <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <div className="flex flex-col items-center justify-center bg-[#28166f]/5 text-[#28166f] rounded-lg h-11 w-11 shrink-0">
                                <span className="text-base font-black leading-none">{e.day}</span>
                                <span className="text-[8px] font-bold font-mono tracking-wider mt-0.5">{e.month.pt}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-gray-900 leading-tight">{e.title.pt}</div>
                              <div className="text-xs text-gray-500 line-clamp-1 max-w-xs mt-0.5">{e.description?.pt}</div>
                            </td>
                            <td className="p-4">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-100">
                                {e.category}
                              </span>
                            </td>
                            <td className="p-4 text-xs text-gray-600">
                              <div>{e.location.pt}</div>
                              <div className="font-mono mt-0.5 text-gray-400">{e.time}</div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                <button
                                  onClick={() => handleOpenEventModal(e)}
                                  className="p-2 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg transition-colors cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(e.id)}
                                  disabled={actionLoading === `delete_${e.id}`}
                                  className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                                  title="Excluir"
                                >
                                  {actionLoading === `delete_${e.id}` ? (
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}

              {/* ==================== SCHEDULES LIST ==================== */}
              {subTab === 'schedules' && (
                schedules.length === 0 ? (
                  <div className="text-center py-16">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-700">Nenhum culto cadastrado</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">Insira os horários da Escola Bíblica Dominical e cultos semanais.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-gray-500 text-[10px] font-mono font-bold uppercase tracking-wider border-b border-gray-100">
                          <th className="p-4">Ordem</th>
                          <th className="p-4">Dia & Horário</th>
                          <th className="p-4">Título</th>
                          <th className="p-4">Descrição</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {schedules.map((sch) => (
                          <tr key={sch.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono font-bold text-gray-400">{sch.sort_order}</td>
                            <td className="p-4 font-bold text-amber-800">{sch.day_time.pt}</td>
                            <td className="p-4 font-semibold text-gray-800">{sch.title.pt}</td>
                            <td className="p-4 text-xs text-gray-500 max-w-xs">{sch.description.pt}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                <button
                                  onClick={() => handleOpenScheduleModal(sch)}
                                  className="p-2 hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg transition-colors cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSchedule(sch.id)}
                                  disabled={actionLoading === `delete_${sch.id}`}
                                  className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                                  title="Excluir"
                                >
                                  {actionLoading === `delete_${sch.id}` ? (
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}

            </div>
          )}
        </div>

      </div>

      {/* =======================================================
          MODAL: SERMON FORM (CREATE / EDIT)
          ======================================================= */}
      {activeModal === 'sermon' && editSermon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#28166f] p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-lg font-sans">
                  {editSermon.id ? 'Editar Sermão' : 'Cadastrar Novo Sermão'}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSermon} className="p-6 space-y-4 overflow-y-auto">
              
              {/* Bilingual Toggle hint */}
              <div className="flex items-center space-x-1.5 text-xs text-blue-600 font-semibold bg-blue-50 p-2.5 rounded-lg">
                <Globe className="h-4 w-4 shrink-0" />
                <span>Opcional: Preencha a versão em Inglês (English) para suporte bilingue completo.</span>
              </div>

              {/* Title Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Título (Português) *</label>
                  <input
                    type="text"
                    required
                    value={editSermon.title?.pt || ''}
                    onChange={(e) => setEditSermon({
                      ...editSermon,
                      title: { ...editSermon.title, pt: e.target.value } as any
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Ex: A Suficiência das Escrituras"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={editSermon.title?.en || ''}
                    onChange={(e) => setEditSermon({
                      ...editSermon,
                      title: { ...editSermon.title, en: e.target.value } as any
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Ex: The Sufficiency of Scripture"
                  />
                </div>
              </div>

              {/* Series & Preacher */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Série (Português) *</label>
                  <input
                    type="text"
                    required
                    value={editSermon.series?.pt || ''}
                    onChange={(e) => setEditSermon({
                      ...editSermon,
                      series: { ...editSermon.series, pt: e.target.value } as any
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Ex: Sola Scriptura"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pregador *</label>
                  <input
                    type="text"
                    required
                    value={editSermon.preacher?.pt || ''}
                    onChange={(e) => setEditSermon({
                      ...editSermon,
                      preacher: { pt: e.target.value, en: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Ex: Rev. Marcos S. Oliveira"
                  />
                </div>
              </div>

              {/* Date & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Data *</label>
                  <input
                    type="date"
                    required
                    value={editSermon.date || ''}
                    onChange={(e) => setEditSermon({ ...editSermon, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Duração</label>
                  <input
                    type="text"
                    value={editSermon.duration || ''}
                    onChange={(e) => setEditSermon({ ...editSermon, duration: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Ex: 40 min"
                  />
                </div>
              </div>

              {/* Verse & Theme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tema Principal (Português)</label>
                  <input
                    type="text"
                    value={editSermon.theme?.pt || ''}
                    onChange={(e) => setEditSermon({
                      ...editSermon,
                      theme: { ...editSermon.theme, pt: e.target.value } as any
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Ex: Fidelidade Bíblica"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Versículo Base</label>
                  <input
                    type="text"
                    value={editSermon.verse || ''}
                    onChange={(e) => setEditSermon({ ...editSermon, verse: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Ex: 2 Timóteo 3:16-17"
                  />
                </div>
              </div>

              {/* Video URL & Cover Image */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Link do Vídeo (YouTube)</label>
                <input
                  type="url"
                  value={editSermon.videoUrl || ''}
                  onChange={(e) => setEditSermon({ ...editSermon, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Imagem de Capa</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editSermon.image || ''}
                    onChange={(e) => setEditSermon({ ...editSermon, image: e.target.value })}
                    className="flex-grow px-3 py-2 border border-gray-250 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                    placeholder="Cole a URL ou faça upload ao lado..."
                  />
                  <label className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer transition-colors shrink-0 select-none">
                    {uploadingSermonImage ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-slate-500" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-slate-500" />
                        <span>Fazer Upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSermonImageUpload}
                      disabled={uploadingSermonImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Save / Cancel buttons */}
              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === 'save_sermon'}
                  className="px-5 py-2 bg-[#28166f] hover:bg-[#28166f]/90 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-md cursor-pointer"
                >
                  {actionLoading === 'save_sermon' ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Salvar Sermão</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL: EVENT FORM (CREATE / EDIT)
          ======================================================= */}
      {activeModal === 'event' && editEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#28166f] p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-lg font-sans">
                  {editEvent.id ? 'Editar Evento' : 'Cadastrar Novo Evento'}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 overflow-y-auto">
              
              {/* Event Date details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Dia (Número) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 18"
                    value={editEvent.day || ''}
                    onChange={(e) => setEditEvent({ ...editEvent, day: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mês (Português, 3 letras) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: AGO"
                    value={editEvent.month?.pt || ''}
                    onChange={(e) => setEditEvent({
                      ...editEvent,
                      month: { pt: e.target.value.toUpperCase(), en: e.target.value.toUpperCase() }
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ano *</label>
                  <input
                    type="text"
                    required
                    value={editEvent.year || ''}
                    onChange={(e) => setEditEvent({ ...editEvent, year: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Title Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Título (Português) *</label>
                  <input
                    type="text"
                    required
                    value={editEvent.title?.pt || ''}
                    onChange={(e) => setEditEvent({
                      ...editEvent,
                      title: { ...editEvent.title, pt: e.target.value } as any
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                    placeholder="Ex: Congresso de Famílias 2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={editEvent.title?.en || ''}
                    onChange={(e) => setEditEvent({
                      ...editEvent,
                      title: { ...editEvent.title, en: e.target.value } as any
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
                    placeholder="Ex: Family Conference 2026"
                  />
                </div>
              </div>

              {/* Category & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Categoria *</label>
                  <select
                    required
                    value={editEvent.category || 'proximos'}
                    onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none bg-white"
                  >
                    <option value="proximos">Próximos Eventos / Geral</option>
                    <option value="conferencias">Conferências / Congressos</option>
                    <option value="ministerios">Ministérios / Estudos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Horário (HH:MM) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 19:30"
                    value={editEvent.time || ''}
                    onChange={(e) => setEditEvent({ ...editEvent, time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Local (Português) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Templo Principal"
                  value={editEvent.location?.pt || ''}
                  onChange={(e) => setEditEvent({
                    ...editEvent,
                    location: { pt: e.target.value, en: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Imagem de Divulgação</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Cole a URL ou faça upload ao lado..."
                    value={editEvent.image || ''}
                    onChange={(e) => setEditEvent({ ...editEvent, image: e.target.value })}
                    className="flex-grow px-3 py-2 border border-gray-250 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007cc3]"
                  />
                  <label className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer transition-colors shrink-0 select-none">
                    {uploadingEventImage ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-slate-500" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-slate-500" />
                        <span>Fazer Upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEventImageUpload}
                      disabled={uploadingEventImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Descrição em Português</label>
                <textarea
                  rows={3}
                  value={editEvent.description?.pt || ''}
                  onChange={(e) => setEditEvent({
                    ...editEvent,
                    description: { ...editEvent.description, pt: e.target.value } as any
                  })}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                  placeholder="Explique detalhadamente o evento, preletores, preços etc."
                />
              </div>

              {/* Save / Cancel buttons */}
              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === 'save_event'}
                  className="px-5 py-2 bg-[#28166f] hover:bg-[#28166f]/90 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-md cursor-pointer"
                >
                  {actionLoading === 'save_event' ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Salvar Evento</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          MODAL: WEEKLY SCHEDULE FORM (CREATE / EDIT)
          ======================================================= */}
      {activeModal === 'schedule' && editSchedule && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#28166f] p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-lg font-sans">
                  {editSchedule.id && !isNaN(Number(editSchedule.id)) ? 'Editar Culto/Programação' : 'Cadastrar Horário Semanal'}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="p-6 space-y-4 overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Dia & Horário (Português) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Domingo, 18h00"
                    value={editSchedule.day_time?.pt || ''}
                    onChange={(e) => setEditSchedule({
                      ...editSchedule,
                      day_time: { pt: e.target.value, en: editSchedule.day_time?.en || '' }
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Day & Time (English)</label>
                  <input
                    type="text"
                    placeholder="Ex: Sunday, 6:00 PM"
                    value={editSchedule.day_time?.en || ''}
                    onChange={(e) => setEditSchedule({
                      ...editSchedule,
                      day_time: { pt: editSchedule.day_time?.pt || '', en: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Título do Culto (Português) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Culto de Adoração Principal"
                    value={editSchedule.title?.pt || ''}
                    onChange={(e) => setEditSchedule({
                      ...editSchedule,
                      title: { pt: e.target.value, en: editSchedule.title?.en || '' }
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title of Service (English)</label>
                  <input
                    type="text"
                    placeholder="Ex: Main Worship Service"
                    value={editSchedule.title?.en || ''}
                    onChange={(e) => setEditSchedule({
                      ...editSchedule,
                      title: { pt: editSchedule.title?.pt || '', en: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Ordem de Exibição (Sort Order) *</label>
                  <input
                    type="number"
                    required
                    value={editSchedule.sort_order || 1}
                    onChange={(e) => setEditSchedule({ ...editSchedule, sort_order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Descrição Breve (Português)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Culto focado em liturgia bíblica, louvor e pregação."
                  value={editSchedule.description?.pt || ''}
                  onChange={(e) => setEditSchedule({
                    ...editSchedule,
                    description: { pt: e.target.value, en: editSchedule.description?.en || '' }
                  })}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Brief Description (English)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Expository preaching and congregational worship."
                  value={editSchedule.description?.en || ''}
                  onChange={(e) => setEditSchedule({
                    ...editSchedule,
                    description: { pt: editSchedule.description?.pt || '', en: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
                />
              </div>

              {/* Save / Cancel buttons */}
              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-500 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === 'save_schedule'}
                  className="px-5 py-2 bg-[#28166f] hover:bg-[#28166f]/90 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-md cursor-pointer"
                >
                  {actionLoading === 'save_schedule' ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>Salvar Programação</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
