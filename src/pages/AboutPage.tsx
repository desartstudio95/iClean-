import React from 'react';
import {Check, Compass, Leaf, ShieldCheck, Target} from 'lucide-react';
import {CtaBanner} from '../components/CtaBanner';
import {PageHeader} from '../components/PageHeader';
import {SafeImage} from '../components/SafeImage';
import {ABOUT_PAGE_DATA} from '../data/pagesData';
import {useDocumentMetadata} from '../hooks/useDocumentMetadata';
import {useRouter} from '../router/RouterContext';

export const AboutPage: React.FC = () => {
  const {navigate} = useRouter();

  useDocumentMetadata({
    title: 'Sobre Nós | Empresa de Limpeza em Maputo | iClean',
    description:
      'Conheça a iClean, a nossa missão, visão, valores e compromisso com ambientes mais limpos, saudáveis e organizados em Maputo, Moçambique.',
    path: '/sobre-nos',
    breadcrumbs: [
      {name: 'Início', item: '/'},
      {name: 'Sobre Nós', item: '/sobre-nos'},
    ],
  });

  return (
    <>
      <PageHeader
        kicker={ABOUT_PAGE_DATA.hero.kicker}
        title={ABOUT_PAGE_DATA.hero.headline}
        description={ABOUT_PAGE_DATA.hero.supportingText}
        image={ABOUT_PAGE_DATA.hero.image}
        imageAlt={ABOUT_PAGE_DATA.hero.imageAlt}
        breadcrumbs={[{label: 'Início', to: '/'}, {label: 'Sobre Nós'}]}
      />

      {/* SECTION 1 — WHO WE ARE */}
      <section className="bg-white py-20 lg:py-24 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-semibold text-[#0C482B] mb-2">
                Apresentação Institucional
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] mb-5">
                {ABOUT_PAGE_DATA.whoWeAre.title}
              </h2>
              <div className="space-y-4 text-base text-[#17251D]/80 leading-relaxed">
                {ABOUT_PAGE_DATA.whoWeAre.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 min-h-[320px] lg:min-h-[420px] rounded-2xl overflow-hidden bg-[#F7F9F7]">
              <SafeImage
                src={ABOUT_PAGE_DATA.whoWeAre.secondaryImage}
                alt={ABOUT_PAGE_DATA.whoWeAre.secondaryImageAlt}
                fallbackTitle="Supervisão operacional iClean"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3 — MISSION & VISION */}
      <section className="bg-[#F7F9F7] py-16 lg:py-20 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <article className="bg-white rounded-2xl p-8 sm:p-10 border border-[#17251D]/10">
              <div className="w-12 h-12 rounded-xl bg-[#78D34B]/25 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-[#0C482B]" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#17251D] mb-3">
                {ABOUT_PAGE_DATA.mission.title}
              </h2>
              <p className="text-base sm:text-lg text-[#17251D]/82 leading-relaxed">
                “{ABOUT_PAGE_DATA.mission.statement}”
              </p>
            </article>

            <article className="bg-white rounded-2xl p-8 sm:p-10 border border-[#17251D]/10">
              <div className="w-12 h-12 rounded-xl bg-[#78D34B]/25 flex items-center justify-center mb-5">
                <Compass className="w-6 h-6 text-[#0C482B]" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#17251D] mb-3">
                {ABOUT_PAGE_DATA.vision.title}
              </h2>
              <p className="text-base sm:text-lg text-[#17251D]/82 leading-relaxed">
                “{ABOUT_PAGE_DATA.vision.statement}”
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR VALUES */}
      <section className="bg-white py-20 lg:py-24 border-b border-[#17251D]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-semibold text-[#0C482B] mb-2">
              Princípios Orientadores
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D]">
              Os Nossos Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ABOUT_PAGE_DATA.values.map((val) => (
              <article
                key={val.title}
                className="bg-[#F7F9F7] rounded-xl p-6 sm:p-7 border border-[#17251D]/10"
              >
                <div className="w-10 h-10 rounded-lg bg-[#78D34B]/25 flex items-center justify-center mb-4">
                  <ShieldCheck
                    className="w-5 h-5 text-[#0C482B]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-[#17251D] mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-[#17251D]/75 leading-relaxed">
                  {val.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — OUR COMMITMENT */}
      <section className="bg-[#F7F9F7] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-[#0C482B] mb-2">
                Padrão de Serviço
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17251D] mb-4 text-balance">
                O Nosso Compromisso
              </h2>
              <p className="text-base text-[#17251D]/78 leading-relaxed mb-6">
                Cada operação é planeada para garantir consistência, respeito
                pelas instalações e práticas responsáveis em todas as etapas.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0C482B]">
                <Leaf className="w-4 h-4" aria-hidden="true" />
                <span>Limpeza • Higiene • Sustentabilidade</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {ABOUT_PAGE_DATA.commitments.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-5 sm:p-6 border border-[#17251D]/10 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#78D34B]/25 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#0C482B]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#17251D] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#17251D]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <CtaBanner
        kicker="Fale Connosco"
        headline={ABOUT_PAGE_DATA.cta.headline}
        description={ABOUT_PAGE_DATA.cta.description}
        buttonLabel={ABOUT_PAGE_DATA.cta.buttonLabel}
        onAction={() => navigate('/contactos')}
      />
    </>
  );
};
