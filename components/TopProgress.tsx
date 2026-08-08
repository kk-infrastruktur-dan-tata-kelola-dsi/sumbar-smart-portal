"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A lightweight top progress bar that animates on route changes.
 * Works with Next.js App Router by listening to pathname/search changes.
 */
export default function TopProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);

  // Helper to clear any running interval
  const clear = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    clear();
    setVisible(true);
    setProgress(8);
    // Micro progress up to 90%
    intervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        // ease: increase smaller as it gets larger
        const next = p + Math.max(0.8, (90 - p) * 0.04);

        return next > 90 ? 90 : next;
      });
    }, 120);
  };

  const finish = () => {
    clear();
    setProgress(100);
    // Allow the bar to fill, then fade out
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);
  };

  // Trigger on route/search changes
  React.useEffect(() => {
    // Start the progress when URL changes
    start();
    // Heuristic finish after a short delay; you can tune this or tie to data fetching
    const t = setTimeout(finish, 700);

    return () => {
      clearTimeout(t);
      clear();
    };
  }, [pathname, searchParams?.toString()]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-brand-gold-500 to-brand-gold-300 shadow-civic-sm transition-[width,opacity] duration-200 ease-out"
      style={{
        width: `${progress}%`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
