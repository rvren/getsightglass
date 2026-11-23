/**
 * Sightglass: all of the site's product copy, in one place.
 *
 * Every claim describes the PUBLIC download, not the development branch.
 * Last reconciled against history-lens at tag v0.3.197. When a release changes
 * what the app does, update this file. Do not edit claims inline in a section.
 *
 * Do not claim, at this version: notarized or signed builds, "nothing leaves
 * your Mac", encrypted credentials, on-device AI (not public), agents other
 * than Claude Code, a real AI bill (costs are list price), Microsoft calendars,
 * measured sleep, or Health as available.
 */

export const product = {
  name: "Sightglass",
  tagline: "Your whole workday. One private place.",
  summary:
    "Focus, AI agents, calendar and the tools you use, understood right on your Mac.",
  platform: "macOS 12+ · Apple Silicon and Intel",
  releasesUrl: "https://github.com/rvren/cadence-releases/releases/latest",
  latestApi: "https://api.github.com/repos/rvren/cadence-releases/releases/latest",
} as const;

export const nav = [
  { label: "Product", href: "#today" },
  { label: "AI agents", href: "#agents" },
  { label: "Health", href: "#health" },
  { label: "Privacy", href: "#privacy" },
] as const;

export const sources = [
  "Chrome",
  "Safari",
  "Firefox",
  "Arc",
  "Brave",
  "Edge",
  "Claude Code",
  "GitHub",
  "Jira",
  "Slack",
  "Google Calendar",
  "iCloud Calendar",
] as const;

export const today = {
  kicker: "Today",
  title: ["Your day,", "in one honest read."],
  body: "Open Sightglass and see how the day is going: your score against your own average, how you said you felt, last night's estimated sleep, and what is left on the calendar.",
  note: "Compared only with your own past. There are no leaderboards.",
} as const;

export type Tone = "violet" | "amber" | "cyan" | "pink" | "green";

export interface Chapter {
  id: "focus" | "agents" | "desk" | "insights" | "health";
  n: string;
  kicker: string;
  tone: Tone;
  title: [string, string];
  body: string;
  points: string[];
  soon?: boolean;
}

export const chapters: Chapter[] = [
  {
    id: "focus",
    n: "01",
    kicker: "Focus",
    tone: "amber",
    title: ["Protect the hours", "that move the work."],
    body: "A focus timer that stays with you and remembers what actually happened during each session.",
    points: [
      "Presets from 15 to 90 minutes, or your own",
      "A floating mini timer above every app",
      "Built-in sounds and guided breathing",
    ],
  },
  {
    id: "agents",
    n: "02",
    kicker: "AI agents",
    tone: "violet",
    title: ["Your agents' work,", "and what it cost."],
    body: "Sightglass reads your Claude Code sessions on this Mac and shows the work behind every ask.",
    points: [
      "Spend by model, at API list prices or what you pay",
      "Whether edited files reached a commit",
      "Which asks ran tests, and your estimated review time",
    ],
  },
  {
    id: "desk",
    n: "03",
    kicker: "Calendar and Desk",
    tone: "cyan",
    title: ["Know what today", "is asking for."],
    body: "A true-to-scale calendar beside a Desk that resets every morning with the few things that matter.",
    points: [
      "Google and iCloud calendars, read-only",
      "Plan a meeting agenda in minutes",
      "Last night's intention and threads going quiet",
    ],
  },
  {
    id: "insights",
    n: "04",
    kicker: "Insights",
    tone: "pink",
    title: ["Every tool,", "one clear to-do list."],
    body: "Connect the tools you choose and turn their noise into a short list of next actions.",
    points: [
      "GitHub, Jira, Slack and Google Workspace",
      "Uses your own Anthropic API key",
      "Every run is logged where you can see it",
    ],
  },
  {
    id: "health",
    n: "05",
    kicker: "Health",
    tone: "green",
    title: ["Your energy,", "beside your work."],
    body: "Bring in your sleep, recovery and activity, and see how they line up with the days you do your best work.",
    points: [
      "Apple Health, WHOOP and Oura",
      "Compared only with your own baseline",
      "Your keys stay on your Mac",
    ],
    soon: true,
  },
];

export const privacy = {
  kicker: "Privacy",
  title: ["Your day stays yours.", "Here is the full list."],
  body: "Your history and activity live in a database on your Mac. No account is needed. This is everything the app can send, and when.",
  stays: [
    "Browsing history and bookmarks",
    "App usage and focus sessions",
    "Scores, charts and daily insights",
    "Claude Code session history",
  ],
  byDefault: [
    {
      title: "Anonymous usage counts",
      body: "A random install ID, app version, platform, and which screens and features were used. Turn it off in Settings & Data → Usage.",
    },
    {
      title: "Update check",
      body: "A read of the public releases list on GitHub.",
    },
  ],
  ifYouChoose: [
    {
      title: "Calendar sync",
      body: "Read-only access to the Google or iCloud calendars you connect.",
    },
    {
      title: "GitHub, Jira, Slack, Google Workspace",
      body: "Fetched from the tools you connect, then summarised by Anthropic with your key.",
    },
    {
      title: "AI insights and Assistant",
      body: "Daily totals and your question go to Anthropic with your own key.",
    },
    {
      title: "Google sign-in",
      body: "Optional. Fetches your name and email once.",
    },
    {
      title: "Page previews",
      body: "Loads a page when you choose to preview it.",
    },
  ],
  site: "This website uses cookieless Cloudflare Web Analytics.",
} as const;

export const installSteps = [
  {
    title: "Open the file",
    body: "Open Sightglass.dmg from your Downloads folder.",
  },
  {
    title: "Drag to Applications",
    body: "Drag the Sightglass icon into your Applications folder.",
  },
  {
    title: "Open it once, the special way",
    body: "This build isn't notarized yet, so on first launch run one command or right-click → Open. After that it opens like any app.",
  },
] as const;

export const XATTR_CMD = "xattr -cr /Applications/Sightglass.app";
