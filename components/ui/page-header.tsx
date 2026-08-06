import { clsx } from "clsx";
import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  metadata?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function PageHeader({
  title,
  description,
  eyebrow,
  metadata,
  actions,
  children,
  align = "left",
  className,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <header
      className={clsx(
        "mb-10 border-b border-civic-line pb-8",
        centered && "mx-auto max-w-civic-prose text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-semantic-primary">
          {eyebrow}
        </p>
      )}

      <div
        className={clsx(
          "gap-6",
          actions && !centered && "grid items-start lg:grid-cols-[1fr_auto]",
        )}
      >
        <div>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-normal text-civic-text md:text-5xl">
            {title}
          </h1>

          {description && (
            <div className="mt-4 max-w-civic-prose text-base leading-7 text-civic-textMuted md:text-lg">
              {description}
            </div>
          )}

          {metadata && (
            <div
              className={clsx(
                "mt-5 flex flex-wrap gap-2 text-sm text-civic-textSubtle",
                centered && "justify-center",
              )}
            >
              {metadata}
            </div>
          )}
        </div>

        {actions && (
          <div
            className={clsx(
              "flex flex-wrap gap-3",
              centered ? "mt-6 justify-center" : "lg:justify-end",
            )}
          >
            {actions}
          </div>
        )}
      </div>

      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
