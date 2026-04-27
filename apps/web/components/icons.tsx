import {
  BadgeCent,
  CircleUserRound,
  ClipboardList,
  Flag,
  Home,
  type LucideIcon,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";

const iconMap = {
  home: Home,
  flag: Flag,
  "clipboard-list": ClipboardList,
  "badge-cent": BadgeCent,
  ticket: Ticket,
  users: CircleUserRound,
  "utensils-crossed": UtensilsCrossed,
  "circle-user-round": CircleUserRound,
  "circle-dot": BadgeCent,
  "clipboard-check": ClipboardList,
} satisfies Record<string, LucideIcon>;

export function AppIcon({
  name,
  className,
}: { name: keyof typeof iconMap; className?: string }) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}
