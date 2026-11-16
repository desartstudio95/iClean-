import React from 'react';
import {ArrowRight} from 'lucide-react';
import {IMAGES} from '../assets/images';
import {BeforeAfterComparison} from '../components/BeforeAfterComparison';
import {CtaBanner} from '../components/CtaBanner';
import {PageHeader} from '../components/PageHeader';
import {PortfolioGallery} from '../components/PortfolioGallery';
import {useDocumentMetadata} from '../hooks/useDocumentMetadata';
import {Link, useRouter} from '../router/RouterContext';

export const GalleryPage: React.FC = () => {
  const {navigate} = useRouter();

  useDocumentMetadata({
    title: 'Galeria de Resultados e Antes & Depois | iClean Maputo',
    description:
      'Veja exemplos de transformação de espaços, limpeza residencial, empresarial, pós-obra, condomínios e eventos em Maputo pela equipa iClean.',
    path: '/galeria',
    breadcrumbs: [
      {name: 'Início', item: '/'},
      {name: 'Galeria', item: '/galeria'},
    ],
  });

  return (
    <>
      <PageHeader
        kicker="Portfólio Visual iClean"
        title="Os nossos resultados falam por nós."
        description="Conheça o nosso trabalho e descubra como transformamos espaços através da limpeza, organização e atenção aos detalhes."
        image={IMAGES.galleryAfterSpotless}
        imageAlt="Átrio comercial amplo e higienizado com pavimento espelhado pela equipa iClean"
        breadcrumbs={[{label: 'Início', to: '/'}, {label: 'Galeria'}]}
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate('/contactos', {hash: 'orcamento-contactos'})}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-sm sm:text-base hover:bg-[#87DF5A] transition-colors cursor-pointer"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <Link
              to="/servicos"
              className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg border border-white/35 bg-white/10 text-white font-medium text-sm sm:text-base hover:bg-white/20 transition-colors"
            >
              Conhecer os nossos serviços
            </Link>
          </>
        }
      />

      {/* Interactive Before & After Showcase */}
      <section className="bg-white py-16 lg:py-20 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeforeAfterComparison />
        </div>
      </section>

      {/* Filterable Portfolio Grid */}
      <section
        aria-labelledby="portfolio-grid-heading"
        className="bg-white py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Categorias de Atuação
            </p>
            <h2
              id="portfolio-grid-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] text-balance"
            >
              Explore por tipo de ambiente.
            </h2>
          </div>

          <PortfolioGallery />
        </div>
      </section>

      <CtaBanner
        kicker="Contratar Limpeza"
        headline="Quer ver este padrão de cuidado no seu espaço?"
        description="Fale com a equipa iClean em Maputo e receba uma proposta ajustada à dimensão e frequência do seu imóvel ou evento."
        buttonLabel="Solicitar orçamento"
        onAction={() => navigate('/contactos', {hash: 'orcamento-contactos'})}
      />
    </>
  );
};
