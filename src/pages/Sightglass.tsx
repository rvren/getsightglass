import { useEffect } from "react";
import { DownloadProvider } from "@/lib/downloadFlow";
import { Chapters, Download, Footer, Privacy, Sources, Today } from "@/sections/Content";
import { Hero } from "@/sections/Hero";
import { Nav } from "@/sections/Nav";

/** Moves each card's light to the pointer, at most once per frame. */
function useCardSpotlight(): void {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = (e.target as Element | null)?.closest?.<HTMLElement>(".glass-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
}

export default function Sightglass() {
  useCardSpotlight();
  return (
    <DownloadProvider>
      <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <div className="site-grid" aria-hidden />
        <Nav />
        <main className="relative z-[1]">
          <Hero />
          <Sources />
          <Today />
          <Chapters />
          <Privacy />
          <Download />
        </main>
        <div className="relative z-[1]">
          <Footer />
        </div>
      </div>
    </DownloadProvider>
  );
}
