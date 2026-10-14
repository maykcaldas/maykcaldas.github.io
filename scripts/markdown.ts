import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export function renderMarkdown(markdown: string): string {
  return sanitizeHtml(marked.parse(markdown, { async: false }), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height'],
      code: ['class'],
    },
  });
}
