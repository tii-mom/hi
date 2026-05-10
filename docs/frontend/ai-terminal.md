# AI Terminal Implementation

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/AI_TERMINAL_SPEC.md

## Purpose

Define the AI Terminal as the operational heart of the HI frontend. The terminal is not a chart page. It is the place where AI reasoning, portfolio intelligence, market state, consensus visualization, memory, execution status, and risk posture become visible.

## UX Goals

The terminal should feel alive even when the user is not interacting. Users should understand what the AI is observing, what it remembers, what it recommends, what risk constraints are active, and how agents are coordinating.

## Technical Implementation Strategy

Implement the terminal as a responsive three-zone workspace using React components and feature-scoped hooks. Live values should enter through hooks like `useLiveData` or future protocol adapters, then be normalized into UI-ready view models. The frontend should display execution status but must not duplicate execution engine logic.

## Component Structure

Desktop layout:

```txt
Left panel: AI reasoning stream, AI timeline, intelligence feed
Center panel: portfolio intelligence, market state, consensus visualization
Right panel: AI memory, execution status, risk engine
```

Current implementation anchors include `TerminalDashboard`, `AITimelineFeed`, `PortfolioReasoning`, `AgentConsensusGraph`, and `AIMemoryModule`. Future terminal components should live under `src/features/terminal`.

## State Management Strategy

Terminal state should be grouped into:

- Live system state: prices, market conditions, agent status, consensus, risk posture.
- User state: selected timeframe, focused agent, visible panel, active locale.
- Presentation state: panel expansion, feed filters, motion preference, mobile stack position.

Read-only protocol state should be immutable from the UI unless an explicit user action creates a signed or authorized request through an adapter.

## Animation Behavior

The terminal should use AI pulse for active reasoning, intelligence flow for feed updates, consensus wave for multi-agent agreement, neural scan for market observation, and risk fracture for rejected or dangerous states. Motion must never hide the current financial state.

## Mobile Behavior

On mobile, the terminal stacks in priority order: system status, reasoning stream, portfolio intelligence, consensus, memory, execution status, and risk. Users should be able to navigate the terminal with one hand using bottom navigation and panel-level controls.

## Telegram Behavior

In Telegram, the terminal should start in a compact operational view with inline AI notifications, safe-area-aware bottom navigation, and deep links into agents, portfolio, or risk states. Avoid desktop-like wide panels inside the WebView.

## Performance Considerations

Charts, feeds, and ambient effects must be isolated to avoid whole-page re-renders. Disable expensive chart animation for high-frequency streams. Virtualize long reasoning timelines when they exceed visible bounds. Prefer CSS containment and stable panel dimensions.
