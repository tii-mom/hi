import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const distDir = path.resolve(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

function fail(message) {
  globalThis.console.error(`[release-smoke] ${message}`);
  process.exit(1);
}

if (!existsSync(indexPath)) {
  fail('dist/index.html is missing. Run npm run build before release smoke.');
}

const indexHtml = readFileSync(indexPath, 'utf8');

if (!indexHtml.includes('<div id="root"></div>')) {
  fail('dist/index.html does not contain the React root element.');
}

const assetDir = path.join(distDir, 'assets');

if (!existsSync(assetDir)) {
  fail('dist/assets is missing.');
}

const assets = readdirSync(assetDir);
const jsAssets = assets.filter((asset) => asset.endsWith('.js'));
const cssAssets = assets.filter((asset) => asset.endsWith('.css'));

if (jsAssets.length === 0) {
  fail('dist/assets contains no JavaScript bundles.');
}

if (cssAssets.length === 0) {
  fail('dist/assets contains no CSS bundles.');
}

const expectedChunks = ['vendor-react', 'vendor-i18n'];
const missingChunks = expectedChunks.filter((chunk) => !jsAssets.some((asset) => asset.startsWith(chunk)));

if (missingChunks.length > 0) {
  fail(`expected release chunks are missing: ${missingChunks.join(', ')}`);
}

globalThis.console.log(`[release-smoke] ok: ${jsAssets.length} JS assets, ${cssAssets.length} CSS assets.`);
