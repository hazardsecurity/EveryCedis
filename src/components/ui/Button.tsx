import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "ink" | "outline" | "outline-light" | "ghost-light" | "red";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-star shadow-[0_1px_0_#0e0e0c,0_6px_18px_-8px_rgba(160,120,0,0.55)] hover:bg-[#ffdb3d] focus-dark",
  ink: "bg-star text-white hover:bg-star-2",
  red: "bg-red text-white hover:bg-red-deep",
  outline: "border border-star/80 text-star hover:bg-star hover:text-white focus-dark",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
  "ghost-light": "text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-gold",
};

const base =
  "press inline-flex min-h-12 select-none items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold leading-none whitespace-nowrap disabled:opacity-50 disabled:active:scale-100";

type Common = { variant?: Variant; className?: string; children: ReactNode };

export function ButtonLink({ variant = "gold", className = "", href, children, ...rest }: Common & ComponentProps<typeof Link>) {
  const external = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href as string} className={cls} {...(href.toString().startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant = "gold", className = "", children, ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
