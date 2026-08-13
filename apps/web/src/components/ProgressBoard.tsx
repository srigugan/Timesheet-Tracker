"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  runAcceptanceTest,
  runAllAcceptanceTests,
  type TestResult,
} from "@/lib/acceptance-tests";
import {
  milestones,
  ownerLabel,
  type Milestone,
  type MilestoneTest,
  type Owner,
} from "@/lib/milestones";

const STORAGE_KEY = "timesheet-tracker:acceptance-results";

type ResultsMap = Record<string, TestResult>;

function loadStored(): ResultsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ResultsMap;
  } catch {
    return {};
  }
}

function saveStored(map: ResultsMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function allTests(): MilestoneTest[] {
  return milestones.flatMap((m) => m.tests);
}

function ownerTone(owner: Owner): string {
  if (owner === "iniyan") return "owner-iniyan";
  if (owner === "shayan") return "owner-shayan";
  return "owner-shared";
}

function statusForMilestone(
  milestone: Milestone,
  results: ResultsMap,
): "pass" | "fail" | "partial" | "idle" {
  const statuses = milestone.tests.map((t) => results[t.id]?.pass);
  if (statuses.every((s) => s === undefined)) return "idle";
  if (statuses.every((s) => s === true)) return "pass";
  if (statuses.some((s) => s === false)) {
    return statuses.some((s) => s === true) ? "partial" : "fail";
  }
  return "partial";
}

export function ProgressBoard() {
  const [results, setResults] = useState<ResultsMap>({});
  const [runningId, setRunningId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | Owner>("all");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setResults(loadStored());
  }, []);

  const tests = useMemo(() => allTests(), []);
  const passed = tests.filter((t) => results[t.id]?.pass).length;
  const failed = tests.filter((t) => results[t.id]?.pass === false).length;
  const total = tests.length;

  const visible = milestones.filter(
    (m) => filter === "all" || m.owner === filter,
  );

  function mergeResults(next: TestResult[]) {
    setResults((prev) => {
      const map = { ...prev };
      for (const r of next) map[r.testId] = r;
      saveStored(map);
      return map;
    });
  }

  function runOne(test: MilestoneTest) {
    setRunningId(test.id);
    startTransition(async () => {
      const r = await runAcceptanceTest(test);
      mergeResults([r]);
      setRunningId(null);
    });
  }

  function runMilestone(milestone: Milestone) {
    setRunningId(milestone.id);
    startTransition(async () => {
      const r = await runAllAcceptanceTests(milestone.tests);
      mergeResults(r);
      setRunningId(null);
    });
  }

  function runAll() {
    setRunningId("all");
    startTransition(async () => {
      const r = await runAllAcceptanceTests(tests);
      mergeResults(r);
      setRunningId(null);
    });
  }

  function clearResults() {
    localStorage.removeItem(STORAGE_KEY);
    setResults({});
  }

  const busy = runningId !== null || isPending;

  return (
    <div className="progress-shell" data-testid="progress-board">
      <header className="progress-hero">
        <div>
          <p className="eyebrow">Internship build board</p>
          <h1>What still needs shipping</h1>
          <p className="lede">
            Each row is an acceptance test. Build the feature, hit Run — if it
            passes, that piece is done. Results stick in this browser until you
            clear them.
          </p>
        </div>
        <div className="score" aria-live="polite">
          <strong>
            {passed}/{total}
          </strong>
          <span>tests passing</span>
          {failed > 0 ? <span className="fail-count">{failed} failing</span> : null}
        </div>
      </header>

      <div className="toolbar">
        <div className="filters" role="group" aria-label="Filter by owner">
          {(
            [
              ["all", "All"],
              ["shared", "Shared"],
              ["iniyan", "Iniyan"],
              ["shayan", "Shayan"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={filter === value ? "chip active" : "chip"}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="actions">
          <button type="button" className="btn ghost" onClick={clearResults} disabled={busy}>
            Clear results
          </button>
          <button type="button" className="btn primary" onClick={runAll} disabled={busy}>
            {runningId === "all" ? "Running…" : "Run all tests"}
          </button>
        </div>
      </div>

      <ol className="milestone-list">
        {visible.map((milestone) => {
          const status = statusForMilestone(milestone, results);
          return (
            <li key={milestone.id} className={`milestone status-${status}`}>
              <div className="milestone-head">
                <div>
                  <div className="milestone-meta">
                    <span className={`owner ${ownerTone(milestone.owner)}`}>
                      {ownerLabel[milestone.owner]}
                    </span>
                    <span className={`badge badge-${status}`}>
                      {status === "pass"
                        ? "Done"
                        : status === "fail"
                          ? "Failing"
                          : status === "partial"
                            ? "In progress"
                            : "Not run"}
                    </span>
                  </div>
                  <h2>{milestone.title}</h2>
                  <p>{milestone.summary}</p>
                </div>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => runMilestone(milestone)}
                  disabled={busy}
                >
                  {runningId === milestone.id ? "Running…" : "Run milestone"}
                </button>
              </div>

              <ul className="test-list">
                {milestone.tests.map((test) => {
                  const r = results[test.id];
                  const state =
                    r === undefined ? "idle" : r.pass ? "pass" : "fail";
                  return (
                    <li key={test.id} className={`test-row state-${state}`}>
                      <div className="test-main">
                        <div className="test-title-row">
                          <span className={`dot dot-${state}`} aria-hidden />
                          <strong>{test.title}</strong>
                          <span className="kind">{test.kind}</span>
                        </div>
                        <p className="criterion">{test.criterion}</p>
                        {r ? (
                          <p className={`message msg-${state}`}>{r.message}</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        className="btn ghost compact"
                        onClick={() => runOne(test)}
                        disabled={busy}
                      >
                        {runningId === test.id ? "…" : "Run"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
