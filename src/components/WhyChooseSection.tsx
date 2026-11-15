import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {Clock, Leaf, Sparkles, Users} from 'lucide-react';
import {WHY_CHOOSE_FEATURES, FeatureItem} from '../data/icleanData';

const iconMap: Record<FeatureItem['iconName'], React.ReactNode> = {
  Users: <Users className="w-6 h-6 text-[#0C482B]" aria-hidden="true" />,
  Clock: <Clock className="w-6 h-6 text-[#0C482B]" aria-hidden="true" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#0C482B]" aria-hidden="true" />,
  Leaf: <Leaf className="w-6 h-6 text-[#0C482B]" aria-hidden="true" />,
};

export const WhyChooseSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="bg-white py-20 lg:py-24 border-b border-[#17251D]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-sm font-semibold text-[#0C482B] mb-2">
            Compromisso iClean
          </p>
          <h2
            id="why-choose-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] text-balance"
          >
            Porque escolher os nossos serviços?
          </h2>
          <p className="mt-4 text-base text-[#17251D]/75 leading-relaxed">
            Combinamos rigor operacional, equipas preparadas e práticas
            sustentáveis para garantir espaços sempre impecáveis em Maputo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_FEATURES.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-40px'}}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-[#F7F9F7] rounded-xl p-6 sm:p-7 border border-[#17251D]/10 hover:border-[#0C482B]/30 hover:bg-white transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-[#78D34B]/25 flex items-center justify-center mb-5 group-hover:bg-[#78D34B]/40 transition-colors duration-200">
                {iconMap[feature.iconName]}
              </div>
              <h3 className="font-display text-lg font-semibold text-[#17251D] mb-2.5">
                {feature.title}
              </h3>
              <p className="text-sm text-[#17251D]/75 leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
