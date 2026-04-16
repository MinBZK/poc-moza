"""Compose system prompts from modular blocks.

Reads .md files from the blocks/ and examples/ directories and assembles
them into a single system prompt. Shared blocks ensure consistency between
VLAM and Claude; model-specific hints allow targeted tuning.
"""

from pathlib import Path

BLOCKS_DIR = Path(__file__).parent / "blocks"
EXAMPLES_DIR = Path(__file__).parent / "examples"

SEPARATOR = "\n\n---\n\n"


def _load(relative_path: str) -> str:
    """Load a block file relative to BLOCKS_DIR."""
    return (BLOCKS_DIR / relative_path).read_text(encoding="utf-8").strip()


def _load_if_exists(relative_path: str) -> str | None:
    """Load a block file if it exists, otherwise return None."""
    path = BLOCKS_DIR / relative_path
    if path.exists():
        return path.read_text(encoding="utf-8").strip()
    return None


def _load_domain_blocks() -> list[str]:
    """Load all domain knowledge blocks from shared/domain/."""
    domain_dir = BLOCKS_DIR / "shared" / "domain"
    if not domain_dir.exists():
        return []
    return [
        f.read_text(encoding="utf-8").strip()
        for f in sorted(domain_dir.glob("*.md"))
    ]


def _load_examples() -> list[str]:
    """Load all few-shot example blocks from examples/."""
    if not EXAMPLES_DIR.exists():
        return []
    return [
        f.read_text(encoding="utf-8").strip()
        for f in sorted(EXAMPLES_DIR.glob("*.md"))
    ]


def compose_system_prompt(mode: str, has_tools: bool) -> str:
    """Assemble the system prompt from modular blocks.

    Args:
        mode: "vlam" or "claude".
        has_tools: Whether MCP tools are available.

    Returns:
        Complete system prompt string.
    """
    blocks: list[str] = []

    # 1. Identity (per model)
    blocks.append(_load(f"identity/{mode}.md"))

    # 2. Shared blocks (core consistency)
    blocks.append(_load("shared/tone.md"))
    blocks.append(_load("shared/reasoning.md"))
    blocks.append(_load("shared/format.md"))
    blocks.append(_load("shared/guardrails.md"))

    # 3. Tool instructions OR no-tools fallback
    if has_tools:
        blocks.append(_load("shared/tool_usage.md"))
        blocks.extend(_load_domain_blocks())
    else:
        blocks.append(_load("shared/no_tools.md"))

    # 4. Model-specific hints (optional fine-tuning per model)
    hint = _load_if_exists(f"model_specific/{mode}_hints.md")
    if hint:
        blocks.append(hint)

    # 5. Few-shot examples (strongest consistency signal)
    examples = _load_examples()
    if examples:
        blocks.append("Hieronder volgen voorbeelden van goede antwoorden:")
        blocks.extend(examples)

    return SEPARATOR.join(blocks)
