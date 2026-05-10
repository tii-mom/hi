# HI Component Architecture

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/FRONTEND_SYSTEM.md

## Purpose

Define frontend component organization for HI. The repo should scale as an AI financial operating system, not as a pile of generic UI components.

## UX Goals

Component boundaries should preserve system meaning. Users should experience coherent intelligence surfaces across terminal, agents, portfolio, skills, risk, consensus, mobile, and Telegram.

## Technical Implementation Strategy

Build feature-first modules with local components, hooks, models, routes, and motion helpers. Shared code should emerge only from repeated needs across features.

## Required Architecture

Use feature-first architecture.

Preferred structure:

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

Each feature owns its domain components, hooks, view models, tests, and local utilities. Shared primitives are allowed only when they are genuinely cross-feature.

## Do Not Use

- Massive global UI folders.
- Generic component dumping.
- Protocol docs copied into frontend directories.
- Runtime engine logic inside React components.
- Wallet security logic inside visual wallet buttons.
- One-off motion systems that conflict with the global motion language.

## Component Structure

Components should be organized by feature ownership first, then by reusable primitive need. A terminal timeline belongs to the terminal feature; a generic icon button can stay shared. Domain meaning should be visible from the folder path.

## Shared Component Boundary

`src/components/layout` can own shell-level layout such as `Shell`, `Header`, `Sidebar`, and `BottomNav`.

`src/components/ui` should remain small and primitive-oriented. Domain modules such as AI memory, consensus, portfolio reasoning, risk display, and timeline should move toward feature ownership as the app grows.

## Feature Module Shape

Recommended feature layout:

```txt
src/features/terminal/
  components/
  hooks/
  models/
  routes/
  motion/
  index.ts
```

Feature exports should be intentional. Avoid importing deep private files from another feature.

## State Management Strategy

State should live close to the feature that owns it. Shared state should represent true global concerns: locale, auth display state, Telegram context, motion preference, route state, and active wallet display state. Protocol state should be consumed through adapters and view models.

## Animation Behavior

Features may compose shared semantic motion primitives, but they should not invent conflicting meanings. For example, risk fracture always means protective interruption, while consensus wave always means agent alignment.

## Mobile Behavior

Every feature component must define how it collapses or stacks on mobile. A component is not complete if it only works in the desktop terminal grid.

## Telegram Behavior

Every feature that can be opened from a Telegram deep link must define its compact WebView state, safe-area behavior, and inline notification entry point.

## Performance Considerations

Feature boundaries should allow route-level splitting and localized re-render control. Avoid central stores that cause all panels to update on every market tick. Keep heavy visualization dependencies scoped to the features that need them.
