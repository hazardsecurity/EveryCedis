/* Hand-built product drawings. Flat, ink-outlined, flag-coloured accents. No stock imagery. */

export function KenteSwatch({ className = "" }: { className?: string }) {
  const bands = ["#FCD116", "#006B3F", "#FCD116", "#CE1126", "#0E0E0C", "#FCD116", "#006B3F", "#FCD116"];
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="160" height="120" fill="#FCD116" />
      {bands.map((c, i) => (
        <rect key={i} x={i * 20} y="0" width="20" height="120" fill={c} opacity={i % 2 ? 1 : 0.95} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x={i * 20 + 4} y={i % 2 ? 14 : 44} width="12" height="22" fill="#0E0E0C" opacity="0.85" />
          <rect x={i * 20 + 7} y={i % 2 ? 70 : 84} width="6" height="18" fill={i % 2 ? "#CE1126" : "#006B3F"} />
        </g>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="0" y={i * 10 + 4} width="160" height="1.4" fill="#0E0E0C" opacity="0.18" />
      ))}
    </svg>
  );
}

const ink = "#0E0E0C";

export function TerminalArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <rect x="20" y="16" width="150" height="104" rx="10" fill={ink} />
      <rect x="27" y="23" width="136" height="90" rx="5" fill="#fff" />
      <rect x="35" y="32" width="70" height="6" rx="3" fill="#dedfd6" />
      {[46, 58, 70, 82].map((y, i) => (
        <g key={y}>
          <rect x="35" y={y} width={i === 3 ? 40 : 80} height="5" rx="2.5" fill="#dedfd6" />
          <rect x="132" y={y} width="22" height="5" rx="2.5" fill={i === 3 ? "#006B3F" : "#dedfd6"} />
        </g>
      ))}
      <rect x="35" y="96" width="119" height="10" rx="5" fill="#006B3F" />
      <rect x="180" y="40" width="46" height="36" rx="6" fill={ink} />
      <rect x="184" y="44" width="38" height="28" rx="3" fill="#FCD116" />
      <rect x="189" y="52" width="20" height="4" rx="2" fill={ink} />
      <rect x="189" y="60" width="28" height="6" rx="2" fill={ink} />
      <rect x="200" y="76" width="6" height="58" fill={ink} />
      <path d="M80 120 l-8 44 h46 l-8 -44z" fill={ink} />
      <rect x="40" y="164" width="190" height="12" rx="6" fill={ink} />
    </svg>
  );
}

export function UpsArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <rect x="60" y="20" width="120" height="160" rx="12" fill={ink} />
      <rect x="74" y="36" width="92" height="40" rx="5" fill="#0a4329" />
      <path d="M82 56 q8 -14 16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#FCD116" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={78 + i * 17} y="92" width="13" height="26" rx="3" fill={i < 4 ? "#006B3F" : "#3a3a35"} />
      ))}
      <circle cx="120" cy="146" r="12" fill="none" stroke="#CE1126" strokeWidth="4" />
      <path d="M120 134 v10" stroke="#CE1126" strokeWidth="4" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="66" y={124 + i * 8} width="22" height="3" rx="1.5" fill="#3a3a35" />
      ))}
    </svg>
  );
}

export function PrinterArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <path d="M92 20 h56 v70 l-7 6 -7 -6 -7 6 -7 -6 -7 6 -7 -6 -7 6 -7 -6z" fill="#fff" stroke="#dedfd6" strokeWidth="2" />
      {[32, 42, 52, 62].map((y, i) => (
        <rect key={y} x="100" y={y} width={i === 3 ? 22 : 40} height="3.5" rx="1.75" fill={i === 3 ? ink : "#c9cbc2"} />
      ))}
      <rect x="50" y="86" width="140" height="80" rx="16" fill={ink} />
      <rect x="80" y="86" width="80" height="8" rx="4" fill="#3a3a35" />
      <circle cx="168" cy="146" r="6" fill="#006B3F" />
      <rect x="66" y="140" width="40" height="6" rx="3" fill="#3a3a35" />
    </svg>
  );
}

export function ScannerArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <path d="M70 172 h100 l-14 -26 h-72z" fill={ink} />
      <rect x="96" y="40" width="48" height="110" rx="14" fill={ink} />
      <rect x="104" y="52" width="32" height="40" rx="6" fill="#3a3a35" />
      <path d="M120 72 L40 30 M120 72 L40 114" stroke="#CE1126" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
      <path d="M40 30 L40 114" stroke="#CE1126" strokeWidth="3" strokeLinecap="round" />
      <circle cx="120" cy="72" r="5" fill="#CE1126" />
    </svg>
  );
}

export function DrawerArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <path d="M30 70 h180 l-10 30 h-160z" fill="#3a3a35" />
      <rect x="30" y="100" width="180" height="60" rx="8" fill={ink} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={44 + i * 32} y="76" width="26" height="16" rx="3" fill={["#006B3F", "#FCD116", "#CE1126", "#006B3F", "#FCD116"][i]} />
      ))}
      <rect x="100" y="122" width="40" height="8" rx="4" fill="#3a3a35" />
      <circle cx="190" cy="140" r="5" fill="#CE1126" />
    </svg>
  );
}

export function PhoneShopArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <rect x="20" y="70" width="80" height="60" rx="8" fill={ink} />
      <rect x="26" y="76" width="68" height="40" rx="4" fill="#fff" />
      <rect x="32" y="84" width="40" height="5" rx="2.5" fill="#dedfd6" />
      <rect x="32" y="96" width="56" height="12" rx="3" fill="#006B3F" />
      <path d="M100 100 H140" stroke={ink} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="122" cy="100" r="6" fill="#FCD116" stroke={ink} strokeWidth="2" />
      <rect x="146" y="22" width="76" height="156" rx="16" fill={ink} />
      <rect x="152" y="30" width="64" height="140" rx="11" fill="#fff" />
      <rect x="158" y="40" width="52" height="46" rx="6" fill="#FCD116" />
      <rect x="164" y="48" width="10" height="30" fill="#006B3F" />
      <rect x="180" y="48" width="10" height="30" fill="#CE1126" />
      <rect x="196" y="48" width="10" height="30" fill={ink} />
      <rect x="158" y="94" width="40" height="5" rx="2.5" fill={ink} />
      <rect x="158" y="104" width="26" height="5" rx="2.5" fill="#c9cbc2" />
      <rect x="188" y="102" width="22" height="10" rx="5" fill="#FCD116" />
      <rect x="158" y="146" width="52" height="14" rx="7" fill={ink} />
    </svg>
  );
}

export function ReportArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <rect x="44" y="18" width="130" height="164" rx="8" fill="#fff" stroke="#dedfd6" strokeWidth="2" />
      <rect x="58" y="34" width="70" height="7" rx="3.5" fill={ink} />
      <rect x="58" y="48" width="44" height="5" rx="2.5" fill="#c9cbc2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={62 + i * 20} y={140 - [30, 46, 38, 62, 74][i]} width="12" height={[30, 46, 38, 62, 74][i]} rx="2" fill={i === 4 ? "#006B3F" : "#c9cbc2"} />
      ))}
      <rect x="58" y="148" width="100" height="2" fill={ink} />
      <rect x="58" y="158" width="60" height="5" rx="2.5" fill="#c9cbc2" />
      <circle cx="176" cy="150" r="30" fill="#FCD116" stroke={ink} strokeWidth="3" />
      <path d="M176 132 l4.8 11.6 12.4 .9 -9.6 8 3 12.2 -10.6 -6.7 -10.6 6.7 3 -12.2 -9.6 -8 12.4 -.9z" fill={ink} />
    </svg>
  );
}
