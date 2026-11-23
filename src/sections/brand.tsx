import type { IconType } from "react-icons";
import { FaEdge, FaSlack } from "react-icons/fa";
import {
  SiArc,
  SiBrave,
  SiClaude,
  SiFirefoxbrowser,
  SiGithub,
  SiGoogle,
  SiGooglecalendar,
  SiGooglechrome,
  SiIcloud,
  SiJira,
  SiSafari,
} from "react-icons/si";
import { cn } from "@/lib/utils";

/** Real product logos, in each brand's colour, tuned to read on a dark ground. */
const BRANDS: Record<string, { Icon: IconType; color: string }> = {
  Chrome: { Icon: SiGooglechrome, color: "#5B9DF9" },
  Safari: { Icon: SiSafari, color: "#27A6F5" },
  Firefox: { Icon: SiFirefoxbrowser, color: "#FF7139" },
  Arc: { Icon: SiArc, color: "#FCBFBD" },
  Brave: { Icon: SiBrave, color: "#FB542B" },
  Edge: { Icon: FaEdge, color: "#2EC4B6" },
  "Claude Code": { Icon: SiClaude, color: "#D97757" },
  GitHub: { Icon: SiGithub, color: "#FFFFFF" },
  Jira: { Icon: SiJira, color: "#4C9AFF" },
  Slack: { Icon: FaSlack, color: "#E9457A" },
  Google: { Icon: SiGoogle, color: "#EA6A5E" },
  "Google Calendar": { Icon: SiGooglecalendar, color: "#5B9DF9" },
  "iCloud Calendar": { Icon: SiIcloud, color: "#5DB2F6" },
};

export function BrandMark({ name, className }: { name: string; className?: string }) {
  const brand = BRANDS[name];
  if (!brand) return null;
  const { Icon, color } = brand;
  return <Icon className={cn("h-4 w-4 shrink-0", className)} style={{ color }} aria-hidden />;
}
