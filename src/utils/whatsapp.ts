import {siteConfig} from '../config/site';

/**
 * Gera um URL de WhatsApp devidamente codificado usando o número configurado.
 * Retorna null se o número oficial ainda não estiver configurado.
 */
export function buildWhatsAppUrl(message: string): string | null {
  if (!siteConfig.contact.isWhatsappConfigured) {
    return null;
  }
  const cleanNumber = siteConfig.contact.whatsappNumber.replace(/\D/g, '');
  if (cleanNumber.length < 9) return null;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Envia o pedido de orçamento para o endpoint configurado, caso exista.
 * Quando nenhum backend está configurado, não simula persistência em base de dados.
 */
export async function submitToConfiguredBackend(
  payload: Record<string, unknown>
): Promise<{sentToBackend: boolean}> {
  const endpoint = siteConfig.integrations.quotationWebhookUrl;
  if (!endpoint) {
    return {sentToBackend: false};
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(
      'Não foi possível transmitir o pedido ao servidor configurado. Pode copiar o resumo ou enviar via WhatsApp.'
    );
  }

  return {sentToBackend: true};
}
