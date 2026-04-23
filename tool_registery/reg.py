from dataclasses import dataclass
from typing import Callable, List

from brain_training_tools.about import about
from brain_training_tools.streaming_recall_n_plus_chars_back import running_span_placeholder


# ---------- Modular tool registry ----------
@dataclass(frozen=True)
class Tool:
    key: str                 # menu key like "1"
    name: str                # displayed name
    description: str         # one-liner
    run: Callable[[], None]  # function invoked when selected

def build_tools() -> List[Tool]:
    # As you add brain_training_tools, register them here (or later: auto-discover via imports)
    return [
        Tool(
            key="1",
            name="Running Span (updating)",
            description="Recall last N items after unpredictable STOP.",
            run=running_span_placeholder,
        ),
        Tool(
            key="a",
            name="About",
            description="What this program is.",
            run=about,
        ),
    ]