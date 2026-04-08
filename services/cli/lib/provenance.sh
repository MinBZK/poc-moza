#!/usr/bin/env bash
# provenance.sh — Herkomstmetadata conform MCP-standaard §4.1, §7
#
# Opt-in via --provenance flag. Voegt dezelfde structuur toe als de
# MCP-server (mcp/servers/kvk/server.py), zodat de output vergelijkbaar is.

CLI_VERSION="0.1.0"
PROVENANCE_SOURCE="KvK Handelsregister (testomgeving — via kvk-cli)"

wrap_provenance() {
    local data="$1"
    local timestamp
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

    jq -n \
        --argjson data "$data" \
        --arg source "$PROVENANCE_SOURCE" \
        --arg timestamp "$timestamp" \
        --arg version "$CLI_VERSION" \
        '{
            data: $data,
            provenance: {
                source: $source,
                timestamp: $timestamp,
                version: $version
            }
        }'
}
