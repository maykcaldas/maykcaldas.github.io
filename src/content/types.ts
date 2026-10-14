export interface Publication {
  id: string;
  year: number;
  title: string;
  venue: string;
  type: string;
  topic: string;
  authors: string;
  url: string;
  code?: string;
  demo?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageSource?: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  kicker: string;
  description: string;
  tags: string[];
  repo: string;
  demo?: string;
  demoLabel?: string;
  image: string;
  paper?: string;
}

export interface Post {
  title: string;
  date: string;
  tags: string[];
  file: string;
  slug: string;
  category: string;
  excerpt: string;
  html: string;
}

export type Education = [years: string, degree: string, school: string, thesis: string];
export type Talk = [year: string, event: string, title: string, href?: string];
export type NavigationPage = 'Home' | 'Academic' | 'Developer' | 'Blog';
