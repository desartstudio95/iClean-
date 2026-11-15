import React from 'react';
import {ArrowRight} from 'lucide-react';

interface CtaBannerProps {
  kicker?: string;
  headline: string;
  description: string;
  buttonLabel: string;
  onAction: () => void;
  secondaryAction?: React.ReactNode;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  kicker,
  headline,
  description,
  buttonLabel,
  onAction,
  secondaryAction,
}) => {
  return (
    <section className="bg-[#0C482B] text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {kicker && (
              <p className="text-sm font-semibold text-[#78D34B] mb-2">
                {kicker}
              </p>
            )}
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance mb-3">
              {headline}
            </h2>
            <p className="text-base text-white/85 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#78D34B] text-[#092E1B] font-semibold text-base hover:bg-[#87DF5A] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78D34B]"
            >
              <span>{buttonLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            {secondaryAction}
          </div>
        </div>
      </div>
    </section>
  );
};
