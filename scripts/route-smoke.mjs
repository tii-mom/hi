import { spawn } from 'node:child_process';
import process from 'node:process';

const host = '127.0.0.1';
const port = 4173;
const baseUrl = `http://${host}:${port}`;
const routes = [
  '/',
  '/terminal',
  '/terminal/portfolio',
  '/terminal/risk',
  '/terminal/skills',
  '/terminal/copy',
  '/terminal/companion',
  '/terminal/missing-route',
];
let shuttingDown = false;

function fail(message, child) {
  globalThis.console.error(`[route-smoke] ${message}`);
  child?.kill('SIGTERM');
  process.exit(1);
}

function delay(ms) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });
}

async function waitForPreview(child) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await globalThis.fetch(baseUrl);

      if (response.ok) {
        return;
      }
    } catch {
      await delay(250);
    }
  }

  fail('vite preview did not become ready.', child);
}

async function assertRoute(route, child) {
  const response = await globalThis.fetch(`${baseUrl}${route}`);

  if (!response.ok) {
    fail(`${route} returned HTTP ${response.status}.`, child);
  }

  const html = await response.text();

  if (!html.includes('<div id="root"></div>')) {
    fail(`${route} did not return the SPA root document.`, child);
  }
}

const child = spawn(
  process.execPath,
  ['./node_modules/vite/bin/vite.js', 'preview', '--host', host, '--port', String(port), '--strictPort'],
  {
    cwd: process.cwd(),
    stdio: 'ignore',
  },
);

child.on('exit', (code) => {
  if (!shuttingDown && code !== null && code !== 0) {
    fail(`vite preview exited early with code ${code}.`);
  }
});

try {
  await waitForPreview(child);

  for (const route of routes) {
    await assertRoute(route, child);
  }

  globalThis.console.log(`[route-smoke] ok: ${routes.length} routes returned the SPA document.`);
  shuttingDown = true;
  child.kill('SIGTERM');
} catch (error) {
  fail(error instanceof Error ? error.message : 'unknown route smoke failure', child);
}
