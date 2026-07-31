import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the Jan Day landing page keeps its core content", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Jan Day Studio \| Faux flower sourcing in Madison/i);
  assert.match(layout, /VERCEL_PROJECT_PRODUCTION_URL/i);
  assert.match(page, /\/brand\/jan-day-wordmark\.png/i);
  assert.match(page, /\/og-faux-florals\.png/i);
  assert.match(page, /Blush and ivory faux roses/i);
  assert.match(page, /The flowers you want/i);
  assert.match(page, /Without the traditional markup/i);
  assert.match(page, /Start a sourcing request/i);
  assert.match(page, /Faux flowers, sourced for Madison weddings/i);
  assert.match(page, /vetted makers in China/i);
  assert.match(page, /Pick up in Madison/i);
  assert.match(page, /Ask us to source this/i);
  assert.match(page, /Personal flowers/i);
  assert.match(page, /Ceremony florals/i);
  assert.match(page, /Reception florals/i);
  assert.match(page, /Statement florals/i);
  assert.match(page, /Loose stems & DIY/i);
  assert.match(page, /Show us what/i);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("brand guide is a standalone HTML document", async () => {
  const html = await readFile(new URL("../public/brand-guide.html", import.meta.url), "utf8");

  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<title>Jan Day Studio Brand Guide<\/title>/i);
  assert.match(html, /\/brand\/jan-day-wordmark\.png/i);
  assert.match(html, /\/brand\/jan-day-mark\.jpg/i);
  assert.match(html, /#b5876f/i);
  assert.match(html, /Bodoni Moda/i);
  assert.match(html, /High-quality faux florals, sourced overseas and picked up in Madison/i);
});

test("the about page tells the founders' story and is linked from home", async () => {
  const [home, about] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(home, /href="\/about"/i);
  assert.match(home, /Meet Yanyan &amp; Jen/i);
  assert.match(about, /Yanyan and Jen/i);
  assert.match(about, /It started with/i);
  assert.match(about, /our own wedding/i);
  assert.match(about, /building efficient startups/i);
  assert.match(about, /yanyan-and-jen-wedding\.jpg/i);
  assert.match(about, /Your wedding should reflect the people/i);
});
