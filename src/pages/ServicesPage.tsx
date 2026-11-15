import React, {useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {PageHeader} from '../components/PageHeader';
import {QuotationSection} from '../components/QuotationSection';
import {ServiceCard} from '../components/ServiceCard';
import {SERVICE_DETAILS} from '../data/pagesData';
import {useDocumentMetadata} from '../hooks/useDocumentMetadata';

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>(
    SERVICE_DETAILS[0].title
  );

  useDocumentMetadata({
    title: 'Serviços de Limpeza Profissional em Maputo | iClean',
    description:
      'Conheça os serviços da iClean em Maputo: limpeza residencial, limpeza de escritórios, eventos, pós-obra, condomínios e recolha de resíduos não perigosos.',
    path: '/servicos',
    breadcrumbs: [
      {name: 'Início', item: '/'},
      {name: 'Serviços', item: '/servicos'},
    ],
  });

  const handleRequestQuote = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const el = document.getElementById('orcamento-servicos');
    if (el) el.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      <PageHeader
        kicker="Serviços iClean · Maputo, Moçambique"
        title="Soluções profissionais de limpeza para cada espaço."
        description="Oferecemos serviços de limpeza, higienização e conservação adaptados às necessidades de residências, empresas, condomínios e eventos."
        image="/src/assets/images/hero_services_overview_1794778934664.jpg"
        imageAlt="Especialistas da iClean em uniforme verde com carro de limpeza profissional em edifício moderno"
        breadcrumbs={[{label: 'Início', to: '/'}, {label: 'Serviços'}]}
        actions={
          <button
            type="button"
            onClick={() => handleRequestQuote(SERVICE_DETAILS[0].title)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-sm sm:text-base hover:bg-[#87DF5A] transition-colors cursor-pointer"
          >
            <span>Solicitar orçamento</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        }
      />

      <section
        aria-labelledby="catalog-heading"
        className="bg-[#F7F9F7] py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 lg:mb-14">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Portfólio Completo
            </p>
            <h2
              id="catalog-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] text-balance"
            >
              Seis áreas especializadas para ambientes mais limpos e saudáveis.
            </h2>
            <p className="mt-3 text-base text-[#17251D]/75 leading-relaxed">
              Explore os detalhes de cada serviço ou solicite diretamente um
              orçamento ajustado à dimensão e frequência do seu espaço.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICE_DETAILS.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                onRequestQuote={handleRequestQuote}
                showIncludedList
              />
            ))}
          </div>
        </div>
      </section>

      <QuotationSection
        sectionId="orcamento-servicos"
        preselectedService={selectedService}
      />
    </>
  );
};
