// Inline in <head>, before styles, to prevent a flash when restoring a saved dark theme.
export const themeBootstrap = `try {
  const theme = localStorage.getItem('mayk-theme');
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#201e28' : '#f8f7f2');
  }
} catch { /* Storage is optional. */ }`;
