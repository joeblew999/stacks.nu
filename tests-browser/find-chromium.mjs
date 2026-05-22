// Locate a system-installed Chromium-family browser (no auto-install).
// Honour CHROMIUM_PATH for explicit override; otherwise probe known paths
// per platform and return the first one that exists.

import { existsSync } from "node:fs";
import { platform } from "node:os";

const CANDIDATES = {
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Arc.app/Contents/MacOS/Arc",
  ],
  linux: [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/microsoft-edge",
    "/snap/bin/chromium",
  ],
  win32: [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Chromium\\Application\\chrome.exe",
  ],
};

export function findChromium() {
  if (process.env.CHROMIUM_PATH) {
    if (!existsSync(process.env.CHROMIUM_PATH)) {
      throw new Error(`CHROMIUM_PATH=${process.env.CHROMIUM_PATH} does not exist`);
    }
    return process.env.CHROMIUM_PATH;
  }
  const list = CANDIDATES[platform()] ?? [];
  for (const p of list) if (existsSync(p)) return p;
  throw new Error(
    `No system Chromium/Chrome/Edge found on ${platform()}. ` +
      `Install one or set CHROMIUM_PATH to the executable.`,
  );
}
