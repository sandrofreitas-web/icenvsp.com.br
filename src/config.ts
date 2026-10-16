/**
 * Application Runtime Configuration
 *
 * SITE_MODE controls whether the site runs in:
 * - 'limited': Minimal production-ready version showing only Cultos & Sermões (expository calendar without downloads/recordings)
 * - 'full': Complete multi-page portal (Home, Sobre, Cultos, Sermões, Eventos, Contato, Admin)
 */

export const SITE_MODE: 'limited' | 'full' =
  (import.meta.env.VITE_SITE_MODE as 'limited' | 'full') || 'limited';

export const IS_LIMITED_MODE: boolean = SITE_MODE === 'limited';
