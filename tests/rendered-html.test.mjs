import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the Jan Day landing page keeps its core content", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Jan Day Studio \| Madison wedding rentals/i);
  assert.match(layout, /VERCEL_PROJECT_PRODUCTION_URL/i);
  assert.match(page, /\/brand\/jan-day-wordmark\.png/i);
  assert.match(page, /\/brand\/jan-day-mark\.jpg/i);
  assert.match(page, /Every detail\./i);
  assert.match(page, /Beautifully considered\./i);
  assert.match(page, /Build your wishlist/i);
  assert.match(page, /Madison celebrations/i);
  assert.match(page, /Pick up in Madison/i);
  assert.match(page, /Let us source it/i);
  assert.match(page, /Tell us about/i);
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
  assert.match(html, /Thoughtful rentals and sourcing for Madison gatherings/i);
});
