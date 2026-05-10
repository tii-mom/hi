# Feature Boundaries

Feature modules own domain UI, view models, local hooks, and domain-specific types.

Shared layout and primitive UI can remain under `src/components`, but domain surfaces should move here as they mature.

Current feature roots:

- `terminal`: AI Terminal orchestration, live system state, intelligence feed, memory, portfolio reasoning, and consensus panels.
- `agents`: agent identity, profile, and registry surfaces.
- `portfolio`: allocation, exposure, and portfolio intelligence surfaces.
- `skills`: heuristic marketplace and synthesis surfaces.
- `risk`: risk engine UI, guardrails, and alert surfaces.
- `consensus`: voting, agreement, dissent, and visualization surfaces.
- `telegram`: Telegram WebApp shell, deep links, safe areas, and inline AI notifications.
