// Captures desktop + mobile screenshots of the static export in ./out.
// Usage: npm run build && npm run screenshots  (needs a local Chrome; set CHROME_PATH to override)
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { chromium } from "playwright-core";

const root = new URL("../out/", import.meta.url).pathname;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png", ".pdf": "application/pdf" };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  try { res.writeHead(200, { "content-type": types[extname(p)] ?? "application/octet-stream" }).end(await readFile(join(root, p))); }
  catch { res.writeHead(404).end(); }
}).listen(4173);

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome" });
const shots = [
  { name: "desktop-dark", viewport: { width: 1440, height: 900 }, scheme: "dark" },
  { name: "desktop-light", viewport: { width: 1440, height: 900 }, scheme: "light" },
  { name: "mobile-dark", viewport: { width: 390, height: 844 }, scheme: "dark", isMobile: true, deviceScaleFactor: 2 },
];
for (const s of shots) {
  const page = await browser.newPage({ viewport: s.viewport, colorScheme: s.scheme, isMobile: s.isMobile, deviceScaleFactor: s.deviceScaleFactor ?? 1, reducedMotion: "reduce" });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.screenshot({ path: `screenshots/${s.name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
server.close();
console.log("saved", shots.map((s) => `screenshots/${s.name}.png`).join(", "));
