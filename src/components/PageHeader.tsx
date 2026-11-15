import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ChevronRight} from 'lucide-react';
import {Link} from '../router/RouterContext';
import {SafeImage} from './SafeImage';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  kicker?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  description,
  image,
  imageAlt,
  breadcrumbs,
  actions,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#082416] text-white">
      {image && (
        <div className="absolute inset-0">
          <SafeImage
            src={image}
            alt={imageAlt || title}
            eager
            className="w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#061F13]/94 via-[#0A3420]/84 to-[#0C482B]/55"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#061F13]/75 via-transparent to-[#061F13]/45"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Navegação estrutural" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-white/75">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRight className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                    )}
                    {crumb.to && !isLast ? (
                      <Link
                        to={crumb.to}
                        className="hover:text-[#78D34B] transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-[#78D34B] font-medium" aria-current={isLast ? 'page' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="max-w-3xl"
        >
          {kicker && (
            <p className="text-xs sm:text-sm font-semibold text-[#78D34B] tracking-wide mb-3">
              {kicker}
            </p>
          )}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] text-balance mb-5">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-white/88 leading-relaxed max-w-2xl">
            {description}
          </p>

          {actions && (
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              {actions}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
