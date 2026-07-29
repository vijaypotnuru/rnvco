import { ImageResponse } from "next/og";

export const alt = "RNVCO — AI Infrastructure. Coming Soon.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8F9FA",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                border: "2px solid #C8922A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C8922A",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              R
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 42,
                letterSpacing: 8,
                color: "#1A1E24",
                fontWeight: 700,
              }}
            >
              RN<span style={{ color: "#C8922A" }}>V</span>CO
            </div>
          </div>
          <div
            style={{
              background: "#C8922A",
              color: "#F8F9FA",
              padding: "12px 28px",
              fontSize: 18,
              letterSpacing: 4,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Coming Soon
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#C8922A",
              textTransform: "uppercase",
            }}
          >
            India&apos;s Futuristic AI Infrastructure
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 0.92,
              letterSpacing: 2,
              color: "#1A1E24",
              fontWeight: 700,
            }}
          >
            POWER THE <span style={{ color: "#C8922A" }}>FUTURE</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 3,
              color: "#4A5568",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#185FA5" }}>2.4 GWh</span>
            {" · AI Data Centre Network · Across India"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            borderTop: "1px solid #D0D6DE",
            paddingTop: 28,
            color: "#4A5568",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>Phase 1 · 400 MWh</span>
          <span>3 Deployment Phases</span>
          <span>A Unit of Rycoon</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
