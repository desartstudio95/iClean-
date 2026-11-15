import React from 'react';
import {ArrowRight} from 'lucide-react';
import {Link} from '../router/RouterContext';
import {BeforeAfterComparison} from './BeforeAfterComparison';
import {PortfolioGallery} from './PortfolioGallery';

interface GallerySectionProps {
  onGlobalBackground?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onGlobalBackground = false,
}) => {
  return (
    <section
      id="galeria"
      aria-labelledby="gallery-heading"
      className={`py-20 lg:py-24 border-b scroll-mt-16 ${
        onGlobalBackground
          ? 'bg-transparent border-white/12'
          : 'bg-white border-[#17251D]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p
              className={`text-sm font-semibold mb-2 ${
                onGlobalBackground ? 'text-[#78D34B]' : 'text-[#0C482B]'
              }`}
            >
              Galeria de Resultados
            </p>
            <h2
              id="gallery-heading"
              className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
                onGlobalBackground ? 'text-white' : 'text-[#17251D]'
              }`}
            >
              Veja a diferença que a limpeza pode fazer.
            </h2>
            <p
              className={`mt-3 text-base leading-relaxed ${
                onGlobalBackground ? 'text-white/85' : 'text-[#17251D]/75'
              }`}
            >
              Compare o antes e o depois e explore exemplos dos padrões de
              limpeza para residências, escritórios, condomínios, obras e
              eventos.
            </p>
          </div>

          <Link
            to="/galeria"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              onGlobalBackground
                ? 'bg-[#78D34B] text-[#092E1B] hover:bg-[#87DF5A]'
                : 'bg-[#0C482B] text-white hover:bg-[#093821]'
            }`}
          >
            <span>Explorar galeria completa</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Reusable Interactive Before & After Slider */}
        <div className="mb-14">
          <BeforeAfterComparison />
        </div>

        {/* Reusable Expandable Portfolio Gallery */}
        <PortfolioGallery maxItems={6} onDarkCanvas={onGlobalBackground} />
      </div>
    </section>
  );
};
