# PDR-006: Feasibility-conclusie MCP en CLI als koppellaag

| Veld | Waarde |
|---|---|
| Status | Geaccepteerd |
| Datum | 9 mei 2026 |
| Beslisser(s) | Projectteam poc-moza |
| Gerelateerd | PDR-001, PDR-005, [feasibility-rapport](../../docs/feasibility-mcp-cli.md) |

## Context

Sinds maart 2026 staan twee koppelmechanismen naast elkaar in `services/`: vier MCP-servers (Python, persistent) en vier CLI-tools (Bash, on-demand). Beide raadplegen dezelfde overheids-API's; het LLM ziet een identieke tool-interface (zie PDR-005). Het doel was vergelijkbaarheid: welk transport past bij welke deploymentcontext en wat moet de overheidsstandaard daarover voorschrijven.

Dit rapport beschrijft de bevindingen na zes weken werk. De volledige onderbouwing staat in [`docs/feasibility-mcp-cli.md`](../../docs/feasibility-mcp-cli.md).

## Beslissing

Wij behouden beide transportmechanismen voorlopig, maar onder vier expliciete aanvullingen:

1. **De gedeelde standaard krijgt een derde profiel: CLI** (`moza-mcp-standaard-poc`, voorstel in [bijlage E](../../docs/feasibility-mcp-cli-standaard-voorstel.md)). Provenance, audit en mutatie-bevestiging gelden onveranderd; alleen het transport verschilt. Zonder dit profiel is een geldige CLI-implementatie niet te toetsen.
2. **De host-orkestratielaag gaat `--fields` doorgeven aan CLI-tools.** Anders blijft de geadverteerde tokenwinst (97% reductie, zie [bijlage B](../../docs/feasibility-mcp-cli.md#bijlage-b--token-metingen)) theoretisch.
3. **De KvK- en KOOP-resource-bug wordt gerepareerd** (zie [§2.3.A van het rapport](../../docs/feasibility-mcp-cli.md)). Resources werkten niet end-to-end vanwege een type-mismatch met de actuele MCP-bibliotheek; in deze PR is dat opgelost.
4. **Een AI Act-classificatie en IAMA/DPIA worden ingepland** vóór de assistent breder dan een gesloten testgroep wordt aangeboden. De `rvo__indienen`-tool kan hoog risico zijn als de uitkomst directe juridische gevolgen heeft.

Wij maken nog géén keuze tussen MCP of CLI als productie-transport. Die beslissing pas wanneer de standaard is uitgebreid en de meetinfrastructuur (token-gebruik, latency, foutfrequentie) over een productie-achtige periode draait.

## Alternatieven overwogen

### A. Direct kiezen voor MCP

- (+) Industrie-standaard sinds 2024; meeste benchmarks wijzen MCP aan als toekomstige norm voor agentic tool use.
- (-) De huidige standaard dekt alleen MCP. Een organisatie zonder MCP-runtime (gemeente, kleine uitvoerder) zou geen "compliant" alternatief hebben.
- (-) Persistent proces met credentials in geheugen vergroot het aanvalsoppervlak; tool poisoning is in 2026-onderzoek de meest kritieke aanvalsvector.

### B. Direct kiezen voor CLI

- (+) Geen permanent proces, geen extra dependencies (bash, curl, jq zijn overal aanwezig).
- (-) Discovery is handmatig; sync tussen host en CLI is foutgevoelig (PDR-005).
- (-) Geen schema-driven validatie; geen automatische tool-introspectie.

### C. Eén transport per organisatie, gedragen door de standaard

Onze gekozen richting. De standaard maakt CLI gelijkwaardig aan MCP voor wie het verkiest, met dezelfde compliance-eisen. Een organisatie kiest wat past bij haar deploymentcontext zonder de eisen op te geven.

## Consequenties

1. **Werk in `moza-mcp-standaard-poc`** — concrete tekstvoorstellen liggen klaar in [bijlage E](../../docs/feasibility-mcp-cli-standaard-voorstel.md). Te bespreken met de standaardisatiegroep.
2. **Twee bugs te fixen in poc-moza** — KvK-resource (P1), KOOP-resource (P1). Geen workarounds nodig; één regel per server.
3. **Een wijziging in `cli_executor.py`** — `--fields` doorgeven, ontbrekende commando's toevoegen (`koop-cli regeling get`, `kvk-cli vestigingen`, `kvk-cli eigenaar`). Zie [bijlage C](../../docs/feasibility-mcp-cli.md#bijlage-c--sync-gaten-host--cli).
4. **Validator uitbreiden** — functionele provenance-check moet bij ERROR een FAIL of duidelijke waarschuwing geven, niet alleen ERROR. Voeg checks toe voor input-schemavalidatie en idempotentie.
5. **Compliance-traject opstarten** — AI Act, IAMA, DPIA, transparantie-melding aan de gebruiker (Art. 50). Plan voor sluiting van Q3 2026.
6. **Repo-hygiëne** — uitgevoerd in dezelfde PR (`mcp/`-map verwijderd, oude PDR-namen rechtgezet, `services/decisions/README.md` toegevoegd, testvragen verplaatst, `.gitignore` opgeschoond).

## Wat we niet beslissen

Wij kiezen nu géén productie-transport, géén productie-host, en géén formele eindversie van de standaard. Dat hoort bij een volgende fase met meet-infrastructuur en stakeholderafstemming.
