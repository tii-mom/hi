# HI Frontend i18n Hardcoded Audit

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/MULTILINGUAL_SYSTEM.md

Scope note: this document tracks frontend-visible hardcoded copy by migration priority. The first pass localized mobile navigation; the second pass reduced the P0 shell, auth, and terminal surfaces.

## P0
- Completed: Bottom navigation labels
- Completed: Header status, actions, wallet state, and top metrics
- Completed: Auth modal primary states and identity options
- Completed: Shell footer status labels and Telegram shell status
- Completed: Terminal dashboard primary cards, AI timeline, memory, consensus, market, portfolio, and agent-state labels

## P1
- Completed: Portfolio screens and holdings copy
- Completed: Risk views and exposure labels
- Completed: Agent marketplace cards and agent profile pages
- Completed: Profile headers, status badges, summary cards, skills, memory, and industry prose

## P2
- Completed: Forge secondary sections and helper text
- Completed: Skills surfaces beyond primary labels
- Completed: Billing copy, plan notes, and invoice helpers
- Completed: Copy workflow secondary panels
- Completed: Landing page secondary sections, footers, and support microcopy
- Completed: Telegram companion shell and reply flow
- Completed: Debate consensus dialogue, votes, and SVG context labels

## Notes
- English fallback is intentionally retained for some stable brand, protocol, and numeric literals.
- Remaining hardcoded strings outside the feature scope are treated as allowed literals rather than migration blockers.
