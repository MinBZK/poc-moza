#!/usr/bin/env bash
# output.sh — Filtering en formatting (naar moneybird-cli patroon)
#
# Pipeline: response → --fields → --select → --provenance → format

apply_fields_filter() {
    local response="$1"
    local fields="$2"

    # Bouw een jq-filter van de komma-gescheiden veldnamen
    # Ondersteunt geneste velden: _embedded.hoofdvestiging wordt ._embedded.hoofdvestiging
    local jq_fields=""
    local first=true

    IFS=',' read -ra field_array <<< "$fields"
    for field in "${field_array[@]}"; do
        # Trim whitespace
        field=$(echo "$field" | xargs)

        # Valideer veldnaam (voorkom jq-injectie)
        if ! [[ "$field" =~ ^[a-zA-Z_][a-zA-Z0-9_.]*$ ]]; then
            echo "Ongeldig veldnaam: $field" >&2
            exit 1
        fi

        # Geneste velden: a.b → alias: .a.b, simpele velden: a → a: .a
        local jq_path
        if [[ "$field" == *.* ]]; then
            local alias="${field##*.}"
            jq_path="${alias}: .${field}"
        else
            jq_path="${field}: .${field}"
        fi

        if [[ "$first" == "true" ]]; then
            jq_fields="$jq_path"
            first=false
        else
            jq_fields="$jq_fields, $jq_path"
        fi
    done

    # Genereer filter dat werkt op zowel arrays als objecten
    local jq_filter="if type == \"array\" then [.[] | {${jq_fields}}] else {${jq_fields}} end"

    echo "$response" | jq "$jq_filter"
}

format_output() {
    local response="$1"
    local mode="$2"

    case "$mode" in
        raw)
            echo "$response"
            ;;
        pretty)
            echo "$response" | jq '.'
            ;;
        table)
            format_table "$response"
            ;;
        *)
            echo "Onbekend outputformaat: $mode" >&2
            exit 1
            ;;
    esac
}

format_table() {
    local response="$1"

    # Bepaal of het een array of object is
    local type
    type=$(echo "$response" | jq -r 'type')

    if [[ "$type" == "array" ]]; then
        # Array: header + rijen
        local keys
        keys=$(echo "$response" | jq -r '.[0] // {} | keys_unsorted | .[]' 2>/dev/null)

        if [[ -z "$keys" ]]; then
            echo "(geen resultaten)"
            return
        fi

        # Header
        local header=""
        local jq_row=""
        local first=true
        while IFS= read -r key; do
            if [[ "$first" == "true" ]]; then
                header="$key"
                jq_row=".${key} // \"-\""
                first=false
            else
                header="$header\t$key"
                jq_row="$jq_row, .${key} // \"-\""
            fi
        done <<< "$keys"

        echo -e "$header"
        echo "$response" | jq -r ".[] | [$jq_row] | @tsv"
    elif [[ "$type" == "object" ]]; then
        # Object: key-value paren
        echo "$response" | jq -r 'to_entries[] | "\(.key)\t\(.value // "-")"'
    else
        echo "$response"
    fi | column -t -s $'\t' 2>/dev/null || cat
}
