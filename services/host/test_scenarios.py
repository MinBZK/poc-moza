"""Scenario-tests voor de digitale-assistent-backend.

Laat per scenario zien welke events de frontend krijgt, zodat we
weten hoe de UI zich gedraagt bij geen API-sleutel, upstream-fouten,
en MCP- vs CLI-transport.

Run: python test_scenarios.py
"""

import asyncio
import os
import sys
from pathlib import Path
from unittest.mock import AsyncMock

# Leeg de env-variabelen voordat config.py geladen wordt, zodat het
# lokale .env-bestand (met echte keys) niet wordt overgenomen.
os.environ["ANTHROPIC_API_KEY"] = ""
os.environ["VLAM_API_KEY"] = ""

sys.path.insert(0, str(Path(__file__).resolve().parent))

import anthropic
import openai

from vlam_host import VLAMHost


async def collect(gen):
    return [event async for event in gen]


def summary(events):
    """Comprimeer een lijst events tot een leesbare samenvatting."""
    return [(e["type"], e.get("message", e.get("data", ""))[:80]) for e in events]


def assert_has_event(events, event_type, message_contains=None):
    for e in events:
        if e["type"] != event_type:
            continue
        if message_contains is None or message_contains in e.get("message", ""):
            return e
    raise AssertionError(
        f"Geen {event_type!r}-event met {message_contains!r} gevonden. "
        f"Events: {summary(events)}"
    )


def make_fake_status_error():
    """Maak een APIStatusError die lijkt op een 401 van de upstream."""
    request = object()  # Anthropic/OpenAI accepteren hier dict of object
    body = {"error": {"message": "invalid api key"}}
    response = AsyncMock(status_code=401)
    return anthropic.APIStatusError(
        message="Unauthorized", response=response, body=body
    )


async def scenario_health_no_config():
    """Scenario: /health zonder draaiende MCP-servers en zonder keys.

    Toont wat de frontend ontvangt: backends-flags, server_status-dict
    (leeg als startup() niet liep) en cli-dict (afhankelijk van welke
    binaries lokaal aanwezig zijn).
    """
    host = VLAMHost()
    status = host.get_status()
    assert status["backends"]["claude"] is False, "claude backend lijkt gekoppeld"
    assert status["backends"]["vlam"] is False, "vlam backend lijkt gekoppeld"
    assert status["servers"] == {}, f"servers = {status['servers']!r}"
    assert set(status["cli"]) == {"kvk", "koop", "regelrecht", "rvo"}
    return status


async def scenario_vlam_no_key():
    """VLAM geselecteerd, geen API-sleutel, geen override."""
    host = VLAMHost()
    events = await collect(host.chat_stream("s1", "hi", mode="vlam"))
    assert_has_event(events, "error", "VLAM-backend is niet geconfigureerd")
    assert_has_event(events, "done")
    return events


async def scenario_claude_no_key():
    """Claude geselecteerd, geen API-sleutel, geen override."""
    host = VLAMHost()
    events = await collect(host.chat_stream("s2", "hi", mode="claude"))
    assert_has_event(events, "error", "Claude-backend is niet geconfigureerd")
    assert_has_event(events, "done")
    return events


async def scenario_cli_vlam_no_key():
    """CLI:vlam geselecteerd, geen API-sleutel — zelfde check als MCP."""
    host = VLAMHost()
    events = await collect(host.chat_stream("s3", "hi", mode="cli:vlam"))
    assert_has_event(events, "error", "VLAM-backend is niet geconfigureerd")
    return events


async def scenario_cli_claude_no_key():
    """CLI:claude geselecteerd, geen API-sleutel — zelfde check als MCP."""
    host = VLAMHost()
    events = await collect(host.chat_stream("s4", "hi", mode="cli:claude"))
    assert_has_event(events, "error", "Claude-backend is niet geconfigureerd")
    return events


async def scenario_claude_upstream_error():
    """Claude met override-key, maar upstream retourneert 401."""
    host = VLAMHost()

    # Vervang de Anthropic client-methode door een mock die een status-error gooit.
    async def fail(**kwargs):
        raise make_fake_status_error()

    # chat_stream wisselt self.claude_client via _resolve_clients; daar kunnen we
    # niet eenvoudig op mocken. In plaats daarvan mocken we _resolve_clients.
    from unittest.mock import patch

    class FakeClient:
        api_key = "sk-fake"

        class messages:
            @staticmethod
            async def create(**kwargs):
                raise make_fake_status_error()

    with patch.object(
        host, "_resolve_clients", return_value=(FakeClient(), host.vlam_client)
    ):
        events = await collect(
            host.chat_stream(
                "s5", "hi", mode="claude", claude_api_key_override="sk-fake"
            )
        )
    assert_has_event(events, "error", "niet bereikbaar")
    return events


async def scenario_vlam_upstream_error():
    """VLAM met override-key, maar upstream retourneert 500."""
    host = VLAMHost()

    class FakeCompletions:
        @staticmethod
        async def create(**kwargs):
            raise openai.APIStatusError(
                message="Server error",
                response=AsyncMock(status_code=500),
                body={"error": "upstream"},
            )

    class FakeChat:
        completions = FakeCompletions()

    class FakeVlamClient:
        api_key = "fake"
        chat = FakeChat()

    from unittest.mock import patch

    with patch.object(
        host, "_resolve_clients", return_value=(host.claude_client, FakeVlamClient())
    ):
        events = await collect(
            host.chat_stream(
                "s6", "hi", mode="vlam", vlam_api_key_override="fake"
            )
        )
    assert_has_event(events, "error", "niet bereikbaar")
    return events


SCENARIOS = [
    ("health zonder configuratie", scenario_health_no_config),
    ("VLAM + MCP, geen key", scenario_vlam_no_key),
    ("Claude + MCP, geen key", scenario_claude_no_key),
    ("VLAM + CLI, geen key", scenario_cli_vlam_no_key),
    ("Claude + CLI, geen key", scenario_cli_claude_no_key),
    ("Claude + MCP, upstream 401", scenario_claude_upstream_error),
    ("VLAM + MCP, upstream 500", scenario_vlam_upstream_error),
]


async def main():
    passed = 0
    failed = 0
    for name, scenario in SCENARIOS:
        try:
            result = await scenario()
            if isinstance(result, list):
                print(f"PASS  {name}")
                for t, msg in summary(result):
                    print(f"        {t:8} {msg}")
            else:
                print(f"PASS  {name}")
                for k, v in result.items():
                    print(f"        {k}: {v}")
            passed += 1
        except AssertionError as e:
            print(f"FAIL  {name}: {e}")
            failed += 1
        except Exception as e:
            print(f"ERROR {name}: {type(e).__name__}: {e}")
            failed += 1
    print()
    print(f"{passed} geslaagd, {failed} mislukt")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
