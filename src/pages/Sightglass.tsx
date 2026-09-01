import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  Activity,
  AppWindow,
  ArrowDown,
  ArrowRight,
  BedDouble,
  Briefcase,
  CalendarClock,
  Check,
  SlidersHorizontal,
  Gauge,
  HardDrive,
  HeartPulse,
  LayoutDashboard,
  Lock,
  Map as MapIcon,
  MousePointer2,
  Plug,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Wind,
  X,
} from "lucide-react";
import { FaApple, FaSlack } from "react-icons/fa";
import {
  SiArc,
  SiBrave,
  SiClaude,
  SiFirefoxbrowser,
  SiGithub,
  SiGooglecalendar,
  SiGooglechrome,
  SiJira,
  SiSafari,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { useLatestMacDownloads, useMacArch } from "@/lib/downloads";
import {
  installSteps,
  metrics,
  premise,
  privacy,
  product,
  screens,
  skins,
  XATTR_CMD,
} from "@/data/sightglass";

/* ══════════════════════════════════════════════ direct-download flow ══ */
/**
 * ONE download flow for every CTA on the page: clicking any Download button
 * starts the correct .dmg immediately (no scroll-to-the-bottom, no second
 * click) and opens the install-steps overlay so the user knows exactly what
 * to do while the file arrives. If the release lookup hasn't resolved yet
 * (offline, rate limit), the overlay still opens and its "try again" retries
 * once the link is available — the user is never sent off-site.
 */
interface DownloadFlow {
  start: () => void;
  primaryLabel: string;
  armLink?: string;
  intelLink?: string;
  arch: "arm64" | "x64" | null;
}
const DownloadCtx = createContext<DownloadFlow>({
  start: () => {},
  primaryLabel: "Download for macOS",
  arch: null,
});
const useDownload = (): DownloadFlow => useContext(DownloadCtx);

function triggerFileDownload(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function Sightglass() {
  const { armLink, intelLink } = useLatestMacDownloads();
  const arch = useMacArch();
  const [overlayOpen, setOverlayOpen] = useState(false);

  const primary = arch === "x64" ? intelLink : armLink ?? intelLink;
  const primaryLabel =
    arch === "x64"
      ? "Download for Intel"
      : arch === "arm64"
        ? "Download for Apple Silicon"
        : "Download for macOS";

  const start = useCallback((): void => {
    if (primary) triggerFileDownload(primary);
    setOverlayOpen(true);
  }, [primary]);

  const flow: DownloadFlow = { start, primaryLabel, armLink, intelLink, arch };

  return (
    <DownloadCtx.Provider value={flow}>
      <div className="theme-sightglass min-h-screen bg-background text-foreground">
        <Nav />
        <Hero />
        <LogoStrip />
        <Premise />
        <BentoTour />
        <MetricsSection />
        <PrivacySection />
        <VoiceBand />
        <ThemesSection />
        <DownloadSection />
        <Footer />
        <InstallOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} onRetry={start} />
      </div>
    </DownloadCtx.Provider>
  );
}

/* ────────────────────────────────────────────────────────────── Nav ── */
function Nav() {
  const { start } = useDownload();
  const links = [
    { label: "Product", href: "#product" },
    { label: "Signals", href: "#signals" },
    { label: "Privacy", href: "#privacy" },
    { label: "Themes", href: "#themes" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/sightglass-icon.svg" alt="" className="h-7 w-7 rounded-lg" />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            Sightglass
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <FaApple className="h-4 w-4" />
          Download
        </button>
      </div>
    </header>
  );
}

/* ───────────────────────────────────────────────────────────── Hero ── */
function Hero() {
  const { start } = useDownload();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              Local-first attention analytics · macOS
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              See where your <span className="text-gradient">attention</span>{" "}
              actually goes.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {product.summary}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={start}
                className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
              >
                <FaApple className="h-4 w-4" />
                Download for macOS
                <ArrowDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-y-0.5" />
              </button>
              <a
                href="#product"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
              >
                See the product
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              Free · No account · {product.platform}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            {/* The whole install, promised up front — the download starts on
                the click above; no hunting for a second button. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-muted-foreground">
              {installSteps.map((s, i) => (
                <span key={s.title} className="inline-flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-border font-mono text-[10px]">
                    {i + 1}
                  </span>
                  {s.title}
                  {i < installSteps.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                  )}
                </span>
              ))}
              <span className="text-muted-foreground/60">· about a minute</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={28}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-10 -top-8 bottom-0 gradient-mesh blur-2xl" />
            <TodayMockup className="relative" />
            <div className="absolute -bottom-8 -left-6 hidden w-52 rotate-[-3deg] sm:block">
              <NightsMiniCard />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── Logo strip ── */
function LogoStrip() {
  const logos: { Icon: IconType; label: string }[] = [
    { Icon: SiGithub, label: "GitHub" },
    { Icon: SiJira, label: "Jira" },
    { Icon: FaSlack, label: "Slack" },
    { Icon: SiGooglecalendar, label: "Google Calendar" },
    { Icon: SiClaude, label: "Claude" },
    { Icon: SiGooglechrome, label: "Chrome" },
    { Icon: SiSafari, label: "Safari" },
    { Icon: SiFirefoxbrowser, label: "Firefox" },
    { Icon: SiArc, label: "Arc" },
    { Icon: SiBrave, label: "Brave" },
  ];
  return (
    <section className="border-y border-border/70 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Reads the tools you already use — locally
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-foreground/45 transition-colors hover:text-foreground"
              title={label}
            >
              <Icon className="h-6 w-6" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── Premise ── */
function Premise() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The problem
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">
          Time-tracking apps know what you opened. Focus apps know when you sat
          down. <span className="text-gradient">Neither knows both.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {premise[1]}
        </p>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────── Bento product tour ── */
/**
 * The product, as a bento: two showcase tiles with live-looking mini-UI,
 * then the rest of the ten screens as compact cells. Replaces the old
 * uniform card wall — same facts, one glance.
 */
function BentoTour() {
  const SCREEN_ICONS = [
    LayoutDashboard,
    Timer,
    CalendarClock,
    HeartPulse,
    Plug,
    AppWindow,
    Briefcase,
    MapIcon,
    TrendingUp,
    SlidersHorizontal,
  ];
  const small = [2, 4, 6, 8, 9].map((i) => ({ s: screens[i], Icon: SCREEN_ICONS[i] }));
  return (
    <div id="product" className="border-y border-border/70 bg-secondary/20">
      <SectionShell
        eyebrow="The product"
        title="Ten screens. One file you own."
        lead="Every view is worked out on your Mac from your own history — from the morning briefing to last night's sleep."
      >
        <div className="grid gap-4 lg:grid-cols-6">
          {/* Showcase: Today */}
          <Reveal className="lg:col-span-4">
            <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 sm:p-8">
              <TileHeading icon={LayoutDashboard} name="Today" blurb={screens[0].blurb} />
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {screens[0].detail}
              </p>
              <div className="mt-6">
                <TodayMockup compact />
              </div>
            </div>
          </Reveal>

          {/* Showcase: Focus */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <div className="card-hover flex h-full flex-col rounded-3xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
              <TileHeading icon={Timer} name="Focus" blurb={screens[1].blurb} />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {screens[1].detail}
              </p>
              <div className="mt-auto pt-6">
                <FocusRingMini />
              </div>
            </div>
          </Reveal>

          {/* Showcase: Wellbeing / sleep */}
          <Reveal delay={0.05} className="lg:col-span-3">
            <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
              <TileHeading icon={BedDouble} name="Wellbeing" blurb={screens[3].blurb} />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {screens[3].detail}
              </p>
              <div className="mt-6">
                <NightsBars />
              </div>
            </div>
          </Reveal>

          {/* Showcase: Work / the Desk */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
              <TileHeading icon={Briefcase} name="Work" blurb={screens[6].blurb} />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {screens[6].detail}
              </p>
              <div className="mt-6">
                <DeskMini />
              </div>
            </div>
          </Reveal>

          {/* The remaining screens, compact */}
          {small.map(({ s, Icon }, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.05} className="lg:col-span-2">
              <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-lg">
                <TileHeading icon={Icon} name={s.name} blurb={s.blurb} />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}

          {/* Atlas gets its little map */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="card-hover h-full rounded-3xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-lg">
              <TileHeading icon={MapIcon} name="Atlas" blurb={screens[7].blurb} />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {screens[7].detail}
              </p>
              <div className="mt-5">
                <AtlasMini />
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </div>
  );
}

function TileHeading({
  icon: Icon,
  name,
  blurb,
}: {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  blurb: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
          {name}
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{blurb}</h3>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── Metrics ── */
const METRIC_ICONS = [Gauge, BedDouble, Activity, Briefcase];
function MetricsSection() {
  return (
    <SectionShell
      id="signals"
      eyebrow="The signals"
      title="Numbers that mean something — and admit what they don't."
      lead="Four measures do the heavy lifting. Each is paired with the claim it deliberately refuses to make."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {metrics.map((m, i) => {
          const Icon = METRIC_ICONS[i] ?? Sparkles;
          return (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-7 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {m.what}
                </p>
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-border bg-secondary/40 p-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      What it won't claim ·{" "}
                    </span>
                    {m.honesty}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* ────────────────────────────────────────────────────────── Privacy ── */
function PrivacySection() {
  return (
    <SectionShell
      id="privacy"
      eyebrow="Local-first, and it means it"
      title="Your history never leaves your Mac."
      lead="No account. No sign-up. Your data stays on your machine, and every number is worked out right there. What does leave is short enough to list in full:"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center gap-2.5">
              <HardDrive className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-semibold">
                Stays on your device
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {privacy.local.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center gap-2.5">
              <Plug className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-semibold">
                The complete outbound list
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {privacy.outbound.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.12}>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {privacy.note}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}

/* ─────────────────────────────────────────────────────── Voice band ── */
/**
 * The product's voice, shown rather than described: the kind of line it
 * writes about a day. Illustrative examples in the app's own register —
 * specific, kind, and always ending in something you can do.
 */
function VoiceBand() {
  const lines = [
    {
      icon: TrendingUp,
      text: "Your focus peaks between 9 and 11 — today's calendar leaves that window open. Protect it?",
    },
    {
      icon: BedDouble,
      text: "After nights over 7h you log about 40 minutes more focus the next day.",
    },
    {
      icon: Wind,
      text: "You've hit your evening limit. One slow breath first — it'll still be there.",
    },
    {
      icon: Check,
      text: "Desk cleared. That's a won day — anything else you finish now is a bonus lap.",
    },
  ];
  return (
    <section className="border-y border-border/70 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The voice
          </p>
          <h2 className="mx-auto mt-4 max-w-xl text-center font-display text-3xl font-semibold leading-tight tracking-tight">
            A coach, not a scold.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            The kind of thing it says — specific to your day, kind about it, and
            always ending in something you can do.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {lines.map((l, i) => (
            <Reveal key={l.text} delay={(i % 2) * 0.06}>
              <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <l.icon className="h-[18px] w-[18px]" />
                </span>
                <p className="text-sm leading-relaxed text-foreground/85">“{l.text}”</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── Themes ── */
function ThemesSection() {
  return (
    <SectionShell
      id="themes"
      eyebrow="Craft"
      title="Eight considered themes — not a hundred half-baked ones."
      lead="Each is tuned end to end, light and dark, so the numbers stay legible whichever you pick."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skins.map((s, i) => (
          <Reveal key={s.name} delay={(i % 4) * 0.05}>
            <div className="card-hover overflow-hidden rounded-2xl border border-border bg-card hover:shadow-lg">
              <div className="flex h-24" aria-hidden>
                {s.colors.map((c, j) => (
                  <div key={j} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="p-4">
                <div className="font-display text-sm font-semibold">{s.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.tag}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ───────────────────────────────────────────────────────── Download ── */
function DownloadSection() {
  const { start, primaryLabel, armLink, intelLink, arch } = useDownload();
  const secondary = arch === "x64" ? armLink : intelLink;

  return (
    <section id="download" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
        <Reveal>
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-accent/25">
            <FaApple className="h-7 w-7" />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Start seeing your day clearly.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {product.platform}. Free, and yours. One click starts the download and
            walks you through the install.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={start}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
            >
              <FaApple className="h-4 w-4" />
              {primaryLabel}
            </button>
            {secondary && (
              <a
                href={secondary}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-7 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
              >
                {arch === "x64" ? "Apple Silicon build" : "Intel build"}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────── install overlay (post-download) ── */
function StepArt({ step }: { step: number }) {
  // Simple, honest illustrations in the page's own visual language.
  if (step === 0) {
    return (
      <div className="relative flex h-32 items-center justify-center rounded-xl bg-secondary/50">
        <div className="flex flex-col items-center gap-1.5">
          <div className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-card shadow-sm">
            <HardDrive className="h-7 w-7 text-accent" />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            Sightglass.dmg
          </span>
        </div>
        <MousePointer2 className="absolute bottom-5 right-10 h-5 w-5 text-foreground" />
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="relative flex h-32 items-center justify-center gap-6 rounded-xl bg-secondary/50">
        <img src="/sightglass-icon.svg" alt="" className="h-12 w-12 rounded-xl shadow-sm" />
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
        <div className="grid h-14 w-14 place-items-center rounded-xl border-2 border-dashed border-accent/50 bg-card">
          <span className="font-mono text-[10px] text-muted-foreground">Apps</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl bg-secondary/50 px-4">
      <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
        <img src="/sightglass-icon.svg" alt="" className="h-5 w-5 rounded" />
        <span className="text-xs font-medium">Sightglass</span>
        <Lock className="ml-auto h-3.5 w-3.5 text-accent" />
      </div>
      <span className="text-[10px] text-muted-foreground">one command, once</span>
    </div>
  );
}

function InstallOverlay({ open, onClose, onRetry }: { open: boolean; onClose: () => void; onRetry: () => void }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-background/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Install Sightglass"
        >
          <div className="mx-auto flex min-h-full max-w-4xl flex-col px-6 py-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="/sightglass-icon.svg" alt="" className="h-7 w-7 rounded-lg" />
                <span className="font-display text-[15px] font-semibold">Sightglass</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="my-auto py-10 text-center"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Your download has started
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                Thank you for
                <br />
                downloading Sightglass
              </h2>

              <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
                {installSteps.map((s, i) => (
                  <div key={s.title}>
                    <div className="mb-4 flex justify-center">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 font-mono text-sm font-semibold text-accent">
                        {i + 1}
                      </span>
                    </div>
                    <StepArt step={i} />
                    <h3 className="mt-4 text-center font-display text-sm font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-center text-xs leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Step 3's command, right here — no digging. */}
              <div className="mx-auto mt-10 flex max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
                <code className="overflow-x-auto whitespace-nowrap font-mono text-xs">
                  {XATTR_CMD}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(XATTR_CMD).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    });
                  }}
                  className="shrink-0 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
                Paste it into Terminal after dragging the app across — it clears the
                quarantine flag macOS puts on free, un-notarized apps. Once. Then
                Sightglass opens like anything else, fully offline.
              </p>

              <div className="mt-10 flex items-center justify-center gap-5 text-sm">
                <span className="text-muted-foreground">
                  Having trouble?{" "}
                  <button
                    type="button"
                    onClick={onRetry}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Try the download again
                  </button>
                </span>
                <span className="text-muted-foreground/40">·</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Back to the site
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/sightglass-icon.svg" alt="" className="h-6 w-6 rounded-md" />
          <span className="font-display text-sm font-semibold">Sightglass</span>
          <span className="text-sm text-muted-foreground">· {product.tagline}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#product" className="transition-colors hover:text-foreground">
            Product
          </a>
          <a href="#privacy" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <span className="font-mono text-xs">© 2026 Sightglass</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════ shared + mockups ══ */
function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          {lead && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>
          )}
        </div>
      </Reveal>
      <div className="mt-14">{children}</div>
    </section>
  );
}

function WindowChrome({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-accent/10",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-muted-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function ScoreRing({ value = 82 }: { value?: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-2xl font-semibold leading-none">{value}</div>
        <div className="mt-1 text-[10px] font-medium text-accent">Grade A−</div>
      </div>
    </div>
  );
}

function TodayMockup({ className, compact = false }: { className?: string; compact?: boolean }) {
  const tiles = [
    { k: "Deep work", v: "2h 41m" },
    { k: "Last night", v: "7h 24m" },
    { k: "Pulse", v: "Flow" },
    { k: "Mood", v: "Steady" },
  ];
  return (
    <WindowChrome title="Sightglass — Today" className={className}>
      <div className={cn("grid gap-4 p-5", !compact && "sm:grid-cols-[auto_1fr]")}>
        {!compact && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-secondary/30 p-5">
            <ScoreRing value={82} />
            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> +6 vs your average
            </div>
          </div>
        )}
        <div className={cn("grid gap-3", compact ? "grid-cols-4" : "grid-cols-2")}>
          {tiles.map((t) => (
            <div key={t.k} className="rounded-xl border border-border bg-secondary/20 p-4">
              <div className="text-xs text-muted-foreground">{t.k}</div>
              <div className="mt-1 font-display text-lg font-semibold sm:text-xl">{t.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border p-5 pt-4">
        <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Today's timeline</span>
          <span className="font-mono">9a — 6p</span>
        </div>
        <div className="flex h-8 items-stretch gap-1 overflow-hidden rounded-lg">
          {(
            [
              ["w-[14%]", "bg-accent/70"],
              ["w-[8%]", "bg-border"],
              ["w-[22%]", "bg-accent"],
              ["w-[6%]", "bg-border"],
              ["w-[10%]", "bg-accent/50"],
              ["w-[18%]", "bg-accent/80"],
              ["w-[7%]", "bg-border"],
              ["w-[15%]", "bg-accent/60"],
            ] as const
          ).map(([w, col], i) => (
            <div key={i} className={cn("rounded", w, col)} />
          ))}
        </div>
      </div>
    </WindowChrome>
  );
}

/** The little "last night" card that floats over the hero mock. */
function NightsMiniCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-accent/10">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <BedDouble className="h-3 w-3 text-accent" /> Last night
      </div>
      <div className="mt-1.5 font-display text-xl font-semibold">7h 24m</div>
      <div className="mt-2 flex h-8 items-end gap-1">
        {[62, 78, 55, 84, 70, 88, 74].map((h, i) => (
          <div
            key={i}
            className={cn("flex-1 rounded-full", i === 6 ? "bg-accent" : "bg-accent/35")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function FocusRingMini() {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center justify-center gap-5 rounded-xl border border-border bg-secondary/30 p-4">
      <div className="relative grid place-items-center">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * 0.32}
          />
        </svg>
        <div className="absolute text-center">
          <div className="font-display text-xl font-semibold tabular-nums">17:04</div>
        </div>
      </div>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Wind className="h-3.5 w-3.5 text-accent" /> breathing between rounds
        </div>
        <div className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5 text-accent" /> floating mini timer
        </div>
      </div>
    </div>
  );
}

/** Seven nights on a shared evening→noon axis — the Wellbeing showcase. */
function NightsBars() {
  const nights = [
    { top: 18, h: 58 },
    { top: 26, h: 55 },
    { top: 14, h: 66 },
    { top: 30, h: 48 },
    { top: 20, h: 62 },
    { top: 12, h: 70 },
    { top: 22, h: 60 },
  ];
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <div className="relative h-28">
        <div className="absolute inset-x-0 top-[38%] border-t border-dashed border-border" />
        <span className="absolute right-0 top-[32%] font-mono text-[9px] uppercase text-muted-foreground/60">
          12am
        </span>
        <div className="absolute inset-0 flex items-stretch gap-2">
          {nights.map((n, i) => (
            <div key={i} className="relative min-w-0 flex-1">
              <div
                className={cn(
                  "absolute inset-x-0 mx-auto w-2 rounded-full",
                  i === nights.length - 1 ? "bg-accent" : "bg-accent/40",
                )}
                style={{ top: `${n.top}%`, height: `${n.h}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Each bar is a night — read from when your devices went quiet.
      </p>
    </div>
  );
}

/** The Desk — three ranked items with one-tap acts. */
function DeskMini() {
  const items = [
    { t: "Ship the review draft", s: "promised last night" },
    { t: "Reply on the open thread", s: "your tools" },
    { t: "Pick the quiet project back up", s: "going cold, 9 days" },
  ];
  return (
    <div className="space-y-1.5 rounded-xl border border-border bg-secondary/30 p-3">
      {items.map((it, i) => (
        <div
          key={it.t}
          className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2"
        >
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              i === 0 ? "bg-accent" : "bg-muted-foreground/40",
            )}
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium">{it.t}</div>
            <div className="truncate text-[10px] text-muted-foreground">{it.s}</div>
          </div>
          <Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
        </div>
      ))}
    </div>
  );
}

function AtlasMini() {
  const cells = [
    { l: "github.com", s: "col-span-3 row-span-2", c: "bg-accent/80" },
    { l: "Editor", s: "col-span-2 row-span-2", c: "bg-accent/55" },
    { l: "Docs", s: "col-span-2", c: "bg-accent/35" },
    { l: "Slack", s: "col-span-1", c: "bg-accent/25" },
    { l: "Mail", s: "col-span-2", c: "bg-border" },
    { l: "News", s: "col-span-1", c: "bg-border" },
  ];
  return (
    <div className="grid auto-rows-[34px] grid-cols-5 gap-1.5">
      {cells.map((cell) => (
        <div
          key={cell.l}
          className={cn(
            "flex items-end rounded-lg p-1.5 text-[9px] font-medium text-foreground/70",
            cell.s,
            cell.c,
          )}
        >
          {cell.l}
        </div>
      ))}
    </div>
  );
}
