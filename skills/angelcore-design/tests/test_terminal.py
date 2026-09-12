from pathlib import Path
import importlib.util
import os
import subprocess
import sys
import time

import pytest

ROOT = Path(__file__).resolve().parents[1]
DEMO = ROOT / "examples/terminal/demo.py"
spec = importlib.util.spec_from_file_location("terminal_demo", DEMO)
t = importlib.util.module_from_spec(spec)
spec.loader.exec_module(t)


@pytest.mark.parametrize("width,height", [(80, 24), (120, 40), (40, 16), (24, 8), (32, 10)])
@pytest.mark.parametrize("view", t.VIEWS)
def test_snapshot_bounds(width, height, view):
    output = t.render(width, height, view)
    assert len(output.splitlines()) <= height
    assert all(len(line) <= width for line in output.splitlines())
    assert "\x1b" not in output
    assert output.isascii()


def test_unicode_and_controls_use_explicit_fallback():
    label = "caf\u00e9/\u6587\u4ef6\x1b[31m"
    original = label
    text = t.render(label=label)
    assert label == original
    assert "\\xe9" in text and "\\u6587" in text and "\\x1b" in text
    assert "\x1b" not in text


def test_redirected_cli_is_plain():
    result = subprocess.run([sys.executable, str(DEMO), "--width", "80", "--height", "24"], capture_output=True, text=True)
    assert result.returncode == 0
    assert "\x1b" not in result.stdout
    interactive = subprocess.run([sys.executable, str(DEMO), "--interactive"], capture_output=True, text=True)
    assert interactive.returncode == 2
    assert "requires a real TTY" in interactive.stderr


@pytest.mark.skipif(os.name != "posix", reason="PTY test requires POSIX")
def test_real_tui_keys_resize_exit_and_restore(tmp_path):
    import fcntl
    import pty
    import select
    import signal
    import struct
    import termios
    master, slave = pty.openpty()
    fcntl.ioctl(slave, termios.TIOCSWINSZ, struct.pack("HHHH", 24, 80, 0, 0))
    before = termios.tcgetattr(slave)
    env = dict(os.environ, TERM="xterm-256color")
    process = subprocess.Popen([sys.executable, str(DEMO), "--interactive"], stdin=slave, stdout=slave, stderr=slave, env=env, start_new_session=True)
    captured = bytearray()
    def drain(duration):
        end = time.monotonic() + duration
        while time.monotonic() < end:
            ready, _, _ = select.select([master], [], [], 0.05)
            if ready:
                try:
                    captured.extend(os.read(master, 65536))
                except OSError:
                    break
    try:
        drain(0.35)
        os.write(master, b"j")
        drain(0.2)
        fcntl.ioctl(slave, termios.TIOCSWINSZ, struct.pack("HHHH", 40, 120, 0, 0))
        os.kill(process.pid, signal.SIGWINCH)
        drain(0.2)
        os.write(master, b"\t")
        drain(0.2)
        os.write(master, b"q")
        process.wait(timeout=3)
        drain(0.1)
        assert process.returncode == 0
        assert b"REVIEW" in captured
        assert b"Traceback" not in captured
        assert termios.tcgetattr(slave) == before
        (tmp_path / "tui-session.txt").write_bytes(captured)
    finally:
        if process.poll() is None:
            process.kill(); process.wait()
        os.close(master); os.close(slave)
