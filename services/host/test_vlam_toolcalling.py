"""Minimale test: ondersteunt VLAM native OpenAI tool-calling?

Draai: cd services/host && python test_vlam_toolcalling.py

Test de hele tool-calling contract in 3 rondes:
  1. Model krijgt vraag die alleen via de tool te beantwoorden is.
  2. Check: roept het model de tool aan?
  3. Tool-result terugsturen; model moet een inhoudelijk antwoord geven.
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
    print("❌ Missende env-variabelen: VLAM_BASE_URL / VLAM_API_KEY / VLAM_MODEL_ID")
    sys.exit(1)

print(f"→ Endpoint: {BASE_URL}")
print(f"→ Model:    {MODEL}")
print()

client = OpenAI(base_url=BASE_URL, api_key=API_KEY, timeout=30)

TOOL = {
    "type": "function",
    "function": {
        "name": "get_bedrijfsgegevens",
        "description": "Haal bedrijfsgegevens op van de ingelogde gebruiker.",
        "parameters": {"type": "object", "properties": {}, "additionalProperties": False},
    },
}

messages = [
    {"role": "system", "content": "Je bent een assistent. Gebruik tools als dat nodig is."},
    {"role": "user", "content": "Wat is mijn bedrijfsnaam?"},
]


def call(msgs, with_tools=True):
    kwargs = {"model": MODEL, "messages": msgs, "temperature": 0}
    if with_tools:
        kwargs["tools"] = [TOOL]
        kwargs["tool_choice"] = "auto"
    start = time.monotonic()
    resp = client.chat.completions.create(**kwargs)
    return resp, time.monotonic() - start


# ─── Ronde 1: tool-call verwacht ────────────────────────────────────────────
print("─── Ronde 1: tool-call verwacht ───")
try:
    resp, dt = call(messages)
except APIError as e:
    print(f"❌ VLAM API-fout: {e}")
    sys.exit(2)

msg = resp.choices[0].message
finish = resp.choices[0].finish_reason
print(f"  finish_reason: {finish}   ({dt:.1f}s)")
print(f"  content:       {msg.content!r}")
print(f"  tool_calls:    {msg.tool_calls}")

if not msg.tool_calls:
    print("\n❌ VLAM roept de tool NIET aan. Native tool-calling werkt niet.")
    print("   → Orchestrated-mode (regex JSON) blijft nodig.")
    sys.exit(3)

print("\n✅ Tool wordt aangeroepen.")

# ─── Ronde 2: tool-result terugsturen ───────────────────────────────────────
print("\n─── Ronde 2: tool-result terugsturen ───")
tc = msg.tool_calls[0]
messages.append(msg.model_dump(exclude_none=True))
messages.append({
    "role": "tool",
    "tool_call_id": tc.id,
    "content": json.dumps({"bedrijfsnaam": "Test BV Donald", "kvk": "68750110"}),
})

try:
    resp2, dt2 = call(messages)
except APIError as e:
    print(f"❌ VLAM API-fout bij follow-up: {e}")
    sys.exit(4)

msg2 = resp2.choices[0].message
print(f"  finish_reason: {resp2.choices[0].finish_reason}   ({dt2:.1f}s)")
print(f"  content:       {msg2.content!r}")

if not msg2.content:
    print("\n❌ Model geeft geen inhoudelijk antwoord na tool-result.")
    sys.exit(5)

if "donald" not in (msg2.content or "").lower():
    print("\n⚠️  Antwoord bevat niet de bedrijfsnaam — model negeert tool-result?")
    sys.exit(6)

print("\n✅ Volledige tool-calling round-trip werkt.")
print("   → LangGraph-migratie lost punt 2 op. Orchestrated-mode mag weg.")
