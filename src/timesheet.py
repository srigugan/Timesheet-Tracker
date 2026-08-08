"""Timesheet tracker.

This is a starter scaffold. Method signatures and docstrings are provided —
your job is to fill in the logic where you see `# TODO`.

Run the tests from the project root with:
    python -m pytest
"""

from datetime import date


class Timesheet:
    def __init__(self, employee_name):
        self.employee_name = employee_name
        self.entries = {}  # maps a date string "YYYY-MM-DD" -> hours worked (float)

    def log_hours(self, day, hours):
        """Record hours worked for a given day.

        Args:
            day: a date string like "2026-08-03"
            hours: number of hours worked that day

        Rules:
            - hours cannot be negative (raise ValueError if it is)
            - logging the same day again should overwrite the old value
        """
        # TODO: validate hours, then store in self.entries
        raise NotImplementedError

    def weekly_total(self):
        """Return the sum of all logged hours as a number."""
        # TODO: add up every value in self.entries and return it
        raise NotImplementedError

    def export_csv(self):
        """Return the timesheet as CSV text.

        Expected format (rows sorted by date):
            date,hours
            2026-08-03,8
            2026-08-04,7.5
        """
        # TODO: build and return the CSV string
        raise NotImplementedError


if __name__ == "__main__":
    sheet = Timesheet("Intern")
    sheet.log_hours(str(date(2026, 8, 3)), 8)
    sheet.log_hours(str(date(2026, 8, 4)), 7.5)
    print(f"{sheet.employee_name} worked {sheet.weekly_total()} hours this week.")
