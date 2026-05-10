# HI Frontend Testing Architecture

This round establishes a small deterministic test skeleton for frontend shell contracts.

## Scope

- Provider unit tests for app shell state.
- Provider smoke tests for Telegram WebApp absence.
- Route recovery smoke tests for the 404 surface.

## Rules

- Keep tests close to user-visible contracts.
- Avoid snapshots and layout assertions.
- Avoid browser/e2e coverage until the routing and data layers stabilize.
- Do not test wallet secrets, signatures, tokens, or protocol runtime behavior in the frontend repository.

## Commands

This repository now includes the initial Vitest stack and scripts:

```bash
npm run test
npm run test:watch
npm run verify
```

`npm run verify` runs typecheck, ESLint, unit tests, and production build.
