"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Ambient loop: pauses offscreen and on hidden tabs; frozen under reduced motion (CSS). */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let on = false;
    const update = () => setPaused(!(on && document.visibilityState === "visible"));
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div ref={ref} className={`marquee overflow-hidden ${className}`} data-paused={paused ? "" : undefined}>
      <div className="marquee-track flex w-max animate-marquee">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
