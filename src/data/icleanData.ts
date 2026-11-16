import {IMAGES} from '../assets/images';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Users' | 'Clock' | 'Sparkles' | 'Leaf';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  idealFor: string;
  deliverables: string[];
}

export interface EventStage {
  phase: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconName: 'MessageSquare' | 'ClipboardCheck' | 'ShieldCheck' | 'CheckCircle2';
}

export type GalleryCategory =
  | 'todos'
  | 'empresarial'
  | 'residencial'
  | 'eventos'
  | 'pos-obra'
  | 'comercial';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'todos'>;
  categoryLabel: string;
  location: string;
  image: string;
  imageAlt: string;
}

export interface DemoTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
}

export const HERO_MEDIA = {
  image: IMAGES.heroCommercialCleaning,
  alt: 'Equipa profissional da iClean com fardamento verde a higienizar um átrio comercial moderno em Maputo',
};

export const WHY_CHOOSE_FEATURES: FeatureItem[] = [
  {
    id: 'equipa-profissional',
    title: 'Equipa profissional',
    description:
      'Operadores formados, uniformizados e supervisionados em campo, preparados para atuar em ambientes corporativos, residenciais e de alta circulação.',
    iconName: 'Users',
  },
  {
    id: 'pontualidade-compromisso',
    title: 'Pontualidade e compromisso',
    description:
      'Cumprimento rigoroso de horários e planos operacionais adaptados à rotina da sua empresa, condomínio ou cronograma de evento.',
    iconName: 'Clock',
  },
  {
    id: 'qualidade-detalhes',
    title: 'Qualidade e atenção aos detalhes',
    description:
      'Protocolos técnicos de higienização para superfícies delicadas, vidros, áreas sanitárias e zonas de receção com verificação final.',
    iconName: 'Sparkles',
  },
  {
    id: 'higiene-sustentabilidade',
    title: 'Higiene e sustentabilidade',
    description:
      'Uso consciente de produtos biodegradáveis, dosagem controlada de água e acondicionamento responsável dos resíduos recolhidos.',
    iconName: 'Leaf',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'limpeza-empresarial',
    title: 'Limpeza Empresarial',
    shortDescription:
      'Manutenção diária ou periódica para escritórios, bancos, clínicas e sedes corporativas com máxima discrição.',
    fullDescription:
      'Programas contínuos de higienização e conservação concebidos para ambientes de trabalho produtivos, saudáveis e com imagem irrepreensível perante clientes e colaboradores.',
    image: IMAGES.serviceCorporateOffice,
    imageAlt:
      'Especialista de limpeza em farda verde escura a higienizar mesa de reuniões em escritório moderno',
    idealFor: 'Escritórios, clínicas, instituições e lojas',
    deliverables: [
      'Higienização de estações de trabalho, salas de reunião e receções',
      'Desinfeção rigorosa de instalações sanitárias e copas',
      'Limpeza de vidros interiores, pavimentos e pontos de contacto',
      'Gestão diária de resíduos de escritório e reposição de consumíveis',
    ],
  },
  {
    id: 'limpeza-residencial',
    title: 'Limpeza Residencial',
    shortDescription:
      'Cuidado minucioso para apartamentos e moradias, garantindo conforto, frescura e segurança para a sua família.',
    fullDescription:
      'Serviços pontuais ou recorrentes de limpeza profunda e manutenção doméstica, com produtos seguros para crianças, animais de estimação e acabamentos nobres.',
    image: IMAGES.serviceResidentialVilla,
    imageAlt:
      'Profissional da iClean a limpar bancada de mármore numa residência contemporânea luminosa',
    idealFor: 'Apartamentos, moradias e mudanças',
    deliverables: [
      'Limpeza detalhada de cozinhas, bancadas, eletrodomésticos e loiças sanitárias',
      'Aspiração e tratamento de pavimentos em madeira, pedra ou cerâmica',
      'Remoção de pó em mobiliário, rodapés, caixilhos e varandas',
      'Equipa de confiança com acompanhamento e checklist de entrega',
    ],
  },
  {
    id: 'limpeza-eventos',
    title: 'Limpeza de Eventos',
    shortDescription:
      'Operação completa antes, durante e após concertos, feiras, conferências e celebrações corporativas ou privadas.',
    fullDescription:
      'Cobertura operacional dedicada para eventos de pequena, média e grande escala em Maputo, mantendo o recinto limpo durante toda a programação até à restauração final.',
    image: IMAGES.serviceEventsVenue,
    imageAlt:
      'Equipa coordenada de limpeza em uniforme verde a recolher e separar resíduos num recinto de concerto ao ar livre',
    idealFor: 'Concertos, festivais, conferências e casamentos',
    deliverables: [
      'Preparação completa e higienização de zonas VIP, palco e acessos',
      'Equipa volante contínua para recolha de resíduos e sanitários durante o evento',
      'Triagem, ensacamento e acondicionamento responsável pós-evento',
      'Devolução do espaço nas condições originais dentro do prazo acordado',
    ],
  },
  {
    id: 'limpeza-pos-obra',
    title: 'Limpeza Pós-Obra',
    shortDescription:
      'Remoção técnica de pó fino, cimento, tintas e resíduos de construção para entrega imediata do imóvel.',
    fullDescription:
      'Intervenção especializada após construções ou remodelações, utilizando aspiração industrial HEPA e técnicas seguras para não danificar vidros, alumínios ou pavimentos novos.',
    image: IMAGES.servicePostConstruction,
    imageAlt:
      'Técnicos de limpeza pós-obra em uniforme verde a aspirar pavimento e limpar janelas altas numa obra concluída',
    idealFor: 'Construtoras, arquitetos e imóveis recém-remodelados',
    deliverables: [
      'Remoção segura de respingos de tinta, silicone, gesso e poeiras finas',
      'Limpeza integral de vidraças, calhas, portas e armários embutidos',
      'Lavagem técnica de pavimentos sem abrasão de acabamentos novos',
      'Inspeção final em conjunto com o responsável de obra ou proprietário',
    ],
  },
  {
    id: 'limpeza-condominios',
    title: 'Limpeza de Condomínios',
    shortDescription:
      'Conservação contínua de áreas comuns, átrios, escadas, elevadores, garagens e zonas de lazer.',
    fullDescription:
      'Planos semanais ou diários para edifícios residenciais e empresariais, valorizando o património comum e garantindo higiene impecável aos moradores e visitantes.',
    image: IMAGES.serviceCondominiumLobby,
    imageAlt:
      'Colaboradora da iClean a higienizar corrimão de vidro e aço inox no átrio moderno de um condomínio',
    idealFor: 'Administrações de condomínios e torres residenciais',
    deliverables: [
      'Higienização diária de receções, elevadores, corrimãos e caixas de escada',
      'Lavagem e conservação de garagens, pátios exteriores e zonas de piscina',
      'Controlo de casas de resíduos e higienização de contentores comuns',
      'Relatórios regulares de supervisão para a administração do condomínio',
    ],
  },
  {
    id: 'recolha-residuos',
    title: 'Recolha e Acondicionamento de Resíduos',
    shortDescription:
      'Separação, acondicionamento seguro e encaminhamento organizado de resíduos sólidos para espaços mais sustentáveis.',
    fullDescription:
      'Soluções estruturadas de triagem na origem, acondicionamento sanitário e organização de pontos de recolha para empresas, condomínios e grandes eventos.',
    image: IMAGES.serviceWasteManagement,
    imageAlt:
      'Técnica em uniforme verde a organizar sacos selados numa estação sustentável de triagem e reciclagem',
    idealFor: 'Empresas, centros comerciais, condomínios e eventos',
    deliverables: [
      'Instalação e organização de pontos de separação por tipo de resíduo',
      'Acondicionamento hermético que evita odores e contaminações cruzadas',
      'Higienização periódica de áreas de depósito e contentores',
      'Boas práticas alinhadas com higiene urbana e responsabilidade ambiental',
    ],
  },
];

export const EVENT_STAGES: EventStage[] = [
  {
    phase: 'Etapa 01',
    title: 'ANTES DO EVENTO',
    description: 'Preparação e higienização integral do recinto.',
    highlights: [
      'Limpeza profunda de pavimentos, bancadas, camarins e áreas VIP',
      'Desinfeção preventiva de sanitários e áreas de restauração',
      'Posicionamento estratégico de contentores de recolha seletiva',
    ],
  },
  {
    phase: 'Etapa 02',
    title: 'DURANTE O EVENTO',
    description: 'Manutenção contínua e recolha permanente de resíduos.',
    highlights: [
      'Equipa discreta em circulação constante nas zonas de maior fluxo',
      'Reposição contínua e higienização de casas de banho durante o evento',
      'Esvaziamento regular de papeleiras para evitar acumulação visível',
    ],
  },
  {
    phase: 'Etapa 03',
    title: 'DEPOIS DO EVENTO',
    description: 'Limpeza total e devolução do espaço restaurado.',
    highlights: [
      'Recolha completa de resíduos sólidos, copos, embalagens e estruturas',
      'Lavagem e desodorização integral de todo o recinto e acessos',
      'Entrega final verificada dentro do prazo acordado com a produção',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Contacte-nos',
    description:
      'Partilhe os detalhes do seu espaço, tipo de limpeza pretendido, localização em Maputo e data desejada.',
    iconName: 'MessageSquare',
  },
  {
    number: '02',
    title: 'Avaliamos',
    description:
      'Analisamos a dimensão e especificidade do local para definir a equipa ideal, equipamentos e proposta transparente.',
    iconName: 'ClipboardCheck',
  },
  {
    number: '03',
    title: 'Executamos',
    description:
      'A nossa equipa chega pontualmente uniformizada, com produtos adequados e supervisão rigorosa em cada etapa.',
    iconName: 'ShieldCheck',
  },
  {
    number: '04',
    title: 'Entregamos',
    description:
      'Validamos cada detalhe consigo para entregar um ambiente limpo, higienizado, agradável e pronto a utilizar.',
    iconName: 'CheckCircle2',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-office',
    title: 'Sede Corporativa e Salas de Reunião',
    category: 'empresarial',
    categoryLabel: 'Empresarial',
    location: 'Polana Cimento, Maputo',
    image: IMAGES.serviceCorporateOffice,
    imageAlt: 'Sala de reuniões empresarial higienizada pela iClean',
  },
  {
    id: 'gal-commercial',
    title: 'Átrio Comercial de Alto Tráfego',
    category: 'comercial',
    categoryLabel: 'Comercial',
    location: 'Baixa de Maputo',
    image: IMAGES.heroCommercialCleaning,
    imageAlt: 'Átrio comercial amplo com pavimento polido após limpeza iClean',
  },
  {
    id: 'gal-residential',
    title: 'Residência Contemporânea e Cozinha',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'Sommerschield, Maputo',
    image: IMAGES.serviceResidentialVilla,
    imageAlt: 'Cozinha e sala residencial limpa e organizada',
  },
  {
    id: 'gal-events',
    title: 'Operação em Festival ao Ar Livre',
    category: 'eventos',
    categoryLabel: 'Eventos',
    location: 'Costa do Sol, Maputo',
    image: IMAGES.serviceEventsVenue,
    imageAlt: 'Equipa iClean a operar em evento ao ar livre com palco e triagem',
  },
  {
    id: 'gal-pos-obra',
    title: 'Entrega Técnica Pós-Construção',
    category: 'pos-obra',
    categoryLabel: 'Pós-Obra',
    location: 'Triunfo, Maputo',
    image: IMAGES.servicePostConstruction,
    imageAlt: 'Edifício comercial recém-construído em limpeza final pós-obra',
  },
  {
    id: 'gal-condo',
    title: 'Átrio e Zonas Comuns de Condomínio',
    category: 'comercial',
    categoryLabel: 'Comercial',
    location: 'Avenida Julius Nyerere, Maputo',
    image: IMAGES.serviceCondominiumLobby,
    imageAlt: 'Átrio de condomínio com vidro e mármore impecavelmente limpos',
  },
];

export const BEFORE_AFTER_PAIR = {
  title: 'Transformação de Átrio Comercial Pós-Evento e Obra',
  subtitle:
    'Deslize para comparar o estado inicial com poeiras e embalagens versus a entrega final higienizada e polida.',
  beforeImage: IMAGES.galleryBeforeMessy,
  beforeAlt: 'Átrio comercial com poeiras, pegadas, vidros manchados e embalagens antes da limpeza',
  afterImage: IMAGES.galleryAfterSpotless,
  afterAlt: 'O mesmo átrio comercial com pavimento espelhado e vidros cristalinos após a intervenção',
};

export const ABOUT_MEDIA = {
  image: IMAGES.aboutTeamPortrait,
  alt: 'Equipa da iClean com fardamento verde escuro e equipamentos ecológicos em edifício corporativo',
};

/**
 * Conteúdo ilustrativo de demonstração.
 * Deve ser substituído por depoimentos reais autorizados por clientes da iClean antes da publicação final.
 */
export const DEMO_TESTIMONIALS: DemoTestimonial[] = [
  {
    id: 'demo-1',
    quote:
      'Exemplo ilustrativo: A pontualidade da equipa antes da abertura do escritório e o cuidado com as salas de reunião transformam o nosso ambiente logo às primeiras horas da manhã.',
    author: 'Direção Administrativa (Exemplo)',
    role: 'Limpeza Empresarial Recorrente',
    context: 'Modelo de avaliação — Conteúdo de demonstração',
  },
  {
    id: 'demo-2',
    quote:
      'Exemplo ilustrativo: Durante o nosso evento ao ar livre, a presença contínua da equipa manteve as áreas de circulação limpas do início ao fim, facilitando a entrega do espaço no prazo.',
    author: 'Coordenação de Produção (Exemplo)',
    role: 'Limpeza de Eventos',
    context: 'Modelo de avaliação — Conteúdo de demonstração',
  },
  {
    id: 'demo-3',
    quote:
      'Exemplo ilustrativo: Após a conclusão da remodelação, a limpeza pós-obra removeu todo o pó fino sem riscar os vidros nem os acabamentos novos em madeira e pedra.',
    author: 'Gestão de Condomínio (Exemplo)',
    role: 'Limpeza Pós-Obra & Condomínios',
    context: 'Modelo de avaliação — Conteúdo de demonstração',
  },
];
