"""CLI Executor — voert tool-calls uit via CLI in plaats van MCP.

Mapt dezelfde tool-namen (kvk__mijn_bedrijf, koop__zoek_regelgeving, etc.)
naar CLI-commando's. De LLM ziet dezelfde tools, maar de uitvoering gaat
via subprocess in plaats van MCP stdio.
"""

import asyncio
import json
import logging
from pathlib import Path

logger = logging.getLogger("vlam.cli")

# Pad naar de CLI-tools (relatief aan services/host/)
CLI_DIR = Path(__file__).resolve().parent.parent / "cli"


async def _run_cli(cmd: list[str]) -> str:
    """Voer een CLI-commando uit en retourneer de stdout."""
    # Toon leesbaar commando (zonder volledig pad)
    readable = " ".join(c.replace(str(CLI_DIR) + "/", "") for c in cmd)
    logger.info("$ %s", readable)

    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=30)

    stdout_str = stdout.decode().strip()
    stderr_str = stderr.decode().strip()

    if stderr_str:
        logger.info("  stderr: %s", stderr_str)

    # Log response grootte
    logger.info("  response: %d bytes", len(stdout_str))

    if proc.returncode != 0:
        error_msg = stderr_str or f"CLI exit code {proc.returncode}"
        logger.error("  FOUT (exit %d): %s", proc.returncode, error_msg)
        return json.dumps({"error": "CLI_FOUT", "message": error_msg})

    return stdout.decode().strip()


async def execute_cli_tool(tool_key: str, arguments: dict) -> str:
    """Vertaal een MCP tool-call naar een CLI-commando en voer uit."""

    if tool_key == "kvk__mijn_bedrijf":
        cmd = [
            str(CLI_DIR / "kvk-cli"),
            "basisprofiel", "get",
            "--provenance",
            "--output", "raw",
        ]
        return await _run_cli(cmd)

    if tool_key == "koop__zoek_regelgeving":
        trefwoord = arguments.get("trefwoord", "")
        cmd = [
            str(CLI_DIR / "koop-cli"),
            "regeling", "zoek", trefwoord,
            "--provenance",
            "--output", "raw",
        ]
        onderwerp = arguments.get("onderwerp")
        if onderwerp:
            cmd += ["--onderwerp", onderwerp]
        type_regeling = arguments.get("type_regeling")
        if type_regeling:
            cmd += ["--type", type_regeling]
        max_resultaten = arguments.get("max_resultaten")
        if max_resultaten:
            cmd += ["--max", str(max_resultaten)]
        return await _run_cli(cmd)

    if tool_key == "regelrecht__check":
        kvk_nummer = arguments.get("kvk_nummer", "")
        cmd = [
            str(CLI_DIR / "regelrecht-cli"),
            "check", kvk_nummer,
            "--provenance",
            "--output", "raw",
        ]
        elektriciteit = arguments.get("jaarlijks_elektriciteitsverbruik_kwh")
        if elektriciteit is not None:
            cmd += ["--elektriciteit", str(elektriciteit)]
        gas = arguments.get("jaarlijks_gasverbruik_m3")
        if gas is not None:
            cmd += ["--gas", str(gas)]
        woonfunctie = arguments.get("is_woonfunctie")
        if woonfunctie:
            cmd += ["--woonfunctie"]
        return await _run_cli(cmd)

    if tool_key == "rvo__zoek_regeling":
        trefwoord = arguments.get("trefwoord", "")
        cmd = [
            str(CLI_DIR / "rvo-cli"),
            "regeling", "zoek", trefwoord,
            "--provenance",
            "--output", "raw",
        ]
        return await _run_cli(cmd)

    if tool_key == "rvo__indienen":
        kvk_nummer = arguments.get("kvk_nummer", "")
        regeling_id = arguments.get("regeling_id", "")
        maatregelen = arguments.get("maatregelen", [])
        maatregelen_csv = ",".join(maatregelen)
        cmd = [
            str(CLI_DIR / "rvo-cli"),
            "rapportage", "indienen",
            kvk_nummer, regeling_id, maatregelen_csv,
            "--confirm",
            "--provenance",
            "--output", "raw",
        ]
        return await _run_cli(cmd)

    return json.dumps({
        "error": "ONBEKENDE_TOOL",
        "message": f"CLI-vertaling niet beschikbaar voor: {tool_key}",
    })
