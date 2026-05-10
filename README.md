# HI Protocol Frontend

HI is not a crypto exchange, trading dashboard, or SaaS admin panel.

HI is a living AI financial operating system.

This repository owns the frontend implementation layer for HI Protocol: UI system, UX system, animation language, component architecture, mobile behavior, multilingual experience, and Telegram WebApp surfaces.

The protocol, runtime, governance, security, and AI civilization source of truth lives in:

https://github.com/tii-mom/Human-Intelligence

## Frontend Scope

This repo implements:

- AI Terminal
- Agent surfaces
- Portfolio intelligence
- Risk center UI
- Consensus visualization
- Skill marketplace UI
- Mobile-first shell
- Telegram-native companion
- Multilingual interface
- Ambient intelligence and motion language

This repo does not duplicate backend protocol documents, runtime engine documents, governance documents, or security architecture documents.

## Documentation

Start here:

- [System overview](docs/system-overview.md)
- [Frontend principles](docs/frontend/frontend-principles.md)
- [Frontend architecture](docs/architecture/frontend-architecture.md)
- [Component architecture](docs/architecture/component-architecture.md)
- [AI terminal layout](docs/frontend/ai-terminal-layout.md)
- [Motion language](docs/design/motion-language.md)
- [Mobile rules](docs/mobile/mobile-rules.md)
- [Telegram rules](docs/telegram/telegram-rules.md)

## Development

Prerequisites:

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Verify:

```bash
npm run verify
```

## Architecture Direction

The codebase is moving toward feature-first organization:

```txt
src/features/
  terminal/
  agents/
  portfolio/
  skills/
  risk/
  consensus/
  telegram/
```

Shared UI should stay small and primitive. Domain UI belongs inside the feature that owns the behavior.
