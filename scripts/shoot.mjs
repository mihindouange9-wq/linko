// Captures de vérification : node scripts/shoot.mjs <url> <outDir> [desktop|mobile|all] [path]
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? ".impeccable/review/shots";
const which = process.argv[4] ?? "all";
const route = "/" + ((process.argv[5] ?? "").split(/[\/]/).filter(Boolean).pop() ?? "");
fs.mkdirSync(out, { recursive: true });

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--hide-scrollbars"] });

async function run(name, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  page.on("pageerror", (e) => console.log(`[${name}] pageerror`, e.message));
  page.on("console", (m) => m.type() === "error" && console.log(`[${name}] console`, m.text()));
  await page.goto(url + route, { waitUntil: "load", timeout: 90000 });
  await sleep(900);
  const shot = async (label) => {
    await sleep(1300);
    await page.screenshot({ path: path.join(out, `${name}-${label}.png`) });
  };
  const scrollTo = async (y) => {
    await page.evaluate((y) => window.scrollTo(0, y), y);
  };
  const top = (id) => page.evaluate((id) => document.getElementById(id).getBoundingClientRect().top + window.scrollY, id);

  if (route !== "/") {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0, i = 0; y < h && i < 14; y += viewport.height * 0.95, i++) {
      await scrollTo(y);
      await shot(`p${String(i).padStart(2, "0")}`);
    }
    await page.close();
    return;
  }

  const H = viewport.height;
  await shot("01-hero");
  // curseur entre les deux pièces (desktop)
  if (viewport.width >= 1024) {
    await page.mouse.move(viewport.width * 0.48, H * 0.42);
    await shot("02-hero-cursor");
  }
  await scrollTo(H * 0.35);
  await shot("03-hero-mid");
  await scrollTo(H * (viewport.width >= 1024 ? 1.2 : 0.62));
  await shot("04-hero-end");

  for (const id of ["probleme"]) {
    await scrollTo((await top(id)) + 80);
    await shot(`05-${id}`);
  }
  const lien = await top("lien");
  const track = await page.evaluate(() => {
    const t = document.querySelector("[data-track]");
    return { top: t.getBoundingClientRect().top + window.scrollY, h: t.offsetHeight };
  });
  await scrollTo(lien);
  await shot("06-lien-intro");
  for (let s = 0; s < 6; s++) {
    await scrollTo(track.top + (track.h - H) * ((s + 0.5) / 6));
    await shot(`07-lien-step${s}`);
  }
  for (const id of ["methode", "metiers", "confiance", "application", "pros", "tarifs", "entreprises", "contact"]) {
    await scrollTo((await top(id)) - 10);
    await shot(`08-${id}`);
    const sh = await page.evaluate((id) => document.getElementById(id).offsetHeight, id);
    if (sh > H * 1.3) {
      await scrollTo((await top(id)) + H * 0.85);
      await shot(`08-${id}-b`);
    }
  }
  await page.close();
}

if (which === "all" || which === "desktop") await run("desktop", { width: 1440, height: 900 });
if (which === "all" || which === "mobile")
  await run("mobile", { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await browser.close();
console.log("ok");
