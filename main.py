#!/usr/bin/env python3
"""
wm_train_cli/
  main.py                 (this file)
  brain_training_tools/
    __init__.py
    running_span.py       (placeholder for tool #1)

MVP: modular CLI menu that can dispatch to multiple training brain_training_tools.
No 3rd-party libs required for this first part.
"""

from __future__ import annotations

from tool_registery.reg import Tool, build_tools
from utils.cli_tools import clear_screen, read_choice, pause, safe_run
    
from typing import Callable, Dict, List, Optional, Tuple
import sys

# ---------- Main menu loop ----------

def render_menu(tools: List[Tool]) -> None:
    clear_screen()
    print("=== Working Memory Training (CLI) ===\n")
    print("Select a tool:\n")

    # Keep ordering stable and predictable
    for t in tools:
        print(f"  [{t.key}] {t.name}")
        print(f"      {t.description}")
    print("\n  [q] Quit\n")


def main(argv: Optional[List[str]] = None) -> int:
    tools = build_tools()
    tool_map: Dict[str, Tool] = {t.key.lower(): t for t in tools}

    while True:
        render_menu(tools)
        choice = read_choice("Enter choice: ", valid=list(tool_map.keys()) + ["q"])

        if choice == "q":
            clear_screen()
            print("Goodbye.")
            return 0

        selected = tool_map.get(choice)
        if selected is None:
            # Shouldn’t happen because read_choice validates, but keep safe.
            print("Unknown selection.")
            pause()
            continue

        safe_run(selected.run)


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
