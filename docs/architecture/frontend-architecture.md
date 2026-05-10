# HI Frontend Architecture

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/FRONTEND_SYSTEM.md

## Purpose

Define how the `hi` repository implements the frontend of HI without duplicating protocol, runtime, governance, security, or token architecture from the Human-Intelligence repository. This repo owns the visible operating system: interface hierarchy, routes, state presentation, animations, mobile experience, Telegram WebApp behavior, and implementation-grade UX contracts.

## UX Goals

The frontend must communicate that HI is a living AI financial operating system. The default feeling is operational, intelligent, continuous, and premium. Users should see active reasoning, portfolio state, agent coordination, risk posture, and consensus activity before they see generic market charts.

## Technical Implementation Strategy

Use the current app stack as the implementation baseline: Vite, React, TypeScript, React Router, Tailwind CSS utilities, `motion/react`, Recharts, `lucide-react`, and `react-i18next`. Protocol concepts from the source repo should enter the frontend through typed view models and adapters, not by copying backend specs into this repo.

Frontend modules should be organized by user-facing domains: terminal, agents, portfolio, skills, risk, consensus, mobile shell, Telegram companion, and multilingual UI. The application shell owns global navigation, ambient background systems, route transitions, and viewport constraints.

## Component Structure

The top-level shell should remain thin: `Shell`, `Header`, `Sidebar`, `BottomNav`, and page routes. Domain UI belongs near the feature it serves. Existing shared UI modules such as `AITimelineFeed`, `PortfolioReasoning`, `AgentConsensusGraph`, and `AIMemoryModule` describe the target direction for terminal-specific components.

New implementation should move toward:

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

Shared primitives are allowed only for cross-feature elements such as buttons, icons, panels, language controls, motion helpers, and layout primitives.

## State Management Strategy

State must be separated by lifecycle. Local visual state belongs in React component state. Live market, agent, consensus, and risk streams should be exposed through hooks that return frontend view models. Global client preferences include locale, reduced motion, selected terminal view, Telegram context, and authenticated wallet display state.

Protocol execution state should be represented as read-only UI state unless a user explicitly takes an allowed action. The frontend should never reimplement execution engine, wallet security, governance, or AI runtime rules.

## Animation Behavior

Motion must show intelligence, not decoration. Route transitions can use blur, opacity, and scale. Live systems can use restrained pulse, scan, ripple, and flow states. Long-running ambient effects must use transform and opacity, avoid layout thrash, and respect reduced motion.

## Mobile Behavior

Mobile is a first-class terminal surface. Navigation should favor bottom controls, thumb reach, responsive terminal stacking, and low-latency state updates. Dense terminal panels collapse into sequenced sections: intelligence feed, portfolio state, consensus, memory, execution status, and risk.

## Telegram Behavior

Telegram WebApp behavior must be treated as a runtime shell constraint. The app should respect Telegram viewport height, safe areas, back button patterns, deep links, inline notifications, and wallet integration handoff. Telegram should feel like the native container for HI, not a web page embedded in a chat.

## Performance Considerations

Prefer code splitting by route and feature. Keep charts and motion isolated from global re-renders. Use memoized derived view models for live financial values. Use GPU-friendly transforms for ambient effects. Defer non-critical panels below the fold on mobile and Telegram. Avoid importing protocol documentation or heavy runtime logic into the frontend bundle.
