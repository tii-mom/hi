# Launch Governance

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specifications:
- Human-Intelligence/docs/frontend/AI_TERMINAL_SPEC.md
- Human-Intelligence/docs/frontend/PORTFOLIO_INTELLIGENCE_SPEC.md
- Human-Intelligence/docs/frontend/RISK_ENGINE_UI.md
- Human-Intelligence/docs/frontend/TELEGRAM_WEBVIEW_SPEC.md

This document separates demo-safe surfaces from production-gated financial behavior.

## Launch States

- Live: Reads or actions backed by production services and monitored runtime contracts.
- Preview: High-fidelity frontend behavior backed by local mock data or non-production adapters.
- Disabled: Financial action that must not be exposed until `hi-core` execution, wallet, risk, and security contracts are production-ready.

## Default Classification

- Live candidate:
  - route shell
  - navigation
  - language switching
  - read-only terminal surfaces after live adapter wiring
- Preview:
  - agent marketplace
  - agent profile intelligence
  - portfolio intelligence
  - risk center
  - Telegram companion
  - skill and forge surfaces
- Disabled until backend approval:
  - trade execution
  - copy trading activation
  - risk kill switch execution
  - billing settlement
  - wallet signing

## UI Enforcement

- Live candidate surfaces may render without a launch badge only when they are read-only or shell-only.
- Preview surfaces must show a `Preview` badge near the page header, action group, or execution-looking control.
- Disabled financial actions must render as disabled controls with a `Disabled` badge or disabled title text.
- Pages must not hide execution-looking controls behind ambiguous wording; every simulated action must be visibly preview-only.

## Current Product Boundary

| Surface | State | UI rule |
| --- | --- | --- |
| Shell navigation, route recovery, language switching | Live candidate | No badge required |
| Terminal, portfolio, risk, agents, copy, Telegram companion read models | Live candidate after adapter wiring | Use service resource status for live/degraded state |
| Forge incubation | Preview | Action remains local-only and is labeled preview |
| Skill synthesis | Preview | Synthesis flow remains local-only and is labeled preview |
| Agent copy setup | Preview / Disabled | Configuration panel may open; contract deployment is disabled |
| Copy trading controls | Disabled | Manage, sever, and restore actions are disabled until live execution exists |
| Risk kill switch execution | Disabled | Arming is visual preview only; execution is disabled |
| Billing claim/revoke/settlement | Disabled | Settlement actions are disabled until billing contracts exist |
| Consensus transaction view/execution | Disabled | Transaction action is disabled until execution route exists |
| Wallet signing | Disabled | Wallet UI may show identity state; signing stays outside this frontend |

## Release Gate

A release cannot be called production-ready until:

- live API contracts are configured and tested
- wallet/session boundaries are implemented without storing secrets in the frontend
- preview-only financial actions are disabled or clearly separated
- mobile and Telegram WebView smoke checks pass
- `npm run verify:ci` passes from a clean checkout
