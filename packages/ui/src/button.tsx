import { Slot } from "@radix-ui/react-slot";
import type * as React from "react";
import { cn } from "./utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "ghost" | "outline" | "secondary";
  size?: "default" | "sm" | "icon";
};

export function Button({
  asChild,
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border text-sm font-semibold tracking-[0.02em] transition active:scale-[0.99]",
        variant === "primary" &&
          "border-orange-400 bg-linear-to-r from-orange-500 to-orange-400 text-black shadow-[0_0_24px_rgba(249,115,22,0.35)]",
        variant === "outline" &&
          "border-orange-500/70 bg-orange-500/5 text-orange-300",
        variant === "ghost" &&
          "border-transparent bg-transparent text-white/80",
        variant === "secondary" && "border-white/10 bg-white/5 text-white",
        size === "default" && "h-12 px-5",
        size === "sm" && "h-9 rounded-xl px-3 text-xs",
        size === "icon" && "size-10 rounded-full",
        className,
      )}
      {...props}
    />
  );
}
