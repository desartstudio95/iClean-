import React, {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {FaqItem} from '../data/pagesData';

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  title = 'Perguntas frequentes',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#17251D] mb-6">
        {title}
      </h2>

      <div className="divide-y divide-[#17251D]/10 border-y border-[#17251D]/10">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `faq-panel-${idx}`;
          const btnId = `faq-button-${idx}`;
          return (
            <div key={item.question} className="py-1">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B] rounded"
              >
                <span className="font-display text-base sm:text-lg font-semibold text-[#17251D]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0C482B] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="pb-5 pr-8 text-sm sm:text-base text-[#17251D]/78 leading-relaxed"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
