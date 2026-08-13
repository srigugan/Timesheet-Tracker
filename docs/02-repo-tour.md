# 2 · Repo tour

[← Setup](./01-setup.md) · [Docs index](./README.md) · [Next: API contract →](./03-api-contract.md)

## Layout

```text
timesheet-tracker/
  apps/
    web/     # Next.js — Iniyan’s primary track
    api/     # FastAPI — Shayan’s primary track
  docs/      # you are here
```

Click through the important files:

### Frontend (`apps/web`)

| What | File |
|------|------|
| App entry / acceptance board | [`src/app/page.tsx`](../apps/web/src/app/page.tsx) |
| Layout + metadata | [`src/app/layout.tsx`](../apps/web/src/app/layout.tsx) |
| Board UI | [`src/components/ProgressBoard.tsx`](../apps/web/src/components/ProgressBoard.tsx) |
| Milestone definitions | [`src/lib/milestones.ts`](../apps/web/src/lib/milestones.ts) |
| Acceptance test runners | [`src/lib/acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts) |
| Env template | [`.env.example`](../apps/web/.env.example) |
| Package scripts | [`package.json`](../apps/web/package.json) |

Routes you will add later (create these files when you build them):

- `apps/web/src/app/dashboard/page.tsx` → must include `data-testid="dashboard-page"`
- `apps/web/src/app/timesheets/page.tsx` → must include `data-testid="timesheets-page"`

### Backend (`apps/api`)

| What | File |
|------|------|
| FastAPI app + `/health` | [`app/main.py`](../apps/api/app/main.py) |
| Dependencies | [`requirements.txt`](../apps/api/requirements.txt) |
| Dev server script | [`scripts/dev.sh`](../apps/api/scripts/dev.sh) |
| Env template | [`.env.example`](../apps/api/.env.example) |

Live API surface while running:

- [Swagger UI](http://localhost:8000/docs)
- [OpenAPI JSON](http://localhost:8000/openapi.json)
- [Health](http://localhost:8000/health)

### Root

| What | File |
|------|------|
| Root scripts | [`package.json`](../package.json) |
| Git ignore | [`.gitignore`](../.gitignore) |
| Short README | [`README.md`](../README.md) |

## Ownership reminder

| Person | Owns |
|--------|------|
| **Iniyan** | Dashboard, dark mode, responsive UI, notifications UI, timesheets UI |
| **Shayan** | Time tracking, projects CRUD, users/permissions, export |
| **Both** | API contract, auth wiring, reviews, real-time notifications end-to-end |

Detailed tracks:

- [Iniyan track](./track-iniyan.md)
- [Shayan track](./track-shayan.md)

## Next

Before writing feature code, lock the API shape: [03 · API contract](./03-api-contract.md)
