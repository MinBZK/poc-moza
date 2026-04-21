#!/usr/bin/env bash
# audit.sh — Audit logging conform MCP-standaard §2.2
#
# Logt naar stderr (standaard) of naar een bestand via KVK_AUDIT_LOG.
# Zelfde structuur als de MCP-server audit logging.

audit_log() {
    local tool_name="$1"
    local output_data="$2"

    local timestamp
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

    # Bepaal output keys (zonder de volledige data te loggen — dataminimalisatie)
    local output_keys
    output_keys=$(echo "$output_data" | jq -r 'keys_unsorted | join(",")' 2>/dev/null || echo "raw")

    local entry
    entry=$(jq -n -c \
        --arg timestamp "$timestamp" \
        --arg tool "$tool_name" \
        --arg keys "$output_keys" \
        '{
            timestamp: $timestamp,
            tool: $tool,
            output: { keys: ($keys | split(",")) }
        }')

    if [[ -n "$KVK_AUDIT_LOG" ]]; then
        echo "$entry" >> "$KVK_AUDIT_LOG"
    else
        echo "[AUDIT] $entry" >&2
    fi
}
