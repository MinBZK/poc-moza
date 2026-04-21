#!/usr/bin/env bash
# request.sh — HTTP-verzoeken naar de KvK API

kvk_request() {
    local path="$1"
    local url="${KVK_API_BASE}${path}"
    local http_code
    local response
    local tmpfile

    tmpfile=$(mktemp)
    trap "rm -f '$tmpfile'" RETURN

    http_code=$(curl -s -w "%{http_code}" -o "$tmpfile" \
        -H "apikey: ${KVK_API_KEY}" \
        --max-time 10 \
        "$url")

    response=$(cat "$tmpfile")

    if [[ "$http_code" -lt 200 || "$http_code" -ge 300 ]]; then
        echo "{\"error\":\"API_FOUT\",\"http_status\":$http_code,\"message\":\"KvK API retourneerde status $http_code\",\"url\":\"$url\"}" >&2
        exit 1
    fi

    # Valideer dat het geldige JSON is
    if ! echo "$response" | jq empty 2>/dev/null; then
        echo "{\"error\":\"PARSE_FOUT\",\"message\":\"Ongeldig JSON-antwoord van KvK API\"}" >&2
        exit 1
    fi

    echo "$response"
}
