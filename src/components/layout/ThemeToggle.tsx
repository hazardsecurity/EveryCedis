"use client";

import { useEffect, useSyncExternalStore, type MouseEvent } from "react";
import { THEME_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

function read(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
function stored(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

/* Swap the theme without every colour transition firing at once. */
function apply(next: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-swap");
  root.setAttribute("data-theme", next);
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-swap")));
}

/*
  Sun ⇄ moon. Clicking wipes the new theme in as a circle that grows from the button
  (View Transitions, where supported and motion is allowed); otherwise it switches instantly.
  The choice is remembered; until one is made, the site follows the system setting live.
*/
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => "light" as Theme);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!stored()) apply(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode: still switch for this visit */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !document.startViewTransition || document.visibilityState !== "visible") {
      apply(next);
      return;
    }
    // if the browser stalls the transition (throttled tab), still switch promptly
    const fallback = window.setTimeout(() => apply(next), 300);
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => {
      window.clearTimeout(fallback);
      apply(next);
    });
    vt.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 560, easing: "cubic-bezier(0.77, 0, 0.175, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      data-mode={theme}
      className="theme-toggle press focus-dark inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:bg-chalk"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <mask id="ec-moon-mask">
          <rect width="24" height="24" fill="#fff" />
          <circle className="tt-bite" cx="24" cy="4" r="7" fill="#000" />
        </mask>
        <circle className="tt-core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#ec-moon-mask)" />
        <g className="tt-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
