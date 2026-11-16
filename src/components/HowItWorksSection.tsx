import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {
  CheckCircle2,
  ClipboardCheck,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import {PROCESS_STEPS, ProcessStep} from '../data/icleanData';

const stepIcons: Record<ProcessStep['iconName'], React.ReactNode> = {
  MessageSquare: <MessageSquare className="w-5 h-5 text-[#0C482B]" aria-hidden="true" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5 text-[#0C482B]" aria-hidden="true" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#0C482B]" aria-hidden="true" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-[#0C482B]" aria-hidden="true" />,
};

interface HowItWorksSectionProps {
  onGlobalBackground?: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onGlobalBackground = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className={`py-20 lg:py-24 ${
        onGlobalBackground
          ? 'bg-[#061F13]/25 border-b border-white/12'
          : 'bg-[#F7F9F7]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-14">
          <p
            className={`text-sm font-semibold mb-2 ${
              onGlobalBackground ? 'text-[#78D34B]' : 'text-[#0C482B]'
            }`}
          >
            Como Funciona
          </p>
          <h2
            id="how-it-works-heading"
            className={`font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
              onGlobalBackground ? 'text-white' : 'text-[#17251D]'
            }`}
          >
            Um processo simples do primeiro contacto à entrega.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-40px'}}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group rounded-2xl p-6 sm:p-7 border flex flex-col transition-all duration-300 ease-out ${
                onGlobalBackground
                  ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F7FCF6] to-[#EAF6E7] border-[#78D34B]/30 shadow-[0_12px_28px_-12px_rgba(6,31,19,0.35)] hover:shadow-[0_20px_40px_-14px_rgba(12,72,43,0.42)] hover:border-[#78D34B]/65 motion-safe:hover:-translate-y-1'
                  : 'bg-white border-[#17251D]/10'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-display text-3xl font-bold text-[#0C482B] tabular-nums">
                  {step.number}.
                </span>
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    onGlobalBackground
                      ? 'bg-gradient-to-br from-[#EAF6E7] to-[#78D34B]/35 border border-[#78D34B]/45 group-hover:to-[#78D34B]/55'
                      : 'bg-[#78D34B]/25'
                  }`}
                >
                  {stepIcons[step.iconName]}
                </div>
              </div>

              <h3
                className={`font-display text-xl font-semibold mb-2.5 ${
                  onGlobalBackground ? 'text-[#0C482B]' : 'text-[#17251D]'
                }`}
              >
                {step.number}. {step.title}
              </h3>
              <p className="text-sm text-[#17251D]/82 leading-relaxed">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
