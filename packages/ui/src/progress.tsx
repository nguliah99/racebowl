import * as React from "react";
import { cn } from "./utils";

export function Progress({
  value,
  className,
  indicatorClassName,
}: {
  value: number;
  className?: string;
  indicatorClassName?: string;
}) {
  return (
    <div
      className={cn("h-2 overflow-hidden rounded-full bg-white/10", className)}
    >
      <div
        className={cn(
          "h-full rounded-full bg-linear-to-r from-orange-500 to-amber-300",
          indicatorClassName,
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
