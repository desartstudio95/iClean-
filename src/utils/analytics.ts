import {siteConfig} from '../config/site';

export type ConversionEventName =
  | 'quotation_form_started'
  | 'quotation_form_submitted'
  | 'whatsapp_clicked'
  | 'service_card_clicked'
  | 'event_quotation_started';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Rastreia eventos de conversão apenas quando analytics externos estão
 * configurados explicitamente e sem recolha de dados pessoais desnecessários.
 */
export function trackConversionEvent(
  eventName: ConversionEventName,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;
  if (!siteConfig.analytics.enabled) return;

  // Respeitar sinal Do Not Track do navegador
  if (
    typeof navigator !== 'undefined' &&
    (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes')
  ) {
    return;
  }

  const sanitizedParams = params ? {...params} : {};

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, sanitizedParams);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...sanitizedParams,
    });
  }
}
