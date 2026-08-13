export type Owner = "shared" | "iniyan" | "shayan";

export type TestKind = "api" | "web";

export type MilestoneTest = {
  id: string;
  kind: TestKind;
  title: string;
  /** What the test asserts — also the intern’s acceptance criterion */
  criterion: string;
};

export type Milestone = {
  id: string;
  title: string;
  owner: Owner;
  summary: string;
  tests: MilestoneTest[];
};

/**
 * Day-1 acceptance board. Interns build features until these tests pass.
 * Prefer real HTTP/contract checks over manual checkboxes.
 */
export const milestones: Milestone[] = [
  {
    id: "scaffold",
    title: "Local scaffold",
    owner: "shared",
    summary: "Frontend and API boot locally and can talk to each other.",
    tests: [
      {
        id: "api-health",
        kind: "api",
        title: "API health",
        criterion: "GET /health returns JSON with status ok",
      },
      {
        id: "web-home",
        kind: "web",
        title: "Progress board loads",
        criterion: "GET / returns 200 and includes data-testid=progress-board",
      },
    ],
  },
  {
    id: "projects",
    title: "Project management",
    owner: "shayan",
    summary: "Create and list projects (permission-gated later).",
    tests: [
      {
        id: "projects-list",
        kind: "api",
        title: "List projects",
        criterion: "GET /projects returns 200 and a JSON array",
      },
      {
        id: "projects-create",
        kind: "api",
        title: "Create project",
        criterion:
          'POST /projects with {"name":"Demo"} returns 201 and an object with id + name',
      },
    ],
  },
  {
    id: "time-entries",
    title: "Time tracking",
    owner: "shayan",
    summary: "Start/stop/log time against a project and task.",
    tests: [
      {
        id: "time-entries-create",
        kind: "api",
        title: "Create / start entry",
        criterion:
          "POST /time-entries returns 201 with id, projectId, and startedAt (or hours)",
      },
      {
        id: "time-entries-list",
        kind: "api",
        title: "Filter entries",
        criterion:
          "GET /time-entries?from=&to= returns 200 and a JSON array",
      },
    ],
  },
  {
    id: "timesheets-export",
    title: "Timesheets + export",
    owner: "shayan",
    summary: "View timesheet data and export (strategy pattern for formats).",
    tests: [
      {
        id: "export-excel",
        kind: "api",
        title: "Excel export",
        criterion:
          "GET /timesheets/export?format=excel returns 200 with a spreadsheet content-type",
      },
      {
        id: "export-csv",
        kind: "api",
        title: "CSV export",
        criterion:
          "GET /timesheets/export?format=csv returns 200 with text/csv (or compatible)",
      },
    ],
  },
  {
    id: "users",
    title: "Users + session bridge",
    owner: "shared",
    summary: "Current-user endpoint the frontend/auth layer can call.",
    tests: [
      {
        id: "users-me",
        kind: "api",
        title: "Current user",
        criterion: "GET /users/me returns 200 with id and email (or name)",
      },
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard analytics",
    owner: "iniyan",
    summary: "Visual analytics / stats over time entries.",
    tests: [
      {
        id: "page-dashboard",
        kind: "web",
        title: "Dashboard route",
        criterion:
          "GET /dashboard returns 200 and includes data-testid=dashboard-page",
      },
      {
        id: "dashboard-stats",
        kind: "web",
        title: "Stats region",
        criterion:
          "Dashboard HTML includes data-testid=dashboard-stats",
      },
    ],
  },
  {
    id: "timesheets-ui",
    title: "Timesheets UI",
    owner: "iniyan",
    summary: "Frontend view for logged time (feeds export later).",
    tests: [
      {
        id: "page-timesheets",
        kind: "web",
        title: "Timesheets route",
        criterion:
          "GET /timesheets returns 200 and includes data-testid=timesheets-page",
      },
    ],
  },
  {
    id: "dark-mode",
    title: "Dark mode",
    owner: "iniyan",
    summary: "Built-in theme switching.",
    tests: [
      {
        id: "theme-toggle",
        kind: "web",
        title: "Theme toggle",
        criterion:
          "Home or layout HTML includes data-testid=theme-toggle",
      },
    ],
  },
  {
    id: "notifications",
    title: "Real-time notifications",
    owner: "shared",
    summary: "In-app live updates via SSE (banner/list), not native push.",
    tests: [
      {
        id: "sse-events",
        kind: "api",
        title: "SSE stream",
        criterion:
          "GET /events accepts the connection (text/event-stream) or returns 200 ready",
      },
      {
        id: "notifications-ui",
        kind: "web",
        title: "Notifications UI",
        criterion:
          "A page includes data-testid=notifications-panel",
      },
    ],
  },
  {
    id: "auth",
    title: "Auth (NextAuth)",
    owner: "shared",
    summary: "Session wiring — NextAuth talks to the same DB later via ORM.",
    tests: [
      {
        id: "auth-session",
        kind: "web",
        title: "Session endpoint",
        criterion: "GET /api/auth/session returns 200 JSON",
      },
    ],
  },
];

export const ownerLabel: Record<Owner, string> = {
  shared: "Shared",
  iniyan: "Iniyan · frontend",
  shayan: "Shayan · backend",
};
