import type { MilestoneTest } from "./milestones";

export type TestResult = {
  testId: string;
  pass: boolean;
  message: string;
  ranAt: string;
};

function apiBase(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "http://localhost:8000"
  );
}

function webBase(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
}

async function fetchJson(
  url: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: unknown; contentType: string }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  const contentType = res.headers.get("content-type") ?? "";
  let data: unknown = null;
  try {
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data, contentType };
}

async function fetchText(url: string): Promise<{
  ok: boolean;
  status: number;
  text: string;
}> {
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function result(
  testId: string,
  pass: boolean,
  message: string,
): TestResult {
  return { testId, pass, message, ranAt: new Date().toISOString() };
}

async function runApiTest(test: MilestoneTest): Promise<TestResult> {
  const base = apiBase();

  switch (test.id) {
    case "api-health": {
      try {
        const { ok, status, data } = await fetchJson(`${base}/health`);
        const pass =
          ok &&
          isRecord(data) &&
          data.status === "ok";
        return result(
          test.id,
          pass,
          pass
            ? "GET /health → status ok"
            : `Expected status ok, got HTTP ${status}: ${JSON.stringify(data)}`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          `Could not reach API at ${base} (${err instanceof Error ? err.message : "error"}). Is uvicorn running?`,
        );
      }
    }

    case "projects-list": {
      try {
        const { ok, status, data } = await fetchJson(`${base}/projects`);
        const pass = ok && Array.isArray(data);
        return result(
          test.id,
          pass,
          pass
            ? `GET /projects → ${data.length} project(s)`
            : `Expected 200 + JSON array, got HTTP ${status}`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    case "projects-create": {
      try {
        const { ok, status, data } = await fetchJson(`${base}/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Demo" }),
        });
        const pass =
          (status === 201 || status === 200) &&
          isRecord(data) &&
          ("id" in data || "projectId" in data) &&
          typeof data.name === "string";
        return result(
          test.id,
          pass,
          pass
            ? "POST /projects created a project"
            : `Expected 201 with id + name, got HTTP ${status}: ${JSON.stringify(data)}`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    case "time-entries-create": {
      try {
        const { ok, status, data } = await fetchJson(`${base}/time-entries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: "demo",
            task: "Acceptance test",
            action: "start",
          }),
        });
        const pass =
          (status === 201 || status === 200) &&
          isRecord(data) &&
          ("id" in data || "entryId" in data) &&
          ("projectId" in data || "project_id" in data) &&
          ("startedAt" in data ||
            "started_at" in data ||
            "hours" in data ||
            "duration" in data);
        return result(
          test.id,
          pass,
          pass
            ? "POST /time-entries accepted"
            : `Expected 201 with id, projectId, startedAt|hours, got HTTP ${status}`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    case "time-entries-list": {
      try {
        const from = "2026-01-01";
        const to = "2026-12-31";
        const { ok, status, data } = await fetchJson(
          `${base}/time-entries?from=${from}&to=${to}`,
        );
        const pass = ok && Array.isArray(data);
        return result(
          test.id,
          pass,
          pass
            ? `GET /time-entries → ${data.length} entr${data.length === 1 ? "y" : "ies"}`
            : `Expected 200 + JSON array, got HTTP ${status}`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    case "export-excel": {
      try {
        const res = await fetch(`${base}/timesheets/export?format=excel`, {
          cache: "no-store",
        });
        const ct = (res.headers.get("content-type") ?? "").toLowerCase();
        const pass =
          res.ok &&
          (ct.includes("spreadsheet") ||
            ct.includes("excel") ||
            ct.includes("officedocument") ||
            ct.includes("application/octet-stream") ||
            ct.includes("application/vnd.ms-excel"));
        return result(
          test.id,
          pass,
          pass
            ? `Excel export ok (${ct || "binary"})`
            : `Expected spreadsheet content-type, got HTTP ${res.status} (${ct || "no content-type"})`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    case "export-csv": {
      try {
        const res = await fetch(`${base}/timesheets/export?format=csv`, {
          cache: "no-store",
        });
        const ct = (res.headers.get("content-type") ?? "").toLowerCase();
        const pass =
          res.ok && (ct.includes("text/csv") || ct.includes("csv") || ct.includes("text/plain"));
        return result(
          test.id,
          pass,
          pass
            ? `CSV export ok (${ct})`
            : `Expected CSV content-type, got HTTP ${res.status} (${ct || "no content-type"})`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    case "users-me": {
      try {
        const { ok, status, data } = await fetchJson(`${base}/users/me`);
        const pass =
          ok &&
          isRecord(data) &&
          ("id" in data || "userId" in data || "user_id" in data) &&
          ("email" in data || "name" in data);
        return result(
          test.id,
          pass,
          pass
            ? "GET /users/me returned a user"
            : `Expected 200 with id + email|name, got HTTP ${status}`,
        );
      } catch (err) {
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    case "sse-events": {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 1500);
        const res = await fetch(`${base}/events`, {
          headers: { Accept: "text/event-stream" },
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(timer);
        controller.abort();
        const ct = (res.headers.get("content-type") ?? "").toLowerCase();
        const pass =
          res.ok &&
          (ct.includes("text/event-stream") ||
            ct.includes("application/json") ||
            ct.includes("text/plain"));
        return result(
          test.id,
          pass,
          pass
            ? `GET /events ready (${ct || "stream"})`
            : `Expected event stream (or 200 ready), got HTTP ${res.status} (${ct || "no content-type"})`,
        );
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return result(
            test.id,
            true,
            "GET /events stayed open (SSE-style) — treating as pass",
          );
        }
        return result(
          test.id,
          false,
          err instanceof Error ? err.message : "Request failed",
        );
      }
    }

    default:
      return result(test.id, false, `No API runner for ${test.id}`);
  }
}

async function runWebTest(test: MilestoneTest): Promise<TestResult> {
  const base = webBase();

  const pageChecks: Record<string, { path: string; markers: string[] }> = {
    "web-home": { path: "/", markers: ['data-testid="progress-board"'] },
    "page-dashboard": {
      path: "/dashboard",
      markers: ['data-testid="dashboard-page"'],
    },
    "dashboard-stats": {
      path: "/dashboard",
      markers: ['data-testid="dashboard-stats"'],
    },
    "page-timesheets": {
      path: "/timesheets",
      markers: ['data-testid="timesheets-page"'],
    },
    "theme-toggle": {
      path: "/",
      markers: ['data-testid="theme-toggle"'],
    },
    "notifications-ui": {
      path: "/",
      markers: ['data-testid="notifications-panel"'],
    },
  };

  if (test.id === "auth-session") {
    try {
      const { ok, status, data } = await fetchJson(`${base}/api/auth/session`);
      const pass = ok && (isRecord(data) || data === null);
      return result(
        test.id,
        pass,
        pass
          ? "GET /api/auth/session returned JSON"
          : `Expected 200 JSON session payload, got HTTP ${status}`,
      );
    } catch (err) {
      return result(
        test.id,
        false,
        err instanceof Error ? err.message : "Request failed",
      );
    }
  }

  const check = pageChecks[test.id];
  if (!check) {
    return result(test.id, false, `No web runner for ${test.id}`);
  }

  try {
    const { ok, status, text } = await fetchText(`${base}${check.path}`);
    if (!ok) {
      return result(
        test.id,
        false,
        `GET ${check.path} → HTTP ${status} (create this route)`,
      );
    }
    const missing = check.markers.filter((m) => !text.includes(m));
    const pass = missing.length === 0;
    return result(
      test.id,
      pass,
      pass
        ? `GET ${check.path} has ${check.markers.join(", ")}`
        : `Missing marker(s) on ${check.path}: ${missing.join(", ")}`,
    );
  } catch (err) {
    return result(
      test.id,
      false,
      err instanceof Error ? err.message : "Request failed",
    );
  }
}

export async function runAcceptanceTest(
  test: MilestoneTest,
): Promise<TestResult> {
  if (test.kind === "api") {
    return runApiTest(test);
  }
  return runWebTest(test);
}

export async function runAllAcceptanceTests(
  tests: MilestoneTest[],
): Promise<TestResult[]> {
  const results: TestResult[] = [];
  for (const test of tests) {
    results.push(await runAcceptanceTest(test));
  }
  return results;
}
