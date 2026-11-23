import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useLatestMacDownloads, useMacArch } from "@/lib/downloads";
import { InstallOverlay } from "@/sections/InstallOverlay";

/**
 * One download flow for every button: start the right .dmg at once and open
 * the install steps. If the release lookup has not resolved, the overlay still
 * opens and its "try again" retries.
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

export const useDownload = (): DownloadFlow => useContext(DownloadCtx);

function triggerFileDownload(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function DownloadProvider({ children }: { children: ReactNode }) {
  const { armLink, intelLink } = useLatestMacDownloads();
  const arch = useMacArch();
  const [open, setOpen] = useState(false);
  const primary = arch === "x64" ? intelLink : (armLink ?? intelLink);
  const primaryLabel =
    arch === "x64"
      ? "Download for Intel"
      : arch === "arm64"
        ? "Download for Apple Silicon"
        : "Download for macOS";

  const start = useCallback((): void => {
    if (primary) triggerFileDownload(primary);
    setOpen(true);
  }, [primary]);
  const close = useCallback(() => setOpen(false), []);
  const flow = useMemo(
    () => ({ start, primaryLabel, armLink, intelLink, arch }),
    [start, primaryLabel, armLink, intelLink, arch],
  );

  return (
    <DownloadCtx.Provider value={flow}>
      {children}
      <InstallOverlay open={open} onClose={close} onRetry={start} />
    </DownloadCtx.Provider>
  );
}
