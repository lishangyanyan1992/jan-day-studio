import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Jan Day landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jan Day Studio \| Madison wedding rentals<\/title>/i);
  assert.match(html, /\/brand\/jan-day-wordmark\.png/i);
  assert.match(html, /\/brand\/jan-day-mark\.jpg/i);
  assert.match(html, /Every detail\.\s*<br[^>]*>\s*Beautifully considered\./i);
  assert.match(html, /Build your wishlist/i);
  assert.match(html, /Madison celebrations/i);
  assert.match(html, /Pick up in Madison/i);
  assert.match(html, /Let us source it/i);
  assert.match(html, /Tell us about\s*<br[^>]*>\s*your day\./i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
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
