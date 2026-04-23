/**
 * features/portfolio/config/portfolioContent.ts
 * Portfolio OS module with a specific architectural responsibility.
 */
import { Locale } from '@/shared/i18n/types';
import React from 'react';
import { GITHUB_PROJECTS } from '@/features/portfolio/data/githubProjects';

export interface PortfolioProject {
  id: number | string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repositoryUrl?: string;
}

export interface FavoriteProjectDetail {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repositoryUrl?: string;
}

interface PortfolioContent {
  windows: {
    about: string;
    projects: string;
    contact: string;
    curriculum: string;
  };
  about: {
    name: string;
    role: string;
    bio: string;
    location: string;
    availability: string;
    email: string;
    technicalSkillsTitle: string;
    technicalSkills: string[];
  };
  personalData: {
    age: string;
    gender: string;
    phone: string;
    email: string;
    location: string;
  };
  projects: {
    sidebar: {
      favorites: string;
      repositories: string;
    };
    favoritesTitle: string;
    repositoriesTitle: string;
    favorites: FavoriteProjectDetail[];
    items: PortfolioProject[];
  };
  curriculum: {
    name: string;
    role: string;
    downloadLabel: string;
    professionalSummaryTitle: string;
    professionalSummary: string;
    experienceTitle: string;
    experience: Array<{
      title: string;
      companyPeriod: string;
      highlights: string[];
    }>;
    technicalSkillsTitle: string;
    technicalSkills: string[];
    educationTitle: string;
    educationDegree: string;
    educationInstitutionPeriod: string;
    certificationsTitle: string;
    certifications: string[];
    languagesTitle: string;
    languages: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    badge: string;
    channelsTitle: string;
    responseTime: string;
    channels: Array<{
      id: string;
      label: string;
      description: string;
      cta: string;
      url: string;
      external?: boolean;
    }>;
  };
}

interface ExternalSkillCategory {
  category: string;
  items: string[];
}

interface ExternalProject {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  links?: {
    github?: string;
    demo?: string;
  };
  image?: string;
  highlights?: string[];
  stack?: string[];
}

interface ExternalProjectsMeta {
  featured?: string[];
  order?: string[];
}

const COMMON_PROJECTS: PortfolioProject[] = GITHUB_PROJECTS;

const FAVORITE_PROJECTS_PT: FavoriteProjectDetail[] = [
  {
    id: 'portfolio-os',
    title: 'Portfolio OS',
    summary: 'Sistema de portfólio interativo inspirado em desktop, com gerenciamento de janelas, internacionalização e arquitetura modular por features.',
    highlights: [
      'Arquitetura modular com separação por domínio (`portfolio`, `tools`, `system`, `shared`).',
      'Internacionalização dinâmica com troca de idioma em runtime.',
      'Pipeline de CI/CD e testes automatizados com qualidade contínua.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    repositoryUrl: 'https://github.com/NullCipherr/portfolio-os',
  },
  {
    id: 'orbit',
    title: 'orbit',
    summary: 'Engine de visualização interativa em tempo real para experiências web imersivas com foco em fluidez e escalabilidade.',
    highlights: [
      'Renderização em tempo real para experiências de alto impacto visual.',
      'Estrutura front-end preparada para evolução e manutenção em equipe.',
      'Abordagem voltada para performance e interações fluidas.',
    ],
    stack: ['TypeScript', 'Rendering', 'Frontend Architecture'],
    repositoryUrl: 'https://github.com/NullCipherr/orbit',
  },
  {
    id: 'phoa',
    title: 'phoa',
    summary: 'Simulador de enxame de drones com algoritmo bioinspirado para cenários de busca e resgate e logística urbana.',
    highlights: [
      'Modelo com coordenação por fases e alvos dinâmicos.',
      'Execução reprodutível para benchmark e análise experimental.',
      'Interfaces CLI e Streamlit para experimentação e visualização.',
    ],
    stack: ['Python', 'Simulation', 'Streamlit', 'Optimization'],
    repositoryUrl: 'https://github.com/NullCipherr/phoa',
  },
  {
    id: 'ripple-engine',
    title: 'ripple-engine',
    summary: 'Core de simulação de fluidos com renderização WebGL2 e contratos tipados, desenhado para simulações visuais em tempo real.',
    highlights: [
      'Pipeline de partículas e fluidos com foco em desempenho.',
      'Renderização otimizada para manter estabilidade em cargas visuais altas.',
      'Base sólida para evolução de motores visuais no navegador.',
    ],
    stack: ['TypeScript', 'WebGL2', 'Simulation Engine'],
    repositoryUrl: 'https://github.com/NullCipherr/ripple-engine',
  },
  {
    id: 'Live-Crypto-Tracker',
    title: 'Live-Crypto-Tracker',
    summary: 'Dashboard de mercado cripto em tempo real com watchlists, painéis analíticos e experiência responsiva.',
    highlights: [
      'Consumo e atualização contínua de dados de mercado.',
      'Painéis de visualização com foco em legibilidade operacional.',
      'Estrutura orientada a produto com base reutilizável para fintech.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Data Visualization'],
    repositoryUrl: 'https://github.com/NullCipherr/Live-Crypto-Tracker',
  },
];

const FAVORITE_PROJECTS_EN: FavoriteProjectDetail[] = [
  {
    id: 'portfolio-os',
    title: 'Portfolio OS',
    summary: 'Interactive desktop-inspired portfolio system with window management, i18n support, and feature-based architecture.',
    highlights: [
      'Domain-driven modular architecture (`portfolio`, `tools`, `system`, `shared`).',
      'Runtime internationalization with instant language switching.',
      'CI/CD pipeline and automated tests for continuous quality.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    repositoryUrl: 'https://github.com/NullCipherr/portfolio-os',
  },
  {
    id: 'orbit',
    title: 'orbit',
    summary: 'Real-time interactive visualization engine for immersive web experiences focused on fluidity and scalability.',
    highlights: [
      'Real-time rendering pipeline for high-impact visual experiences.',
      'Team-ready frontend structure for long-term evolution.',
      'Performance-oriented interaction model.',
    ],
    stack: ['TypeScript', 'Rendering', 'Frontend Architecture'],
    repositoryUrl: 'https://github.com/NullCipherr/orbit',
  },
  {
    id: 'phoa',
    title: 'phoa',
    summary: 'Drone swarm simulator with a bio-inspired optimization algorithm for SAR and urban logistics scenarios.',
    highlights: [
      'Phase-based coordination model with dynamic targets.',
      'Reproducible execution for benchmarking and experiments.',
      'CLI and Streamlit interfaces for exploration and analysis.',
    ],
    stack: ['Python', 'Simulation', 'Streamlit', 'Optimization'],
    repositoryUrl: 'https://github.com/NullCipherr/phoa',
  },
  {
    id: 'ripple-engine',
    title: 'ripple-engine',
    summary: 'Fluid simulation core with WebGL2 rendering and typed contracts, designed for real-time visual simulations.',
    highlights: [
      'High-performance particle/fluid pipeline.',
      'Rendering optimizations for stable visual workloads.',
      'Solid base for browser-based visual engines.',
    ],
    stack: ['TypeScript', 'WebGL2', 'Simulation Engine'],
    repositoryUrl: 'https://github.com/NullCipherr/ripple-engine',
  },
  {
    id: 'Live-Crypto-Tracker',
    title: 'Live-Crypto-Tracker',
    summary: 'Real-time crypto market dashboard with watchlists, analytics panels, and responsive UX.',
    highlights: [
      'Continuous market data ingestion and updates.',
      'Operational dashboards focused on clarity and speed.',
      'Product-ready structure reusable for fintech scenarios.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Data Visualization'],
    repositoryUrl: 'https://github.com/NullCipherr/Live-Crypto-Tracker',
  },
];

export const PORTFOLIO_CONTENT: Record<Locale, PortfolioContent> = {
  'pt-BR': {
    windows: {
      about: 'Sobre Mim',
      projects: 'Projetos',
      contact: 'Contato',
      curriculum: 'Currículo',
    },
    about: {
      name: 'Andrei Roberto da Costa',
      role: 'Desenvolvedor | Web, IA e Backend Python',
      bio: 'Desenvolvedor com formação em Ciência da Computação pela UEM, com experiência em aplicações web modernas com React, Node.js e APIs REST. Possuo forte base em Python e Machine Learning, aplicando soluções práticas em automação e análise de dados. Busco oportunidades para contribuir com soluções eficientes e evoluir continuamente.',
      location: 'Maringá - PR',
      availability: 'Disponível para oportunidades e freelas',
      email: 'arcodeworks@gmail.com',
      technicalSkillsTitle: 'Habilidades Técnicas',
      technicalSkills: [
        'JavaScript',
        'TypeScript',
        'Python',
        'React',
        'Angular',
        'Tailwind CSS',
        'Node.js',
        'FastAPI',
        'Flask',
        'TensorFlow',
        'PyTorch',
        'SQL',
        'NoSQL',
        'Git',
        'Postman',
      ],
    },
    personalData: {
      age: '25 anos',
      gender: 'Masculino',
      phone: '(44) 99181-2069',
      email: 'arcodeworks@gmail.com',
      location: 'Maringá - PR',
    },
    projects: {
      sidebar: {
        favorites: 'Favorites',
        repositories: 'GitHub Repositories',
      },
      favoritesTitle: 'Projetos em Destaque',
      repositoriesTitle: 'Repositórios do GitHub',
      favorites: FAVORITE_PROJECTS_PT,
      items: COMMON_PROJECTS,
    },
    curriculum: {
      name: 'Andrei Roberto da Costa',
      role: 'Desenvolvedor | Web, IA e Backend Python',
      downloadLabel: 'Baixar PDF',
      professionalSummaryTitle: 'Resumo Profissional',
      professionalSummary:
        'Desenvolvedor com formação em Ciência da Computação pela UEM, com experiência em desenvolvimento de aplicações web modernas utilizando React, Node.js e APIs REST. Possuo forte base em Python e Machine Learning, aplicando soluções práticas em automação e análise de dados. Busco oportunidades para contribuir com soluções eficientes e evoluir continuamente na área.',
      experienceTitle: 'Experiência',
      experience: [
        {
          title: 'Desenvolvedor Freelancer | Backend Python',
          companyPeriod: '03/2024 - Atual',
          highlights: [
            'Desenvolvimento de APIs backend utilizando FastAPI e Flask para aplicações orientadas a dados.',
            'Implementação de modelos de Machine Learning e Deep Learning (MLPs, CNNs, RNNs) com TensorFlow e PyTorch.',
            'Criação de pipelines de automação e processamento de dados para clientes.',
            'Estruturação de código com boas práticas: modularização, versionamento Git e organização de projetos.',
            'Levantamento de requisitos e entrega de soluções sob demanda para diferentes contextos.',
          ],
        },
        {
          title: 'Desenvolvedor Freelancer | Full Stack',
          companyPeriod: '07/2022 - Atual',
          highlights: [
            'Desenvolvimento end-to-end de aplicações web modernas.',
            'Frontend com React, Angular, TypeScript e Tailwind CSS, focado em performance e UX.',
            'Backend com Node.js, criação de APIs REST e integração com bancos relacionais.',
            'Implementação de melhorias de performance e responsividade com redução de tempo de carregamento.',
            'Participação em planejamento, desenvolvimento, testes e deploy.',
          ],
        },
        {
          title: 'Desenvolvedor Freelancer | Game Developer',
          companyPeriod: '02/2021 - 06/2023 (2 anos e 4 meses)',
          highlights: [
            'Desenvolvimento de sistemas e mecânicas utilizando C++ e Blueprints (Unreal Engine).',
            'Criação de simuladores de física e arquiteturas multiplayer.',
            'Desenvolvimento de aplicações em Realidade Virtual (VR).',
            'Construção de frameworks modulares reutilizáveis para projetos Mobile e Desktop.',
            'Publicação e validação de soluções utilizadas por outros desenvolvedores.',
          ],
        },
        {
          title: 'AST Games Studios | Game Developer',
          companyPeriod: '12/2017 - 02/2021 (3 anos e 2 meses)',
          highlights: [
            'Desenvolvimento de jogos 3D para Desktop, Mobile e Consoles com Unity e Unreal Engine.',
            'Implementação de mecânicas em C++ e sistemas de sincronização de rede.',
            'Criação de assets visuais: texturas (Substance Painter), modelos 3D (Blender) e shaders (OpenGL).',
            'Atuação em equipe multidisciplinar com entregas contínuas de projetos.',
          ],
        },
      ],
      technicalSkillsTitle: 'Habilidades Técnicas',
      technicalSkills: [
        'JavaScript',
        'TypeScript',
        'Python',
        'Java',
        'C/C++',
        'C#',
        'React',
        'Angular',
        'Tailwind CSS',
        'Node.js',
        'FastAPI',
        'Flask',
        'REST APIs',
        'TensorFlow',
        'PyTorch',
        'SQL',
        'NoSQL',
        'SQLite',
        'Git',
        'GitHub',
        'Postman',
      ],
      educationTitle: 'Formação Acadêmica',
      educationDegree: 'Bacharel em Ciência da Computação',
      educationInstitutionPeriod: 'Universidade Estadual de Maringá (UEM)',
      certificationsTitle: 'Formação Complementar / Certificações',
      certifications: [
        'Redes Neurais Artificiais (I e II) - IFTM (80h) | 2025',
        'Trilha de Especialização em Python - Fundação Bradesco (53h) | 2025',
        'Prompt Engineering Mastery - NORAI Connect (Finlândia) | 2025',
        'Engenharia de Prompt - Rocketseat | 2025',
        'CC50: Introdução à Ciência da Computação (Harvard/Pratica Estudar) (70h) | 2022',
      ],
      languagesTitle: 'Idiomas',
      languages: ['Inglês (Intermediário)', 'Espanhol (Básico)', 'Francês (Básico)'],
    },
    contact: {
      title: 'Vamos tirar sua ideia do papel',
      subtitle: 'Escolha o canal que preferir. Sem formulário e sem fricção.',
      badge: 'Contato direto',
      channelsTitle: 'Canais principais',
      responseTime: 'Tempo médio de resposta: até 24h úteis',
      channels: [
        {
          id: 'github',
          label: 'GitHub',
          description: 'Explore projetos reais, histórico técnico e padrões de arquitetura.',
          cta: 'Abrir perfil',
          url: 'https://github.com/NullCipherr',
          external: true,
        },
        {
          id: 'portfolio-repo',
          label: 'Portfolio OS',
          description: 'Veja o código-fonte completo deste portfólio e decisões de implementação.',
          cta: 'Abrir repositório',
          url: 'https://github.com/NullCipherr/portfolio-os',
          external: true,
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          description: 'Acompanhe trajetória profissional, experiência e networking técnico.',
          cta: 'Abrir perfil',
          url: 'https://www.linkedin.com/in/rvdonkey',
          external: true,
        },
      ],
    },
  },
  'en-US': {
    windows: {
      about: 'About Me',
      projects: 'Projects',
      contact: 'Contact',
      curriculum: 'Resume',
    },
    about: {
      name: 'Andrei Roberto da Costa',
      role: 'Developer | Web, AI, and Python Backend',
      bio: 'Computer Science graduate from UEM with experience building modern web applications using React, Node.js, and REST APIs. Strong background in Python and Machine Learning, applying practical solutions for automation and data analysis. Currently seeking opportunities to contribute with efficient solutions and grow continuously.',
      location: 'Maringa - PR, Brazil',
      availability: 'Open to opportunities and freelance projects',
      email: 'arcodeworks@gmail.com',
      technicalSkillsTitle: 'Technical Skills',
      technicalSkills: [
        'JavaScript',
        'TypeScript',
        'Python',
        'React',
        'Angular',
        'Tailwind CSS',
        'Node.js',
        'FastAPI',
        'Flask',
        'TensorFlow',
        'PyTorch',
        'SQL',
        'NoSQL',
        'Git',
        'Postman',
      ],
    },
    personalData: {
      age: '25 years old',
      gender: 'Male',
      phone: '(44) 99181-2069',
      email: 'arcodeworks@gmail.com',
      location: 'Maringa - PR, Brazil',
    },
    projects: {
      sidebar: {
        favorites: 'Favorites',
        repositories: 'GitHub Repositories',
      },
      favoritesTitle: 'Featured Projects',
      repositoriesTitle: 'GitHub Repositories',
      favorites: FAVORITE_PROJECTS_EN,
      items: COMMON_PROJECTS,
    },
    curriculum: {
      name: 'Andrei Roberto da Costa',
      role: 'Developer | Web, AI, and Python Backend',
      downloadLabel: 'Download PDF',
      professionalSummaryTitle: 'Professional Summary',
      professionalSummary:
        'Computer Science graduate from UEM with experience in modern web applications using React, Node.js, and REST APIs. Strong foundation in Python and Machine Learning, with practical work in automation and data analysis. Looking for opportunities to deliver efficient solutions and keep growing.',
      experienceTitle: 'Experience',
      experience: [
        {
          title: 'Freelance Developer | Python Backend',
          companyPeriod: '03/2024 - Present',
          highlights: [
            'Built backend APIs with FastAPI and Flask for data-oriented applications.',
            'Implemented machine learning and deep learning models (MLPs, CNNs, RNNs) with TensorFlow and PyTorch.',
            'Created automation and data processing pipelines for clients.',
            'Structured code using best practices: modularization, Git versioning, and clean project organization.',
            'Gathered requirements and delivered tailored solutions for different contexts.',
          ],
        },
        {
          title: 'Freelance Developer | Full Stack',
          companyPeriod: '07/2022 - Present',
          highlights: [
            'Built end-to-end modern web applications.',
            'Developed frontend with React, Angular, TypeScript, and Tailwind CSS focused on UX and performance.',
            'Implemented backend with Node.js, REST APIs, and relational database integrations.',
            'Delivered performance and responsiveness improvements to reduce load times.',
            'Contributed across planning, development, testing, and deployment.',
          ],
        },
        {
          title: 'Freelance Developer | Game Developer',
          companyPeriod: '02/2021 - 06/2023 (2 years and 4 months)',
          highlights: [
            'Developed gameplay systems and mechanics using C++ and Blueprints (Unreal Engine).',
            'Built physics simulators and multiplayer architectures.',
            'Created virtual reality (VR) applications.',
            'Built reusable modular frameworks for Mobile and Desktop projects.',
            'Published and validated solutions used by other developers.',
          ],
        },
        {
          title: 'AST Games Studios | Game Developer',
          companyPeriod: '12/2017 - 02/2021 (3 years and 2 months)',
          highlights: [
            'Developed 3D games for Desktop, Mobile, and Consoles with Unity and Unreal Engine.',
            'Implemented C++ mechanics and network synchronization systems.',
            'Created visual assets: textures (Substance Painter), 3D models (Blender), and shaders (OpenGL).',
            'Worked in multidisciplinary teams with continuous delivery practices.',
          ],
        },
      ],
      technicalSkillsTitle: 'Technical Skills',
      technicalSkills: [
        'JavaScript',
        'TypeScript',
        'Python',
        'Java',
        'C/C++',
        'C#',
        'React',
        'Angular',
        'Tailwind CSS',
        'Node.js',
        'FastAPI',
        'Flask',
        'REST APIs',
        'TensorFlow',
        'PyTorch',
        'SQL',
        'NoSQL',
        'SQLite',
        'Git',
        'GitHub',
        'Postman',
      ],
      educationTitle: 'Education',
      educationDegree: 'Bachelor in Computer Science',
      educationInstitutionPeriod: 'State University of Maringa (UEM)',
      certificationsTitle: 'Complementary Education / Certifications',
      certifications: [
        'Artificial Neural Networks (I and II) - IFTM (80h) | 2025',
        'Python Specialization Track - Fundacao Bradesco (53h) | 2025',
        'Prompt Engineering Mastery - NORAI Connect (Finland) | 2025',
        'Prompt Engineering - Rocketseat | 2025',
        'CC50: Introduction to Computer Science (Harvard/Pratica Estudar) (70h) | 2022',
      ],
      languagesTitle: 'Languages',
      languages: ['English (Intermediate)', 'Spanish (Basic)', 'French (Basic)'],
    },
    contact: {
      title: "Let's turn your idea into execution",
      subtitle: 'Pick your preferred channel. No forms, no friction.',
      badge: 'Direct contact',
      channelsTitle: 'Main channels',
      responseTime: 'Average response time: within 24 business hours',
      channels: [
        {
          id: 'github',
          label: 'GitHub',
          description: 'Review real projects, technical depth, and architecture standards.',
          cta: 'Open profile',
          url: 'https://github.com/NullCipherr',
          external: true,
        },
        {
          id: 'portfolio-repo',
          label: 'Portfolio OS',
          description: 'See the full source code of this portfolio and implementation decisions.',
          cta: 'Open repository',
          url: 'https://github.com/NullCipherr/portfolio-os',
          external: true,
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          description: 'Follow professional trajectory, experience, and technical networking.',
          cta: 'Open profile',
          url: 'https://www.linkedin.com/in/rvdonkey',
          external: true,
        },
      ],
    },
  },
};

function normalizeSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function localeBucket(locale: Locale): 'pt' | 'en' {
  return locale === 'pt-BR' ? 'pt' : 'en';
}

function parseJsonRaw<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function extractContactLinks(markdown: string): Array<{ label: string; url: string }> {
  const sectionMatch = markdown.match(/##\s+(Contato|Contact)\s*([\s\S]*)$/i);
  if (!sectionMatch) return [];

  const links: Array<{ label: string; url: string }> = [];
  const regex = /^-\s*([^:]+):\s*(https?:\/\/\S+)/gm;

  for (const match of sectionMatch[2].matchAll(regex)) {
    const label = match[1]?.trim();
    const url = match[2]?.trim();
    if (label && url) {
      links.push({ label, url });
    }
  }

  return links;
}

function toContactChannels(
  locale: Locale,
  links: Array<{ label: string; url: string }>,
  fallback: PortfolioContent['contact']['channels']
): PortfolioContent['contact']['channels'] {
  if (!links.length) return fallback;

  const mapPT = {
    github: { description: 'Explore projetos reais, histórico técnico e padrões de arquitetura.', cta: 'Abrir perfil' },
    linkedin: { description: 'Acompanhe trajetória profissional, experiência e networking técnico.', cta: 'Abrir perfil' },
    portfolio: { description: 'Veja o código-fonte completo deste portfólio e decisões de implementação.', cta: 'Abrir repositório' },
  };
  const mapEN = {
    github: { description: 'Review real projects, technical depth, and architecture standards.', cta: 'Open profile' },
    linkedin: { description: 'Follow professional trajectory, experience, and technical networking.', cta: 'Open profile' },
    portfolio: { description: 'See the full source code of this portfolio and implementation decisions.', cta: 'Open repository' },
  };

  const localization = locale === 'pt-BR' ? mapPT : mapEN;

  return links.map(({ label, url }) => {
    const normalized = normalizeSlug(label);
    const kind = normalized.includes('linkedin')
      ? 'linkedin'
      : normalized.includes('github')
      ? 'github'
      : normalized.includes('portfolio')
      ? 'portfolio'
      : 'portfolio';
    const copy = localization[kind];

    return {
      id: normalized || kind,
      label,
      description: copy.description,
      cta: copy.cta,
      url,
      external: true,
    };
  });
}

interface ExternalContentBundle {
  about: string;
  bioShort: string;
  bioLong: string;
  skills: ExternalSkillCategory[];
  projects: ExternalProject[];
}

function mergeExternalContent(
  base: PortfolioContent,
  locale: Locale,
  external: ExternalContentBundle,
  projectsMeta: ExternalProjectsMeta
) {
  const merged: PortfolioContent = structuredClone(base);

  const flatSkills = Array.from(
    new Set(
      external.skills
        .flatMap((group) => group.items || [])
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  if (external.bioShort.trim()) {
    merged.about.bio = external.bioShort.trim();
  }
  if (external.bioLong.trim()) {
    merged.curriculum.professionalSummary = external.bioLong.trim();
  }
  if (flatSkills.length) {
    merged.about.technicalSkills = flatSkills;
    merged.curriculum.technicalSkills = flatSkills;
  }

  if (external.projects.length) {
    const byId = new Map(external.projects.map((project) => [project.id, project]));
    const orderedIds =
      projectsMeta.order && projectsMeta.order.length
        ? projectsMeta.order
        : external.projects.map((project) => project.id);
    const seen = new Set<string>();
    const orderedProjects: ExternalProject[] = [];

    for (const id of orderedIds) {
      const project = byId.get(id);
      if (!project || seen.has(id)) continue;
      orderedProjects.push(project);
      seen.add(id);
    }

    for (const project of external.projects) {
      if (seen.has(project.id)) continue;
      orderedProjects.push(project);
      seen.add(project.id);
    }

    merged.projects.items = orderedProjects.map((project, index) => ({
      id: project.id || index + 1,
      title: project.title,
      description: project.summary || 'Projeto público hospedado no GitHub.',
      image: project.image || `https://picsum.photos/seed/${project.id || index}/600/400`,
      tags: (project.tags || ['github']).map((tag) => String(tag)),
      liveUrl: project.links?.demo || undefined,
      repositoryUrl: project.links?.github || undefined,
    }));

    const featuredIds = projectsMeta.featured && projectsMeta.featured.length ? projectsMeta.featured : [];
    const featuredProjects = featuredIds
      .map((id) => byId.get(id))
      .filter((project): project is ExternalProject => Boolean(project));

    if (featuredProjects.length) {
      merged.projects.favorites = featuredProjects.map((project) => ({
        id: project.id,
        title: project.title,
        summary: project.summary || 'Projeto público hospedado no GitHub.',
        highlights: project.highlights && project.highlights.length ? project.highlights : [project.summary || project.title],
        stack: project.stack && project.stack.length ? project.stack : (project.tags || []).slice(0, 6),
        repositoryUrl: project.links?.github || undefined,
      }));
    }
  }

  const links = extractContactLinks(external.about);
  merged.contact.channels = toContactChannels(locale, links, merged.contact.channels);

  return merged;
}

const RAW_BASE_URL = (
  import.meta.env.VITE_PORTFOLIO_CONTENT_BASE_URL ||
  'https://raw.githubusercontent.com/NullCipherr/portfolio-content/main'
).replace(/\/+$/, '');

const CONTENT_CACHE: Record<Locale, PortfolioContent> = {
  'pt-BR': PORTFOLIO_CONTENT['pt-BR'],
  'en-US': PORTFOLIO_CONTENT['en-US'],
};

const LOADING_BY_LOCALE: Partial<Record<Locale, Promise<PortfolioContent>>> = {};

function buildRawUrl(locale: Locale, file: string) {
  return `${RAW_BASE_URL}/content/${localeBucket(locale)}/${file}`;
}

async function fetchTextWithFallback(url: string, fallback: string): Promise<string> {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return fallback;
    return await response.text();
  } catch {
    return fallback;
  }
}

async function fetchJsonWithFallback<T>(url: string, fallback: T): Promise<T> {
  const text = await fetchTextWithFallback(url, '');
  if (!text) return fallback;
  return parseJsonRaw<T>(text, fallback);
}

async function loadExternalBundle(locale: Locale): Promise<ExternalContentBundle> {
  const [about, bioShort, bioLong, skills, projects] = await Promise.all([
    fetchTextWithFallback(buildRawUrl(locale, 'about.md'), ''),
    fetchTextWithFallback(buildRawUrl(locale, 'bio-short.md'), ''),
    fetchTextWithFallback(buildRawUrl(locale, 'bio-long.md'), ''),
    fetchJsonWithFallback<ExternalSkillCategory[]>(buildRawUrl(locale, 'skills.json'), []),
    fetchJsonWithFallback<ExternalProject[]>(buildRawUrl(locale, 'projects.json'), []),
  ]);

  return { about, bioShort, bioLong, skills, projects };
}

async function loadProjectsMeta(): Promise<ExternalProjectsMeta> {
  return fetchJsonWithFallback<ExternalProjectsMeta>(`${RAW_BASE_URL}/meta/projects-meta.json`, {});
}

async function ensurePortfolioContent(locale: Locale): Promise<PortfolioContent> {
  if (LOADING_BY_LOCALE[locale]) {
    return LOADING_BY_LOCALE[locale] as Promise<PortfolioContent>;
  }

  LOADING_BY_LOCALE[locale] = (async () => {
    const base = PORTFOLIO_CONTENT[locale];
    const [external, meta] = await Promise.all([loadExternalBundle(locale), loadProjectsMeta()]);
    const merged = mergeExternalContent(base, locale, external, meta);
    CONTENT_CACHE[locale] = merged;
    return merged;
  })();

  return LOADING_BY_LOCALE[locale] as Promise<PortfolioContent>;
}

export function getPortfolioContent(locale: Locale): PortfolioContent {
  return CONTENT_CACHE[locale] || PORTFOLIO_CONTENT[locale];
}

export function usePortfolioContent(locale: Locale): PortfolioContent {
  const [content, setContent] = React.useState<PortfolioContent>(() => getPortfolioContent(locale));

  React.useEffect(() => {
    let isActive = true;
    setContent(getPortfolioContent(locale));

    ensurePortfolioContent(locale)
      .then((nextContent) => {
        if (!isActive) return;
        setContent(nextContent);
      })
      .catch(() => {
        if (!isActive) return;
        setContent(getPortfolioContent(locale));
      });

    return () => {
      isActive = false;
    };
  }, [locale]);

  return content;
}
