import type { ReactNode } from "react";

import { clsx } from "clsx";
import Link from "next/link";

import { StatusBadge, type StatusBadgeVariant } from "./status-badge";

export interface DocumentCardProps {
  title: string;
  description?: ReactNode;
  href?: string;
  fileType?: string;
  size?: string;
  date?: string;
  source?: string;
  status?: ReactNode;
  statusVariant?: StatusBadgeVariant;
  icon?: ReactNode;
  actionLabel?: string;
  className?: string;
}

export function DocumentCard({
  title,
  description,
  href,
  fileType = "PDF",
  size,
  date,
  source,
  status,
  statusVariant = "information",
  icon,
  actionLabel = "Unduh",
  className,
}: DocumentCardProps) {
  const action = href ? (
    <Link
      className="civic-focus-ring rounded-md px-2 py-1 text-sm font-semibold text-semantic-primary hover:bg-brand-gold-50"
      href={href}
    >
      {actionLabel}
    </Link>
  ) : (
    <span className="text-sm font-semibold text-civic-textSubtle">
      Belum tersedia
    </span>
  );

  return (
    <article
      className={clsx(
        "rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs transition duration-civic ease-civic hover:border-brand-rantau-200 hover:shadow-civic-sm",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-civic-lg bg-brand-rantau-50 text-semantic-info">
          {icon ?? <span className="text-xs font-extrabold">{fileType}</span>}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-base font-bold leading-snug text-civic-text">
              {title}
            </h3>
            {status && (
              <StatusBadge variant={statusVariant}>{status}</StatusBadge>
            )}
          </div>

          {description && (
            <div className="mt-2 text-sm leading-6 text-civic-textMuted">
              {description}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-civic-textSubtle">
            {fileType && <span>{fileType}</span>}
            {size && <span>{size}</span>}
            {date && <span>{date}</span>}
            {source && <span>Sumber: {source}</span>}
          </div>
        </div>

        <div className="shrink-0">{action}</div>
      </div>
    </article>
  );
}
