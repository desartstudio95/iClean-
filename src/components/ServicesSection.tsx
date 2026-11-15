import React, {useEffect, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Check, X} from 'lucide-react';
import {SERVICES, ServiceItem} from '../data/icleanData';
import {SERVICE_DETAILS} from '../data/pagesData';
import {Link} from '../router/RouterContext';
import {trackConversionEvent} from '../utils/analytics';
import {SafeImage} from './SafeImage';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

const SLUG_BY_SERVICE_ID: Record<string, string> = {
  'limpeza-empresarial': 'limpeza-empresarial',
  'limpeza-residencial': 'limpeza-residencial',
  'limpeza-eventos': 'limpeza-de-eventos',
  'limpeza-pos-obra': 'limpeza-pos-obra',
  'limpeza-condominios': 'limpeza-de-condominios',
  'recolha-residuos': 'recolha-de-residuos',
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote,
}) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!activeService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeService]);

  return (
    <section
      id="servicos"
      aria-labelledby="services-heading"
      className="bg-[#F7F9F7] py-20 lg:py-24 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Nossos Serviços
            </p>
            <h2
              id="services-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] text-balance"
            >
              Soluções completas para cada espaço.
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-sm sm:text-base text-[#17251D]/75 max-w-md md:text-right leading-relaxed">
              Cada serviço é planeado conforme a dimensão do imóvel, o fluxo de
              utilização e as exigências específicas de higiene.
            </p>
            <Link
              to="/servicos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0C482B] hover:text-[#17251D] transition-colors"
            >
              <span>Explorar página completa de serviços</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((service, index) => {
            const detailSlug = SLUG_BY_SERVICE_ID[service.id];
            const detailMatch = SERVICE_DETAILS.find((s) => s.slug === detailSlug);
            return (
              <motion.article
                key={service.id}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-40px'}}
                transition={{
                  duration: 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#E9EFEA]">
                  <SafeImage
                    src={service.image}
                    alt={service.imageAlt}
                    fallbackTitle={service.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-medium text-[#0C482B]/80 mb-1.5">
                    {service.idealFor}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[#17251D] mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#17251D]/75 leading-relaxed mb-6 flex-1">
                    {service.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[#17251D]/8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        trackConversionEvent('service_card_clicked', {
                          serviceId: service.id,
                          serviceTitle: service.title,
                        });
                        setActiveService(service);
                      }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0C482B] hover:text-[#17251D] transition-colors cursor-pointer py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B] rounded"
                    >
                      <span>Conhecer serviço</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>

                    {detailMatch && (
                      <Link
                        to={`/servicos/${detailMatch.slug}`}
                        className="text-xs font-medium text-[#17251D]/65 hover:text-[#0C482B] transition-colors"
                      >
                        Ver página
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D12]/70 backdrop-blur-xs"
          onClick={() => setActiveService(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-[#E9EFEA] shrink-0">
              <SafeImage
                src={activeService.image}
                alt={activeService.imageAlt}
                fallbackTitle={activeService.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveService(null)}
                aria-label="Fechar detalhes do serviço"
                className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/95 text-[#17251D] hover:bg-white flex items-center justify-center shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-xs font-semibold text-[#0C482B] mb-1">
                {activeService.idealFor}
              </p>
              <h3
                id="service-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold text-[#17251D] mb-3"
              >
                {activeService.title}
              </h3>
              <p className="text-sm sm:text-base text-[#17251D]/80 leading-relaxed mb-6">
                {activeService.fullDescription}
              </p>

              <h4 className="font-display text-sm font-semibold text-[#17251D] mb-3">
                O que está incluído:
              </h4>
              <ul className="space-y-2.5 mb-7">
                {activeService.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#17251D]/85"
                  >
                    <Check
                      className="w-4 h-4 text-[#0C482B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4 border-t border-[#17251D]/10">
                <button
                  type="button"
                  onClick={() => {
                    const selected = activeService.title;
                    setActiveService(null);
                    onSelectServiceForQuote(selected);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0C482B] text-white font-semibold text-sm hover:bg-[#093821] transition-colors cursor-pointer"
                >
                  <span>Solicitar orçamento para este serviço</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                {SLUG_BY_SERVICE_ID[activeService.id] && (
                  <Link
                    to={`/servicos/${SLUG_BY_SERVICE_ID[activeService.id]}`}
                    onClick={() => setActiveService(null)}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-sm hover:bg-[#87DF5A] transition-colors"
                  >
                    Página completa do serviço
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-[#17251D]/15 text-[#17251D] font-medium text-sm hover:bg-[#F7F9F7] transition-colors cursor-pointer"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
