/**
 * Sightglass — the product page's content, in one place.
 *
 * Every number here is checked against the app's source, not estimated. The
 * page this feeds is a claim about software someone is about to install, so a
 * flattering number that turns out to be wrong costs more than a modest one
 * that is right.
 *
 * Last reconciled against history-lens @ 0.3.171:
 *   10 screens (App.tsx NAV_ITEMS) · 8 themes (lib/skins.ts) ·
 *   62 live features + 12 in progress (lib/featureCatalog.ts) ·
 *   9 browsers (main/browsers.ts) ·
 *   privacy: on-device by default; anonymous counts-only usage stats are the
 *   one thing shared by default (disclosed in-app) — say so here too.
 */

export const product = {
  name: "Sightglass",
  tagline: "See where your attention goes.",
  /** One paragraph, for the page hero and the portfolio card alike. */
  summary:
    "A local-first macOS app that puts a focus timer and your own browsing, app, calendar — even sleep — in one place, then tells you something true about your day. Every number is computed on your machine.",
  platform: "macOS 12+ · Apple Silicon and Intel",
  releasesUrl: "https://github.com/rvren/cadence-releases/releases/latest",
  latestApi: "https://api.github.com/repos/rvren/cadence-releases/releases/latest",
} as const;

/** The claim the whole product rests on, said plainly. */
export const premise = [
  "Time-tracking apps know what you opened. Focus apps know when you sat down. Neither knows both, because the honest version has to run on your machine — and almost nothing does.",
  "Sightglass reads your browser history, app usage and calendar locally, keeps them in one place you own, and works out every number from that. No account, no sign-up. Unplug the network and it still works.",
];

/** The 60-second install, stated up front — no back-and-forth. */
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
    body: "The free build isn't notarized, so on first launch run one command (or right-click → Open) — after that it opens like any app.",
  },
] as const;

export const XATTR_CMD = "xattr -cr /Applications/Sightglass.app";

export interface Screen {
  name: string;
  blurb: string;
  detail: string;
}

/** The ten screens, as the app's own nav orders them. */
export const screens: Screen[] = [
  {
    name: "Today",
    blurb: "One briefing, not a dashboard",
    detail:
      "A single composed read on the day: your score, your mood across the hours, last night's sleep, what's open on the calendar — and, in the evening, an honest review of how the day actually went.",
  },
  {
    name: "Focus",
    blurb: "A timer that knows what you did",
    detail:
      "Configurable intervals, a floating always-on-top mini timer, offline ambient sound, and guided breathing between rounds — with every session recorded against what you actually browsed.",
  },
  {
    name: "Calendar",
    blurb: "The shape of your day",
    detail:
      "A true-to-scale timeline where a meeting's width is its length, overlapping invites stack rather than hide, and free stretches are drawn across the whole day.",
  },
  {
    name: "Wellbeing",
    blurb: "Sleep, mood, budgets, streaks",
    detail:
      "Your nights, read from when your devices go quiet. Mood inferred across the hours (and always yours to correct). Category budgets, forgiving streaks, and a live strain read that tells flow from frayed.",
  },
  {
    name: "Insights",
    blurb: "Your tools, turned into a to-do",
    detail:
      "Optionally connect GitHub, Jira, Slack or Google Workspace and get one prioritized action feed across all of them. Credentials stay on your machine; every run is logged where you can see it.",
  },
  {
    name: "Apps",
    blurb: "Where the desktop time goes",
    detail:
      "Real app usage with per-app daily limits — and when you cross one, not a nagging popup but a guided breathing pause that asks whether you want to continue. Your call, made calmer.",
  },
  {
    name: "Work",
    blurb: "A desk that resets every morning",
    detail:
      "Each morning the Desk lays out the few things your day is asking for — the task you promised yourself last night, your tools' loudest items, threads going quiet. Clear it and the day is won.",
  },
  {
    name: "Atlas",
    blurb: "A map of your attention",
    detail:
      "Your sites, apps and projects as a treemap where area is time, paired with claims the map itself is the evidence for.",
  },
  {
    name: "Trends",
    blurb: "The numbers behind your browsing",
    detail:
      "Summary, timeline, categories and sessions across your whole history, plus a per-domain deep dive for any site you visit.",
  },
  {
    name: "Settings & Data",
    blurb: "Your data, your rules",
    detail:
      "Export anything you see, exclude sites so they're never stored at all, choose how long to keep things, back up or restore everything, or delete the lot.",
  },
];

export interface Metric {
  name: string;
  what: string;
  honesty: string;
}

/** The signature numbers — each with the thing it deliberately does not claim. */
export const metrics: Metric[] = [
  {
    name: "Sightglass Score",
    what: "One 0–100 read on the day, with a grade and a trend against your own rolling average. Blends focus against your goal, how undistracted that focus was, how deep the longest stretch went, and consistency.",
    honesty:
      "Compared only to your own past. There is no leaderboard and no benchmark, because a score that cannot be computed against a colleague cannot later be turned into one.",
  },
  {
    name: "Your nights",
    what: "Sleep, inferred from the one honest signal a computer has: the longest overnight stretch where your devices went completely quiet. Brief 2am check-ins count as interruptions, not two half-nights.",
    honesty:
      "It needs device activity on both sides of a night before it claims anything — and every night is yours to correct. An estimate is marked as one, never dressed up as measurement.",
  },
  {
    name: "Pulse",
    what: "A live strain read — cognitive load now, strain accumulated today, and a state from recovering through flow to frayed.",
    honesty:
      "Derived from measured activity and context-switching, not from a wearable. It never reports a heart rate, because it cannot know one.",
  },
  {
    name: "Work objects",
    what: "The pull requests, tickets and builds in your history, grouped by the thing rather than the site — so a thousand visits to one domain become the actual list of what you were working on.",
    honesty:
      "Opening a page is attention, not authorship. It reports what you kept returning to, never that you wrote or merged it.",
  },
];

/** What is genuinely on-device, and what leaves. Stated as a boundary. */
export const privacy = {
  local: [
    "Browser history, app usage, focus sessions, sleep and calendar events all stay on your Mac, in one place you control.",
    "Every score, chart and insight is computed right there on your device.",
    "No account. No sign-up. Works offline.",
    "A “what leaves your device” panel inside the app lists every outbound flow, what it carries, and why.",
  ],
  outbound: [
    "Anonymous, counts-only usage statistics — which screens and features get used, never your browsing, content or identity. Disclosed in-app.",
    "A lightweight check for new versions.",
    "Google Calendar sync, if you connect a calendar.",
    "GitHub, Jira, Slack or Google Workspace, if you connect them — credentials never leave your machine.",
    "AI analysis, only if you supply your own API key, and only for the insight you asked for.",
  ],
  note:
    "Everything that carries your actual data is off until you turn it on, individually — and turning it off puts you back to fully local. The app never uploads your history, and there is nothing to sign into.",
};

export const browsers = [
  "Chrome",
  "Safari",
  "Firefox",
  "Edge",
  "Brave",
  "Arc",
  "Opera",
  "Vivaldi",
  "Chromium",
];

/** Eight curated themes. The app deliberately does not ship dozens. */
export const skins: { name: string; tag: string; colors: [string, string, string] }[] = [
  { name: "Sightglass", tag: "The signature look", colors: ["#0d0f12", "#e8eaed", "#1b1f24"] },
  { name: "Air", tag: "Weightless, minimal — the default", colors: ["#101113", "#d9dde3", "#17181c"] },
  { name: "Cupertino", tag: "Light and familiar", colors: ["#f5f5f7", "#0071e3", "#ffffff"] },
  { name: "Frost", tag: "Cool and airy", colors: ["#f2f6fa", "#3b82f6", "#ffffff"] },
  { name: "Noir", tag: "Black and white", colors: ["#0f0f0f", "#f4f4f4", "#232323"] },
  { name: "Carbon", tag: "Deep neutral", colors: ["#121214", "#a1a1aa", "#1e1e22"] },
  { name: "Onyx Green", tag: "Terminal green", colors: ["#0a0f0a", "#4ade80", "#16281a"] },
  { name: "Ion", tag: "Electric accent", colors: ["#0b1020", "#7c8cff", "#151c33"] },
];

/** Counts quoted on the page. Kept here so they are updated together. */
export const counts = {
  screens: 10,
  features: 62,
  comingFeatures: 12,
  skins: 8,
  browsers: 9,
} as const;
