import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles/site.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing application root');
const app = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);

// Production includes readable prerendered HTML; Vite development starts with an empty root.
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
