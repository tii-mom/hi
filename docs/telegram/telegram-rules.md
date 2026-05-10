# HI Telegram Rules

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/TELEGRAM_WEBVIEW_SPEC.md

## Purpose

Define rules for HI as a Telegram-native Mini App and AI companion surface.

## UX Goals

Telegram users should receive concise AI intelligence, open the correct operating state, and act through native-feeling controls without feeling redirected to a desktop web app.

## Technical Implementation Strategy

Create a Telegram context or hook that owns launch parameters, viewport state, safe-area values, theme hints, back button behavior, and deep-link payloads. Keep this context separate from protocol logic.

## Telegram WebView Constraints

The app must operate inside constrained mobile WebViews with dynamic height, safe areas, variable keyboard behavior, and Telegram-provided theme context. The UI should not assume desktop browser chrome or fixed viewport height.

## Component Structure

Telegram components should include compact shell, inline AI notification, deep-link resolver, wallet handoff entry, compact terminal stack, and companion entry surface.

## State Management Strategy

Store Telegram UI state client-side: viewport, launch params, back button stack, active notification, and opened deep-link target. Sensitive wallet and execution state must remain outside Telegram UI state.

## Safe Area Handling

Use safe-area padding for bottom navigation, top controls, and modal actions. Avoid placing primary controls under Telegram system UI or device gesture areas.

## Mini App Optimization

The Telegram entry path should load quickly and show useful AI operating state before heavy charts. Use compact panels, route-level code splitting, and lower ambient intensity by default.

## Wallet Integration

Wallet connection should be a clear handoff flow. Do not store sensitive wallet credentials in frontend state. Telegram wallet compatibility belongs at the integration boundary; wallet security architecture remains protocol-side.

## Push Interaction

AI alerts should appear as inline, actionable notifications. They should deep-link to the exact terminal, agent, portfolio, consensus, or risk state that explains the alert.

## Deep Links

Deep links should support route and context payloads such as selected agent, portfolio event, risk warning, or AI memory reference. A deep link should never require the user to reconstruct the system state manually.

## Inline AI Notifications

Inline notifications should be concise, localized, and stateful. They should distinguish observation, warning, recommendation, rejection, execution status, and consensus reached.

## Animation Behavior

Use small fades, y-axis entry, AI pulse, and signal ripple. Avoid large blur and complex chart transitions during Telegram entry.

## Mobile Behavior

Telegram behavior is mobile-first. Use compact panel stacking, bottom-safe controls, and no desktop-only grid assumptions.

## Telegram Behavior

Respect Telegram WebView constraints, safe areas, Mini App optimization, wallet integration, push-style interaction, deep links, inline AI notifications, and back button behavior.

## Back Button Rules

Telegram back behavior should first close overlays or expanded panels, then navigate route history, then allow app exit. This must be coordinated through Telegram context rather than ad hoc window handling.

## Performance Rules

Avoid large blur fields, expensive parallax, and full-page chart animation in Telegram. Defer non-critical panels and prefer visible AI status over decorative loading states.

## Performance Considerations

Keep the initial Telegram route small, lazy-load heavy visualizations, and debounce viewport reactions so Telegram resize events do not cause repeated expensive layout work.
