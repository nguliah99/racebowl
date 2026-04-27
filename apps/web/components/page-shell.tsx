import { MobileShell } from "@racebowl/ui/mobile-shell";
import { cn } from "@racebowl/ui/utils";
import { Bell, ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";

export function PageShell({
  title,
  children,
  backHref = "/",
  rightSlot,
  className,
}: {
  title: string;
  children: React.ReactNode;
  backHref?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}) {
  return (
    <MobileShell className={cn("space-y-5", className)}>
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="race-title text-[1.85rem] leading-none">{title}</h1>
        <div className="flex items-center gap-2">{rightSlot}</div>
      </div>
      {children}
    </MobileShell>
  );
}

export function HeaderActions() {
  return (
    <>
      <div className="relative flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <Bell className="size-4" />
        <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-black">
          2
        </span>
      </div>
      <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <Settings className="size-4" />
      </div>
    </>
  );
}
