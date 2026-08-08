# Timesheet Tracker

A small tool for logging hours worked and reporting weekly totals.

## The assignment

The code in `src/timesheet.py` is a scaffold. Each method has a signature and a
docstring, but the logic is missing — look for the `# TODO` markers and fill them in.

You're done with the first milestone when all the tests pass.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install pytest
```

## Running the tests

From the project root:

```bash
python -m pytest
```

They'll fail at first — that's expected. Make them pass one at a time.

## Running the tool

```bash
python src/timesheet.py
```

## Workflow

- Don't commit to `main` directly.
- For each task, make a branch: `git switch -c your-feature-name`
- Commit as you go with clear messages.
- Push your branch and open a pull request for review.

## Milestones

1. Make all existing tests pass (`log_hours`, `weekly_total`, `export_csv`).
2. Add validation: reject days that aren't valid date strings.
3. Add a `monthly_total(month)` method and write tests for it.
