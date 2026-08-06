import { clsx } from "clsx";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  tone?: "neutral" | "information" | "warning";
  className?: string;
}

const toneClass = {
  neutral: "bg-civic-mist text-civic-textMuted",
  information: "bg-brand-rantau-50 text-semantic-info",
  warning: "bg-brand-gold-50 text-semantic-primary",
};

export function EmptyState({
  title,
  description,
  icon,
  actions,
  tone = "neutral",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "rounded-civic-xl border border-dashed border-civic-line bg-civic-cloud px-6 py-12 text-center",
        className,
      )}
    >
      {icon && (
        <div
          className={clsx(
            "mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-civic-lg",
            toneClass[tone],
          )}
        >
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-civic-text">{title}</h3>
      {description && (
        <div className="mx-auto mt-2 max-w-civic-prose text-sm leading-6 text-civic-textMuted">
          {description}
        </div>
      )}
      {actions && <div className="mt-6 flex justify-center gap-3">{actions}</div>}
    </div>
  );
}
