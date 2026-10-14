import { blogEnabled } from '../src/content/settings';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { profile } from '../src/content/data';
import { posts } from '../src/content/posts';
import type { Post } from '../src/content/types';
import { notFoundRoute, routes, type Route } from '../src/lib/routes';
import { projectRoot } from './content';

const outputDirectory = resolve(projectRoot, 'dist');
const emptyRoot = '<div id="root"></div>';

// Metadata and feeds contain text inside HTML/XML, so escape special characters.
function escapeMarkup(value: string): string {
  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => replacements[character]!);
}

async function saveOutput(relativePath: string, content: string) {
  const file = resolve(outputDirectory, relativePath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content.trim() + '\n');
}

function createPageMetadata(route: Route): string {
  const canonicalUrl = profile.origin + (route.redirect ?? route.path);
  const title = escapeMarkup(route.title);
  const description = escapeMarkup(route.description);

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${canonicalUrl}">`,
    blogEnabled
      ? '<link rel="alternate" type="application/rss+xml" title="Mayk Caldas — Blog" href="/feed.xml">'
      : '',
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:type" content="${route.kind === 'post' ? 'article' : 'website'}">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
    `<meta property="og:image" content="${profile.origin}/media/images/MaykCaldas.jpg">`,
    route.noindex ? '<meta name="robots" content="noindex">' : '',
    route.redirect ? `<meta http-equiv="refresh" content="0;url=${route.redirect}">` : '',
  ].join('\n');
}

function createFeedItem(post: Post): string {
  const url = `${profile.origin}/blog/${post.slug}/`;
  const publicationDate = new Date(`${post.date}T12:00:00Z`).toUTCString();

  return [
    '<item>',
    `<title>${escapeMarkup(post.title)}</title>`,
    `<link>${url}</link>`,
    `<guid>${url}</guid>`,
    `<pubDate>${publicationDate}</pubDate>`,
    `<description>${escapeMarkup(post.excerpt)}</description>`,
    '</item>',
  ].join('');
}

// Vite has already built this template with the final JavaScript and CSS URLs.
const template = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
if (!template.includes(emptyRoot)) {
  throw new Error('Missing prerender root in Vite output.');
}

const generatedFiles: string[] = [];
for (const route of [...routes, notFoundRoute]) {
  // Directory URLs such as /academic/ become academic/index.html.
  const relativePath = route.path.endsWith('/')
    ? `${route.path.slice(1)}index.html`
    : route.path.slice(1);

  const content = renderToString(
    <StrictMode>
      <App pathname={route.path} />
    </StrictMode>,
  );

  // This marker tells the browser to hydrate existing HTML instead of replacing it.
  const populatedRoot = `<div id="root" data-prerendered="true">${content}</div>`;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, createPageMetadata(route))
    .replace(emptyRoot, populatedRoot);

  await saveOutput(relativePath, html);
  generatedFiles.push(relativePath);
}

// Search engines and feed readers use the same route and post data as the pages.
const sitemapEntries = routes
  .filter((route) => !route.noindex)
  .map((route) => `<url><loc>${profile.origin}${route.path}</loc></url>`)
  .join('');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  sitemapEntries,
  '</urlset>',
].join('');

const feed = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0"><channel>',
  '<title>Mayk Caldas — The notebook</title>',
  `<link>${profile.origin}/blog/</link>`,
  '<description>Notes on science, software, and learning.</description>',
  '<language>en</language>',
  posts.map(createFeedItem).join(''),
  '</channel></rss>',
].join('');

await saveOutput('sitemap.xml', sitemap);
await saveOutput(
  'robots.txt',
  `User-agent: *\nAllow: /\nSitemap: ${profile.origin}/sitemap.xml`,
);
if (blogEnabled) {
  await saveOutput('feed.xml', feed);
}
await saveOutput('routes.json', JSON.stringify(generatedFiles, null, 2));

console.log(
  `Prerendered ${generatedFiles.length} React pages and sitemap${blogEnabled ? ", plus RSS" : ""} into dist/.`,
);
