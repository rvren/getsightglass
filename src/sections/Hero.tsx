import { Bot, CalendarDays, ListChecks, Timer } from "lucide-react";
import { product } from "@/data/sightglass";
import { DownloadButton, SampleTag, Tile } from "./parts";

const ARC = "M0 200 Q800 -160 1600 200";

function Rim({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#ff5fa2" />
        <stop offset="0.3" stopColor="#a78bff" />
        <stop offset="0.5" stopColor="#efeaff" />
        <stop offset="0.7" stopColor="#8b7bff" />
        <stop offset="1" stopColor="#35dcf2" />
      </linearGradient>
    </defs>
  );
}

function Glow({ id, width, className }: { id: string; width: number; className: string }) {
  return (
    <svg className={`planet ${className}`} viewBox="0 0 1600 360" preserveAspectRatio="none" aria-hidden>
      <Rim id={id} />
      <path d={ARC} fill="none" stroke={`url(#${id})`} strokeWidth={width} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** A static, softly blurred rim. Nothing here animates, so it cannot flicker. */
function Planet() {
  return (
    <>
      <Glow id="rim-wide" width={34} className="planet-glow-wide" />
      <Glow id="rim-near" width={9} className="planet-glow-near" />
      <svg className="planet" viewBox="0 0 1600 360" preserveAspectRatio="none" aria-hidden>
        <Rim id="rim" />
        <path d={`${ARC} V360 H0 Z`} fill="hsl(240 14% 3%)" />
        <path d={ARC} fill="none" stroke="url(#rim)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      </svg>
    </>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[min(100svh,1080px)] flex-col overflow-hidden">
      <div className="hero-aura" aria-hidden />
      <div className="relative z-10 flex flex-col items-center px-5 pb-12 pt-32 text-center sm:pt-40">
        <p className="hero-rise hero-eyebrow">
          <span className="hero-dot" />
          Personal intelligence for your Mac
        </p>
        <h1 className="heading-xl text-metal hero-rise mt-6">
          Your whole workday.
          <br />
          One private place.
        </h1>
        <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-foreground/70 hero-rise [animation-delay:80ms] sm:text-lg">
          {product.summary}
        </p>
        <div className="mt-8 hero-rise [animation-delay:160ms]">
          <DownloadButton />
        </div>
        <p className="mt-5 font-mono text-xs text-foreground/60 hero-rise [animation-delay:220ms]">
          Free · No account · macOS 12+
        </p>
      </div>

      <div className="relative z-[2] mt-auto h-[300px] shrink-0 sm:h-[340px]">
        <Planet />
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-[min(860px,calc(100%-2.5rem))]">
          <div className="glass-card !rounded-b-none p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-display text-sm">Today</span>
            <SampleTag>Sample day</SampleTag>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Tile label="Focus" value="2h 41m" icon={Timer} tone="amber" />
            <Tile label="AI agents" value="14 asks" icon={Bot} tone="violet" />
            <Tile label="Meetings" value="3" icon={CalendarDays} tone="cyan" />
            <Tile label="Desk" value="2 left" icon={ListChecks} tone="pink" />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
