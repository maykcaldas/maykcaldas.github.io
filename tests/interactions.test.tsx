import { blogEnabled } from '../src/content/settings';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Academic } from '../src/pages/Academic';
import { Developer } from '../src/pages/Developer';
import { Layout } from '../src/components/Layout';
import { legacyPostTarget, resolveRoute } from '../src/lib/routes';
import { renderMarkdown } from '../scripts/markdown';

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute('data-theme');
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
});

describe('search and category filtering', () => {
  it('combines case-insensitive search with topic selection and shows an empty state', async () => {
    const user = userEvent.setup();
    render(<Academic />);
    expect(screen.getByRole('status').textContent).toBe('11 of 11 shown');
    await user.type(screen.getByRole('searchbox'), '  dendrimer  ');
    expect(screen.getByRole('status').textContent).toBe('2 of 11 shown');
    await user.selectOptions(screen.getByLabelText('Topic'), 'AI for science');
    expect(screen.getByRole('status').textContent).toBe('0 of 11 shown');
    expect(screen.getByText(/No publications match/).hidden).toBe(false);
    await user.clear(screen.getByRole('searchbox'));
    expect(screen.getByRole('status').textContent).toBe('5 of 11 shown');
  });

  it('reveals a publication targeted by an anchor after filters hid it', async () => {
    const user = userEvent.setup();
    const scroll = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scroll,
    });
    render(<Academic />);
    await user.type(screen.getByRole('searchbox'), 'impossible match');
    expect(document.getElementById('mol-dev')?.hidden).toBe(true);
    window.history.replaceState(null, '', '/academic/#mol-dev');
    fireEvent(window, new HashChangeEvent('hashchange'));
    await waitFor(() => expect(document.getElementById('mol-dev')?.hidden).toBe(false));
    expect(screen.getByRole('status').textContent).toBe('11 of 11 shown');
    expect(scroll).toHaveBeenCalled();
  });

  it('keeps project cards as grid children and filters technologies', async () => {
    const user = userEvent.setup();
    const { container } = render(<Developer />);
    expect(container.querySelectorAll('.project-grid > article').length).toBe(6);
    await user.type(screen.getByRole('searchbox'), 'Python');
    expect(screen.getByRole('status').textContent).toBe('1 of 6 shown');
    expect(
      container.querySelectorAll('.project-grid > article:not([hidden])').length,
    ).toBe(1);
  });
});

it('restores the theme button and persists a toggle, even when storage is unavailable', async () => {
  document.documentElement.dataset.theme = 'dark';
  render(
    <Layout>
      <h1>Theme test</h1>
    </Layout>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Use light theme' }));
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(window.localStorage.getItem('mayk-theme')).toBe('light');
  vi.spyOn(window.Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Storage disabled');
  });
  await userEvent.click(screen.getByRole('button', { name: 'Use dark theme' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true');
});

it('resolves directory/index URLs, unknown paths, and only allowlisted legacy posts', () => {
  expect(resolveRoute('/academic').kind).toBe('academic');
  expect(resolveRoute('/blog/ai-chemistry/index.html').kind).toBe(
    blogEnabled ? 'post' : 'not-found',
  );
  expect(resolveRoute('/unknown/').kind).toBe('not-found');
  expect(legacyPostTarget('?file=ai-chemistry.md')).toBe(
    blogEnabled ? '/blog/ai-chemistry/' : undefined,
  );
  for (const file of [
    '../../index.html',
    'https://example.com',
    'missing.md',
    '__proto__',
    '',
  ]) {
    expect(legacyPostTarget(`?file=${encodeURIComponent(file)}`)).toBeUndefined();
  }
});

it('sanitizes Markdown scripts, event handlers and dangerous links without losing code', () => {
  const html = renderMarkdown(
    '<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">\n\n[bad](javascript:alert%281%29)\n\n```js\nconsole.log("hello");\n```',
  );
  expect(html).not.toMatch(/<script|onerror|href="javascript:/);
  expect(html).toContain('<code class="language-js">');
  expect(html).toContain('console.log');
});
