import random
import time
import shutil
import sys

from learning_letters.basic_large_abc import big_text
from utils.cli_tools import pause


# ---------- terminal redraw (no scroll) ----------
ANSI = "\x1b["

def term_write(s: str) -> None:
    sys.stdout.write(s)
    sys.stdout.flush()

def clear_and_home() -> None:
    # Cursor to top-left + clear entire screen
    term_write(ANSI + "H" + ANSI + "2J")

def enter_alt_screen() -> None:
    # Switch to alternate screen buffer (restores after exit)
    term_write(ANSI + "?1049h")

def exit_alt_screen() -> None:
    term_write(ANSI + "?1049l")


def running_span_cli(
    min_len: int = 5,
    max_len: int = 19,
    seconds_per_item: float = 1.5,   # tweak
    recall_n: int = 4,               # tweak
) -> None:

    def term_width() -> int:
        return shutil.get_terminal_size((80, 20)).columns

    def center_line(line: str, width: int) -> str:
        if line.strip() == "":
            return line
        pad = max(0, (width - len(line)) // 2)
        return (" " * pad) + line

    def center_block(block: str) -> str:
        w = term_width()
        return "\n".join(center_line(ln, w) for ln in block.splitlines())

    def render_frame(letter: str, recall_number: int, tick: int) -> None:
        top = r"#============#" if tick % 2 == 0 else r"*============*"
        bot = r"#============#" if tick % 2 == 0 else r"*============*"

        clear_and_home()
        # Build a full frame so we write once (less flicker)
        frame = []
        frame.append(f">> Remember: {recall_number}")
        frame.append(">>")
        frame.append(f">> {top}")
        frame.append(letter)
        frame.append(center_block(big_text(letter)))
        frame.append(f">> {bot}")
        term_write("\n".join(frame) + "\n")

    import time

    def render_frame_starting_message(
            seconds_per_item: float,
            recall_n: int,
    ) -> None:
        top = r"#============#"
        bot = r"*============*"

        clear_and_home()

        frame = []
        frame.append(f">> {top}")
        frame.append(">>")
        frame.append(f">> Remember the last {recall_n} letters")
        frame.append(f">> You will have: {seconds_per_item} seconds to read each letter")
        frame.append(f">> {bot}")

        term_write("\n".join(frame) + "\n")

        # Keep this frame visible for 5 seconds
        time.sleep(5)

    # Generate stream
    stream_len = random.randint(min_len, max_len)
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    stream = [random.choice(alphabet) for _ in range(stream_len)]

    # Use alternate screen so user can’t scroll back in this run
    enter_alt_screen()
    try:
        needed = min(recall_n, len(stream))
        render_frame_starting_message(seconds_per_item, needed)
        # Presentation (redraw same screen each tick)
        for i, ch in enumerate(stream):
            render_frame(ch,
                         needed,
                         tick=i)
            time.sleep(seconds_per_item)
            clear_and_home()

            # STOP
        clear_and_home()
        term_write(">>\n>>\n>> STOP\n\n")
        term_write(f">> Recall the last {needed} letters (in order).\n")
        term_write(">> Type one letter per line, press Enter after each.\n\n")

        target = stream[-needed:]
        entered: list[str] = []

        while len(entered) < needed:
            # Redraw input screen in-place too
            clear_and_home()
            term_write(">>\n>>\n")
            chain = " -> ".join(entered) if entered else ""
            term_write(f">> {chain}\n")
            try:
                raw = input(">> ").strip().upper()
            except (EOFError, KeyboardInterrupt):
                term_write("\nCancelled.\n")
                return
            if raw == "":
                continue
            entered.append(raw[0])

        # Results
        clear_and_home()
        term_write(">> RESULTS\n\n")
        term_write("TARGET:\n  " + " -> ".join(target) + "\n\n")
        term_write("YOU:\n  " + " -> ".join(entered) + "\n\n")

        marks = ["✓" if t == e else "✗" for t, e in zip(target, entered)]
        term_write("POSITION CHECK:\n  " + "  ".join(marks) + "\n\n")

        score = sum(1 for t, e in zip(target, entered) if t == e)
        term_write(f"SCORE: {score}/{needed}\n\n")
        term_write(">> Press Enter to continue.\n")
        pause()
    finally:
        # Always restore the original screen
        exit_alt_screen()


def running_span_placeholder() -> None:
    running_span_cli(
        min_len=1,
        max_len=13,
        seconds_per_item=1.0,
        recall_n=2,
    )
