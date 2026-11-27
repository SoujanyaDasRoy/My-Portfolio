import { ImageResponse } from "next/og";

// Preview card shown when the site link is shared.
export const alt = "Soujanya Das Roy, Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#f5f2ec", color: "#221c17" }}>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>Soujanya Das Roy</div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 52, color: "#1f6a39" }}>Full Stack Developer</div>
        <div style={{ display: "flex", marginTop: 56, fontSize: 30, color: "#5f564d" }}>React, Next.js, Node.js, MongoDB</div>
      </div>
    ),
    size,
  );
}
