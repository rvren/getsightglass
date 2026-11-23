import { useId, type ReactNode } from "react";
import {
  Activity,
  CalendarDays,
  Coins,
  Footprints,
  MessageSquareText,
  Moon,
  Timer,
} from "lucide-react";
import type { Chapter } from "@/data/sightglass";
import { BrandMark } from "./brand";
import { Glass, SampleTag, Tile } from "./parts";

function Frame({ title, icon, tag, children }: { title: string; icon: ReactNode; tag?: string; children: ReactNode }) {
  return (
    <Glass className="relative p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-display text-sm">{icon}{title}</span>
        <SampleTag>{tag ?? "Sample data"}</SampleTag>
      </div>
      {children}
    </Glass>
  );
}

function Focus() {
  const id = useId();
  const r = 86;
  const c = 2 * Math.PI * r;
  return (
    <Frame title="Deep work" icon={<Timer className="text-tone h-4 w-4" aria-hidden />}>
      <div className="relative mx-auto grid h-56 w-56 place-items-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90" aria-hidden>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "hsl(var(--tone))" }} />
              <stop offset="1" style={{ stopColor: "hsl(var(--tone-2))" }} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="5" />
          <circle cx="100" cy="100" r={r} fill="none" stroke={`url(#${id})`} strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * 0.34} />
        </svg>
        <div className="text-center">
          <p className="font-display text-5xl font-light tracking-tight">17:04</p>
          <p className="mt-1 text-xs text-muted-foreground">of 50 minutes</p>
        </div>
      </div>
    </Frame>
  );
}

function Agents() {
  const rows = [
    { task: "Fix the failing checkout test", landed: true, tests: true },
    { task: "Refactor the settings page", landed: true, tests: false },
    { task: "Draft the migration", landed: false, tests: false },
  ];
  return (
    <Frame title="Claude Code" icon={<BrandMark name="Claude Code" />}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Tile label="List price" value="$18.40" icon={Coins} tone="amber" />
        <Tile label="Asks" value="14" icon={MessageSquareText} tone="violet" />
        <Tile label="Review" value="~48m" hint="estimated" icon={Timer} tone="cyan" className="col-span-2 sm:col-span-1" />
      </div>
      <ul className="mt-3">
        {rows.map((r) => (
          <li key={r.task} className="flex items-center justify-between gap-3 py-3 text-sm">
            <span className="min-w-0">{r.task}</span>
            <span className="flex shrink-0 gap-1.5 text-[11px]">
              <span className={r.landed ? "status status-good" : "status status-warn"}>{r.landed ? "Committed" : "Not yet"}</span>
              {r.tests && <span className="status status-info hidden sm:inline-flex">Tests ran</span>}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function Desk() {
  const blocks = [
    { name: "Standup", left: 6, width: 8, focus: false },
    { name: "Focus", left: 16, width: 28, focus: true },
    { name: "Design review", left: 50, width: 14, focus: false },
    { name: "Focus", left: 68, width: 24, focus: true },
  ];
  const desk = [
    { text: "Ship the review draft", color: "bg-[hsl(38_98%_62%)]" },
    { text: "Reply on the open thread", color: "bg-[hsl(336_95%_70%)]" },
    { text: "Pick the quiet project back up", color: "bg-[hsl(254_100%_77%)]" },
  ];
  return (
    <Frame title="Tuesday" icon={<BrandMark name="Google Calendar" />}>
      <div className="relative h-11 overflow-hidden rounded-xl bg-white/[0.04]">
        {blocks.map((b) => (
          <div key={b.left} title={b.name} className={b.focus ? "grad-tone absolute inset-y-1 rounded-lg" : "absolute inset-y-1 rounded-lg bg-[hsl(336_95%_70%/0.72)]"} style={{ left: `${b.left}%`, width: `${b.width}%` }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground"><span>9 AM</span><span>1 PM</span><span>6 PM</span></div>
      <p className="mb-2 mt-6 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"><CalendarDays className="text-tone h-3 w-3" aria-hidden />Your Desk</p>
      <ul className="space-y-2">
        {desk.map((d) => (
          <li key={d.text} className="tile flex items-center gap-3 py-3 text-sm">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${d.color}`} />
            {d.text}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function Insights() {
  const items = [
    ["GitHub", "Review the PR waiting since Monday"],
    ["Jira", "Update the ticket blocked on design"],
    ["Slack", "Answer the deploy question in #eng"],
    ["Google", "Send the notes from Thursday's doc"],
  ] as const;
  return (
    <Frame title="Next actions" icon={<span className="grad-tone h-2.5 w-2.5 rounded-full" />}>
      <ul className="space-y-2">
        {items.map(([tool, action]) => (
          <li key={tool} className="tile flex items-center gap-3.5 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.08]">
              <BrandMark name={tool} className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] text-muted-foreground">{tool}</span>
              <span className="block text-sm">{action}</span>
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function Health() {
  const nights = [62, 74, 58, 80, 71, 49, 77, 83, 66, 72, 55, 79, 86, 68];
  return (
    <Frame title="Last 14 nights" icon={<Moon className="text-tone h-4 w-4" aria-hidden />} tag="Preview">
      <div className="flex h-36 items-end gap-1.5" aria-hidden>
        {nights.map((h, i) => (
          <div key={i} className="grad-tone-v flex-1 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Tile label="Sleep" value="7h 23m" icon={Moon} tone="violet" className="col-span-2 sm:col-span-1" />
        <Tile label="HRV" value="62 ms" icon={Activity} tone="pink" />
        <Tile label="Steps" value="8.4k" icon={Footprints} tone="green" />
      </div>
    </Frame>
  );
}

const VISUALS: Record<Chapter["id"], () => JSX.Element> = {
  focus: Focus,
  agents: Agents,
  desk: Desk,
  insights: Insights,
  health: Health,
};

export function ChapterVisual({ id }: { id: Chapter["id"] }) {
  const V = VISUALS[id];
  return <V />;
}
