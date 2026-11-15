import React from 'react';
import {AboutSection} from '../components/AboutSection';
import {EventsSection} from '../components/EventsSection';
import {GallerySection} from '../components/GallerySection';
import {HeroSection} from '../components/HeroSection';
import {HowItWorksSection} from '../components/HowItWorksSection';
import {QuotationSection} from '../components/QuotationSection';
import {ServicesSection} from '../components/ServicesSection';
import {SocialShowcaseSection} from '../components/SocialShowcaseSection';
import {TestimonialsSection} from '../components/TestimonialsSection';
import {WhyChooseSection} from '../components/WhyChooseSection';
import {useDocumentMetadata} from '../hooks/useDocumentMetadata';

interface HomePageProps {
  selectedServiceForQuote: string;
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onScrollToQuote: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  selectedServiceForQuote,
  onSelectServiceForQuote,
  onScrollToQuote,
}) => {
  useDocumentMetadata({
    title: 'iClean | Empresa de Limpeza Profissional em Maputo',
    description:
      'Empresa de limpeza em Maputo. Serviços profissionais de limpeza residencial, escritórios, pós-obra, condomínios, eventos e recolha de resíduos não perigosos.',
    path: '/',
  });

  const scrollToServices = () => {
    const el = document.getElementById('servicos');
    if (el) el.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      <HeroSection
        onRequestQuote={onScrollToQuote}
        onExploreServices={scrollToServices}
      />
      <WhyChooseSection onGlobalBackground />
      <ServicesSection
        onSelectServiceForQuote={onSelectServiceForQuote}
        onGlobalBackground
      />
      <EventsSection
        onBookEventCleaning={() =>
          onSelectServiceForQuote('Limpeza de Eventos')
        }
        onGlobalBackground
      />
      <AboutSection onRequestQuote={onScrollToQuote} onGlobalBackground />
      <HowItWorksSection onGlobalBackground />
      <GallerySection onGlobalBackground />
      <TestimonialsSection onGlobalBackground />
      <SocialShowcaseSection
        onFallbackContact={onScrollToQuote}
        onGlobalBackground
      />
      <QuotationSection
        preselectedService={selectedServiceForQuote}
        onGlobalBackground
      />
    </>
  );
};
