import React from 'react';
import {ArrowRight, Check, Info} from 'lucide-react';
import {ServiceDetail} from '../data/pagesData';
import {Link} from '../router/RouterContext';
import {trackConversionEvent} from '../utils/analytics';
import {SafeImage} from './SafeImage';

interface ServiceCardProps {
  service: ServiceDetail;
  onRequestQuote: (serviceTitle: string) => void;
  showIncludedList?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onRequestQuote,
  showIncludedList = true,
}) => {
  const handleCardClick = () => {
    trackConversionEvent('service_card_clicked', {
      serviceSlug: service.slug,
      serviceTitle: service.title,
    });
  };

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-[#17251D]/10 hover:border-[#0C482B]/35 transition-colors duration-200 flex flex-col">
      <Link
        to={`/servicos/${service.slug}`}
        onClick={handleCardClick}
        className="block aspect-[4/3] overflow-hidden bg-[#E9EFEA]"
      >
        <SafeImage
          src={service.image}
          alt={service.imageAlt}
          width={800}
          height={600}
          fallbackTitle={service.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-[#0C482B] font-semibold mb-1.5">
          <span>{service.code}</span>
          <span aria-hidden="true" className="text-[#17251D]/35">
            ·
          </span>
          <span className="text-[#17251D]/70 font-medium">{service.idealFor}</span>
        </div>

        <h3 className="font-display text-xl font-bold text-[#17251D] mb-2.5">
          <Link
            to={`/servicos/${service.slug}`}
            onClick={handleCardClick}
            className="hover:text-[#0C482B] transition-colors"
          >
            {service.title}
          </Link>
        </h3>

        <p className="text-sm text-[#17251D]/75 leading-relaxed mb-4">
          {service.shortDescription}
        </p>

        {showIncludedList && (
          <ul className="space-y-1.5 mb-5 flex-1">
            {service.includedItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs sm:text-sm text-[#17251D]/85"
              >
                <Check
                  className="w-4 h-4 text-[#0C482B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {service.complianceNote && (
          <div className="mb-5 p-3 rounded-lg bg-[#F7F9F7] border border-[#17251D]/10 flex items-start gap-2 text-xs text-[#17251D]/78 leading-relaxed">
            <Info className="w-4 h-4 text-[#0C482B] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{service.complianceNote}</span>
          </div>
        )}

        <div className="pt-4 mt-auto border-t border-[#17251D]/10 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/servicos/${service.slug}`}
            onClick={handleCardClick}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0C482B] hover:text-[#17251D] transition-colors whitespace-nowrap"
          >
            <span>Conhecer serviço</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => onRequestQuote(service.title)}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#78D34B] text-[#092E1B] text-xs sm:text-sm font-semibold hover:bg-[#87DF5A] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B]"
          >
            Solicitar orçamento
          </button>
        </div>
      </div>
    </article>
  );
};
