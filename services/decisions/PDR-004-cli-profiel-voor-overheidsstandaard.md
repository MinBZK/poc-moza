# PDR-004: CLI als deploymentprofiel in de overheidsstandaard

| Veld | Waarde |
|---|---|
| Status | **Vervangen** door [Bijlage F bij het feasibility-rapport](../../docs/feasibility-mcp-cli-standaard-voorstel.md) |
| Datum | 2026-04-01 (oorspronkelijk) — vervangen op 9 mei 2026 |
| Beslisser(s) | Projectteam poc-moza |
| Gerelateerd | PDR-005, PDR-006 |

## Wat hier stond

Dit document begon als een prompt voor het uitbreiden van [`moza-mcp-standaard-poc`](https://github.com/MinBZK/moza-mcp-standaard-poc) met een CLI-profiel. De inhoud was bruikbaar maar het bestand had de naam `PDR-004-structuur.md`, wat niet weergaf wat erin stond.

Op 9 mei 2026 — bij oplevering van het feasibility-onderzoek — is de inhoud overgenomen, gecorrigeerd en uitgebreid in:

[`docs/feasibility-mcp-cli-standaard-voorstel.md`](../../docs/feasibility-mcp-cli-standaard-voorstel.md)

Verschillen met de oude versie:

- Concrete tekstvoorstellen voor §4.4, §7-uitbreiding en §8.3 in de standaard
- Nieuwe checks voor het validatiepakket (zowel MCP- als CLI-checks)
- Ondersteuning met validator-runs en token-metingen
- Drie aanvullende gaten (tool poisoning, idempotentie, AI Act-transparantie)
- ADR-003 als concept voor opname in `moza-mcp-standaard-poc/docs/adr/`

Voor de beslissing waaruit dit voortkomt, zie [PDR-006](PDR-006-feasibility-conclusie.md).

> **Audit-trail**: het oorspronkelijke document was te vinden in commit `b082ad3` als `PDR-004-structuur.md`. Wij hebben het hernoemd en de inhoud doorgehaald in plaats van verwijderd, zodat de keten te volgen blijft.
