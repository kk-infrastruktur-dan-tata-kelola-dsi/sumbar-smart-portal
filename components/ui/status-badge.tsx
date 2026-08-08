import type { ReactNode } from "react";

import { clsx } from "clsx";

export type StatusBadgeVariant =
  | "urgent"
  | "official"
  | "verified"
  | "information"
  | "neutral"
  | "draft"
  | "archived";

export interface StatusBadgeProps {
  children: ReactNode;
  variant?: StatusBadgeVariant;
  className?: string;
}

const variantClass: Record<StatusBadgeVariant, string> = {
  urgent:
    "border-brand-gold-300 bg-brand-gold-100 text-brand-gold-800 font-bold",
  official: "border-brand-gold-200 bg-brand-gold-50 text-brand-gold-700",
  verified: "border-brand-alam-200 bg-brand-alam-50 text-brand-alam-700",
  information:
    "border-brand-rantau-200 bg-brand-rantau-50 text-brand-rantau-700",
  neutral: "border-civic-line bg-civic-mist text-civic-textMuted",
  draft: "border-civic-line bg-civic-cloud text-civic-textSubtle",
  archived: "border-civic-lineStrong bg-civic-limestone text-civic-textMuted",
};

export function StatusBadge({
  children,
  variant = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex w-fit items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold leading-none",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
