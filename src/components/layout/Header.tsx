"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { nav, solutions } from "@/lib/site";

const dot: Record<string, string> = { red: "bg-red", gold: "bg-gold", green: "bg-forest" };

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solRef = useRef<HTMLDivElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // close menus on route change (state adjusted during render, not in an effect)
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSolOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!solOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!solRef.current?.contains(e.target as Node)) setSolOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSolOpen(false);
        solRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [solOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isSolution = solutions.some((s) => pathname.startsWith(s.href));

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-md transition-[border-color,box-shadow] duration-200 ${
        scrolled ? "border-line shadow-[0_8px_24px_-18px_rgba(14,14,12,0.35)]" : "border-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-gold focus:px-3 focus:py-2 focus:text-star">
        Skip to content
      </a>
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
        <Link href="/" className="press -ml-1 rounded-md px-1 focus-dark" aria-label="Every₵edi home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          <div ref={solRef} className="relative">
            <button
              type="button"
              aria-expanded={solOpen}
              aria-controls="solutions-menu"
              onClick={() => setSolOpen((o) => !o)}
              className={`press focus-dark inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[0.95rem] font-medium hover:bg-chalk ${
                isSolution ? "text-ink" : "text-ink/75"
              }`}
            >
              Solutions
              <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform duration-200 ${solOpen ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M2 4.5l4 3.5 4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <div
              id="solutions-menu"
              data-open={solOpen ? "" : undefined}
              inert={!solOpen}
              className="pop absolute left-0 top-[calc(100%+8px)] w-[360px] origin-top-left rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_48px_-24px_rgba(14,14,12,0.35)]"
            >
              {solutions.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="press focus-dark flex gap-3 rounded-xl p-3 hover:bg-chalk"
                >
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot[s.colour]}`} />
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-sm text-mute">{s.blurb}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {nav.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`press focus-dark inline-flex h-10 items-center whitespace-nowrap rounded-full px-3 text-[0.95rem] font-medium hover:bg-chalk xl:px-3.5 ${
                  active ? "text-ink" : "text-ink/75"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <span className="hidden sm:block lg:hidden xl:block">
            <ButtonLink href="/contact" variant="gold" className="min-h-11">
              Book a free demo
            </ButtonLink>
          </span>
          <button
            type="button"
            className="press focus-dark inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-ink transition-transform duration-200 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-0.5 w-5 rounded bg-ink transition-opacity duration-150 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-0.5 w-5 rounded bg-ink transition-transform duration-200 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        data-open={menuOpen ? "" : undefined}
        inert={!menuOpen}
        className="sheet fixed inset-x-0 top-[68px] bottom-0 overflow-y-auto border-t border-line bg-paper px-4 pb-10 pt-4 lg:hidden"
      >
        <p className="px-2 pb-2 text-sm font-semibold text-mute">Solutions</p>
        {solutions.map((s) => (
          <Link key={s.href} href={s.href} className="press flex items-center gap-3 rounded-xl px-2 py-3 text-lg font-semibold">
            <span className={`h-2.5 w-2.5 rounded-full ${dot[s.colour]}`} />
            {s.title}
          </Link>
        ))}
        <div className="my-3 h-px bg-line" />
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="press block rounded-xl px-2 py-3 text-lg font-semibold">
            {n.label}
          </Link>
        ))}
        <Link href="/contact" className="press block rounded-xl px-2 py-3 text-lg font-semibold">
          Contact
        </Link>
        <ButtonLink href="/contact" className="mt-6 w-full">
          Book a free onsite demo
        </ButtonLink>
      </div>
    </header>
  );
}
