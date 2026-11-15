export interface NavLinkItem {
  label: string;
  href: string;
  exact?: boolean;
}

export interface SocialLinkItem {
  id: 'instagram' | 'facebook' | 'linkedin';
  label: string;
  href: string;
  isConfigured: boolean;
}

export interface VerifiedTestimonial {
  id: string;
  customerName: string;
  serviceCategory: string;
  comment: string;
  rating: number;
  photoUrl?: string;
  photoAlt?: string;
  hasPhotoPermission?: boolean;
}

const getEnv = (key: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const val = (import.meta.env as Record<string, unknown>)[key];
    return typeof val === 'string' ? val.trim() : '';
  }
  return '';
};

const envWhatsappNumber = getEnv('VITE_WHATSAPP_NUMBER').replace(/\D/g, '');
const envQuotationEndpoint = getEnv('VITE_QUOTATION_ENDPOINT');
const envInstagramUrl = getEnv('VITE_INSTAGRAM_URL');
const envFacebookUrl = getEnv('VITE_FACEBOOK_URL');
const envLinkedinUrl = getEnv('VITE_LINKEDIN_URL');
const envSiteUrl = getEnv('VITE_SITE_URL');
const envAnalyticsEnabled = getEnv('VITE_ANALYTICS_ENABLED') === 'true';
const envAnalyticsId = getEnv('VITE_ANALYTICS_MEASUREMENT_ID');

/**
 * Configuração centralizada da iClean (negócio, marketing, SEO e integrações).
 * Altere aqui os dados oficiais confirmados antes da publicação final.
 */
export const siteConfig = {
  brand: {
    name: 'iClean',
    tagline: 'Limpeza • Higiene • Sustentabilidade',
    description:
      'Empresa moçambicana dedicada à limpeza profissional, higienização de espaços, apoio operacional a eventos e gestão responsável de resíduos em Maputo.',
    city: 'Maputo, Moçambique',
    domain: envSiteUrl,
    copyrightYear: 2026,
  },
  contact: {
    // Configure VITE_WHATSAPP_NUMBER ou substitua pelo número oficial (ex: "25884XXXXXXX")
    whatsappNumber: envWhatsappNumber,
    isWhatsappConfigured: envWhatsappNumber.length >= 9,
    defaultWhatsappMessage:
      'Olá equipa iClean, gostaria de solicitar um orçamento para serviços de limpeza em Maputo.',
    phoneDisplay: 'Contacto telefónico oficial a configurar',
    email: 'orcamentos@iclean.co.mz',
    address: 'Cidade de Maputo, Moçambique',
    // Defina como true apenas quando endereço exato, telefone e horário oficiais estiverem confirmados para Google Business Profile / LocalBusiness JSON-LD
    isBusinessInfoVerified: false,
    serviceAreas: [
      'Cidade de Maputo',
      'Polana Cimento',
      'Sommerschield',
      'Baixa de Maputo',
      'Triunfo',
      'Costa do Sol',
      'Matola e arredores',
    ],
    hours: 'Segunda a Sábado · 07:00 – 18:00',
  },
  integrations: {
    quotationWebhookUrl: envQuotationEndpoint,
  },
  analytics: {
    enabled: envAnalyticsEnabled && envAnalyticsId.length > 0,
    measurementId: envAnalyticsId,
  },
  seo: {
    locale: 'pt_MZ',
    defaultTitle: 'iClean | Empresa de Limpeza Profissional em Maputo',
    defaultDescription:
      'Serviços profissionais de limpeza residencial, empresarial, pós-obra, condomínios, eventos e recolha de resíduos não perigosos em Maputo, Moçambique.',
  },
  navigation: [
    {label: 'Início', href: '/', exact: true},
    {label: 'Sobre Nós', href: '/sobre-nos'},
    {label: 'Serviços', href: '/servicos'},
    {label: 'Eventos', href: '/eventos'},
    {label: 'Contactos', href: '/contactos'},
  ] satisfies NavLinkItem[],
  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      href: envInstagramUrl,
      isConfigured: envInstagramUrl.length > 0,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: envFacebookUrl,
      isConfigured: envFacebookUrl.length > 0,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: envLinkedinUrl,
      isConfigured: envLinkedinUrl.length > 0,
    },
  ] satisfies SocialLinkItem[],
  /**
   * Testemunhos reais verificados de clientes da iClean.
   * Mantenha vazio até existirem avaliações reais autorizadas; nunca insira avaliações fictícias.
   */
  verifiedTestimonials: [] as VerifiedTestimonial[],
};
