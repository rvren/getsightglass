import { useEffect, useState } from "react";
import { ArrowRight, HardDrive, Lock, MousePointer2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { installSteps, XATTR_CMD } from "@/data/sightglass";

function StepArt({ step }: { step: number }) {
  // Simple, honest illustrations in the page's own visual language.
  if (step === 0) {
    return (
      <div className="relative flex h-32 items-center justify-center rounded-xl bg-secondary/50">
        <div className="flex flex-col items-center gap-1.5">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-card shadow-sm">
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
      <div className="flex w-full items-center gap-2 rounded-lg bg-card px-3 py-2">
        <img src="/sightglass-icon.svg" alt="" className="h-5 w-5 rounded" />
        <span className="text-xs font-medium">Sightglass</span>
        <Lock className="ml-auto h-3.5 w-3.5 text-accent" />
      </div>
      <span className="text-[10px] text-muted-foreground">one command, once</span>
    </div>
  );
}

export function InstallOverlay({ open, onClose, onRetry }: { open: boolean; onClose: () => void; onRetry: () => void }) {
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
                className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
              <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
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
              <div className="mx-auto mt-10 flex max-w-md items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-4 py-2.5">
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
                  className="shrink-0 rounded-md bg-white/[0.1] px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
                Paste it into Terminal after dragging the app across. It clears the
                quarantine flag macOS puts on apps that are not notarized yet. You
                only do this once.
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
