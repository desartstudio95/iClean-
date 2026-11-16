import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Check} from 'lucide-react';
import {IMAGES} from '../assets/images';
import {EVENT_STAGES} from '../data/icleanData';
import {Link} from '../router/RouterContext';
import {SafeImage} from './SafeImage';

interface EventsSectionProps {
  onBookEventCleaning: () => void;
  onGlobalBackground?: boolean;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onBookEventCleaning,
  onGlobalBackground = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="eventos"
      aria-labelledby="events-heading"
      className={`relative py-24 lg:py-28 overflow-hidden text-white scroll-mt-16 ${
        onGlobalBackground
          ? 'bg-[#0C482B]/55 backdrop-blur-[2px] border-b border-white/12'
          : 'bg-[#082416]'
      }`}
    >
      {/* Only render separate backdrop image when NOT using global homepage background */}
      {!onGlobalBackground && (
        <div className="absolute inset-0">
          <SafeImage
            src={IMAGES.serviceEventsVenue}
            alt="Equipa profissional da iClean em operação de limpeza num recinto de concerto ao ar livre"
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#072415]/92 via-[#0A3420]/88 to-[#072415]/95"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-sm font-semibold text-[#78D34B] mb-3">
            Especialidade em Limpeza de Eventos
          </p>
          <h2
            id="events-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] text-balance mb-5"
          >
            Você realiza o evento. Nós devolvemos o espaço limpo.
          </h2>
          <p className="text-base sm:text-lg text-white/88 leading-relaxed max-w-2xl">
            De festivais ao ar livre e concertos a conferências empresariais em
            Maputo, asseguramos uma operação discreta e completa em todas as
            fases do seu evento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {EVENT_STAGES.map((stage, index) => (
            <motion.article
              key={stage.title}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-40px'}}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#082416]/78 backdrop-blur-sm border border-white/15 rounded-xl p-7 flex flex-col"
            >
              <p className="text-xs font-semibold text-[#78D34B] mb-2">
                {stage.phase}
              </p>
              <h3 className="font-display text-xl font-bold tracking-tight text-white mb-2">
                {stage.title}
              </h3>
              <p className="text-sm text-white/88 font-medium mb-5">
                {stage.description}
              </p>
              <ul className="space-y-2.5 mt-auto pt-4 border-t border-white/12">
                {stage.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-white/82 leading-relaxed"
                  >
                    <Check
                      className="w-4 h-4 text-[#78D34B] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onBookEventCleaning}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-base hover:bg-[#87DF5A] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78D34B]"
          >
            <span>Contratar limpeza para eventos</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <Link
            to="/eventos"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg border border-white/35 bg-white/10 text-white font-medium text-base hover:bg-white/20 transition-colors whitespace-nowrap"
          >
            <span>Ver página de eventos</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
