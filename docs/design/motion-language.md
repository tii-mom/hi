# HI Motion Language

Source Protocol:
https://github.com/tii-mom/Human-Intelligence

Source Specification:
Human-Intelligence/docs/frontend/MOTION_SYSTEM.md

## Purpose

Define semantic motion primitives for HI. These motions are not decoration; they are a vocabulary for AI activity, consensus, scanning, risk, and signal propagation.

## UX Goals

Motion should make intelligence observable. Users should feel awareness, coordination, protection, and continuity without losing the ability to read financial state.

## Technical Implementation Strategy

Expose these motions as shared CSS keyframes, `motion/react` variants, or feature-local helpers that reuse the same semantic names. Components should choose motion by state, not by aesthetic preference.

## Motion Semantics

| Motion | Meaning | Duration | Easing Behavior | Emotional Purpose | GPU Optimization Rules |
| --- | --- | --- | --- | --- | --- |
| AI pulse | An AI agent, memory module, or reasoning stream is active. | 900-1600ms loop | Ease-in-out with low amplitude opacity or scale | Presence, attention, continuity | Animate opacity or transform scale only; avoid box-shadow loops. |
| Intelligence flow | New reasoning or feed events are entering the system. | 220-420ms per event | Cubic ease-out for entry, no bounce | Flow of thought, forward progress | Use translate3d and opacity; stagger only visible items. |
| Consensus wave | Multiple agents are aligning or reaching agreement. | 600-1200ms | Smooth sine-like ease-in-out | Coordination, collective intelligence | Animate SVG/path opacity or transform; do not recalculate graph layout per frame. |
| Neural scan | The system is observing market, portfolio, or memory surfaces. | 1800-3200ms loop | Linear or near-linear sweep | Awareness, active scanning | Use transform on a pseudo-element; avoid animating gradient positions on large layers. |
| Breathing glow | The operating system is alive but idle or stable. | 4000-10000ms loop | Slow ease-in-out | Calm intelligence, premium atmosphere | Use one or two shell-level layers; avoid many blurred nodes. |
| Risk fracture | Risk engine has rejected, degraded, or interrupted an action. | 120-280ms burst | Sharp ease-out with quick settle | Urgency, caution, protective interruption | Use opacity, clip-path sparingly, or transform; do not shake entire layout. |
| Signal ripple | A notification, alert, or state propagation has occurred. | 500-900ms | Ease-out expanding fade | Traceability, cause and effect | Animate scale and opacity on a contained element; remove after completion. |

## Component Structure

Shell components own breathing glow and global scan. Terminal components own intelligence flow, AI pulse, consensus wave, and risk fracture. Notification components own signal ripple.

## State Management Strategy

Motion state should derive from explicit UI state such as `active`, `scanning`, `syncing`, `consensus`, `warning`, `rejected`, or `degraded`. Avoid independent animation state that contradicts displayed data.

## Meaning Rules

Each motion must be tied to a specific state or user-perceivable event. Do not use risk fracture for routine loading. Do not use consensus wave for a single-agent event. Do not use AI pulse on inactive or stale data.

## Duration Rules

Controls should feel immediate. Ambient systems can be slow. Risk should be short and decisive. Repeated motion should never prevent reading numbers, labels, or agent reasoning.

## Easing Rules

Use natural ease-out for new information, ease-in-out for continuous system life, and sharp ease-out for risk or interruption. Avoid playful bounce in operational financial contexts.

## Emotional Rules

Motion should make users feel that HI is aware, coordinated, and protective. It should not make the system feel gamified, noisy, or unstable.

## Animation Behavior

Use the motion semantics table as the source for duration, easing, and emotional role. Combining motions is allowed only when meanings are compatible, such as AI pulse plus signal ripple on a new active alert.

## Mobile Behavior

On mobile, reduce simultaneous ambient layers and favor short state transitions. Keep text and values readable during motion.

## Telegram Behavior

In Telegram, use AI pulse, signal ripple, and lightweight intelligence flow as the primary motions. Avoid large breathing glow layers and complex consensus graph animation on entry.

## GPU Rules

Prefer `transform`, `opacity`, and isolated pseudo-elements. Use `will-change` only during active animation. Avoid layout properties, large animated blur fields, and per-frame React state updates for ambient effects. Respect `prefers-reduced-motion` and low-power conditions.

## Performance Considerations

Motion must never create global re-render loops. Long-running effects should be CSS-driven, contained, and removable when offscreen or when reduced motion is active.
