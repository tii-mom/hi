# AI Terminal Layout

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/AI_TERMINAL_SPEC.md

## Purpose

Define the spatial model for the HI AI Terminal. The layout should make autonomous AI activity legible at a glance.

## UX Goals

The layout should let users understand what the AI sees, what it believes, what agents agree on, what memory matters, and what risk constraints are active without opening separate dashboard pages.

## Technical Implementation Strategy

Implement the layout as a responsive grid on desktop and a priority stack on mobile and Telegram. Keep each panel independently renderable and route-friendly so terminal surfaces can be deep-linked and lazy-loaded.

## Desktop Structure

```txt
LEFT PANEL    | CENTER PANEL            | RIGHT PANEL
Reasoning     | Portfolio intelligence  | AI memory
Timeline      | Market state            | Execution status
Feed          | Consensus visualization | Risk engine
```

## Left Panel

The left panel is the temporal intelligence surface.

- AI reasoning stream: Shows the current reasoning chain, observations, rejected paths, and active hypotheses.
- AI timeline: Shows a chronological event lifecycle from observation to consensus to execution status.
- Intelligence feed: Shows autonomous scans, agent findings, market signals, and notifications.

Implementation notes:

- Use a vertically scrolling feed with stable timestamps and source labels.
- Support event types such as observation, confirmation, rejection, decision, warning, and execution status.
- Keep feed animations subtle so new intelligence is visible without destabilizing reading.

## Center Panel

The center panel is the operational decision surface.

- Portfolio intelligence: Shows holdings, exposure, PnL context, allocation logic, and AI commentary.
- Market state: Shows live market condition, relevant charting, sentiment, volatility, and signal confidence.
- Consensus visualization: Shows agent agreement, dissent, confidence, quorum, and decision direction.

Implementation notes:

- Keep the current market and portfolio state visible together on desktop.
- Treat charts as evidence surfaces, not the main product identity.
- Show consensus near the portfolio and market state so users can connect AI agreement to financial impact.

## Right Panel

The right panel is the memory and control assurance surface.

- AI memory: Shows recalled user preferences, prior decisions, agent memory, and relevant context.
- Execution status: Shows prepared, pending, simulated, rejected, or completed action states.
- Risk engine: Shows guardrails, blocked actions, risk score, exposure warnings, and degradation state.

Implementation notes:

- Never hide risk behind hover-only UI.
- Execution status is display and confirmation state only; execution engine logic remains protocol-side.
- Memory should distinguish recalled context from current recommendations.

## Responsive Stacking

Mobile and Telegram stack the terminal in this order:

1. System status and active alert.
2. AI reasoning stream.
3. Portfolio intelligence.
4. Market state.
5. Consensus visualization.
6. AI memory.
7. Execution status.
8. Risk engine.

## State Rules

Panel state is frontend presentation state. Protocol state should arrive as typed read-only view models. User actions should create explicit requests through adapters; the terminal should not reimplement runtime or security rules.

## Component Structure

Terminal layout components should be grouped by panel role: left intelligence stream, center decision surface, and right assurance surface. Shared panel chrome can be reused, but domain content should stay feature-owned.

## State Management Strategy

Track selected timeframe, active feed filter, focused agent, panel expansion, compact mode, and active alert in frontend state. Treat market, consensus, risk, memory, and execution status as incoming view models from adapters.

## Animation Behavior

Panel motion should clarify hierarchy: feed items flow in from the left, center state changes transition in place, and right-panel risk or memory changes pulse or fracture based on severity.

## Mobile Behavior

Mobile uses responsive terminal stacking and keeps the active alert plus reasoning stream near the top. Long panels should collapse behind clear headers rather than forcing endless scroll.

## Telegram Behavior

Telegram uses compact panel entry states and deep-link restoration. A Telegram notification should open the exact panel and highlighted event that caused the alert.

## Performance Rules

Keep each panel render-isolated. High-frequency chart updates must not re-render memory, risk, or timeline panels. Long feeds should be virtualized once they exceed practical viewport limits.

## Performance Considerations

Use memoized panel data, stable dimensions, and virtualized feeds. Keep chart animation disabled for high-frequency streams and split heavy visualization code from the initial route when practical.
