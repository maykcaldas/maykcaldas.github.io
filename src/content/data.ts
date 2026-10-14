import type { Publication, Project, Education, Talk } from './types';

// Content lives here; React pages and shared CSS define the presentation.
// Publication metadata checked against Scholar and publisher pages on 2026-10-05.
export const profile = {
  name: 'Mayk Caldas',
  email: 'maykcaldas@gmail.com',
  scholar: 'https://scholar.google.com/citations?user=28PtMhIAAAAJ&hl=en',
  github: 'https://github.com/maykcaldas',
  cv: '/media/documents/Curriculum_Vitae.pdf',
  origin: 'https://www.maykcaldas.dev',
};

export const publications: Publication[] = [
  {
    id: 'bo-icl',
    year: 2026,
    title: 'Bayesian Optimization of Catalysis with In-Context Learning',
    venue: 'ACS Central Science',
    type: 'Journal article',
    topic: 'Machine learning',
    authors: 'Mayk Caldas Ramos, S. S. Michtavy, Andrew D. White, and Marc D. Porosoff',
    url: 'https://doi.org/10.1021/acscentsci.5c02418',
    code: 'https://github.com/ur-whitelab/BO-LIFT',
    image: '/media/images/toc4.png',
  },
  {
    id: 'kosmos',
    year: 2025,
    title: 'Kosmos: An AI Scientist for Autonomous Discovery',
    venue: 'arXiv',
    type: 'Preprint',
    topic: 'AI for science',
    authors: 'Ludovico Mitchener et al.',
    url: 'https://arxiv.org/abs/2511.02824',
    image: '/media/images/toc-kosmos.png',
    imageAlt: 'Kosmos workflow and performance, Figure 1',
    imageCaption: 'Figure 1 \u00b7 Kosmos workflow',
    imageSource: 'https://arxiv.org/html/2511.02824v1',
  },
  {
    id: 'ether0',
    year: 2025,
    title: 'Training a Scientific Reasoning Model for Chemistry',
    venue: 'NeurIPS 2025',
    type: 'Conference paper',
    topic: 'AI for science',
    authors:
      'Siddharth Narayanan, James Braza, Ryan-Rhys Griffiths, Albert Bou, Geemi Wellawatte, Mayk Caldas Ramos, et al.',
    url: 'https://proceedings.nips.cc/paper_files/paper/2025/hash/e754c82afb9bb0150bd6b71f5f49a9e6-Abstract-Conference.html',
    image: '/media/images/toc-ether0.png',
    imageAlt: 'ether0 training methodology and example reasoning trace, Figure 1',
    imageCaption: 'Figure 1 \u00b7 Training overview',
    imageSource: 'https://arxiv.org/html/2506.17238v2',
  },
  {
    id: 'llm-review',
    year: 2025,
    title: 'A review of large language models and autonomous agents in chemistry',
    venue: 'Chemical Science',
    type: 'Review',
    topic: 'AI for science',
    authors: 'Mayk Caldas Ramos, Christopher J. Collison, and Andrew D. White',
    url: 'https://doi.org/10.1039/D4SC03921A',
    code: 'https://github.com/ur-whitelab/LLMs-in-science',
    image: '/media/images/toc6.png',
  },
  {
    id: 'futurehouse',
    year: 2025,
    title: 'FutureHouse Platform: Superintelligent AI Agents for Scientific Discovery',
    venue: 'FutureHouse',
    type: 'Research announcement',
    topic: 'AI for science',
    authors:
      'Michael Skarlinski, Tyler Nadolski, James Braza, Remo Storni, Mayk Caldas, Ludovico Mitchener, Michaela Hinks, Andrew White, and Sam Rodriques',
    url: 'https://www.futurehouse.org/news/launching-futurehouse-platform-ai-agents',
    image: '/media/images/toc-futurehouse.png',
    imageAlt: 'FutureHouse agents: Crow, Falcon, Owl and Phoenix',
    imageCaption: 'Official platform illustration',
    imageSource:
      'https://www.futurehouse.org/news/launching-futurehouse-platform-ai-agents',
  },
  {
    id: 'microneedles',
    year: 2024,
    title:
      'Bioactive sucralfate-based microneedles promote wound healing through reprogramming macrophages and protecting endogenous growth factors',
    venue: 'Biomaterials',
    type: 'Journal article',
    topic: 'Molecular science',
    authors: 'Zhicheng Le, Mayk Caldas Ramos, Yufeng Shou, et al.',
    url: 'https://doi.org/10.1016/j.biomaterials.2024.122700',
    image: '/media/images/toc-microneedles.jpg',
    imageAlt:
      'Sucralfate protein binding and microneedle fabrication and characterization, Figure 1',
    imageCaption: 'Figure 1 \u00b7 Microneedle design',
    imageSource: 'https://doi.org/10.1016/j.biomaterials.2024.122700',
  },
  {
    id: 'mol-dev',
    year: 2024,
    title:
      'Predicting small molecules solubility on endpoint devices using deep ensemble neural networks',
    venue: 'Digital Discovery',
    type: 'Journal article',
    topic: 'Machine learning',
    authors: 'Mayk Caldas Ramos and Andrew D. White',
    url: 'https://doi.org/10.1039/D3DD00217A',
    code: 'https://github.com/ur-whitelab/mol.dev',
    demo: 'https://mol.dev/',
    image: '/media/images/toc5.png',
  },
  {
    id: 'hackathon',
    year: 2023,
    title:
      '14 examples of how LLMs can transform materials science and chemistry: a reflection on a large language model hackathon',
    venue: 'Digital Discovery',
    type: 'Journal article',
    topic: 'AI for science',
    authors: 'Kevin Maik Jablonka et al.',
    url: 'https://doi.org/10.1039/D3DD00113J',
    image: '/media/images/side1.png',
  },
  {
    id: 'pypolybuilder',
    year: 2021,
    title:
      'pyPolyBuilder: Automated Preparation of Molecular Topologies and Initial Configurations for Molecular Dynamics Simulations of Arbitrary Supramolecules',
    venue: 'Journal of Chemical Information and Modeling',
    type: 'Journal article',
    topic: 'Molecular science',
    authors: 'Mayk Caldas Ramos et al.',
    url: 'https://doi.org/10.1021/acs.jcim.0c01438',
    code: 'https://github.com/maykcaldas/pypolybuilder',
    image: '/media/images/toc3.png',
  },
  {
    id: 'dendridocker',
    year: 2021,
    title:
      'Drug-Loading Capacity of PAMAM Dendrimers Encapsulating Quercetin Molecules: A Molecular Dynamics Study with the 2016H66 Force Field',
    venue: 'Journal of Chemical Information and Modeling',
    type: 'Journal article',
    topic: 'Molecular science',
    authors: 'Mayk Caldas Ramos and Bruno A. C. Horta',
    url: 'https://doi.org/10.1021/acs.jcim.0c00960',
    code: 'https://github.com/maykcaldas/dendriDocker',
    image: '/media/images/toc2.png',
  },
  {
    id: 'dendrimers',
    year: 2019,
    title:
      'Molecular Dynamics Simulations of PAMAM and PPI Dendrimers Using the GROMOS-Compatible 2016H66 Force Field',
    venue: 'Journal of Chemical Information and Modeling',
    type: 'Journal article',
    topic: 'Molecular science',
    authors: 'Mayk Caldas Ramos, Vitor A. C. Horta, and Bruno A. C. Horta',
    url: 'https://doi.org/10.1021/acs.jcim.8b00911',
    image: '/media/images/toc1.png',
  },
];

export const projects: Project[] = [
  {
    id: 'mol-dev',
    name: 'mol.dev',
    category: 'Machine learning',
    kicker: 'Molecular properties, in your browser',
    description:
      'Predicting small-molecule solubility with deep ensemble neural networks that run on endpoint devices.',
    tags: ['Deep learning', 'Molecular properties', 'Web app'],
    repo: 'https://github.com/ur-whitelab/mol.dev',
    demo: 'https://mol.dev/',
    image: '/media/images/toc5.png',
    paper: 'mol-dev',
  },
  {
    id: 'pypolybuilder',
    name: 'pyPolyBuilder',
    category: 'Molecular simulation',
    kicker: 'From building blocks to molecular systems',
    description:
      'Automating the preparation of molecular topologies and initial configurations for simulations of complex supramolecules.',
    tags: ['Python', 'Molecular dynamics', 'Open source'],
    repo: 'https://github.com/maykcaldas/pypolybuilder',
    image: '/media/images/toc3.png',
    paper: 'pypolybuilder',
  },
  {
    id: 'bo-lift',
    name: 'BO-LIFT',
    category: 'Machine learning',
    kicker: 'Learning which experiment to try next',
    description:
      'Exploring Bayesian optimization with in-context learning, connecting language models with the search for better catalysts.',
    tags: ['Bayesian optimization', 'LLMs', 'Catalysis'],
    repo: 'https://github.com/ur-whitelab/BO-LIFT',
    image: '/media/images/toc4.png',
    paper: 'bo-icl',
  },
  {
    id: 'dendridocker',
    name: 'dendriDocker',
    category: 'Molecular simulation',
    kicker: 'Exploring molecular drug carriers',
    description:
      'Code accompanying molecular dynamics research into PAMAM dendrimers and their capacity to encapsulate quercetin molecules.',
    tags: ['Molecular dynamics', 'Drug carriers', 'Research software'],
    repo: 'https://github.com/maykcaldas/dendriDocker',
    image: '/media/images/toc2.png',
    paper: 'dendridocker',
  },
  {
    id: 'llms-in-science',
    name: 'LLMs in science',
    category: 'Research resources',
    kicker: 'A map of a fast-moving field',
    description:
      'An organized collection of studies on large language models and autonomous agents, accompanying our chemistry review.',
    tags: ['Literature', 'Autonomous agents', 'Community resource'],
    repo: 'https://github.com/ur-whitelab/LLMs-in-science',
    image: '/media/images/toc6.png',
    paper: 'llm-review',
  },
  {
    id: 'aimat',
    name: 'ML4Chem',
    category: 'Research resources',
    kicker: 'Learning by building',
    description:
      'Notebooks, datasets, and slides from my CZS 2024 Summer School talks on machine learning and large language models for chemistry.',
    tags: ['Notebooks', 'Teaching', 'Machine learning'],
    repo: 'https://github.com/maykcaldas/AIMAT_KIT_2024',
    demo: '/academic/teaching/ml4chem/',
    demoLabel: 'Explore the materials',
    image: '/media/images/kit_colab.png',
  },
];

// Education and historical talks are transcribed from the existing CV.
export const education: Education[] = [
  [
    '2019–2022',
    'PhD in Chemical Sciences',
    'Federal University of Rio de Janeiro · UFRJ',
    'Molecular dynamics of PAMAM dendrimers as drug carriers.',
  ],
  [
    '2020–2022',
    'Bachelor in Computing Systems',
    'Fluminense Federal University · UFF / CEDERJ',
    'QScrapper2.0: web scraping HIV medicine data from Quora.',
  ],
  [
    '2017–2019',
    'Master’s in Chemical Sciences',
    'Federal University of Rio de Janeiro · UFRJ',
    'Structural properties of PAMAM and PPI dendrimers across generations and pH environments.',
  ],
  [
    '2012–2017',
    'Bachelor of Chemical Engineering',
    'Federal University of Rio de Janeiro · UFRJ',
    'A molecular dynamics study of water diffusion in LTA-type zeolites.',
  ],
];

export const talks: Talk[] = [
  [
    '2024',
    'CZS Summer School · ML4Chem',
    'Machine learning fundamentals, molecular property prediction, and LLMs in chemistry.',
    '/academic/teaching/ml4chem/',
  ],
  [
    '2023',
    'Platform for Advanced Scientific Computing',
    'Using In-Context Learning and Frozen Large Language Models for Bayesian Optimization of Catalysts.',
  ],
  [
    '2023',
    'Geothermal AInnovation Competition',
    'How Large Language Models are Impacting Chemistry.',
  ],
  [
    '2020',
    'APS / ICTP-SAIFR',
    'Using multiple-restrained molecular dynamics to evaluate the loading capacity of quercetin molecules in PAMAM dendrimers.',
  ],
  [
    '2019',
    'XX Brazilian Symposium on Theoretical Chemistry',
    'Using steered molecular dynamics simulations for building models of dendrimer–drug complexes.',
  ],
  [
    '2018',
    'Molecular Modeling in Biological Systems School',
    'Molecular dynamics of PAMAM and PPI dendrimers: systematic analysis of pH and generation effects.',
  ],
];
