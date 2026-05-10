# HI Frontend Engineering Standards

This repository uses low-churn engineering standards so the frontend can keep expanding without forcing broad formatting rewrites during feature work.

## ESLint

- Use ESLint flat config.
- Use TypeScript recommended rules without type-aware linting for now.
- Enforce React Hooks rules.
- Warn on React Refresh export patterns that can break Vite fast refresh.
- Treat unused variables as warnings, with `_` prefixes allowed for intentional placeholders.

## Prettier

- Match the current codebase style: semicolons, single quotes, trailing commas, and LF endings.
- Keep `printWidth` at 120 to avoid noisy JSX churn in terminal-style UI files.
- Do not format build output, dependency folders, or lockfiles.

## Workflow

- Source files should only be reformatted when the owning change already touches that file.
- Formatting-only pull requests should be explicit and isolated.
- New rules should start as warnings unless they protect correctness or runtime safety.
