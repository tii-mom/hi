# HI Telegram WebApp

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/TELEGRAM_WEBVIEW_SPEC.md

## Purpose

Define how HI behaves inside Telegram as a native-feeling Mini App and companion interface for the living AI financial operating system.

## UX Goals

Telegram should feel like the natural operating surface for HI. Users should receive AI alerts, open deep-linked terminal states, inspect portfolio or risk changes, and interact with wallet flows without feeling like they left Telegram.

## Technical Implementation Strategy

Detect Telegram WebApp context at startup and expose it through a frontend context or hook. Use Telegram viewport APIs when available, fall back to `100dvh` behavior outside Telegram, and keep all Telegram-specific shell behavior isolated from protocol logic.

## Component Structure

Telegram-specific composition should live under `src/features/telegram` or an equivalent feature boundary. It should coordinate compact header behavior, bottom navigation, inline notifications, deep-link routing, wallet handoff, and AI companion states.

## State Management Strategy

Keep Telegram launch parameters, safe-area values, color scheme, back button state, and deep-link payloads in a client-only Telegram context. Do not store sensitive wallet data in Telegram UI state. Signed wallet actions must remain delegated to wallet integration flows.

## Animation Behavior

Motion must be lightweight in the WebView. Prefer short fades, small y-axis transitions, and status pulses. Avoid heavy blur stacks, large parallax, or expensive continuous animation when the WebView is resized by Telegram.

## Mobile Behavior

Telegram is mobile-first by default. Layouts should use compact panel stacking, thumb-safe bottom controls, and native-feeling notification surfaces. Avoid desktop terminal grids unless the viewport width truly supports them.

## Telegram Behavior

The app should support Telegram viewport constraints, safe-area handling, Mini App optimization, wallet integration entry points, push-style interactions, deep links, and inline AI notifications. Back button behavior should map to route history or panel dismissal before exiting the app.

## Performance Considerations

Keep the Telegram entry path small. Lazy-load heavy terminal visualizations. Reduce ambient effects by default in Telegram. Treat viewport changes as frequent and avoid recalculating complex chart layouts on every minor resize.
