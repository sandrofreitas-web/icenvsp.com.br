import { createClient } from '@supabase/supabase-js';
import { Sermon, ChurchEvent, CarouselSlide, ContactMessage, MessageStatus } from '../types';
import { SERMONS, EVENTS, CAROUSEL_SLIDES } from '../data';
import { triggerNotificationEngines } from './notifications';

// Read from import.meta.env with safe typings
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Ensure safety by wrapping database operations and falling back to static data on error or if not configured

// ==========================================
// SERMONS DATABASE HELPERS
// ==========================================

export async function getSermons(): Promise<Sermon[]> {
  if (!supabase) {
    console.warn('Supabase is not configured. Using local mock/static sermons data.');
    return SERMONS;
  }

  try {
    const { data, error } = await supabase
      .from('sermons')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return SERMONS;

    // Map database fields to application types
    return data.map((item: any) => ({
      id: String(item.id),
      title: { pt: item.title_pt || '', en: item.title_en || '' },
      series: { pt: item.series_pt || '', en: item.series_en || '' },
      preacher: { pt: item.preacher_pt || '', en: item.preacher_en || '' },
      date: item.date || '',
      theme: { pt: item.theme_pt || '', en: item.theme_en || '' },
      duration: item.duration || '',
      videoUrl: item.video_url || '',
      image: item.image || 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=600&q=80',
      verse: item.verse || '',
    }));
  } catch (err) {
    console.error('Failed to fetch sermons from Supabase, falling back to local data:', err);
    return SERMONS;
  }
}

export async function saveSermon(sermon: Omit<Sermon, 'id'> & { id?: string }): Promise<Sermon | null> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const payload = {
    title_pt: sermon.title.pt,
    title_en: sermon.title.en,
    series_pt: sermon.series.pt,
    series_en: sermon.series.en,
    preacher_pt: sermon.preacher.pt,
    preacher_en: sermon.preacher.en,
    date: sermon.date,
    theme_pt: sermon.theme.pt,
    theme_en: sermon.theme.en,
    duration: sermon.duration,
    video_url: sermon.videoUrl,
    image: sermon.image,
    verse: sermon.verse,
  };

  let result;
  if (sermon.id) {
    // Update
    const { data, error } = await supabase
      .from('sermons')
      .update(payload)
      .eq('id', sermon.id)
      .select()
      .single();

    if (error) throw error;
    result = data;
  } else {
    // Insert
    const { data, error } = await supabase
      .from('sermons')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    result = data;
  }

  return {
    id: String(result.id),
    title: { pt: result.title_pt, en: result.title_en },
    series: { pt: result.series_pt, en: result.series_en },
    preacher: { pt: result.preacher_pt, en: result.preacher_en },
    date: result.date,
    theme: { pt: result.theme_pt, en: result.theme_en },
    duration: result.duration,
    videoUrl: result.video_url,
    image: result.image,
    verse: result.verse,
  };
}

export async function deleteSermon(id: string): Promise<boolean> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('sermons')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}


// ==========================================
// EVENTS DATABASE HELPERS
// ==========================================

export async function getEvents(): Promise<ChurchEvent[]> {
  if (!supabase) {
    console.warn('Supabase is not configured. Using local mock/static events data.');
    return EVENTS;
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('year', { ascending: true })
      .order('month_pt', { ascending: true })
      .order('day', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return EVENTS;

    return data.map((item: any) => ({
      id: String(item.id),
      day: item.day || '',
      month: { pt: item.month_pt || '', en: item.month_en || '' },
      year: item.year || '',
      title: { pt: item.title_pt || '', en: item.title_en || '' },
      description: { pt: item.description_pt || '', en: item.description_en || '' },
      time: item.time || '',
      location: { pt: item.location_pt || '', en: item.location_en || '' },
      category: item.category || 'proximos',
      image: item.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    }));
  } catch (err) {
    console.error('Failed to fetch events from Supabase, falling back to local data:', err);
    return EVENTS;
  }
}

export async function saveEvent(event: Omit<ChurchEvent, 'id'> & { id?: string }): Promise<ChurchEvent | null> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const payload = {
    day: event.day,
    month_pt: event.month.pt,
    month_en: event.month.en,
    year: event.year,
    title_pt: event.title.pt,
    title_en: event.title.en,
    description_pt: event.description.pt,
    description_en: event.description.en,
    time: event.time,
    location_pt: event.location.pt,
    location_en: event.location.en,
    category: event.category,
    image: event.image,
  };

  let result;
  if (event.id) {
    // Update
    const { data, error } = await supabase
      .from('events')
      .update(payload)
      .eq('id', event.id)
      .select()
      .single();

    if (error) throw error;
    result = data;
  } else {
    // Insert
    const { data, error } = await supabase
      .from('events')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    result = data;
  }

  return {
    id: String(result.id),
    day: result.day,
    month: { pt: result.month_pt, en: result.month_en },
    year: result.year,
    title: { pt: result.title_pt, en: result.title_en },
    description: { pt: result.description_pt, en: result.description_en },
    time: result.time,
    location: { pt: result.location_pt, en: result.location_en },
    category: result.category,
    image: result.image,
  };
}

export async function deleteEvent(id: string): Promise<boolean> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}


// ==========================================
// WEEKLY SCHEDULES / SERVICES HELPERS
// ==========================================

export interface WeeklySchedule {
  id: string;
  day_time: { pt: string; en: string };
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  sort_order: number;
}

export async function getWeeklySchedules(): Promise<WeeklySchedule[]> {
  const localFallback: WeeklySchedule[] = [
    {
      id: 'ebd',
      day_time: { pt: 'Domingo, 9h30', en: 'Sunday, 9:30 AM' },
      title: { pt: 'Escola Bíblica Dominical (EBD)', en: 'Sunday Bible School (EBD)' },
      description: {
        pt: 'Escola Bíblica Dominical (EBD) para todas as idades, com classes de teologia, família e vida cristã.',
        en: 'Sunday Bible School for all ages, with classes on theology, family, and Christian life.'
      },
      sort_order: 1,
    },
    {
      id: 'worship',
      day_time: { pt: 'Domingo, 18h00', en: 'Sunday, 6:00 PM' },
      title: { pt: 'Culto de Adoração Principal', en: 'Main Worship Service' },
      description: {
        pt: 'Culto de Adoração Principal. Momento solene de louvor, oração e pregação bíblica expositiva.',
        en: 'Main Worship Service. Solemn moment of praise, prayer, and expository biblical preaching.'
      },
      sort_order: 2,
    },
    {
      id: 'prayer',
      day_time: { pt: 'Terça-feira, 20h00', en: 'Tuesday, 8:00 PM' },
      title: { pt: 'Reunião de Oração e Estudo Bíblico', en: 'Prayer & Bible Study Meeting' },
      description: {
        pt: 'Reunião de Oração e Estudo Bíblico. Um momento acolhedor no meio da semana para fortalecer a fé.',
        en: 'Prayer and Bible Study Meeting. A warm mid-week gathering to strengthen faith.'
      },
      sort_order: 3,
    },
  ];

  if (!supabase) {
    return localFallback;
  }

  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return localFallback;

    return data.map((item: any) => ({
      id: String(item.id),
      day_time: { pt: item.day_time_pt || '', en: item.day_time_en || '' },
      title: { pt: item.title_pt || '', en: item.title_en || '' },
      description: { pt: item.description_pt || '', en: item.description_en || '' },
      sort_order: item.sort_order || 0,
    }));
  } catch (err) {
    console.error('Failed to fetch schedules from Supabase, falling back to local:', err);
    return localFallback;
  }
}

export async function saveWeeklySchedule(schedule: Omit<WeeklySchedule, 'id'> & { id?: string }): Promise<WeeklySchedule | null> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const payload = {
    day_time_pt: schedule.day_time.pt,
    day_time_en: schedule.day_time.en,
    title_pt: schedule.title.pt,
    title_en: schedule.title.en,
    description_pt: schedule.description.pt,
    description_en: schedule.description.en,
    sort_order: schedule.sort_order,
  };

  let result;
  if (schedule.id && !isNaN(Number(schedule.id))) {
    // Update
    const { data, error } = await supabase
      .from('schedules')
      .update(payload)
      .eq('id', schedule.id)
      .select()
      .single();

    if (error) throw error;
    result = data;
  } else {
    // Insert (if id is a non-numeric string or undefined)
    const { data, error } = await supabase
      .from('schedules')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    result = data;
  }

  return {
    id: String(result.id),
    day_time: { pt: result.day_time_pt, en: result.day_time_en },
    title: { pt: result.title_pt, en: result.title_en },
    description: { pt: result.description_pt, en: result.description_en },
    sort_order: result.sort_order,
  };
}

export async function deleteWeeklySchedule(id: string): Promise<boolean> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

// ==========================================
// CAROUSEL SLIDES DATABASE HELPERS
// ==========================================

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  if (!supabase) {
    console.warn('Supabase is not configured. Using local mock carousel slides data.');
    return CAROUSEL_SLIDES;
  }

  try {
    const { data, error } = await supabase
      .from('carousel_slides')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return CAROUSEL_SLIDES;

    return data.map((item: any) => ({
      id: String(item.id),
      tag: { pt: item.tag_pt || '', en: item.tag_en || '' },
      title: { pt: item.title_pt || '', en: item.title_en || '' },
      description: { pt: item.description_pt || '', en: item.description_en || '' },
      buttonText: { pt: item.button_text_pt || 'Saiba Mais', en: item.button_text_en || 'Learn More' },
      buttonLink: item.button_link || 'eventos',
      image: item.image || '',
      sort_order: item.sort_order || 1,
      active: item.active !== false
    }));
  } catch (err) {
    console.error('Failed to fetch carousel slides from Supabase, falling back to local data:', err);
    return CAROUSEL_SLIDES;
  }
}

export async function saveCarouselSlide(slide: Omit<CarouselSlide, 'id'> & { id?: string }): Promise<CarouselSlide | null> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const payload = {
    tag_pt: slide.tag.pt,
    tag_en: slide.tag.en,
    title_pt: slide.title.pt,
    title_en: slide.title.en,
    description_pt: slide.description.pt,
    description_en: slide.description.en,
    button_text_pt: slide.buttonText.pt,
    button_text_en: slide.buttonText.en,
    button_link: slide.buttonLink,
    image: slide.image,
    sort_order: slide.sort_order,
    active: slide.active,
  };

  let result;
  if (slide.id && !isNaN(Number(slide.id))) {
    const { data, error } = await supabase
      .from('carousel_slides')
      .update(payload)
      .eq('id', slide.id)
      .select()
      .single();

    if (error) throw error;
    result = data;
  } else {
    const { data, error } = await supabase
      .from('carousel_slides')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    result = data;
  }

  return {
    id: String(result.id),
    tag: { pt: result.tag_pt, en: result.tag_en },
    title: { pt: result.title_pt, en: result.title_en },
    description: { pt: result.description_pt, en: result.description_en },
    buttonText: { pt: result.button_text_pt, en: result.button_text_en },
    buttonLink: result.button_link,
    image: result.image,
    sort_order: result.sort_order,
    active: result.active,
  };
}

export async function deleteCarouselSlide(id: string): Promise<boolean> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { error } = await supabase
    .from('carousel_slides')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

// ==========================================
// MEDIA STORAGE HELPERS
// ==========================================

export async function uploadImage(file: File, folder: 'sermons' | 'events' | 'carousel'): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const fileExt = file.name.split('.').pop() || 'jpg';
  const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${folder}/${cleanFileName}`;

  const { data, error } = await supabase.storage
    .from('church-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('church-media')
    .getPublicUrl(filePath);

  return publicUrl;
}

// ==========================================
// CONTACT MESSAGES HELPERS
// ==========================================

const LOCAL_MESSAGES_KEY = 'icenv_local_messages';

export function clearLocalMessages(): void {
  try {
    localStorage.removeItem(LOCAL_MESSAGES_KEY);
    localStorage.removeItem('icenv_messages');
  } catch (e) {
    console.warn('Failed to clear local messages:', e);
  }
}

function getLocalMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_MESSAGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalMessages(msgs: ContactMessage[]) {
  try {
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(msgs));
  } catch (e) {
    console.warn('Failed to persist to localStorage', e);
  }
}

export async function sendMessage(
  msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status' | 'notes'>
): Promise<ContactMessage> {
  const payload = {
    name: msg.name.trim(),
    email: msg.email.trim().toLowerCase(),
    phone: msg.phone?.trim() || null,
    subject: msg.subject || 'info',
    message: msg.message.trim(),
    status: 'unread' as MessageStatus
  };

  let savedMessage: ContactMessage;

  if (supabase) {
    try {
      // Direct insert into Supabase table without .select()
      // This allows anonymous public visitors to send messages without RLS SELECT policy errors
      const { error } = await supabase
        .from('messages')
        .insert([payload]);

      if (error) throw error;

      savedMessage = {
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        name: payload.name,
        email: payload.email,
        phone: payload.phone || undefined,
        subject: payload.subject as any,
        message: payload.message,
        status: 'unread'
      };
    } catch (err) {
      console.warn('Supabase insert failed (table may not be created yet). Falling back to local storage:', err);
      savedMessage = {
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        name: payload.name,
        email: payload.email,
        phone: payload.phone || undefined,
        subject: payload.subject as any,
        message: payload.message,
        status: 'unread'
      };
      const local = getLocalMessages();
      saveLocalMessages([savedMessage, ...local]);
    }
  } else {
    // Local fallback for offline/development demo
    savedMessage = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      name: payload.name,
      email: payload.email,
      phone: payload.phone || undefined,
      subject: payload.subject as any,
      message: payload.message,
      status: 'unread'
    };
    const local = getLocalMessages();
    saveLocalMessages([savedMessage, ...local]);
  }

  // Trigger optional background notifications (WhatsApp webhook, email webhook)
  triggerNotificationEngines(savedMessage).catch((err) =>
    console.warn('Background notification error:', err)
  );

  return savedMessage;
}

export async function getMessages(): Promise<ContactMessage[]> {
  const local = getLocalMessages();

  if (!supabase) {
    return local;
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Could not fetch messages from Supabase (table might not exist yet):', error.message);
      return local;
    }

    if (!data) return local;

    // Clear outdated local storage buffer since Supabase is active and responding
    clearLocalMessages();

    const supabaseList: ContactMessage[] = data.map((item: any) => ({
      id: String(item.id),
      createdAt: item.created_at,
      name: item.name,
      email: item.email,
      phone: item.phone || undefined,
      subject: item.subject,
      message: item.message,
      status: item.status || 'unread',
      notes: item.notes || undefined
    }));

    return supabaseList;
  } catch (err) {
    console.error('Failed to fetch messages from Supabase:', err);
    return local;
  }
}

export async function updateMessageStatus(
  id: string,
  status: MessageStatus,
  notes?: string
): Promise<boolean> {
  // Always update local storage
  const local = getLocalMessages();
  const updated = local.map((m) => (m.id === id ? { ...m, status, notes: notes ?? m.notes } : m));
  saveLocalMessages(updated);

  if (!supabase) {
    return true;
  }

  try {
    const payload: any = { status };
    if (notes !== undefined) {
      payload.notes = notes;
    }

    const { error } = await supabase
      .from('messages')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.warn('Could not update status in Supabase:', error.message);
    }
  } catch (e) {
    console.warn('Supabase status update error:', e);
  }

  return true;
}

export async function deleteMessage(id: string): Promise<boolean> {
  // Always update local storage
  const local = getLocalMessages();
  const filtered = local.filter((m) => m.id !== id);
  saveLocalMessages(filtered);

  if (!supabase) {
    return true;
  }

  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Could not delete in Supabase:', error.message);
    }
  } catch (e) {
    console.warn('Supabase delete error:', e);
  }

  return true;
}


