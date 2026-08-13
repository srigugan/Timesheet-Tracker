#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -d "venv" ]]; then
  python3 -m venv venv
fi

# shellcheck disable=SC1091
source "venv/bin/activate"
pip install -r requirements.txt

if [[ ! -f ".env" ]]; then
  cp .env.example .env
  echo "Created apps/api/.env — add your Neon DATABASE_URL"
else
  echo "apps/api/.env already exists"
fi

echo "API setup done. Run: npm run dev:api"
