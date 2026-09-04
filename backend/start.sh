#!/usr/bin/env bash
set -e

FABRIC_PATH="$HOME/.local/bin/fabric"

if ! command -v fabric &>/dev/null && [ ! -f "$FABRIC_PATH" ]; then
  echo "Installing fabric binary..."
  mkdir -p "$HOME/.local/bin"
  TMPDIR=$(mktemp -d)
  URL="https://github.com/danielmiessler/Fabric/releases/latest/download/fabric_Linux_x86_64.tar.gz"
  if command -v curl &>/dev/null; then
    curl -sSL "$URL" | tar xzf - -C "$TMPDIR"
  else
    wget -qO- "$URL" | tar xzf - -C "$TMPDIR"
  fi
  BIN=$(find "$TMPDIR" -type f -name 'fabric' | head -1)
  if [ -n "$BIN" ]; then
    cp "$BIN" "$HOME/.local/bin/fabric"
    chmod +x "$HOME/.local/bin/fabric"
    echo "fabric installed"
  else
    echo "fabric binary not found in archive, will try fallback"
  fi
  rm -rf "$TMPDIR"
fi

export PATH="$HOME/.local/bin:$PATH"
exec uvicorn main:app --host 0.0.0.0 --port "${PORT:-8000}"