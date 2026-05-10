# HI Mobile Rules

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/MOBILE_EXPERIENCE_SPEC.md

## Purpose

Define implementation rules for the mobile HI frontend. Mobile is a primary operating surface for the AI financial system.

## UX Goals

Mobile users should be able to understand AI activity, portfolio condition, consensus, and risk with one hand and minimal navigation overhead.

## Technical Implementation Strategy

Implement mobile as a dedicated responsive composition using bottom navigation, safe-area padding, compact panels, dynamic viewport units, and feature-owned compact variants.

## One-Hand Interaction

Primary navigation, common actions, panel switching, and AI companion entry should be reachable with one hand. Avoid placing critical controls exclusively in the top-right corner.

## Component Structure

Mobile components should expose compact variants for terminal panels, agent rows, portfolio summaries, risk banners, consensus cards, and AI notifications. Shell components own bottom navigation and viewport-safe padding.

## State Management Strategy

Persist active tab, panel expansion, compact route state, locale, reduced motion, and Telegram context separately from protocol state.

## Thumb-Zone Navigation

Use bottom navigation for primary routes. Keep targets large enough for touch and visually stable during live updates. The current `BottomNav` pattern is the baseline for mobile route access.

## Bottom Navigation

Bottom navigation should expose the highest-frequency surfaces: terminal, agents, companion, debate or consensus, portfolio, and related operational routes. Labels must remain short and localizable.

## Motion Reduction On Low Power

Reduce ambient glow, scanline loops, chart animation, and staggered feed motion when reduced motion is enabled or low-power conditions are detected. Preserve state clarity even when motion is disabled.

## Telegram Viewport Behavior

Use dynamic viewport units and safe-area padding. Expect Telegram to resize the WebView during keyboard, notification, and system UI changes. Avoid assumptions based only on `window.innerHeight`.

## Responsive Terminal Stacking

Stack terminal panels by operational priority:

1. System status.
2. AI reasoning.
3. Portfolio intelligence.
4. Market state.
5. Consensus.
6. AI memory.
7. Execution status.
8. Risk engine.

## Layout Rules

Use stable dimensions for charts, counters, badges, and navigation. Live values should reserve enough width for expected number changes. Do not let animated text or translated labels overlap adjacent controls.

## Animation Behavior

Mobile animations should be shorter and lighter than desktop. Use reduced motion on low power, and do not animate layout in ways that move active touch targets.

## Mobile Behavior

Mobile behavior is defined by one-hand operation, thumb-zone navigation, bottom nav, responsive terminal stacking, and clear compact AI state.

## Telegram Behavior

When mobile is running inside Telegram, use Telegram viewport behavior, safe-area rules, compact headers, and inline AI notifications.

## Performance Rules

Lazy-load heavy panels below the fold. Reduce expensive blur and chart updates on mobile. Keep feed updates incremental and avoid full terminal rerenders.

## Performance Considerations

Use route-level and panel-level lazy loading where practical. Reduce ambient layers and expensive chart updates on smaller screens.
