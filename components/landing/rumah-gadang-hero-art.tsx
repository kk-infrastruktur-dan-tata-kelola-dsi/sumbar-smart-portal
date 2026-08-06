"use client";

import React from "react";

export function RumahGadangHeroArt() {
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches) {
      root.dataset.motion = "reduced";
      return;
    }

    let frame = 0;

    const setVars = (x: number, y: number, scroll: number) => {
      root.style.setProperty("--rg-x", x.toFixed(3));
      root.style.setProperty("--rg-y", y.toFixed(3));
      root.style.setProperty("--rg-scroll", scroll.toFixed(3));
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;

      const rect = root.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scroll = Math.min(1, Math.max(0, window.scrollY / 760));
        setVars(x, y, scroll);
      });
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scroll = Math.min(1, Math.max(0, window.scrollY / 760));
        const currentX = Number(root.style.getPropertyValue("--rg-x")) || 0;
        const currentY = Number(root.style.getPropertyValue("--rg-y")) || 0;
        setVars(currentX, currentY, scroll);
      });
    };

    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="rumah-gadang-art pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(183,122,11,0.13),transparent_34rem),linear-gradient(90deg,rgba(248,245,237,0.96)_0%,rgba(248,245,237,0.82)_32%,rgba(248,245,237,0.18)_58%,rgba(248,245,237,0.52)_100%)]" />
      <img
        src="/images/sumatera-barat/rumah_gadang_line_immersive_transparent.svg"
        alt=""
        decoding="async"
        fetchPriority="high"
        className="rumah-gadang-art__image absolute bottom-[-6%] left-1/2 h-[64vh] min-h-[360px] w-[1680px] max-w-none -translate-x-[20%] object-contain opacity-90 mix-blend-multiply sm:h-[70vh] md:bottom-[-4%] md:h-[80vh] md:w-[1920px] md:-translate-x-[18%] lg:h-[88vh] lg:w-[2100px] lg:-translate-x-[14%]"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-civic-paper via-civic-paper/84 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[44vw] bg-gradient-to-r from-civic-paper via-civic-paper/90 to-transparent" />
    </div>
  );
}
