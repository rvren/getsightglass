import { useState } from "react";
import {
  Activity,
  AppWindow,
  ArrowRight,
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
  Plug,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";
import { FaApple } from "react-icons/fa";
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
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { RELEASES_URL, useLatestMacDownloads, useMacArch } from "@/lib/downloads";
import {
  counts,
  metrics,
  premise,
  privacy,
  product,
  screens,
  skins,
} from "@/data/sightglass";

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

export default function Sightglass() {
  return (
    <div className="theme-sightglass min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogoStrip />
      <Premise />
      <MetricsSection />
      <ProductTour />
      <PrivacySection />
      <StatsBand />
      <ThemesSection />
      <DownloadSection />
      <Footer />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── Nav ── */
function Nav() {
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
        <a
          href="#download"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <FaApple className="h-4 w-4" />
          Download
        </a>
      </div>
    </header>
  );
}

/* ───────────────────────────────────────────────────────────── Hero ── */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              Local-first attention analytics · macOS
              <ArrowRight className="h-3 w-3" />
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              See where your{" "}
              <span className="text-gradient">attention</span> actually goes.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {product.summary}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#download"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
              >
                <FaApple className="h-4 w-4" />
                Download for macOS
              </a>
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
              Free · No account · Nothing leaves your Mac · {product.platform}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25} y={28}>
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="pointer-events-none absolute -inset-x-10 -top-8 bottom-0 gradient-mesh blur-2xl" />
            <TodayMockup className="relative" />
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
    <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
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

/* ────────────────────────────────────────────────────────── Metrics ── */
const METRIC_ICONS = [Gauge, Activity, Briefcase, TrendingUp];
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

/* ────────────────────────────────────────────────────── Product tour ── */
function ProductTour() {
  const highlights = [
    { screen: screens[1], mockup: <FocusMockup /> }, // Focus
    { screen: screens[7], mockup: <AtlasMockup /> }, // Atlas
  ];
  return (
    <div id="product" className="border-y border-border/70 bg-secondary/20">
      <SectionShell
        eyebrow="The product"
        title="Ten screens. One file you own."
        lead="Every view is worked out on your Mac from your own history — from the morning briefing to a per-domain deep dive."
      >
        <div className="space-y-20">
          {highlights.map(({ screen, mockup }, i) => (
            <Reveal key={screen.name}>
              <div
                className={cn(
                  "grid items-center gap-10 lg:grid-cols-2",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2",
                )}
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    {screen.name}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {screen.blurb}
                  </h3>
                  <p className="mt-4 text-muted-foreground">{screen.detail}</p>
                </div>
                {mockup}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {screens.map((s, i) => {
            const Icon = SCREEN_ICONS[i] ?? LayoutDashboard;
            return (
              <Reveal key={s.name} delay={(i % 3) * 0.05}>
                <div className="card-hover h-full rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h4 className="font-display font-semibold">{s.name}</h4>
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground/90">
                    {s.blurb}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionShell>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── Privacy ── */
function PrivacySection() {
  return (
    <SectionShell
      id="privacy"
      eyebrow="Local-first, and it means it"
      title="Your data never leaves your Mac — unless you send it."
      lead="No account. No sign-up. No tracking. Your history stays on your Mac, and every number is worked out right there."
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
                Only leaves when you say so
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

/* ──────────────────────────────────────────────────────── Stats band ── */
function StatsBand() {
  const stats = [
    { n: String(counts.screens), l: "Product screens" },
    { n: String(counts.features), l: "Catalogued features" },
    { n: String(counts.browsers), l: "Browsers read" },
    { n: String(counts.skins), l: "Considered themes" },
    { n: "0", l: "Accounts · trackers" },
  ];
  return (
    <section className="border-y border-border/70 bg-secondary/20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-14 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-4xl font-semibold tracking-tight text-gradient">
              {s.n}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">
              {s.l}
            </div>
          </div>
        ))}
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
      title="Seven considered themes — not a hundred half-baked ones."
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
  const { armLink, intelLink, version } = useLatestMacDownloads();
  const arch = useMacArch();
  const primary =
    arch === "x64" ? intelLink ?? RELEASES_URL : armLink ?? RELEASES_URL;
  const primaryLabel =
    arch === "x64"
      ? "Download for Intel"
      : arch === "arm64"
        ? "Download for Apple Silicon"
        : "Download for macOS";
  const [copied, setCopied] = useState(false);

  return (
    <section id="download" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
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
            {product.platform}. Free, and yours{version ? ` — ${version}` : ""}.
            Everything runs on your machine.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={primary}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
            >
              <FaApple className="h-4 w-4" />
              {primaryLabel}
            </a>
            {arch && (
              <a
                href={
                  arch === "x64"
                    ? armLink ?? RELEASES_URL
                    : intelLink ?? RELEASES_URL
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-7 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
              >
                {arch === "x64" ? "Apple Silicon build" : "Intel build"}
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-card/70 p-5 text-left backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lock className="h-4 w-4 text-accent" />
              First launch on Apple Silicon?
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              The build is free and un-notarized, so macOS quarantines it. Drag
              Sightglass to Applications, then clear the flag once:
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-background/70 px-3 py-2">
              <code className="overflow-x-auto font-mono text-xs">
                xattr -cr /Applications/Sightglass.app
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard
                    ?.writeText("xattr -cr /Applications/Sightglass.app")
                    .then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    });
                }}
                className="shrink-0 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
          <span className="text-sm text-muted-foreground">
            · {product.tagline}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#product" className="transition-colors hover:text-foreground">
            Product
          </a>
          <a href="#privacy" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Releases
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
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {lead}
            </p>
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
        <span className="ml-3 font-mono text-[11px] text-muted-foreground">
          {title}
        </span>
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
      <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
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
        <div className="font-display text-3xl font-semibold leading-none">
          {value}
        </div>
        <div className="mt-1 text-[11px] font-medium text-accent">Grade A−</div>
      </div>
    </div>
  );
}

function TodayMockup({ className }: { className?: string }) {
  const tiles = [
    { k: "Deep work", v: "2h 41m" },
    { k: "Focus sessions", v: "5" },
    { k: "Pulse", v: "Flow" },
    { k: "Distractions", v: "12" },
  ];
  return (
    <WindowChrome title="Sightglass — Today" className={className}>
      <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-secondary/30 p-5">
          <ScoreRing value={82} />
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" /> +6 vs your average
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {tiles.map((t) => (
            <div
              key={t.k}
              className="rounded-xl border border-border bg-secondary/20 p-4"
            >
              <div className="text-xs text-muted-foreground">{t.k}</div>
              <div className="mt-1 font-display text-xl font-semibold">{t.v}</div>
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

function FocusMockup() {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <WindowChrome title="Sightglass — Focus">
      <div className="flex flex-col items-center gap-5 p-8">
        <div className="relative grid place-items-center">
          <svg viewBox="0 0 130 130" className="h-40 w-40 -rotate-90">
            <circle cx="65" cy="65" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
            <circle
              cx="65"
              cy="65"
              r={r}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * 0.32}
            />
          </svg>
          <div className="absolute text-center">
            <div className="font-display text-4xl font-semibold tabular-nums">
              17:04
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Deep work
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Session tagged · authentication refactor
        </div>
      </div>
    </WindowChrome>
  );
}

function AtlasMockup() {
  const cells = [
    { l: "github.com", s: "col-span-3 row-span-2", c: "bg-accent/80" },
    { l: "Editor", s: "col-span-2 row-span-2", c: "bg-accent/55" },
    { l: "Docs", s: "col-span-2", c: "bg-accent/35" },
    { l: "Slack", s: "col-span-1", c: "bg-accent/25" },
    { l: "Mail", s: "col-span-2", c: "bg-border" },
    { l: "News", s: "col-span-1", c: "bg-border" },
  ];
  return (
    <WindowChrome title="Sightglass — Atlas">
      <div className="p-5">
        <div className="grid auto-rows-[46px] grid-cols-5 gap-1.5">
          {cells.map((cell) => (
            <div
              key={cell.l}
              className={cn(
                "flex items-end rounded-lg p-2 text-[10px] font-medium text-foreground/70",
                cell.s,
                cell.c,
              )}
            >
              {cell.l}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Area is time. Step through and the map lights the territory.
        </p>
      </div>
    </WindowChrome>
  );
}
