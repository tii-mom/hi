# HI Motion Guidelines

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/MOTION_SYSTEM.md

## Purpose

Define how motion communicates intelligence in the HI frontend. Motion is a system signal: it shows the AI is scanning, reasoning, coordinating, remembering, or warning.

## UX Goals

Users should feel autonomous activity without feeling distracted. Motion should create confidence that the system is operating continuously, while keeping the interface calm enough for financial decision-making.

## Technical Implementation Strategy

Use `motion/react` for route transitions and stateful component motion. Use CSS keyframes for ambient background systems that do not require React state. Centralize timing and easing constants so AI pulse, intelligence flow, consensus wave, and scan behavior remain consistent.

## Component Structure

Motion belongs in three layers:

```txt
Shell motion: ambient background, route transition, global scan
Panel motion: stream entry, status pulse, consensus transitions
Control motion: hover, press, focus, selection, bottom nav indicator
```

Feature modules can define local variants, but should reuse the shared motion semantics from `docs/design/motion-language.md`.

## State Management Strategy

Motion state should be driven by domain status, not arbitrary timers. Example states include `idle`, `scanning`, `reasoning`, `syncing`, `confirmed`, `rejected`, `warning`, and `degraded`. Randomized visual motion can be used for ambience, but should not imply a false user action or protocol event.

## Animation Behavior

Default control transitions should complete within 120-220ms. Panel transitions should complete within 240-420ms. Ambient effects can breathe over 4-10 seconds. Risk or failure states may use sharper fracture or interruption motion, but only when the state is meaningful.

## Mobile Behavior

Mobile motion should be shorter and lighter. Avoid long blur transitions on low-powered devices. Terminal panels should stack with staggered entry only when it does not delay access to primary information.

## Telegram Behavior

Telegram WebView motion must assume constrained CPU and variable viewport resizing. Prefer opacity, transform, and small scale changes. Avoid expensive parallax and repeated layout-driven animation inside chat entry flows.

## Performance Considerations

Animate transform and opacity first. Use `will-change` sparingly and only for active animated elements. Avoid animating width, height, top, left, box-shadow, or large backdrop filters. Respect `prefers-reduced-motion`, low-power heuristics, and Telegram viewport instability.
