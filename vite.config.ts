import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { generateContent, projectRoot } from './scripts/content.ts';
import { themeBootstrap } from './src/lib/theme-bootstrap.ts';
import { resolve } from 'node:path';

function contentPlugin(): Plugin {
  return {
    name: 'markdown-content',
    async buildStart() {
      await generateContent();
    },
    configureServer(server) {
      const directory = resolve(projectRoot, 'content/posts');
      server.watcher.add(directory);
      let queue = Promise.resolve();
      const update = (path: string) => {
        if (!path.startsWith(directory + '/')) return;
        queue = queue
          .then(async () => {
            await generateContent();
          })
          .catch((error: unknown) => {
            const message = error instanceof Error ? error.message : String(error);
            server.config.logger.error(message);
            server.ws.send({
              type: 'error',
              err: { message, stack: '', plugin: 'markdown-content' },
            });
          });
      };
      server.watcher.on('change', update).on('add', update).on('unlink', update);
    },
    transformIndexHtml() {
      return [{ tag: 'script', children: themeBootstrap, injectTo: 'head' }];
    },
  };
}

export default defineConfig({
  plugins: [react(), contentPlugin()],
  base: '/',
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  build: { outDir: 'dist', emptyOutDir: true },
});
