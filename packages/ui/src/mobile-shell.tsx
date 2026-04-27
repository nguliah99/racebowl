import type * as React from "react";
import { cn } from "./utils";

export function MobileShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-black text-white">
      <div className={cn("px-4 pb-28 pt-6", className)}>{children}</div>
    </div>
  );
}
