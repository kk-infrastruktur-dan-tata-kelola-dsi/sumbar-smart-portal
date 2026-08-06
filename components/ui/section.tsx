import { clsx } from "clsx";
import type { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  id?: string;
  title?: string;
  description?: ReactNode;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  surface?: "none" | "paper" | "white" | "stone";
}

const surfaceClass = {
  none: "",
  paper: "rounded-civic-xl bg-civic-paperWarm p-5 sm:p-6 lg:p-8",
  white: "rounded-civic-xl bg-civic-cloud p-5 shadow-civic-xs sm:p-6 lg:p-8",
  stone: "rounded-civic-xl bg-civic-limestone/45 p-5 sm:p-6 lg:p-8",
};

export function Section({
  children,
  id,
  title,
  description,
  eyebrow,
  actions,
  className,
  contentClassName,
  surface = "none",
}: SectionProps) {
  return (
    <section id={id} className={clsx("py-8 lg:py-10", className)}>
      <div className={surfaceClass[surface]}>
        {(title || description || eyebrow || actions) && (
          <div className="mb-6 grid gap-4 border-b border-civic-line pb-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              {eyebrow && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-semantic-primary">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.01em] text-civic-text md:text-3xl">
                  {title}
                </h2>
              )}
              {description && (
                <div className="mt-2 max-w-civic-prose text-sm leading-6 text-[#6B7280] md:text-base">
                  {description}
                </div>
              )}
            </div>

            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
        )}

        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
