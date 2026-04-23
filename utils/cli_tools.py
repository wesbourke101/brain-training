import os

from typing import Callable, Dict, List, Optional, Tuple

def clear_screen() -> None:
    # Works on Windows + macOS/Linux
    os.system("cls" if os.name == "nt" else "clear")

def pause(msg: str = "Press Enter to continue...") -> None:
    try:
        input(msg)
    except (EOFError, KeyboardInterrupt):
        pass


def read_choice(prompt: str, valid: List[str]) -> str:
    valid_set = {v.lower() for v in valid}
    while True:
        try:
            raw = input(prompt).strip().lower()
        except (EOFError, KeyboardInterrupt):
            return "q"  # treat Ctrl+D/Ctrl+C as quit
        if raw in valid_set:
            return raw
        print(f"Invalid choice. Valid: {', '.join(valid)}")


def safe_run(action: Callable[[], None]) -> None:
    try:
        action()
    except KeyboardInterrupt:
        print("\nCancelled.")
    except Exception as e:
        print("\nError:")
        print(f"  {type(e).__name__}: {e}")
    finally:
        pause()