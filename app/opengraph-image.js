import { ImageResponse } from "next/og";
import { brand } from "./lib/site-content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0c0f",
          color: "#edeff1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5a3c" }} />
          <span style={{ fontSize: 28, letterSpacing: 2, textTransform: "uppercase", color: "#8b939f" }}>
            {brand.tagline}
          </span>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>{brand.name}</div>
        <div style={{ fontSize: 32, color: "#8b939f", marginTop: 20 }}>{brand.city}</div>
      </div>
    ),
    { ...size }
  );
}
