import React from 'react';
import {Clock, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {siteConfig} from '../config/site';
import {SERVICE_DETAILS} from '../data/pagesData';
import {Link} from '../router/RouterContext';
import {trackConversionEvent} from '../utils/analytics';
import {buildWhatsAppUrl} from '../utils/whatsapp';
import {ICleanLogo} from './ICleanLogo';

interface FooterProps {
  onGlobalBackground?: boolean;
}

export const Footer: React.FC<FooterProps> = ({onGlobalBackground = false}) => {
  const configuredSocials = siteConfig.social.filter(
    (s) => s.isConfigured && s.href
  );
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.contact.defaultWhatsappMessage
  );

  return (
    <footer
      className={`text-white border-t border-white/12 ${
        onGlobalBackground
          ? 'bg-[#061E12]/72 backdrop-blur-sm'
          : 'bg-[#082416]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <ICleanLogo variant="inverted" />
            </Link>
            <p className="text-xs font-semibold text-[#78D34B] tracking-wide">
              {siteConfig.brand.tagline}
            </p>
            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              {siteConfig.brand.description}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {configuredSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`iClean no ${social.label}`}
                  className="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-medium text-white/85 hover:text-[#78D34B] hover:border-[#78D34B]/50 transition-colors"
                >
                  {social.label}
                </a>
              ))}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversionEvent('whatsapp_clicked', {source: 'footer'})
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#78D34B]/40 text-xs font-medium text-[#78D34B] hover:bg-[#78D34B]/10 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              )}
              {configuredSocials.length === 0 && !whatsappUrl && (
                <span className="text-xs text-white/55">
                  Canais sociais e WhatsApp configuráveis em siteConfig.
                </span>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="hover:text-[#78D34B] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/galeria"
                  className="hover:text-[#78D34B] transition-colors"
                >
                  Galeria
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Serviços
            </h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              {SERVICE_DETAILS.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/servicos/${service.slug}`}
                    className="hover:text-[#78D34B] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              Contactos
            </h3>
            <ul className="space-y-3.5 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="w-4 h-4 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#78D34B] transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="w-4 h-4 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  {siteConfig.contact.isWhatsappConfigured
                    ? `+${siteConfig.contact.whatsappNumber}`
                    : siteConfig.contact.phoneDisplay}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock
                  className="w-4 h-4 text-[#78D34B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {siteConfig.brand.copyrightYear} {siteConfig.brand.name}. Todos os
            direitos reservados.
          </p>
          <p>{siteConfig.brand.city}</p>
        </div>
      </div>
    </footer>
  );
};
