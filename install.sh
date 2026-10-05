#!/bin/bash
# Install (or update) omarchy-bsdate and place it right after the AD clock.
set -euo pipefail

REPO="https://github.com/diwash-9/omarchy-bsdate"
ID="draj.bsdate"

command -v omarchy >/dev/null 2>&1 || {
  echo "error: 'omarchy' CLI not found. This plugin requires Omarchy Linux." >&2
  exit 1
}

if [[ -d "$HOME/.config/omarchy/plugins/$ID" ]]; then
  echo "Plugin already installed — updating..."
  omarchy plugin update "$ID" --yes || true
else
  echo "Installing $ID from $REPO ..."
  omarchy plugin add "$REPO" --enable --yes
fi

echo "Placing $ID after omarchy.clock ..."
omarchy plugin enable "$ID" --after omarchy.clock

echo
echo "Done. Restart the shell so the new code loads:"
echo "  omarchy restart shell"
