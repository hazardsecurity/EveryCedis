/**
 * Rolling digits. Only the columns whose digit changes move; each column is
 * clipped to one line. Non-digits (commas, dots, ₵) render as static glyphs.
 */
export function Odometer({ value, className = "", label }: { value: string; className?: string; label?: string }) {
  const chars = value.split("");
  return (
    <span className={`tnum relative inline-flex overflow-hidden leading-none ${className}`}>
      <span className="sr-only">{label ?? value}</span>
      <span aria-hidden="true" className="inline-flex">
        {chars.map((ch, i) => {
          const d = ch.charCodeAt(0) - 48;
          if (d < 0 || d > 9) {
            return (
              <span key={`s${i}-${chars.length}`} className="inline-block">
                {ch === " " ? " " : ch}
              </span>
            );
          }
          return (
            <span key={`d${chars.length - i}`} className="relative inline-block h-[1em] overflow-hidden">
              <span className="invisible">0</span>
              <span
                className="odo-col absolute inset-x-0 top-0 flex flex-col"
                style={{ transform: `translateY(${-d * 10}%)`, transitionDelay: `${(chars.length - i) * 30}ms` }}
              >
                {"0123456789".split("").map((n) => (
                  <span key={n} className="block h-[1em]">{n}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
