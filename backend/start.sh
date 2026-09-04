#!/usr/bin/env bash
set -e

if ! command -v fabric &>/dev/null; then
  echo "Installing fabric..."
  curl -sS https://raw.githubusercontent.com/danielmiessler/fabric/main/install.sh | bash
  export PATH="$HOME/.local/bin:$PATH"
fi

exec uvicorn main:app --host 0.0.0.0 --port "${PORT:-8000}"