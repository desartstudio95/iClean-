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

export const HowItWorksSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-[#F7F9F7] py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-14">
          <p className="text-sm font-semibold text-[#0C482B] mb-2">
            Como Funciona
          </p>
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] text-balance"
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
              className="bg-white rounded-xl p-6 sm:p-7 border border-[#17251D]/10 flex flex-col"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-display text-3xl font-bold text-[#0C482B] tabular-nums">
                  {step.number}.
                </span>
                <div className="w-11 h-11 rounded-lg bg-[#78D34B]/25 flex items-center justify-center shrink-0">
                  {stepIcons[step.iconName]}
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-[#17251D] mb-2.5">
                {step.number}. {step.title}
              </h3>
              <p className="text-sm text-[#17251D]/75 leading-relaxed">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
