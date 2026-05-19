#!/usr/bin/env bash
# validate-mcp-servers.sh — draai mcp-standaard validate tegen alle vier MCP-servers,
# inclusief functionele resource-checks via --test-uri. Zonder deze test-URIs blijft
# een bug als de TextResourceContents/ReadResourceContents-mismatch onzichtbaar.
#
# Vereisten:
# - uv (https://docs.astral.sh/uv/) en het moza-mcp-standaard-poc-pakket lokaal
#   gecheckt op een pad dat via de STANDAARD_REPO env var wijst naar de repo
#   (default: ../moza-mcp-standaard-poc relatief aan deze repo).
#
# Gebruik:
#   ./services/validate-mcp-servers.sh
#
# Exit-code:
#   0 als alle servers slagen, 1 als minstens één server faalt.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STANDAARD_REPO="${STANDAARD_REPO:-${REPO_ROOT}/../moza-mcp-standaard-poc}"

if [[ ! -d "$STANDAARD_REPO" ]]; then
    echo "FOUT: moza-mcp-standaard-poc niet gevonden op $STANDAARD_REPO" >&2
    echo "Zet STANDAARD_REPO naar het juiste pad of clone de repo daarheen." >&2
    exit 2
fi

cd "$STANDAARD_REPO"

failed=0

echo ""
echo "=== KvK ==="
uv run mcp-standaard validate python "$REPO_ROOT/services/mcp/kvk/server.py" \
    --server-name kvk \
    --test-uri "kvk://basisprofiel/68750110" || failed=$((failed + 1))

echo ""
echo "=== KOOP ==="
uv run --with httpx --with lxml mcp-standaard validate python "$REPO_ROOT/services/mcp/koop/server.py" \
    --server-name koop \
    --test-uri "koop://regeling/BWBR0001840" || failed=$((failed + 1))

echo ""
echo "=== RegelRecht ==="
uv run mcp-standaard validate python "$REPO_ROOT/services/mcp/regelrecht/server.py" \
    --server-name regelrecht || failed=$((failed + 1))

echo ""
echo "=== RVO ==="
uv run mcp-standaard validate python "$REPO_ROOT/services/mcp/rvo/server.py" \
    --server-name rvo || failed=$((failed + 1))

echo ""
if [[ $failed -eq 0 ]]; then
    echo "Alle servers geslaagd."
    exit 0
else
    echo "FOUT: $failed server(s) faalden."
    exit 1
fi
