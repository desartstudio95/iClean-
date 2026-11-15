export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  code: string;
  title: string;
  shortDescription: string;
  introParagraph: string;
  idealFor: string;
  image: string;
  imageAlt: string;
  includedItems: string[];
  benefits: ServiceBenefit[];
  howItWorks: ServiceStep[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  complianceNote?: string;
  seoTitle: string;
  seoDescription: string;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'limpeza-residencial',
    code: 'Serviço 01',
    title: 'Limpeza Residencial',
    shortDescription:
      'Cuidado completo para apartamentos, casas e moradias em Maputo, com atenção minuciosa a cozinhas, casas de banho e áreas de descanso.',
    introParagraph:
      'A nossa equipa de limpeza residencial atua com discrição, respeito pela privacidade do seu lar e produtos seguros para superfícies delicadas, garantindo frescura e bem-estar em cada divisão.',
    idealFor: 'Casas, apartamentos e mudanças',
    image: '/src/assets/images/service_residential_villa_1794778187196.jpg',
    imageAlt:
      'Profissional da iClean em uniforme verde a higienizar bancada de cozinha residencial moderna',
    includedItems: [
      'Limpeza de casas e apartamentos',
      'Limpeza profunda',
      'Limpeza de cozinhas',
      'Limpeza de casas de banho',
      'Limpeza antes e depois de mudanças',
    ],
    benefits: [
      {
        title: 'Produtos seguros para a família',
        description:
          'Aplicação cuidadosa de soluções adequadas para pedra, madeira, vidro e zonas de preparação de alimentos.',
      },
      {
        title: 'Flexibilidade de agenda',
        description:
          'Intervenções pontuais, semanais, quinzenais ou preparação completa antes da entrada num novo imóvel.',
      },
      {
        title: 'Equipa fardada e supervisionada',
        description:
          'Profissionais preparados para atuar com rigor, pontualidade e cuidado com os seus bens.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Indique a tipologia',
        description:
          'Informe se se trata de apartamento ou moradia, número de divisões e tipo de limpeza pretendida.',
      },
      {
        number: '02',
        title: 'Plano à medida',
        description:
          'Definimos a duração estimada, a equipa necessária e os pontos prioritários da residência.',
      },
      {
        number: '03',
        title: 'Execução minuciosa',
        description:
          'Higienização completa de quartos, salas, cozinhas, casas de banho e áreas exteriores acessíveis.',
      },
      {
        number: '04',
        title: 'Verificação final',
        description:
          'Conferência dos detalhes acordados para entregar a sua casa organizada, fresca e pronta a habitar.',
      },
    ],
    faqs: [
      {
        question: 'A iClean leva os equipamentos e produtos de limpeza?',
        answer:
          'Sim. A nossa equipa chega equipada com produtos e utensílios profissionais adequados a cada superfície, salvo se o cliente preferir o uso de algum produto específico da residência.',
      },
      {
        question: 'Posso contratar limpeza antes de me mudar para uma nova casa?',
        answer:
          'Sim. Realizamos limpezas pré-mudança e pós-saída, incluindo interior de armários vazios, cozinhas, casas de banho e pavimentos.',
      },
      {
        question: 'É possível contratar planos recorrentes semanais ou quinzenais?',
        answer:
          'Sim. Pode solicitar um plano regular adaptado à rotina da sua família ou apenas uma limpeza profunda pontual.',
      },
    ],
    relatedSlugs: ['limpeza-de-condominios', 'limpeza-pos-obra', 'limpeza-empresarial'],
    seoTitle: 'Limpeza Residencial em Maputo | iClean',
    seoDescription:
      'Limpeza de casas, apartamentos, cozinhas, casas de banho, limpeza profunda e mudanças em Maputo com a equipa profissional iClean.',
  },
  {
    slug: 'limpeza-empresarial',
    code: 'Serviço 02',
    title: 'Limpeza Empresarial',
    shortDescription:
      'Conservação e higienização para escritórios, lojas, restaurantes e espaços comerciais que valorizam imagem e produtividade.',
    introParagraph:
      'Um espaço empresarial limpo transmite credibilidade imediata a clientes e parceiros, além de proporcionar condições saudáveis de trabalho. Estruturamos rotinas compatíveis com o horário de funcionamento do seu negócio.',
    idealFor: 'Escritórios, lojas, restaurantes e empresas',
    image: '/src/assets/images/service_corporate_office_1794778186887.jpg',
    imageAlt:
      'Especialista de limpeza empresarial em uniforme verde a limpar mesa de vidro numa sala de reuniões',
    includedItems: [
      'Limpeza de escritórios',
      'Limpeza de lojas',
      'Limpeza de restaurantes',
      'Limpeza de espaços comerciais',
      'Limpeza de áreas empresariais',
    ],
    benefits: [
      {
        title: 'Horários sem interferência operacional',
        description:
          'Possibilidade de atuação antes da abertura, após o fecho ou em manutenção discreta durante o expediente.',
      },
      {
        title: 'Higiene em áreas de atendimento',
        description:
          'Atenção especial a receções, vitrines, salas de reunião, mesas de trabalho e instalações sanitárias.',
      },
      {
        title: 'Rotinas de conservação consistentes',
        description:
          'Checklists claros por área e supervisão periódica para manter o mesmo padrão todos os dias.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Levantamento do espaço',
        description:
          'Avaliamos a área útil, o fluxo de colaboradores ou clientes e as zonas críticas do negócio.',
      },
      {
        number: '02',
        title: 'Proposta de frequência',
        description:
          'Apresentamos um plano diário, semanal ou por turno ajustado às exigências do setor.',
      },
      {
        number: '03',
        title: 'Operação coordenada',
        description:
          'Equipa uniformizada executa a higienização de secretárias, copas, salões, vidros e sanitários.',
      },
      {
        number: '04',
        title: 'Acompanhamento contínuo',
        description:
          'Monitorizamos a qualidade da entrega e ajustamos o plano sempre que a sua operação crescer.',
      },
    ],
    faqs: [
      {
        question: 'Atendem lojas e restaurantes fora do horário ao público?',
        answer:
          'Sim. Planeamos os turnos de limpeza de acordo com os horários de abertura e encerramento do seu estabelecimento.',
      },
      {
        question: 'Podem assegurar manutenção diária com equipa fixa ou periódica?',
        answer:
          'Sim. Configuramos desde visitas semanais para escritórios pequenos até planos regulares para instalações corporativas e comerciais.',
      },
      {
        question: 'Que zonas estão incluídas num escritório padrão?',
        answer:
          'Receção, estações de trabalho, salas de reunião, copas, instalações sanitárias, vidros interiores acessíveis, pavimentos e esvaziamento de papeleiras.',
      },
    ],
    relatedSlugs: ['limpeza-de-condominios', 'recolha-de-residuos', 'limpeza-pos-obra'],
    seoTitle: 'Limpeza Empresarial e de Escritórios em Maputo | iClean',
    seoDescription:
      'Serviços profissionais de limpeza de escritórios, lojas, restaurantes e espaços comerciais em Maputo. Peça orçamento à iClean.',
  },
  {
    slug: 'limpeza-de-eventos',
    code: 'Serviço 03',
    title: 'Limpeza de Eventos',
    shortDescription:
      'Apoio operacional antes, durante e após concertos, festivais, casamentos, feiras e conferências corporativas.',
    introParagraph:
      'Grandes momentos exigem logística discreta e eficiente. A equipa da iClean trabalha alinhada com a produção do evento para preparar o recinto, manter a higiene durante a programação e restaurar o espaço no final.',
    idealFor: 'Concertos, festivais, casamentos e eventos corporativos',
    image: '/src/assets/images/service_events_venue_1794778188286.jpg',
    imageAlt:
      'Equipa da iClean com fardamento verde a limpar recinto de festival e concertos ao ar livre',
    includedItems: [
      'Limpeza antes dos eventos',
      'Limpeza durante eventos',
      'Limpeza pós-eventos',
      'Shows e concertos',
      'Casamentos e festas',
      'Eventos corporativos',
    ],
    benefits: [
      {
        title: 'Cobertura em todas as fases',
        description:
          'Contrate apenas pré-evento, manutenção contínua, pós-evento ou o pacote integral completo.',
      },
      {
        title: 'Controlo constante de sanitários e áreas comuns',
        description:
          'Equipas dedicadas garantem que os convidados encontrem sempre espaços limpos e confortáveis.',
      },
      {
        title: 'Devolução rápida do recinto',
        description:
          'Recolha eficiente de copos, garrafas, embalagens e lavagem final para cumprimento dos prazos do espaço.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Briefing do evento',
        description:
          'Partilhe data, local, lotação prevista, tipo de evento e fases em que necessita de apoio.',
      },
      {
        number: '02',
        title: 'Dimensionamento da equipa',
        description:
          'Calculamos o número ideal de operadores, pontos de recolha e turnos conforme o fluxo esperado.',
      },
      {
        number: '03',
        title: 'Execução em campo',
        description:
          'Atuação coordenada desde a preparação inicial até à manutenção discreta durante o evento.',
      },
      {
        number: '04',
        title: 'Restauro pós-evento',
        description:
          'Limpeza geral completa após o encerramento para devolver o espaço impecável.',
      },
    ],
    faqs: [
      {
        question: 'Posso contratar apenas a limpeza pós-evento?',
        answer:
          'Sim. Pode optar por contratação modular (apenas pré-evento, durante ou pós-evento) ou pelo pacote completo.',
      },
      {
        question: 'Atendem eventos ao ar livre e em tendas ou quintas?',
        answer:
          'Sim. Operamos tanto em auditórios e hotéis como em quintas de casamentos, recintos de concertos e festivais ao ar livre.',
      },
      {
        question: 'Com que antecedência devo solicitar orçamento para um evento?',
        answer:
          'Recomendamos o contacto assim que a data e o recinto estiverem definidos, especialmente para eventos com grande lotação.',
      },
    ],
    relatedSlugs: ['recolha-de-residuos', 'limpeza-empresarial', 'limpeza-residencial'],
    seoTitle: 'Limpeza de Eventos, Concertos e Casamentos em Maputo | iClean',
    seoDescription:
      'Limpeza profissional antes, durante e após shows, festivais, casamentos e eventos corporativos em Maputo.',
  },
  {
    slug: 'limpeza-pos-obra',
    code: 'Serviço 04',
    title: 'Limpeza Pós-Obra',
    shortDescription:
      'Remoção técnica de poeiras finas, resíduos de construção e sujidade de acabamentos para preparar imóveis para ocupação.',
    introParagraph:
      'Após uma construção ou remodelação, a poeira fina e os vestígios de obra exigem equipamentos e técnicas próprias para não riscar vidros, loiças ou pavimentos novos. Preparamos o imóvel para entrega imediata.',
    idealFor: 'Construtoras, arquitetos e imóveis recém-remodelados',
    image: '/src/assets/images/service_post_construction_1794778186552.jpg',
    imageAlt:
      'Técnicos da iClean em limpeza pós-obra a aspirar pavimento e limpar vidros altos',
    includedItems: [
      'Remoção de poeira',
      'Limpeza de pavimentos',
      'Limpeza de vidros acessíveis',
      'Limpeza de cozinhas e casas de banho',
      'Preparação de imóveis para ocupação',
    ],
    benefits: [
      {
        title: 'Proteção de acabamentos novos',
        description:
          'Utilização de panos de microfibra, aspiração técnica e produtos não abrasivos adequados a materiais recém-instalados.',
      },
      {
        title: 'Eliminação de pó residual persistente',
        description:
          'Limpeza detalhada de rodapés, caixilhos, portas, interruptores e interior de armários.',
      },
      {
        title: 'Pronto para entrega de chave',
        description:
          'Ideal para construtoras, proprietários e imobiliárias que precisam de apresentar o espaço impecável.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Avaliação pós-obra',
        description:
          'Verificamos o estado dos revestimentos, quantidade de poeira e dimensão total do imóvel.',
      },
      {
        number: '02',
        title: 'Remoção de sujidade grossa e pó',
        description:
          'Aspiração integral de superfícies, calhas de janelas e áreas de circulação.',
      },
      {
        number: '03',
        title: 'Limpeza técnica de detalhes',
        description:
          'Higienização de vidros acessíveis, bancadas de cozinha, loiças sanitárias e lavagem de pavimentos.',
      },
      {
        number: '04',
        title: 'Vistoria conjunta',
        description:
          'Revisão final para garantir que o imóvel está pronto a ser habitado ou inaugurado.',
      },
    ],
    faqs: [
      {
        question: 'Em que fase da obra devo chamar a iClean?',
        answer:
          'O ideal é após a saída das equipas de construção, pinturas e carpintaria, quando já não há geração contínua de entulho ou poeira.',
      },
      {
        question: 'Limpam vidros exteriores em altura elevada?',
        answer:
          'Realizamos a limpeza de todos os vidros interiores e exteriores acessíveis em segurança sem recurso a trabalhos em altura suspensa.',
      },
      {
        question: 'Retiram entulho pesado de construção?',
        answer:
          'A limpeza pós-obra foca-se em poeiras, resíduos finos e preparação final do imóvel; grandes volumes de entulho devem ser previamente desimpedidos pela obra.',
      },
    ],
    relatedSlugs: ['limpeza-residencial', 'limpeza-empresarial', 'limpeza-de-condominios'],
    seoTitle: 'Limpeza Pós-Obra em Maputo | iClean',
    seoDescription:
      'Remoção de poeira, limpeza de pavimentos, vidros acessíveis, cozinhas e casas de banho para preparar imóveis após construção ou remodelação.',
  },
  {
    slug: 'limpeza-de-condominios',
    code: 'Serviço 05',
    title: 'Limpeza de Condomínios',
    shortDescription:
      'Manutenção contínua de escadas, corredores, entradas, pátios, estacionamentos e todas as áreas comuns.',
    introParagraph:
      'As áreas comuns são o cartão de visita de qualquer condomínio residencial ou empresarial. Garantimos rotinas regulares que preservam a higiene, reduzem o desgaste dos materiais e promovem o bem-estar dos condóminos.',
    idealFor: 'Administrações de condomínios e edifícios residenciais',
    image: '/src/assets/images/service_condominium_lobby_1794778187122.jpg',
    imageAlt:
      'Operadora da iClean a desinfetar corrimão de vidro no átrio moderno de um condomínio',
    includedItems: [
      'Escadas',
      'Corredores',
      'Entradas',
      'Pátios',
      'Áreas comuns',
      'Estacionamentos',
    ],
    benefits: [
      {
        title: 'Valorização do património comum',
        description:
          'Conservação adequada de mármores, cerâmicas, vidros de entrada, elevadores e corrimãos.',
      },
      {
        title: 'Desinfeção de pontos de contacto frequente',
        description:
          'Atenção redobrada a botões de elevador, puxadores, portões, corrimãos e receções.',
      },
      {
        title: 'Previsibilidade para a administração',
        description:
          'Cronograma fixo de visitas, equipa identificada e comunicação direta com o síndico ou gestora.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Mapeamento das áreas comuns',
        description:
          'Levantamos o número de pisos, escadarias, elevadores, pátios e zonas de estacionamento.',
      },
      {
        number: '02',
        title: 'Calendário de manutenção',
        description:
          'Definimos tarefas diárias (entradas e corredores) e tarefas periódicas (garagens e pátios).',
      },
      {
        number: '03',
        title: 'Execução regular',
        description:
          'Equipa uniformizada cumpre o roteiro definido sem perturbar a circulação dos residentes.',
      },
      {
        number: '04',
        title: 'Controlo de qualidade',
        description:
          'Verificação contínua junto da administração do condomínio para manter o padrão elevado.',
      },
    ],
    faqs: [
      {
        question: 'Que frequência recomendam para condomínios?',
        answer:
          'Depende do número de frações e movimento: condomínios médios e grandes beneficiam de visitas diárias ou 3x por semana nas zonas comuns e limpeza semanal ou quinzenal de estacionamentos.',
      },
      {
        question: 'Incluem a organização da zona dos contentores de lixo?',
        answer:
          'Sim. Podemos integrar a higienização das casas de lixo e o acondicionamento adequado dos resíduos comuns.',
      },
      {
        question: 'Trabalham com empresas gestoras de condomínios?',
        answer:
          'Sim. Atendemos tanto administrações internas eleitas por condóminos como empresas profissionais de gestão imobiliária.',
      },
    ],
    relatedSlugs: ['recolha-de-residuos', 'limpeza-residencial', 'limpeza-empresarial'],
    seoTitle: 'Limpeza de Condomínios em Maputo | iClean',
    seoDescription:
      'Conservação de escadas, corredores, entradas, pátios, áreas comuns e estacionamentos para condomínios em Maputo.',
  },
  {
    slug: 'recolha-de-residuos',
    code: 'Serviço 06',
    title: 'Recolha e Acondicionamento de Resíduos',
    shortDescription:
      'Recolha de resíduos não perigosos, acondicionamento higiénico e organização de pontos de recolha para empresas, condomínios e eventos.',
    introParagraph:
      'Uma gestão organizada de resíduos é essencial para evitar odores, pragas e degradação visual dos espaços. Apoiamos empresas, condomínios e organizadores de eventos com recolha, acondicionamento e organização estruturada de pontos de deposição.',
    idealFor: 'Empresas, condomínios, centros comerciais e eventos',
    image: '/src/assets/images/service_waste_management_1794778189686.jpg',
    imageAlt:
      'Especialista da iClean a acondicionar sacos selados em estação organizada de triagem e recolha',
    includedItems: [
      'Recolha de resíduos não perigosos',
      'Acondicionamento',
      'Organização de pontos de recolha',
      'Apoio à gestão de resíduos em eventos',
    ],
    complianceNote:
      'Nota legal: Todas as operações de recolha e eventual transporte de resíduos são prestadas exclusivamente para resíduos não perigosos e permanecem sujeitas aos requisitos de licenciamento e autorização aplicáveis pelas entidades competentes.',
    benefits: [
      {
        title: 'Redução de odores e focos de sujidade',
        description:
          'Acondicionamento hermético e substituição regular de sacos reforçados em zonas de acumulação.',
      },
      {
        title: 'Estações de recolha organizadas',
        description:
          'Sinalização e arrumação de contentores para facilitar a separação na origem por utilizadores e equipas.',
      },
      {
        title: 'Suporte operacional em eventos',
        description:
          'Fluxo contínuo entre as zonas de público e a área técnica de deposição durante toda a programação.',
      },
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Diagnóstico do fluxo de resíduos',
        description:
          'Avaliamos o tipo e volume estimado de resíduos não perigosos gerados pelo espaço ou evento.',
      },
      {
        number: '02',
        title: 'Organização dos pontos',
        description:
          'Definimos a disposição dos contentores e o plano de recolha interna conforme os requisitos legais aplicáveis.',
      },
      {
        number: '03',
        title: 'Recolha e acondicionamento',
        description:
          'Ensacamento seguro, selagem e condução para a área autorizada de deposição.',
      },
      {
        number: '04',
        title: 'Higienização da área',
        description:
          'Lavagem e desodorização dos espaços de acondicionamento após a recolha.',
      },
    ],
    faqs: [
      {
        question: 'A iClean recolhe resíduos hospitalares, químicos ou industriais perigosos?',
        answer:
          'Não. Este serviço abrange exclusivamente resíduos sólidos não perigosos e está sujeito às autorizações e licenciamentos aplicáveis.',
      },
      {
        question: 'Podem integrar a gestão de resíduos com a limpeza de eventos?',
        answer:
          'Sim. É uma das combinações mais procuradas para concertos, feiras e conferências, garantindo pontos de recolha limpos durante todo o evento.',
      },
      {
        question: 'Fornecem apoio na organização de contentores em condomínios?',
        answer:
          'Sim. Organizamos os pontos de recolha interna, orientamos o acondicionamento adequado e asseguramos a limpeza da casa de resíduos.',
      },
    ],
    relatedSlugs: ['limpeza-de-eventos', 'limpeza-de-condominios', 'limpeza-empresarial'],
    seoTitle: 'Recolha e Acondicionamento de Resíduos em Maputo | iClean',
    seoDescription:
      'Recolha de resíduos não perigosos, acondicionamento higiénico e organização de pontos de recolha para espaços comerciais, condomínios e eventos.',
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((item) => item.slug === slug);
}

export const EVENTS_PAGE_DATA = {
  hero: {
    kicker: 'Eventos em Maputo · Pré, Durante e Pós-Evento',
    headline: 'Grandes eventos merecem espaços impecáveis.',
    supportingText:
      'Da preparação à limpeza final, a iClean garante ambientes organizados e limpos para que possa concentrar-se no sucesso do seu evento.',
    image: '/src/assets/images/service_events_venue_1794778188286.jpg',
    imageAlt:
      'Equipa profissional da iClean a operar num grande recinto de concerto ao ar livre',
  },
  showcaseGallery: [
    {
      title: 'Equipas em Concertos e Palcos',
      category: 'Shows e Concertos',
      image: '/src/assets/images/service_events_venue_1794778188286.jpg',
      alt: 'Equipa em uniforme verde a manter recinto de espetáculo limpo e organizado',
    },
    {
      title: 'Casamentos e Receções',
      category: 'Casamentos e Festas',
      image: '/src/assets/images/events_wedding_reception_1794778935162.jpg',
      alt: 'Preparação e limpeza de mesas e pavimento num recinto de casamento ao ar livre',
    },
    {
      title: 'Conferências e Exposições',
      category: 'Eventos Corporativos',
      image: '/src/assets/images/events_corporate_conference_1794778934975.jpg',
      alt: 'Átrio de centro de conferências e exposições higienizado durante evento empresarial',
    },
    {
      title: 'Grandes Recintos e Átrios',
      category: 'Restauro Pós-Evento',
      image: '/src/assets/images/gallery_after_spotless_1794778190633.jpg',
      alt: 'Salão amplo restaurado e polido após a conclusão de evento',
    },
  ],
  stages: [
    {
      code: 'ANTES DO EVENTO',
      title: 'PRÉ-EVENTO',
      subtitle: 'Preparação completa para receber o seu público.',
      items: [
        'Preparação do recinto',
        'Limpeza de pavimentos e superfícies',
        'Organização de pontos de recolha de resíduos',
        'Preparação de áreas comuns',
      ],
    },
    {
      code: 'DURANTE O EVENTO',
      title: 'DURANTE O EVENTO',
      subtitle: 'Manutenção contínua e discreta em todo o recinto.',
      items: [
        'Apoio contínuo de limpeza',
        'Recolha de resíduos',
        'Manutenção de áreas comuns',
        'Limpeza de sanitários',
        'Substituição de sacos de lixo',
      ],
    },
    {
      code: 'DEPOIS DO EVENTO',
      title: 'PÓS-EVENTO',
      subtitle: 'Restauro integral e entrega do espaço organizado.',
      items: [
        'Limpeza geral',
        'Recolha de copos, garrafas e embalagens',
        'Varredura e lavagem de pavimentos',
        'Limpeza de zonas do evento',
        'Organização final do espaço',
      ],
    },
  ],
  eventTypes: [
    {
      title: 'Shows e concertos',
      description: 'Cobertura de plateia, zonas VIP, bastidores e acessos.',
    },
    {
      title: 'Festivais',
      description: 'Pontos organizados de resíduos e equipas rotativas em campo.',
    },
    {
      title: 'Casamentos',
      description: 'Cuidado discreto em jardins, tendas, salões e sanitários.',
    },
    {
      title: 'Festas de aniversário',
      description: 'Preparação prévia e limpeza completa após a celebração.',
    },
    {
      title: 'Eventos corporativos',
      description: 'Conferências, lançamentos, seminários e encontros executivos.',
    },
    {
      title: 'Exposições e feiras',
      description: 'Manutenção de corredores, stands, praças e áreas comuns.',
    },
    {
      title: 'Cerimónias',
      description: 'Protocolo rigoroso para atos institucionais e receções.',
    },
    {
      title: 'Celebrações privadas',
      description: 'Apoio flexível para eventos em residências ou quintas.',
    },
  ],
  contractingSteps: [
    {
      number: 'Passo 01',
      title: 'Envie os detalhes do evento',
      description:
        'Indique o tipo de evento, data, local, lotação prevista e as fases pretendidas.',
    },
    {
      number: 'Passo 02',
      title: 'Avaliamos as necessidades',
      description:
        'Dimensionamos a equipa, turnos, pontos de recolha e equipamentos necessários.',
    },
    {
      number: 'Passo 03',
      title: 'Apresentamos uma proposta',
      description:
        'Receba um plano operacional claro e transparente ajustado ao seu orçamento.',
    },
    {
      number: 'Passo 04',
      title: 'Executamos o serviço',
      description:
        'A nossa equipa entra em ação no recinto com supervisão do início ao fim.',
    },
  ],
};

export const ABOUT_PAGE_DATA = {
  hero: {
    kicker: 'Sobre Nós · iClean Moçambique',
    headline: 'Mais do que limpar espaços, cuidamos de ambientes.',
    supportingText:
      'A iClean dedica-se a proporcionar ambientes mais limpos, organizados e agradáveis, através de serviços profissionais de limpeza e conservação.',
    image: '/src/assets/images/about_team_portrait_1794778189347.jpg',
    imageAlt:
      'Equipa da iClean com fardamento verde escuro em edifício moderno em Maputo',
  },
  whoWeAre: {
    title: 'Quem Somos',
    paragraphs: [
      'A iClean é uma empresa moçambicana especializada em serviços profissionais de limpeza, higienização, conservação de espaços e apoio à gestão de resíduos não perigosos.',
      'Atuamos junto de clientes particulares, empresas, condomínios e organizadores de eventos em Maputo, respondendo a cada desafio com equipas preparadas, métodos estruturados e atenção genuína a cada ambiente.',
    ],
    secondaryImage: '/src/assets/images/about_leadership_planning_1794778935236.jpg',
    secondaryImageAlt:
      'Supervisão operacional da iClean a rever lista de controlo de qualidade',
  },
  mission: {
    title: 'A Nossa Missão',
    statement:
      'Proporcionar serviços de limpeza e higienização de qualidade, contribuindo para ambientes mais limpos, saudáveis e organizados.',
  },
  vision: {
    title: 'A Nossa Visão',
    statement:
      'Ser uma referência em serviços profissionais de limpeza em Moçambique, reconhecida pela qualidade, confiança e compromisso.',
  },
  values: [
    {
      title: 'Profissionalismo',
      description:
        'Atuação técnica, apresentação cuidada e respeito pelas normas de cada local.',
    },
    {
      title: 'Responsabilidade',
      description:
        'Zelo pelos espaços, bens dos clientes e procedimentos seguros em campo.',
    },
    {
      title: 'Pontualidade',
      description:
        'Cumprimento rigoroso dos horários combinados em visitas regulares ou pontuais.',
    },
    {
      title: 'Qualidade',
      description:
        'Atenção consistente aos detalhes que fazem a diferença no resultado final.',
    },
    {
      title: 'Confiança',
      description:
        'Relações transparentes e próximas com clientes residenciais e empresariais.',
    },
    {
      title: 'Sustentabilidade',
      description:
        'Uso consciente de recursos e práticas responsáveis de acondicionamento de resíduos.',
    },
  ],
  commitments: [
    {
      title: 'Satisfação do cliente',
      description:
        'Ouvimos as particularidades de cada espaço para entregar exatamente o padrão esperado.',
    },
    {
      title: 'Execução de qualidade',
      description:
        'Equipas acompanhadas e listas de verificação claras para evitar falhas ou omissões.',
    },
    {
      title: 'Práticas adequadas de limpeza',
      description:
        'Seleção criteriosa de utensílios e soluções de higiene compatíveis com cada superfície.',
    },
    {
      title: 'Gestão responsável de resíduos',
      description:
        'Separação e acondicionamento organizado, respeitando os requisitos legais aplicáveis.',
    },
    {
      title: 'Melhoria contínua',
      description:
        'Revisão constante de métodos, formação interna e rotinas para servir cada vez melhor.',
    },
  ],
  cta: {
    headline: 'Vamos cuidar melhor do seu espaço?',
    description:
      'Fale com a equipa da iClean e receba uma proposta adaptada às necessidades da sua residência, empresa, condomínio ou evento.',
    buttonLabel: 'Solicitar orçamento',
  },
};
