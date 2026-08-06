import { clsx } from "clsx";
import type { ReactNode } from "react";

type PageShellWidth = "content" | "wide" | "prose" | "full";

export interface PageShellProps {
  children: ReactNode;
  width?: PageShellWidth;
  className?: string;
  innerClassName?: string;
  as?: "div" | "main" | "section";
}

const widthClass: Record<PageShellWidth, string> = {
  content: "max-w-civic-content",
  wide: "max-w-civic-wide",
  prose: "max-w-civic-prose",
  full: "max-w-none",
};

export function PageShell({
  children,
  width = "content",
  className,
  innerClassName,
  as: Component = "div",
}: PageShellProps) {
  return (
    <Component
      className={clsx(
        "min-h-screen bg-civic-paper text-civic-text",
        className,
      )}
    >
      <div
        className={clsx(
          "mx-auto w-full px-6 py-12 sm:px-8 lg:px-10 lg:py-16",
          widthClass[width],
          innerClassName,
        )}
      >
        {children}
      </div>
    </Component>
  );
}
