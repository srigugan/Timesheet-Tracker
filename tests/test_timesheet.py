"""Starter tests for the timesheet tracker.

These will fail until the TODOs in src/timesheet.py are implemented.
Making them all pass is the first milestone.

Run from the project root:
    python -m pytest
"""

import sys
import os
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))
from timesheet import Timesheet


def test_log_and_total():
    sheet = Timesheet("Test")
    sheet.log_hours("2026-08-03", 8)
    sheet.log_hours("2026-08-04", 7.5)
    assert sheet.weekly_total() == 15.5


def test_relog_overwrites():
    sheet = Timesheet("Test")
    sheet.log_hours("2026-08-03", 8)
    sheet.log_hours("2026-08-03", 6)  # same day again
    assert sheet.weekly_total() == 6


def test_negative_hours_rejected():
    sheet = Timesheet("Test")
    with pytest.raises(ValueError):
        sheet.log_hours("2026-08-03", -2)


def test_csv_export():
    sheet = Timesheet("Test")
    sheet.log_hours("2026-08-04", 7.5)
    sheet.log_hours("2026-08-03", 8)
    assert sheet.export_csv() == "date,hours\n2026-08-03,8\n2026-08-04,7.5"
