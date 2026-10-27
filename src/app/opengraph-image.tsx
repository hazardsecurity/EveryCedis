import { ImageResponse } from "next/og";

export const alt = "Every₵edi — POS, stock control and online shops for Ghanaian retail";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const weave = ["#CE1126", "#0E0E0C", "#FCD116", "#006B3F", "#FCD116", "#0E0E0C", "#CE1126", "#FCD116", "#006B3F", "#0E0E0C", "#CE1126", "#FCD116"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0E0E0C", color: "#fff" }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", padding: "0 80px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>
            Every
            <svg width="62" height="62" viewBox="0 0 48 48" style={{ margin: "0 2px" }}>
              <path d="M34.04 12.85 A15 15 0 0 0 9.5 20.1" fill="none" stroke="#CE1126" strokeWidth="7" />
              <path d="M9.5 20.1 A15 15 0 0 0 13.4 34.6" fill="none" stroke="#FCD116" strokeWidth="7" />
              <path d="M13.4 34.6 A15 15 0 0 0 34.04 35.15" fill="none" stroke="#006B3F" strokeWidth="7" />
              <rect x="21.75" y="3.5" width="4.5" height="41" rx="1" fill="#fff" />
            </svg>
            edi
          </div>
          <div style={{ marginTop: 36, fontSize: 60, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Run your shop, sell online, and account for every cedi.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#FCD116" }}>POS · UPS backup · Live stock sync · MoMo checkout</div>
        </div>
        <div style={{ display: "flex", height: 24 }}>
          {weave.map((c, i) => (
            <div key={i} style={{ flex: (i % 4) + 2, background: c }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
