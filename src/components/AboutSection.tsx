import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Award, MapPin, ShieldCheck} from 'lucide-react';
import {ABOUT_MEDIA} from '../data/icleanData';
import {Link} from '../router/RouterContext';
import {SafeImage} from './SafeImage';

interface AboutSectionProps {
  onRequestQuote: () => void;
  onGlobalBackground?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onRequestQuote,
  onGlobalBackground = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className={`py-20 lg:py-28 scroll-mt-16 border-b ${
        onGlobalBackground
          ? 'bg-transparent border-white/12'
          : 'bg-white border-[#17251D]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Team Photography Column */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-40px'}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 min-h-[340px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-[#0C482B] shadow-xl border border-white/15"
          >
            <SafeImage
              src={ABOUT_MEDIA.image}
              alt={ABOUT_MEDIA.alt}
              fallbackTitle="Equipa profissional iClean em Maputo"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          {/* Editorial Content Column */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-40px'}}
            transition={{duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className={`lg:col-span-6 flex flex-col justify-center ${
              onGlobalBackground
                ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F7FCF6] to-[#EAF6E7] rounded-2xl p-7 sm:p-10 shadow-[0_16px_36px_-14px_rgba(6,31,19,0.4)] border border-[#78D34B]/30 text-[#17251D]'
                : 'py-2'
            }`}
          >
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Sobre a iClean
            </p>
            <h2
              id="about-heading"
              className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance mb-5 ${
                onGlobalBackground ? 'text-[#0C482B]' : 'text-[#17251D]'
              }`}
            >
              Uma equipa comprometida com ambientes melhores.
            </h2>

            <p className="text-base text-[#17251D]/82 leading-relaxed mb-4">
              A iClean nasce em Maputo com um propósito claro: elevar o padrão
              de limpeza, higienização e conservação de espaços empresariais,
              residenciais e de eventos em Moçambique.
            </p>
            <p className="text-base text-[#17251D]/82 leading-relaxed mb-8">
              Acreditamos que um ambiente bem cuidado transmite confiança, protege
              a saúde de quem o utiliza e reflete respeito por cada cliente. Por
              isso, investimos continuamente em formação técnica, fardamento
              profissional, equipamentos adequados e práticas sustentáveis de
              gestão de resíduos.
            </p>

            {/* Clean hairline standards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-6 border-y border-[#17251D]/12 mb-8">
              <div>
                <div className="flex items-center gap-2 text-[#0C482B] font-semibold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Supervisão ativa</span>
                </div>
                <p className="text-xs text-[#17251D]/72 leading-relaxed">
                  Acompanhamento operacional e verificação de cada entrega.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#0C482B] font-semibold text-sm mb-1">
                  <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Padrão rigoroso</span>
                </div>
                <p className="text-xs text-[#17251D]/72 leading-relaxed">
                  Produtos seguros e métodos específicos por tipo de superfície.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#0C482B] font-semibold text-sm mb-1">
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Base em Maputo</span>
                </div>
                <p className="text-xs text-[#17251D]/72 leading-relaxed">
                  Atendimento ágil na Cidade de Maputo e arredores.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0C482B] text-white font-semibold text-sm hover:bg-[#093821] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B]"
              >
                <span>Falar com a nossa equipa</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <Link
                to="/sobre-nos"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg border border-[#17251D]/20 text-[#17251D] font-semibold text-sm hover:bg-[#F7F9F7] transition-colors"
              >
                Sobre a iClean
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
