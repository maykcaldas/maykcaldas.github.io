import { blogEnabled } from '../content/settings';
import { useEffect, useState, type ReactNode } from 'react';
import { buildYear } from '../content/posts';
import { profile } from '../content/data';
import type { NavigationPage } from '../content/types';
import { Arrow } from './Primitives';
import { ContactIconLink } from './ContactIconLink';

function ThemeToggle() {
  // The server and first browser render match; the bootstrap script restores the visual theme.
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);
  const toggle = () => {
    const next = !dark;
    const theme = next ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next ? '#201e28' : '#f8f7f2');
    try {
      window.localStorage.setItem('mayk-theme', theme);
    } catch {
      /* Storage is optional. */
    }
    setDark(next);
  };
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={dark ? 'Use light theme' : 'Use dark theme'}
      aria-pressed={dark}
      onClick={toggle}
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}

const navigation: [string, NavigationPage][] = [
  ['/', 'Home'],
  ['/academic/', 'Academic'],
  ['/developer/', 'Developer'],
  ['/blog/', 'Blog'],
];

export function Layout({
  active,
  children,
}: {
  active?: NavigationPage;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header container">
        <a className="wordmark" href="/" aria-label="Mayk Caldas home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="wordmark-name">Mayk Caldas</span>
        </a>
        <nav aria-label="Main navigation">
          {navigation
            .filter(([, name]) => blogEnabled || name !== 'Blog')
            .map(([href, name]) => (
              <a
                key={href}
                href={href}
                aria-current={active === name ? 'page' : undefined}
              >
                {name}
              </a>
            ))}
        </nav>
        <div className="header-actions">
          <a className="contact-nav" href="/#contact">
            Let’s talk <Arrow />
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer container">
        <a className="footer-name" href="/" aria-label="Mayk Caldas home">
          <span className="footer-logo" aria-hidden="true" />
          <span>Science, software &amp; curiosity.</span>
        </a>
        <nav className="footer-links" aria-label="Contact links">
          <ContactIconLink href={profile.github} name="GitHub" icon="github" />
          <ContactIconLink
            href={profile.scholar}
            name="Google Scholar"
            icon="googlescholar"
          />
          <ContactIconLink href="https://x.com/maykcaldas" name="X" icon="x" />
          <ContactIconLink href={`mailto:${profile.email}`} name="Email" icon="email" />
        </nav>
        <p className="footer-bottom">
          <span>© {buildYear} Mayk Caldas</span>
          <a href="#main">Back to top ↑</a>
        </p>
      </footer>
    </>
  );
}
