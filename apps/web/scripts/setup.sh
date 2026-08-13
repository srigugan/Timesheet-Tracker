#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

npm install

if [[ ! -f ".env" ]]; then
  cp .env.example .env
  echo "Created apps/web/.env — add your Neon DATABASE_URL"
else
  echo "apps/web/.env already exists"
fi

echo "Web setup done. Run: npm run dev:web"
