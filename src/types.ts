export type Language = 'pt' | 'en';

export type ActiveTab = 'home' | 'sobre' | 'cultos' | 'sermoes' | 'eventos' | 'contato' | 'admin';

export interface Sermon {
  id: string;
  title: { pt: string; en: string };
  series: { pt: string; en: string };
  preacher: { pt: string; en: string };
  date: string;
  theme: { pt: string; en: string };
  duration: string;
  videoUrl: string;
  image: string;
  verse: string;
}

export interface ChurchEvent {
  id: string;
  day: string;
  month: { pt: string; en: string };
  year: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  time: string;
  location: { pt: string; en: string };
  category: 'proximos' | 'conferencias' | 'ministerios';
  image: string;
}

export interface Leader {
  id: string;
  name: string;
  role: { pt: string; en: string };
  image: string;
  bio: { pt: string; en: string };
}

export interface TimelineEvent {
  year: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  image?: string;
}
