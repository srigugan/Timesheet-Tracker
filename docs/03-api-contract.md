# 3 · API contract (do this together first)

[← Repo tour](./02-repo-tour.md) · [Docs index](./README.md) · [Next: Build flow →](./04-build-flow.md)


The acceptance tests in [`milestones.ts`](../apps/web/src/lib/milestones.ts) and [`acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts) already encode the minimum contract. If you change a route name or payload, update those files in the same PR.

## Minimum routes

Use these as the shared checklist. Mark them up in a shared note, then implement.

### Projects — Shayan

| Method | Path | Expected |
|--------|------|----------|
| `GET` | [`/projects`](http://localhost:8000/projects) | `200` + JSON **array** |
| `POST` | [`/projects`](http://localhost:8000/projects) | body `{"name":"Demo"}` → `201` with `id` + `name` |

### Time entries — Shayan

| Method | Path | Expected |
|--------|------|----------|
| `POST` | [`/time-entries`](http://localhost:8000/time-entries) | `201` with `id`, `projectId`, and `startedAt` **or** `hours` |
| `GET` | [`/time-entries?from=&to=`](http://localhost:8000/time-entries?from=2026-01-01&to=2026-12-31) | `200` + JSON **array** |

Suggested create body (tests send something like this):

```json
{
  "projectId": "demo",
  "task": "Acceptance test",
  "action": "start"
}
```

### Timesheet export — Shayan

| Method | Path | Expected |
|--------|------|----------|
| `GET` | [`/timesheets/export?format=excel`](http://localhost:8000/timesheets/export?format=excel) | `200` + spreadsheet content-type |
| `GET` | [`/timesheets/export?format=csv`](http://localhost:8000/timesheets/export?format=csv) | `200` + CSV content-type |

Design tip from curriculum: use a **strategy pattern** for exporters so adding PDF later doesn’t rewrite the route.

### Users / session bridge — Shared

| Method | Path | Expected |
|--------|------|----------|
| `GET` | [`/users/me`](http://localhost:8000/users/me) | `200` with `id` and `email` or `name` |

### Real-time events — Shared

| Method | Path | Expected |
|--------|------|----------|
| `GET` | [`/events`](http://localhost:8000/events) | SSE (`text/event-stream`) or a ready `200` |

Scope: **in-app** live updates (banner/list), not native device push.

### Frontend routes — Iniyan

| Path | Marker the test looks for |
|------|---------------------------|
| [`/`](http://localhost:3000/) | `data-testid="progress-board"` (already present) |
| [`/dashboard`](http://localhost:3000/dashboard) | `data-testid="dashboard-page"` and `data-testid="dashboard-stats"` |
| [`/timesheets`](http://localhost:3000/timesheets) | `data-testid="timesheets-page"` |
| theme control on home/layout | `data-testid="theme-toggle"` |
| notifications UI | `data-testid="notifications-panel"` |
| [`/api/auth/session`](http://localhost:3000/api/auth/session) | `200` JSON (NextAuth) |

## How to verify a route while you work

1. Keep [Swagger](http://localhost:8000/docs) open for backend experiments.
2. After each endpoint, hit **Run** on that row on the [acceptance board](http://localhost:3000).
3. Green = that slice is done for the sprint review.

## Decision log (fill this in together)

Copy into your shared doc / PR description:

```text
- Project model fields:
- Time entry start/stop vs duration model:
- Auth approach for /users/me in local dev:
- SSE event names we will emit:
- Export library choice (openpyxl / csv module / other):
```

## Next

Implement against the contract: [04 · Build flow](./04-build-flow.md)
