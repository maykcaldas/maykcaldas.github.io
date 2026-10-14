import { blogEnabled } from '../content/settings';
import { posts } from '../content/posts';
import type { NavigationPage, Post } from '../content/types';

export interface Route {
  path: string;
  title: string;
  description: string;
  kind:
    | 'home'
    | 'academic'
    | 'developer'
    | 'blog'
    | 'post'
    | 'teaching'
    | 'redirect'
    | 'legacy-post'
    | 'not-found';
  active?: NavigationPage;
  post?: Post;
  redirect?: string;
  noindex?: boolean;
}

const allRoutes: Route[] = [
  {
    path: '/',
    kind: 'home',
    active: 'Home',
    title: 'Mayk Caldas — Science, software & curiosity',
    description:
      'Mayk Caldas — AI research engineer working at the intersection of chemistry, machine learning, and scientific software.',
  },
  {
    path: '/academic/',
    kind: 'academic',
    active: 'Academic',
    title: 'Academic — Mayk Caldas',
    description:
      'Research, publications, education, and teaching by Mayk Caldas. Exploring AI for science, molecular simulation, and machine learning.',
  },
  {
    path: '/developer/',
    kind: 'developer',
    active: 'Developer',
    title: 'Developer — Mayk Caldas',
    description:
      'Scientific software and open-source projects by Mayk Caldas, including mol.dev, pyPolyBuilder, BO-LIFT, and dendriDocker.',
  },
  {
    path: '/blog/',
    kind: 'blog',
    active: 'Blog',
    title: 'Blog — Mayk Caldas',
    description:
      'Notes on chemistry, AI, learning, and personal projects by Mayk Caldas.',
  },
  {
    path: '/academic/teaching/ml4chem/',
    kind: 'teaching',
    active: 'Academic',
    title: 'ML4Chem · CZS 2024 Summer School — Mayk Caldas',
    description:
      'Notebooks, datasets, and slides for Mayk Caldas’s CZS 2024 Summer School talks on machine learning and chemistry.',
  },
  ...posts.map((post): Route => ({
    path: `/blog/${post.slug}/`,
    kind: 'post',
    active: 'Blog',
    title: `${post.title} — Mayk Caldas`,
    description: post.excerpt,
    post,
  })),
  {
    path: '/pages/blog.html',
    kind: 'redirect',
    redirect: '/blog/',
    noindex: true,
    title: 'Blog — Mayk Caldas',
    description: 'The blog has moved.',
  },
  {
    path: '/pages/aimat2024.html',
    kind: 'redirect',
    redirect: '/academic/teaching/ml4chem/',
    noindex: true,
    title: 'ML4Chem materials — Mayk Caldas',
    description: 'ML4Chem materials have moved.',
  },
  {
    path: '/pages/post.html',
    kind: 'legacy-post',
    active: 'Blog',
    noindex: true,
    title: 'Find a blog post — Mayk Caldas',
    description: 'Find a post in Mayk Caldas’s notebook.',
  },
  {
    path: '/generic.html',
    kind: 'redirect',
    redirect: '/',
    noindex: true,
    title: 'Mayk Caldas',
    description: 'Continue to the personal website.',
  },
  {
    path: '/elements.html',
    kind: 'redirect',
    redirect: '/',
    noindex: true,
    title: 'Mayk Caldas',
    description: 'Continue to the personal website.',
  },
];

// Exclude current and legacy blog URLs while preserving their definitions above.
export const routes = allRoutes.filter(
  (route) =>
    blogEnabled ||
    !(
      route.kind === 'blog' ||
      route.kind === 'post' ||
      route.kind === 'legacy-post' ||
      route.path === '/pages/blog.html'
    ),
);

export const notFoundRoute: Route = {
  path: '/404.html',
  kind: 'not-found',
  noindex: true,
  title: 'Page not found — Mayk Caldas',
  description:
    'This page could not be found. Explore Mayk Caldas’s research, projects, and writing.',
};

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/index\.html$/, '/') || '/';
  return (
    routes.find(
      (route) =>
        route.path === path ||
        (route.path.endsWith('/') && route.path.slice(0, -1) === path),
    ) ?? notFoundRoute
  );
}

export function legacyPostTarget(search: string): string | undefined {
  if (!blogEnabled) return undefined;
  const file = new URLSearchParams(search).get('file');
  const post = posts.find((candidate) => candidate.file === file);
  return post ? `/blog/${post.slug}/` : undefined;
}
