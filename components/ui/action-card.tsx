import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

import { StatusBadge, type StatusBadgeVariant } from "./status-badge";

export interface ActionCardProps {
  title: string;
  description?: ReactNode;
  href?: string;
  icon?: ReactNode;
  meta?: ReactNode;
  status?: ReactNode;
  statusVariant?: StatusBadgeVariant;
  actionLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function ActionCard({
  title,
  description,
  href,
  icon,
  meta,
  status,
  statusVariant = "official",
  actionLabel = "Buka layanan",
  disabled = false,
  className,
}: ActionCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-civic-lg bg-brand-gold-50 text-semantic-primary">
            {icon}
          </div>
        )}
        {status && <StatusBadge variant={statusVariant}>{status}</StatusBadge>}
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-bold leading-snug text-civic-text">
          {title}
        </h3>
        {description && (
          <div className="mt-2 text-sm leading-6 text-civic-textMuted">
            {description}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-5 text-sm">
        {meta && <div className="text-civic-textSubtle">{meta}</div>}
        <span className="ml-auto font-semibold text-semantic-primary">
          {disabled ? "Belum tersedia" : actionLabel}
        </span>
      </div>
    </>
  );

  const classNames = clsx(
    "group flex h-full flex-col rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs transition duration-civic ease-civic hover:-translate-y-0.5 hover:border-brand-gold-300 hover:shadow-civic-sm focus-visible:shadow-civic-focus",
    disabled && "pointer-events-none opacity-60",
    className,
  );

  if (!href || disabled) {
    return <article className={classNames}>{content}</article>;
  }

  return (
    <Link href={href} className={classNames}>
      {content}
    </Link>
  );
}
