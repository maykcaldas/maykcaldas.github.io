import { blogEnabled } from '../src/content/settings';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publications, projects } from '../src/content/data';
import { posts } from '../src/content/posts';
import { JSDOM } from 'jsdom';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const read = (path: string) => readFile(resolve(root, path), 'utf8');
const files: string[] = JSON.parse(await read('routes.json'));
const pages = new Map(
  await Promise.all(files.map(async (path) => [path, await read(path)] as const)),
);

test('every prerendered route has content, metadata and stable unique IDs', () => {
  for (const [path, html] of pages) {
    const document = new JSDOM(html).window.document;
    assert.equal(document.documentElement.lang, 'en', path);
    assert.ok(document.title, path);
    assert.ok(
      document.querySelector('meta[name="description"]')?.getAttribute('content'),
      path,
    );
    assert.ok(
      document
        .querySelector('link[rel="canonical"]')
        ?.getAttribute('href')
        ?.startsWith('https://www.maykcaldas.dev/'),
      path,
    );
    assert.equal(document.querySelectorAll('h1').length, 1, path);
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id);
    assert.equal(ids.length, new Set(ids).size, path);
    assert.equal(
      document.querySelector('#root')?.getAttribute('data-prerendered'),
      'true',
      path,
    );
    assert.ok(!html.includes('/src/main.tsx'), path);
  }
});

test('all internal page links, anchors and content assets exist in dist', async () => {
  for (const [path, html] of pages) {
    const document = new JSDOM(html).window.document;
    for (const node of document.querySelectorAll('[href], [src]')) {
      const href = node.getAttribute('href') ?? node.getAttribute('src') ?? '';
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const url = new URL(href, `https://local.test/${path}`);
      assert.equal(url.protocol, 'https:', href);
      const local = decodeURIComponent(url.pathname).slice(1);
      const info = await stat(resolve(root, local)).catch(() => null);
      assert.ok(info, `${path}: missing ${href}`);
      const target = info.isDirectory()
        ? `${local}${local.endsWith('/') || !local ? '' : '/'}index.html`
        : local;
      await stat(resolve(root, target));
      if (url.hash && target.endsWith('.html')) {
        const targetDocument = new JSDOM(pages.get(target) ?? (await read(target))).window
          .document;
        assert.ok(
          targetDocument.getElementById(decodeURIComponent(url.hash.slice(1))),
          `${path}: missing anchor ${href}`,
        );
      }
    }
  }
});

test('research, projects and Markdown posts remain available without browser JavaScript', async () => {
  const academic = new JSDOM(pages.get('academic/index.html')).window.document;
  const developer = new JSDOM(pages.get('developer/index.html')).window.document;
  assert.equal(academic.querySelectorAll('.publication').length, publications.length);
  assert.equal(developer.querySelectorAll('.project-card').length, projects.length);
  for (const publication of publications)
    assert.ok(academic.getElementById(publication.id));
  const feed = blogEnabled ? await read('feed.xml') : '';
  const sitemap = await read('sitemap.xml');
  for (const post of posts) {
    const html = pages.get(`blog/${post.slug}/index.html`);
    assert.ok(html, post.file);
    assert.ok(
      new JSDOM(html).window.document.querySelector('.prose')?.textContent?.trim(),
      post.file,
    );
    assert.ok(feed.includes(`/blog/${post.slug}/`));
    assert.ok(sitemap.includes(`/blog/${post.slug}/`));
  }
  assert.equal(new Set(publications.map((p) => p.id)).size, publications.length);
  assert.equal((await read('CNAME')).trim(), 'www.maykcaldas.dev');
});

test('legacy routes retain redirects and 404 is not indexed', () => {
  if (blogEnabled)
    assert.match(pages.get('pages/blog.html')!, /content="0;url=\/blog\/"/);
  assert.match(
    pages.get('pages/aimat2024.html')!,
    /content="0;url=\/academic\/teaching\/ml4chem\/"/,
  );
  assert.match(pages.get('404.html')!, /name="robots" content="noindex"/);
});

test('disabled blog is absent from public pages, routes, feed and generated content', async () => {
  if (blogEnabled) return;
  assert.equal(posts.length, 0);
  for (const path of ['blog', 'pages/blog.html', 'pages/post.html', 'feed.xml']) {
    assert.equal(await stat(resolve(root, path)).catch(() => null), null, path);
  }
  for (const [path, html] of pages) {
    const document = new JSDOM(html).window.document;
    assert.equal(
      document.querySelectorAll(
        'a[href*="/blog/"], a[href="/feed.xml"], link[rel="alternate"]',
      ).length,
      0,
      path,
    );
    assert.equal(document.querySelectorAll('.writing-section').length, 0, path);
  }
  assert.ok(!(await read('sitemap.xml')).includes('/blog/'));
});
