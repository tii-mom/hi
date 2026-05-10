import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const reactVendorPackages = new Set([
  'react',
  'react-dom',
  'react-is',
  'react-router',
  'react-router-dom',
  'scheduler',
]);

const i18nVendorPackages = new Set([
  'i18next',
  'i18next-browser-languagedetector',
  'react-i18next',
]);

function getPackageName(id: string) {
  const [, packagePath] = id.split('node_modules/');

  if (!packagePath) {
    return undefined;
  }

  const packageParts = packagePath.split('/');

  return packagePath.startsWith('@')
    ? `${packageParts[0]}/${packageParts[1]}`
    : packageParts[0];
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const packageName = getPackageName(id);

            if (!packageName) {
              return undefined;
            }

            if (reactVendorPackages.has(packageName)) {
              return 'vendor-react';
            }

            if (packageName === 'recharts' || packageName.startsWith('d3-')) {
              return 'vendor-recharts';
            }

            if (packageName === 'motion' || packageName.startsWith('@motionone/')) {
              return 'vendor-motion';
            }

            if (i18nVendorPackages.has(packageName)) {
              return 'vendor-i18n';
            }

            return undefined;
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      // Local automation can disable HMR to reduce browser flicker during edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
