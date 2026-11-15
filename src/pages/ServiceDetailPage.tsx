import React, {useState} from 'react';
import {ArrowLeft, ArrowRight, Check, Info, ShieldCheck} from 'lucide-react';
import {CtaBanner} from '../components/CtaBanner';
import {FaqAccordion} from '../components/FaqAccordion';
import {PageHeader} from '../components/PageHeader';
import {QuotationSection} from '../components/QuotationSection';
import {ServiceCard} from '../components/ServiceCard';
import {getServiceBySlug, SERVICE_DETAILS} from '../data/pagesData';
import {useDocumentMetadata} from '../hooks/useDocumentMetadata';
import {Link} from '../router/RouterContext';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({slug}) => {
  const service = getServiceBySlug(slug);
  const [quoteService, setQuoteService] = useState<string>(
    service?.title || SERVICE_DETAILS[0].title
  );

  useDocumentMetadata({
    title: service
      ? service.seoTitle
      : 'Serviço não encontrado | iClean',
    description: service
      ? service.seoDescription
      : 'Explore os serviços profissionais de limpeza da iClean em Maputo, Moçambique.',
    path: `/servicos/${slug}`,
    breadcrumbs: service
      ? [
          {name: 'Início', item: '/'},
          {name: 'Serviços', item: '/servicos'},
          {name: service.title, item: `/servicos/${service.slug}`},
        ]
      : undefined,
    serviceSchema: service
      ? {
          name: service.title,
          description: service.shortDescription,
          serviceType: service.title,
        }
      : undefined,
  });

  if (!service) {
    return (
      <section className="pt-36 pb-24 bg-[#F7F9F7] min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#17251D] mb-4">
            Serviço não encontrado
          </h1>
          <p className="text-base text-[#17251D]/75 mb-8">
            O serviço que procura não está disponível neste endereço. Consulte o
            nosso portfólio completo para escolher a solução ideal.
          </p>
          <Link
            to="/servicos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0C482B] text-white font-semibold text-sm hover:bg-[#093821] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Ver todos os serviços</span>
          </Link>
        </div>
      </section>
    );
  }

  const relatedServices = service.relatedSlugs
    .map((relSlug) => getServiceBySlug(relSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const scrollToServiceQuote = (targetTitle = service.title) => {
    setQuoteService(targetTitle);
    const el = document.getElementById('orcamento-detalhe');
    if (el) el.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      {/* 1. Unique Hero Section with Breadcrumb */}
      <PageHeader
        kicker={`${service.code} · ${service.idealFor}`}
        title={service.title}
        description={service.shortDescription}
        image={service.image}
        imageAlt={service.imageAlt}
        breadcrumbs={[
          {label: 'Início', to: '/'},
          {label: 'Serviços', to: '/servicos'},
          {label: service.title},
        ]}
        actions={
          <>
            <button
              type="button"
              onClick={() => scrollToServiceQuote(service.title)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-sm sm:text-base hover:bg-[#87DF5A] transition-colors cursor-pointer"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <Link
              to="/servicos"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-white/35 bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Todos os serviços</span>
            </Link>
          </>
        }
      />

      {/* 2. Service Introduction & 3. What is Included */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-6">
              <p className="text-sm font-semibold text-[#0C482B] mb-2">
                Sobre este serviço
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#17251D] mb-4 text-balance">
                Execução adaptada à realidade do seu espaço em Maputo.
              </h2>
              <p className="text-base text-[#17251D]/80 leading-relaxed mb-6">
                {service.introParagraph}
              </p>

              {service.complianceNote && (
                <div className="p-4 rounded-xl bg-[#F7F9F7] border border-[#0C482B]/20 flex items-start gap-3 text-sm text-[#17251D]/85 leading-relaxed">
                  <Info
                    className="w-5 h-5 text-[#0C482B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{service.complianceNote}</span>
                </div>
              )}
            </div>

            <div className="lg:col-span-6 bg-[#F7F9F7] rounded-2xl p-6 sm:p-8 border border-[#17251D]/10">
              <h3 className="font-display text-xl font-bold text-[#17251D] mb-5">
                O que está incluído
              </h3>
              <ul className="space-y-3.5">
                {service.includedItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm sm:text-base text-[#17251D]/85"
                  >
                    <span className="w-6 h-6 rounded-md bg-[#78D34B]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check
                        className="w-4 h-4 text-[#0C482B]"
                        aria-hidden="true"
                      />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Benefits */}
      <section className="bg-[#F7F9F7] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Principais Benefícios
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#17251D] text-balance">
              Por que escolher a iClean para {service.title.toLowerCase()}?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="bg-white rounded-xl p-6 sm:p-7 border border-[#17251D]/10"
              >
                <div className="w-10 h-10 rounded-lg bg-[#78D34B]/25 flex items-center justify-center mb-4">
                  <ShieldCheck
                    className="w-5 h-5 text-[#0C482B]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-[#17251D] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#17251D]/75 leading-relaxed">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How the Service Works */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Método Operacional
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#17251D]">
              Como funciona o serviço
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.howItWorks.map((step) => (
              <article
                key={step.number}
                className="bg-[#F7F9F7] rounded-xl p-6 border border-[#17251D]/10"
              >
                <span className="font-display text-2xl font-bold text-[#0C482B] tabular-nums block mb-3">
                  {step.number}.
                </span>
                <h3 className="font-display text-lg font-semibold text-[#17251D] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#17251D]/75 leading-relaxed">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#17251D]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={service.faqs}
            title={`Perguntas frequentes sobre ${service.title}`}
          />
        </div>
      </section>

      {/* 7. Related Services */}
      <section className="bg-[#F7F9F7] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#0C482B] mb-1">
                Soluções Complementares
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#17251D]">
                Serviços relacionados
              </h2>
            </div>
            <Link
              to="/servicos"
              className="text-sm font-semibold text-[#0C482B] hover:underline"
            >
              Ver todos os serviços
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <ServiceCard
                key={rel.slug}
                service={rel}
                showIncludedList={false}
                onRequestQuote={(title) => scrollToServiceQuote(title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Strong Quotation CTA + Integrated Form */}
      <CtaBanner
        kicker="Pronto para começar?"
        headline={`Solicite um orçamento para ${service.title.toLowerCase()}.`}
        description="Preencha os dados abaixo para receber uma proposta clara e ajustada ao seu espaço em Maputo."
        buttonLabel="Preencher pedido agora"
        onAction={() => scrollToServiceQuote(service.title)}
      />

      <QuotationSection
        sectionId="orcamento-detalhe"
        preselectedService={quoteService}
      />
    </>
  );
};
