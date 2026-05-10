# HI Mobile UI

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/MOBILE_EXPERIENCE_SPEC.md

## Purpose

Define the mobile implementation of HI as a first-class AI financial operating system, not a compressed desktop dashboard.

## UX Goals

Mobile should feel premium, fast, and operable with one hand. The user should be able to check AI activity, portfolio intelligence, agent state, consensus, and risk without hunting through dense desktop panels.

## Technical Implementation Strategy

Use responsive layouts, `100dvh` shell constraints, bottom navigation, safe-area padding, and feature-level panel stacking. Mobile should share data models with desktop but use separate layout composition when density requires it.

## Component Structure

Mobile shell components include `Header`, `BottomNav`, route-level pages, and terminal panels stacked by priority. Feature components should expose compact variants for timeline, memory, consensus, portfolio, and risk views rather than relying only on CSS shrink behavior.

## State Management Strategy

Persist mobile-specific preferences such as selected tab, collapsed panels, reduced motion, and active locale. Avoid storing layout-only state in protocol adapters. Mobile navigation state should remain compatible with direct links and Telegram deep links.

## Animation Behavior

Use shorter transitions than desktop. Bottom navigation indicator motion should be crisp and low-cost. Feed entries can slide or fade in, but charts and live values should not animate so aggressively that they become hard to read.

## Mobile Behavior

Primary rules:

- One-hand interaction is the default.
- Thumb-zone navigation belongs at the bottom.
- Critical actions must not sit in unreachable top corners.
- Terminal panels stack in operational priority.
- Live values must keep stable widths to prevent layout shift.

## Telegram Behavior

Mobile UI must be compatible with Telegram WebView constraints. When Telegram context is present, prefer compact headers, safe-area-aware bottom controls, and inline AI notifications instead of browser-style banners.

## Performance Considerations

Reduce ambient layers on small screens. Defer offscreen panels. Avoid high-frequency re-render loops in visible charts. Use reduced-motion modes on low-power devices and when `prefers-reduced-motion` is enabled.
