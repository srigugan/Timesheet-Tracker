# Timesheet Tracker

Internship build project: time tracking + project management.

```text
apps/web   → Next.js (frontend)
apps/api   → FastAPI (backend)
docs/      → guided walkthrough
```

## Quick start

**Need:** Node 20+, Python 3.11+, and a Neon `DATABASE_URL` from your Program Lead.

### 1. One-time setup (from repo root)

```bash
npm run setup
```

That installs web + API deps and creates `.env` files if missing.

### 2. Add the database URL

Put the **same** Neon connection string in both:

- [`apps/web/.env`](./apps/web/.env.example)
- [`apps/api/.env`](./apps/api/.env.example)

```env
DATABASE_URL="postgresql://..."
```

Leave the other web vars as-is for local:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

### 3. Run (two terminals, from repo root)

```bash
npm run dev:api
```

```bash
npm run dev:web
```

Then open:

| What | URL |
|------|-----|
| Acceptance board | [http://localhost:3000](http://localhost:3000) |
| API health | [http://localhost:8000/health](http://localhost:8000/health) |
| API docs (Swagger) | [http://localhost:8000/docs](http://localhost:8000/docs) |

On the board, click **Run all tests**. Scaffold checks should pass; the rest turn green as you build features.

> If port `3000` or `8000` is busy, Next may use `3001`/`3002`. Start the API on another port with  
> `cd apps/api && source venv/bin/activate && uvicorn app.main:app --reload --port 8001`  
> and set `NEXT_PUBLIC_API_URL` in `apps/web/.env` to match.

## Day-to-day commands

| Command | What it does |
|---------|----------------|
| `npm run setup` | Install everything + create `.env` files |
| `npm run dev:api` | FastAPI on `:8000` |
| `npm run dev:web` | Next.js on `:3000` |

## Intern guide

Walk through these in order (clickable links inside):

1. [docs/README.md](./docs/README.md) — index
2. [docs/01-setup.md](./docs/01-setup.md) — setup details
3. [docs/03-api-contract.md](./docs/03-api-contract.md) — agree routes together first
4. [docs/04-build-flow.md](./docs/04-build-flow.md) — build order + tests

Tracks: [Iniyan (frontend)](./docs/track-iniyan.md) · [Shayan (backend)](./docs/track-shayan.md)

## Workflow

- Don’t commit to `main` — branch: `git switch -c your-feature-name`
- Open a PR for review
- Never commit `.env` files
