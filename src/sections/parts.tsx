import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FaApple } from "react-icons/fa";
import { Reveal } from "@/components/Reveal";
import type { Tone } from "@/data/sightglass";
import { useDownload } from "@/lib/downloadFlow";
import { cn } from "@/lib/utils";

export function DownloadButton({ className }: { className?: string }) {
  const { start, primaryLabel } = useDownload();
  return (
    <button type="button" onClick={start} className={cn("btn-primary", className)}>
      <FaApple className="h-4 w-4" aria-hidden />
      {primaryLabel}
    </button>
  );
}

export function Kicker({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
      {n && <span className="text-tone mr-3">{n}</span>}
      {children}
    </p>
  );
}

export function Heading({ lines, className }: { lines: readonly string[]; className?: string }) {
  return (
    <h2 className={cn("heading-lg", className)}>
      {lines[0]}
      <br />
      <span className="text-grad">{lines[1]}</span>
    </h2>
  );
}

export function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn("icon-badge", className)}>
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}

export function Glass({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass-card", className)}>{children}</div>;
}

export function SampleTag({ children = "Sample data" }: { children?: ReactNode }) {
  return <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/80">{children}</span>;
}

export function Tile({
  label,
  value,
  hint,
  icon: Icon,
  tone,
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("tile min-w-0", tone && `tone-${tone}`, className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
        {Icon && <Icon className="text-tone h-3.5 w-3.5 shrink-0" aria-hidden />}
      </div>
      <p className="mt-3 truncate font-display text-2xl font-light tracking-tight">{value}</p>
      {hint && <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export { Reveal };
