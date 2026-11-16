import React, {useEffect, useState} from 'react';
import {IMAGES} from '../assets/images';

interface BackgroundSlide {
  id: string;
  src: string;
  alt: string;
  objectPositionClass: string;
}

const SLIDES: BackgroundSlide[] = [
  {
    id: 'commercial-offices',
    src: IMAGES.heroCommercialCleaning,
    alt: 'Limpeza de escritórios e edifícios comerciais pela equipa iClean',
    objectPositionClass: 'object-center sm:object-center',
  },
  {
    id: 'residential-modern',
    src: IMAGES.serviceResidentialVilla,
    alt: 'Limpeza residencial moderna com atenção aos detalhes',
    objectPositionClass: 'object-[60%_center] sm:object-center',
  },
  {
    id: 'events-venues',
    src: IMAGES.serviceEventsVenue,
    alt: 'Limpeza profissional de eventos e grandes espaços ao ar livre',
    objectPositionClass: 'object-center sm:object-center',
  },
  {
    id: 'post-construction',
    src: IMAGES.servicePostConstruction,
    alt: 'Limpeza pós-obra e higienização técnica de ambientes',
    objectPositionClass: 'object-[45%_center] sm:object-center',
  },
];

const SLIDE_INTERVAL_MS = 6000;

export const LandingBackgroundSlideshow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Preload the next slide before transition for seamless crossfade
  useEffect(() => {
    if (prefersReducedMotion) return;
    const nextIdx = (activeIndex + 1) % SLIDES.length;
    const img = new Image();
    img.src = SLIDES[nextIdx].src;
  }, [activeIndex, prefersReducedMotion]);

  // Automatic 6-second slideshow interval (paused when reduced motion is preferred)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#061F13]"
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;
        // When reduced motion is enabled, only render the initial slide statically
        if (prefersReducedMotion && index !== 0) {
          return null;
        }

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 will-change-[opacity] ${
              prefersReducedMotion
                ? ''
                : 'transition-opacity duration-[1600ms] ease-in-out'
            } ${isActive ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.src}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding={index === 0 ? 'sync' : 'async'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              className={`w-full h-full object-cover ${slide.objectPositionClass} ${
                isActive && !prefersReducedMotion ? 'iclean-ken-burns' : ''
              }`}
            />
          </div>
        );
      })}

      {/* Consistent dark-green translucent overlay for high readability across all slides */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061F13]/74 via-[#082819]/78 to-[#051B10]/88" />
      <div className="absolute inset-0 bg-[#0C482B]/26" />
    </div>
  );
};
