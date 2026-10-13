import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#09090b", color: "#e4e4e7", fontFamily: "monospace" }}>
        <div style={{ fontSize: 32, color: "#34d399" }}>~/birbs $ whoami</div>
        <div style={{ fontSize: 88, fontWeight: 700, color: "#fafafa", marginTop: 24 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 16 }}>{site.title}</div>
        <div style={{ fontSize: 28, marginTop: 16, color: "#a1a1aa" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
