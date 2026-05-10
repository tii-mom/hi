# Ambient Intelligence

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/AMBIENT_INTELLIGENCE_SYSTEM.md

## Purpose

Define the ambient intelligence layer that makes HI feel continuously alive without turning the interface into decoration.

## UX Goals

Users should sense that AI agents are observing, reasoning, coordinating, and protecting the system even before they read a specific event. Ambient intelligence should create emotional immersion and operational trust.

## Technical Implementation Strategy

Implement ambient intelligence as a shell-level and panel-level visual system. Shell effects include subtle glow, scanline, and breathing background layers. Panel effects include active status pulses, intelligence feed flow, consensus ripples, and risk interruptions.

## Component Structure

Ambient systems should be attached to:

```txt
Shell: global living background and route ambience
Terminal panels: local AI activity and scan states
Notifications: inline pulse, ripple, or warning state
Risk surfaces: fracture, interruption, and degraded mode
```

Avoid duplicating ambient layers inside every component. Shared ambient primitives can be reused by feature modules.

## State Management Strategy

Ambient behavior should map to actual app state where possible: active agent count, live stream status, consensus status, risk level, and connectivity state. Purely decorative ambience should remain low intensity and never imply an action was completed.

## Animation Behavior

Use intelligence particles, ambient neural motion, AI pulse, consensus waves, and market scan animation in restrained ways. Ambient effects should be slow, readable, and non-blocking. Risk states can interrupt the calm baseline with sharper movement.

## Mobile Behavior

Mobile ambient intelligence should be lighter. Use fewer layers, smaller glow surfaces, and reduced blur. Critical content must always win over atmosphere.

## Telegram Behavior

Telegram should use ambient intelligence as compact status language: inline pulses, notification ripples, and small scan states. Avoid large background effects that compete with Telegram's WebView constraints.

## Performance Considerations

Keep ambient effects CSS-driven when possible. Do not animate many independent particles through React state. Cap blur surfaces, avoid large fixed filters on low-powered devices, and support reduced motion.
