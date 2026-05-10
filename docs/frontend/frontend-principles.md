# HI Frontend Principles

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/FRONTEND_SYSTEM.md

The `hi` repository implements the visible operating system for HI. These principles define what every frontend feature should feel like and protect the product from becoming a generic crypto dashboard.

## Principles

- AI-first interface: AI reasoning, agent state, memory, and recommendations are primary interface objects.
- Operational realism: The interface should show live system state, confidence, latency, risk posture, and execution readiness.
- Living system feeling: The product should feel continuously active through meaningful state, motion, and ambient intelligence.
- Intelligence before charts: Charts support reasoning; they do not replace the AI operating layer.
- Emotional immersion: Users should feel that their AI financial civilization is aware, coordinated, and present.
- Mobile-first: Every primary workflow must work cleanly with one hand on mobile.
- Telegram-native: Telegram is a native operating surface, not an afterthought or iframe wrapper.
- Ambient intelligence: Subtle signals should show scanning, consensus, memory recall, and autonomous monitoring.
- Autonomous activity visibility: Background AI work must be visible through feeds, timelines, pulses, alerts, and status panels.
- System-level consistency: Color, motion, spacing, status language, and component behavior must remain coherent across features.

## Implementation Boundary

This frontend owns UI, UX, animation, component architecture, presentation state, localization, mobile layout, and Telegram shell behavior. It does not own token economy, execution engine, wallet security architecture, AI agent runtime, consensus mining, ethics policy, onchain identity, or market data infrastructure.

## Purpose

Keep every frontend decision aligned to HI as a living AI financial operating system. These principles are the acceptance criteria for product feel, information hierarchy, and implementation discipline.

## UX Goals

The user should encounter intelligence first: reasoning, memory, consensus, risk, and autonomous activity. Financial charts and wallet controls should support the operating system narrative rather than dominate it.

## Technical Implementation Strategy

Translate principles into enforceable component, routing, motion, localization, mobile, and Telegram rules. Use these principles during feature design reviews before adding new UI surfaces.

## Component Structure

Every major component should make its operating role clear: reasoning surface, decision surface, memory surface, risk surface, navigation surface, or notification surface. Generic components are acceptable only as primitives.

## State Management Strategy

State should expose intelligence and operation: active agent, current confidence, risk posture, language, Telegram context, and visible system status. Avoid hidden global state that changes user-visible behavior without an observable signal.

## Animation Behavior

Motion should prove that the system is alive. It should map to scanning, reasoning, consensus, memory, risk, or notification states and should respect reduced motion.

## Mobile Behavior

Mobile must preserve the operating system feeling through prioritized stacking, bottom navigation, compact intelligence feeds, and one-hand actions.

## Telegram Behavior

Telegram should feel native through compact shell behavior, deep links, inline AI notifications, safe areas, and wallet handoff patterns.

## Performance Considerations

Principles should not justify expensive decoration. Any live, ambient, or animated layer must have a clear semantic role and a bounded rendering cost.
