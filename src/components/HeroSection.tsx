import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowRight, ChevronDown} from 'lucide-react';
import {HERO_MEDIA} from '../data/icleanData';
import {siteConfig} from '../config/site';
import {SafeImage} from './SafeImage';

interface HeroSectionProps {
  onRequestQuote: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestQuote,
  onExploreServices,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-[680px] lg:min-h-[820px] h-[100svh] max-h-[980px] flex items-center overflow-hidden bg-[#082416]"
    >
      {/* Full-bleed photographic background */}
      <div className="absolute inset-0">
        <SafeImage
          src={HERO_MEDIA.image}
          alt={HERO_MEDIA.alt}
          eager
          className="w-full h-full object-cover object-center"
        />
        {/* Measured contrast scrim for WCAG AA text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#061F13]/92 via-[#0A3420]/75 to-[#0C482B]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#061F13]/70 via-transparent to-[#061F13]/35"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
          className="max-w-2xl"
        >
          {/* Unboxed clean brand tagline + Maputo context */}
          <p className="text-xs sm:text-sm font-medium tracking-wide text-[#78D34B] mb-4">
            {siteConfig.brand.tagline}
            <span className="text-white/60 mx-2" aria-hidden="true">
              ·
            </span>
            <span className="text-white/85">{siteConfig.brand.city}</span>
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-white leading-[1.08] text-balance mb-6">
            O seu espaço limpo.{' '}
            <span className="text-[#78D34B]">A nossa responsabilidade.</span>
          </h1>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mb-8">
            Serviços profissionais de limpeza, higienização e conservação de
            espaços. Cuidamos de cada detalhe para proporcionar ambientes limpos,
            saudáveis e agradáveis.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
            <button
              type="button"
              onClick={onRequestQuote}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-base hover:bg-[#87DF5A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78D34B]"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/40 bg-white/10 backdrop-blur-xs text-white font-medium text-base hover:bg-white/20 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Conhecer os serviços</span>
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
