import type * as React from "react";
import { cn } from "./utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.96),rgba(10,10,10,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_50px_rgba(0,0,0,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
