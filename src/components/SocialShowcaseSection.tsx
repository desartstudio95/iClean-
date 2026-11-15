import React from 'react';
import {ArrowUpRight, Instagram, MessageCircle, Share2} from 'lucide-react';
import {siteConfig} from '../config/site';
import {trackConversionEvent} from '../utils/analytics';
import {buildWhatsAppUrl} from '../utils/whatsapp';
import {SafeImage} from './SafeImage';

const SOCIAL_GALLERY_PREVIEW = [
  {
    src: '/src/assets/images/hero_commercial_cleaning_1794778185906.jpg',
    alt: 'Equipa iClean em limpeza comercial em Maputo',
  },
  {
    src: '/src/assets/images/service_residential_villa_1794778187196.jpg',
    alt: 'Higienização residencial de cozinha e bancada',
  },
  {
    src: '/src/assets/images/service_events_venue_1794778188286.jpg',
    alt: 'Equipa iClean em evento ao ar livre',
  },
  {
    src: '/src/assets/images/service_post_construction_1794778186552.jpg',
    alt: 'Limpeza técnica pós-obra e vidros',
  },
  {
    src: '/src/assets/images/about_team_portrait_1794778189347.jpg',
    alt: 'Equipa uniformizada da iClean Moçambique',
  },
  {
    src: '/src/assets/images/service_waste_management_1794778189686.jpg',
    alt: 'Gestão e acondicionamento organizado de resíduos',
  },
];

interface SocialShowcaseSectionProps {
  onFallbackContact: () => void;
  onGlobalBackground?: boolean;
}

export const SocialShowcaseSection: React.FC<SocialShowcaseSectionProps> = ({
  onFallbackContact,
  onGlobalBackground = false,
}) => {
  const instagram = siteConfig.social.find((s) => s.id === 'instagram');
  const facebook = siteConfig.social.find((s) => s.id === 'facebook');
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.defaultWhatsappMessage
  );

  return (
    <section
      aria-labelledby="social-showcase-heading"
      className={`py-20 lg:py-24 border-b ${
        onGlobalBackground
          ? 'bg-transparent border-white/12'
          : 'bg-white border-[#17251D]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p
              className={`text-sm font-semibold mb-2 ${
                onGlobalBackground ? 'text-[#78D34B]' : 'text-[#0C482B]'
              }`}
            >
              Segue-nos nas redes sociais.
            </p>
            <h2
              id="social-showcase-heading"
              className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                onGlobalBackground ? 'text-white' : 'text-[#17251D]'
              }`}
            >
              Acompanhe o nosso trabalho.
            </h2>
            <p
              className={`mt-3 text-base leading-relaxed ${
                onGlobalBackground ? 'text-white/85' : 'text-[#17251D]/75'
              }`}
            >
              Partilhamos rotinas de higienização, preparação de eventos e
              dicas práticas de conservação de espaços nos nossos canais
              digitais.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {instagram?.isConfigured ? (
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                  onGlobalBackground
                    ? 'bg-white/15 border border-white/25 text-white hover:bg-white/25 backdrop-blur-sm'
                    : 'bg-[#0C482B] text-white hover:bg-[#093821]'
                }`}
              >
                <Instagram className="w-4 h-4 text-[#78D34B]" aria-hidden="true" />
                <span>Instagram iClean</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <span
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium border ${
                  onGlobalBackground
                    ? 'bg-[#082416]/75 border-white/20 text-white/85 backdrop-blur-sm'
                    : 'bg-[#F7F9F7] border-[#17251D]/15 text-[#17251D]/75'
                }`}
              >
                <Instagram
                  className={`w-4 h-4 ${
                    onGlobalBackground ? 'text-[#78D34B]' : 'text-[#0C482B]'
                  }`}
                  aria-hidden="true"
                />
                <span>Perfil Instagram configurável em siteConfig</span>
              </span>
            )}

            {facebook?.isConfigured && (
              <a
                href={facebook.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-semibold transition-colors whitespace-nowrap ${
                  onGlobalBackground
                    ? 'bg-white/12 border-white/25 text-white hover:bg-white/20 backdrop-blur-sm'
                    : 'border-[#17251D]/20 text-[#17251D] hover:bg-[#F7F9F7]'
                }`}
              >
                <Share2
                  className={`w-4 h-4 ${
                    onGlobalBackground ? 'text-[#78D34B]' : 'text-[#0C482B]'
                  }`}
                  aria-hidden="true"
                />
                <span>Facebook</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversionEvent('whatsapp_clicked', {
                    source: 'social_showcase',
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#78D34B] text-[#092E1B] text-sm font-semibold hover:bg-[#87DF5A] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Falar com a iClean</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onFallbackContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#78D34B] text-[#092E1B] text-sm font-semibold hover:bg-[#87DF5A] transition-colors cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Falar com a iClean</span>
              </button>
            )}
          </div>
        </div>

        {/* Static Curated Instagram-Style Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_GALLERY_PREVIEW.map((photo) => {
            const tile = (
              <div
                className={`group relative aspect-square rounded-xl overflow-hidden border ${
                  onGlobalBackground
                    ? 'bg-[#082416]/60 border-white/20 shadow-lg'
                    : 'bg-[#F7F9F7] border-[#17251D]/10'
                }`}
              >
                <SafeImage
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            );

            if (instagram?.isConfigured) {
              return (
                <a
                  key={photo.src}
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${photo.alt} — Ver no Instagram`}
                >
                  {tile}
                </a>
              );
            }

            return <div key={photo.src}>{tile}</div>;
          })}
        </div>
      </div>
    </section>
  );
};
