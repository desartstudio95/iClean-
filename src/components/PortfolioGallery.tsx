import React, {useEffect, useState} from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  MapPin,
  X,
  ZoomIn,
} from 'lucide-react';
import {SafeImage} from './SafeImage';

export type PortfolioCategory =
  | 'todos'
  | 'residencial'
  | 'empresarial'
  | 'eventos'
  | 'pos-obra'
  | 'condominios';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'todos'>;
  categoryLabel: string;
  description: string;
  location?: string;
  completionDate?: string;
  image: string;
  imageAlt: string;
  isDemonstration: boolean;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-res',
    title: 'Higienização Residencial Completa',
    category: 'residencial',
    categoryLabel: 'Residencial',
    description:
      'Limpeza detalhada de cozinha, bancadas em pedra natural, sala de estar e zonas de convívio familiar.',
    location: 'Maputo (Exemplo ilustrativo)',
    image: '/src/assets/images/service_residential_villa_1794778187196.jpg',
    imageAlt:
      'Profissional de limpeza em uniforme verde a higienizar cozinha e bancada residencial',
    isDemonstration: true,
  },
  {
    id: 'port-emp',
    title: 'Salas Corporativas e Áreas de Reunião',
    category: 'empresarial',
    categoryLabel: 'Empresarial',
    description:
      'Manutenção de mesas de vidro, pavimentos em madeira, receção e estações de trabalho em escritórios.',
    location: 'Maputo (Exemplo ilustrativo)',
    image: '/src/assets/images/service_corporate_office_1794778186887.jpg',
    imageAlt:
      'Limpeza profissional de sala de reuniões corporativa com mesa de vidro e soalho limpo',
    isDemonstration: true,
  },
  {
    id: 'port-evt-1',
    title: 'Operação de Limpeza em Festival ao Ar Livre',
    category: 'eventos',
    categoryLabel: 'Eventos',
    description:
      'Equipa dedicada em campo para recolha contínua, organização de pontos de triagem e restauro do recinto.',
    location: 'Moçambique (Exemplo ilustrativo)',
    image: '/src/assets/images/service_events_venue_1794778188286.jpg',
    imageAlt:
      'Equipa uniformizada a recolher e separar resíduos num recinto de concerto ao ar livre',
    isDemonstration: true,
  },
  {
    id: 'port-pos',
    title: 'Acabamento Técnico Pós-Construção',
    category: 'pos-obra',
    categoryLabel: 'Pós-Obra',
    description:
      'Aspiração de poeiras finas e limpeza de vidros altos para preparação de imóvel recém-construído.',
    location: 'Maputo (Exemplo ilustrativo)',
    image: '/src/assets/images/service_post_construction_1794778186552.jpg',
    imageAlt:
      'Limpeza pós-obra com aspirador técnico e limpeza de grandes envidraçados',
    isDemonstration: true,
  },
  {
    id: 'port-condo',
    title: 'Conservação de Átrio e Escadas de Condomínio',
    category: 'condominios',
    categoryLabel: 'Condomínios',
    description:
      'Higienização de corrimãos, elevadores, entradas principais e zonas comuns de circulação.',
    location: 'Maputo (Exemplo ilustrativo)',
    image: '/src/assets/images/service_condominium_lobby_1794778187122.jpg',
    imageAlt:
      'Colaboradora a desinfetar corrimão de vidro e inox no átrio de um condomínio',
    isDemonstration: true,
  },
  {
    id: 'port-evt-2',
    title: 'Preparação de Espaço para Casamentos e Receções',
    category: 'eventos',
    categoryLabel: 'Eventos',
    description:
      'Cuidado pré-evento em tendas, mesas de receção e pavimentos exteriores antes da chegada dos convidados.',
    location: 'Maputo (Exemplo ilustrativo)',
    image: '/src/assets/images/events_wedding_reception_1794778935162.jpg',
    imageAlt:
      'Preparação e limpeza de mesas de vidro e pavimento em pavilhão de receção de casamento',
    isDemonstration: true,
  },
  {
    id: 'port-emp-2',
    title: 'Átrios Empresariais de Grande Circulação',
    category: 'empresarial',
    categoryLabel: 'Empresarial',
    description:
      'Conservação diária de átrios comerciais, pavimentos em pedra polida e acessos principais.',
    location: 'Maputo (Exemplo ilustrativo)',
    image: '/src/assets/images/hero_commercial_cleaning_1794778185906.jpg',
    imageAlt:
      'Equipa iClean a manter pavimento polido e vidros de átrio corporativo moderno',
    isDemonstration: true,
  },
  {
    id: 'port-evt-3',
    title: 'Conferências e Exposições Empresariais',
    category: 'eventos',
    categoryLabel: 'Eventos',
    description:
      'Apoio contínuo em centros de convenções, limpeza de vidros e organização de pontos de recolha.',
    location: 'Maputo (Exemplo ilustrativo)',
    image: '/src/assets/images/events_corporate_conference_1794778934975.jpg',
    imageAlt:
      'Higienização de portas de vidro e átrio durante conferência corporativa',
    isDemonstration: true,
  },
];

const CATEGORY_TABS: {key: PortfolioCategory; label: string}[] = [
  {key: 'todos', label: 'Todos'},
  {key: 'residencial', label: 'Residencial'},
  {key: 'empresarial', label: 'Empresarial'},
  {key: 'eventos', label: 'Eventos'},
  {key: 'pos-obra', label: 'Pós-Obra'},
  {key: 'condominios', label: 'Condomínios'},
];

interface PortfolioGalleryProps {
  items?: PortfolioItem[];
  maxItems?: number;
  onDarkCanvas?: boolean;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items = PORTFOLIO_ITEMS,
  maxItems,
  onDarkCanvas = false,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>('todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === 'todos'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const visibleItems = maxItems
    ? filteredItems.slice(0, maxItems)
    : filteredItems;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  return (
    <div>
      {/* Honest demonstration notice */}
      <div
        className={`flex items-start sm:items-center gap-2.5 text-xs mb-6 rounded-xl px-4 py-3 ${
          onDarkCanvas
            ? 'text-white/88 bg-[#082416]/75 backdrop-blur-sm border border-white/15'
            : 'text-[#17251D]/75 bg-[#F7F9F7] border border-[#17251D]/10'
        }`}
      >
        <Info
          className={`w-4 h-4 shrink-0 mt-0.5 sm:mt-0 ${
            onDarkCanvas ? 'text-[#78D34B]' : 'text-[#0C482B]'
          }`}
          aria-hidden="true"
        />
        <span>
          As imagens abaixo são referências visuais de demonstração do padrão de
          serviço iClean e estão preparadas para substituição por fotografias de
          projetos concluídos autorizados.
        </span>
      </div>

      {/* Category Filter Controls */}
      <div
        role="tablist"
        aria-label="Filtrar galeria por categoria"
        className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl w-fit mb-8 ${
          onDarkCanvas
            ? 'bg-white/12 backdrop-blur-sm border border-white/20'
            : 'bg-[#F7F9F7] border border-[#17251D]/10'
        }`}
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setSelectedCategory(tab.key);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
                onDarkCanvas
                  ? `focus-visible:outline-[#78D34B] ${
                      isActive
                        ? 'bg-[#78D34B] text-[#092E1B] shadow-xs'
                        : 'text-white/90 hover:text-white hover:bg-white/15'
                    }`
                  : `focus-visible:outline-[#0C482B] ${
                      isActive
                        ? 'bg-[#0C482B] text-white shadow-xs'
                        : 'text-[#17251D]/75 hover:text-[#17251D] hover:bg-white/80'
                    }`
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {visibleItems.length === 0 ? (
        <div
          className={`rounded-xl p-10 text-center border ${
            onDarkCanvas
              ? 'bg-white/95 text-[#17251D] border-white/20'
              : 'bg-[#F7F9F7] border-[#17251D]/10'
          }`}
        >
          <p className="text-base font-medium text-[#17251D]">
            Ainda não existem registos nesta categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <article
              key={item.id}
              className={`group rounded-xl overflow-hidden border transition-colors flex flex-col ${
                onDarkCanvas
                  ? 'bg-[#F7F9F7]/96 backdrop-blur-sm border-white/20 hover:border-[#78D34B]/60'
                  : 'bg-[#F7F9F7] border-[#17251D]/10 hover:border-[#0C482B]/35'
              }`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Ampliar imagem: ${item.title}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5ECE6] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B]"
              >
                <SafeImage
                  src={item.image}
                  alt={item.imageAlt}
                  width={800}
                  height={600}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-white/92 text-[#0C482B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                >
                  <ZoomIn className="w-4 h-4" />
                </div>
              </button>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#17251D]/70 mb-1.5">
                  <span className="font-semibold text-[#0C482B]">
                    {item.categoryLabel}
                  </span>
                  {item.location && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-lg font-semibold text-[#17251D] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#17251D]/75 leading-relaxed">
                  {item.description}
                </p>

                {item.completionDate && (
                  <p className="mt-3 pt-3 border-t border-[#17251D]/8 flex items-center gap-1.5 text-xs text-[#17251D]/65">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{item.completionDate}</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Accessible Lightbox Viewer */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização: ${activeLightboxItem.title}`}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D12]/85 backdrop-blur-xs"
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-[#17251D]">
              <SafeImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.imageAlt}
                eager
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fechar visualização ampliada"
                className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/95 text-[#17251D] hover:bg-white flex items-center justify-center shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C482B]"
              >
                <X className="w-5 h-5" />
              </button>

              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visibleItems.length) %
                          visibleItems.length
                      )
                    }
                    aria-label="Imagem anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-white/90 text-[#17251D] hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % visibleItems.length)
                    }
                    aria-label="Próxima imagem"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-white/90 text-[#17251D] hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#0C482B] font-semibold mb-1">
                <span>{activeLightboxItem.categoryLabel}</span>
                {activeLightboxItem.location && (
                  <span className="inline-flex items-center gap-1 text-[#17251D]/70 font-normal">
                    <span aria-hidden="true">·</span>
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {activeLightboxItem.location}
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl font-bold text-[#17251D]">
                {activeLightboxItem.title}
              </h3>
              <p className="text-sm text-[#17251D]/78 mt-1.5 leading-relaxed">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
