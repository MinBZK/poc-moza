"""Realistische tool-calling test: 4 tools, complexe schemas, multi-step chain.

Draai: cd services/host && python test_vlam_toolcalling_chain.py

Scenario: gebruiker vraagt of er een energierapportage-plicht geldt.
Verwacht agentic pad:
  kvk__mijn_bedrijf → regelrecht__toets_energierapportage → (evt. koop__zoek_regelgeving)
→ eindantwoord met conclusie.

Meet:
  - aantal tool-calls
  - latency per call
  - of de chain schoon afsluit (finish=stop) binnen N rondes
  - of het eindantwoord de gegevens uit de tool-results noemt
"""

import json
import os
import sys
import time

from dotenv import load_dotenv
from openai import OpenAI, APIError

load_dotenv()

BASE_URL = os.getenv("VLAM_BASE_URL", "")
API_KEY = os.getenv("VLAM_API_KEY", "")
MODEL = os.getenv("VLAM_MODEL_ID", "")
if not (BASE_URL and API_KEY and MODEL):
    print("❌ Missende env-variabelen")
    sys.exit(1)

print(f"→ Model: {MODEL}\n")
client = OpenAI(base_url=BASE_URL, api_key=API_KEY, timeout=45)

# ─── Tool-definities (realistische schemas à la MCP-servers) ───────────────
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "kvk__mijn_bedrijf",
            "description": "Haal bedrijfsgegevens op van de ingelogde gebruiker (KvK + BAG-verrijking).",
            "parameters": {"type": "object", "properties": {}, "additionalProperties": False},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "regelrecht__toets_energierapportage",
            "description": "Toets of een bedrijf verplicht is een energierapportage in te dienen (informatieplicht energiebesparing).",
            "parameters": {
                "type": "object",
                "properties": {
                    "kvk_nummer": {"type": "string", "description": "KvK-nummer van het bedrijf"},
                    "energie_kwh_per_jaar": {"type": "number", "description": "Jaarlijks elektriciteitsverbruik in kWh"},
                    "gas_m3_per_jaar": {"type": "number", "description": "Jaarlijks gasverbruik in m³"},
                    "is_woonfunctie": {"type": "boolean", "description": "Of het pand een woonfunctie heeft"},
                },
                "required": ["kvk_nummer", "energie_kwh_per_jaar", "gas_m3_per_jaar"],
                "additionalProperties": False,
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "koop__zoek_regelgeving",
            "description": "Zoek in de KOOP regelingenbank naar Nederlandse wet- en regelgeving.",
            "parameters": {
                "type": "object",
                "properties": {
                    "zoekterm": {"type": "string", "description": "Trefwoord, bv. 'energiebesparingsplicht'"},
                    "max_resultaten": {"type": "integer", "default": 5},
                },
                "required": ["zoekterm"],
                "additionalProperties": False,
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "rvo__indienen",
            "description": "Dien een regeling in bij RVO (muterende actie — idempotent per kvk+regeling).",
            "parameters": {
                "type": "object",
                "properties": {
                    "regeling_id": {"type": "string"},
                    "kvk_nummer": {"type": "string"},
                    "gegevens": {"type": "object"},
                },
                "required": ["regeling_id", "kvk_nummer"],
                "additionalProperties": False,
            },
        },
    },
]

# ─── Mock tool-runner ───────────────────────────────────────────────────────
def run_tool(name: str, args: dict) -> str:
    if name == "kvk__mijn_bedrijf":
        return json.dumps({
            "bedrijfsnaam": "Test BV Donald",
            "kvk_nummer": "68750110",
            "adres": "Hizzaarderlaan 3 A, 8823SJ Lollum",
            "sbi": ["4312", "4321"],
            "is_woonfunctie": False,
            "gebruiksdoelen": ["industriefunctie"],
            "energie_kwh_per_jaar": 62000,
            "gas_m3_per_jaar": 31000,
        })
    if name == "regelrecht__toets_energierapportage":
        kwh = args.get("energie_kwh_per_jaar", 0)
        m3 = args.get("gas_m3_per_jaar", 0)
        verplicht = kwh >= 50000 or m3 >= 25000
        return json.dumps({
            "verplicht": verplicht,
            "reden": "Drempel overschreden (50.000 kWh of 25.000 m³)" if verplicht else "Onder drempel",
            "regeling_id": "informatieplicht-energiebesparing" if verplicht else None,
            "bron": "Activiteitenbesluit milieubeheer, art. 2.15",
        })
    if name == "koop__zoek_regelgeving":
        return json.dumps({
            "resultaten": [
                {
                    "titel": "Activiteitenbesluit milieubeheer",
                    "artikel": "2.15",
                    "samenvatting": "Informatieplicht energiebesparing voor grote verbruikers.",
                    "url": "https://wetten.overheid.nl/BWBR0022762/2024-01-01#Hoofdstuk2_Paragraaf2.6_Artikel2.15",
                }
            ]
        })
    if name == "rvo__indienen":
        return json.dumps({
            "referentienummer": f"RVO-{args.get('regeling_id')}-{args.get('kvk_nummer')}-001",
            "status": "ingediend",
        })
    return json.dumps({"error": f"onbekende tool: {name}"})


# ─── Agentic loop ───────────────────────────────────────────────────────────
messages = [
    {
        "role": "system",
        "content": (
            "Je bent een assistent voor ondernemers. Gebruik de beschikbare tools om "
            "onderbouwde antwoorden te geven. Haal eerst de bedrijfsgegevens op voordat "
            "je een regeltoets uitvoert. Noem de conclusie en de bron."
        ),
    },
    {
        "role": "user",
        "content": "Ben ik verplicht een energierapportage in te dienen? En welke regeling is dat?",
    },
]

MAX_ROUNDS = 6
stats = {"tool_calls": 0, "rounds": 0, "total_latency": 0.0, "per_tool": {}}

for rnd in range(1, MAX_ROUNDS + 1):
    stats["rounds"] = rnd
    print(f"─── Ronde {rnd} ───")
    start = time.monotonic()
    try:
        resp = client.chat.completions.create(
            model=MODEL, messages=messages, tools=TOOLS, tool_choice="auto", temperature=0,
        )
    except APIError as e:
        print(f"❌ VLAM API-fout in ronde {rnd}: {e}")
        sys.exit(2)
    dt = time.monotonic() - start
    stats["total_latency"] += dt

    msg = resp.choices[0].message
    finish = resp.choices[0].finish_reason
    print(f"  finish={finish}  ({dt:.1f}s)")

    messages.append(msg.model_dump(exclude_none=True))

    if msg.tool_calls:
        for tc in msg.tool_calls:
            stats["tool_calls"] += 1
            stats["per_tool"][tc.function.name] = stats["per_tool"].get(tc.function.name, 0) + 1
            try:
                args = json.loads(tc.function.arguments or "{}")
            except json.JSONDecodeError:
                print(f"  ⚠️  ongeldige args-JSON: {tc.function.arguments!r}")
                args = {}
            print(f"  → tool: {tc.function.name}({json.dumps(args, ensure_ascii=False)})")
            result = run_tool(tc.function.name, args)
            messages.append({"role": "tool", "tool_call_id": tc.id, "content": result})
        continue  # volgende ronde

    # geen tool-calls → eindantwoord
    print(f"  antwoord: {msg.content!r}")
    break

print()
print("─── Samenvatting ───")
print(f"  rondes:              {stats['rounds']}")
print(f"  tool-calls totaal:   {stats['tool_calls']}")
print(f"  per tool:            {stats['per_tool']}")
print(f"  totale LLM-latency:  {stats['total_latency']:.1f}s")

final = messages[-1]
if final.get("role") != "assistant" or not final.get("content"):
    print("\n❌ Chain sloot niet af met een assistant-antwoord.")
    sys.exit(3)

answer = (final.get("content") or "").lower()
checks = {
    "noemt 'verplicht' of 'ja'": ("verplicht" in answer or "ja" in answer),
    "noemt 'energiebesparing' of 'activiteitenbesluit'": (
        "energiebesparing" in answer or "activiteitenbesluit" in answer or "2.15" in answer
    ),
}
print()
for k, v in checks.items():
    print(f"  {'✅' if v else '⚠️ '} {k}")

if all(checks.values()) and stats["tool_calls"] >= 2:
    print("\n✅ Multi-step chain met realistische schemas werkt betrouwbaar.")
    sys.exit(0)

print("\n⚠️  Chain werkt, maar inhoudelijk antwoord of tool-volgorde is niet wat verwacht.")
sys.exit(4)
