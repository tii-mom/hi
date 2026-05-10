import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';
import i18n from '../i18n';

globalThis.ResizeObserver =
  globalThis.ResizeObserver ??
  (class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver);

beforeEach(() => {
  void i18n.changeLanguage('en');
});

afterEach(() => {
  cleanup();
});
