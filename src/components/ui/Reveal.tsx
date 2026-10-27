"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export function useReveal<T extends HTMLElement>(immediate = false) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (immediate) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);
  return { ref, visible };
}

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  immediate?: boolean;
  stagger?: boolean;
  id?: string;
};

export function Reveal({ as: Tag = "div", className = "", children, immediate, stagger, id }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>(immediate);
  useLayoutEffect(() => {
    if (!stagger || !ref.current) return;
    Array.from(ref.current.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(Math.min(i, 8))));
  }, [stagger, ref]);
  return (
    <Tag ref={ref} id={id} data-visible={visible ? "" : undefined} className={`${stagger ? "stagger" : "reveal"} ${className}`}>
      {children}
    </Tag>
  );
}
