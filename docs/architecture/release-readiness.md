# Release Readiness

This document defines the minimum frontend checks that should stay green before a release.

## Required Contracts

1. Provider contract
   - `AppProvider` must preserve wallet connection state, modal state, and connected identity labels across consumers.
   - `TelegramProvider` must degrade cleanly when `window.Telegram` is absent.

2. Route recovery
   - Unknown routes must resolve to the recovery surface in `NotFound`.
   - The suspense fallback must remain a stable busy state during route hydration.

3. i18n parity
   - The locale set in `src/locales` must stay aligned across all supported languages.
   - English remains the canonical key set for translation parity checks.

4. Critical interactions
   - Wallet identity actions must open, connect, and disconnect without breaking the shell.
   - Core page interactions such as kill switch, synthesis, and Telegram prompt flow should keep their existing unit coverage.

## CI Surface

- `npm run typecheck`
- `npm run lint`
- `npm run test:parity`
- `npm run test`
- `npm run build`
- `npm run smoke:release`

For CI jobs that want a single release gate, use `npm run verify:ci`.

## Production Gates

- Live API wiring must use the service adapter contract in `src/app/services`.
- Unconfigured production API environments must stay in explicit mock mode.
- Read-only live wiring must go through `src/app/services/readModels.ts`; pages should not call `fetch` directly.
- Preview-only financial actions must remain separated from live execution behavior.
- Mobile and Telegram WebView smoke checks must pass before a public release.

## Notes

- Keep this repo on unit and component-level coverage.
- Avoid browser e2e for release readiness unless a routing or container regression cannot be expressed in Vitest.
- Do not add protocol runtime checks here; this repo owns frontend contracts only.
