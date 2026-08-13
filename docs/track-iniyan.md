# Iniyan track · Frontend + UX

[← Docs index](./README.md) · [Build flow](./04-build-flow.md) · [Shayan track](./track-shayan.md)

Your home base: [`apps/web`](../apps/web).

## Start

1. Finish [Setup](./01-setup.md) with Shayan.
2. Skim [Repo tour](./02-repo-tour.md).
3. Join the [API contract](./03-api-contract.md) meeting — you need stable shapes before dashboard data wiring.

## Your milestone path

Follow these in order; after each, use the [acceptance board](http://localhost:3000).

| Order | Milestone | What to open |
|------:|-----------|--------------|
| 1 | Dashboard | create [`apps/web/src/app/dashboard/page.tsx`](../apps/web/src/app/dashboard/page.tsx) · [preview](http://localhost:3000/dashboard) |
| 2 | Timesheets UI | create [`apps/web/src/app/timesheets/page.tsx`](../apps/web/src/app/timesheets/page.tsx) · [preview](http://localhost:3000/timesheets) |
| 3 | Dark mode | toggle with `data-testid="theme-toggle"` on home/layout · [home](http://localhost:3000/) |
| 4 | Notifications UI | panel with `data-testid="notifications-panel"`; consume SSE from API |
| 5 | Auth UI / session | [`/api/auth/session`](http://localhost:3000/api/auth/session) with Shayan |

Markers the board looks for are defined in [`acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts) (`pageChecks`).

## Useful code links

- Board UI: [`ProgressBoard.tsx`](../apps/web/src/components/ProgressBoard.tsx)
- Milestone list: [`milestones.ts`](../apps/web/src/lib/milestones.ts) (filter owner `iniyan` / `shared`)
- Env: [`apps/web/.env.example`](../apps/web/.env.example) — `NEXT_PUBLIC_API_URL` points at Shayan’s API

## Collaboration points

- Dashboard data depends on Shayan’s [`GET /time-entries`](http://localhost:8000/time-entries?from=2026-01-01&to=2026-12-31).
- Notifications: you render; Shayan emits on [`GET /events`](http://localhost:8000/events).
- Never commit `.env`. Prefer PRs with screenshots + a green board row.
