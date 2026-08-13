# 4 · Build flow + acceptance tests

[← API contract](./03-api-contract.md) · [Docs index](./README.md)

Work top-to-bottom. After each milestone, open the [acceptance board](http://localhost:3000) and run that milestone’s tests. When they pass, move on.

Source of truth for “done”:

- Definitions: [`apps/web/src/lib/milestones.ts`](../apps/web/src/lib/milestones.ts)
- Runners: [`apps/web/src/lib/acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts)

---

## Milestone 0 — Scaffold (shared) ✅ expected green on day 1

| Check | Link |
|-------|------|
| API health | [GET /health](http://localhost:8000/health) |
| Board loads | [GET /](http://localhost:3000/) |

Code:

- [`apps/api/app/main.py`](../apps/api/app/main.py)
- [`apps/web/src/components/ProgressBoard.tsx`](../apps/web/src/components/ProgressBoard.tsx)

---

## Milestone 1 — Projects (Shayan)

1. Add routes in [`apps/api/app/main.py`](../apps/api/app/main.py) (or split into routers later).
2. Try them in [Swagger](http://localhost:8000/docs):
   - [GET /projects](http://localhost:8000/projects)
   - [POST /projects](http://localhost:8000/projects)
3. On the board → **Project management** → **Run milestone**.

Pass criteria live in [`acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts) (`projects-list`, `projects-create`).

---

## Milestone 2 — Time tracking (Shayan)

1. Implement `POST /time-entries` and filtered `GET /time-entries`.
2. Manual checks:
   - [POST docs](http://localhost:8000/docs#/) (find `/time-entries`)
   - [GET sample](http://localhost:8000/time-entries?from=2026-01-01&to=2026-12-31)
3. Board → **Time tracking** → **Run milestone**.

---

## Milestone 3 — Timesheets + export (Shayan)

1. Implement export with a swappable strategy (CSV + Excel).
2. Manual checks:
   - [Excel export](http://localhost:8000/timesheets/export?format=excel)
   - [CSV export](http://localhost:8000/timesheets/export?format=csv)
3. Board → **Timesheets + export** → **Run milestone**.

---

## Milestone 4 — Users / me (shared)

1. Add [`GET /users/me`](http://localhost:8000/users/me).
2. Later wire real auth; for now a stub user is fine if the shape matches the test.
3. Board → **Users + session bridge** → **Run**.

---

## Milestone 5 — Dashboard (Iniyan)

1. Create [`apps/web/src/app/dashboard/page.tsx`](../apps/web/src/app/dashboard/page.tsx) (new file).
2. Include markers:

```tsx
<div data-testid="dashboard-page">
  <section data-testid="dashboard-stats">{/* charts / totals */}</section>
</div>
```

3. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).
4. Board → **Dashboard analytics** → **Run milestone**.
5. Call Shayan’s [`GET /time-entries`](http://localhost:8000/time-entries?from=2026-01-01&to=2026-12-31) for real data when ready.

---

## Milestone 6 — Timesheets UI (Iniyan)

1. Create [`apps/web/src/app/timesheets/page.tsx`](../apps/web/src/app/timesheets/page.tsx).
2. Marker: `data-testid="timesheets-page"`.
3. Open [http://localhost:3000/timesheets](http://localhost:3000/timesheets).
4. Board → **Timesheets UI** → **Run**.

---

## Milestone 7 — Dark mode (Iniyan)

1. Add a theme toggle somewhere reachable from home/layout.
2. Marker: `data-testid="theme-toggle"`.
3. Board → **Dark mode** → **Run**.

---

## Milestone 8 — Real-time notifications (shared)

Backend (Shayan):

1. Expose [`GET /events`](http://localhost:8000/events) as SSE.
2. Emit when a timer stops / timesheet submits / similar.

Frontend (Iniyan):

1. Render a panel with `data-testid="notifications-panel"`.
2. Subscribe to the SSE stream from `NEXT_PUBLIC_API_URL`.

Board → **Real-time notifications** → **Run milestone**.

---

## Milestone 9 — Auth / NextAuth (shared)

1. Wire NextAuth so [`/api/auth/session`](http://localhost:3000/api/auth/session) returns `200` JSON.
2. Set `NEXTAUTH_SECRET` in [`apps/web/.env.example`](../apps/web/.env.example) / your local `.env`.
3. Board → **Auth (NextAuth)** → **Run**.

Prisma / shared `packages/db` is intentionally **not** in the scaffold — add it when the team is ready and both agree.

---

## Suggested weekly rhythm

| Day | Focus |
|-----|--------|
| Mon | Pick 1–2 milestones for the sprint; confirm contract |
| Tue | Curriculum + apply learning to this week’s milestone |
| Wed–Thu | Build + keep board tests green for finished slices |
| Fri | Demo only what the board shows as **Done** |

## If a test fails

1. Read the red message on the board — it quotes the HTTP status / missing marker.
2. Open the matching runner in [`acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts).
3. Fix the feature (not the test) unless you jointly change the contract in [03 · API contract](./03-api-contract.md).

## Tracks

- [Iniyan — frontend path](./track-iniyan.md)
- [Shayan — backend path](./track-shayan.md)
