import { ContactMessage } from '../types';

export const SUBJECT_LABELS: Record<string, { pt: string; en: string; color: string }> = {
  info: {
    pt: 'Informações Gerais',
    en: 'General Information',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  prayer: {
    pt: 'Pedido de Oração',
    en: 'Prayer Request',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  pastoral: {
    pt: 'Aconselhamento Pastoral',
    en: 'Pastoral Counseling',
    color: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  admin: {
    pt: 'Secretaria / Administração',
    en: 'Secretary / Administration',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  ministries: {
    pt: 'Dúvidas sobre Ministérios',
    en: 'Ministry Inquiries',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
};

/**
 * Sanitizes phone number to standard international WhatsApp format
 * (e.g. converts "(11) 98765-4321" to "5511987654321")
 */
export function sanitizeWhatsAppNumber(phone?: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';

  // If Brazilian 10 or 11 digits without country code, prepend 55
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

/**
 * Generates a ready-to-use WhatsApp direct link for leadership response
 */
export function generateWhatsAppResponseUrl(
  phone?: string,
  visitorName?: string,
  churchRepresentativeName: string = 'Igreja Cristã Evangélica Nova Vida'
): string | null {
  const sanitized = sanitizeWhatsAppNumber(phone);
  if (!sanitized) return null;

  const defaultGreeting = `Olá ${visitorName || ''}, a paz do Senhor! Aqui é da ${churchRepresentativeName}. Recebemos sua mensagem enviada através de nosso site.`;
  return `https://wa.me/${sanitized}?text=${encodeURIComponent(defaultGreeting)}`;
}

/**
 * Generates a ready-to-use mailto URL for leadership response
 */
export function generateMailtoResponseUrl(
  email: string,
  visitorName: string,
  subject: string = 'Contato ICENV SP'
): string {
  const mailSubject = `[ICENV SP] Resposta ao seu contato - ${subject}`;
  const mailBody = `Olá ${visitorName},\n\nA paz do Senhor!\n\nAgradecemos pelo seu contato através do site da Igreja Cristã Evangélica Nova Vida.\n\n---\nAtenciosamente,\nEquipe Pastoral e Secretaria\nICENV SP\ncontato@icenvsp.com.br`;

  return `mailto:${email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
}

/**
 * Dispatches optional alerts (Email Webhook and WhatsApp Webhook for leadership)
 * Prepared for plug-and-play activation via .env
 */
export async function triggerNotificationEngines(message: ContactMessage): Promise<void> {
  const env = (import.meta as any).env || {};
  const subjectLabel = SUBJECT_LABELS[message.subject]?.pt || message.subject;

  // 1. WhatsApp Leadership Webhook Alert (Prepared for Future Activation)
  const isWhatsAppAlertsEnabled = env.VITE_WHATSAPP_ALERTS_ENABLED === 'true';
  const whatsappWebhookUrl = env.VITE_WHATSAPP_WEBHOOK_URL || '';

  if (isWhatsAppAlertsEnabled && whatsappWebhookUrl) {
    try {
      const whatsappText = `🔔 *Novo Contato Recebido — Site ICENV SP*\n\n` +
        `👤 *Nome:* ${message.name}\n` +
        `📧 *E-mail:* ${message.email}\n` +
        `📱 *Telefone:* ${message.phone || 'Não informado'}\n` +
        `🏷️ *Assunto:* ${subjectLabel}\n` +
        `📅 *Data:* ${new Date(message.createdAt).toLocaleString('pt-BR')}\n\n` +
        `💬 *Mensagem:*\n"${message.message}"`;

      await fetch(whatsappWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: env.VITE_LEADERSHIP_WHATSAPP_GROUP || '',
          message: whatsappText,
          data: message
        })
      });
      console.info('WhatsApp leadership notification webhook triggered.');
    } catch (err) {
      console.warn('Failed to trigger WhatsApp leadership alert webhook:', err);
    }
  }

  // 2. Email Webhook Alert (if configured via custom webhook/Resend endpoint)
  const emailWebhookUrl = env.VITE_EMAIL_WEBHOOK_URL || '';
  if (emailWebhookUrl) {
    try {
      await fetch(emailWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: env.VITE_CHURCH_CONTACT_EMAIL || 'contato@icenvsp.com.br',
          subject: `[Site ICENV] Novo Contato: ${subjectLabel} - ${message.name}`,
          message
        })
      });
      console.info('Email notification webhook triggered.');
    } catch (err) {
      console.warn('Failed to trigger Email notification webhook:', err);
    }
  }
}
