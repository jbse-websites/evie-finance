import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const mimeTypes = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

// Dynamically import the worker handler
const { default: handler } = await import('./dist/server/server.js');

const server = createServer(async (req, res) => {
  const url = req.url || '/';

  // Serve static assets from dist/client/
  if (url.startsWith('/assets/')) {
    const filePath = join(__dirname, 'dist/client', url);
    if (existsSync(filePath)) {
      const ext = extname(filePath);
      const content = readFileSync(filePath);
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000'
      });
      res.end(content);
      return;
    }
  }

  // Collect body
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = chunks.length ? Buffer.concat(chunks) : null;

  // Build headers
  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) {
    headers[k] = Array.isArray(v) ? v.join(', ') : String(v);
  }

  // Call worker fetch handler
  const request = new Request(`http://localhost:4199${url}`, {
    method: req.method,
    headers,
    body: body && body.length > 0 ? body : undefined,
  });

  try {
    const response = await handler.fetch(request, {}, { waitUntil: () => {}, passThroughOnException: () => {} });
    const buf = await response.arrayBuffer();
    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    res.end(Buffer.from(buf));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(4199, () => {
  console.log('EVNOW production server running at http://localhost:4199');
});
