import { blogEnabled } from '../src/content/settings.ts';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { decodeHTML } from 'entities';
import { renderMarkdown } from './markdown.ts';
import type { Post } from '../src/content/types.ts';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const postsDirectory = resolve(projectRoot, 'content/posts');

type PostMetadata = Pick<Post, 'file' | 'title' | 'date' | 'tags'>;

function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  // Round-trip the date to reject values such as February 30.
  return (
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}

function validateMetadata(entry: unknown): PostMetadata {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Invalid post metadata.');
  }

  const { file, title, date, tags } = entry as Record<string, unknown>;

  // Restrict filenames to Markdown files inside the posts directory.
  if (typeof file !== 'string' || !/^[a-z0-9-]+\.md$/.test(file)) {
    throw new Error(`Invalid post filename: ${String(file)}`);
  }

  if (
    typeof title !== 'string' ||
    !title.trim() ||
    !isValidDate(date) ||
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === 'string')
  ) {
    throw new Error(`Invalid metadata in ${file}`);
  }

  return { file, title, date, tags };
}

function prepareMarkdown(source: string, title: string): string {
  // index.json owns metadata; older posts may also have YAML front matter.
  const withoutFrontMatter = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();

  // The article component already displays the title above the body.
  return withoutFrontMatter.replace(
    /^#{1,2}\s+([^\n]+)\r?\n+/,
    (match: string, heading: string) => {
      const repeatsTitle = heading.trim().toLowerCase() === title.trim().toLowerCase();
      return repeatsTitle ? '' : match;
    },
  );
}

function createExcerpt(markdown: string): string {
  const firstParagraph =
    markdown.split(/\r?\n\s*\r?\n/).find((part) => !/^(#|```|-)/.test(part)) ?? '';

  const paragraphHtml = marked.parse(firstParagraph, { async: false });
  const plainText = sanitizeHtml(paragraphHtml, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return decodeHTML(plainText).trim();
}

async function readPost(entry: unknown): Promise<Post> {
  const metadata = validateMetadata(entry);
  const source = await readFile(resolve(postsDirectory, metadata.file), 'utf8');
  const markdown = prepareMarkdown(source, metadata.title);

  return {
    ...metadata,
    slug: metadata.file.replace(/\.md$/, ''),
    category: metadata.tags.includes('chemistry') ? 'AI & chemistry' : 'Personal notes',
    excerpt: createExcerpt(markdown),
    html: renderMarkdown(markdown),
  };
}

export async function generateContent() {
  const indexFile = resolve(postsDirectory, 'index.json');
  const index: unknown = JSON.parse(await readFile(indexFile, 'utf8'));

  if (!Array.isArray(index)) {
    throw new Error('Post index must be an array.');
  }

  const posts = await Promise.all(index.map(readPost));
  posts.sort((first, second) => second.date.localeCompare(first.date));

  const uniqueSlugs = new Set(posts.map((post) => post.slug));
  if (uniqueSlugs.size !== posts.length) {
    throw new Error('Duplicate post slugs');
  }

  const outputFile = resolve(projectRoot, 'src/content/posts.generated.json');
  // Keep drafts on disk, but do not include their text in the public browser bundle.
  const content = { year: new Date().getUTCFullYear(), posts: blogEnabled ? posts : [] };
  const json = JSON.stringify(content, null, 2) + '\n';

  await mkdir(resolve(projectRoot, 'src/content'), { recursive: true });

  // Avoid triggering a development reload when the generated content is unchanged.
  const previousJson = await readFile(outputFile, 'utf8').catch(() => '');
  if (previousJson !== json) {
    await writeFile(outputFile, json);
  }

  return posts;
}
