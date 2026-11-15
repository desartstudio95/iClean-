import React from 'react';
import {Clock, Mail, MapPin, MessageCircle} from 'lucide-react';
import {PageHeader} from '../components/PageHeader';
import {QuotationSection} from '../components/QuotationSection';
import {siteConfig} from '../config/site';
import {useDocumentMetadata} from '../hooks/useDocumentMetadata';
import {buildWhatsAppUrl} from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  useDocumentMetadata({
    title: 'Contactos e Orçamentos de Limpeza em Maputo | iClean',
    description:
      'Fale com a iClean em Maputo para solicitar orçamentos de limpeza residencial, escritórios, condomínios, pós-obra ou eventos.',
    path: '/contactos',
    breadcrumbs: [
      {name: 'Início', item: '/'},
      {name: 'Contactos', item: '/contactos'},
    ],
  });

  const whatsappDirect = buildWhatsAppUrl(
    siteConfig.contact.defaultWhatsappMessage
  );

  return (
    <>
      <PageHeader
        kicker="Contactos · Maputo, Moçambique"
        title="Fale com a equipa iClean."
        description="Estamos disponíveis para avaliar as necessidades do seu espaço e preparar uma proposta clara e ajustada."
        image="/src/assets/images/hero_commercial_cleaning_1794778185906.jpg"
        imageAlt="Equipa profissional da iClean em Maputo"
        breadcrumbs={[{label: 'Início', to: '/'}, {label: 'Contactos'}]}
      />

      <section className="bg-white py-14 sm:py-16 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="bg-[#F7F9F7] rounded-xl p-6 border border-[#17251D]/10">
              <MapPin className="w-6 h-6 text-[#0C482B] mb-3" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#17251D] mb-1">
                Localização
              </h2>
              <p className="text-sm text-[#17251D]/75">
                {siteConfig.contact.address}
              </p>
            </article>

            <article className="bg-[#F7F9F7] rounded-xl p-6 border border-[#17251D]/10">
              <Mail className="w-6 h-6 text-[#0C482B] mb-3" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#17251D] mb-1">
                E-mail
              </h2>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-[#0C482B] font-medium hover:underline break-all"
              >
                {siteConfig.contact.email}
              </a>
            </article>

            <article className="bg-[#F7F9F7] rounded-xl p-6 border border-[#17251D]/10">
              <Clock className="w-6 h-6 text-[#0C482B] mb-3" aria-hidden="true" />
              <h2 className="font-display text-base font-bold text-[#17251D] mb-1">
                Horário de Atendimento
              </h2>
              <p className="text-sm text-[#17251D]/75">
                {siteConfig.contact.hours}
              </p>
            </article>

            <article className="bg-[#F7F9F7] rounded-xl p-6 border border-[#17251D]/10">
              <MessageCircle
                className="w-6 h-6 text-[#0C482B] mb-3"
                aria-hidden="true"
              />
              <h2 className="font-display text-base font-bold text-[#17251D] mb-1">
                WhatsApp Comercial
              </h2>
              {whatsappDirect ? (
                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#0C482B] hover:underline"
                >
                  Iniciar conversa (+{siteConfig.contact.whatsappNumber})
                </a>
              ) : (
                <p className="text-xs text-[#17251D]/70 leading-relaxed">
                  Configurável via <code>VITE_WHATSAPP_NUMBER</code> ou{' '}
                  <code>src/config/site.ts</code>.
                </p>
              )}
            </article>
          </div>
        </div>
      </section>

      <QuotationSection sectionId="orcamento-contactos" />
    </>
  );
};
