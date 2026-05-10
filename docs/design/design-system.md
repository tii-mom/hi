# HI Design System

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/DESIGN_SYSTEM.md

## Purpose

Define the visual language for the HI frontend implementation. The design system turns the source protocol's design direction into concrete UI rules for a premium, AI-native financial operating system.

## UX Goals

The product should feel closer to Apple Human Interface Guidelines, Bloomberg Terminal system density, and OpenAI Operator calm intelligence than to a generic crypto dashboard. The interface should feel alive, but restrained; technical, but emotionally legible.

## Technical Implementation Strategy

Use design tokens in `src/index.css` for background, text, border, accent, glow, and terminal surfaces. Components should consume tokens through utility classes rather than hard-coded one-off colors. Core accents are electric blue, emerald AI green, soft white, and subtle violet on graphite, deep navy, and space gray foundations.

The system should avoid one-note palettes. Accent colors must map to semantic meaning: blue for active intelligence, emerald for operational health, violet for consensus or memory, orange for caution, and red only for explicit risk or failure.

## Component Structure

Design components should be layered:

```txt
Base primitives: button, icon button, input, panel, badge, tooltip
Operational modules: timeline, reasoning card, consensus graph, risk state, memory stack
System surfaces: shell, header, sidebar, bottom nav, terminal panel grid
```

Cards are for repeated items, modals, and framed tool surfaces. Page sections and major terminal regions should be unframed or panelized by function, not placed inside nested cards.

## State Management Strategy

Visual state should expose system meaning. Active, scanning, syncing, confirmed, rejected, lagging, and degraded states should be explicit component states with stable labels and colors. Design tokens should support light behavioral changes without requiring each feature to invent its own status language.

## Animation Behavior

Glow, blur, scanline, and pulse effects should be subtle and semantically tied to live AI activity. Hover states should clarify affordance. Animations should be short for controls, slower for ambient system presence, and disabled or simplified for reduced motion users.

## Mobile Behavior

Mobile UI must keep terminal density without shrinking text into illegibility. Prefer stacked panels, compact labels, thumb-zone controls, and fixed-height navigation. Avoid giant hero type inside operational views. Mobile panels should use stable dimensions so live values do not shift layout.

## Telegram Behavior

Telegram views should use the same design tokens with stricter vertical economy. Controls must remain touch-safe inside the WebView. Header and bottom navigation should account for Telegram safe areas and avoid redundant browser-like chrome.

## Performance Considerations

Use CSS variables for theme tokens and avoid generating unique inline styles for every live update. Keep backdrop blur and large shadows limited to persistent shell layers. Animate only transform, opacity, and filter when necessary. Heavy charts should be isolated so design-system effects do not trigger chart re-renders.
