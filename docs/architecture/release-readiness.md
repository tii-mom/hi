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

For CI jobs that want a single release gate, use `npm run verify:ci`.

## Notes

- Keep this repo on unit and component-level coverage.
- Avoid browser e2e for release readiness unless a routing or container regression cannot be expressed in Vitest.
- Do not add protocol runtime checks here; this repo owns frontend contracts only.
