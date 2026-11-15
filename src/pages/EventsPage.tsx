import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Check, Sparkles} from 'lucide-react';
import {EventQuotationSection} from '../components/EventQuotationSection';
import {PageHeader} from '../components/PageHeader';
import {SafeImage} from '../components/SafeImage';
import {EVENTS_PAGE_DATA} from '../data/pagesData';
import {useDocumentMetadata} from '../hooks/useDocumentMetadata';

export const EventsPage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  useDocumentMetadata({
    title: 'Limpeza de Eventos em Moçambique | Concertos e Casamentos | iClean',
    description:
      'Operação completa de limpeza antes, durante e após concertos, festivais, casamentos, feiras e eventos corporativos em Maputo e Moçambique.',
    path: '/eventos',
    breadcrumbs: [
      {name: 'Início', item: '/'},
      {name: 'Eventos', item: '/eventos'},
    ],
  });

  const scrollToEventForm = () => {
    const el = document.getElementById('orcamento-evento');
    if (el) el.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      <PageHeader
        kicker={EVENTS_PAGE_DATA.hero.kicker}
        title={EVENTS_PAGE_DATA.hero.headline}
        description={EVENTS_PAGE_DATA.hero.supportingText}
        image={EVENTS_PAGE_DATA.hero.image}
        imageAlt={EVENTS_PAGE_DATA.hero.imageAlt}
        breadcrumbs={[{label: 'Início', to: '/'}, {label: 'Eventos'}]}
        actions={
          <button
            type="button"
            onClick={scrollToEventForm}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-base hover:bg-[#87DF5A] transition-colors cursor-pointer"
          >
            <span>Solicitar orçamento para o meu evento</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        }
      />

      {/* 3 Prominent Service Stages */}
      <section
        aria-labelledby="event-stages-heading"
        className="bg-white py-20 lg:py-24 border-b border-[#17251D]/8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 lg:mb-14">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Operação em Três Fases
            </p>
            <h2
              id="event-stages-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] text-balance"
            >
              Acompanhamento completo antes, durante e depois do evento.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {EVENTS_PAGE_DATA.stages.map((stage, index) => (
              <motion.article
                key={stage.title}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-40px'}}
                transition={{
                  duration: 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[#F7F9F7] rounded-2xl p-7 border border-[#17251D]/10 flex flex-col"
              >
                <p className="text-xs font-semibold text-[#0C482B] mb-2">
                  {stage.code}
                </p>
                <h3 className="font-display text-2xl font-bold text-[#17251D] mb-2">
                  {stage.title}
                </h3>
                <p className="text-sm text-[#17251D]/75 mb-6">
                  {stage.subtitle}
                </p>

                <ul className="space-y-3 pt-5 border-t border-[#17251D]/10 mt-auto">
                  {stage.items.map((item) => (
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Event Environments Photography Showcase */}
      <section className="bg-[#F7F9F7] py-16 lg:py-20 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Equipas em Campo
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#17251D]">
              Preparados para recintos interiores e ao ar livre.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS_PAGE_DATA.showcaseGallery.map((item) => (
              <article
                key={item.title}
                className="bg-white rounded-xl overflow-hidden border border-[#17251D]/10"
              >
                <div className="aspect-[4/3] bg-[#E5ECE6] overflow-hidden">
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[#0C482B] mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-display text-base font-bold text-[#17251D]">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types Attended */}
      <section
        aria-labelledby="event-types-heading"
        className="bg-white py-20 lg:py-24 border-b border-[#17251D]/8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Formatos e Recintos
            </p>
            <h2
              id="event-types-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] text-balance"
            >
              Que tipo de eventos atendemos?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EVENTS_PAGE_DATA.eventTypes.map((type) => (
              <article
                key={type.title}
                className="bg-[#F7F9F7] rounded-xl p-6 border border-[#17251D]/10 hover:border-[#0C482B]/30 transition-colors"
              >
                <Sparkles
                  className="w-5 h-5 text-[#0C482B] mb-3"
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg font-bold text-[#17251D] mb-1.5">
                  {type.title}
                </h3>
                <p className="text-sm text-[#17251D]/75 leading-relaxed">
                  {type.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How Contracting Works */}
      <section
        aria-labelledby="event-contracting-heading"
        className="bg-[#F7F9F7] py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Processo Ágil
            </p>
            <h2
              id="event-contracting-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D]"
            >
              Como funciona a contratação?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVENTS_PAGE_DATA.contractingSteps.map((step) => (
              <article
                key={step.number}
                className="bg-white rounded-xl p-6 border border-[#17251D]/10"
              >
                <span className="font-display text-sm font-bold text-[#0C482B] block mb-2">
                  {step.number}
                </span>
                <h3 className="font-display text-lg font-bold text-[#17251D] mb-2">
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

      {/* Dedicated Event Quotation Form */}
      <EventQuotationSection />
    </>
  );
};
