import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the proopco logo on a dark tile (iOS turns
// transparency black, so the background is set explicitly).
export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "public/proopco-logo.svg"));
  const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e0e",
        }}
      >
        <img src={src} width={120} height={93} alt="" />
      </div>
    ),
    size,
  );
}
