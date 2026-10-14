// Preview the actual static output, including real 404 responses (no SPA fallback).
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

http
  .createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method ?? '')) {
        response.writeHead(405, { Allow: 'GET, HEAD' });
        response.end();
        return;
      }
      const url = new URL(request.url ?? '/', 'http://localhost');
      let pathname: string;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        response.writeHead(400);
        response.end('Bad request');
        return;
      }

      // Only serve public files inside dist; reject hidden paths and traversal.
      const requestedFile = resolve(outputDirectory, `.${pathname}`);
      const isAllowedPath =
        requestedFile.startsWith(resolve(outputDirectory) + sep) &&
        !pathname.split('/').some((part) => part.startsWith('.'));
      let file = requestedFile;
      let fileInfo = isAllowedPath ? await stat(file).catch(() => null) : null;
      // Root itself is the only permitted directory outside the descendant check.
      if (pathname === '/') {
        file = resolve(outputDirectory, 'index.html');
        fileInfo = await stat(file);
      }

      // Match static hosting: directory URLs end in / and serve index.html.
      if (fileInfo?.isDirectory()) {
        if (!pathname.endsWith('/')) {
          response.writeHead(301, { Location: `${url.pathname}/${url.search}` });
          response.end();
          return;
        }
        file = resolve(file, 'index.html');
        fileInfo = await stat(file).catch(() => null);
      }

      // Missing files return the custom 404 page with an actual 404 status.
      const fileExists = fileInfo?.isFile();
      if (!fileExists) {
        file = resolve(outputDirectory, '404.html');
      }
      const bytes = await readFile(file);
      response.writeHead(fileExists ? 200 : 404, {
        'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
        'Content-Length': bytes.length,
      });
      response.end(request.method === 'HEAD' ? undefined : bytes);
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end('Build the site with npm run build before previewing.');
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`Static React preview: http://127.0.0.1:${port}`),
  );
