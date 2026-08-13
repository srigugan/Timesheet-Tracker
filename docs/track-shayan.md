# Shayan track · Backend + data

[← Docs index](./README.md) · [Build flow](./04-build-flow.md) · [Iniyan track](./track-iniyan.md)

Your home base: [`apps/api`](../apps/api).

## Start

1. Finish [Setup](./01-setup.md) with Iniyan.
2. Skim [Repo tour](./02-repo-tour.md).
3. Lead drafting the [API contract](./03-api-contract.md) — Iniyan builds UI against it.

## Your milestone path

Follow these in order; after each, use the [acceptance board](http://localhost:3000) **and** [Swagger](http://localhost:8000/docs).

| Order | Milestone | What to hit |
|------:|-----------|-------------|
| 1 | Projects | [GET /projects](http://localhost:8000/projects) · [POST /projects](http://localhost:8000/projects) |
| 2 | Time tracking | [GET /time-entries](http://localhost:8000/time-entries?from=2026-01-01&to=2026-12-31) · `POST /time-entries` via [docs](http://localhost:8000/docs) |
| 3 | Export | [Excel](http://localhost:8000/timesheets/export?format=excel) · [CSV](http://localhost:8000/timesheets/export?format=csv) |
| 4 | Users/me | [GET /users/me](http://localhost:8000/users/me) |
| 5 | SSE events | [GET /events](http://localhost:8000/events) |
| 6 | Auth bridge | coordinate with Iniyan on NextAuth + `/users/me` |

Implement starting from [`apps/api/app/main.py`](../apps/api/app/main.py). Split into routers when it gets crowded.

## Useful code links

- App entry: [`main.py`](../apps/api/app/main.py)
- Requirements: [`requirements.txt`](../apps/api/requirements.txt)
- Dev script: [`scripts/dev.sh`](../apps/api/scripts/dev.sh)
- What the board asserts: [`acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts) (`runApiTest`)
- Milestone list: [`milestones.ts`](../apps/web/src/lib/milestones.ts) (filter owner `shayan` / `shared`)
- Env: [`apps/api/.env.example`](../apps/api/.env.example)

## Collaboration points

- Iniyan’s dashboard needs stable list/filter shapes for time entries.
- Prefer strategy-pattern exporters (curriculum Session 2).
- If you rename a route, update [`milestones.ts`](../apps/web/src/lib/milestones.ts) + [`acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts) in the same PR and tell Iniyan.
- Never commit `.env`. Demo with Swagger + a green board row.
