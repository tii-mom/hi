import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

function collectLeafKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    collectLeafKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe('locale parity', () => {
  it('keeps the 10 locale files on the same translation key set', () => {
    const localesDir = path.resolve(process.cwd(), 'src/locales');
    const localeFiles = readdirSync(localesDir).filter((file) => file.endsWith('.json')).sort();
    const keySets = new Map<string, Set<string>>();

    for (const file of localeFiles) {
      const parsed = JSON.parse(readFileSync(path.join(localesDir, file), 'utf8')) as Record<string, unknown>;
      keySets.set(file, new Set(collectLeafKeys(parsed)));
    }

    const canonicalKeys = keySets.get('en.json');

    expect(canonicalKeys, 'expected en.json to be present').toBeDefined();
    expect(localeFiles).toHaveLength(10);

    for (const [file, keys] of keySets) {
      expect([...canonicalKeys!.values()].filter((key) => !keys.has(key)), file).toEqual([]);
      expect([...keys.values()].filter((key) => !canonicalKeys!.has(key)), file).toEqual([]);
    }
  });
});
