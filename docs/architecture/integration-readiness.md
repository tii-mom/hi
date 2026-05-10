# Integration Readiness

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/FRONTEND_SYSTEM.md

This document defines the frontend-facing contract surface before `hi` consumes any live backend/runtime outputs.

## Contract Surface

- Read-only resources:
  - terminal
  - portfolio
  - risk
  - agents
  - agent profile
  - copy trading
  - telegram companion
- Identity entrypoints:
  - WalletConnect
  - Telegram launch params
  - session cookie / session token
- Realtime channels:
  - terminal feed
  - risk alerts
  - Telegram events
- Execution surfaces:
  - copy trading
  - agent actions
  - risk kill switch
  - billing

## State Model

Frontend adapters must expose explicit states instead of collapsing network failure into empty UI:

- `idle`
- `loading`
- `success`
- `empty`
- `stale`
- `offline`
- `unauthorized`
- `rate-limited`
- `error`

## Boundary Rules

- `hi` consumes contracts only.
- `hi` does not implement execution engines, wallet secrets, signatures, or governance logic.
- Mock data remains acceptable until live adapters are available, but mock mode must be explicit.
- Any preview-only behavior must be labeled in code and docs.

## Launch Readiness Default

Until a live API base URL is configured, the frontend readiness mode is `mock` and the production path is not considered live.
