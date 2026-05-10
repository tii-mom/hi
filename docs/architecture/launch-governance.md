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

## Release Gate

A release cannot be called production-ready until:

- live API contracts are configured and tested
- wallet/session boundaries are implemented without storing secrets in the frontend
- preview-only financial actions are disabled or clearly separated
- mobile and Telegram WebView smoke checks pass
- `npm run verify:ci` passes from a clean checkout
