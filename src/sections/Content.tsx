import {
  AudioLines,
  Bot,
  CalendarClock,
  CalendarDays,
  Check,
  Coins,
  FlaskConical,
  Gauge,
  GitCommitHorizontal,
  HeartPulse,
  KeyRound,
  ListChecks,
  Lock,
  Moon,
  PictureInPicture2,
  Plug,
  Radio,
  ScrollText,
  ShieldCheck,
  Smile,
  Sparkles,
  Sunrise,
  Timer,
  ToggleRight,
  TrendingUp,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { chapters, privacy, product, sources, today, type Chapter, type Tone } from "@/data/sightglass";
import { useDownload } from "@/lib/downloadFlow";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand";
import { DownloadButton, Glass, Heading, IconBadge, Kicker, Reveal, SampleTag, Tile } from "./parts";
import { ChapterVisual } from "./Visuals";

const CHAPTER_ICONS: Record<Chapter["id"], { badge: LucideIcon; points: LucideIcon[] }> = {
  focus: { badge: Timer, points: [Timer, PictureInPicture2, AudioLines] },
  agents: { badge: Bot, points: [Coins, GitCommitHorizontal, FlaskConical] },
  desk: { badge: CalendarClock, points: [CalendarDays, ListChecks, Sunrise] },
  insights: { badge: Sparkles, points: [Plug, KeyRound, ScrollText] },
  health: { badge: HeartPulse, points: [Watch, TrendingUp, Lock] },
};

export function Sources() {
  return (
    <section aria-label="Works with" className="py-12">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Reads the tools you already use</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {sources.map((s) => (
            <li key={s} className="source-chip">
              <BrandMark name={s} />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Today() {
  return (
    <section id="today" className="section tone-violet relative overflow-hidden">
      <div className="chapter-glow chapter-glow-c" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <Kicker>{today.kicker}</Kicker>
          <Heading lines={today.title} className="mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{today.body}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <Glass className="p-5 text-left sm:p-6">
            <div className="mb-4 flex justify-between"><span className="font-display text-sm">Tuesday</span><SampleTag /></div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Tile label="Score" value="82" hint="+6 vs your average" icon={Gauge} tone="violet" />
              <Tile label="Mood" value="Steady" hint="your check-ins" icon={Smile} tone="pink" />
              <Tile label="Last night" value="7h 24m" hint="estimated" icon={Moon} tone="cyan" />
              <Tile label="Next meeting" value="2:30 PM" hint="1h clear before it" icon={CalendarClock} tone="amber" />
            </div>
          </Glass>
        </Reveal>
        <p className="mt-5 text-sm text-muted-foreground">{today.note}</p>
      </div>
    </section>
  );
}

export function Chapters() {
  return (
    <>
      {chapters.map((c, i) => {
        const icons = CHAPTER_ICONS[c.id];
        return (
          <section key={c.id} id={c.id} className={cn("section relative overflow-hidden", `tone-${c.tone}`)}>
            <div className={cn("chapter-glow", i % 2 === 1 && "chapter-glow-l")} aria-hidden />
            <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <IconBadge icon={icons.badge} className="mb-6" />
                <div className="flex flex-wrap items-center gap-3">
                  <Kicker n={c.n}>{c.kicker}</Kicker>
                  {c.soon && <span className="soon-pill">Coming soon</span>}
                </div>
                <Heading lines={c.title} className="mt-5" />
                <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">{c.body}</p>
                <ul className="mt-7 space-y-3.5">
                  {c.points.map((p, j) => {
                    const Icon = icons.points[j] ?? Check;
                    return (
                      <li key={p} className="flex items-center gap-3 text-sm text-foreground/85">
                        <span className="point-icon"><Icon className="h-3.5 w-3.5" aria-hidden /></span>
                        {p}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className={cn("min-w-0", i % 2 === 1 && "lg:order-1")}>
                <ChapterVisual id={c.id} />
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}

function PrivacyCard({ title, icon, tone, children }: { title: string; icon: LucideIcon; tone: Tone; children: React.ReactNode }) {
  return (
    <Glass className={cn("p-6", `tone-${tone}`)}>
      <IconBadge icon={icon} className="mb-4" />
      <h3 className="font-display text-base">{title}</h3>
      {children}
    </Glass>
  );
}

function FlowList({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <dl className="mt-4 space-y-4">
      {items.map((i) => (
        <div key={i.title}>
          <dt className="text-sm font-medium">{i.title}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.body}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Privacy() {
  return (
    <section id="privacy" className="section tone-green">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Kicker>{privacy.kicker}</Kicker>
          <Heading lines={privacy.title} className="mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{privacy.body}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-12 grid gap-4 lg:grid-cols-3">
          <PrivacyCard title="Stays on your Mac" icon={ShieldCheck} tone="green">
            <ul className="mt-4 space-y-3">
              {privacy.stays.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-foreground/85"><Check className="text-tone mt-0.5 h-4 w-4 shrink-0" aria-hidden />{s}</li>
              ))}
            </ul>
          </PrivacyCard>
          <PrivacyCard title="Sent by default" icon={Radio} tone="amber"><FlowList items={privacy.byDefault} /></PrivacyCard>
          <PrivacyCard title="Only if you turn it on" icon={ToggleRight} tone="cyan"><FlowList items={privacy.ifYouChoose} /></PrivacyCard>
        </Reveal>
      </div>
    </section>
  );
}

export function Download() {
  const { armLink, intelLink, arch } = useDownload();
  const secondary = arch === "x64" ? armLink : intelLink;
  return (
    <section id="download" className="relative overflow-hidden py-28 text-center sm:py-40">
      <div className="closing-glow" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5">
        <Reveal>
          <h2 className="heading-xl">See your whole day.</h2>
          <p className="mt-5 text-foreground/75">{product.platform}. Free, with no account.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <DownloadButton />
            {secondary && <a href={secondary} className="btn-ghost">{arch === "x64" ? "Apple Silicon build" : "Intel build"}</a>}
          </div>
          <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-foreground/70">
            This build is not notarized yet, so the first launch takes one extra step. We walk you through it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/sightglass-icon.svg" alt="" className="h-6 w-6 rounded-md" />
          <span className="font-display text-foreground">Sightglass</span>
        </div>
        <p className="text-xs">{privacy.site}</p>
        <span className="font-mono text-xs">© 2026 Sightglass</span>
      </div>
    </footer>
  );
}
