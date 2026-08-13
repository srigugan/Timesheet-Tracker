# 1 · Setup (day 1)

[← Docs index](./README.md) · [Next: Repo tour →](./02-repo-tour.md)

Goal: both of you can run the app locally and see the acceptance board.

## Prerequisites

- [Node.js LTS](https://nodejs.org) (`node --version` → v20+ or v22+)
- [Python 3.11+](https://www.python.org/downloads/) (`python3 --version`)
- Git
- NeonDB connection string from your Program Lead (keep it secret)

## Step A — One-time install (from repo root)

```bash
npm run setup
```

This installs web + API deps and creates `.env` files if they don’t exist.

## Step B — Add Neon to both env files

Edit [`apps/web/.env`](../apps/web/.env.example) and [`apps/api/.env`](../apps/api/.env.example) with the **same** connection string:

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | your Neon connection string (both apps) |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` |
| `NEXTAUTH_SECRET` | leave empty until auth work; later run `openssl rand -base64 32` |

## Step C — Run both services (two terminals, repo root)

```bash
npm run dev:api
```

```bash
npm run dev:web
```

→ [http://localhost:3000](http://localhost:3000)  
→ [http://localhost:8000/health](http://localhost:8000/health)  
→ [http://localhost:8000/docs](http://localhost:8000/docs)

If a port is already taken, Next may use `3001`/`3002` and you can start the API with:

```bash
uvicorn app.main:app --reload --port 8001
```

Then update `NEXT_PUBLIC_API_URL` in `apps/web/.env` to match.

## Step D — Prove the scaffold

1. Open the [acceptance board](http://localhost:3000).
2. Click **Run all tests**.
3. These two should pass already:
   - API health
   - Progress board loads

Everything else will fail until you build it — that’s expected.

## Where the scaffold code lives

- API entry: [`apps/api/app/main.py`](../apps/api/app/main.py)
- API run script: [`apps/api/scripts/dev.sh`](../apps/api/scripts/dev.sh)
- Web home / board: [`apps/web/src/app/page.tsx`](../apps/web/src/app/page.tsx)
- Milestone list (source of truth for “done”): [`apps/web/src/lib/milestones.ts`](../apps/web/src/lib/milestones.ts)
- Test runners: [`apps/web/src/lib/acceptance-tests.ts`](../apps/web/src/lib/acceptance-tests.ts)

## Next

Walk the codebase: [02 · Repo tour](./02-repo-tour.md)
