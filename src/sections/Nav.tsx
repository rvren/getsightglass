import { nav } from "@/data/sightglass";
import { useDownload } from "@/lib/downloadFlow";

export function Nav() {
  const { start } = useDownload();
  return (
    <header className="nav-fade fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg">
          <img src="/sightglass-icon.svg" alt="" className="h-7 w-7 rounded-lg" />
          <span className="font-display text-base font-medium">Sightglass</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-0.5 rounded-full bg-white/[0.07] p-1 backdrop-blur-xl md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="rounded-full px-4 py-2 text-[13px] text-foreground/75 transition-colors hover:bg-white/[0.08] hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <button type="button" onClick={start} className="rounded-full bg-white/[0.1] px-4 py-2 text-[13px] font-medium backdrop-blur-xl transition-colors hover:bg-white/[0.14]">
          Download
        </button>
      </div>
    </header>
  );
}
