"use client";

import { navItems } from "@/lib/constants";
import { cn } from "@racebowl/ui/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "./icons";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] border-t border-white/10 bg-black/95 px-2 pb-4 pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-5 gap-1 text-[11px] text-white/55">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2",
                active && "text-orange-400",
              )}
            >
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border border-transparent",
                  active &&
                    "bg-orange-500 text-black shadow-[0_0_24px_rgba(249,115,22,0.35)]",
                )}
              >
                <AppIcon name={item.icon} className="size-4" />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
